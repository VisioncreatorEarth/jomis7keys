<script>
    import { createEventDispatcher } from 'svelte';

    export let title = '';
    export let description = '';
    export let appointmentDateTime = ''; // Expected format: YYYY-MM-DDTHH:mm
    export let durationMinutes = 30;
    export let isEditing = false; // To change button text, etc.

    const dispatch = createEventDispatcher();

    function handleSubmit() {
        // Basic validation (can be enhanced)
        if (!appointmentDateTime || !durationMinutes) {
            alert('Please provide a valid date/time and duration.');
            return;
        }
        dispatch('submitAppointment', {
            title,
            description,
            appointmentDateTime,
            durationMinutes: parseInt(durationMinutes, 10)
        });
    }
</script>

<form on:submit|preventDefault={handleSubmit} class="flex flex-col space-y-4 bg-stone-50 p-4 rounded-lg border border-stone-200 shadow-sm">
    <div>
        <label for="title-apt-form" class="block mb-1 font-semibold text-sm text-stone-700">Title (Optional):</label>
        <input type="text" id="title-apt-form" bind:value={title} maxlength="255" class="block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-stone-900 placeholder-stone-400 bg-white" />
    </div>
    <div>
        <label for="description-apt-form" class="block mb-1 font-semibold text-sm text-stone-700">Description (Optional):</label>
        <textarea id="description-apt-form" bind:value={description} maxlength="10000" class="block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-stone-900 placeholder-stone-400 bg-white min-h-[80px] resize-y"></textarea>
    </div>
    <div>
        <label for="appointmentDateTime-apt-form" class="block mb-1 font-semibold text-sm text-stone-700">Date and Time:</label>
        <input type="datetime-local" id="appointmentDateTime-apt-form" bind:value={appointmentDateTime} required class="block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-stone-900 placeholder-stone-400 bg-white" />
    </div>
    <div>
        <label for="durationMinutes-apt-form" class="block mb-1 font-semibold text-sm text-stone-700">Duration (minutes):</label>
        <input type="number" id="durationMinutes-apt-form" bind:value={durationMinutes} min="15" step="15" required class="block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-stone-900 placeholder-stone-400 bg-white" />
    </div>
    <button type="submit" class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-stone-100">
        {isEditing ? 'Update' : 'Create'} Appointment
    </button>
</form> 