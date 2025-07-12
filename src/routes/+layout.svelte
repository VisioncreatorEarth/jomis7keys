<script>
    import '../app.css';
    import { onMount } from 'svelte';
    import { currentUser } from '$lib/stores/userStore';
    import { appwriteService } from '$lib/services/appwriteService';
    import Navbar from '$lib/components/Navbar.svelte';

    // Check for existing user session on app load
    onMount(async () => {
        try {
            const user = await appwriteService.getCurrentUser();
            currentUser.set(user);
        } catch (error) {
            console.log('No active session');
        }
    });

    async function handleLogout() {
        try {
            await appwriteService.logoutUser();
            currentUser.set(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }
</script>

<div class="min-h-screen bg-white">
    <Navbar />

    <!-- Main content - no padding, navbar is transparent over content -->
    <main>
        <slot />
        
        <!-- Auth Status Debug (temporary) -->
        {#if $currentUser}
            <div class="fixed bottom-4 right-4 bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm z-50">
                ✅ Logged in: {$currentUser.name || $currentUser.email}
                <button 
                    on:click={handleLogout}
                    class="ml-2 text-xs text-green-600 hover:text-green-800 underline"
                >
                    Abmelden
                </button>
            </div>
        {/if}
    </main>
</div> 