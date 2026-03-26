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
    