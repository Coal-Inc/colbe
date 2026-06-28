import { createAuthClient } from 'better-auth/client';
import { usernameClient, phoneNumberClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
	baseURL: 'https://colbe.cc',
	plugins: [
		usernameClient(),
		phoneNumberClient(),
	]
});