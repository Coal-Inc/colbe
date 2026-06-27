<script lang="ts">
	import { ChevronDown, Menu, X } from '@lucide/svelte';
	let products = $state(false);
	let resources = $state(false);
	let mobileOpen = $state(false);
</script>

<header class="fixed top-3 left-1/2 z-50 w-[94%] max-w-6xl -translate-x-1/2 rounded-2xl border border-zinc-800 bg-zinc-950/90 px-4 py-2.5 backdrop-blur-md">
	<nav class="flex items-center justify-between">
		<a href="/" class="flex items-center gap-2">
			<img src="/favicon.svg" alt="Colbe" class="h-7 w-7" />
			<span class="text-sm font-semibold text-white">Colbe</span>
		</a>

		<!-- Desktop -->
		<div class="hidden items-center gap-1 text-sm text-zinc-400 md:flex">
			<div class="relative">
				<button onclick={() => { products = !products; resources = false; }} class="flex items-center gap-1 rounded-xl px-3 py-2 hover:bg-zinc-800 hover:text-white transition-colors">
					Products <ChevronDown size={12} />
				</button>
				{#if products}
				<div class="absolute left-0 top-full mt-2 w-96 rounded-2xl border border-zinc-800 bg-zinc-900 p-3 shadow-2xl grid grid-cols-2 gap-1">
					{#each [['Messaging','Real-time DMs and group chats'],['Calls','Voice and video calling'],['Communities','Build spaces together'],['Updates','Status and stories']] as [name, desc]}
					<a href="/" class="rounded-xl p-3 hover:bg-zinc-800 transition-colors">
						<p class="text-sm font-medium text-white">{name}</p>
						<p class="text-xs text-zinc-500 mt-0.5">{desc}</p>
					</a>
					{/each}
				</div>
				{/if}
			</div>

			<div class="relative">
				<button onclick={() => { resources = !resources; products = false; }} class="flex items-center gap-1 rounded-xl px-3 py-2 hover:bg-zinc-800 hover:text-white transition-colors">
					Resources <ChevronDown size={12} />
				</button>
				{#if resources}
				<div class="absolute left-0 top-full mt-2 w-120 rounded-2xl border border-zinc-800 bg-zinc-900 p-3 shadow-2xl grid grid-cols-3 gap-1">
					{#each [['Documentation','Guides and API reference'],['Community','Connect with users'],['Blog','News and updates'],['Changelog',"What's new"],['Status','Platform uptime'],['Press kit','Brand assets']] as [name, desc]}
					<a href="/" class="rounded-xl p-3 hover:bg-zinc-800 transition-colors">
						<p class="text-sm font-medium text-white">{name}</p>
						<p class="text-xs text-zinc-500 mt-0.5">{desc}</p>
					</a>
					{/each}
				</div>
				{/if}
			</div>

			<a href="/pricing" class="rounded-xl px-3 py-2 hover:bg-zinc-800 hover:text-white transition-colors">Pricing</a>
		</div>

		<div class="hidden items-center gap-2 md:flex">
			<a href="/login" class="rounded-xl px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Login</a>
			<a href="/register" class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors">Get started</a>
		</div>

		<!-- Mobile toggle -->
		<button class="md:hidden text-zinc-400 hover:text-white" onclick={() => mobileOpen = !mobileOpen}>
			{#if mobileOpen}<X size={20} />{:else}<Menu size={20} />{/if}
		</button>
	</nav>

	<!-- Mobile menu -->
	{#if mobileOpen}
	<div class="mt-3 flex flex-col gap-1 border-t border-zinc-800 pt-3 md:hidden">
		<a href="/pricing" class="rounded-xl px-3 py-2.5 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white">Pricing</a>
		<a href="/login" class="rounded-xl px-3 py-2.5 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white">Login</a>
		<a href="/register" class="rounded-xl bg-blue-600 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-500">Get started</a>
	</div>
	{/if}
</header>

{#if products || resources}
<div class="fixed inset-0 z-40" role="button" tabindex="-1" onclick={() => { products = false; resources = false; }} onkeydown={() => {}}></div>
{/if}