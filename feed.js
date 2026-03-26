document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  const postsContainer = document.getElementById("postsContainer");
  const createPostBtn = document.getElementById("createPostBtn");
  const postContent = document.getElementById("postContent");
  const logoutBtn = document.getElementById("logoutBtn");

  // Logout handler
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });

  // Create post handler
  createPostBtn.addEventListener("click", () => {
    const content = postContent.value.trim();
    
    if (!content) {
      alert("Please write something before posting!");
      return;
    }
    
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    
    const newPost = {
      id: Date.now().toString(),
      userId: currentUser.id,
      username: currentUser.username,
      content: content,
      likes: [],
      comments: [],
      createdAt: new Date().toISOString()
    };
    
    posts.unshift(newPost); // Add to beginning
    localStorage.setItem("posts", JSON.stringify(posts));
    
    postContent.value = "";
    renderPosts();
  });

  function renderPosts() {
    const allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Get users the current user is following
    const currentUserData = users.find(u => u.id === currentUser.id);
    const followingIds = currentUserData ? currentUserData.following : [];
    
    // Filter posts from followed users + own posts
    const feedPosts = allPosts.filter(post => 
      post.userId === currentUser.id || followingIds.includes(post.userId)
    );
    
    postsContainer.innerHTML = "";
    
    if (feedPosts.length === 0) {
      postsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
          <p style="font-size: 1.125rem;">Your feed is empty!</p>
          <p style="margin-top: 0.5rem;">Follow some users to see their posts here.</p>
          <a href="users.html" class="btn btn-primary" style="margin-top: 1rem; display: inline-block;">Discover Users</a>
        </div>
      `;
      return;
    }
    
    feedPosts.forEach(post => {
      const postElement = createPostElement(post);
      postsContainer.appendChild(postElement);
    });
  }

  function createPostElement(post) {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");
    
    const isLiked = post.likes.includes(currentUser.id);
    const isOwnPost = post.userId === currentUser.id;
    
    
    // Calculate time ago
    const timeAgo = getTimeAgo(post.createdAt);
    
    // Get user initials for avatar
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
        <button class="post-action-btn ${isLiked ? 'liked' : ''}" data-post-id="${post.id}" data-action="like">
          ❤️ ${post.likes.length} ${post.likes.length === 1 ? 'Like' : 'Likes'}
        </button>
        <button class="post-action-btn" data-post-id="${post.id}" data-action="comment">
          💬 ${post.comments.length} ${post.comments.length === 1 ? 'Comment' : 'Comments'}
        </button>
        ${isOwnPost ? `<button class="post-action-btn post-delete-btn" data-post-id="${post.id}" data-action="delete">🗑️ Delete</button>` : ''}
      </div>
      
      <div class="post-comments" id="comments-${post.id}">
        <div class="comment-form">
          <input type="text" placeholder="Write a comment..." id="comment-input-${post.id}" />
          <button class="btn btn-small btn-primary" data-post-id="${post.id}" data-action="add-comment">Comment</button>
        </div>
        <div class="comments-list" id="comments-list-${post.id}"></div>
      </div>
    `;
     // Add event listeners
    const likeBtn = postDiv.querySelector('[data-action="like"]');
    likeBtn.addEventListener("click", () => toggleLike(post.id));
    
    const deleteBtn = postDiv.querySelector('[data-action="delete"]');
    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => deletePost(post.id));
    }
    