import "dotenv/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "./client/index.js";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient({
  adapter: new PrismaLibSql({
    url: process.env.DATABASE_URL ?? "",
  }),
});

async function main() {
  // Clear existing data
  await prisma.follow.deleteMany();
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create 20 users
  const users = [];
  for (let i = 0; i < 20; i++) {
    const user = await prisma.user.create({
      data: {
        username: faker.internet.username().toLowerCase().replace(/[^a-z0-9_]/g, "_").slice(0, 20),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password({ length: 10 }),
        bio: faker.lorem.sentence(),
        createdAt: faker.date.past({ years: 1 }),
      },
    });
    users.push(user);
  }

  // Create 3–6 posts per user
  const posts = [];
  for (const user of users) {
    const count = faker.number.int({ min: 3, max: 6 });
    for (let i = 0; i < count; i++) {
      const post = await prisma.post.create({
        data: {
          content: faker.lorem.sentences({ min: 1, max: 3 }),
          userId: user.id,
          createdAt: faker.date.past({ years: 1 }),
        },
      });
      posts.push(post);
    }
  }

  // Create likes — each user likes 5–15 random posts (no duplicates)
  for (const user of users) {
    const shuffled = faker.helpers.shuffle([...posts]);
    const toLike = shuffled.slice(0, faker.number.int({ min: 5, max: 15 }));
    for (const post of toLike) {
      await prisma.like.create({
        data: { userId: user.id, postId: post.id },
      });
    }
  }

  // Create comments — each user comments on 3–8 random posts
  for (const user of users) {
    const shuffled = faker.helpers.shuffle([...posts]);
    const toComment = shuffled.slice(0, faker.number.int({ min: 3, max: 8 }));
    for (const post of toComment) {
      await prisma.comment.create({
        data: {
          content: faker.lorem.sentence(),
          userId: user.id,
          postId: post.id,
          createdAt: faker.date.past({ years: 1 }),
        },
      });
    }
  }

  // Create follows — each user follows 3–8 others (no self-follows, no duplicates)
  for (const user of users) {
    const others = users.filter((u) => u.id !== user.id);
    const shuffled = faker.helpers.shuffle(others);
    const toFollow = shuffled.slice(0, faker.number.int({ min: 3, max: 8 }));
    for (const target of toFollow) {
      await prisma.follow.create({
        data: { followerId: user.id, followingId: target.id },
      });
    }
  }

  const userCount = await prisma.user.count();
  const postCount = await prisma.post.count();
  const likeCount = await prisma.like.count();
  const commentCount = await prisma.comment.count();
  const followCount = await prisma.follow.count();

  console.log(`Seeded:`);
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
