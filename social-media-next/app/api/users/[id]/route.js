import * as users from "@/repos/users";

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const user = await users.getUserById(id);
    if (!user) return Response.json({ error: "Not found." }, { status: 404 });
    return Response.json(user);
  } catch (e) {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    const data = await request.json();
    const { username, bio } = data;

    if (!username || username.length < 3) {
      return Response.json({ error: "Username must be at least 3 characters long." }, { status: 400 });
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return Response.json({ error: "Username can only contain letters, numbers, and underscores." }, { status: 400 });
    }

    // Allow the same username only if it belongs to the same user (edit without rename conflict)
    const existing = await users.getUserByUsername(username);
    if (existing && existing.id !== id) {
      return Response.json({ error: "Username already taken." }, { status: 409 });
    }

    const user = await users.updateUser(id, { username, bio });
    return Response.json(user);
  } catch (e) {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
