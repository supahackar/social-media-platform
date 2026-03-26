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
    