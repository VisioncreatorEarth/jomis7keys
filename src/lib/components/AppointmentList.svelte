<script>
    export let appointments = [];
    export let listType = 'all'; // 'all', 'available', 'bookedByMe', 'hostedByMe'
    export let currentUserId = null; // Needed for some conditional rendering/actions

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function formatDate(dateTimeString) {
        if (!dateTimeString) return 'N/A';
        try {
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            return new Date(dateTimeString).toLocaleDateString(undefined, options);
        } catch (e) {
            return 'Invalid Date';
        }
    }

    function handleBook(appointmentId) {
        dispatch('bookAppointment', appointmentId);
    }

    function handleDelete(appointmentId) {
        dispatch('deleteAppointment', appointmentId);
    }
</script>

<div class="mt-1">
    {#if appointments.length === 0}
        <p class="text-stone-500 text-sm italic">No appointments to display in this list.</p>
    {:else}
        <ul class="space-y-4">
            {#each appointments as appt (appt.$id)}
                <li class="bg-stone-50 border border-stone-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150">
                    <strong class="text-lg text-stone-700 font-semibold block mb-1">{appt.title || 'Appointment'}</strong>
                    <p class="text-stone-600 text-sm my-1">Host: {appt.hostUserName || 'N/A'}</p>
                    <p class="text-stone-600 text-sm my-1">When: {formatDate(appt.appointmentDateTime)}</p>
                    <p class="text-stone-600 text-sm my-1">Duration: {appt.durationMinutes} minutes</p>
                    {#if appt.description}
                        <p class="text-stone-600 text-sm my-1 italic">Description: {appt.description}</p>
                    {/if}
                    
                    {#if listType === 'available' && !appt.isBooked}
                        <button 
                            on:click={() => handleBook(appt.$id)} 
                            class="px-3 py-1.5 mt-3 text-xs font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors duration-150 ease-in-out bg-sky-600 hover:bg-sky-700 focus:ring-sky-500 focus:ring-offset-stone-50">
                            Book This Appointment
                        </button>
                    {/if}

                    {#if listType === 'hostedByMe'}
                        {#if appt.isBooked}
                            <p class="text-green-600 italic text-sm my-1">Booked by: {appt.bookedByUserName || 'Unknown User'} on {formatDate(appt.bookedAt)}</p>
                        {:else}
                            <p class="text-sky-600 italic text-sm my-1">This appointment is currently available.</p>
                            {#if appt.hostUserId === currentUserId}
                                <button 
                                    on:click={() => handleDelete(appt.$id)} 
                                    class="px-3 py-1.5 mt-3 text-xs font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors duration-150 ease-in-out bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-stone-50">
                                    Delete My Appointment
                                </button>
                            {/if}
                        {/if}
                    {/if}

                    {#if listType === 'bookedByMe' && appt.bookedByUserId === currentUserId}
                        <p class="text-emerald-700 font-medium text-sm my-1">You have booked this appointment.</p>
                        <p class="text-stone-500 text-xs my-1">Booked on: {formatDate(appt.bookedAt)}</p>
                    {/if}

                    {#if listType !== 'hostedByMe' && listType !== 'bookedByMe' && appt.isBooked }
                        <p class="text-orange-600 italic text-sm my-1">This appointment is booked.</p>
                        {#if appt.bookedByUserName}
                            <p class="text-stone-500 text-xs my-1">Booked by: {appt.bookedByUserName}</p>
                        {/if}
                    {/if}
                </li>
            {/each}
        </ul>
    {/if}
</div> 