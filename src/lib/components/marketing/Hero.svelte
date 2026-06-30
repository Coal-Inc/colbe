<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight } from '@lucide/svelte';
	import { Avatar } from 'bits-ui';

	let audioEl: HTMLAudioElement;

	let straight = $state(false);
	let buildingVisible = $state(false);
	let screen: 'lock' | 'music' | 'pin' | 'chat' | 'brand' = $state('lock');
	let pinFilled = $state(0);
	let messages: number[] = $state([]);
	let showTyping1 = $state(false);
	let showTyping2 = $state(false);
	let clockTime = $state('');
	let clockDate = $state('');

	function updateClock() {
		const now = new Date();
		clockTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		clockDate = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
	}

	const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

	onMount(() => {
		updateClock();
		const clockInterval = setInterval(updateClock, 30000);

		(async () => {
			await sleep(400);
			straight = true;
			await sleep(1000);
			buildingVisible = true;
			await sleep(1200);
			screen = 'music';
			try {
				audioEl.volume = 0.15;
				await audioEl.play();
			} catch {}
			await sleep(2800);
			screen = 'pin';
			await sleep(500);
			for (let i = 1; i <= 4; i++) {
				await sleep(220);
				pinFilled = i;
			}
			await sleep(400);
			screen = 'chat';
			await sleep(500);
			messages = [1];
			await sleep(700);
			messages = [1, 2];
			await sleep(600);
			showTyping1 = true;
			await sleep(900);
			showTyping1 = false;
			messages = [1, 2, 3];
			await sleep(700);
			showTyping2 = true;
			await sleep(700);
			showTyping2 = false;
			messages = [1, 2, 3, 4];
			await sleep(2200);
			screen = 'brand';
		})();

		return () => clearInterval(clockInterval);
	});

	const ERIC_AVATAR = 'https://i.pinimg.com/736x/4b/45/c9/4b45c9f6e97282db1d3d9c0c8e51c72b.jpg';
	const SAMANTHA_AVATAR = 'https://i.pinimg.com/736x/6a/f0/5e/6af05e5e7c5e3f4b5e3f4b5e3f4b5e3f.jpg';
</script>

<audio bind:this={audioEl} src="/src/lib/assets/audio/secondary.mp3" preload="auto"></audio>

