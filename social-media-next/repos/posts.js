import prisma from "@/repos/prisma";

export async function getFeedPosts(userId) {
  // Get posts from the user and users they follow
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });
  const followingIds = following.map((f) => f.followingId);

  return await prisma.post.findMany({
    where: { userId: { in: [userId, ...followingIds] } },
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

  return postsData.map((post) => ({
    ...post,
    followedByMe: followingIds.includes(post.user.id),
  }));
}

export async function getPostsByUser(userId) {
  return await prisma.post.findMany({
    where: { userId },
    select: {
      id: true,
      content: true,
      createdAt: true,
      _count: { select: { likes: true, comments: true } },
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

export async function deletePost(postId, userId) {
  await prisma.post.delete({ where: { id: postId, userId } });
}
