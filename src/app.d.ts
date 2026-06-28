import type { User, Session } from 'better-auth';

declare global {
	namespace App {
		interface Platform {
			env: Env;
			ctx: ExecutionContext;
			caches: CacheStorage;
			cf?: IncomingRequestCfProperties;
		}

		interface Locals {
			user?: User & { username?: string | null; phone?: string | null; avatar?: string | null };
			session?: Session;
		}
	}
}

export {};