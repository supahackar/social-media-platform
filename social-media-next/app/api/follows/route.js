import * as follows from "@/repos/follows";

// POST toggles a follow on or off and returns { following: true/false }
export async function POST(request) {
  try {
    const { followerId, followingId } = await request.json();
    const result = await follows.toggleFollow(followerId, followingId);
    return Response.json(result);
  } catch (e) {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
