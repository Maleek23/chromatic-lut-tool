// Community Edition - Simplified Storage (No Tiers, No Presets)
import { type User, type InsertUser } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectPgSimple from "connect-pg-simple";
import { db } from "./db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";

const MemoryStore = createMemoryStore(session);
const PgSession = connectPgSimple(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProfile(userId: number, updates: Partial<Pick<User, 'avatarUrl' | 'bannerUrl' | 'bio' | 'website' | 'twitter' | 'instagram' | 'linkedin'>>): Promise<User | undefined>;
  
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private nextId: number;
  public sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.nextId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // 24 hours
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.nextId++;
    const now = new Date();
    const user: User = {
      ...insertUser,
      id,
      email: insertUser.email || null,
      createdAt: now,
      avatarUrl: null,
      bannerUrl: null,
      bio: null,
      website: null,
      twitter: null,
      instagram: null,
      linkedin: null,
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserProfile(userId: number, updates: Partial<Pick<User, 'avatarUrl' | 'bannerUrl' | 'bio' | 'website' | 'twitter' | 'instagram' | 'linkedin'>>): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (!user) return undefined;
    
    Object.assign(user, updates);
    this.users.set(userId, user);
    return user;
  }
}

// PostgreSQL Storage Implementation
export class PostgresStorage implements IStorage {
  public sessionStore: session.Store;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is required for PostgreSQL storage");
    }
    
    this.sessionStore = new PgSession({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUserProfile(userId: number, updates: Partial<Pick<User, 'avatarUrl' | 'bannerUrl' | 'bio' | 'website' | 'twitter' | 'instagram' | 'linkedin'>>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, userId))
      .returning();
    return user;
  }
}

// Use PostgreSQL storage if DATABASE_URL is available, otherwise use in-memory
export const storage = process.env.DATABASE_URL 
  ? new PostgresStorage() 
  : new MemStorage();
