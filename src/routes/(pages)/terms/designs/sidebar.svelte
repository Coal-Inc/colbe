<script lang="ts">
	import { ScrollArea, ScrollAreaScrollbar } from '$lib/components/ui/scroll-area';

	const sections = [
		{ id: 'acceptance', label: 'Acceptance of Terms' },
		{ id: 'usage', label: 'Acceptable Use' },
		{ id: 'account', label: 'Your Account' },
		{ id: 'content', label: 'User Content' },
		{ id: 'termination', label: 'Termination' },
		{ id: 'liability', label: 'Limitation of Liability' },
		{ id: 'changes', label: 'Changes to Terms' },
		{ id: 'contact', label: 'Contact' },
	];

	let active = $state('acceptance');
</script>

<aside class="hidden w-64 shrink-0 border-r border-zinc-800 md:block">
	<ScrollArea class="h-screen">
		<div class="px-5 py-16">
			<a href="/" class="mb-8 flex items-center gap-2">
				<img src="/favicon.ico" alt="Colbe" class="h-6 w-6" />
				<span class="text-sm font-semibold text-white">Colbe</span>
			</a>

			<p class="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">Sections</p>

			<nav class="flex flex-col gap-1">
				{#each sections as s}
					<a href="#{s.id}" onclick={() => (active = s.id)} class="rounded-lg px-3 py-2 text-sm transition-colors {active === s.id ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'}">{s.label}</a>
				{/each}
			</nav>

			<div class="mt-10 border-t border-zinc-800 pt-6">
				<p class="mb-2 text-xs text-zinc-600">Also read</p>
				<a href="/privacy" class="block py-1 text-sm text-zinc-400 transition-colors hover:text-white">Privacy Policy</a>
				<a href="/cookies" class="block py-1 text-sm text-zinc-400 transition-colors hover:text-white">Cookie Policy</a>
			</div>
		</div>
		<ScrollAreaScrollbar orientation="vertical" />
	</ScrollArea>
</aside>