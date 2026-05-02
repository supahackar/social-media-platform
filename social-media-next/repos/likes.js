import prisma from "@/repos/prisma";

export async function toggleLike(userId, postId) {
  const existing = await prisma.like.findFirst({ where: { userId, postId } });

  if (existing) {
    await prisma.like.delete({ where: { id: existing.id } });
    return { liked: false };
  }

  await prisma.like.create({ data: { userId, postId } });
  return { liked: true };
}
