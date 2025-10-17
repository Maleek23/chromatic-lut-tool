// Reference: blueprint:javascript_auth_all_persistance
import { type User, type InsertUser } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserTier(userId: number, tier: string, expiresAt: Date | null): Promise<User | undefined>;
  updateUserStripeInfo(userId: number, customerId: string, subscriptionId: string): Promise<User | undefined>;
  incrementConversions(userId: number): Promise<void>;
  incrementPreviews(userId: number): Promise<void>;
  resetMonthlyLimits(userId: number): Promise<void>;
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
}

export const storage = new MemStorage();
