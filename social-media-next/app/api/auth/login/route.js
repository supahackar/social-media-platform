import * as users from "@/repos/users";

export async function POST(request) {
  try {
    const { identifier, password } = await request.json();

    // Accept either email or username as the login identifier
    const isEmail = identifier.includes("@");
    const user = isEmail
      ? await users.getUserByEmail(identifier.toLowerCase())
      : await users.getUserByUsername(identifier.toLowerCase());

    if (!user || user.password !== password) {
      return Response.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // Strip password before returning the user object to the client
    const { password: _, ...safeUser } = user;
    return Response.json(safeUser);
  } catch (e) {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
