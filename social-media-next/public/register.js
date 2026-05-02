document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const errorMessage = document.getElementById("errorMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    errorMessage.textContent = "";

    if (username.length < 3) {
      errorMessage.textContent = "Username must be at least 3 characters long.";
      return;
    }

    if (!isValidEmail(email)) {
      errorMessage.textContent = "Please enter a valid email address.";
      return;
    }

    if (!isStrongPassword(password)) {
      errorMessage.textContent = "Password must be at least 8 characters and contain: uppercase letter (A-Z), lowercase letter (a-z), number (0-9), and special character (! @ # $ % ^ & *)";
      return;
    }

    if (password !== confirmPassword) {
      errorMessage.textContent = "Passwords do not match.";
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      errorMessage.textContent = data.error || "Registration failed.";
      return;
    }

    window.location.href = "login.html";
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isStrongPassword(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const isLongEnough = password.length >= 8;
    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongEnough;
  }
});
