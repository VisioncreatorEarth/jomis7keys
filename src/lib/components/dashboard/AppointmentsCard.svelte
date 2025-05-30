<script>
    export let isMainUser;
    export let dataLoaded;
    export let fetchError;
    export let appointments; // Will be allMyHostedAppointments or myBookedAppointments
    export let listType; // "hostedByMe" or "bookedByMe"
    export let currentUserId;

    import AppointmentList from '$lib/components/AppointmentList.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function handleDelete(event) {
        dispatch('deleteAppointment', event.detail);
    }
</script>

<div class="bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-xl font-semibold text-stone-800 mb-4">
        {#if isMainUser}
            Your Hosted Appointments
        {:else}
            My Upcoming Appointments
        {/if}
    </h2>
    {#if isMainUser}
        {#if !dataLoaded && !fetchError}
            <p class="text-stone-600 animate-pulse">Loading your hosted appointments...</p>
        {:else if fetchError && appointments.length === 0}
            <p class="text-sm text-red-600 mt-2">Error: {fetchError}</p>
        {:else if appointments.length > 0}
            <AppointmentList 
                appointments={appointments} 
                listType={listType}
                currentUserId={currentUserId} 
                on:deleteAppointment={handleDelete} 
            />
        {:else}
            <p class="text-stone-600">You have not created any appointments yet.</p>
        {/if}
    {:else}
        {#if !dataLoaded && !fetchError}
            <p class="text-stone-600 animate-pulse">Loading your booked appointments...</p>
        {:else if fetchError && appointments.length === 0}
            <p class="text-sm text-red-600 mt-2">Error: {fetchError}</p>
        {:else if appointments.length > 0}
             <AppointmentList 
                appointments={appointments} 
                listType={listType}
                currentUserId={currentUserId} 
            />
        {:else}
            <p class="text-stone-600">You have no upcoming appointments.</p>
        {/if}
    {/if}
    {#if fetchError && appointments.length === 0}
        <p class="text-sm text-red-600 mt-2">Error: {fetchError}</p>
    {/if}
</div> 