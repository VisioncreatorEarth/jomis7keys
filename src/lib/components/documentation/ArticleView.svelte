<!-- src/lib/components/documentation/ArticleView.svelte -->
<script>
    export let article; // { title, content, authorName, publishedAt, category }
    import { marked } from 'marked'; // Install via npm/yarn/pnpm add marked

    let htmlContent = '';

    $: {
        if (article && article.content) {
            try {
                htmlContent = marked(article.content);
            } catch (e) {
                console.error("Error parsing Markdown content:", e);
                htmlContent = '<p class="text-red-500">Error rendering content.</p>';
            }
        } else {
            htmlContent = '<p>No content available.</p>';
        }
    }
</script>

<article class="prose lg:prose-xl prose-invert max-w-none p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-gray-200">
    <header class="mb-6 pb-4 border-b border-gray-700">
        <h1 class="!text-4xl font-bold !text-gray-100">{article?.title || 'Article Title Missing'}</h1>
        <div class="mt-2 text-sm text-gray-400">
            {#if article?.authorName}<span>By {article.authorName}</span>{/if}
            {#if article?.publishedAt}<span class="ml-2">Published: {new Date(article.publishedAt).toLocaleDateString()}</span>{/if}
            {#if article?.category}<span class="ml-2">Category: {article.category}</span>{/if}
        </div>
    </header>
    
    {@html htmlContent}

</article>

<!-- 
    Ensure Tailwind Typography plugin is configured in your tailwind.config.js for .prose styles:
    plugins: [
        require('@tailwindcss/typography'),
    ],
    And that your global CSS includes Tailwind base, components, utilities.
    Prose styles can be further customized in tailwind.config.js, e.g., for prose-invert colors.
--> 