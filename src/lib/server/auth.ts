import { env } from '$env/dynamic/private';
import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { username, phoneNumber } from 'better-auth/plugins';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db/index.js';

export const auth = betterAuth({
	baseURL: env.ORIGIN,
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: 'sqlite' }),
	emailAndPassword: { enabled: true },
	plugins: [
		username(),
		phoneNumber(),
		sveltekitCookies(getRequestEvent)
	]
});