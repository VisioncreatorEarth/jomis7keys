<script>
    import { currentUser } from '$lib/stores/userStore';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import backgroundImage from '$lib/images/stone.jpg';
    import {
        createAppointment,
        getAvailableAppointments,
        getAppointmentsHostedBy,
        getAppointmentsBookedBy,
        bookAppointment,
        deleteAppointment
    } from '$lib/appwrite_db.js';

    import HostDashboardView from '$lib/components/dashboard/HostDashboardView.svelte';
    import ClientDashboardView from '$lib/components/dashboard/ClientDashboardView.svelte';

    const MAIN_HOST_USER_ID = '6835776c00327c1049fe';
    let isMainUser = false;

    let allMyHostedAppointments = [];
    let availableAppointments = [];
    let myBookedAppointments = [];
    let fetchError = '';
    let creationStatus = '';
    
    let showCreateForm = false; 
    let dataLoaded = false;
    let isLoadingPage = true;
    let previousUserId = null;

    $: {
        if ($currentUser && $currentUser.$id) {
            isMainUser = $currentUser.$id === MAIN_HOST_USER_ID;
        } else {
            isMainUser = false;
        }
    }

    async function fetchAllAppointments(source = 'unknown') {
        // console.log(`fetchAllAppointments called from: ${source}. Current user:`, $currentUser ? $currentUser.$id : 'No user');
        if (!$currentUser || !$currentUser.$id) {
            dataLoaded = false;
            // console.log('fetchAllAppointments: No current user or user ID, returning.');
            return;
        }
        fetchError = '';
        isLoadingPage = true; // Show loading when fetching
        try {
            if (isMainUser) {
                const hostedAppointmentsResult = await getAppointmentsHostedBy(MAIN_HOST_USER_ID);
                allMyHostedAppointments = hostedAppointmentsResult;
                availableAppointments = []; // Clear data not relevant to host
                myBookedAppointments = [];
            } else {
                const [available, booked] = await Promise.all([
                    getAvailableAppointments(), 
                    getAppointmentsBookedBy($currentUser.$id)
                ]);
                availableAppointments = available;
                myBookedAppointments = booked;
                allMyHostedAppointments = []; // Clear data not relevant to client
            }
            dataLoaded = true;
        } catch (err) {
            // console.error("Dashboard: Error fetching role-specific appointments:", err); 
            fetchError = "Failed to load appointments: " + err.message;
            dataLoaded = false; 
        } finally {
            isLoadingPage = false;
        }
    }
    
    onMount(() => {
        if ($currentUser && $currentUser.$id) {
            isLoadingPage = false; // Initial check, might be true again during fetch
            if (!dataLoaded) {
                fetchAllAppointments('onMount');
            }
        } else if ($currentUser === null) {
            goto('/');
        }
    });

    $: { // Main reactive block for user changes
        if (typeof window !== 'undefined') { 
            if ($currentUser && $currentUser.$id) {
                if (isLoadingPage && !dataLoaded) { // If user resolved while page was initially loading
                    // This condition might need refinement to avoid multiple fetches
                }
                if (previousUserId !== $currentUser.$id) {
                    dataLoaded = false; // Reset for new user
                    previousUserId = $currentUser.$id;
                    isMainUser = $currentUser.$id === MAIN_HOST_USER_ID; // Recalculate role for new user
                    fetchAllAppointments('currentUser changed - new ID');
                } else if (!dataLoaded) { // Same user, but data wasn't loaded (e.g. navigated back)
                    fetchAllAppointments('currentUser resolved - no data');
                }
                // isLoadingPage should be false after fetchAllAppointments completes or if user was already resolved
                // The isLoadingPage = false was previously inside the fetchAllAppointments.
            } else if ($currentUser === null) { // Logout
                if (previousUserId !== null) {
                    dataLoaded = false;
                    previousUserId = null;
                    isMainUser = false;
                    allMyHostedAppointments = [];
                    availableAppointments = [];
                    myBookedAppointments = [];
                }
                if (window.location.pathname.startsWith('/dashboard')) {
                     goto('/');
                }
            }
        }
    }
    
    // Event Handlers (to be connected to HostDashboardView/ClientDashboardView)
    async function handleAppointmentSubmit(event) {
        if (!isMainUser || !$currentUser || !$currentUser.$id) { 
            creationStatus = 'Error: Only the main host can create appointments.';
            return;
        }
        creationStatus = 'Creating appointment...';
        try {
            const eventData = event.detail.formData ? event.detail.formData : event.detail; // Adapt to potential form data object
            const newAppointment = await createAppointment(eventData, $currentUser);
            creationStatus = `Successfully created: ${newAppointment.title || 'Appointment'}`;
            await fetchAllAppointments('after submitAppointment'); 
            showCreateForm = false;
        } catch (error) {
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
            await fetchAllAppointments('after bookAppointment');
        } catch (error) {
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
            await fetchAllAppointments('after deleteAppointment');
        } catch (error) {
            creationStatus = `Error deleting: ${error.message}`;
            alert(`Error deleting: ${error.message}`);
        }
    }

    function toggleShowCreateForm() {
        showCreateForm = !showCreateForm;
    }

