<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
</script>

<svelte:head><title>Register — Colbe</title></svelte:head>

<div class="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
	<div class="w-full max-w-sm">
		<div class="mb-8 flex flex-col items-center gap-3">
			<img src="/favicon.svg" alt="Colbe" class="h-14 w-14" />
			<h1 class="text-2xl font-bold text-white">Create an account</h1>
			<p class="text-sm text-zinc-400">Start your Colbe Adventure</p>
		</div>

		<form class="flex flex-col gap-3">
			<Input type="text" placeholder="Full name" class="rounded-lg bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 h-12" />
			<Input type="email" placeholder="Email" class="rounded-lg bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 h-12" />
			<Input type="password" placeholder="Password" class="rounded-lg bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 h-12" />
			<Button class="mt-1 h-12 rounded-x1 bg-blue-600 text-white hover:bg-blue-500 font-medium">Create account</Button>
		</form>

		<div class="my-6 flex items-center gap-3">
			<Separator class="flex-1 bg-zinc-800" />
			<span class="text-xs text-zinc-500">or</span>
			<Separator class="flex-1 bg-zinc-800" />
		</div>

		<p class="text-center text-sm text-zinc-500">
			Already have an account? <a href="/login" class="font-semibold text-white hover:underline">Sign in</a>
		</p>
	</div>
</div>