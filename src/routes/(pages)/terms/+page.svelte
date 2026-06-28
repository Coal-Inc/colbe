<script lang="ts">
	import Sidebar from './designs/sidebar.svelte';
</script>

<svelte:head><title>Terms of Service — Colbe</title></svelte:head>

<div class="flex min-h-screen bg-zinc-950 text-white">
	<Sidebar />

	<main class="flex-1 px-8 py-16 max-w-3xl">
		<h1 class="text-3xl font-bold mb-4">Terms of Service</h1>
		<p class="text-zinc-400 mb-10 text-sm leading-relaxed">
			By using Colbe, you agree to these terms. Please read them carefully.
			Last updated: June 2026.
		</p>

		<section id="acceptance" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">By accessing or using Colbe, you agree to be bound by these Terms of Service and all applicable laws. If you do not agree, do not use Colbe.</p>
		</section>

		<section id="usage" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">2. Acceptable Use</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">You agree not to misuse Colbe. This includes but is not limited to: harassment, spam, distributing malware, or attempting to gain unauthorized access to other accounts or systems.</p>
		</section>

		<section id="account" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">3. Your Account</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">You are responsible for maintaining the security of your account. Colbe is not liable for any loss or damage resulting from unauthorized access to your account.</p>
		</section>

		<section id="content" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">4. User Content</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">You retain ownership of content you post on Colbe. By posting, you grant Colbe a license to display and distribute that content within the platform.</p>
		</section>

		<section id="termination" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">5. Termination</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">We reserve the right to suspend or terminate your account at any time for violation of these terms or for any conduct we deem harmful to the platform or its users.</p>
		</section>

		<section id="liability" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">Colbe is provided as-is. We make no warranties about uptime or reliability. To the extent permitted by law, Colbe is not liable for any indirect or consequential damages.</p>
		</section>

		<section id="changes" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">7. Changes to Terms</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">We may update these terms from time to time. Continued use of Colbe after changes means you accept the new terms.</p>
		</section>

		<section id="contact" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">8. Contact</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">For questions about these terms, contact us at <a href="mailto:legal@colbe.cc" class="text-blue-400 hover:underline">legal@colbe.cc</a>.</p>
		</section>
	</main>
</div>