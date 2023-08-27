import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

declare global {
    type DB = PostgresJsDatabase<NonNullable<unknown>>
}