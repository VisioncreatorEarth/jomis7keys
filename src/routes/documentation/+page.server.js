import { listDocumentationArticles } from '$lib/appwrite_docs.js';

export async function load() {
    try {
        const articles = await listDocumentationArticles();
        return {
            articles
        };
    } catch (error) {
        console.error("Error loading articles in documentation/+page.server.js:", error);
        // It's generally better to let SvelteKit handle the error page by throwing it,
        // or return a specific error structure that the +page.svelte can gracefully display.
        return {
            articles: [],
            error: "Failed to load documentation articles. Please try again later."
        };
    }
} 