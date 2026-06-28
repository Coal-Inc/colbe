<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import { User, Mail, Lock, Phone, ChevronDown, Loader } from '@lucide/svelte';
	import { authClient } from '$lib/auth-client.js';
	import { goto } from '$app/navigation';

	let name = $state('');
	let username = $state('');
	let email = $state('');
	let phone = $state('');
	let password = $state('');
	let age = $state('');
	let loading = $state(false);
	let error = $state('');

	const ages = ['13–17', '18–24', '25–34', '35–44', '45–54', '55+'];

	async function register() {
		if (!name || !username || !password || !age) {
			error = 'Name, username, password and age are required.';
			return;
		}
		if (!email && !phone) {
			error = 'Please provide at least an email or phone number.';
			return;
		}
		loading = true;
		error = '';
		const { error: err } = await authClient.signUp.email({
			name,
			email,
			password,
			username,
			phoneNumber: phone || undefined,
		});
		loading = false;
		if (err) { error = err.message ?? 'Something went wrong.'; return; }
		goto('/home');
	}
</script>

<svelte:head><title>Register — Colbe</title></svelte:head>

<div class="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12">
	<div class="w-full max-w-sm">
		<div class="mb-8 flex flex-col items-center gap-3">
			<a href="https://colbe.cc" class="flex items-center gap-2">
				<img src="/favicon.ico" alt="Colbe" class="h-10 w-10" />
				<span class="text-lg font-semibold text-white">Colbe</span>
			</a>
			<h1 class="text-2xl font-bold text-white">Create an account</h1>
			<p class="text-sm text-zinc-400">Start your Colbe journey today</p>
		</div>

		{#if error}
		<div class="mb-4 rounded-xl border border-red-800 bg-red-950/50 px-4 py-3 text-sm text-red-400">{error}</div>
		{/if}

		<form class="flex flex-col gap-3" onsubmit={(e) => { e.preventDefault(); register(); }}>
			<div class="relative">
				<User size={15} class="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
				<Input type="text" placeholder="Full name *" bind:value={name} class="rounded-xl bg-zinc-900 border-zinc-800 pl-9 h-12 text-white placeholder:text-zinc-500" />
			</div>

			<div class="relative">
				<span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">@</span>
				<Input type="text" placeholder="Username *" bind:value={username} class="rounded-xl bg-zinc-900 border-zinc-800 pl-8 h-12 text-white placeholder:text-zinc-500" />
			</div>

			<div class="relative">
				<Mail size={15} class="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
				<Input type="email" placeholder="Email (optional)" bind:value={email} class="rounded-xl bg-zinc-900 border-zinc-800 pl-9 h-12 text-white placeholder:text-zinc-500" />
			</div>

			<div class="relative">
				<Phone size={15} class="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
				<Input type="tel" placeholder="Phone number (optional)" bind:value={phone} class="rounded-xl bg-zinc-900 border-zinc-800 pl-9 h-12 text-white placeholder:text-zinc-500" />
			</div>

			<div class="relative">
				<Lock size={15} class="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
				<Input type="password" placeholder="Password *" bind:value={password} class="rounded-xl bg-zinc-900 border-zinc-800 pl-9 h-12 text-white placeholder:text-zinc-500" />
			</div>

			<div class="relative">
				<ChevronDown size={15} class="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
				<select bind:value={age} class="h-12 w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 text-sm text-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-600">
					<option value="" disabled selected>Age bracket *</option>
					{#each ages as a}<option value={a}>{a}</option>{/each}
				</select>
			</div>

			<div class="relative mt-1">
				<Button type="submit" disabled={loading} class="relative h-12 w-full overflow-hidden rounded-xl bg-blue-600 font-medium text-white hover:bg-blue-500 disabled:opacity-70">
					{#if loading}
					<div class="absolute inset-0 z-10 flex items-center justify-center gap-2 bg-blue-700/90 backdrop-blur-sm">
						<Loader size={16} class="animate-spin" />
						<span class="text-sm">Creating account...</span>
					</div>
					{/if}
					Create account
				</Button>
			</div>
		</form>

		<div class="my-6 flex items-center gap-3">
			<Separator class="flex-1 bg-zinc-800" />
			<span class="text-xs text-zinc-500">or</span>
			<Separator class="flex-1 bg-zinc-800" />
		</div>

		<p class="text-center text-xs text-zinc-600">
			By registering you agree to our
			<a href="/terms" class="text-zinc-400 hover:text-white">Terms of Service</a>
			and <a href="/privacy" class="text-zinc-400 hover:text-white">Privacy Policy</a>.
		</p>
		<p class="mt-4 text-center text-sm text-zinc-500">
			Already have an account? <a href="/login" class="font-semibold text-white hover:underline">Sign in</a>
		</p>
	</div>
</div>