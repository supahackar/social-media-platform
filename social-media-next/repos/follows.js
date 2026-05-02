import prisma from "@/repos/prisma";

export async function toggleFollow(followerId, followingId) {
  const existing = await prisma.follow.findFirst({ where: { followerId, followingId } });

  if (existing) {
    await prisma.follow.delete({ where: { id: existing.id } });
    return { following: false };
  }

  await prisma.follow.create({ data: { followerId, followingId } });
  return { following: true };
}

export async function getFollowers(userId) {
  return await prisma.follow.findMany({
    where: { followingId: userId },
    select: { follower: { select: { id: true, username: true } } },
  });
}

export async function getFollowing(userId) {
  return await prisma.follow.findMany({
    where: { followerId: userId },
    select: { following: { select: { id: true, username: true } } },
  });
}

export async function isFollowing(followerId, followingId) {
  const follow = await prisma.follow.findFirst({ where: { followerId, followingId } });
  return !!follow;
}
