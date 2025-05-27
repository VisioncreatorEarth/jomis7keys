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
        // console.log("Dashboard: Attempting to fetch all appointments for user: ", $currentUser.$id);
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
            console.error("Error fetching appointments:", err);
            fetchError = "Failed to load appointment lists: " + err.message;
            dataLoaded = false; // Data loading failed
        }
    }

    onMount(() => {
        // This logic runs once when the component mounts.
        // +layout.svelte is responsible for trying to populate $currentUser.
        if ($currentUser && $currentUser.$id) {
            // User is already available from the store (layout likely finished quickly)
            // console.log("Dashboard onMount: User found, fetching appointments.");
            isLoadingPage = false;
            if (!dataLoaded) { // Fetch only if we haven't loaded data for this user yet
                fetchAllAppointments();
            }
        } else if ($currentUser === null) {
            // Layout has determined there's no user (e.g. account.get() failed or no session)
            // console.log("Dashboard onMount: No user (currentUser is null), redirecting to /.");
            goto('/');
        }
        // If $currentUser is still its initial store value (e.g. undefined, if store was init with that),
        // the reactive block below will handle it when layout updates the store.
        // However, our store is init with null, so this case is covered by $currentUser === null.
        // We set isLoadingPage to false later if not set by user found case.
    });

    // Reactive statement for when $currentUser changes
    $: {
        if (typeof window !== 'undefined') { // Ensure this runs only client-side
            if ($currentUser && $currentUser.$id) {
                isLoadingPage = false; // We have a user, so not in the initial 'page loading' state
                if (!dataLoaded) {
                    // console.log("Dashboard reactive: User became available, fetching appointments.");
                    fetchAllAppointments();
                }
            } else if ($currentUser === null && window.location.pathname === '/dashboard'){
                // $currentUser explicitly became null (e.g., after logout or session expiry confirmed by layout)
                // and we are still on the dashboard path (e.g. direct navigation attempt without session)
                // console.log("Dashboard reactive: currentUser is null, redirecting to /.");
                goto('/');
            }
        }
    }

    // Reset dataLoaded flag if the user logs out (currentUser becomes null)
    // This ensures that if a new user logs in, data will be fetched for them.
    $: if (!$currentUser) {
        dataLoaded = false;
        myHostedAppointments = [];
        availableAppointments = [];
        myBookedAppointments = [];
        // isLoadingPage = true; // Reset to true if navigating away or expecting redirect
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
            console.error("Error creating appointment:", error);
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
            console.error("Error booking appointment:", error);
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
            console.error("Error deleting appointment:", error);
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