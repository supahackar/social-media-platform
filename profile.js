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

  // Load and display profile
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
    
    // Render user posts
    renderUserPosts();
  }