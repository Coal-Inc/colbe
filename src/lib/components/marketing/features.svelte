<script lang="ts">
	import { MessageCircle, Phone, Bell, Users, Lock, Zap } from '@lucide/svelte';
	const features = [
		{ icon: MessageCircle, title: 'Real-time Messaging', desc: 'DMs and group chats that feel instant.' },
		{ icon: Phone, title: 'Voice & Video Calls', desc: 'Crystal clear calls with the people that matter.' },
		{ icon: Bell, title: 'Updates & Stories', desc: 'Share moments through status updates.' },
		{ icon: Users, title: 'Communities', desc: 'Build and grow spaces around shared interests.' },
		{ icon: Lock, title: 'Private by default', desc: 'End-to-end encrypted where it counts.' },
		{ icon: Zap, title: 'Lightning fast', desc: 'Built on the edge. Feels instant everywhere.' },
	];
</script>

<section class="mx-auto max-w-6xl px-6 py-32">
	<p class="mb-3 text-sm font-medium uppercase tracking-widest text-blue-500">What you get</p>
	<h2 class="text-4xl font-bold text-white">Everything in one place</h2>
	<p class="mt-4 max-w-lg text-zinc-400">No switching apps. No missed messages. Colbe brings your world together.</p>
	<div class="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each features as f}
		<div class="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 transition-colors">
			<f.icon size={22} class="text-blue-500" />
			<h3 class="mt-4 font-semibold text-white">{f.title}</h3>
			<p class="mt-2 text-sm text-zinc-500">{f.desc}</p>
		</div>
		{/each}
	</div>
</section>