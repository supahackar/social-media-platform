import prisma from "@/repos/prisma";

// Includes follower/following/post counts — avoids extra queries on the users page
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

// These two lookups return the password field — used only by the auth routes for verification
export async function getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
    select: { id: true, username: true, email: true, password: true, bio: true },
  });
}

export async function getUserByUsername(username) {
  return await prisma.user.findUnique({
    where: { username },
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
