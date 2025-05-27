<script>
    import { currentUser } from '$lib/stores/userStore';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import AppointmentForm from '$lib/components/AppointmentForm.svelte';
    import { createAppointment } from '$lib/appwrite_db.js';

    let showAppointmentForm = true; // Or toggle this as needed
    let creationStatus = ''; // For user feedback

    // If user is not logged in, redirect to login page
    onMount(() => {
        if (!$currentUser) {
            goto('/');
        }
    });

    // Reactive check in case store updates after mount
    $: if (!$currentUser && typeof window !== 'undefined') { 
        goto('/');
    }

    async function handleAppointmentSubmit(event) {
        if (!$currentUser) {
            creationStatus = 'Error: You must be logged in to create an appointment.';
            return;
        }
        try {
            creationStatus = 'Creating appointment...';
            const appointmentDetails = event.detail;
            const newAppointment = await createAppointment(appointmentDetails, $currentUser);
            creationStatus = `Successfully created appointment: ${newAppointment.title || 'Untitled'} (ID: ${newAppointment.$id})`;
            // Optionally, clear form or hide it
            // Reset form state if AppointmentForm exposes a reset function or by re-rendering with key
            // For now, we'll just show a message. We can add a list refresh later.
        } catch (error) {
            console.error("Error creating appointment:", error);
            creationStatus = `Error creating appointment: ${error.message}`;
        }
    }

</script>

<svelte:head>
    <title>Dashboard - JOMA</title>
</svelte:head>

{#if $currentUser}
    <h1>Welcome to your Dashboard, {$currentUser.name}!</h1>
    <p>Your User ID is: {$currentUser.$id}</p>
    <p>Your Email is: {$currentUser.email}</p>

    <hr />

    <div>
        <h2>Create New Appointment</h2>
        {#if showAppointmentForm}
            <AppointmentForm on:submitAppointment={handleAppointmentSubmit} />
        {/if}
        {#if creationStatus}
            <p class="status-message">{creationStatus}</p>
        {/if}
    </div>

    <hr />

    <div>
        <h2>My Hosted Appointments</h2>
        <!-- AppointmentList for hosted appointments will go here (Milestone 4) -->
        <p>[My Hosted Appointments List Placeholder]</p>
    </div>

    <hr />

    <div>
        <h2>Available Appointments</h2>
        <!-- AppointmentList for available appointments will go here (Milestone 4) -->
        <p>[Available Appointments List Placeholder]</p>
    </div>

    <hr />

    <div>
        <h2>My Booked Appointments</h2>
        <!-- AppointmentList for booked appointments will go here (Milestone 4) -->
        <p>[My Booked Appointments List Placeholder]</p>
    </div>

{:else}
    <p>Loading user information or redirecting...</p>
{/if}

<style>
    h1, h2 {
        color: #333;
    }
    hr {
        margin: 2rem 0;
    }
    div {
        margin-bottom: 2rem;
    }
    .status-message {
        margin-top: 1rem;
        padding: 0.5rem;
        border-radius: 4px;
        background-color: #e9ecef;
        border: 1px solid #ced4da;
    }
</style> 