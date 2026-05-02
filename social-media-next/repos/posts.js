import prisma from "@/repos/prisma";

export async function getFeedPosts(userId) {
  // Get posts from the user and users they follow
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });
  const followingIds = following.map((f) => f.followingId);

  // Reused select shape — keeps both queries consistent
  const postSelect = {
    id: true,
    content: true,
    createdAt: true,
    user: { select: { id: true, username: true } },
    _count: { select: { likes: true, comments: true } },
    likes: { where: { userId }, select: { id: true } },
  };

  const feedPosts = await prisma.post.findMany({
    where: { userId: { in: [userId, ...followingIds] } },
    select: postSelect,
    orderBy: { createdAt: "desc" },
  });

  // Fall back to all posts for new users with empty feed
  if (feedPosts.length === 0) {
    return await prisma.post.findMany({
      select: postSelect,
      orderBy: { createdAt: "desc" },
    });
  }

  return feedPosts;
}

// All posts by a specific user, for the profile page
export async function getPostsByUser(userId) {
  return await prisma.post.findMany({
    where: { userId },
    select: {
      id: true,
      content: true,
      createdAt: true,
      user: { select: { id: true, username: true } },
      _count: { select: { likes: true, comments: true } },
      likes: { where: { userId }, select: { id: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createPost(userId, content) {
  return await prisma.post.create({
    data: { userId, content },
    select: {
      id: true,
      content: true,
      createdAt: true,
      user: { select: { id: true, username: true } },
      _count: { select: { likes: true, comments: true } },
    },
  });
}

// userId is required in the where clause so users can only delete their own posts
export async function deletePost(postId, userId) {
  await prisma.post.delete({ where: { id: postId, userId } });
}
