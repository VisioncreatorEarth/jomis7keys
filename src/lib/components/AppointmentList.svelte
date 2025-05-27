<script>
    export let appointments = [];
    export let listType = 'all'; // 'all', 'available', 'bookedByMe', 'hostedByMe'
    export let currentUserId = null; // Needed for some conditional rendering/actions

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function formatDate(dateTimeString) {
        if (!dateTimeString) return 'N/A';
        try {
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            return new Date(dateTimeString).toLocaleDateString(undefined, options);
        } catch (e) {
            return 'Invalid Date';
        }
    }

    function handleBook(appointmentId) {
        dispatch('bookAppointment', appointmentId);
    }

    function handleDelete(appointmentId) {
        dispatch('deleteAppointment', appointmentId);
    }
</script>

<div class="appointment-list-container">
    {#if appointments.length === 0}
        <p>No appointments to display in this list.</p>
    {:else}
        <ul>
            {#each appointments as appt (appt.$id)}
                <li>
                    <strong>{appt.title || 'Appointment'}</strong>
                    <p>Host: {appt.hostUserName || 'N/A'}</p>
                    <p>When: {formatDate(appt.appointmentDateTime)}</p>
                    <p>Duration: {appt.durationMinutes} minutes</p>
                    {#if appt.description}
                        <p>Description: {appt.description}</p>
                    {/if}
                    
                    {#if listType === 'available' && !appt.isBooked}
                        <button on:click={() => handleBook(appt.$id)}>Book This Appointment</button>
                    {/if}

                    {#if listType === 'hostedByMe'}
                        {#if appt.isBooked}
                            <p class="booked-info"><em>Booked by: {appt.bookedByUserName || 'Unknown User'} on {formatDate(appt.bookedAt)}</em></p>
                        {:else}
                            <p class="available-info"><em>This appointment is currently available.</em></p>
                            {#if appt.hostUserId === currentUserId}
                                <button on:click={() => handleDelete(appt.$id)} class="delete-button">Delete My Appointment</button>
                            {/if}
                        {/if}
                    {/if}

                    {#if listType === 'bookedByMe' && appt.bookedByUserId === currentUserId}
                        <p><em>You have booked this appointment.</em></p>
                        <p>Booked on: {formatDate(appt.bookedAt)}</p>
                    {/if}

                    {#if listType !== 'hostedByMe' && listType !== 'bookedByMe' && appt.isBooked }
                        <p><em>This appointment is booked.</em></p>
                        {#if appt.bookedByUserName}
                            <p>Booked by: {appt.bookedByUserName}</p>
                        {/if}
                    {/if}
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style>
    .appointment-list-container {
        margin-top: 1rem;
    }
    ul {
        list-style: none;
        padding: 0;
    }
    li {
        background-color: #f9f9f9;
        border: 1px solid #eee;
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 8px;
    }
    li strong {
        font-size: 1.2em;
        color: #333;
    }
    p {
        margin: 0.5rem 0;
        color: #555;
    }
    .booked-info {
        color: #28a745; /* Green for booked */
        font-style: italic;
    }
    .available-info {
        color: #17a2b8; /* Info blue for available */
        font-style: italic;
    }
    button {
        padding: 0.5rem 1rem;
        margin-top: 0.5rem;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }
    button:hover {
        background-color: #0056b3;
    }
    .delete-button {
        background-color: #dc3545;
    }
    .delete-button:hover {
        background-color: #c82333;
    }
</style> 