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

    const MAIN_HOST_USER_ID = '6835776c00327c1049fe'; // Task 1.1
    let isMainUser = false; // Task 1.2

    let allMyHostedAppointments = []; // For main user
    let availableAppointments = []; // For regular users
    let myBookedAppointments = []; // For regular users
    let fetchError = '';
    let creationStatus = '';
    // Removed showAppointmentForm, will be controlled by isMainUser for form visibility

    let dataLoaded = false; // Flag to track if initial data for the current user has been loaded
    let isLoadingPage = true; // To manage the visibility of the 'Loading user...' message

    // Reactive update for isMainUser
    $: {
        if ($currentUser && $currentUser.$id) {
            isMainUser = $currentUser.$id === MAIN_HOST_USER_ID;
            // console.log("Dashboard reactive: isMainUser set to: ", isMainUser);
            // When user type changes (e.g. logout and login as different type), reset dataLoaded to force refetch appropriate data
            if (dataLoaded && ($currentUser.$id !== (isMainUser ? MAIN_HOST_USER_ID : $currentUser.$id))) { // A bit redundant, but checks if context changed
                // dataLoaded = false;
            }
        } else {
            isMainUser = false;
        }
    }

    async function fetchAllAppointments() {
        if (!$currentUser || !$currentUser.$id) {
            dataLoaded = false; // No user, so no data loaded for a user
            return;
        }
        // console.log(`Dashboard: Fetching appointments. User: ${$currentUser.$id}, IsMainUser: ${isMainUser}`);
        fetchError = '';
        // isLoadingPage = true; // isLoadingPage is more about initial page readiness, not repeated fetches

        try {
            if (isMainUser) {
                // console.log("Fetching data for MAIN USER");
                allMyHostedAppointments = await getAppointmentsHostedBy(MAIN_HOST_USER_ID);
                // Clear other lists for main user to avoid confusion if they were populated
                availableAppointments = [];
                myBookedAppointments = []; 
            } else {
                // console.log("Fetching data for REGULAR USER");
                const [available, booked] = await Promise.all([
                    getAvailableAppointments(), 
                    getAppointmentsBookedBy($currentUser.$id)
                ]);
                availableAppointments = available;
                myBookedAppointments = booked;
                // Clear host list for regular user
                allMyHostedAppointments = []; 
            }
            dataLoaded = true; // Mark data as loaded for this user session
        } catch (err) {
            console.error("Dashboard: Error fetching role-specific appointments:", err); // Keep this error log
            fetchError = "Failed to load appointments: " + err.message;
            dataLoaded = false; // Data loading failed
        } finally {
            // if (dataLoaded || fetchError) {
            //      isLoadingPage = false; // This was moved to be set earlier when $currentUser is known
            // }
        }
    }

    onMount(() => {
        if ($currentUser && $currentUser.$id) {
            isLoadingPage = false; // User identified, initial page structure can show
            if (!dataLoaded) { 
                // console.log("Dashboard onMount: User found, initial data fetch.");
                fetchAllAppointments();
            }
        } else if ($currentUser === null) {
            // console.log("Dashboard onMount: No user (currentUser is null), redirecting to /.");
            goto('/');
        } else {
            // console.log("Dashboard onMount: currentUser is in an intermediate state. Waiting for reactive block.");
            // isLoadingPage remains true by default until $currentUser resolves
        }
    });

    // Reactive statement for when $currentUser changes (primarily for fetching and redirection)
    $: {
        if (typeof window !== 'undefined') { // Ensure this runs only client-side
            if ($currentUser && $currentUser.$id) {
                // console.log("Dashboard reactive: $currentUser became available with ID: ", $currentUser.$id);
                if (isLoadingPage) {
                    // console.log("Dashboard reactive (user resolved): isLoadingPage was true, setting to false.");
                    isLoadingPage = false;
                }
                if (!dataLoaded) {
                    // console.log("Dashboard reactive (user resolved): Data not loaded for this context, fetching.");
                    fetchAllAppointments();
                }
            } else if ($currentUser === null){
                // console.log("Dashboard reactive: currentUser became null (logout or session expiry).");
                if (window.location.pathname === '/dashboard') {
                    // console.log("Dashboard reactive: Still on /dashboard and currentUser is null, redirecting to /.");
                    goto('/');
                }
                isLoadingPage = true; // Reset for next potential load if user navigates back
                dataLoaded = false; // Reset dataLoaded status
            } else {
                // console.log("Dashboard reactive: $currentUser is in an indeterminate state (not null, but no .$id?), or initial undefined from store before layout hydration ", $currentUser);
                // If $currentUser is undefined (initial state before layout sets it to user object or null), isLoadingPage should remain true.
                // if ($currentUser === undefined && isLoadingPage) {
                    // console.log("Dashboard reactive: currentUser is undefined, page is still loading.");
                // }
            }
        }
    }

    // This block specifically resets dataLoaded when user context changes, forcing a refetch.
    let previousUserId = null;
    $: {
        if ($currentUser && $currentUser.$id) {
            if (previousUserId !== $currentUser.$id) {
                // console.log(`Dashboard reactive: User changed from ${previousUserId} to ${$currentUser.$id}. Resetting dataLoaded.`);
                dataLoaded = false;
                previousUserId = $currentUser.$id;
                // FetchAllAppointments will be called by the other reactive block if !dataLoaded
            }
        } else if (previousUserId !== null) {
            // User logged out
            // console.log(`Dashboard reactive: User logged out (was ${previousUserId}). Resetting dataLoaded.`);
            dataLoaded = false;
            previousUserId = null;
        }
    }

    // Reset dataLoaded flag if the user logs out (currentUser becomes null)
    // This ensures that if a new user logs in, data will be fetched for them.
    $: if (!$currentUser) {
        // console.log("Dashboard reactive: $currentUser is now falsy. Resetting dataLoaded and lists.");
        dataLoaded = false;
        allMyHostedAppointments = [];
        availableAppointments = [];
        myBookedAppointments = [];
        isMainUser = false; // Reset isMainUser if user logs out
        // isLoadingPage = true; // Reconsider if this should always be true - might cause flicker on logout then redirect
    }

    async function handleAppointmentSubmit(event) {
        if (!isMainUser || !$currentUser || !$currentUser.$id) { // Ensure only main user can submit
            creationStatus = 'Error: Only the main host can create appointments.';
            if (!$currentUser || !$currentUser.$id) creationStatus = 'Error: Current user ID is not available. Please log in again.';
            return;
        }
        creationStatus = 'Creating appointment...';
        try {
            const appointmentDetails = event.detail;
            const newAppointment = await createAppointment(appointmentDetails, $currentUser);
            creationStatus = `Successfully created: ${newAppointment.title || 'Appointment'}`;
            await fetchAllAppointments(); // Refresh lists
        } catch (error) {
            console.error("Dashboard: Error creating appointment:", error); // Keep this error log
            creationStatus = `Error creating appointment: ${error.message}`;
        }
    }

    async function handleBookAppointment(event) {
        const appointmentId = event.detail;
        if ($currentUser && $currentUser.$id && isMainUser){
            alert('Main host account cannot book appointments. Please use a regular user account.');
            return;
        }
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
            console.error("Dashboard: Error booking appointment:", error); // Keep this error log
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
        // Further check if mainUser is deleting one of their own, if needed, though AppointmentList handles button visibility
        creationStatus = `Deleting appointment ${appointmentId}...`;
        try {
            await deleteAppointment(appointmentId);
            creationStatus = `Successfully deleted appointment ${appointmentId}.`;
            await fetchAllAppointments(); // Refresh all lists
        } catch (error) {
            console.error("Dashboard: Error deleting appointment:", error); // Keep this error log
            creationStatus = `Error deleting: ${error.message}`;
            alert(`Error deleting: ${error.message}`);
        }
    }

