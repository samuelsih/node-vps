import { db } from "@/db";
import { users } from "@/schema/user";
import { LoginRequestType, RegisterRequestType } from "./request";
import { sql } from "drizzle-orm";

export const createUser = async (user: RegisterRequestType) => {
  const result = await db
    .insert(users)
    .values({
      email: user.email,
      name: user.name,
      phone: user.phone,
      password: sql`crypt(${user.password}, gen_salt('bf'))`,
    })
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
      phone: users.phone,
      createdAt: users.createdAt,
    });

  return result[0];
};

export const findUser = async (data: LoginRequestType) => {
  const prepare = db
    .select({
      id: users.id,
      email: users.email,
      phone: users.phone,
      name: users.name,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(
      sql`
      ${users.email} = ${sql.placeholder("email")}
      AND
      ${users.password} = crypt(
        ${sql.placeholder("password")}, 
        ${users.password}
      )
      `,
    )
    .prepare("findUser");

  const result = await prepare.execute({
    email: data.email,
    password: data.password,
  });

  return result;
};
