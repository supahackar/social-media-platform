document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  const initials = currentUser.username.substring(0, 2).toUpperCase();
  const footerProfileAvatar = document.getElementById("footerProfileAvatar");
  if (footerProfileAvatar) {
    footerProfileAvatar.textContent = initials;
  }

  const usersContainer = document.getElementById("usersContainer");
  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });

  function renderUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUserData = users.find(u => u.id === currentUser.id);
    
    if (!currentUserData) {
      window.location.href = "login.html";
      return;
    }
    
    // Filter out current user
    const otherUsers = users.filter(u => u.id !== currentUser.id);
    
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
    
    otherUsers.forEach(user => {
      const userCard = createUserCard(user, currentUserData);
      usersContainer.appendChild(userCard);
    });
  }

  function createUserCard(user, currentUserData) {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-card");
    
    const isFollowing = currentUserData.following.includes(user.id);
    const initials = user.username.substring(0, 2).toUpperCase();
    
    // Get post count
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const userPosts = posts.filter(p => p.userId === user.id);
    
    userDiv.innerHTML = `
      <div class="user-info">
        <div class="user-avatar">${initials}</div>
        <div class="user-details">
          <h3>${user.username}</h3>
          <p style="color: var(--text-dim); margin-top: 0.25rem;">
            ${userPosts.length} ${userPosts.length === 1 ? 'post' : 'posts'} · 
            ${user.followers.length} ${user.followers.length === 1 ? 'follower' : 'followers'}
          </p>
        </div>
      </div>
      <button class="btn ${isFollowing ? 'btn-secondary' : 'btn-primary'}" data-user-id="${user.id}">
        ${isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    `;
    
    const followBtn = userDiv.querySelector("button");
    followBtn.addEventListener("click", () => toggleFollow(user.id));
    
    return userDiv;
  }

  function toggleFollow(userId) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUserIndex = users.findIndex(u => u.id === currentUser.id);
    const targetUserIndex = users.findIndex(u => u.id === userId);
    
    if (currentUserIndex === -1 || targetUserIndex === -1) return;
    
    const currentUserData = users[currentUserIndex];
    const targetUser = users[targetUserIndex];
    
    const followingIndex = currentUserData.following.indexOf(userId);
    
    if (followingIndex > -1) {
      // Unfollow
      currentUserData.following.splice(followingIndex, 1);
      const followerIndex = targetUser.followers.indexOf(currentUser.id);
      if (followerIndex > -1) {
        targetUser.followers.splice(followerIndex, 1);
      }
    } else {
      // Follow
      currentUserData.following.push(userId);
      targetUser.followers.push(currentUser.id);
    }
    
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUserData));
    
    renderUsers();
  }

  renderUsers();
});
