import prisma from "@/repos/prisma";

// Toggles a like: removes it if it exists, creates it if it doesn't.
// Returns { liked: true/false } so the client can update the UI without refetching.
export async function toggleLike(userId, postId) {
  const existing = await prisma.like.findFirst({ where: { userId, postId } });

  if (existing) {
    await prisma.like.delete({ where: { id: existing.id } });
    return { liked: false };
  }

  await prisma.like.create({ data: { userId, postId } });
  return { liked: true };
}
