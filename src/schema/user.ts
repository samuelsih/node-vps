import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const extensions = {};

export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  password: varchar("password", { length: 50 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  createdAt: timestamp("timestamp")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("timestamp"),
});

export type SelectUser = InferSelectModel<typeof users>;
export type InserUser = InferInsertModel<typeof users>;

export const insertUserSchema = createInsertSchema(users, {
  email: z
    .string({ required_error: "email is required" })
    .min(4, { message: "email is required" })
    .max(255, { message: "email is too long" })
    .email("not a valid email"),

  name: z
    .string({ required_error: "name is required" })
    .min(4, { message: "name is required" })
    .max(255, { message: "name is too long" }),

  phone: z
    .string({ required_error: "phone is required" })
    .max(20, { message: "phone number is too long" })
    .regex(/^08[1-9][0-9]{7,10}$/, {
      message: "invalid indonesian phone number",
    }),

  password: z
    .string({ required_error: "password is required" })
    .min(8, { message: "password must be at least 8 characters" })
    .max(50, { message: "password max length is 50 characters." }),
}).pick({ email: true, name: true, phone: true, password: true });
