<script>
	let { children } = $props();
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