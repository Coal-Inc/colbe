<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { AlertDialog, DateField, AspectRatio } from 'bits-ui';
	import { User, Mail, Lock, Phone, AlertCircle, CheckCircle2 } from '@lucide/svelte';
	import { authClient } from '$lib/auth-client.js';
	import { goto } from '$app/navigation';

	let name = $state('');
	let username = $state('');
	let email = $state('');
	let phone = $state('');
	let password = $state('');
	let birthday = $state<any>(null);
	let loading = $state(false);
	let error = $state('');
	let success = $state('');
	let tosOpen = $state(false);

	async function validate() {
		error = '';
		if (!name || !username || !password) { error = 'Name, username and password are required.'; return false; }
		if (!email && !phone) { error = 'Provide at least an email or phone number.'; return false; }
		if (!birthday) { error = 'Please enter your birthday.'; return false; }

		// Username restriction
		const uRes = await fetch('/api/restrictions', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ type: 'username', value: username }) });
		const u = await uRes.json();
		if (!u.allowed) { error = u.reason; return false; }

		// Email restriction
		if (email) {
			const eRes = await fetch('/api/restrictions', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ type: 'email', value: email }) });
			const e = await eRes.json();
			if (!e.allowed) { error = e.reason; return false; }
		}

		// Birthday restriction
		const bRes = await fetch('/api/restrictions', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ type: 'birthday', value: birthday.toString() }) });
		const b = await bRes.json();
		if (!b.allowed) { error = b.reason; return false; }

		return true;
	}

	async function handleSubmit() {
		const valid = await validate();
		if (!valid) return;
		tosOpen = true;
	}

	async function register() {
		tosOpen = false;
		loading = true;
		error = '';
		const { error: err } = await authClient.signUp.email({
			name,
			email: email || `${username}@noemail.colbe.internal`,
			password,
			username,
			phoneNumber: phone || undefined,
		});
		loading = false;
		if (err) { error = err.message ?? 'Something went wrong.'; return; }
		success = 'Account created! Redirecting...';
		setTimeout(() => goto('/home'), 1500);
	}
</script>

<svelte:head><title>Register — Colbe</title></svelte:head>

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

<!-- ToS Alert Dialog -->
<AlertDialog.Root bind:open={tosOpen}>
	<AlertDialog.Portal>
		<AlertDialog.Overlay class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
		<AlertDialog.Content class="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
			<AlertDialog.Title class="text-lg font-semibold text-white">Before you join</AlertDialog.Title>
			<AlertDialog.Description class="mt-2 text-sm text-zinc-400">
				By creating an account you agree to Colbe's
				<a href="/terms" class="text-blue-400 hover:underline">Terms of Service</a> and
				<a href="/privacy" class="text-blue-400 hover:underline">Privacy Policy</a>.
				Your messages are end-to-end encrypted by default.
			</AlertDialog.Description>
			<div class="mt-6 flex gap-3">
				<AlertDialog.Cancel class="flex-1 rounded-2xl border border-zinc-700 py-2.5 text-sm text-zinc-300 hover:border-zinc-500 transition-colors">Cancel</AlertDialog.Cancel>
				<AlertDialog.Action onclick={register} class="flex-1 rounded-2xl bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors">I agree</AlertDialog.Action>
			</div>
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>

<div class="flex min-h-screen bg-zinc-950">
	<!-- Left — form -->
	<div class="flex flex-1 items-center justify-center px-6 py-12">
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
			<Alert.Root variant="destructive" class="mb-4 rounded-2xl">
				<AlertCircle size={16} />
				<Alert.Title>Error</Alert.Title>
				<Alert.Description>{error}</Alert.Description>
			</Alert.Root>
			{/if}

			{#if success}
			<Alert.Root class="mb-4 rounded-2xl border-green-800 bg-green-950/50">
				<CheckCircle2 size={16} class="text-green-400" />
				<Alert.Title class="text-green-400">Success</Alert.Title>
				<Alert.Description class="text-green-400">{success}</Alert.Description>
			</Alert.Root>
			{/if}

			<form class="flex flex-col gap-3" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
				<div class="relative">
					<User size={15} class="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
					<Input type="text" placeholder="Full name *" bind:value={name} class="rounded-2xl bg-zinc-900 border-zinc-800 pl-9 h-12 text-white placeholder:text-zinc-500" />
				</div>

				<div class="relative">
					<span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">@</span>
					<Input type="text" placeholder="Username *" bind:value={username} class="rounded-2xl bg-zinc-900 border-zinc-800 pl-8 h-12 text-white placeholder:text-zinc-500" />
				</div>

				<div class="relative">
					<Mail size={15} class="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
					<Input type="email" placeholder="Email (optional)" bind:value={email} class="rounded-2xl bg-zinc-900 border-zinc-800 pl-9 h-12 text-white placeholder:text-zinc-500" />
				</div>

				<div class="relative">
					<Phone size={15} class="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
					<Input type="tel" placeholder="Phone number (optional)" bind:value={phone} class="rounded-2xl bg-zinc-900 border-zinc-800 pl-9 h-12 text-white placeholder:text-zinc-500" />
				</div>

				<div class="relative">
					<Lock size={15} class="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
					<Input type="password" placeholder="Password *" bind:value={password} class="rounded-2xl bg-zinc-900 border-zinc-800 pl-9 h-12 text-white placeholder:text-zinc-500" />
				</div>

				<!-- Birthday -->
				<DateField.Root bind:value={birthday}>
					<div class="flex flex-col gap-1">
						<DateField.Label class="text-xs text-zinc-500">Birthday *</DateField.Label>
						<DateField.Input class="flex h-12 w-full items-center rounded-2xl border border-zinc-800 bg-zinc-900 px-3 text-sm text-white">
							{#snippet children({ segments })}
								{#each segments as { part, value }, i (part + i)}
									<div class="inline-block">
										{#if part === 'literal'}
											<DateField.Segment {part} class="text-zinc-600 px-0.5">{value}</DateField.Segment>
										{:else}
											<DateField.Segment {part} class="rounded-lg px-1 py-0.5 hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white aria-[valuetext=Empty]:text-zinc-600 focus-visible:ring-0">{value}</DateField.Segment>
										{/if}
									</div>
								{/each}
							{/snippet}
						</DateField.Input>
					</div>
				</DateField.Root>

				<Button type="submit" disabled={loading} class="mt-1 h-12 w-full rounded-2xl bg-blue-600 font-medium text-white hover:bg-blue-500 disabled:opacity-70">
					Create account
				</Button>
			</form>

			<div class="my-6 flex items-center gap-3">
				<Separator class="flex-1 bg-zinc-800" />
				<span class="text-xs text-zinc-500">or</span>
				<Separator class="flex-1 bg-zinc-800" />
			</div>

			<p class="mt-4 text-center text-sm text-zinc-500">
				Already have an account? <a href="/login" class="font-semibold text-white hover:underline">Sign in</a>
			</p>
		</div>
	</div>

	<!-- Right — image (desktop only) -->
	<div class="hidden lg:flex flex-1 items-center justify-center bg-zinc-900 p-12">
		<div class="w-full max-w-md">
			<AspectRatio.Root ratio={14 / 9} class="rounded-2xl overflow-hidden">
				<img src="/favicon.svg" alt="Colbe" class="h-full w-full object-cover opacity-20" />
			</AspectRatio.Root>
			<div class="mt-8 text-center">
				<h2 class="text-2xl font-bold text-white">Powering Imagination</h2>
				<p class="mt-2 text-sm text-zinc-400">Chat, call and explore with the people that matter.</p>
			</div>
		</div>
	</div>
</div>