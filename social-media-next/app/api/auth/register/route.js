import * as users from "@/repos/users";

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const isLongEnough = password.length >= 8;
    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar || !isLongEnough) {
      return Response.json(
        { error: "Password must be at least 8 characters and contain: uppercase letter (A-Z), lowercase letter (a-z), number (0-9), and special character (! @ # $ % ^ & *)." },
        { status: 400 }
      );
    }

    const existing = await users.getUserByEmail(email);
    if (existing) {
      return Response.json({ error: "Email already in use." }, { status: 409 });
    }

    const user = await users.createUser({ username, email, password });
    return Response.json(user, { status: 201 });
  } catch (e) {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