</script>

<svelte:head>
    <title>Dashboard - JOMA</title>
</svelte:head>

{#if isLoadingPage && !$currentUser && typeof window !== 'undefined' && window.location.pathname === '/dashboard'}
    <!-- More specific condition for initial loading message for dashboard -->
    <p>Loading user information or redirecting...</p>
{:else if $currentUser}
    <h1>Welcome to your Dashboard, {$currentUser.name || $currentUser.email.split('@')[0]}!</h1>
    <p>Your User ID is: {$currentUser.$id} {#if isMainUser}<strong>(Main Host Account)</strong>{/if}</p>
    <hr />

    {#if isMainUser}
        <div>
            <h2>Create New Appointment</h2>
            <AppointmentForm on:submitAppointment={handleAppointmentSubmit} />
            {#if creationStatus && (creationStatus.startsWith('Successfully created') || creationStatus.startsWith('Error creating'))}
                <p class="status-message">{creationStatus}</p>
            {/if}
        </div>
        <hr />
        {#if creationStatus && !(creationStatus.startsWith('Successfully created') || creationStatus.startsWith('Error creating'))}
             <p class="status-message">{creationStatus}</p> <!-- For booking/deleting status if main user somehow triggers -->
        {/if}
        {#if fetchError}<p class="status-message error">{fetchError}</p>{/if}

        {#if isLoadingPage || (!dataLoaded && !fetchError)}
             <p>Loading your appointments...</p>
        {:else if fetchError}
             <!-- error displayed above -->
        {:else}
            <div>
                <h2>My Hosted Appointments Overview</h2>
                <AppointmentList appointments={allMyHostedAppointments} listType='hostedByMe' currentUserId={MAIN_HOST_USER_ID} on:deleteAppointment={handleDeleteAppointment} />
            </div>
        {/if}
    {:else} <!-- Regular User View -->
        {#if creationStatus && !(creationStatus.startsWith('Successfully created') || creationStatus.startsWith('Error creating'))}
             <p class="status-message">{creationStatus}</p> <!-- For booking/deleting status -->
        {/if}
        {#if fetchError}<p class="status-message error">{fetchError}</p>{/if}

        {#if isLoadingPage || (!dataLoaded && !fetchError)}
            <p>Loading appointments...</p>
        {:else if fetchError}
            <!-- error displayed above -->
        {:else}
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
    {/if}
{:else}
    <!-- This state should only be hit if $currentUser is null AND isLoadingPage is false (after layout confirms no session) -->
    <!-- Or if navigating to /dashboard directly without a session -->
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