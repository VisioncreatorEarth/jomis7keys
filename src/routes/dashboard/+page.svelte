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
    
    let showCreateForm = false; // For toggling appointment creation form

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

    async function fetchAllAppointments() {
        if (!$currentUser || !$currentUser.$id) {
            dataLoaded = false; 
            return;
        }
        fetchError = '';
        
        try {
            if (isMainUser) {
                allMyHostedAppointments = await getAppointmentsHostedBy(MAIN_HOST_USER_ID);
                availableAppointments = [];
                myBookedAppointments = []; 
            } else {
                const [available, booked] = await Promise.all([
                    getAvailableAppointments(), 
                    getAppointmentsBookedBy($currentUser.$id)
                ]);
                availableAppointments = available;
                myBookedAppointments = booked;
                allMyHostedAppointments = []; 
            }
            dataLoaded = true; 
        } catch (err) {
            console.error("Dashboard: Error fetching role-specific appointments:", err); 
            fetchError = "Failed to load appointments: " + err.message;
            dataLoaded = false; 
        }
    }

    onMount(() => {
        if ($currentUser && $currentUser.$id) {
            isLoadingPage = false; 
            if (!dataLoaded) { 
                fetchAllAppointments();
            }
        } else if ($currentUser === null) {
            goto('/');
        } 
    });

    // Reactive statement for when $currentUser changes
    $: {
        if (typeof window !== 'undefined') { 
            if ($currentUser && $currentUser.$id) {
                if (isLoadingPage) {
                    isLoadingPage = false;
                }
                if (!dataLoaded) {
                    fetchAllAppointments();
                }
            } else if ($currentUser === null){
                if (window.location.pathname === '/dashboard') {
                    goto('/');
                }
                isLoadingPage = true; 
                dataLoaded = false; 
            }
        }
    }

    let previousUserId = null;
    $: {
        if ($currentUser && $currentUser.$id) {
            if (previousUserId !== $currentUser.$id) {
                dataLoaded = false;
                previousUserId = $currentUser.$id;
            }
        } else if (previousUserId !== null) {
            dataLoaded = false;
            previousUserId = null;
        }
    }

    $: if (!$currentUser) {
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
            await fetchAllAppointments(); 
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
            await fetchAllAppointments(); 
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
            await fetchAllAppointments(); 
        } catch (error) {
            console.error("Dashboard: Error deleting appointment:", error); 
            creationStatus = `Error deleting: ${error.message}`;
            alert(`Error deleting: ${error.message}`);
        }
    }

</script>

<svelte:head>
    <title>Dashboard - Network 3.0</title>
</svelte:head>

