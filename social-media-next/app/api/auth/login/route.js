import * as users from "@/repos/users";

export async function POST(request) {
  try {
    const { identifier, password } = await request.json();

    const isEmail = identifier.includes("@");
    const user = isEmail
      ? await users.getUserByEmail(identifier.toLowerCase())
      : await users.getUserByUsername(identifier.toLowerCase());

    if (!user || user.password !== password) {
      return Response.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const { password: _, ...safeUser } = user;
    return Response.json(safeUser);
  } catch (e) {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
