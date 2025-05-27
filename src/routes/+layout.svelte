<script>
	import { onMount } from 'svelte';
	import { account } from '$lib/appwrite'; // Path to your appwrite.js
	import { currentUser } from '$lib/stores/userStore'; // Path to your userStore.js

	let { children } = $props();

	onMount(async () => {
		try {
			const user = await account.get();
			currentUser.set(user);
		} catch (error) {
			currentUser.set(null);
			// console.error("Failed to fetch user session on layout load:", error);
		}
	});
</script>

<main>
	{@render children()}
</main>

<style>
	main {
		padding: 1rem;
		font-family: sans-serif;
	}
</style> 