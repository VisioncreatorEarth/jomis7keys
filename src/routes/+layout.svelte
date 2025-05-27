<script>
	import { onMount } from 'svelte';
	import { account, logoutUser } from '$lib/appwrite'; // Path to your appwrite.js
	import { currentUser } from '$lib/stores/userStore'; // Path to your userStore.js
	import { goto } from '$app/navigation';

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

<header>
	<nav>
		<a href="/" class="logo">JOMA Appointments</a>
		<div class="nav-links">
			{#if $currentUser}
				<span>Welcome, {$currentUser.name || $currentUser.email}!</span>
				<a href="/dashboard" class="nav-button">Dashboard</a>
				<button on:click={handleLogout} class="nav-button logout">Logout</button>
			{:else}
				<a href="/" class="nav-button">Login / Register</a>
			{/if}
		</div>
	</nav>
</header>

<main>
	<slot />
</main>

<style>
	header {
		background-color: #f0f0f0;
		padding: 1rem;
		border-bottom: 1px solid #ddd;
	}
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.logo {
		font-weight: bold;
		font-size: 1.5em;
		text-decoration: none;
		color: #333;
	}
	.nav-links span {
		margin-right: 1rem;
	}
	.nav-button {
		padding: 0.5rem 1rem;
		text-decoration: none;
		color: #333;
		border: 1px solid #ccc;
		border-radius: 4px;
		margin-left: 0.5rem;
		background-color: white;
		cursor: pointer;
	}
	.nav-button.logout {
		background-color: #ffdddd;
		border-color: #ffaaaa;
	}
	.nav-button:hover {
		background-color: #e9e9e9;
	}
	.nav-button.logout:hover {
		background-color: #ffcccc;
	}
	main {
		padding: 1rem;
		font-family: sans-serif;
	}
</style> 