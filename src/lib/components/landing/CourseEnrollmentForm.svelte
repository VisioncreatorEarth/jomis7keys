<script>
    import { appwriteService } from '$lib/services/appwriteService.js';
    import { currentUser } from '$lib/stores/userStore.js';
    import { tick } from 'svelte';

    export let courseTitle = "Selected Course"; // Could be dynamic if there are multiple courses

    let email = '';
    let password = '';
    let name = ''; // Added name field
    let isLogin = true; // To toggle between login and register

    let message = '';
    let messageType = ''; // 'success' or 'error'

    async function handleSubmit() {
        message = '';
        messageType = '';
        try {
            let user;
            if (isLogin) {
                user = await appwriteService.loginUser(email, password);
            } else {
                user = await appwriteService.signupUser(email, password, name);
            }
            currentUser.set(user);
            message = isLogin ? 'Login successful!' : 'Registration successful! Welcome!';
            messageType = 'success';
            if (!isLogin && user) {
                try {
                    await appwriteService.enrollUserInCourse(user.$id, courseTitle); 
                    message += ' You have been enrolled in ' + courseTitle;
                } catch (enrollError) {
                    console.error('Enrollment error:', enrollError);
                    message += ' Enrollment failed: ' + enrollError.message;
                    // Keep messageType as success for login/signup, but add enrollment specific error info
                }
            }
        } catch (error) {
            console.error('Authentication error:', error);
            message = error.message || 'An error occurred.';
            messageType = 'error';
        }
    }

    async function toggleForm() {
        isLogin = !isLogin;
        message = '';
        messageType = '';
        email = '';
        password = '';
        name = '';
        await tick(); // Wait for DOM to update before potentially focusing
    }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-5">
    {#if message}
        <div 
            class="p-3 rounded-md text-sm mb-4 font-medium text-center"
            class:bg-highlight-calm={messageType === 'success'}
            class:text-background-card={messageType === 'success'}
            class:bg-red-500={messageType === 'error'}
            class:text-white={messageType === 'error'} 
        >
            {message}
        </div>
    {/if}

    {#if !isLogin}
        <div>
            <label for="name-enroll" class="block text-sm font-medium text-background-main/80 sr-only">Full Name</label>
            <input id="name-enroll" type="text" placeholder="Full Name" bind:value={name} required class="mt-1 block w-full px-4 py-2.5 border border-accent-secondary/50 rounded-md shadow-sm focus:ring-accent-primary focus:border-accent-primary sm:text-sm bg-background-main/20 text-background-card placeholder-background-main/70" />
        </div>
    {/if}

    <div>
        <label for="email-enroll" class="block text-sm font-medium text-background-main/80 sr-only">Email</label>
        <input id="email-enroll" type="email" placeholder="Email Address" bind:value={email} required class="mt-1 block w-full px-4 py-2.5 border border-accent-secondary/50 rounded-md shadow-sm focus:ring-accent-primary focus:border-accent-primary sm:text-sm bg-background-main/20 text-background-card placeholder-background-main/70" />
    </div>

    <div>
        <label for="password-enroll" class="block text-sm font-medium text-background-main/80 sr-only">Password</label>
        <input id="password-enroll" type="password" placeholder="Password" bind:value={password} required class="mt-1 block w-full px-4 py-2.5 border border-accent-secondary/50 rounded-md shadow-sm focus:ring-accent-primary focus:border-accent-primary sm:text-sm bg-background-main/20 text-background-card placeholder-background-main/70" />
    </div>

    <button type="submit" class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-background-card bg-accent-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary/80 focus:ring-offset-primary-text/90 transition-colors">
        {#if isLogin}Login & Access Content{:else}Sign Up & Learn{/if}
    </button>

    <p class="text-center text-sm text-background-main/80">
        {#if isLogin}
            Don't have an account?
            <button type="button" on:click={toggleForm} class="font-medium text-highlight-calm hover:text-opacity-80 underline">
                Sign up here
            </button>
        {:else}
            Already have an account?
            <button type="button" on:click={toggleForm} class="font-medium text-highlight-calm hover:text-opacity-80 underline">
                Login here
            </button>
        {/if}
    </p>
</form>

<style>
    /* Specific styles for the form if needed */
</style> 