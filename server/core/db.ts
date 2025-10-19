import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@shared/schema";

// Only create db connection if DATABASE_URL exists
// This allows MemoryStorage fallback when PostgreSQL is not available
export const db = process.env.DATABASE_URL
  ? drizzle(neon(process.env.DATABASE_URL), { schema })
  : null as any; // Type assertion for environments without DB
