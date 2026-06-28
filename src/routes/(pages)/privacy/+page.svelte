<script lang="ts">
	import Sidebar from './designs/sidebar.svelte';
</script>

<svelte:head><title>Privacy Policy — Colbe</title></svelte:head>

<div class="flex min-h-screen bg-zinc-950 text-white">
	<Sidebar />
	<main class="flex-1 px-8 py-16 max-w-3xl">
		<h1 class="text-3xl font-bold mb-2">Privacy Policy</h1>
		<p class="text-zinc-500 text-sm mb-10">Last updated: June 2026</p>

		<section id="overview" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">1. Overview</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">Colbe is committed to protecting your privacy. This policy explains what data we collect, how we use it, and the choices you have.</p>
		</section>

		<section id="collection" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">2. Data We Collect</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">We collect information you provide directly — such as your name, email, and phone number during registration — as well as usage data like messages sent, calls made, and features accessed.</p>
		</section>

		<section id="e2ee" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">3. End-to-End Encryption</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">Messages and calls on Colbe are end-to-end encrypted by default. This means only you and the recipient can read or hear your conversations. Colbe cannot access the content of your encrypted messages.</p>
		</section>

		<section id="usage" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">4. How We Use Your Data</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">We use your data to provide and improve the Colbe platform, authenticate your identity, send service-related notifications, and ensure platform security.</p>
		</section>

		<section id="sharing" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">5. Data Sharing</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">We do not sell your personal data. We may share data with trusted service providers who help us operate Colbe, subject to strict confidentiality agreements.</p>
		</section>

		<section id="retention" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">6. Data Retention</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">We retain your data for as long as your account is active. You may request deletion of your account and associated data at any time by contacting us.</p>
		</section>

		<section id="rights" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">7. Your Rights</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">You have the right to access, correct, or delete your personal data. You may also object to or restrict certain processing. Contact us to exercise these rights.</p>
		</section>

		<section id="cookies" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">8. Cookies</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">We use essential cookies to keep you signed in and maintain your session. We do not use tracking or advertising cookies.</p>
		</section>

		<section id="contact" class="mb-10">
			<h2 class="text-xl font-semibold mb-3">9. Contact</h2>
			<p class="text-zinc-400 text-sm leading-relaxed">Questions about this policy? Reach us at <a href="mailto:privacy@colbe.cc" class="text-blue-400 hover:underline">privacy@colbe.cc</a>.</p>
		</section>
	</main>
</div>