<section class="relative flex min-h-screen items-center pb-16 pt-24">
	<div class="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-5 md:flex-row md:gap-16">
		<div class="flex-1 text-center md:text-left">
			<div class="mb-5 flex items-center justify-center gap-3 md:justify-start">
				<img src="/favicon.svg" alt="Colbe" class="h-10 w-10 rounded-[15px]" />
				<span class="text-lg font-semibold text-white">Colbe</span>
			</div>
			<h1 class="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
				Powering<br /><span class="text-blue-500">Imagination</span>
			</h1>
			<p class="mt-5 text-base text-zinc-400 sm:text-lg md:max-w-md">
				Chat, call, and explore — all in one place.
			</p>
			<div class="mt-7 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
				<a
					href="/register"
					class="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-500 sm:w-auto"
				>
					Get started free <ArrowRight size={16} />
				</a>
				<a
					href="/login"
					class="rounded-[15px] px-6 py-3 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
				>
					Sign in
				</a>
			</div>
		</div>

		<div class="relative flex flex-1 items-center justify-center">
			<div
				class="absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
				style="opacity: {buildingVisible ? 1 : 0}; transform: translate({buildingVisible ? '0' : '-24px'}, -50%);"
			>
				<svg width="80" height="260" viewBox="0 0 80 260" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="37" y="0" width="3" height="18" fill="#3f3f46" rx="1"></rect>
					<circle cx="38.5" cy="0" r="3" fill="#ef4444" opacity={buildingVisible ? 1 : 0} class="animate-pulse"></circle>
					<rect x="4" y="18" width="68" height="220" rx="4" fill="#18181b" stroke="#27272a" stroke-width="1"></rect>
					<rect x="4" y="18" width="68" height="10" rx="4" fill="#1c1c1f"></rect>
					{#each Array(8) as _, floor}
						{#each Array(4) as _, col}
							{@const isLit = (floor * 4 + col) % 3 !== 0}
							{@const isBlue = (floor + col) % 5 === 0}
							<rect
								x={10 + col * 15}
								y={34 + floor * 24}
								width="10"
								height="14"
								rx="2"
								fill={isLit ? (isBlue ? '#1d4ed8' : '#fbbf24') : '#27272a'}
								opacity={isLit ? 0.9 : 1}
							></rect>
						{/each}
					{/each}
					<rect x="16" y="218" width="48" height="20" rx="2" fill="#1c1c1f" stroke="#27272a" stroke-width="1"></rect>
					<rect x="34" y="218" width="12" height="20" fill="#27272a" rx="1"></rect>
				</svg>
			</div>

			<div
				class="relative transition-transform duration-1200 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
				style="transform: rotate({straight ? '0deg' : '6deg'}); filter: drop-shadow(0 32px 64px rgba(59,130,246,0.22));"
			>
				<svg width="200" height="420" viewBox="0 0 200 420" fill="none" xmlns="http://www.w3.org/2000/svg" class="md:h-130 md:w-62">
					<rect x="2" y="2" width="196" height="416" rx="36" fill="#09090b" stroke="#27272a" stroke-width="2"></rect>
					<rect x="10" y="10" width="180" height="400" rx="30" fill="#0f0f10"></rect>
					<rect x="68" y="16" width="64" height="20" rx="10" fill="#09090b"></rect>
					<rect x="196" y="80" width="4" height="40" rx="2" fill="#27272a"></rect>
					<rect x="0" y="70" width="3" height="28" rx="1.5" fill="#27272a"></rect>
					<rect x="0" y="106" width="3" height="28" rx="1.5" fill="#27272a"></rect>
				</svg>

				<div class="absolute inset-0 overflow-hidden rounded-[30px]" style="top:10px;left:10px;right:10px;bottom:10px;">

					{#if screen === 'lock'}
						<div class="flex h-full w-full flex-col items-center gap-2 rounded-[15px] bg-linear-to-b from-[#0a0a1f] to-[#0f0f1a] px-4 pt-10">
							<div class="text-5xl font-thin tracking-tight text-white">{clockTime}</div>
							<div class="text-xs tracking-wide text-white/50">{clockDate}</div>
							<div class="flex-1"></div>
							<div class="mb-2 w-full rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
								<div class="mb-1 flex items-center gap-2">
									<div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-blue-600">
										<img src="/favicon.svg" alt="" class="h-3 w-3" />
									</div>
									<span class="text-[9px] font-medium uppercase tracking-widest text-white/50">Colbe</span>
									<span class="ml-auto text-[9px] text-white/30">now</span>
								</div>
								<p class="text-[11px] font-medium leading-snug text-white">Samantha sent you a message</p>
								<p class="mt-0.5 text-[10px] text-white/50">"Hey, are you free later?"</p>
							</div>
							<div class="mb-6 flex items-center gap-3">
								<div class="h-px flex-1 bg-white/10"></div>
								<div class="text-[9px] uppercase tracking-widest text-white/30">Swipe to unlock</div>
								<div class="h-px flex-1 bg-white/10"></div>
							</div>
							<div class="mb-2 h-1 w-24 rounded-full bg-white/20"></div>
						</div>
					{/if}

					{#if screen === 'music'}
						<div class="flex h-full w-full flex-col items-center justify-center gap-3 rounded-[15px] bg-linear-to-b from-[#0d0d1f] to-[#100d20] px-4">
							<div class="mb-1 flex items-center gap-1.5">
								<div class="flex h-5 w-5 items-center justify-center rounded-md bg-blue-600">
									<img src="/favicon.svg" alt="" class="h-3 w-3" />
								</div>
								<span class="text-[9px] font-semibold uppercase tracking-widest text-blue-400">Colbe Music</span>
							</div>
							<div class="flex h-24 w-24 items-center justify-center rounded-2xl bg-linear-to-br from-blue-700 to-violet-800 shadow-lg shadow-blue-900/40">
								<svg class="h-10 w-10 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
									<circle cx="12" cy="12" r="4"></circle>
									<path d="M12 8V5m0 14v-3M8 12H5m14 0h-3"></path>
								</svg>
							</div>
							<div class="text-center">
								<div class="text-sm font-semibold text-white">Secondary</div>
								<div class="mt-0.5 text-[10px] text-white/40">Colbe Original</div>
							</div>
							<div class="w-full">
								<div class="h-1 w-full overflow-hidden rounded-full bg-white/10">
									<div class="h-full w-[35%] animate-[musicprogress_4s_linear_forwards] rounded-full bg-blue-500"></div>
								</div>
								<div class="mt-1 flex justify-between text-[9px] text-white/30">
									<span>1:12</span><span>3:44</span>
								</div>
							</div>
							<div class="flex items-center gap-6">
								<button class="text-white/50" aria-label="Previous track">
									<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l12 8-12 8V4z" transform="rotate(180 12 12)"></path><rect x="4" y="4" width="2" height="16" rx="1"></rect></svg>
								</button>
								<button class="flex h-10 w-10 items-center justify-center rounded-full bg-white" aria-label="Pause">
									<svg class="h-5 w-5 text-zinc-900" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>
								</button>
								<button class="text-white/50" aria-label="Next track">
									<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l12 8-12 8V4z"></path><rect x="18" y="4" width="2" height="16" rx="1"></rect></svg>
								</button>
							</div>
						</div>
					{/if}

					{#if screen === 'pin'}
						<div class="flex h-full w-full flex-col items-center justify-center gap-5 rounded-[15px] bg-[#0f0f10]">
							<div class="text-xs uppercase tracking-widest text-white/50">Enter Passcode</div>
							<div class="flex gap-3">
								{#each [1, 2, 3, 4] as i}
									<div class="h-3 w-3 rounded-full border-2 transition-all duration-200 {pinFilled >= i ? 'border-blue-500 bg-blue-500' : 'border-white/30'}"></div>
								{/each}
							</div>
							<div class="grid w-36 grid-cols-3 gap-2">
								{#each ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'] as key}
									<button class="flex h-10 items-center justify-center rounded-[15px] border border-white/5 bg-white/8 text-sm font-medium text-white transition-colors active:bg-white/15">
										{key}
									</button>
								{/each}
							</div>
						</div>
					{/if}

					{#if screen === 'chat'}
						<div class="flex h-full w-full flex-col rounded-[15px] bg-[#09090b]">
							<div class="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/80 px-3 py-2.5">
								<Avatar.Root class="h-7 w-7 shrink-0 overflow-hidden rounded-full">
									<Avatar.Image src={ERIC_AVATAR} alt="Eric" class="h-full w-full rounded-[15px] object-cover" />
									<Avatar.Fallback class="flex h-full w-full items-center justify-center rounded-[15px] bg-blue-700 text-[9px] font-bold text-white">E</Avatar.Fallback>
								</Avatar.Root>
								<div class="min-w-0 flex-1">
									<div class="text-[10px] font-semibold leading-tight text-white">Eric & Samantha</div>
									<div class="text-[8px] text-green-400">● online</div>
								</div>
								<div class="flex items-center gap-1 rounded-md border border-blue-500/20 bg-blue-600/15 px-1.5 py-0.5">
									<img src="/favicon.svg" alt="" class="h-2.5 w-2.5" />
									<span class="text-[7px] font-semibold text-blue-400">Colbe</span>
								</div>
							</div>

							<div class="flex flex-1 flex-col gap-1.5 overflow-hidden px-2 py-2">
								{#if messages.includes(1)}
									<div class="flex animate-in items-end gap-1.5 slide-in-from-bottom-2 duration-300">
										<Avatar.Root class="h-5 w-5 shrink-0 overflow-hidden rounded-full">
											<Avatar.Image src={SAMANTHA_AVATAR} alt="Samantha" class="h-full w-full rounded-[15px] object-cover" />
											<Avatar.Fallback class="flex h-full w-full items-center justify-center rounded-[15px] bg-violet-700 text-[7px] font-bold text-white">S</Avatar.Fallback>
										</Avatar.Root>
										<div>
											<div class="mb-0.5 ml-1 text-[7px] text-white/30">Samantha</div>
											<div class="max-w-30 rounded-2xl rounded-bl-sm bg-zinc-800 px-2.5 py-1.5 text-[9px] leading-snug text-zinc-100">
												Hey, are you free later?
											</div>
										</div>
									</div>
								{/if}
								{#if messages.includes(2)}
									<div class="flex animate-in justify-end slide-in-from-bottom-2 duration-300">
										<div class="max-w-27.5 rounded-2xl rounded-br-sm bg-blue-600 px-2.5 py-1.5 text-[9px] leading-snug text-white">
											Yeah! What's up?
										</div>
									</div>
								{/if}
								{#if showTyping1}
									<div class="flex items-end gap-1.5">
										<Avatar.Root class="h-5 w-5 shrink-0 overflow-hidden rounded-full">
											<Avatar.Fallback class="flex h-full w-full items-center justify-center rounded-[15px] bg-violet-700 text-[7px] font-bold text-white">S</Avatar.Fallback>
										</Avatar.Root>
										<div class="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-zinc-800 px-3 py-2">
											<span class="h-1 w-1 animate-bounce rounded-full bg-zinc-400" style="animation-delay:0ms"></span>
											<span class="h-1 w-1 animate-bounce rounded-full bg-zinc-400" style="animation-delay:150ms"></span>
											<span class="h-1 w-1 animate-bounce rounded-full bg-zinc-400" style="animation-delay:300ms"></span>
										</div>
									</div>
								{/if}
								{#if messages.includes(3)}
									<div class="flex animate-in items-end gap-1.5 slide-in-from-bottom-2 duration-300">
										<Avatar.Root class="h-5 w-5 shrink-0 overflow-hidden rounded-full">
											<Avatar.Image src={SAMANTHA_AVATAR} alt="Samantha" class="h-full w-full rounded-[15px] object-cover" />
											<Avatar.Fallback class="flex h-full w-full items-center justify-center rounded-[15px] bg-violet-700 text-[7px] font-bold text-white">S</Avatar.Fallback>
										</Avatar.Root>
										<div>
											<div class="mb-0.5 ml-1 text-[7px] text-white/30">Samantha</div>
											<div class="max-w-32.5 rounded-2xl rounded-bl-sm bg-zinc-800 px-2.5 py-1.5 text-[9px] leading-snug text-zinc-100">
												Let's call on Colbe tonight
											</div>
										</div>
									</div>
								{/if}
								{#if showTyping2}
									<div class="flex justify-end">
										<div class="flex items-center gap-1 rounded-2xl rounded-br-sm bg-blue-600/50 px-3 py-2">
											<span class="h-1 w-1 animate-bounce rounded-full bg-white/60" style="animation-delay:0ms"></span>
											<span class="h-1 w-1 animate-bounce rounded-full bg-white/60" style="animation-delay:150ms"></span>
											<span class="h-1 w-1 animate-bounce rounded-full bg-white/60" style="animation-delay:300ms"></span>
										</div>
									</div>
								{/if}
								{#if messages.includes(4)}
									<div class="flex animate-in justify-end slide-in-from-bottom-2 duration-300">
										<div class="max-w-27.5 rounded-2xl rounded-br-sm bg-blue-600 px-2.5 py-1.5 text-[9px] leading-snug text-white">
											Already on it
										</div>
									</div>
								{/if}
							</div>

							<div class="flex items-center gap-1.5 px-2 pb-3 pt-1.5">
								<div class="flex h-8 flex-1 items-center rounded-[15px] bg-zinc-800 px-3">
									<span class="text-[9px] text-zinc-500">Message...</span>
								</div>
								<button class="flex h-8 w-8 shrink-0 items-center justify-center rounded-[15px] bg-blue-600" aria-label="Send message">
									<svg class="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
										<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
									</svg>
								</button>
							</div>
						</div>
					{/if}

					{#if screen === 'brand'}
						<div class="flex h-full w-full flex-col items-center justify-center gap-3 rounded-[15px] bg-[#09090b]">
							<div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-xl shadow-blue-900/50">
								<img src="/favicon.svg" alt="Colbe" class="h-9 w-9" />
							</div>
							<div class="text-2xl font-bold tracking-tight text-white">Colbe</div>
							<div class="text-[9px] uppercase tracking-[0.2em] text-zinc-500">Chat · Call · Explore</div>
							<div class="mt-2 flex gap-2">
								<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-600"></span>
								<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" style="animation-delay:200ms"></span>
								<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" style="animation-delay:400ms"></span>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="pointer-events-none absolute inset-0 -z-10">
		<div class="absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl md:h-96 md:w-96"></div>
	</div>
</section>

<style>
	@keyframes musicprogress {
		from { width: 35%; }
		to { width: 85%; }
	}
</style>