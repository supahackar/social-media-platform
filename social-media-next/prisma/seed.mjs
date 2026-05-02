import "dotenv/config";
import { readFileSync } from "fs";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "./client/index.js";

const prisma = new PrismaClient({
  adapter: new PrismaLibSql({
    url: process.env.DATABASE_URL ?? "",
  }),
});

// Load seed data from JSON files
const usersData  = JSON.parse(readFileSync(new URL("./data/users.json",   import.meta.url)));
const postsData  = JSON.parse(readFileSync(new URL("./data/posts.json",   import.meta.url)));
const followsData = JSON.parse(readFileSync(new URL("./data/follows.json", import.meta.url)));

async function main() {
  // Clear existing data in dependency order
  await prisma.follow.deleteMany();
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create users from users.json
  const users = [];
  for (const u of usersData) {
    const user = await prisma.user.create({ data: u });
    users.push(user);
  }

  // Create posts from posts.json (userIndex maps to the users array above)
  const posts = [];
  for (const p of postsData) {
    const post = await prisma.post.create({
      data: { content: p.content, userId: users[p.userIndex].id },
    });
    posts.push(post);
  }

  // Create follows from follows.json
  for (const f of followsData) {
    await prisma.follow.create({
      data: { followerId: users[f.followerIndex].id, followingId: users[f.followingIndex].id },
    });
  }

  // Create likes — each user likes every 3rd post (varied, no duplicates)
  for (let i = 0; i < users.length; i++) {
    for (let j = (i * 3) % posts.length, count = 0; count < 8; j = (j + 1) % posts.length, count++) {
      if (posts[j].userId !== users[i].id) {
        await prisma.like.create({ data: { userId: users[i].id, postId: posts[j].id } });
      }
    }
  }

  // Create comments — each user comments on a set of posts
  const commentTexts = [
    "Totally agree with this!",
    "This made my day.",
    "So true, couldn't have said it better.",
    "Love this perspective.",
    "Really insightful, thanks for sharing.",
    "This resonates with me a lot.",
    "Great point!",
    "Following this topic closely.",
    "More people need to see this.",
    "Well said.",
  ];
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < 5; j++) {
      const postIndex = (i * 7 + j * 3) % posts.length;
      await prisma.comment.create({
        data: {
          content: commentTexts[(i + j) % commentTexts.length],
          userId: users[i].id,
          postId: posts[postIndex].id,
        },
      });
    }
  }

  const userCount   = await prisma.user.count();
  const postCount   = await prisma.post.count();
  const likeCount   = await prisma.like.count();
  const commentCount = await prisma.comment.count();
  const followCount = await prisma.follow.count();

  console.log("Seeded:");
  console.log(`  ${userCount} users`);
  console.log(`  ${postCount} posts`);
  console.log(`  ${likeCount} likes`);
  console.log(`  ${commentCount} comments`);
  console.log(`  ${followCount} follows`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
