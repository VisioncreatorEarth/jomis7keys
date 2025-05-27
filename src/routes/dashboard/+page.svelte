<script>
    import { currentUser } from '$lib/stores/userStore';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import AppointmentForm from '$lib/components/AppointmentForm.svelte';
    import AppointmentList from '$lib/components/AppointmentList.svelte';
    import {
        createAppointment,
        getAvailableAppointments,
        getAppointmentsHostedBy,
        getAppointmentsBookedBy,
        bookAppointment,
        deleteAppointment
    } from '$lib/appwrite_db.js';

    let showAppointmentForm = true;
    let creationStatus = '';

    let myHostedAppointments = [];
    let availableAppointments = [];
    let myBookedAppointments = [];
    let fetchError = '';

    async function fetchAllAppointments() {
        if (!$currentUser || !$currentUser.$id) return;
        fetchError = '';
        try {
            // Fetch in parallel
            const [hosted, available, booked] = await Promise.all([
                getAppointmentsHostedBy($currentUser.$id),
                getAvailableAppointments(),
                getAppointmentsBookedBy($currentUser.$id)
            ]);
            myHostedAppointments = hosted;
            availableAppointments = available;
            myBookedAppointments = booked;
        } catch (err) {
            console.error("Error fetching appointments:", err);
            fetchError = "Failed to load some appointment lists. " + err.message;
        }
    }

    onMount(() => {
        if (!$currentUser) {
            goto('/');
        } else {
            fetchAllAppointments();
        }
    });

    // Reactive check for user and fetch appointments if user logs in after page load
    $: if ($currentUser && $currentUser.$id && (myHostedAppointments.length === 0 && availableAppointments.length === 0 && myBookedAppointments.length === 0)) {
        // Avoid re-fetching if lists are already populated, unless a refresh mechanism is added
        fetchAllAppointments();
    } else if (!$currentUser && typeof window !== 'undefined') {
        goto('/');
    }

    async function handleAppointmentSubmit(event) {
        let userInfoForDebug = "User info was not available or $currentUser was null.";
        if ($currentUser) {
            userInfoForDebug = `User ID: ${$currentUser.$id}, User Name: ${$currentUser.name}, User Email: ${$currentUser.email}. Full $currentUser object: ${JSON.stringify($currentUser)}`;
        }
        creationStatus = `DEBUG INFO --- ${userInfoForDebug} --- END DEBUG INFO`;
        await new Promise(resolve => setTimeout(resolve, 50)); 

        if (!$currentUser || !$currentUser.$id) { 
            creationStatus = 'Error: Current user ID is not available. Please try logging out and back in. DEBUG: ' + userInfoForDebug;
            console.error("User data issue in handleAppointmentSubmit (missing ID):", $currentUser);
            return;
        }
        try {
            creationStatus = 'Creating appointment...';
            const appointmentDetails = event.detail;
            const newAppointment = await createAppointment(appointmentDetails, $currentUser);
            creationStatus = `Successfully created appointment: ${newAppointment.title || 'Untitled'} (ID: ${newAppointment.$id})`;
            fetchAllAppointments(); // Refresh lists after creating a new one
        } catch (error) {
            console.error("Error creating appointment:", error);
            creationStatus = `Error creating appointment: ${error.message}`;
        }
    }

    // Handlers for booking/deleting - will be implemented in Milestone 5
    async function handleBookAppointment(event) {
        const appointmentId = event.detail;
        if (!$currentUser || !$currentUser.$id) {
            alert('You must be logged in to book an appointment.');
            return;
        }
        try {
            creationStatus = `Booking appointment ${appointmentId}...`; // Use creationStatus for feedback
            await bookAppointment(appointmentId, $currentUser);
            creationStatus = `Successfully booked appointment ${appointmentId}!`;
            fetchAllAppointments(); // Refresh all lists
        } catch (error) {
            console.error("Error booking appointment:", error);
            creationStatus = `Error booking appointment: ${error.message}`;
            alert(`Error booking appointment: ${error.message}`); // Also alert for more immediate feedback
        }
    }

    async function handleDeleteAppointment(event) {
        const appointmentId = event.detail;
        if (!confirm("Are you sure you want to delete this appointment? This action cannot be undone.")) {
            return;
        }
        if (!$currentUser || !$currentUser.$id) {
            alert('Error: User not identified. Cannot delete.');
            return;
        }

        try {
            creationStatus = `Deleting appointment ${appointmentId}...`;
            // Note: We are not re-fetching the appointment here to double-check hostUserId against $currentUser.$id
            // The AppointmentList component should only show the delete button if appt.hostUserId === currentUserId
            // And if it's not booked. For more security, this check could be done server-side or here before calling Appwrite.
            await deleteAppointment(appointmentId);
            creationStatus = `Successfully deleted appointment ${appointmentId}.`;
            fetchAllAppointments(); // Refresh all lists
        } catch (error) {
            console.error("Error deleting appointment:", error);
            creationStatus = `Error deleting appointment: ${error.message}`;
            alert(`Error deleting appointment: ${error.message}`);
        }
    }

</script>

<svelte:head>
    <title>Dashboard - JOMA</title>
</svelte:head>

{#if $currentUser}
    <h1>Welcome to your Dashboard, {$currentUser.name || $currentUser.email.split('@')[0]}!</h1>
    <p>Your User ID is: {$currentUser.$id}</p>
    <!-- <p>Your Email is: {$currentUser.email}</p> -->

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
    {#if fetchError}<p class="status-message error">{fetchError}</p>{/if}

    <div>
        <h2>My Hosted Appointments</h2>
        <AppointmentList 
            appointments={myHostedAppointments} 
            listType='hostedByMe' 
            currentUserId={$currentUser.$id}
            on:deleteAppointment={handleDeleteAppointment} />
    </div>

    <hr />

    <div>
        <h2>Available Appointments</h2>
        <AppointmentList 
            appointments={availableAppointments} 
            listType='available' 
            currentUserId={$currentUser.$id}
            on:bookAppointment={handleBookAppointment} />
    </div>

    <hr />

    <div>
        <h2>My Booked Appointments</h2>
        <AppointmentList 
            appointments={myBookedAppointments} 
            listType='bookedByMe' 
            currentUserId={$currentUser.$id} />
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
    .status-message.error {
        background-color: #f8d7da;
        color: #721c24;
        border-color: #f5c6cb;
    }
</style> 