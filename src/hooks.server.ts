import type { Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';

const handleBetterAuth: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

const handleSubdomain: Handle = async ({ event, resolve }) => {
	const host = event.request.headers.get('host') ?? '';

	if (host.startsWith('api.')) {
		const url = new URL(event.request.url);
		url.pathname = '/api' + url.pathname;
		event.url = url;
		// Block direct browser access
		const accept = event.request.headers.get('accept') ?? '';
		if (accept.includes('text/html')) {
			return new Response(null, { status: 404 });
		}
	}

	return resolve(event);
};

export const handle: Handle = async ({ event, resolve }) => {
	await handleSubdomain({ event, resolve: async () => new Response() });
	return handleBetterAuth({ event, resolve });
};