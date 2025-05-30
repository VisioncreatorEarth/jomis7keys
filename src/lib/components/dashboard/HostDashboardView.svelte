<!-- src/lib/components/dashboard/HostDashboardView.svelte -->
<script>
    export let allMyHostedAppointments;
    export let dataLoaded;
    export let fetchError;
    // Potentially other props like currentUser, showCreateFormState, etc.
    // Event dispatchers for actions like toggleCreateForm, submitAppointment, deleteAppointment

    import StatsHistoryCard from './StatsHistoryCard.svelte';
    import AppointmentsCard from './AppointmentsCard.svelte';
    import BookingManagementCard from './BookingManagementCard.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function forwardEvent(event) {
        dispatch(event.type, event.detail);
    }
</script>

<p>Host Dashboard Minimal Test</p>

{#if fetchError}
    <p class="text-red-500 bg-red-100 p-3 rounded-md">{fetchError}</p>
{/if}

{#if !dataLoaded && !fetchError}
    <p class="text-xl text-white bg-black/30 p-3 rounded-md">Loading dashboard data...</p>
{:else if dataLoaded}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="md:col-span-2">
            <StatsHistoryCard
                isMainUser={true}
                bind:dataLoaded
                bind:fetchError
                bind:allMyHostedAppointments
            />
        </div>
        <AppointmentsCard
            isMainUser={true}
            bind:dataLoaded
            bind:fetchError
            appointments={allMyHostedAppointments}
            listType="hostedByMe"
            on:deleteAppointment={forwardEvent}
        />
        <BookingManagementCard
            isMainUser={true}
            bind:dataLoaded
            bind:fetchError
            availableAppointments={[]}
            showCreateFormState={$$props.showCreateFormState}
            on:toggleCreateForm={forwardEvent}
            on:submitAppointment={forwardEvent}
        />
    </div>
{:else if !fetchError}
    <p class="text-white">No data loaded and no error.</p>
{/if} 