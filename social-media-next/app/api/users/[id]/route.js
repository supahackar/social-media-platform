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
    const user = await users.updateUser(id, data);
    return Response.json(user);
  } catch (e) {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
