<!-- src/routes/documentation/+page.svelte (with +page.server.js) -->
<script>
    import DocumentationOverview from '$lib/components/documentation/DocumentationOverview.svelte';
    export let data; // Provided by +page.server.js
</script>

<svelte:head>
    <title>Documentation - Network 3.0</title>
</svelte:head>

<div class="container mx-auto px-4 py-8 min-h-screen">
    <h1 class="text-4xl font-bold mb-8 text-center text-white drop-shadow-md">Documentation</h1>

    {#if data.error}
        <p class="text-center text-red-300 bg-red-900/50 p-3 rounded-md">Error: {data.error}</p>
    {:else if data.articles && data.articles.length > 0}
        <DocumentationOverview articles={data.articles} />
    {:else}
        <p class="text-center text-gray-300">No documentation articles found.</p>
    {/if}
</div> 