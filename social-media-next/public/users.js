document.addEventListener("DOMContentLoaded", async () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  const initials = currentUser.username.substring(0, 2).toUpperCase();
  const footerProfileAvatar = document.getElementById("footerProfileAvatar");
  if (footerProfileAvatar) footerProfileAvatar.textContent = initials;

  const usersContainer = document.getElementById("usersContainer");
  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });

  async function renderUsers() {
    const res = await fetch(`/api/users?currentUserId=${currentUser.id}`);
    const allUsers = await res.json();
    const otherUsers = allUsers.filter((u) => u.id !== currentUser.id);

    usersContainer.innerHTML = "";

    if (otherUsers.length === 0) {
      usersContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: var(--text-muted); grid-column: 1 / -1;">
          <p style="font-size: 1.125rem;">No other users yet.</p>
          <p style="margin-top: 0.5rem;">Invite your friends to join ClickChat!</p>
        </div>
      `;
      return;
    }

    otherUsers.forEach((user) => {
      const userCard = createUserCard(user);
      usersContainer.appendChild(userCard);
    });
  }

  function createUserCard(user) {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-card");

    const avatarInitials = user.username.substring(0, 2).toUpperCase();
    const postCount = user._count?.posts ?? 0;
    const followerCount = user._count?.followers ?? 0;

    userDiv.innerHTML = `
      <div class="user-info">
        <div class="user-avatar">${avatarInitials}</div>
        <div class="user-details">
          <h3>${user.username}</h3>
          ${user.bio ? `<p style="color: var(--text); font-size: 0.9rem; margin-top: 0.5rem;">${user.bio}</p>` : ""}
          <p style="color: var(--text-dim); margin-top: 0.25rem;">
            ${postCount} ${postCount === 1 ? "post" : "posts"} &middot;
            ${followerCount} ${followerCount === 1 ? "follower" : "followers"}
          </p>
        </div>
      </div>
      <button class="btn ${user.isFollowing ? "btn-secondary" : "btn-primary"}" data-user-id="${user.id}">
        ${user.isFollowing ? "Unfollow" : "Follow"}
      </button>
    `;

    const followBtn = userDiv.querySelector("button");
    followBtn.addEventListener("click", () => toggleFollow(user.id));

    return userDiv;
  }

  async function toggleFollow(userId) {
    await fetch("/api/follows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followerId: currentUser.id, followingId: userId }),
    });
    renderUsers();
  }

  renderUsers();
});
