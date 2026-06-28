import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	username: text('username').unique(),
	email: text('email').notNull().unique(),
	emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
	phone: text('phone').unique(),
	avatar: text('avatar'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});

export const sessions = sqliteTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
	token: text('token').notNull().unique(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});

export const accounts = sqliteTable('accounts', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	expiresAt: integer('expires_at', { mode: 'timestamp' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});

export const verifications = sqliteTable('verifications', {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});

export const conversations = sqliteTable('conversations', {
	id: text('id').primaryKey(),
	type: text('type', { enum: ['dm', 'group'] }).notNull().default('dm'),
	name: text('name'),
	avatar: text('avatar'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});

export const conversationMembers = sqliteTable('conversation_members', {
	id: text('id').primaryKey(),
	conversationId: text('conversation_id').notNull().references(() => conversations.id, { onDelete: 'cascade' }),
	userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
	joinedAt: integer('joined_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});

export const messages = sqliteTable('messages', {
	id: text('id').primaryKey(),
	conversationId: text('conversation_id').notNull().references(() => conversations.id, { onDelete: 'cascade' }),
	senderId: text('sender_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
	content: text('content').notNull(),
	encrypted: integer('encrypted', { mode: 'boolean' }).notNull().default(true),
	type: text('type', { enum: ['text', 'image', 'audio', 'video', 'file'] }).notNull().default('text'),
	readAt: integer('read_at', { mode: 'timestamp' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
	deletedAt: integer('deleted_at', { mode: 'timestamp' }),
});

export const calls = sqliteTable('calls', {
	id: text('id').primaryKey(),
	conversationId: text('conversation_id').references(() => conversations.id),
	initiatorId: text('initiator_id').notNull().references(() => users.id),
	type: text('type', { enum: ['voice', 'video'] }).notNull(),
	status: text('status', { enum: ['ringing', 'active', 'ended', 'missed'] }).notNull().default('ringing'),
	startedAt: integer('started_at', { mode: 'timestamp' }),
	endedAt: integer('ended_at', { mode: 'timestamp' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});

export const stories = sqliteTable('stories', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
	content: text('content').notNull(),
	mediaUrl: text('media_url'),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});

export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Conversation = typeof conversations.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Call = typeof calls.$inferSelect;
export type Story = typeof stories.$inferSelect;