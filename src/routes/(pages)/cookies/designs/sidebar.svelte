<script lang="ts">
	import { ScrollArea } from 'bits-ui';
	import { Cookie, Shield, EyeOff, Settings, RefreshCw, Mail } from '@lucide/svelte';

	const sections = [
		{ id: 'what', label: 'What Are Cookies', icon: Cookie },
		{ id: 'essential', label: 'Essential Cookies', icon: Shield },
		{ id: 'notracking', label: 'No Tracking Cookies', icon: EyeOff },
		{ id: 'control', label: 'Your Control', icon: Settings },
		{ id: 'changes', label: 'Changes to Policy', icon: RefreshCw },
		{ id: 'contact', label: 'Contact', icon: Mail },
	];

	let active = $state('what');
</script>

<aside class="hidden w-64 shrink-0 border-r border-zinc-800 md:block">
	<ScrollArea.Root class="h-screen">
		<ScrollArea.Viewport class="h-full px-5 py-16">
			<a href="/" class="mb-8 flex items-center gap-2"><img src="/favicon.ico" alt="Colbe" class="h-6 w-6" /><span class="text-sm font-semibold text-white">Colbe</span></a>

			<p class="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">Sections</p>

			<nav class="flex flex-col gap-1">
				{#each sections as s}
					<a href="#{s.id}" onclick={() => (active = s.id)} class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors {active === s.id ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'}"><s.icon size={14} />{s.label}</a>
				{/each}
			</nav>

			<div class="mt-10 border-t border-zinc-800 pt-6">
				<p class="mb-2 text-xs text-zinc-600">Also read</p>
				<a href="/terms" class="block py-1 text-sm text-zinc-400 transition-colors hover:text-white">Terms of Service</a>
				<a href="/privacy" class="block py-1 text-sm text-zinc-400 transition-colors hover:text-white">Privacy Policy</a>
			</div>
		</ScrollArea.Viewport>
		<ScrollArea.Scrollbar orientation="vertical" />
	</ScrollArea.Root>
</aside>