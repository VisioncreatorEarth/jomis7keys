import { Client, Databases, ID, Query } from 'appwrite';
import { client } from './appwrite'; // Assuming client is exported from appwrite.js

export const DATABASE_ID = '68357c7b00070f3dbade';
export const APPOINTMENTS_COLLECTION_ID = '68357d08003a530aa17d';

export const databases = new Databases(client);

export async function createAppointment(appointmentData, hostUser) {
    if (!hostUser || !hostUser.$id || !hostUser.name) {
        throw new Error("Valid host user information is required to create an appointment.");
    }
    try {
        const documentPayload = {
            ...appointmentData, // Should contain title, description, appointmentDateTime, durationMinutes
            hostUserId: hostUser.$id,
            hostUserName: hostUser.name,
            isBooked: false, // Default as per collection setup
            // bookedByUserId, bookedByUserName, bookedAt, zoom fields will be null or not set initially
        };

        // Ensure appointmentDateTime is in ISO format if not already
        // HTML datetime-local input usually provides it in a compatible format, but Appwrite expects strict ISO 8601.
        // If appointmentData.appointmentDateTime is just a string, ensure it's correctly formatted.
        // For simplicity, we assume it's correctly formatted by the input.

        const response = await databases.createDocument(
            DATABASE_ID,
            APPOINTMENTS_COLLECTION_ID,
            ID.unique(), // Generate a unique ID for the new document
            documentPayload
        );
        return response; // Returns the newly created document
    } catch (error) {
        console.error("Failed to create appointment:", error);
        // Consider how to propagate this error to the UI
        // For now, re-throwing or returning a specific error structure might be good
        throw error; // Re-throw the error to be caught by the calling UI component
    }
}

// Functions for interacting with appointments collection will be added here
// e.g., createAppointment, getAvailableAppointments, etc. 