// Reference: blueprint:javascript_auth_all_persistance
import { type User, type InsertUser, type SavedPreset, type InsertPreset } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectPgSimple from "connect-pg-simple";
import { db } from "./db";
import { users, presets } from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";

const MemoryStore = createMemoryStore(session);
const PgSession = connectPgSimple(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserTier(userId: number, tier: string, expiresAt: Date | null): Promise<User | undefined>;
  updateUserStripeInfo(userId: number, customerId: string, subscriptionId: string): Promise<User | undefined>;
  incrementConversions(userId: number): Promise<void>;
  incrementPreviews(userId: number): Promise<void>;
  resetMonthlyLimits(userId: number): Promise<void>;
  
  // Preset methods
  getUserPresets(userId: number): Promise<SavedPreset[]>;
  getUserPresetCount(userId: number): Promise<number>;
  createPreset(preset: InsertPreset): Promise<SavedPreset>;
  deletePreset(presetId: number, userId: number): Promise<boolean>;
  
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private presets: Map<number, SavedPreset>;
  private nextId: number;
  private nextPresetId: number;
  public sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.presets = new Map();
    this.nextId = 1;
    this.nextPresetId = 1;
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
      tier: insertUser.tier || "free",
      tierExpiresAt: null,
      email: insertUser.email || null,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      conversionsThisMonth: 0,
      previewsToday: 0,
      lastResetDate: now,
      createdAt: now,
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserTier(userId: number, tier: string, expiresAt: Date | null): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (!user) return undefined;
    
    user.tier = tier;
    user.tierExpiresAt = expiresAt;
    this.users.set(userId, user);
    return user;
  }

  async updateUserStripeInfo(userId: number, customerId: string, subscriptionId: string): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (!user) return undefined;
    
    user.stripeCustomerId = customerId;
    user.stripeSubscriptionId = subscriptionId;
    this.users.set(userId, user);
    return user;
  }

  async incrementConversions(userId: number): Promise<void> {
    const user = this.users.get(userId);
    if (!user) return;
    
    user.conversionsThisMonth++;
    this.users.set(userId, user);
  }

  async incrementPreviews(userId: number): Promise<void> {
    const user = this.users.get(userId);
    if (!user) return;
    
    user.previewsToday++;
    this.users.set(userId, user);
  }

  async resetMonthlyLimits(userId: number): Promise<void> {
    const user = this.users.get(userId);
    if (!user) return;
    
    user.conversionsThisMonth = 0;
    user.previewsToday = 0;
    user.lastResetDate = new Date();
    this.users.set(userId, user);
  }

  async getUserPresets(userId: number): Promise<SavedPreset[]> {
    return Array.from(this.presets.values())
      .filter(p => p.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getUserPresetCount(userId: number): Promise<number> {
    return Array.from(this.presets.values()).filter(p => p.userId === userId).length;
  }

  async createPreset(preset: InsertPreset): Promise<SavedPreset> {
    const id = this.nextPresetId++;
    const newPreset: SavedPreset = {
      ...preset,
      id,
      createdAt: new Date(),
    };
    this.presets.set(id, newPreset);
    return newPreset;
  }

  async deletePreset(presetId: number, userId: number): Promise<boolean> {
    const preset = this.presets.get(presetId);
    if (!preset || preset.userId !== userId) return false;
    this.presets.delete(presetId);
    return true;
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

  async updateUserTier(userId: number, tier: string, expiresAt: Date | null): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ tier, tierExpiresAt: expiresAt })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async updateUserStripeInfo(userId: number, customerId: string, subscriptionId: string): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ stripeCustomerId: customerId, stripeSubscriptionId: subscriptionId })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async incrementConversions(userId: number): Promise<void> {
    const user = await this.getUser(userId);
    if (!user) return;
    
    await db
      .update(users)
      .set({ conversionsThisMonth: (user.conversionsThisMonth || 0) + 1 })
      .where(eq(users.id, userId));
  }

  async incrementPreviews(userId: number): Promise<void> {
    const user = await this.getUser(userId);
    if (!user) return;
    
    await db
      .update(users)
      .set({ previewsToday: (user.previewsToday || 0) + 1 })
      .where(eq(users.id, userId));
  }

  async resetMonthlyLimits(userId: number): Promise<void> {
    await db
      .update(users)
      .set({ 
        conversionsThisMonth: 0, 
        previewsToday: 0, 
        lastResetDate: new Date() 
      })
      .where(eq(users.id, userId));
  }

  async getUserPresets(userId: number): Promise<SavedPreset[]> {
    return await db
      .select()
      .from(presets)
      .where(eq(presets.userId, userId))
      .orderBy(desc(presets.createdAt));
  }

  async getUserPresetCount(userId: number): Promise<number> {
    const result = await db
      .select()
      .from(presets)
      .where(eq(presets.userId, userId));
    return result.length;
  }

  async createPreset(preset: InsertPreset): Promise<SavedPreset> {
    const [newPreset] = await db.insert(presets).values(preset).returning();
    return newPreset;
  }

  async deletePreset(presetId: number, userId: number): Promise<boolean> {
    const result = await db
      .delete(presets)
      .where(and(eq(presets.id, presetId), eq(presets.userId, userId)))
      .returning();
    return result.length > 0;
  }
}

// Use PostgreSQL storage if DATABASE_URL is available, otherwise use in-memory
export const storage = process.env.DATABASE_URL 
  ? new PostgresStorage() 
  : new MemStorage();
