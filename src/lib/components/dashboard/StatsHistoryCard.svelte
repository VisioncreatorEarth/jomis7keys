<script>
    export let isMainUser;
    export let dataLoaded;
    export let fetchError;
    export let allMyHostedAppointments;
</script>

<div class="bg-linen text-prussian-blue rounded-2xl shadow-lg p-8">
    <h2 class="text-xl font-semibold mb-6">
        {#if isMainUser}
            Quick Stats
        {:else}
            My Appointment History
        {/if}
    </h2>
    {#if isMainUser}
        {#if !dataLoaded && !fetchError}
            <p class="text-prussian-blue/70 text-sm animate-pulse">Loading stats...</p>
        {:else if fetchError && allMyHostedAppointments.length === 0}
            <p class="text-sm text-red-600 mt-2">Error: {fetchError}</p>
        {:else}
            <div class="space-y-4">
                <div>
                    <span class="font-medium">Total Hosted Appointments:</span> 
                    <span class="block text-4xl font-bold text-moss-green">{allMyHostedAppointments.length}</span>
                </div>
                <div>
                    <span class="font-medium">Currently Booked Slots:</span> 
                    <span class="block text-4xl font-bold text-persian-orange">{allMyHostedAppointments.filter(appt => appt.isBooked).length}</span>
                </div>
            </div>
        {/if}
    {:else}
        <p>View your past appointments and details.</p>
        <p class="text-sm text-prussian-blue/70 italic mt-2">Feature coming soon.</p>
    {/if}
</div> 