<footer class="border-t border-zinc-800 bg-zinc-950">
	<div class="mx-auto max-w-6xl px-5 py-12 md:py-16">
		<div class="flex flex-col gap-10 md:flex-row md:gap-16">
			<div class="md:w-52 md:shrink-0">
				<img src="/favicon.svg" alt="Colbe" class="h-9 w-9" />
				<p class="mt-3 text-sm font-medium text-zinc-400">Colbe</p>
				<p class="text-sm text-zinc-600">Powering imagination, one conversation at a time.</p>
			</div>
			<div class="grid grid-cols-2 gap-8 sm:grid-cols-3 md:flex md:flex-1 md:gap-12">
				{#each [
					['Product', [['Messaging','/home'],['Calls','/calls'],['Updates','/updates'],['Tools','/tools']]],
					['Company', [['About','/about'],['Blog','/blog'],['Careers','/careers'],['Press kit','/press']]],
					['Legal', [['Terms of use','/terms'],['Privacy policy','/privacy'],['Cookie policy','/cookies']]],
				] as [heading, links]}
				<div>
					<p class="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">{heading}</p>
					<ul class="space-y-2.5 text-sm text-zinc-400">
						{#each links as [label, href]}
						<li><a {href} class="hover:text-white transition-colors">{label}</a></li>
						{/each}
					</ul>
				</div>
				{/each}
			</div>
		</div>
		<div class="mt-12 border-t border-zinc-800 pt-6 text-xs text-zinc-600">© 2026 Colbe. All rights reserved.</div>
	</div>
</footer>