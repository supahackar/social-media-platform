import * as posts from "@/repos/posts";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const type = searchParams.get("type");

    if (!userId) {
      return Response.json({ error: "userId is required." }, { status: 400 });
    }

    if (type === "user") {
      return Response.json(await posts.getPostsByUser(userId));
    }
    return Response.json(await posts.getFeedPosts(userId));
  } catch (e) {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { userId, content } = await request.json();
    const post = await posts.createPost(userId, content);
    return Response.json(post, { status: 201 });
  } catch (e) {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
