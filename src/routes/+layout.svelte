<script>
	import { onMount } from 'svelte';
	import { account, logoutUser } from '$lib/appwrite'; // Path to your appwrite.js
	import { currentUser } from '$lib/stores/userStore'; // Path to your userStore.js
	import { goto } from '$app/navigation';
	import '../app.css'; // Import global stylesheet
	// import '@fontsource/playfair-display'; // Removed Playfair Display font import

	onMount(async () => {
		try {
			const user = await account.get();
			currentUser.set(user);
		} catch (error) {
			currentUser.set(null);
			// console.error("Failed to fetch user session on layout load:", error);
		}
	});

	async function handleLogout() {
		try {
			await logoutUser();
			currentUser.set(null);
			goto('/');
		} catch (error) {
			console.error("Logout failed:", error);
			alert("Logout failed. Please try again.");
		}
	}
</script>

<header class="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg p-4 border-b border-white/20">
	<nav class="flex justify-between items-center max-w-screen-xl mx-auto">
		<a href="/" class="text-2xl font-bold !text-orange-100 hover:!text-orange-200">Network 3.0</a>
		<div class="flex items-center space-x-4">
			{#if $currentUser}
				<span class="text-gray-300">Welcome, {$currentUser.name || $currentUser.email}!</span>
				<a href="/dashboard" class="!text-orange-100 hover:!text-orange-200 px-3 py-2 rounded-md text-sm font-medium border border-transparent hover:border-orange-100/50 transition-colors">Dashboard</a>
				<button on:click={handleLogout} class="!text-orange-100 bg-red-500/50 hover:bg-red-600/60 border border-red-400/50 px-3 py-2 rounded-md text-sm font-medium transition-colors">Logout</button>
			{:else}
				<a href="/#cta-auth" class="!text-orange-100 hover:!text-orange-200 px-3 py-2 rounded-md text-sm font-medium border border-transparent hover:border-orange-100/50 transition-colors">Login / Register</a>
			{/if}
		</div>
	</nav>
</header>

<main class="pt-20">
	<slot />
</main>

<style>
	/* Keeping main minimal, specific component styles should be in those components or Tailwind */
	main {
		/* font-family: sans-serif; --- This is now handled by Tailwind or global app.css defaults */
	}
</style> 