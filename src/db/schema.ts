import {integer, pgTable, varchar, timestamp} from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('name', {length: 255}).notNull(),
    email: varchar('email', {length: 255}).notNull().unique(),
    passwordHash: varchar('password_hash', {length: 255}).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
}); 

export const transactions = pgTable('transactions', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    userId: integer('user_id').notNull().references(() => users.id),
    amount: integer('amount').notNull(),
    category: varchar('category', {length: 100}).notNull(),
    date: timestamp('date').notNull(),
    description: varchar('description', {length: 255}),
});

export const budgets = pgTable('budgets', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    userId: integer('user_id').notNull().references(() => users.id),
    category: varchar('category', {length: 100}).notNull(),
    amount: integer('amount').notNull(),
    month: varchar('month', {length: 7}).notNull(), // Format: YYYY-MM
});
export const savingsGoals = pgTable('savings_goals', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    userId: integer('user_id').notNull().references(() => users.id),
    goalName: varchar('goal_name', {length: 255}).notNull(),
    targetAmount: integer('target_amount').notNull(),
    currentAmount: integer('current_amount').notNull().default(0),
    deadline: timestamp('deadline'),
});
