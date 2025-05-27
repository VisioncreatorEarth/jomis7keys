<script>
    import { account, ID } from '$lib/appwrite';
    import { currentUser } from '$lib/stores/userStore';
    import { goto } from '$app/navigation';
    import backgroundImage from '$lib/images/background.png'; // Import the background image

    async function login(email, password) {
        try {
            // console.log("Attempting login...");
            await account.createEmailPasswordSession(email, password);
            // console.log("Session created. Getting user...");
            const user = await account.get();
            // console.log("User fetched:", user);
            currentUser.set(user);
            // console.log("currentUser store set. User ID: ", user.$id);
            // alert(`Login successful for ${user.email}. Will attempt to navigate to dashboard.`); // REMOVING DEBUG ALERT
            // console.log("Navigating to /dashboard...");
            goto('/dashboard');
            // console.log("goto('/dashboard') called."); 
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed: " + error.message); // Keep this error alert for actual failures
        }
    }

    async function register(email, password) {
        try {
            // console.log("Attempting registration...");
            await account.create(ID.unique(), email, password);
            // console.log("User account created. Creating session...");
            await account.createEmailPasswordSession(email, password);
            // console.log("Session created after registration. Getting user...");
            const user = await account.get();
            // console.log("User fetched post-registration:", user);
            currentUser.set(user);
            // console.log("currentUser store set post-registration. User ID: ", user.$id);
            // alert(`Registration successful for ${user.email}. Will attempt to navigate to dashboard.`); // REMOVING DEBUG ALERT
            // console.log("Navigating to /dashboard post-registration...");
            goto('/dashboard');
            // console.log("goto('/dashboard') called post-registration.");
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed: " + error.message); // Keep this error alert for actual failures
        }
    }

    function submit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const type = e.submitter.dataset.type;
        
        if (type === "login") {
            login(formData.get('email'), formData.get('password'));
        } else if (type === "register") {
            register(formData.get('email'), formData.get('password'));
        }
    }
</script>

<svelte:head>
	<title>Network 3.0 - Coming Soon</title>
</svelte:head>

<div class="relative min-h-screen w-full">
    <!-- Background Image -->
    <div 
        class="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed z-0"
        style="background-image: url({backgroundImage});"
        data-testid="background-image-div"
    ></div>
    
    <!-- Overlay -->
    <div class="absolute inset-0 w-full h-full bg-black opacity-60 z-10"></div>

    <!-- Content (centered and on top) -->
    <div class="relative z-20 min-h-screen w-full flex flex-col items-center justify-center p-4 space-y-10">
        
        <div class="text-center">
            <h1 class="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 text-white drop-shadow-lg">Network 3.0</h1>
            <p class="text-2xl sm:text-3xl md:text-4xl text-white drop-shadow-md">Coming soon...</p>
        </div>

        <!-- Auth Section - Reusing existing form structure with Tailwind styling -->
        <section id="cta-auth" class="w-full max-w-md">
            {#if !$currentUser}    
                <div class="bg-white bg-opacity-90 p-6 sm:p-8 rounded-lg shadow-xl">
                    <h2 class="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-900">Login or Register</h2>
                    <form on:submit={submit} class="space-y-5 sm:space-y-6">
                        <div>
                            <label for="email-cs" class="block text-sm font-medium text-gray-700 sr-only">Email</label>
                            <input id="email-cs" type="email" placeholder="Email" name="email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900" />
                        </div>
                        <div>
                            <label for="password-cs" class="block text-sm font-medium text-gray-700 sr-only">Password</label>
                            <input id="password-cs" type="password" placeholder="Password" name="password" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900" />
                        </div>
                        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button type="submit" data-type="login" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
                            <button type="submit" data-type="register" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">Register</button>
                        </div>
                    </form>
                </div>
            {:else}
                <div class="text-center bg-black bg-opacity-75 p-6 sm:p-8 rounded-lg drop-shadow-lg">
                    <p class="text-lg sm:text-xl mb-4 text-white">Willkommen zurück, {$currentUser.name || $currentUser.email}!</p>
                    <p class="mb-4 text-base sm:text-lg text-white">Network 3.0 is launching soon. We'll keep you updated!</p>
                    <a href="/dashboard" class="bg-indigo-600 text-white font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-lg hover:bg-indigo-700 transition duration-300 text-sm sm:text-base">Gehe zum Dashboard</a>
                </div>
            {/if}
        </section>
    </div>
</div>

<!-- Removed the entire <style> block that was previously here --> 