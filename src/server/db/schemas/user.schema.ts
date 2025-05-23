import { relations } from "drizzle-orm";
import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const posts = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  content: text(),
  authorId: integer().references(() => users.id),
});

export const usersRelations = relations(users, ({ many }) => ({
  // A user can have 'many' posts.
  // The key 'posts' here is what you'll use in your `with` clause.
  posts: many(posts),
}));

// Type for inserting a new user (optional but good practice)
export type NewUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const postsRelations = relations(posts, ({ one }) => ({
  // A post belongs to 'one' author (user).
  // The key 'author' here is what you'll use in your `with` clause if querying posts.
  author: one(users, {
    fields: [posts.authorId], // The foreign key column in the 'posts' table
    references: [users.id], // The primary key column in the 'users' table it references
  }),
}));

// Type for inserting a new post (optional but good practice)
export type NewPost = typeof posts.$inferInsert;
// Type for selecting a post (optional but good practice)
export type Post = typeof posts.$inferSelect;
