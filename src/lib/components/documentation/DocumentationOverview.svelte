<!-- src/lib/components/documentation/DocumentationOverview.svelte -->
<script>
    export let articles = []; // Passed as prop from +page.svelte or +page.server.js
    import ArticleListItem from './ArticleListItem.svelte'; // Import the new component
</script>

<div class="space-y-6">
    {#if articles.length > 0}
        {#each articles as article (article.$id)}
            <ArticleListItem {article} />
        {/each}
    {:else}
        <p class="text-center text-gray-500 py-10">No documentation articles found.</p>
    {/if}
</div> 