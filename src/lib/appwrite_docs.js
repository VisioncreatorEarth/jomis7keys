import { databases, ID, Query } from "./appwrite"; // Assuming appwrite.js is in $lib

const DATABASE_ID = '68357c7b00070f3dbade'; // Replace with your Database ID
const ARTICLES_COLLECTION_ID = '68399b3a0011b6bfb832'; // Replace with your Collection ID

export async function listDocumentationArticles(limit = 25, offset = 0) {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            ARTICLES_COLLECTION_ID,
            [
                Query.equal('isPublished', true),
                Query.orderDesc('publishedAt'), // or orderAsc by title, etc.
                Query.limit(limit),
                Query.offset(offset)
            ]
        );
        return response.documents;
    } catch (error) {
        console.error("Failed to list documentation articles:", error);
        throw error;
    }
}

export async function getDocumentationArticleBySlug(slug) {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            ARTICLES_COLLECTION_ID,
            [
                Query.equal("slug", slug),
                Query.equal('isPublished', true),
                Query.limit(1)
            ]
        );
        if (response.documents.length > 0) {
            return response.documents[0];
        } else {
            // Return null or an empty object instead of throwing an error directly
            // This allows the +page.server.js to handle the 404 error more gracefully
            return null; 
        }
    } catch (error) {
        console.error(`Failed to get article by slug ${slug}:`, error);
        throw error;
    }
}

// Add create, update, delete functions if you plan to manage articles from the app
// export async function createArticle(articleData, userId) { ... } 