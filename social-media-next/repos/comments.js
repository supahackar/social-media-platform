import prisma from "@/repos/prisma";

export async function getComments(postId) {
  return await prisma.comment.findMany({
    where: { postId },
    select: {
      id: true,
      content: true,
      createdAt: true,
      user: { select: { id: true, username: true } },
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function createComment(userId, postId, content) {
  return await prisma.comment.create({
    data: { userId, postId, content },
    select: {
      id: true,
      content: true,
      createdAt: true,
      user: { select: { id: true, username: true } },
    },
  });
}
