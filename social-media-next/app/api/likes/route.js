import * as likes from "@/repos/likes";

export async function POST(request) {
  try {
    const { userId, postId } = await request.json();
    const result = await likes.toggleLike(userId, postId);
    return Response.json(result);
  } catch (e) {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
