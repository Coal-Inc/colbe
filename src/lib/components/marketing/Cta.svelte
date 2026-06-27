<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
</script>

<section class="mx-auto flex max-w-6xl flex-col items-center gap-12 px-5 py-20 md:flex-row md:gap-16 md:py-32">
	<div class="flex-1 text-center md:text-left">
		<div class="mb-5 flex items-center justify-center gap-3 md:justify-start">
			<img src="/favicon.svg" alt="Colbe" class="h-9 w-9" />
			<span class="text-lg font-semibold text-white">Colbe</span>
		</div>
		<h2 class="text-3xl font-bold text-white sm:text-4xl md:text-5xl">Start free.<br />Stay for the experience.</h2>
		<p class="mt-4 text-zinc-400">Join Colbe today, what are u waiting for?.</p>
		<div class="mt-7 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
			<a href="/register" class="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-500 transition-colors sm:w-auto">Create account <ArrowRight size={16} /></a>
			<div class="hidden h-6 w-px bg-zinc-700 sm:block"></div>
			<a href="/login" class="rounded-full border border-zinc-700 px-6 py-3 text-sm text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors">Sign in</a>
		</div>
	</div>
	<div class="flex flex-1 justify-center">
		<svg width="200" height="400" viewBox="0 0 280 560" fill="none" class="md:h-120 md:w-60" style="transform:rotate(-5deg);filter:drop-shadow(0 32px 64px rgba(59,130,246,0.15))">
			<rect x="2" y="2" width="276" height="556" rx="44" fill="#09090b" stroke="#27272a" stroke-width="2"/>
			<rect x="16" y="16" width="248" height="528" rx="36" fill="#0f0f10"/>
			<rect x="98" y="28" width="84" height="28" rx="14" fill="#09090b"/>
			<rect x="28" y="72" width="224" height="460" rx="20" fill="#18181b"/>
			<rect x="28" y="72" width="224" height="48" rx="20" fill="#1c1c1f"/>
			<circle cx="60" cy="96" r="14" fill="#3f3f46"/>
			<rect x="84" y="88" width="80" height="8" rx="4" fill="#3f3f46"/>
			<rect x="84" y="100" width="50" height="6" rx="3" fill="#27272a"/>
			<rect x="112" y="140" width="120" height="36" rx="18" fill="#27272a"/>
			<rect x="44" y="186" width="140" height="36" rx="18" fill="#1d4ed8"/>
			<rect x="112" y="240" width="100" height="36" rx="18" fill="#27272a"/>
			<rect x="44" y="286" width="160" height="36" rx="18" fill="#1d4ed8"/>
			<rect x="44" y="340" width="110" height="36" rx="18" fill="#1d4ed8"/>
			<rect x="28" y="480" width="224" height="52" rx="26" fill="#1c1c1f"/>
			<circle cx="232" cy="506" r="18" fill="#1d4ed8"/>
			<path d="M226 506h10M232 500l6 6-6 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</div>
</section>