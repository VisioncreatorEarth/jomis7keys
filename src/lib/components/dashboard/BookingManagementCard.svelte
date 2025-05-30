<script>
    export let isMainUser;
    export let dataLoaded;
    export let fetchError;
    export let availableAppointments;
    export let currentUserId;
    export let showCreateFormState; // Use a more specific name for the prop

    import AppointmentForm from '$lib/components/AppointmentForm.svelte';
    import AppointmentList from '$lib/components/AppointmentList.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function handleAppointmentSubmit(event) {
        dispatch('submitAppointment', event.detail);
    }

    function handleBookAppointment(event) {
        dispatch('bookAppointment', event.detail);
    }

    function toggleCreateForm() {
        dispatch('toggleCreateForm');
    }

</script>

<div class="bg-white rounded-xl shadow-lg p-6">
     <h2 class="text-xl font-semibold text-stone-800 mb-4">
        {#if isMainUser}
            Manage Availability & Create
        {:else}
            Book an Appointment
        {/if}
    </h2>
    {#if isMainUser}
        <button on:click={toggleCreateForm} class="mb-4 w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
            {showCreateFormState ? 'Cancel Creation' : 'Create New Appointment'}
        </button>
        {#if showCreateFormState}
            <div class="mt-4">
                <AppointmentForm on:submitAppointment={handleAppointmentSubmit} />
            </div>
        {/if}
        {#if !showCreateFormState}
        <p class="text-stone-600 text-sm mt-2">Click above to open the appointment creation form. Further availability tools can be added here.</p>
        {/if}
    {:else}
        {#if !dataLoaded && !fetchError}
             <p class="text-stone-600 animate-pulse">Loading available appointments...</p>
        {:else if fetchError && availableAppointments.length === 0}
            <p class="text-sm text-red-600 mt-2">Error: {fetchError}</p>
        {:else if availableAppointments.length > 0}
            <AppointmentList 
                appointments={availableAppointments} 
                listType="available" 
                currentUserId={currentUserId} 
                on:bookAppointment={handleBookAppointment} 
            />
        {:else}
            <p class="text-stone-600">No appointments currently available to book.</p>
        {/if}
    {/if}
</div> 