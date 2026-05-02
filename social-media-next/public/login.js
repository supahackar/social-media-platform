document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    errorMessage.textContent = "";

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      errorMessage.textContent = "Invalid email or password.";
      return;
    }

    const user = await res.json();
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "feed.html";
  });
});
