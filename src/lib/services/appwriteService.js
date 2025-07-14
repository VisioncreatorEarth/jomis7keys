import { Client, Account, Databases, Storage, ID } from 'appwrite';

// Environment configuration using SvelteKit PUBLIC_ variables
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';

// Validate environment variables
if (!PUBLIC_APPWRITE_ENDPOINT || !PUBLIC_APPWRITE_PROJECT_ID) {
	console.error('[appwriteService.js] Missing Appwrite environment variables:', {
		endpoint: !!PUBLIC_APPWRITE_ENDPOINT,
		projectId: !!PUBLIC_APPWRITE_PROJECT_ID
	});
}

// Initialize Appwrite client
const client = new Client();

if (PUBLIC_APPWRITE_ENDPOINT && PUBLIC_APPWRITE_PROJECT_ID) {
	client.setEndpoint(PUBLIC_APPWRITE_ENDPOINT).setProject(PUBLIC_APPWRITE_PROJECT_ID);
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
		console.error('Failed to login:', error);
		throw error;
	}
}

async function signupUser(email, password, name) {
	try {
		await account.create(ID.unique(), email, password, name);
		return await loginUser(email, password);
	} catch (error) {
		console.error('Failed to signup:', error);
		throw error;
	}
}

async function logoutUser() {
	try {
		await account.deleteSession('current');
	} catch (error) {
		console.error('Failed to logout:', error);
		throw error;
	}
}

async function getCurrentUser() {
	try {
		return await account.get();
	} catch {
		return null;
	}
}

/**
 * ========================================
 * Storage Functions
 * ========================================
 */

async function uploadFile(file, bucketId, fileId = null) {
	try {
		const response = await storage.createFile(bucketId, fileId || ID.unique(), file);
		return response;
	} catch (error) {
		console.error('Failed to upload file:', error);
		throw error;
	}
}

async function deleteFile(bucketId, fileId) {
	try {
		await storage.deleteFile(bucketId, fileId);
		return true;
	} catch (error) {
		console.error('Failed to delete file:', error);
		throw error;
	}
}

function getFileUrl(bucketId, fileId) {
	try {
		return storage.getFileView(bucketId, fileId);
	} catch (error) {
		console.error('Failed to get file URL:', error);
		return null;
	}
}

function getFileDownload(bucketId, fileId) {
	try {
		return storage.getFileDownload(bucketId, fileId);
	} catch (error) {
		console.error('Failed to get file download URL:', error);
		return null;
	}
}

async function getFileList(bucketId) {
	try {
		return await storage.listFiles(bucketId);
	} catch (error) {
		console.error('Failed to get file list:', error);
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
	storage
};
