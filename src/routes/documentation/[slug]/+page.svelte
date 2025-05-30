<!-- src/routes/documentation/[slug]/+page.svelte -->
<script>
    import ArticleView from '$lib/components/documentation/ArticleView.svelte';
    export let data; // From +page.server.js
</script>

<svelte:head>
    <title>{data.article ? data.article.title : 'Article Not Found'} - Network 3.0</title>
    {#if data.article?.description}
        <meta name="description" content={data.article.description} />
    {/if}
</svelte:head>

<div class="container mx-auto px-4 py-8 min-h-screen">
    {#if data.article}
        <ArticleView article={data.article} />
    {:else}
        <!-- This part should ideally not be reached if +page.server.js throws a 404 -->
        <!-- SvelteKit's default error page will be shown instead. -->
        <!-- However, keeping a fallback message can be useful during development. -->
        <div class="text-center py-10">
            <h1 class="text-3xl font-bold text-red-400 mb-4">Article Not Found</h1>
            <p class="text-gray-300">The article you are looking for does not exist or could not be loaded.</p>
        </div>
    {/if}
    <div class="mt-8 text-center">
        <a href="/documentation" class="text-sky-300 hover:text-sky-100 hover:underline">&larr; Back to Documentation</a>
    </div>
</div> 