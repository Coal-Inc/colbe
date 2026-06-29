<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight } from '@lucide/svelte';
	import { Avatar } from 'bits-ui';

	let phoneEl: HTMLDivElement;
	let audioEl: HTMLAudioElement;

	// Animation state
	let straight = false;
	let buildingVisible = false;
	let screen: 'lock' | 'music' | 'pin' | 'chat' | 'brand' = 'lock';
	let pinFilled = 0;
	let messages: number[] = [];
	let showTyping1 = false;
	let showTyping2 = false;

	// Live clock
	let clockTime = '';
	let clockDate = '';

	function updateClock() {
		const now = new Date();
		const h = now.getHours().toString().padStart(2, '0');
		const m = now.getMinutes().toString().padStart(2, '0');
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		clockTime = `${h}:${m}`;
		clockDate = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
	}

	async function sleep(ms: number) {
		return new Promise((r) => setTimeout(r, ms));
	}

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
			} catch (_) {}

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

	const ROBLOX_LOGO = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f7e6.png';
	const ERIC_AVATAR = 'https://i.pinimg.com/736x/4b/45/c9/4b45c9f6e97282db1d3d9c0c8e51c72b.jpg';
	const SAMANTHA_AVATAR = 'https://i.pinimg.com/736x/6a/f0/5e/6af05e5e7c5e3f4b5e3f4b5e3f4b5e3f.jpg';
</script>

<audio bind:this={audioEl} src="/src/lib/assets/audio/secondary.mp3" preload="auto"></audio>

