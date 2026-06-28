import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';

// Subdomain → internal path map
const subdomainMap: Record<string, string> = {
	api: '/api',
	about: '/about',
	docs: '/docs',
	documentation: '/docs',
	pricing: '/pricing',
};

// Subdomains that should never render HTML
const apiOnlySubdomains = new Set(['api']);

const handleSubdomain: Handle = async ({ event, resolve }) => {
	const host = event.request.headers.get('host') ?? '';
	const parts = host.split('.');

	// Only rewrite if it's a real subdomain (e.g. api.colbe.cc, not colbe.cc)
	if (parts.length < 3) return resolve(event);

	const subdomain = parts[0];
	if (!(subdomain in subdomainMap)) return resolve(event);

	// Block HTML requests to API subdomain
	if (apiOnlySubdomains.has(subdomain)) {
		const accept = event.request.headers.get('accept') ?? '';
		if (accept.includes('text/html')) {
			return new Response('Not Found', { status: 404 });
		}
	}

	// Rewrite URL pathname internally
	const mapped = subdomainMap[subdomain];
	const url = new URL(event.request.url);

	// Avoid double-prefixing
	if (!url.pathname.startsWith(mapped)) {
		url.pathname = mapped + (url.pathname === '/' ? '' : url.pathname);
		event.url = url;
	}

	return resolve(event);
};

const handleAuth: Handle = async ({ event, resolve }) => {
	try {
		const session = await auth.api.getSession({ headers: event.request.headers });
		if (session) {
			event.locals.session = session.session;
			event.locals.user = session.user;
		}
	} catch {
		// Session fetch failed — continue unauthenticated
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

export const handle: Handle = sequence(handleSubdomain, handleAuth);