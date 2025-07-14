import { appwriteService } from './appwriteService.js';

/**
 * Image Service for managing Appwrite storage
 * This service helps migrate from local images to Appwrite storage
 */

// Image mapping for migration - update these with full Appwrite URLs (with tokens if needed)
export const IMAGE_MAPPING = {
	// Hero/Background Images - Videos are hosted on external CDN
	'hero-video':
		'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // External CDN video placeholder
	'joachim-michaela-garden':
		'https://fra.cloud.appwrite.io/v1/storage/buckets/6872736b0021a5826ece/files/6874dddd0023e534e01f/preview?project=68357409002d8b46f512&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbklkIjoiNjg3NTAzY2E1MWE1ZDk1Nzk2OTQiLCJyZXNvdXJjZUlkIjoiNjg3MjczNmIwMDIxYTU4MjZlY2U6Njg3NGRkZGQwMDIzZTUzNGUwMWYiLCJyZXNvdXJjZVR5cGUiOiJmaWxlcyIsInJlc291cmNlSW50ZXJuYWxJZCI6IjI1MjQ0OjEiLCJleHAiOjE3NTI0OTkyMDZ9.um35nG71aklxYi727a7VKxdT5_4eR-T0MqiRi9ZJVeQ',
	'philosophy-bg':
		'https://fra.cloud.appwrite.io/v1/storage/buckets/6872736b0021a5826ece/files/68750537002f3b96da6b/preview?project=68357409002d8b46f512&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbklkIjoiNjg3NTA1NGRkNDM3ZGEyOGVhZGYiLCJyZXNvdXJjZUlkIjoiNjg3MjczNmIwMDIxYTU4MjZlY2U6Njg3NTA1MzcwMDJmM2I5NmRhNmIiLCJyZXNvdXJjZVR5cGUiOiJmaWxlcyIsInJlc291cmNlSW50ZXJuYWxJZCI6IjI1MjQ0OjIiLCJleHAiOjkuMjIzMzcyMDM4NjA3Mjc2ZSsxOH0.US2QbC5nQgPr88EjAOTIxqJr0NuAGfuDutS5QT-v6co',
	'about-us-bg':
		'https://fra.cloud.appwrite.io/v1/storage/buckets/6872736b0021a5826ece/files/6875064800216799ac07/preview?project=68357409002d8b46f512&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbklkIjoiNjg3NTA2NTdlOTQ0MmMwYzIwMTEiLCJyZXNvdXJjZUlkIjoiNjg3MjczNmIwMDIxYTU4MjZlY2U6Njg3NTA2NDgwMDIxNjc5OWFjMDciLCJyZXNvdXJjZVR5cGUiOiJmaWxlcyIsInJlc291cmNlSW50ZXJuYWxJZCI6IjI1MjQ0OjMiLCJleHAiOjkuMjIzMzcyMDM4NjA3Mjc2ZSsxOH0.Zc7Mz_GWM3XlkIG0C9Rrg5DSXqw02SXgWJvW3-I8wME',

	// Additional stills for future use
	'still-1-3-1': null, // Still 2025-07-12 105710_1.3.1.jpg
	'still-1-5-1': null // Still 2025-07-12 105710_1.5.1.jpg
};

// All assets are now hosted remotely (Appwrite for images, external CDN for videos)

/**
 * Get image URL - falls back to local if Appwrite URL not set
 * @param {string} imageKey - Key from IMAGE_MAPPING
 * @returns {string} Image URL
 */
export function getImageUrl(imageKey) {
	const remoteUrl = IMAGE_MAPPING[imageKey];

	if (remoteUrl) {
		// Use direct remote URL (external CDN for videos, Appwrite for images)
		return remoteUrl;
	} else {
		// All assets should be migrated to remote storage
		console.error(`Asset ${imageKey} not found in remote storage mapping`);
		return null;
	}
}

/**
 * Upload image to Appwrite and update mapping
 * @param {string} imageKey - Key from IMAGE_MAPPING
 * @param {File} file - File to upload
 * @param {string} bucketId - Appwrite bucket ID
 * @returns {Promise<string>} File ID
 */
export async function uploadAndMapImage(imageKey, file, bucketId) {
	try {
		const response = await appwriteService.uploadFile(file, bucketId);

		// Update the mapping (in production, this should update a config file or database)
		IMAGE_MAPPING[imageKey] = response.$id;

		console.log(`✅ Uploaded ${imageKey} with ID: ${response.$id}`);
		return response.$id;
	} catch (error) {
		console.error(`❌ Failed to upload ${imageKey}:`, error);
		throw error;
	}
}

/**
 * Batch upload utility for migration
 * @param {Array} uploads - Array of {key, file} objects
 * @returns {Promise<Object>} Results mapping
 */
export async function batchUploadImages(uploads) {
	const results = {};

	for (const { key, file } of uploads) {
		try {
			const fileId = await uploadAndMapImage(key, file);
			results[key] = { success: true, fileId };
		} catch (error) {
			results[key] = { success: false, error: error.message };
		}
	}

	return results;
}

/**
 * Generate migration report
 * @returns {Object} Migration status
 */
export function getMigrationStatus() {
	const total = Object.keys(IMAGE_MAPPING).length;
	const migrated = Object.values(IMAGE_MAPPING).filter((id) => id !== null).length;
	const pending = total - migrated;

	return {
		total,
		migrated,
		pending,
		percentage: Math.round((migrated / total) * 100),
		pendingImages: Object.entries(IMAGE_MAPPING)
			.filter(([, id]) => id === null)
			.map(([key]) => key)
	};
}

// Export for easy access
export const imageService = {
	getImageUrl,
	uploadAndMapImage,
	batchUploadImages,
	getMigrationStatus,
	IMAGE_MAPPING
};
