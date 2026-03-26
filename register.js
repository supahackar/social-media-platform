document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const errorMessage = document.getElementById("errorMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    
    // Clear previous errors
    errorMessage.textContent = "";
    
    // Validation
    if (username.length < 3) {
      errorMessage.textContent = "Username must be at least 3 characters long.";
      return;
    }
    
    if (!isValidEmail(email)) {
      errorMessage.textContent = "Please enter a valid email address.";
      return;
    }
    
    if (password.length < 6) {
      errorMessage.textContent = "Password must be at least 6 characters long.";
      return;
    }
    
    if (password !== confirmPassword) {
      errorMessage.textContent = "Passwords do not match.";
      return;
    }
    

    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
      errorMessage.textContent = "An account with this email already exists.";
      return;
    }
    
    // Check if username already exists
    if (users.find(u => u.username === username)) {
      errorMessage.textContent = "This username is already taken.";
      return;
    }
    
    
    const newUser = {
      id: Date.now().toString(),
      username: username,
      email: email,
      password: password, 
      bio: "",
      followers: [],
      following: [],
      createdAt: new Date().toISOString()
    };
    
    // Add user to users array
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    window.location.href = "login.html";
  });
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