<section class="relative flex min-h-screen items-center pb-16 pt-24">
	<div class="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-5 md:flex-row md:gap-16">

		<!-- Left: copy -->
		<div class="flex-1 text-center md:text-left">
			<div class="mb-5 flex items-center justify-center gap-3 md:justify-start">
				<img src="/favicon.svg" alt="Colbe" class="h-10 w-10 rounded-[15px]" />
				<!-- Brand name with Roblox logo replacing the O -->
				<span class="text-lg font-semibold text-white flex items-center gap-0">
					C<img
						src={ROBLOX_LOGO}
						alt="o"
						class="inline-block h-[1.1em] w-[1.1em] -rotate-12 object-contain align-middle"
						style="margin: 0 1px;"
					/>lbe
				</span>
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

		<!-- Right: phone + building scene -->
		<div class="relative flex flex-1 items-center justify-center">

			<!-- Building (appears to the left of phone) -->
			<div
				class="absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
				style="opacity: {buildingVisible ? 1 : 0}; transform: translate({buildingVisible ? '0' : '-24px'}, -50%);"
			>
				<svg width="80" height="260" viewBox="0 0 80 260" fill="none" xmlns="http://www.w3.org/2000/svg">
					<!-- Antenna -->
					<rect x="37" y="0" width="3" height="18" fill="#3f3f46" rx="1"/>
					<circle cx="38.5" cy="0" r="3" fill="#ef4444" opacity={buildingVisible ? 1 : 0} class="animate-pulse"/>
					<!-- Main body -->
					<rect x="4" y="18" width="68" height="220" rx="4" fill="#18181b" stroke="#27272a" stroke-width="1"/>
					<!-- Roof detail -->
					<rect x="4" y="18" width="68" height="10" rx="4" fill="#1c1c1f"/>
					<!-- Window grid - floor by floor -->
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
							/>
						{/each}
					{/each}
					<!-- Ground floor -->
					<rect x="16" y="218" width="48" height="20" rx="2" fill="#1c1c1f" stroke="#27272a" stroke-width="1"/>
					<rect x="34" y="218" width="12" height="20" fill="#27272a" rx="1"/>
				</svg>
			</div>

			<!-- Phone -->
			<div
				bind:this={phoneEl}
				class="relative transition-transform duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
				style="transform: rotate({straight ? '0deg' : '6deg'}); filter: drop-shadow(0 32px 64px rgba(59,130,246,0.22));"
			>
				<!-- Phone shell SVG -->
				<svg width="200" height="420" viewBox="0 0 200 420" fill="none" xmlns="http://www.w3.org/2000/svg" class="md:h-[520px] md:w-[248px]">
					<rect x="2" y="2" width="196" height="416" rx="36" fill="#09090b" stroke="#27272a" stroke-width="2"/>
					<rect x="10" y="10" width="180" height="400" rx="30" fill="#0f0f10"/>
					<!-- Notch -->
					<rect x="68" y="16" width="64" height="20" rx="10" fill="#09090b"/>
					<!-- Side buttons -->
					<rect x="196" y="80" width="4" height="40" rx="2" fill="#27272a"/>
					<rect x="0" y="70" width="3" height="28" rx="1.5" fill="#27272a"/>
					<rect x="0" y="106" width="3" height="28" rx="1.5" fill="#27272a"/>
				</svg>

				<!-- Screen layer -->
				<div class="absolute inset-0 overflow-hidden rounded-[30px]" style="top:10px;left:10px;right:10px;bottom:10px;">

					<!-- LOCK SCREEN -->
					{#if screen === 'lock'}
						<div class="h-full w-full rounded-[15px] bg-gradient-to-b from-[#0a0a1f] to-[#0f0f1a] flex flex-col items-center pt-10 px-4 gap-2 transition-opacity duration-500">
							<!-- Time & date -->
							<div class="text-white text-5xl font-thin tracking-tight">{clockTime}</div>
							<div class="text-white/50 text-xs tracking-wide">{clockDate}</div>

							<div class="flex-1"/>

							<!-- Notification -->
							<div class="w-full bg-white/10 backdrop-blur-sm rounded-2xl p-3 mb-2">
								<div class="flex items-center gap-2 mb-1">
									<div class="h-5 w-5 rounded-md bg-blue-600 flex items-center justify-center flex-shrink-0">
										<img src={ROBLOX_LOGO} alt="" class="h-3 w-3 object-contain -rotate-12"/>
									</div>
									<span class="text-white/50 text-[9px] font-medium uppercase tracking-widest">Colbe</span>
									<span class="text-white/30 text-[9px] ml-auto">now</span>
								</div>
								<p class="text-white text-[11px] font-medium leading-snug">Samantha sent you a message</p>
								<p class="text-white/50 text-[10px] mt-0.5">"Hey, are you free later? 👀"</p>
							</div>

							<!-- Swipe bar -->
							<div class="flex items-center gap-3 mb-6">
								<div class="h-px flex-1 bg-white/10"/>
								<div class="text-white/30 text-[9px] tracking-widest uppercase">Swipe to unlock</div>
								<div class="h-px flex-1 bg-white/10"/>
							</div>

							<!-- Home indicator -->
							<div class="w-24 h-1 rounded-full bg-white/20 mb-2"/>
						</div>
					{/if}

					<!-- MUSIC SCREEN -->
					{#if screen === 'music'}
						<div class="h-full w-full rounded-[15px] bg-gradient-to-b from-[#0d0d1f] to-[#100d20] flex flex-col items-center justify-center px-4 gap-3 transition-opacity duration-500">
							<div class="flex items-center gap-1.5 mb-1">
								<div class="h-5 w-5 rounded-md bg-blue-600 flex items-center justify-center">
									<img src={ROBLOX_LOGO} alt="" class="h-3 w-3 object-contain -rotate-12"/>
								</div>
								<span class="text-blue-400 text-[9px] font-semibold uppercase tracking-widest">Colbe Music</span>
							</div>
							<!-- Album art -->
							<div class="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-700 to-violet-800 flex items-center justify-center shadow-lg shadow-blue-900/40">
								<svg class="h-10 w-10 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
									<circle cx="12" cy="12" r="4"/>
									<path d="M12 8V5m0 14v-3M8 12H5m14 0h-3"/>
								</svg>
							</div>
							<div class="text-center">
								<div class="text-white text-sm font-semibold">Secondary</div>
								<div class="text-white/40 text-[10px] mt-0.5">Colbe Original</div>
							</div>
							<!-- Progress bar -->
							<div class="w-full">
								<div class="h-1 w-full bg-white/10 rounded-full overflow-hidden">
									<div class="h-full bg-blue-500 rounded-full animate-[musicprogress_4s_linear_forwards]" style="width:35%"/>
								</div>
								<div class="flex justify-between text-[9px] text-white/30 mt-1">
									<span>1:12</span><span>3:44</span>
								</div>
							</div>
							<!-- Controls -->
							<div class="flex items-center gap-6">
								<button class="text-white/50">
									<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l12 8-12 8V4z" transform="rotate(180 12 12)"/><rect x="4" y="4" width="2" height="16" rx="1"/></svg>
								</button>
								<button class="h-10 w-10 rounded-full bg-white flex items-center justify-center">
									<svg class="h-5 w-5 text-zinc-900" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
								</button>
								<button class="text-white/50">
									<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l12 8-12 8V4z"/><rect x="18" y="4" width="2" height="16" rx="1"/></svg>
								</button>
							</div>
						</div>
					{/if}

					<!-- PIN SCREEN -->
					{#if screen === 'pin'}
						<div class="h-full w-full rounded-[15px] bg-[#0f0f10] flex flex-col items-center justify-center gap-5 transition-opacity duration-500">
							<div class="text-white/50 text-xs tracking-widest uppercase">Enter Passcode</div>
							<div class="flex gap-3">
								{#each [1, 2, 3, 4] as i}
									<div
										class="h-3 w-3 rounded-full border-2 transition-all duration-200 {pinFilled >= i ? 'bg-blue-500 border-blue-500' : 'border-white/30'}"
									/>
								{/each}
							</div>
							<div class="grid grid-cols-3 gap-2 w-36">
								{#each ['1','2','3','4','5','6','7','8','9','','0','⌫'] as key}
									<button
										class="h-10 rounded-[15px] bg-white/8 text-white text-sm font-medium flex items-center justify-center border border-white/5 active:bg-white/15 transition-colors"
									>
										{key}
									</button>
								{/each}
							</div>
						</div>
					{/if}

					<!-- CHAT SCREEN -->
					{#if screen === 'chat'}
						<div class="h-full w-full rounded-[15px] bg-[#09090b] flex flex-col transition-opacity duration-500">
							<!-- Header -->
							<div class="flex items-center gap-2 px-3 py-2.5 border-b border-zinc-800 bg-zinc-900/80">
								<Avatar.Root class="h-7 w-7 rounded-full overflow-hidden flex-shrink-0">
									<Avatar.Image src={ERIC_AVATAR} alt="Eric" class="h-full w-full rounded-full object-cover"/>
									<Avatar.Fallback class="h-full w-full rounded-full bg-blue-700 flex items-center justify-center text-white text-[9px] font-bold">E</Avatar.Fallback>
								</Avatar.Root>
								<div class="flex-1 min-w-0">
									<div class="text-white text-[10px] font-semibold leading-tight">Eric & Samantha</div>
									<div class="text-green-400 text-[8px]">● online</div>
								</div>
								<div class="flex items-center gap-1 bg-blue-600/15 border border-blue-500/20 rounded-md px-1.5 py-0.5">
									<img src={ROBLOX_LOGO} alt="" class="h-2.5 w-2.5 object-contain -rotate-12"/>
									<span class="text-blue-400 text-[7px] font-semibold">Colbe</span>
								</div>
							</div>

							<!-- Messages -->
							<div class="flex-1 overflow-hidden px-2 py-2 flex flex-col gap-1.5">
								{#if messages.includes(1)}
									<div class="flex items-end gap-1.5 animate-in slide-in-from-bottom-2 duration-300">
										<Avatar.Root class="h-5 w-5 rounded-full overflow-hidden flex-shrink-0">
											<Avatar.Image src={SAMANTHA_AVATAR} alt="Samantha" class="h-full w-full rounded-full object-cover"/>
											<Avatar.Fallback class="h-full w-full rounded-full bg-violet-700 flex items-center justify-center text-white text-[7px] font-bold">S</Avatar.Fallback>
										</Avatar.Root>
										<div>
											<div class="text-white/30 text-[7px] mb-0.5 ml-1">Samantha</div>
											<div class="bg-zinc-800 text-zinc-100 text-[9px] rounded-2xl rounded-bl-sm px-2.5 py-1.5 max-w-[120px] leading-snug">
												Hey, are you free later? 👀
											</div>
										</div>
									</div>
								{/if}

								{#if messages.includes(2)}
									<div class="flex justify-end animate-in slide-in-from-bottom-2 duration-300">
										<div class="bg-blue-600 text-white text-[9px] rounded-2xl rounded-br-sm px-2.5 py-1.5 max-w-[110px] leading-snug">
											Yeah! What's up? 🔵
										</div>
									</div>
								{/if}

								{#if showTyping1}
									<div class="flex items-end gap-1.5">
										<Avatar.Root class="h-5 w-5 rounded-full overflow-hidden flex-shrink-0">
											<Avatar.Fallback class="h-full w-full rounded-full bg-violet-700 flex items-center justify-center text-white text-[7px] font-bold">S</Avatar.Fallback>
										</Avatar.Root>
										<div class="bg-zinc-800 rounded-2xl rounded-bl-sm px-3 py-2 flex gap-1 items-center">
											<span class="h-1 w-1 rounded-full bg-zinc-400 animate-bounce" style="animation-delay:0ms"/>
											<span class="h-1 w-1 rounded-full bg-zinc-400 animate-bounce" style="animation-delay:150ms"/>
											<span class="h-1 w-1 rounded-full bg-zinc-400 animate-bounce" style="animation-delay:300ms"/>
										</div>
									</div>
								{/if}

								{#if messages.includes(3)}
									<div class="flex items-end gap-1.5 animate-in slide-in-from-bottom-2 duration-300">
										<Avatar.Root class="h-5 w-5 rounded-full overflow-hidden flex-shrink-0">
											<Avatar.Image src={SAMANTHA_AVATAR} alt="Samantha" class="h-full w-full rounded-full object-cover"/>
											<Avatar.Fallback class="h-full w-full rounded-full bg-violet-700 flex items-center justify-center text-white text-[7px] font-bold">S</Avatar.Fallback>
										</Avatar.Root>
										<div>
											<div class="text-white/30 text-[7px] mb-0.5 ml-1">Samantha</div>
											<div class="bg-zinc-800 text-zinc-100 text-[9px] rounded-2xl rounded-bl-sm px-2.5 py-1.5 max-w-[130px] leading-snug">
												Let's call on Colbe tonight 🎉
											</div>
										</div>
									</div>
								{/if}

								{#if showTyping2}
									<div class="flex justify-end">
										<div class="bg-blue-600/50 rounded-2xl rounded-br-sm px-3 py-2 flex gap-1 items-center">
											<span class="h-1 w-1 rounded-full bg-white/60 animate-bounce" style="animation-delay:0ms"/>
											<span class="h-1 w-1 rounded-full bg-white/60 animate-bounce" style="animation-delay:150ms"/>
											<span class="h-1 w-1 rounded-full bg-white/60 animate-bounce" style="animation-delay:300ms"/>
										</div>
									</div>
								{/if}

								{#if messages.includes(4)}
									<div class="flex justify-end animate-in slide-in-from-bottom-2 duration-300">
										<div class="bg-blue-600 text-white text-[9px] rounded-2xl rounded-br-sm px-2.5 py-1.5 max-w-[110px] leading-snug">
											Already on it 💙
										</div>
									</div>
								{/if}
							</div>

							<!-- Chat bar -->
							<div class="px-2 pb-3 pt-1.5 flex items-center gap-1.5">
								<div class="flex-1 bg-zinc-800 rounded-[15px] h-8 px-3 flex items-center">
									<span class="text-zinc-500 text-[9px]">Message...</span>
								</div>
								<button class="h-8 w-8 rounded-[15px] bg-blue-600 flex items-center justify-center flex-shrink-0">
									<svg class="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
										<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
									</svg>
								</button>
							</div>
						</div>
					{/if}

					<!-- BRAND SCREEN -->
					{#if screen === 'brand'}
						<div class="h-full w-full rounded-[15px] bg-[#09090b] flex flex-col items-center justify-center gap-3 transition-opacity duration-500">
							<div class="h-16 w-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-900/50">
								<img src={ROBLOX_LOGO} alt="Colbe" class="h-9 w-9 object-contain -rotate-12"/>
							</div>
							<div class="text-white text-2xl font-bold flex items-center gap-0.5 tracking-tight">
								C<img src={ROBLOX_LOGO} alt="o" class="inline-block h-6 w-6 object-contain -rotate-12 align-middle" style="margin: 0 1px;"/>lbe
							</div>
							<div class="text-zinc-500 text-[9px] tracking-[0.2em] uppercase">Chat · Call · Explore</div>
							<div class="flex gap-2 mt-2">
								<span class="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"/>
								<span class="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" style="animation-delay:200ms"/>
								<span class="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" style="animation-delay:400ms"/>
							</div>
						</div>
					{/if}

				</div>
			</div>
		</div>
	</div>

	<!-- Background glow -->
	<div class="pointer-events-none absolute inset-0 -z-10">
		<div class="absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl md:h-96 md:w-96"/>
	</div>
</section>

<style>
	@keyframes musicprogress {
		from { width: 35%; }
		to { width: 85%; }
	}
</style>