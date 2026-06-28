import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

const BLOCKED_DOMAINS = ['tempmail.com', 'mailinator.com', 'guerrillamail.com', 'throwam.com', 'yopmail.com'];
const BANNED_WORDS = ['admin', 'colbe', 'support', 'moderator'];

export const POST: RequestHandler = async ({ request }) => {
	const { type, value } = await request.json();

	switch (type) {
		case 'email': {
			if (!value) return json({ allowed: true });
			const domain = value.split('@')[1]?.toLowerCase();
			if (BLOCKED_DOMAINS.includes(domain)) return json({ allowed: false, reason: 'Disposable emails are not allowed.' });
			return json({ allowed: true });
		}
		case 'username': {
			if (!value || value.length < 3) return json({ allowed: false, reason: 'Username must be at least 3 characters.' });
			if (value.length > 24) return json({ allowed: false, reason: 'Username must be under 24 characters.' });
			if (!/^[a-zA-Z0-9_]+$/.test(value)) return json({ allowed: false, reason: 'Only letters, numbers and underscores allowed.' });
			if (BANNED_WORDS.some(w => value.toLowerCase().includes(w))) return json({ allowed: false, reason: 'Username contains restricted words.' });
			return json({ allowed: true });
		}
		case 'birthday': {
			const dob = new Date(value);
			const age = Math.floor((Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
			if (age < 13) return json({ allowed: false, reason: 'You must be 13 or older to use Colbe.' });
			return json({ allowed: true });
		}
		default:
			return json({ allowed: false, reason: 'Unknown restriction type.' }, { status: 400 });
	}
};