<div class="min-h-screen bg-stone-100 text-stone-800 p-4 sm:p-6 lg:p-8">
    {#if isLoadingPage && !$currentUser}
        <div class="flex justify-center items-center min-h-[calc(100vh-4rem)]">
            <p class="text-xl text-stone-600">Loading user information...</p>
        </div>
    {:else if $currentUser}
        <header class="mb-6 sm:mb-8">
            <h1 class="text-3xl sm:text-4xl font-bold text-stone-900">
                Welcome, {$currentUser.name || $currentUser.email.split('@')[0]}!
            </h1>
            {#if isMainUser}
                <p class="text-sm text-emerald-700 font-semibold">Host Dashboard</p>
            {:else}
                <p class="text-sm text-sky-700 font-semibold">Client Dashboard</p>
            {/if}
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-xl font-semibold text-stone-800 mb-4">
                    {#if isMainUser}
                        Your Hosted Appointments
                    {:else}
                        My Upcoming Appointments
                    {/if}
                </h2>
                {#if isMainUser}
                    {#if !dataLoaded && !fetchError && isLoadingPage}
                        <p class="text-stone-600">Loading your hosted appointments...</p>
                    {:else if allMyHostedAppointments.length > 0}
                        <AppointmentList 
                            appointments={allMyHostedAppointments} 
                            listType="hostedByMe" 
                            currentUserId={$currentUser.$id} 
                            on:deleteAppointment={handleDeleteAppointment} 
                        />
                    {:else}
                        <p class="text-stone-600">You have not created any appointments yet.</p>
                    {/if}
                {:else}
                    {#if !dataLoaded && !fetchError && isLoadingPage}
                        <p class="text-stone-600">Loading your booked appointments...</p>
                    {:else if myBookedAppointments.length > 0}
                         <AppointmentList 
                            appointments={myBookedAppointments} 
                            listType="bookedByMe" 
                            currentUserId={$currentUser.$id} 
                        />
                    {:else}
                        <p class="text-stone-600">You have no upcoming appointments.</p>
                    {/if}
                {/if}
                {#if fetchError && (isMainUser ? allMyHostedAppointments.length === 0 : myBookedAppointments.length === 0)}
                    <p class="text-sm text-red-600 mt-2">Error: {fetchError}</p>
                {/if}
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
                 <h2 class="text-xl font-semibold text-stone-800 mb-4">
                    {#if isMainUser}
                        Manage Availability & Create
                    {:else}
                        Book an Appointment
                    {/if}
                </h2>
                {#if isMainUser}
                    <button on:click={() => showCreateForm = !showCreateForm} class="mb-4 w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                        {showCreateForm ? 'Cancel Creation' : 'Create New Appointment'}
                    </button>
                    {#if showCreateForm}
                        <div class="mt-4">
                            <AppointmentForm on:submitAppointment={handleAppointmentSubmit} />
                        </div>
                    {/if}
                    <!-- Placeholder for other availability management tools -->
                    {#if !showCreateForm}
                    <p class="text-stone-600 text-sm mt-2">Click above to open the appointment creation form. Further availability tools can be added here.</p>
                    {/if}
                {:else}
                    {#if !dataLoaded && !fetchError && isLoadingPage}
                         <p class="text-stone-600">Loading available appointments...</p>
                    {:else if availableAppointments.length > 0}
                        <AppointmentList 
                            appointments={availableAppointments} 
                            listType="available" 
                            currentUserId={$currentUser.$id} 
                            on:bookAppointment={handleBookAppointment} 
                        />
                    {:else}
                        <p class="text-stone-600">No appointments currently available to book.</p>
                    {/if}
                    {#if fetchError && availableAppointments.length === 0}
                         <p class="text-sm text-red-600 mt-2">Error: {fetchError}</p>
                    {/if}
                {/if}
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-xl font-semibold text-stone-800 mb-4">
                    {#if isMainUser}
                        Quick Stats
                    {:else}
                        My Appointment History
                    {/if}
                </h2>
                {#if isMainUser}
                    {#if !dataLoaded && !fetchError && isLoadingPage}
                        <p class="text-stone-500 text-sm animate-pulse">Loading stats...</p>
                    {:else}
                        <div class="space-y-3">
                            <div>
                                <span class="font-medium text-stone-700">Total Hosted Appointments:</span> 
                                <span class="block text-3xl font-bold text-emerald-700">{allMyHostedAppointments.length}</span>
                            </div>
                            <div>
                                <span class="font-medium text-stone-700">Currently Booked Slots:</span> 
                                <span class="block text-3xl font-bold text-amber-600">{allMyHostedAppointments.filter(appt => appt.isBooked).length}</span>
                            </div>
                        </div>
                    {/if}
                {:else}
                    <p class="text-stone-600">View your past appointments and details.</p>
                    <!-- Placeholder for client's past appointments list. This will require logic to filter myBookedAppointments or a new fetch. -->
                    <p class="text-sm text-stone-500 italic mt-2">Feature coming soon.</p>
                {/if}
            </div>
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
        <!-- Handled by redirect or initial load state -->
    {:else}
        <div class="flex justify-center items-center min-h-[calc(100vh-4rem)]">
            <p class="text-xl text-stone-600">Loading dashboard...</p>
        </div>
    {/if}
</div> 