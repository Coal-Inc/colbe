<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
</script>

<section class="relative flex min-h-screen items-center pb-16 pt-24">
	<div class="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-5 md:flex-row md:gap-16">
		<div class="flex-1 text-center md:text-left">
			<div class="mb-5 flex items-center justify-center gap-3 md:justify-start">
				<img src="/favicon.svg" alt="Colbe" class="h-10 w-10 rounded-[15px]" />
				<span class="text-lg font-semibold text-white">Colbe</span>
			</div>
			<h1 class="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">Powering<br /><span class="text-blue-500">Imagination</span></h1>
			<p class="mt-5 text-base text-zinc-400 sm:text-lg md:max-w-md">Chat, call, and explore — all in one place.</p>
			<div class="mt-7 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
				<a href="/register" class="flex w-full items-center justify-center gap-2 rounded-[15px] bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-500 transition-colors sm:w-auto">Get started free <ArrowRight size={16} /></a>
				<a href="/login" class="rounded-[15px] px-6 py-3 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">Sign in</a>
			</div>
		</div>
		<div class="flex flex-1 justify-center">
			<svg width="220" height="440" viewBox="0 0 280 560" fill="none" class="md:h-140 md:w-70" style="transform:rotate(6deg);filter:drop-shadow(0 32px 64px rgba(59,130,246,0.2))">
				<rect x="2" y="2" width="276" height="556" rx="44" fill="#09090b" stroke="#27272a" stroke-width="2"/>
				<rect x="16" y="16" width="248" height="528" rx="36" fill="#0f0f10"/>
				<rect x="98" y="28" width="84" height="28" rx="14" fill="#09090b"/>
				<rect x="28" y="72" width="224" height="460" rx="20" fill="#18181b"/>
				<rect x="28" y="72" width="224" height="48" rx="20" fill="#1c1c1f"/>
				<circle cx="60" cy="96" r="14" fill="#3f3f46"/>
				<rect x="84" y="88" width="80" height="8" rx="4" fill="#3f3f46"/>
				<rect x="84" y="100" width="50" height="6" rx="3" fill="#27272a"/>
				<rect x="44" y="140" width="140" height="36" rx="18" fill="#1d4ed8"/>
				<rect x="44" y="186" width="100" height="36" rx="18" fill="#1d4ed8"/>
				<rect x="112" y="240" width="120" height="36" rx="18" fill="#27272a"/>
				<rect x="132" y="286" width="80" height="36" rx="18" fill="#27272a"/>
				<rect x="44" y="340" width="160" height="36" rx="18" fill="#1d4ed8"/>
				<rect x="28" y="480" width="224" height="52" rx="26" fill="#1c1c1f"/>
				<circle cx="232" cy="506" r="18" fill="#1d4ed8"/>
				<path d="M226 506h10M232 500l6 6-6 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</div>
	</div>
	<div class="pointer-events-none absolute inset-0 -z-10">
		<div class="absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl md:h-96 md:w-96"></div>
	</div>
</section>