<script lang="ts">
	import { MessageCircle, Phone, Bell, Users, Lock, Zap } from '@lucide/svelte';
	const features = [
		{ icon: MessageCircle, title: 'Messaging', desc: 'Real-time DMs and group chats.' },
		{ icon: Phone, title: 'Calls', desc: 'Voice and video with the people that matter.' },
		{ icon: Bell, title: 'Updates', desc: 'Share moments through status and stories.' },
		{ icon: Users, title: 'Communities', desc: 'Build spaces around shared interests.' },
		{ icon: Lock, title: 'Private by default', desc: 'End-to-end encrypted where it counts.' },
		{ icon: Zap, title: 'Built for speed', desc: 'Messages are sent at fast speeds' },
	];
</script>

<section class="mx-auto max-w-6xl px-5 py-20 md:py-32">
	<p class="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-500">What you get</p>
	<h2 class="text-3xl font-bold text-white md:text-4xl">Everything in one place</h2>
	<p class="mt-3 text-zinc-400">No switching apps. No missed messages.</p>
	<div class="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
		{#each features as f}
		<div class="rounded-[15px] border border-zinc-800 bg-zinc-900/50 p-5 hover:border-zinc-700 transition-colors">
			<f.icon size={20} class="text-blue-500" />
			<h3 class="mt-3 font-semibold text-white">{f.title}</h3>
			<p class="mt-1 text-sm text-zinc-500">{f.desc}</p>
		</div>
		{/each}
	</div>
</section>