<script>
    import { createEventDispatcher } from 'svelte';

    export let title = '';
    export let description = '';
    export let appointmentDateTime = ''; // Expected format: YYYY-MM-DDTHH:mm
    export let durationMinutes = 30;
    export let isEditing = false; // To change button text, etc.

    const dispatch = createEventDispatcher();

    function handleSubmit() {
        // Basic validation (can be enhanced)
        if (!appointmentDateTime || !durationMinutes) {
            alert('Please provide a valid date/time and duration.');
            return;
        }
        dispatch('submitAppointment', {
            title,
            description,
            appointmentDateTime,
            durationMinutes: parseInt(durationMinutes, 10)
        });
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <div>
        <label for="title">Title (Optional):</label>
        <input type="text" id="title" bind:value={title} maxlength="255" />
    </div>
    <div>
        <label for="description">Description (Optional):</label>
        <textarea id="description" bind:value={description} maxlength="10000"></textarea>
    </div>
    <div>
        <label for="appointmentDateTime">Date and Time:</label>
        <input type="datetime-local" id="appointmentDateTime" bind:value={appointmentDateTime} required />
    </div>
    <div>
        <label for="durationMinutes">Duration (minutes):</label>
        <input type="number" id="durationMinutes" bind:value={durationMinutes} min="15" step="15" required />
    </div>
    <button type="submit">{isEditing ? 'Update' : 'Create'} Appointment</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #f9f9f9;
        max-width: 500px;
        margin: 1rem auto; /* Center form if used standalone */
    }
    div {
        display: flex;
        flex-direction: column;
    }
    label {
        margin-bottom: 0.25rem;
        font-weight: bold;
    }
    input[type="text"],
    input[type="datetime-local"],
    input[type="number"],
    textarea {
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1em;
    }
    textarea {
        min-height: 80px;
        resize: vertical;
    }
    button[type="submit"] {
        padding: 0.75rem;
        border: none;
        border-radius: 4px;
        background-color: #28a745; /* Green for create/update */
        color: white;
        font-size: 1em;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }
    button[type="submit"]:hover {
        background-color: #218838;
    }
</style> 