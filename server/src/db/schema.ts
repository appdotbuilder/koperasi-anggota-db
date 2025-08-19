import { serial, text, pgTable, timestamp, date } from 'drizzle-orm/pg-core';

export const membersTable = pgTable('members', {
  id: serial('id').primaryKey(),
  cif_number: text('cif_number').notNull().unique(), // Unique identifier for cooperative member
  full_name: text('full_name').notNull(),
  address: text('address').notNull(),
  member_since: date('member_since').notNull(), // Date when became a member
  phone_number: text('phone_number').notNull(),
  birth_place: text('birth_place').notNull(),
  birth_date: date('birth_date').notNull(),
  heir: text('heir'), // Nullable by default, can be null for members without designated heir
  occupation: text('occupation').notNull(),
  education: text('education').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// TypeScript types for the table schema
export type Member = typeof membersTable.$inferSelect; // For SELECT operations
export type NewMember = typeof membersTable.$inferInsert; // For INSERT operations

// Important: Export all tables for proper query building
export const tables = { members: membersTable };