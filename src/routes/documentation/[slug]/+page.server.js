import { getDocumentationArticleBySlug } from '$lib/appwrite_docs.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        const article = await getDocumentationArticleBySlug(params.slug);
        if (article) {
            return {
                article
            };
        }
        // If article is null (not found by appwrite_docs service), throw a 404
        throw error(404, { 
            message: 'Article not found',
            details: `No article with slug '${params.slug}' was found or it is not published.` 
        });
    } catch (err) {
        // Log the original error for server-side debugging
        console.error(`Error loading article with slug '${params.slug}':`, err);

        // If it's already a SvelteKit error (like the one we threw), re-throw it
        if (err.status) {
            throw err;
        }
        // For other unexpected errors, throw a generic 500
        throw error(500, {
            message: 'Failed to load article',
            details: 'An unexpected error occurred while trying to fetch the article.'
        });
    }
} 