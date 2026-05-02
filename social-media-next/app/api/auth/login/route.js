import * as users from "@/repos/users";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const user = await users.getUserByEmail(email);
    if (!user || user.password !== password) {
      return Response.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const { password: _, ...safeUser } = user;
    return Response.json(safeUser);
  } catch (e) {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
