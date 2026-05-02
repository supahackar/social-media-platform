import * as users from "@/repos/users";
import * as follows from "@/repos/follows";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const currentUserId = searchParams.get("currentUserId");

    const allUsers = await users.getUsers();

    // If currentUserId is provided, enrich each user with an isFollowing flag
    // so the client doesn't need a separate request per user
    if (currentUserId) {
      const following = await follows.getFollowing(currentUserId);
      const followingIds = new Set(following.map((f) => f.following.id));
      return Response.json(
        allUsers.map((u) => ({ ...u, isFollowing: followingIds.has(u.id) }))
      );
    }

    return Response.json(allUsers);
  } catch (e) {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
