document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    
    // Clear previous errors
    errorMessage.textContent = "";
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      errorMessage.textContent = "Invalid email or password.";
      return;
    }
    
    // Store current user session
    localStorage.setItem("currentUser", JSON.stringify(user));
    
    // Redirect to feed
    window.location.href = "feed.html";
  });
});
