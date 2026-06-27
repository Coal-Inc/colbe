<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';
	let products = $state(false);
	let resources = $state(false);
</script>

<header class="fixed top-4 left-1/2 z-50 w-[95%] max-w-6xl -translate-x-1/2 rounded-2xl border border-zinc-800 bg-zinc-950/80 px-5 py-3 backdrop-blur-md">
	<nav class="flex items-center justify-between">
		<a href="/" class="flex items-center gap-2">
			<img src="/favicon.svg" alt="Colbe" class="h-7 w-7" />
			<span class="text-sm font-semibold text-white">Colbe</span>
		</a>

		<div class="flex items-center gap-1 text-sm text-zinc-400">
			<div class="relative">
				<button onclick={() => { products = !products; resources = false; }} class="flex items-center gap-1 rounded-lg px-3 py-2 hover:bg-zinc-800 hover:text-white transition-colors">
					Products <ChevronDown size={12} />
				</button>
				{#if products}
				<div class="absolute left-0 top-full mt-2 w-96 rounded-xl border border-zinc-800 bg-zinc-900 p-3 shadow-2xl grid grid-cols-2 gap-1">
					{#each [['Messaging','Real-time DMs and group chats'],['Calls','Voice and video calling'],['Communities','Build spaces together'],['Updates','Status and stories']] as [name, desc]}
					<a href="/" class="rounded-lg p-3 hover:bg-zinc-800 transition-colors">
						<p class="text-sm font-medium text-white">{name}</p>
						<p class="text-xs text-zinc-500 mt-0.5">{desc}</p>
					</a>
					{/each}
				</div>
				{/if}
			</div>

			<div class="relative">
				<button onclick={() => { resources = !resources; products = false; }} class="flex items-center gap-1 rounded-lg px-3 py-2 hover:bg-zinc-800 hover:text-white transition-colors">
					Resources <ChevronDown size={12} />
				</button>
				{#if resources}
				<div class="absolute left-0 top-full mt-2 w-120 rounded-xl border border-zinc-800 bg-zinc-900 p-3 shadow-2xl grid grid-cols-3 gap-1">
					{#each [['Documentation','Guides and API reference'],['Community','Connect with users'],['Blog','News and updates'],['Changelog','What\'s new'],['Status','Platform uptime'],['Press kit','Brand assets']] as [name, desc]}
					<a href="/" class="rounded-lg p-3 hover:bg-zinc-800 transition-colors">
						<p class="text-sm font-medium text-white">{name}</p>
						<p class="text-xs text-zinc-500 mt-0.5">{desc}</p>
					</a>
					{/each}
				</div>
				{/if}
			</div>

			<a href="/pricing" class="rounded-lg px-3 py-2 hover:bg-zinc-800 hover:text-white transition-colors">Pricing</a>
		</div>

		<div class="flex items-center gap-2">
			<a href="/login" class="rounded-lg px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Login</a>
			<a href="/register" class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors">Get started</a>
		</div>
	</nav>
</header>

{#if products || resources}
<div class="fixed inset-0 z-40" role="button" tabindex="-1" onclick={() => { products = false; resources = false; }} onkeydown={() => {}}></div>
{/if}