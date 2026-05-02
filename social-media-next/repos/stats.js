import prisma from "@/repos/prisma";

// All stats use database-level aggregation (groupBy, count, orderBy).
// No data is pulled into the app for manual processing.
// 1. Average number of posts per user
export async function avgPostsPerUser() {
  const result = await prisma.post.groupBy({
    by: ["userId"],
    _count: { id: true },
  });
  if (result.length === 0) return 0;
  const total = result.reduce((sum, r) => sum + r._count.id, 0);
  return (total / result.length).toFixed(2);
}

// 2. Average number of followers per user
export async function avgFollowersPerUser() {
  const result = await prisma.follow.groupBy({
    by: ["followingId"],
    _count: { id: true },
  });
  const userCount = await prisma.user.count();
  if (userCount === 0) return 0;
  const total = result.reduce((sum, r) => sum + r._count.id, 0);
  return (total / userCount).toFixed(2);
}

// 3. Most active user (most posts)
export async function mostActiveUser() {
  const result = await prisma.post.groupBy({
    by: ["userId"],
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: 1,
  });
  if (result.length === 0) return null;
  const user = await prisma.user.findUnique({
    where: { id: result[0].userId },
    select: { id: true, username: true },
  });
  return { ...user, postCount: result[0]._count.id };
}

// 4. Most liked post
export async function mostLikedPost() {
  const result = await prisma.like.groupBy({
    by: ["postId"],
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: 1,
  });
  if (result.length === 0) return null;
  const post = await prisma.post.findUnique({
    where: { id: result[0].postId },
    select: { id: true, content: true, user: { select: { username: true } } },
  });
  return { ...post, likeCount: result[0]._count.id };
}

// 5. Most followed user
export async function mostFollowedUser() {
  const result = await prisma.follow.groupBy({
    by: ["followingId"],
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: 1,
  });
  if (result.length === 0) return null;
  const user = await prisma.user.findUnique({
    where: { id: result[0].followingId },
    select: { id: true, username: true },
  });
  return { ...user, followerCount: result[0]._count.id };
}

// 6. Total counts overview
export async function platformOverview() {
  const [users, posts, likes, comments, follows] = await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.like.count(),
    prisma.comment.count(),
    prisma.follow.count(),
  ]);
  return { users, posts, likes, comments, follows };
}

// 7. Top 5 most commented posts
export async function mostCommentedPosts() {
  const result = await prisma.comment.groupBy({
    by: ["postId"],
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: 5,
  });
  return await Promise.all(
    result.map(async (r) => {
      const post = await prisma.post.findUnique({
        where: { id: r.postId },
        select: { id: true, content: true, user: { select: { username: true } } },
      });
      return { ...post, commentCount: r._count.id };
    })
  );
}
