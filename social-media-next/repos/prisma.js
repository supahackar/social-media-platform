import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@/prisma/client/client";

// Single shared Prisma client instance for the whole app.
// The libsql adapter connects to the SQLite database via DATABASE_URL.
export default new PrismaClient({
  adapter: new PrismaLibSql({
    url: process.env.DATABASE_URL ?? "",
  }),
  // log: ["query"],  // uncomment to debug raw SQL queries
});
