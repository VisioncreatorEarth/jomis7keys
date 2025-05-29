<script>
    import { account, ID } from '$lib/appwrite';
    import { currentUser } from '$lib/stores/userStore';
    import { goto } from '$app/navigation';
    import backgroundImage from '$lib/images/earth.jpg'; // Updated image import

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
    <!-- Background Image (no overlay) -->
    <div 
        class="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed z-0"
        style="background-image: url({backgroundImage});"
        data-testid="background-image-div"
    ></div>
    
    <!-- Removed Overlay Div -->

    <!-- Content (centered and on top) -->
    <div class="relative z-20 min-h-screen w-full flex flex-col items-center justify-center p-4 space-y-10">
        
        <div class="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold mb-4 text-white drop-shadow-lg">Network 3.0</h1>
            <p class="text-3xl sm:text-4xl md:text-5xl text-white drop-shadow-md">Coming soon...</p>
        </div>

        <section id="cta-auth" class="w-full max-w-md">
            {#if !$currentUser}    
                <div class="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-lg shadow-xl border border-white/20">
                    <h2 class="text-xl sm:text-2xl font-bold mb-6 text-center text-white">Login or Register</h2>
                    <form on:submit={submit} class="space-y-5 sm:space-y-6">
                        <div>
                            <label for="email-cs" class="block text-sm font-medium text-gray-200 sr-only">Email</label>
                            <input id="email-cs" type="email" placeholder="Email" name="email" required class="mt-1 block w-full px-3 py-2 border border-white/30 rounded-md shadow-sm focus:ring-indigo-400 focus:border-indigo-400 sm:text-sm bg-white/20 text-white placeholder-gray-300" />
                        </div>
                        <div>
                            <label for="password-cs" class="block text-sm font-medium text-gray-200 sr-only">Password</label>
                            <input id="password-cs" type="password" placeholder="Password" name="password" required class="mt-1 block w-full px-3 py-2 border border-white/30 rounded-md shadow-sm focus:ring-indigo-400 focus:border-indigo-400 sm:text-sm bg-white/20 text-white placeholder-gray-300" />
                        </div>
                        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button type="submit" data-type="login" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 focus:ring-offset-black/50">Login</button>
                            <button type="submit" data-type="register" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-black/50">Register</button>
                        </div>
                    </form>
                </div>
            {:else}
                <div class="text-center bg-black/60 backdrop-blur-md p-6 sm:p-8 rounded-lg drop-shadow-lg border border-white/20">
                    <p class="text-lg sm:text-xl mb-4 text-white">Willkommen zurück, {$currentUser.name || $currentUser.email}!</p>
                    <p class="mb-4 text-base sm:text-lg text-white">Network 3.0 is launching soon. We'll keep you updated!</p>
                    <a href="/dashboard" class="bg-emerald-700 text-white font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-lg hover:bg-emerald-800 transition duration-300 text-sm sm:text-base border border-emerald-600/50">Gehe zum Dashboard</a>
                </div>
            {/if}
        </section>
    </div>
</div>

<!-- Removed the entire <style> block that was previously here --> 