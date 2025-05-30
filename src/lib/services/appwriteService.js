import { Client, Account, Databases, ID, Query } from 'appwrite';

// --- Start of dotenv configuration ---
const IS_SERVER = typeof window === 'undefined';
let VITE_APPWRITE_ENDPOINT, VITE_APPWRITE_PROJECT_ID, VITE_APPWRITE_DATABASE_ID, VITE_COURSE_ENROLLMENTS_COLLECTION_ID;

if (IS_SERVER) {
    try {
        const dotenv = require('dotenv');
        dotenv.config();
        console.log('[appwriteService.js] dotenv configured using require().');

        VITE_APPWRITE_ENDPOINT = process.env.VITE_APPWRITE_ENDPOINT;
        VITE_APPWRITE_PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID;
        VITE_APPWRITE_DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID;
        VITE_COURSE_ENROLLMENTS_COLLECTION_ID = process.env.VITE_COURSE_ENROLLMENTS_COLLECTION_ID;

    } catch (err) {
        console.error('[appwriteService.js] Error configuring dotenv with require():', err);
    }
} else {
    // Client-side: use import.meta.env
    VITE_APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
    VITE_APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
    VITE_APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
    VITE_COURSE_ENROLLMENTS_COLLECTION_ID = import.meta.env.VITE_COURSE_ENROLLMENTS_COLLECTION_ID;
}
// --- End of dotenv and variable initialization ---


// Check variables
if (!VITE_APPWRITE_ENDPOINT || !VITE_APPWRITE_PROJECT_ID || !VITE_APPWRITE_DATABASE_ID || !VITE_COURSE_ENROLLMENTS_COLLECTION_ID) {
    console.error("[appwriteService.js] CRITICAL: Missing one or more Appwrite environment variables. Values after attempt:", 
        {
            endpoint: VITE_APPWRITE_ENDPOINT,
            projectId: VITE_APPWRITE_PROJECT_ID,
            dbId: VITE_APPWRITE_DATABASE_ID,
            enrollmentsId: VITE_COURSE_ENROLLMENTS_COLLECTION_ID
        });
} else {
    console.log("[appwriteService.js] Appwrite environment variables seem to be loaded.");
    console.log(`[appwriteService.js] Endpoint: ${VITE_APPWRITE_ENDPOINT}, EnrollmentsCollection: ${VITE_COURSE_ENROLLMENTS_COLLECTION_ID}`);
}

const client = new Client();

if (VITE_APPWRITE_ENDPOINT) {
    client.setEndpoint(VITE_APPWRITE_ENDPOINT);
} else {
    // This should ideally not be hit if the check above is comprehensive
    console.error("[appwriteService.js] Endpoint was undefined when setting up client.");
}

if (VITE_APPWRITE_PROJECT_ID) {
    client.setProject(VITE_APPWRITE_PROJECT_ID);
} else {
    // This should ideally not be hit
    console.error("[appwriteService.js] Project ID was undefined when setting up client.");
}

const account = new Account(client);
const databases = new Databases(client);

/**
 * ========================================
 * User Authentication Service Functions
 * ========================================
 */

async function loginUser(email, password) {
    try {
        await account.createEmailSession(email, password);
        return await getCurrentUser();
    } catch (error) {
        console.error("Service: Failed to login:", error);
        throw error;
    }
}

async function signupUser(email, password, name) {
    try {
        await account.create(ID.unique(), email, password, name);
        return await loginUser(email, password);
    } catch (error) {
        console.error("Service: Failed to signup:", error);
        throw error;
    }
}

async function logoutUser() {
    try {
        await account.deleteSession('current');
    } catch (error) {
        console.error("Service: Failed to delete session:", error);
        throw error;
    }
}

async function getCurrentUser() {
    try {
        return await account.get();
    } catch (error) {
        // Appwrite throws an error if no session, which is normal, so don't log as error here
        // console.info("No active user session or failed to get user:", error.message);
        return null;
    }
}

/**
 * ========================================
 * Course Enrollment Service Functions (NEW)
 * ========================================
 */

async function enrollUserInCourse(enrollmentData, currentUser) {
    if (!VITE_COURSE_ENROLLMENTS_COLLECTION_ID) {
        throw new Error("Course enrollments collection ID is not configured.");
    }
    if (!currentUser || !currentUser.$id || !currentUser.email) {
        throw new Error("A valid logged-in user is required for enrollment.");
    }
    try {
        const documentPayload = {
            userId: currentUser.$id,
            userEmail: currentUser.email,
            userName: currentUser.name || currentUser.email.split('@')[0],
            courseTitle: enrollmentData.courseTitle, // e.g., "Mastering Network 3.0"
            enrollmentDate: new Date().toISOString(),
        };
        const response = await databases.createDocument(
            VITE_APPWRITE_DATABASE_ID,
            VITE_COURSE_ENROLLMENTS_COLLECTION_ID,
            ID.unique(),
            documentPayload
        );
        return response;
    } catch (error) {
        console.error("Service: Failed to enroll user in course:", error);
        throw error;
    }
}

export const appwriteService = {
    loginUser,
    signupUser,
    logoutUser,
    getCurrentUser,
    enrollUserInCourse,
}; 