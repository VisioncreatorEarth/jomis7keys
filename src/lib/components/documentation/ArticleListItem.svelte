<!-- src/lib/components/documentation/ArticleListItem.svelte -->
<script>
    export let article; // { title, slug, category, authorName, publishedAt }
</script>

<div class="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-md">
    <a href={`/documentation/${article.slug}`} class="block">
        <h3 class="text-xl font-semibold text-sky-700 hover:text-sky-900">{article.title}</h3>
        {#if article.category}
            <p class="text-sm text-gray-600 mt-1">Category: {article.category}</p>
        {/if}
        {#if article.authorName}
            <p class="text-sm text-gray-500 mt-1">By: {article.authorName}</p>
        {/if}
        {#if article.publishedAt}
            <p class="text-xs text-gray-400 mt-2">
                Published: {new Date(article.publishedAt).toLocaleDateString()}
            </p>
        {/if}
    </a>
</div> 