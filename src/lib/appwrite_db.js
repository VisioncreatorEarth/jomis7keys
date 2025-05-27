import { Client, Databases, ID, Query } from 'appwrite';
import { client } from './appwrite'; // Assuming client is exported from appwrite.js

export const DATABASE_ID = '68357c7b00070f3dbade';
export const APPOINTMENTS_COLLECTION_ID = '68357d08003a530aa17d';

export const databases = new Databases(client);

export async function createAppointment(appointmentData, hostUser) {
    // Allow empty name, but ID is critical.
    if (!hostUser || !hostUser.$id) {
        throw new Error("Valid host user ID is required to create an appointment.");
    }
    try {
        const documentPayload = {
            ...appointmentData, // Should contain title, description, appointmentDateTime, durationMinutes
            hostUserId: hostUser.$id,
            // Use user's name if available, otherwise part of email, or a default.
            hostUserName: hostUser.name || hostUser.email.split('@')[0] || "User",
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

export async function getAvailableAppointments() {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            APPOINTMENTS_COLLECTION_ID,
            [
                Query.equal('isBooked', false),
                Query.orderDesc('appointmentDateTime') // Show soonest available first, or use orderAsc for further out
            ]
        );
        return response.documents;
    } catch (error) {
        console.error("Failed to fetch available appointments:", error);
        throw error;
    }
}

export async function getAppointmentsHostedBy(userId) {
    if (!userId) throw new Error("User ID is required to fetch hosted appointments.");
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            APPOINTMENTS_COLLECTION_ID,
            [
                Query.equal('hostUserId', userId),
                Query.orderDesc('appointmentDateTime')
            ]
        );
        return response.documents;
    } catch (error) {
        console.error("Failed to fetch appointments hosted by user:", error);
        throw error;
    }
}

export async function getAppointmentsBookedBy(userId) {
    if (!userId) throw new Error("User ID is required to fetch booked appointments.");
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            APPOINTMENTS_COLLECTION_ID,
            [
                Query.equal('bookedByUserId', userId),
                Query.orderDesc('appointmentDateTime')
            ]
        );
        return response.documents;
    } catch (error) {
        console.error("Failed to fetch appointments booked by user:", error);
        throw error;
    }
}

export async function bookAppointment(appointmentId, bookerUser) {
    if (!bookerUser || !bookerUser.$id) {
        throw new Error("Valid booker user ID is required to book an appointment.");
    }
    if (!appointmentId) {
        throw new Error("Appointment ID is required to book an appointment.");
    }

    try {
        const payload = {
            isBooked: true,
            bookedByUserId: bookerUser.$id,
            bookedByUserName: bookerUser.name || bookerUser.email.split('@')[0] || "User", // Fallback for name
            bookedAt: new Date().toISOString()
        };
        const response = await databases.updateDocument(
            DATABASE_ID,
            APPOINTMENTS_COLLECTION_ID,
            appointmentId,
            payload
        );
        return response;
    } catch (error) {
        console.error(`Failed to book appointment ${appointmentId}:`, error);
        throw error;
    }
}

export async function deleteAppointment(appointmentId) {
    if (!appointmentId) {
        throw new Error("Appointment ID is required to delete an appointment.");
    }
    try {
        const response = await databases.deleteDocument(
            DATABASE_ID,
            APPOINTMENTS_COLLECTION_ID,
            appointmentId
        );
        return response; // Appwrite delete returns an empty response on success
    } catch (error) {
        console.error(`Failed to delete appointment ${appointmentId}:`, error);
        throw error;
    }
}

// Functions for interacting with appointments collection will be added here
// e.g., createAppointment, getAvailableAppointments, etc. 