<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
</script>

<svelte:head><title>Login — Colbe</title></svelte:head>

<div class="flex min-h-screen items-center justify-center px-4">
	<div class="w-full max-w-sm">
		<div class="mb-8 flex flex-col items-center gap-2">
			<img src="/favicon.svg" alt="Colbe" class="h-10 w-10" />
			<h1 class="text-xl font-semibold text-white">Welcome back</h1>
			<p class="text-sm text-zinc-400">Sign in to your Colbe account</p>
		</div>

		<form class="flex flex-col gap-3">
			<Input type="email" placeholder="Email" class="rounded-full" />
			<Input type="password" placeholder="Password" class="rounded-full" />
			<Button class="rounded-full bg-blue-600 hover:bg-blue-500">Sign in</Button>
		</form>

		<div class="my-6 flex items-center gap-3">
			<Separator class="flex-1" />
			<span class="text-xs text-zinc-500">or</span>
			<Separator class="flex-1" />
		</div>

		<p class="text-center text-sm text-zinc-500">
			Don't have an account? <a href="/register" class="text-white hover:underline">Sign up</a>
		</p>
	</div>
</div>