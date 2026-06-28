<script lang="ts">
	import Sidebar from './designs/sidebar.svelte';
</script>

<svelte:head><title>Cookie Policy — Colbe</title></svelte:head>

<div class="flex min-h-screen bg-zinc-950 text-white">
	<Sidebar />
	<main class="flex-1 px-8 py-16 max-w-3xl">
		<h1 class="text-3xl font-bold mb-2">Cookie Policy</h1>
		<p class="text-zinc-500 text-sm mb-10">Last updated: June 2026</p>

		<section id="what" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">1. What Are Cookies</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">Cookies are small text files stored on your device when you visit a website. They help us keep you signed in and remember your preferences.</p>
		</section>

		<section id="essential" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">2. Essential Cookies</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">We only use essential cookies required to operate Colbe — primarily your session cookie to keep you authenticated. These cannot be disabled without breaking core functionality.</p>
		</section>

		<section id="notracking" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">3. No Tracking Cookies</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">Colbe does not use advertising, analytics, or third-party tracking cookies. We do not sell your browsing data or share it with advertisers.</p>
		</section>

		<section id="control" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">4. Your Control</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">You can clear cookies at any time through your browser settings. Note that clearing session cookies will sign you out of Colbe.</p>
		</section>

		<section id="changes" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">5. Changes to This Policy</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">We may update this policy as Colbe evolves. We'll notify you of significant changes via email or an in-app notice.</p>
		</section>

		<section id="contact" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">6. Contact</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">Questions? Email us at <a href="mailto:privacy@colbe.cc" class="text-blue-400 hover:underline">privacy@colbe.cc</a>.</p>
		</section>
	</main>
</div>