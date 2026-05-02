import * as users from "@/repos/users";

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

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
