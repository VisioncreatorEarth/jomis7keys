<script>
	import { onMount } from 'svelte';
	// import { account, logoutUser } from '$lib/appwrite'; // Path to your appwrite.js - Removed
	import { appwriteService } from '$lib/services/appwriteService.js';
	import { currentUser } from '$lib/stores/userStore'; // Path to your userStore.js
	import { goto } from '$app/navigation';
	import '../app.css'; // Import global stylesheet
	// import '@fontsource/playfair-display'; // Removed Playfair Display font import

	onMount(async () => {
		try {
			const user = await appwriteService.getCurrentUser();
			currentUser.set(user);
		} catch (error) {
			// getCurrentUser in service should return null on error/no session, so this catch might not be strictly needed for that call
            // but kept for general robustness if other errors occur in onMount
			currentUser.set(null);
			// console.error("Failed to fetch user session on layout load:", error);
		}
	});

	async function handleLogout() {
		try {
			await appwriteService.logoutUser();
			currentUser.set(null);
			goto('/');
		} catch (error) {
			console.error("Logout failed:", error);
			alert("Logout failed. Please try again.");
		}
	}
</script>

<header class="fixed top-0 left-0 right-0 z-50 bg-background-card/95 backdrop-blur-md p-4 border-b border-accent-secondary/30 shadow-sm">
	<nav class="flex justify-between items-center max-w-screen-xl mx-auto">
		<a href="/" class="text-2xl font-bold text-primary-text hover:text-accent-primary transition-colors">Network 3.0</a>
		<div class="flex items-center space-x-4">
			{#if $currentUser}
				<span class="text-primary-text/80">Welcome, {$currentUser.name || $currentUser.email}!</span>
				<button on:click={handleLogout} class="text-background-card bg-accent-primary hover:opacity-90 border border-transparent px-3 py-2 rounded-md text-sm font-medium transition-colors">Logout</button>
			{:else}
				<!-- No login/register button in header, form is on page -->
			{/if}
		</div>
	</nav>
</header>

<main class="pt-20 bg-background-main">
	<slot />
</main>

<style>
	/* Keeping main minimal, specific component styles should be in those components or Tailwind */
	main {
		/* font-family: sans-serif; --- This is now handled by Tailwind or global app.css defaults */
	}
</style> 