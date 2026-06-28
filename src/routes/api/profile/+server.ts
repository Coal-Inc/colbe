import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });
	const user = await db.select().from(users).where(eq(users.id, locals.user.id)).get();
	return json(user);
};

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });
	const { name, username, phone, avatar } = await request.json();
	await db.update(users).set({
		name,
		username,
		phone,
		avatar,
		updatedAt: new Date(),
	}).where(eq(users.id, locals.user.id));
	return json({ success: true });
};