<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import { Mail, Lock } from '@lucide/svelte';
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';

	let identifier = $state('');
	let password = $state('');
	let loading = $state(false);
	let error = $state('');

	async function login() {
		if (!identifier || !password) { error = 'Please fill in all fields.'; return; }
		loading = true;
		error = '';
		const { error: err } = await authClient.signIn.email({ email: identifier, password });
		loading = false;
		if (err) { error = err.message ?? 'Invalid credentials.'; return; }
		goto('/home');
	}
</script>

<svelte:head><title>Login — Colbe</title></svelte:head>

<!-- Cloud overlay -->
{#if loading}
<div class="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-zinc-950/80 backdrop-blur-sm">
	<svg width="80" height="56" viewBox="0 0 80 56" fill="none">
		<ellipse cx="40" cy="38" rx="32" ry="18" fill="url(#c1)"/>
		<ellipse cx="24" cy="34" rx="16" ry="14" fill="url(#c2)"/>
		<ellipse cx="56" cy="34" rx="16" ry="14" fill="url(#c2)"/>
		<ellipse cx="40" cy="28" rx="20" ry="18" fill="url(#c3)"/>
		<defs>
			<radialGradient id="c1" cx="50%" cy="30%" r="60%"><stop offset="0%" stop-color="#ffd4a8"/><stop offset="100%" stop-color="#f4a261"/></radialGradient>
			<radialGradient id="c2" cx="40%" cy="30%" r="60%"><stop offset="0%" stop-color="#ffe8cc"/><stop offset="100%" stop-color="#f4a261"/></radialGradient>
			<radialGradient id="c3" cx="50%" cy="20%" r="60%"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#ffd4a8"/></radialGradient>
		</defs>
	</svg>
	<p class="text-sm font-medium text-white">We're authenticating</p>
</div>
{/if}

<div class="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12">
	<div class="w-full max-w-sm">
		<div class="mb-8 flex flex-col items-center gap-3">
			<a href="https://colbe.cc" class="flex items-center gap-2">
				<img src="/favicon.ico" alt="Colbe" class="h-10 w-10" />
				<span class="text-lg font-semibold text-white">Colbe</span>
			</a>
			<h1 class="text-2xl font-bold text-white">Welcome back</h1>
			<p class="text-sm text-zinc-400">Sign in to your Colbe account</p>
		</div>

		{#if error}
		<div class="mb-4 rounded-2xl border border-red-800 bg-red-950/50 px-4 py-3 text-sm text-red-400">{error}</div>
		{/if}

		<form class="flex flex-col gap-3" onsubmit={(e) => { e.preventDefault(); login(); }}>
			<div class="relative">
				<Mail size={15} class="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
				<Input type="text" placeholder="Email, username or phone" bind:value={identifier} class="rounded-2xl bg-zinc-900 border-zinc-800 pl-9 h-12 text-white placeholder:text-zinc-500" />
			</div>

			<div class="relative">
				<Lock size={15} class="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
				<Input type="password" placeholder="Password" bind:value={password} class="rounded-2xl bg-zinc-900 border-zinc-800 pl-9 h-12 text-white placeholder:text-zinc-500" />
			</div>

			<Button type="submit" disabled={loading} class="mt-1 h-12 w-full rounded-2xl bg-blue-600 font-medium text-white hover:bg-blue-500 disabled:opacity-70">
				Sign in
			</Button>
		</form>

		<div class="my-6 flex items-center gap-3">
			<Separator class="flex-1 bg-zinc-800" />
			<span class="text-xs text-zinc-500">or</span>
			<Separator class="flex-1 bg-zinc-800" />
		</div>

		<p class="text-center text-xs text-zinc-600">
			By signing in you agree to our <a href="/terms" class="text-zinc-400 hover:text-white">Terms of Service</a>.
		</p>
		<p class="mt-4 text-center text-sm text-zinc-500">
			Don't have an account? <a href="/register" class="font-semibold text-white hover:underline">Sign up</a>
		</p>
	</div>
</div>