</script>

<svelte:head>
    <title>Dashboard - Network 3.0</title>
</svelte:head>

<div class="relative min-h-screen w-full">
    <div class="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed z-0" style="background-image: url({backgroundImage});"></div>

    <div class="relative z-10 min-h-screen text-stone-800 p-4 sm:p-6 lg:p-8">
        {#if isLoadingPage && !$currentUser && typeof window !== 'undefined' && window.location.pathname.startsWith('/dashboard')}
             <div class="flex justify-center items-center min-h-[calc(100vh-4rem)]">
                <p class="text-xl text-white bg-black/30 p-3 rounded-md">Loading user information...</p>
            </div>
        {:else if $currentUser}
            <header class="mb-6 sm:mb-8">
                <h1 class="text-3xl sm:text-4xl font-bold text-white drop-shadow-md">
                    Welcome, {$currentUser.name || ($currentUser.email && $currentUser.email.split('@')[0]) || 'User'}!
                </h1>
                <p class="text-sm font-semibold drop-shadow-sm {isMainUser ? 'text-emerald-300' : 'text-sky-300'}">
                    {isMainUser ? 'Host Dashboard' : 'Client Dashboard'}
                </p>
            </header>

            {#if isLoadingPage && dataLoaded === false } <!--  Show loading message specifically when fetching for a logged-in user -->
                 <div class="flex justify-center items-center min-h-[calc(50vh)]">
                    <p class="text-xl text-white bg-black/30 p-3 rounded-md">Fetching dashboard data...</p>
                </div>
            {:else if isMainUser}
                <HostDashboardView 
                    allMyHostedAppointments={allMyHostedAppointments}
                    dataLoaded={dataLoaded}
                    fetchError={fetchError}
                    showCreateFormState={showCreateForm}
                    on:toggleCreateForm={toggleShowCreateForm}
                    on:submitAppointment={handleAppointmentSubmit}
                    on:deleteAppointment={handleDeleteAppointment}
                />
            {:else}
                <ClientDashboardView 
                    myBookedAppointments={myBookedAppointments}
                    availableAppointments={availableAppointments}
                    dataLoaded={dataLoaded}
                    fetchError={fetchError}
                    on:bookAppointment={handleBookAppointment}
                    on:deleteAppointment={handleDeleteAppointment} 
                />
            {/if}
            
            {#if creationStatus}
                <div class="fixed bottom-6 right-6 p-4 rounded-lg shadow-xl text-sm
                            bg-opacity-90 backdrop-blur-md border
                            {creationStatus.toLowerCase().startsWith('error:') ? 'bg-red-100 border-red-300 text-red-800' : 
                            creationStatus.toLowerCase().startsWith('successfully') ? 'bg-green-100 border-green-300 text-green-800' : 
                            'bg-blue-100 border-blue-300 text-blue-800'}">
                    <p>{creationStatus}</p>
                </div>
            {/if}

        {:else if !$currentUser && (typeof window === 'undefined' || window.location.pathname.startsWith('/dashboard'))}
            <div class="flex justify-center items-center min-h-[calc(100vh-4rem)]">
                <p class="text-xl text-white bg-black/30 p-3 rounded-md">Verifying session...</p>
            </div>
        {:else}
             <div class="flex justify-center items-center min-h-[calc(100vh-4rem)]">
                 <p class="text-xl text-white bg-black/30 p-3 rounded-md">
                    Please <a href="/login" class="underline hover:text-sky-300">log in</a> or <a href="/register" class="underline hover:text-sky-300">register</a> to view the dashboard.
                </p>
            </div>
        {/if}
    </div>
</div> 