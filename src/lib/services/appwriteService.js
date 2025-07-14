import { Client, Account, Databases, Storage, ID } from 'appwrite';

// Environment variable configuration for both server and client
const IS_SERVER = typeof window === 'undefined';
let VITE_APPWRITE_ENDPOINT, VITE_APPWRITE_PROJECT_ID, VITE_APPWRITE_DATABASE_ID, VITE_APPWRITE_BUCKET_ID;

if (IS_SERVER) {
    try {
        const dotenv = require('dotenv');
        dotenv.config();
        
        VITE_APPWRITE_ENDPOINT = process.env.VITE_APPWRITE_ENDPOINT;
        VITE_APPWRITE_PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID;
        VITE_APPWRITE_DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID;
        VITE_APPWRITE_BUCKET_ID = process.env.VITE_APPWRITE_BUCKET_ID;
    } catch (err) {
        console.error('[appwriteService.js] Error configuring dotenv:', err);
    }
} else {
    // Client-side: use import.meta.env
    VITE_APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
    VITE_APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
    VITE_APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
    VITE_APPWRITE_BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
}

// Validate environment variables
if (!VITE_APPWRITE_ENDPOINT || !VITE_APPWRITE_PROJECT_ID || !VITE_APPWRITE_DATABASE_ID) {
    console.error("[appwriteService.js] Missing Appwrite environment variables:", {
        endpoint: !!VITE_APPWRITE_ENDPOINT,
        projectId: !!VITE_APPWRITE_PROJECT_ID,
        databaseId: !!VITE_APPWRITE_DATABASE_ID,
        bucketId: !!VITE_APPWRITE_BUCKET_ID
    });
}

// Initialize Appwrite client
const client = new Client();

if (VITE_APPWRITE_ENDPOINT && VITE_APPWRITE_PROJECT_ID) {
    client
        .setEndpoint(VITE_APPWRITE_ENDPOINT)
        .setProject(VITE_APPWRITE_PROJECT_ID);
}

// Initialize services
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

/**
 * ========================================
 * Core Authentication Functions
 * ========================================
 */

async function loginUser(email, password) {
    try {
        await account.createEmailSession(email, password);
        return await getCurrentUser();
    } catch (error) {
        console.error("Failed to login:", error);
        throw error;
    }
}

async function signupUser(email, password, name) {
    try {
        await account.create(ID.unique(), email, password, name);
        return await loginUser(email, password);
    } catch (error) {
        console.error("Failed to signup:", error);
        throw error;
    }
}

async function logoutUser() {
    try {
        await account.deleteSession('current');
    } catch (error) {
        console.error("Failed to logout:", error);
        throw error;
    }
}

async function getCurrentUser() {
    try {
        return await account.get();
    } catch (error) {
        return null;
    }
}

/**
 * ========================================
 * Storage Functions
 * ========================================
 */

async function uploadFile(file, fileId = null) {
    try {
        const response = await storage.createFile(
            VITE_APPWRITE_BUCKET_ID,
            fileId || ID.unique(),
            file
        );
        return response;
    } catch (error) {
        console.error("Failed to upload file:", error);
        throw error;
    }
}

async function deleteFile(fileId) {
    try {
        await storage.deleteFile(VITE_APPWRITE_BUCKET_ID, fileId);
        return true;
    } catch (error) {
        console.error("Failed to delete file:", error);
        throw error;
    }
}

function getFileUrl(fileId) {
    try {
        return storage.getFileView(VITE_APPWRITE_BUCKET_ID, fileId);
    } catch (error) {
        console.error("Failed to get file URL:", error);
        return null;
    }
}

function getFileDownload(fileId) {
    try {
        return storage.getFileDownload(VITE_APPWRITE_BUCKET_ID, fileId);
    } catch (error) {
        console.error("Failed to get file download URL:", error);
        return null;
    }
}

async function getFileList() {
    try {
        return await storage.listFiles(VITE_APPWRITE_BUCKET_ID);
    } catch (error) {
        console.error("Failed to get file list:", error);
        throw error;
    }
}

// Export clean service interface
export const appwriteService = {
    // Core authentication
    loginUser,
    signupUser,
    logoutUser,
    getCurrentUser,
    
    // Storage functions
    uploadFile,
    deleteFile,
    getFileUrl,
    getFileDownload,
    getFileList,
    
    // Direct access to clients for custom operations
    client,
    account,
    databases,
    storage,
    
    // Environment variables for custom collection operations
    DATABASE_ID: VITE_APPWRITE_DATABASE_ID,
    BUCKET_ID: VITE_APPWRITE_BUCKET_ID
}; 