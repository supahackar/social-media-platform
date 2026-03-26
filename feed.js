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
