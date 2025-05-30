<!-- src/lib/components/dashboard/ClientDashboardView.svelte -->
<script>
    export let myBookedAppointments;
    export let availableAppointments;
    export let dataLoaded;
    export let fetchError;
    // Potentially other props like currentUser
    // Event dispatchers for actions like bookAppointment, deleteAppointment (for their own bookings)

    import AppointmentsCard from './AppointmentsCard.svelte';
    import BookingManagementCard from './BookingManagementCard.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function forwardEvent(event) {
        dispatch(event.type, event.detail);
    }
</script>

{#if fetchError}
    <p class="text-red-500 bg-red-100 p-3 rounded-md">{fetchError}</p>
{/if}

{#if !dataLoaded && !fetchError}
    <p class="text-xl text-white bg-black/30 p-3 rounded-md">Loading dashboard data...</p>
{:else if dataLoaded}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
         <!-- Client might not have StatsHistoryCard or it's a different version -->
        <AppointmentsCard
            isMainUser={false}
            bind:dataLoaded
            bind:fetchError
            appointments={myBookedAppointments}
            listType="bookedByMe"
            on:deleteAppointment={forwardEvent}
        />
        <BookingManagementCard
            isMainUser={false}
            bind:dataLoaded
            bind:fetchError
            bind:availableAppointments
            showCreateFormState={false}
            on:bookAppointment={forwardEvent}
        />
    </div>
{:else if !fetchError}
    <p class="text-white">No data loaded and no error.</p>
{/if} 