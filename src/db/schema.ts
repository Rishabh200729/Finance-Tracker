import { integer, pgTable, varchar, timestamp, unique, doublePrecision } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable('users', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const transactions = pgTable('transactions', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }).notNull(),
    amount: doublePrecision('amount').notNull(),
    category: varchar('category', { length: 100 }).notNull(),
    date: timestamp('date').notNull(),
    description: varchar('description', { length: 255 }),
});
export const monthly_incomes = pgTable('monthly_incomes', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }).notNull(),
    amount: doublePrecision('amount').notNull(),
    date: timestamp('date').notNull(),
    month: varchar('month', { length: 20 }).notNull(),
    year: varchar('year', { length: 4 }).notNull(),
}, (table) => {
    return {
        uniqueUserMonthYearIncome: unique('user_month_year_income_unique').on(table.userId, table.month, table.year),
    };
});
export const budgets = pgTable('budgets', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }).notNull(),
    category: varchar('category', { length: 100 }).notNull(),
    spent: doublePrecision('spent').notNull().default(0),
    limit: doublePrecision('limit').notNull(),
    month: varchar('month', { length: 20 }).notNull(),
    year: varchar('year', { length: 4 }).notNull(),
}, (table) => {
    return {
        uniqueUserCategoryMonthYear: unique('user_category_month_year_unique').on(table.userId, table.category, table.month, table.year),
    };
});
export const savingsGoals = pgTable('savings_goals', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }).notNull(),
    goalName: varchar('goal_name', { length: 255 }).notNull(),
    targetAmount: doublePrecision('target_amount').notNull(),
    currentAmount: doublePrecision('current_amount').notNull().default(0),
    deadline: timestamp('deadline'),
});

export const userRelations = relations(users, ({ many }) => ({
    transactions: many(transactions),
    budgets: many(budgets),
    savingsGoals: many(savingsGoals),
    monthlyIncomes: many(monthly_incomes),
}));

export const transactionRelations = relations(transactions, ({ one }) => ({
    user: one(users, { fields: [transactions.userId], references: [users.id] }),
}));

export const budgetRelations = relations(budgets, ({ one }) => ({
    user: one(users, { fields: [budgets.userId], references: [users.id] }),
}));

export const savingsGoalRelations = relations(savingsGoals, ({ one }) => ({
    user: one(users, { fields: [savingsGoals.userId], references: [users.id] }),
}));

export const monthlyIncomeRelations = relations(monthly_incomes, ({ one }) => ({
    user: one(users, { fields: [monthly_incomes.userId], references: [users.id] }),
}));