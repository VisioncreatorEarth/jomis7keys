<script>
    import { currentUser } from '$lib/stores/userStore';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import AppointmentsCard from '$lib/components/dashboard/AppointmentsCard.svelte';
    import BookingManagementCard from '$lib/components/dashboard/BookingManagementCard.svelte';
    import StatsHistoryCard from '$lib/components/dashboard/StatsHistoryCard.svelte';
    import backgroundImage from '$lib/images/stone.jpg'; // Import the background image
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
    
    let showCreateForm = false; // This will be toggled by a function now

    let dataLoaded = false; // Flag to track if initial data for the current user has been loaded
    let isLoadingPage = true; // To manage the visibility of the 'Loading user...' message

    // Reactive update for isMainUser
    $: {
        if ($currentUser && $currentUser.$id) {
            isMainUser = $currentUser.$id === MAIN_HOST_USER_ID;
            if (dataLoaded && ($currentUser.$id !== (isMainUser ? MAIN_HOST_USER_ID : $currentUser.$id))) { 
                // dataLoaded = false; // This was commented out, seems okay
            }
        } else {
            isMainUser = false;
        }
    }

    async function fetchAllAppointments(source = 'unknown') {
        console.log(`fetchAllAppointments called from: ${source}. Current user:`, $currentUser ? $currentUser.$id : 'No user');
        if (!$currentUser || !$currentUser.$id) {
            dataLoaded = false;
            console.log('fetchAllAppointments: No current user or user ID, returning.');
            return;
        }
        fetchError = '';
        
        try {
            if (isMainUser) {
                console.log('fetchAllAppointments: Fetching for MAIN USER...');
                const hostedAppointmentsResult = await getAppointmentsHostedBy(MAIN_HOST_USER_ID);
                console.log('fetchAllAppointments: Raw result from getAppointmentsHostedBy:', hostedAppointmentsResult);
                allMyHostedAppointments = hostedAppointmentsResult;
                availableAppointments = [];
                myBookedAppointments = []; 
            } else {
                console.log('fetchAllAppointments: Fetching for REGULAR USER...');
                const [available, booked] = await Promise.all([
                    getAvailableAppointments(), 
                    getAppointmentsBookedBy($currentUser.$id)
                ]);
                console.log('fetchAllAppointments: Raw result for available:', available);
                console.log('fetchAllAppointments: Raw result for booked by user:', booked);
                availableAppointments = available;
                myBookedAppointments = booked;
                allMyHostedAppointments = []; 
            }
            dataLoaded = true;
            console.log('fetchAllAppointments: dataLoaded set to true.');
        } catch (err) {
            console.error("Dashboard: Error fetching role-specific appointments:", err); 
            fetchError = "Failed to load appointments: " + err.message;
            dataLoaded = false; 
        }
    }

    onMount(() => {
        console.log('Dashboard onMount: Component mounted.');
        if ($currentUser && $currentUser.$id) {
            isLoadingPage = false;
            if (!dataLoaded) {
                console.log('Dashboard onMount: User exists, initial data fetch needed.');
                fetchAllAppointments('onMount');
            } else {
                console.log('Dashboard onMount: User exists, but data already loaded (dataLoaded=true).');
            }
        } else if ($currentUser === null) {
            console.log('Dashboard onMount: No user (currentUser is null), redirecting to /.');
            goto('/');
        } else {
            console.log('Dashboard onMount: currentUser is undefined or not yet resolved. isLoadingPage remains true.');
        }
    });

    // Reactive statement for when $currentUser changes or previousUserId indicates a change
    $: {
        if (typeof window !== 'undefined') { 
            console.log('Dashboard reactive [$currentUser]: $currentUser changed. ID:', $currentUser ? $currentUser.$id : 'null/undefined');
            if ($currentUser && $currentUser.$id) {
                if (isLoadingPage) {
                    console.log('Dashboard reactive [$currentUser]: User resolved, setting isLoadingPage to false.');
                    isLoadingPage = false;
                }
                if (previousUserId !== $currentUser.$id) {
                    console.log(`Dashboard reactive [$currentUser]: User changed from ${previousUserId} to ${$currentUser.$id}. Resetting dataLoaded and fetching.`);
                    dataLoaded = false;
                    previousUserId = $currentUser.$id;
                    fetchAllAppointments('currentUser changed - new ID');
                } else if (!dataLoaded) {
                    console.log('Dashboard reactive [$currentUser]: User ID same as previous, but data not loaded. Fetching.');
                    fetchAllAppointments('currentUser resolved - no data');
                }
            } else if ($currentUser === null) {
                console.log('Dashboard reactive [$currentUser]: User became null (logout/session expiry).');
                if (previousUserId !== null) {
                     console.log('Dashboard reactive [$currentUser]: previousUserId was not null, resetting.');
                    dataLoaded = false;
                    previousUserId = null;
                }
                if (window.location.pathname === '/dashboard') {
                    console.log('Dashboard reactive [$currentUser]: On /dashboard and user is null, redirecting to /.');
                    goto('/');
                }
                // isLoadingPage = true; // Do not set isLoadingPage to true on logout, causes issues with redirect
            } else {
                 console.log('Dashboard reactive [$currentUser]: $currentUser is in an indeterminate state.');
            }
        }
    }

    let previousUserId = null;

    $: if (!$currentUser && dataLoaded) { // Only reset if data was previously loaded for a user
        console.log('Dashboard reactive [!$currentUser && dataLoaded]: User logged out, resetting data.');
        dataLoaded = false;
        allMyHostedAppointments = [];
        availableAppointments = [];
        myBookedAppointments = [];
        isMainUser = false;
    }

    async function handleAppointmentSubmit(event) {
        if (!isMainUser || !$currentUser || !$currentUser.$id) { 
            creationStatus = 'Error: Only the main host can create appointments.';
            if (!$currentUser || !$currentUser.$id) creationStatus = 'Error: Current user ID is not available. Please log in again.';
            return;
        }
        creationStatus = 'Creating appointment...';
        try {
            const appointmentDetails = event.detail;
            const newAppointment = await createAppointment(appointmentDetails, $currentUser);
            creationStatus = `Successfully created: ${newAppointment.title || 'Appointment'}`;
            await fetchAllAppointments('after submitAppointment'); 
            showCreateForm = false; // Hide form after successful creation
        } catch (error) {
            console.error("Dashboard: Error creating appointment:", error); 
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
            await fetchAllAppointments('after deleteAppointment'); 
        } catch (error) {
            console.error("Dashboard: Error deleting appointment:", error); 
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
    <!-- Background Image -->
    <div 
        class="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed z-0"
        style="background-image: url({backgroundImage});"
    ></div>

    <!-- Dashboard Content -->
    <div class="relative z-10 min-h-screen text-stone-800 p-4 sm:p-6 lg:p-8">
        {#if isLoadingPage && !$currentUser}
            <div class="flex justify-center items-center min-h-[calc(100vh-4rem)]">
                <p class="text-xl text-white bg-black/30 p-3 rounded-md">Loading user information...</p> <!-- Adjusted text color for visibility -->
            </div>
        {:else if $currentUser}
            <header class="mb-6 sm:mb-8">
                <h1 class="text-3xl sm:text-4xl font-bold text-white drop-shadow-md"> <!-- Adjusted text color -->
                    Welcome, {$currentUser.name || $currentUser.email.split('@')[0]}!
                </h1>
                {#if isMainUser}
                    <p class="text-sm text-emerald-300 font-semibold drop-shadow-sm">Host Dashboard</p> <!-- Adjusted text color -->
                {:else}
                    <p class="text-sm text-sky-300 font-semibold drop-shadow-sm">Client Dashboard</p> <!-- Adjusted text color -->
                {/if}
            </header>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Stats/History Card (Spanning two columns on medium screens and up) -->
                <div class="md:col-span-2">
                    <StatsHistoryCard
                        bind:isMainUser
                        bind:dataLoaded
                        bind:fetchError
                        bind:allMyHostedAppointments
                    />
                </div>

                <!-- Appointments Card -->
                <AppointmentsCard
                    bind:isMainUser
                    bind:dataLoaded
                    bind:fetchError
                    appointments={isMainUser ? allMyHostedAppointments : myBookedAppointments}
                    listType={isMainUser ? "hostedByMe" : "bookedByMe"}
                    currentUserId={$currentUser?.$id}
                    on:deleteAppointment={handleDeleteAppointment}
                />

                <!-- Booking Management Card -->
                <BookingManagementCard
                    bind:isMainUser
                    bind:dataLoaded
                    bind:fetchError
                    bind:availableAppointments
                    currentUserId={$currentUser?.$id}
                    showCreateFormState={showCreateForm} 
                    on:toggleCreateForm={toggleShowCreateForm}
                    on:submitAppointment={handleAppointmentSubmit}
                    on:bookAppointment={handleBookAppointment}
                />
            </div>
            
            {#if creationStatus}
                <div class="fixed bottom-6 right-6 p-4 rounded-lg shadow-xl text-sm
                            bg-opacity-90 backdrop-blur-md border
                            {creationStatus.toLowerCase().startsWith('error:') ? 'bg-red-100 border-red-300 text-red-800' : 
                            creationStatus.toLowerCase().startsWith('successfully') ? 'bg-green-100 border-green-300 text-green-800' : 
                            'bg-blue-100 border-blue-300 text-blue-800'}">
                    <p>{creationStatus}</p>
                </div>
            {/if}

        {:else if !$currentUser && (typeof window === 'undefined' || window.location.pathname !== '/dashboard')}
            <!-- Not on dashboard or SSR without user, this state might be complex or transient -->
        {:else}
            <div class="flex justify-center items-center min-h-[calc(100vh-4rem)]">
                <p class="text-xl text-white bg-black/30 p-3 rounded-md">Loading dashboard state...</p> <!-- Adjusted text color -->
            </div>
        {/if}
    </div>
</div> 