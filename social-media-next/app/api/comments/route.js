import * as comments from "@/repos/comments";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");
    if (!postId) return Response.json({ error: "postId is required." }, { status: 400 });
    return Response.json(await comments.getComments(postId));
  } catch (e) {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { userId, postId, content } = await request.json();
    const comment = await comments.createComment(userId, postId, content);
    return Response.json(comment, { status: 201 });
  } catch (e) {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { commentId, userId } = await request.json();
    await comments.deleteComment(commentId, userId);
    return Response.json({ deleted: true });
  } catch (e) {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
