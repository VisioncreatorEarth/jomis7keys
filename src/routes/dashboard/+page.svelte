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

    let myHostedAppointments = [];
    let availableAppointments = [];
    let myBookedAppointments = [];
    let fetchError = '';
    let creationStatus = '';
    let showAppointmentForm = true;

    let dataLoaded = false; // Flag to track if initial data for the current user has been loaded
    let isLoadingPage = true; // To manage the visibility of the 'Loading user...' message

    async function fetchAllAppointments() {
        if (!$currentUser || !$currentUser.$id) {
            dataLoaded = false; // No user, so no data loaded for a user
            return;
        }
        console.log("Dashboard: Attempting to fetch all appointments for user: ", $currentUser.$id);
        fetchError = '';
        try {
            // Fetch in parallel
            const [hosted, available, booked] = await Promise.all([
                getAppointmentsHostedBy($currentUser.$id),
                getAvailableAppointments(), // Available appointments are not user-specific in query
                getAppointmentsBookedBy($currentUser.$id)
            ]);
            myHostedAppointments = hosted;
            availableAppointments = available;
            myBookedAppointments = booked;
            dataLoaded = true; // Mark data as loaded for this user session
        } catch (err) {
            console.error("Dashboard: Error fetching appointments:", err);
            fetchError = "Failed to load appointment lists: " + err.message;
            dataLoaded = false; // Data loading failed
        }
    }

    onMount(() => {
        if ($currentUser && $currentUser.$id) {
            console.log("Dashboard onMount: User found ($currentUser.$id), isLoadingPage=false. Fetching appointments if not loaded.");
            isLoadingPage = false;
            if (!dataLoaded) { 
                fetchAllAppointments();
            }
        } else if ($currentUser === null) {
            console.log("Dashboard onMount: No user (currentUser is null), redirecting to /.");
            goto('/');
        } else {
            console.log("Dashboard onMount: currentUser is in an intermediate state. Waiting for reactive block.");
            // isLoadingPage remains true, reactive block should handle it
        }
    });

    // Reactive statement for when $currentUser changes
    $: {
        if (typeof window !== 'undefined') { // Ensure this runs only client-side
            if ($currentUser && $currentUser.$id) {
                // console.log("Dashboard reactive: $currentUser became available with ID: ", $currentUser.$id);
                if (isLoadingPage) {
                    console.log("Dashboard reactive: User resolved, was loading page. Setting isLoadingPage=false.");
                    isLoadingPage = false;
                }
                if (!dataLoaded) {
                    console.log("Dashboard reactive: User available and data not loaded, fetching appointments.");
                    fetchAllAppointments();
                }
            } else if ($currentUser === null){
                console.log("Dashboard reactive: currentUser became null.");
                if (window.location.pathname === '/dashboard') {
                    console.log("Dashboard reactive: Still on /dashboard and currentUser is null, redirecting to /.");
                    goto('/');
                } else {
                     // console.log("Dashboard reactive: currentUser is null, but not on /dashboard path. Path: ", window.location.pathname);
                }
            } else {
                // console.log("Dashboard reactive: $currentUser is in an indeterminate state (not null, but no .$id?), or initial undefined from store before layout hydration ", $currentUser);
                // If $currentUser is undefined (initial state before layout sets it to user object or null), isLoadingPage should remain true.
                // if ($currentUser === undefined && isLoadingPage) {
                    // console.log("Dashboard reactive: currentUser is undefined, page is still loading.");
                // }
            }
        }
    }

    // Reset dataLoaded flag if the user logs out (currentUser becomes null)
    // This ensures that if a new user logs in, data will be fetched for them.
    $: if (!$currentUser) {
        // console.log("Dashboard reactive: $currentUser is now falsy. Resetting dataLoaded and lists.");
        dataLoaded = false;
        myHostedAppointments = [];
        availableAppointments = [];
        myBookedAppointments = [];
        // isLoadingPage = true; // Reconsider if this should always be true - might cause flicker on logout then redirect
    }

    async function handleAppointmentSubmit(event) {
        if (!$currentUser || !$currentUser.$id) {
            creationStatus = 'Error: Current user ID is not available. Please log in again.';
            return;
        }
        creationStatus = 'Creating appointment...';
        try {
            const appointmentDetails = event.detail;
            const newAppointment = await createAppointment(appointmentDetails, $currentUser);
            creationStatus = `Successfully created: ${newAppointment.title || 'Appointment'}`;
            await fetchAllAppointments(); // Refresh lists
        } catch (error) {
            console.error("Dashboard: Error creating appointment:", error);
            creationStatus = `Error creating appointment: ${error.message}`;
        }
    }

    async function handleBookAppointment(event) {
        const appointmentId = event.detail;
        if (!$currentUser || !$currentUser.$id) {
            alert('You must be logged in to book an appointment.');
            return;
        }
        creationStatus = `Booking appointment ${appointmentId}...`;
        try {
            await bookAppointment(appointmentId, $currentUser);
            creationStatus = `Successfully booked appointment ${appointmentId}!`;
            await fetchAllAppointments(); // Refresh all lists
        } catch (error) {
            console.error("Dashboard: Error booking appointment:", error);
            creationStatus = `Error booking appointment: ${error.message}`;
            alert(`Error booking: ${error.message}`);
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
        creationStatus = `Deleting appointment ${appointmentId}...`;
        try {
            await deleteAppointment(appointmentId);
            creationStatus = `Successfully deleted appointment ${appointmentId}.`;
            await fetchAllAppointments(); // Refresh all lists
        } catch (error) {
            console.error("Dashboard: Error deleting appointment:", error);
            creationStatus = `Error deleting: ${error.message}`;
            alert(`Error deleting: ${error.message}`);
        }
    }

</script>

<svelte:head>
    <title>Dashboard - JOMA</title>
</svelte:head>

{#if isLoadingPage && !$currentUser}
    <!-- This is the initial state if currentUser is not yet determined by layout -->
    <p>Loading user information or redirecting...</p>
{:else if $currentUser}
    <!-- User is confirmed, show dashboard content -->
    <h1>Welcome to your Dashboard, {$currentUser.name || $currentUser.email.split('@')[0]}!</h1>
    <p>Your User ID is: {$currentUser.$id}</p>

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

    {#if !dataLoaded && !fetchError}
        <p>Loading appointments...</p>
    {:else if fetchError}
        <!-- Fetch error is already shown above, so this specific part might be redundant -->
    {:else}
        <div>
            <h2>My Hosted Appointments</h2>
            <AppointmentList appointments={myHostedAppointments} listType='hostedByMe' currentUserId={$currentUser.$id} on:deleteAppointment={handleDeleteAppointment} />
        </div>
        <hr />
        <div>
            <h2>Available Appointments</h2>
            <AppointmentList appointments={availableAppointments} listType='available' currentUserId={$currentUser.$id} on:bookAppointment={handleBookAppointment} />
        </div>
        <hr />
        <div>
            <h2>My Booked Appointments</h2>
            <AppointmentList appointments={myBookedAppointments} listType='bookedByMe' currentUserId={$currentUser.$id} />
        </div>
    {/if}
{:else}
    <!-- Fallback: $currentUser is null, and isLoadingPage is false (meaning layout confirmed no user or redirect should have happened) -->
    <!-- This state should ideally be very transient as goto('/') would be called. -->
    <p>No active session. Redirecting to login...</p>
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