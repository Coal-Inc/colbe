import type { Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';

const subdomainMap: Record<string, string> = {
	api: '/api',
	about: 'about.colbe.cc',
	docs: 'documentation.colbe.cc',
};

const handleSubdomain: Handle = async ({ event, resolve }) => {
	const host = event.request.headers.get('host') ?? '';
	const subdomain = host.split('.')[0];

	if (subdomain in subdomainMap) {
		const url = new URL(event.request.url);
		url.pathname = subdomainMap[subdomain] + url.pathname;
		event.url = url;

		if (subdomain === 'api') {
			const accept = event.request.headers.get('accept') ?? '';
			if (accept.includes('text/html')) {
				return new Response(null, { status: 404 });
			}
		}
	}

	return resolve(event);
};

const handleBetterAuth: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

export const handle: Handle = async ({ event, resolve }) => {
	const host = event.request.headers.get('host') ?? '';
	const subdomain = host.split('.')[0];

	if (subdomain in subdomainMap) {
		return handleSubdomain({ event, resolve });
	}

	return handleBetterAuth({ event, resolve });
};