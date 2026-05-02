import * as posts from "@/repos/posts";

export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    const { userId } = await request.json();
    await posts.deletePost(id, userId);
    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
