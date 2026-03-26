document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
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

  // Logout handler
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });


  function loadProfile() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.id === currentUser.id);
    
    if (!user) {
      window.location.href = "login.html";
      return;
    }
    
    // Update current user in localStorage
    localStorage.setItem("currentUser", JSON.stringify(user));
    
    // Display profile info
    const initials = user.username.substring(0, 2).toUpperCase();
    document.getElementById("profileAvatar").textContent = initials;
    document.getElementById("profileUsername").textContent = user.username;
    document.getElementById("profileEmail").textContent = user.email;
    document.getElementById("profileBio").textContent = user.bio || "No bio yet.";
    
    // Calculate stats
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const userPosts = posts.filter(p => p.userId === user.id);
    
    document.getElementById("postsCount").textContent = userPosts.length;
    document.getElementById("followersCount").textContent = user.followers.length;
    document.getElementById("followingCount").textContent = user.following.length;
    

    renderUserPosts();
<<<<<<< HEAD
  }

  // Edit profile toggle
  editProfileBtn.addEventListener("click", () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.id === currentUser.id);
    
    document.getElementById("editUsername").value = user.username;
    document.getElementById("editBio").value = user.bio || "";
    
    editProfileForm.style.display = "block";
    editProfileBtn.style.display = "none";
  });

  // Cancel edit
  cancelEditBtn.addEventListener("click", () => {
    editProfileForm.style.display = "none";
    editProfileBtn.style.display = "inline-block";
  });

  // Save profile
  saveProfileBtn.addEventListener("click", () => {
    const newUsername = document.getElementById("editUsername").value.trim();
    const newBio = document.getElementById("editBio").value.trim();
    
    if (!newUsername || newUsername.length < 3) {
      alert("Username must be at least 3 characters long.");
      return;
    }
    
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) return;
    
    // Check if username is taken by another user
    const existingUser = users.find(u => u.username === newUsername && u.id !== currentUser.id);
    if (existingUser) {
      alert("This username is already taken.");
      return;
    }
    
    // Update user
    users[userIndex].username = newUsername;
    users[userIndex].bio = newBio;
    
    localStorage.setItem("users", JSON.stringify(users));
    
    // Update posts with new username
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.forEach(post => {
      if (post.userId === currentUser.id) {
        post.username = newUsername;
      }
      // Update comments too
      post.comments.forEach(comment => {
        if (comment.userId === currentUser.id) {
          comment.username = newUsername;
        }
      });
    });
    localStorage.setItem("posts", JSON.stringify(posts));
    
    editProfileForm.style.display = "none";
    editProfileBtn.style.display = "inline-block";
    
    loadProfile();
  });

  function renderUserPosts() {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const userPosts = posts.filter(p => p.userId === currentUser.id);
    
    postsContainer.innerHTML = "";
    
    if (userPosts.length === 0) {
      postsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
          <p style="font-size: 1.125rem;">You haven't posted anything yet.</p>
          <a href="feed.html" class="btn btn-primary" style="margin-top: 1rem; display: inline-block;">Create Your First Post</a>
        </div>
      `;
      return;
    }
    
    userPosts.forEach(post => {
      const postElement = createPostElement(post);
      postsContainer.appendChild(postElement);
    });
  }

  function createPostElement(post) {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");
    
    const isLiked = post.likes.includes(currentUser.id);
    const timeAgo = getTimeAgo(post.createdAt);
    const initials = post.username.substring(0, 2).toUpperCase();
    
    postDiv.innerHTML = `
      <div class="post-header">
        <div class="post-author">
          <div class="post-avatar">${initials}</div>
          <div class="post-author-info">
            <h3>${post.username}</h3>
            <p>${timeAgo}</p>
          </div>
        </div>
      </div>
      
      <div class="post-content">${post.content}</div>
      
      <div class="post-actions">
        <button class="post-action-btn ${isLiked ? 'liked' : ''}" data-post-id="${post.id}">
          ❤️ ${post.likes.length} ${post.likes.length === 1 ? 'Like' : 'Likes'}
        </button>
        <span style="color: var(--text-muted); font-size: 0.875rem;">💬 ${post.comments.length} ${post.comments.length === 1 ? 'Comment' : 'Comments'}</span>
        <button class="post-action-btn post-delete-btn" data-post-id="${post.id}" data-action="delete">🗑️ Delete</button>
      </div>
    `;
    
    const deleteBtn = postDiv.querySelector('[data-action="delete"]');
    deleteBtn.addEventListener("click", () => deletePost(post.id));
    
    return postDiv;
  }

  function deletePost(postId) {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }
    
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts = posts.filter(p => p.id !== postId);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadProfile();
  }

  function getTimeAgo(timestamp) {
    const now = new Date();
    const posted = new Date(timestamp);
    const seconds = Math.floor((now - posted) / 1000);
    
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  // Initial load
  loadProfile();
});
=======
}});
>>>>>>> d2ddb6a (minor code adjustments)
