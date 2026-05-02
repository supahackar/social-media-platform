document.addEventListener("DOMContentLoaded", async () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  const logoutBtn = document.getElementById("logoutBtn");
  const editProfileBtn = document.getElementById("editProfileBtn");
  const editProfileForm = document.getElementById("editProfileForm");
  const saveProfileBtn = document.getElementById("saveProfileBtn");
  const cancelEditBtn = document.getElementById("cancelEditBtn");
  const postsContainer = document.getElementById("postsContainer");

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });

  async function loadProfile() {
    const res = await fetch(`/api/users/${currentUser.id}`);
    if (!res.ok) { window.location.href = "login.html"; return; }
    const user = await res.json();

    localStorage.setItem("currentUser", JSON.stringify({ id: user.id, username: user.username, email: user.email }));

    const initials = user.username.substring(0, 2).toUpperCase();
    document.getElementById("profileAvatar").textContent = initials;
    document.getElementById("footerProfileAvatar").textContent = initials;
    document.getElementById("profileUsername").textContent = user.username;
    document.getElementById("profileEmail").textContent = user.email;
    document.getElementById("profileBio").textContent = user.bio || "Add a bio to your profile";
    document.getElementById("postsCount").textContent = user._count.posts;
    document.getElementById("followersCount").textContent = user._count.followers;
    document.getElementById("followingCount").textContent = user._count.following;

    renderUserPosts();
  }

  editProfileBtn.addEventListener("click", () => {
    document.getElementById("editUsername").value = currentUser.username;
    editProfileForm.style.display = "block";
    editProfileBtn.style.display = "none";
  });

  cancelEditBtn.addEventListener("click", () => {
    editProfileForm.style.display = "none";
    editProfileBtn.style.display = "inline-block";
  });

  saveProfileBtn.addEventListener("click", async () => {
    const newUsername = document.getElementById("editUsername").value.trim();
    const newBio = document.getElementById("editBio").value.trim();

    if (!newUsername || newUsername.length < 3) {
      alert("Username must be at least 3 characters long.");
      return;
    }

    const res = await fetch(`/api/users/${currentUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: newUsername, bio: newBio }),
    });

    if (!res.ok) {
      alert("Failed to update profile.");
      return;
    }

    editProfileForm.style.display = "none";
    editProfileBtn.style.display = "inline-block";
    loadProfile();
  });

  async function renderUserPosts() {
    postsContainer.innerHTML = `<div class="loading-wrap"><div class="loading-spinner"></div><span>Loading posts…</span></div>`;
    const res = await fetch(`/api/posts?userId=${currentUser.id}&type=user`);
    const posts = await res.json();

    postsContainer.innerHTML = "";

    if (posts.length === 0) {
      postsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
          <p style="font-size: 1.125rem;">You haven't posted anything yet.</p>
          <a href="feed.html" class="btn btn-primary" style="margin-top: 1rem; display: inline-block;">Create Your First Post</a>
        </div>
      `;
      return;
    }

    posts.forEach((post) => postsContainer.appendChild(createPostElement(post)));
  }

  function createPostElement(post) {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    const likeCount = post._count.likes;
    const commentCount = post._count.comments;
    const timeAgo = getTimeAgo(post.createdAt);

    postDiv.innerHTML = `
      <div class="post-header">
        <div class="post-author">
          <div class="post-avatar">${currentUser.username.substring(0, 2).toUpperCase()}</div>
          <div class="post-author-info">
            <div class="post-author-header">
              <h3>${currentUser.username}</h3>
              <p class="post-time">${timeAgo}</p>
            </div>
          </div>
        </div>
        <button class="post-action-btn post-delete-btn" data-post-id="${post.id}" data-action="delete"><svg class="post-action-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7.616 20q-.667 0-1.141-.475T6 18.386V6h-.5q-.213 0-.356-.144T5 5.499t.144-.356T5.5 5H9q0-.31.23-.54t.54-.23h4.46q.31 0 .54.23T15 5h3.5q.213 0 .356.144t.144.357t-.144.356T18.5 6H18v12.385q0 .666-.475 1.14t-1.14.475zm2.692-3q.213 0 .357-.144t.143-.356v-8q0-.213-.144-.356T10.307 8t-.356.144t-.143.356v8q0 .213.144.356q.144.144.356.144m3.385 0q.213 0 .356-.144t.143-.356v-8q0-.213-.144-.356Q13.904 8 13.692 8q-.213 0-.357.144t-.143.356v8q0 .213.144.356t.357.144"/></svg></button>
      </div>
      <div class="post-content">${post.content}</div>
      <div class="post-actions">
        <span class="post-action-btn">
          <svg class="post-action-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m12 19.654l-.758-.685q-2.448-2.236-4.05-3.828q-1.601-1.593-2.528-2.81q-.926-1.218-1.296-2.2T3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.32 0 2.475.675T12 6.289Q12.87 5 14.025 4.325T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 .996-.368 1.98q-.369.986-1.296 2.202t-2.519 2.809q-1.592 1.592-4.06 3.828z"/></svg>
          ${likeCount} ${likeCount === 1 ? "Like" : "Likes"}
        </span>
        <span class="post-action-btn">
          <svg class="post-action-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2m-2 12H6v-2h12zm0-3H6V9h12zm0-3H6V6h12z"/></svg>
          ${commentCount} ${commentCount === 1 ? "Comment" : "Comments"}
        </span>
      </div>
    `;

    postDiv.querySelector('[data-action="delete"]').addEventListener("click", () => deletePost(post.id));
    return postDiv;
  }

  async function deletePost(postId) {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser.id }),
    });
    loadProfile();
  }

  function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - new Date(timestamp)) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  loadProfile();
});
