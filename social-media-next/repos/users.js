import prisma from "@/repos/prisma";

export async function getUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      bio: true,
      createdAt: true,
      _count: { select: { followers: true, following: true, posts: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserById(id) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      bio: true,
      createdAt: true,
      _count: { select: { followers: true, following: true, posts: true } },
    },
  });
}

export async function getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
    select: { id: true, username: true, email: true, password: true, bio: true },
  });
}

export async function createUser(data) {
  return await prisma.user.create({
    data: { username: data.username, email: data.email, password: data.password, bio: data.bio ?? "" },
    select: { id: true, username: true, email: true, bio: true },
  });
}

export async function updateUser(id, data) {
  return await prisma.user.update({
    where: { id },
    data: { username: data.username, bio: data.bio },
    select: { id: true, username: true, email: true, bio: true },
  });
}
