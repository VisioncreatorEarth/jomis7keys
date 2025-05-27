<script>
    import { account, ID } from '$lib/appwrite';
    import { currentUser } from '$lib/stores/userStore';
    import { goto } from '$app/navigation';

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
	<title>JOMA Appointments - Welcome</title>
</svelte:head>

<div class="homepage-container">
    <section id="hero">
        <h1>Welcome to JOMA Appointments!</h1>
        <p>Your easy solution for scheduling and managing appointments.</p>
        {#if !$currentUser}
            <p>Please log in or register below to get started.</p>
        {:else}
            <p>Access your <a href="/dashboard">dashboard</a> to manage your appointments.</p>
        {/if}
    </section>

    <section id="features">
        <h2>Features</h2>
        <ul>
            <li>Easy Appointment Scheduling</li>
            <li>Organized Dashboard View</li>
            <li>User-Friendly Interface</li>
            <li>Secure & Reliable</li>
        </ul>
    </section>

    <section id="auth-section">
        <h2>Get Started</h2>
        {#if !$currentUser}    
            <div class="auth-form-container">
                <form on:submit={submit}>
                    <input type="email" placeholder="Email" name="email" required />
                    <input type="password" placeholder="Password" name="password" required />
                    <div class="button-group">
                        <button type="submit" data-type="login">Login</button>
                        <button type="submit" data-type="register">Register</button>
                    </div>
                </form>
            </div>
        {:else}
            <p>You are currently logged in as {$currentUser.name || $currentUser.email}.</p>
        {/if}
    </section>

    <section id="about">
        <h2>About JOMA</h2>
        <p>We aim to simplify appointment booking for everyone. More placeholder text here.</p>
    </section>

    <footer>
        <p>&copy; 2024 JOMA Appointments. All rights reserved.</p>
    </footer>
</div>

<style>
    /* Remove or significantly reduce specificity of :global(body) here */
    /* General body styles should be in app.html or +layout.svelte if needed globally */
	:global(body) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		margin: 0;
		background-color: #f9f9f9; /* Lighter overall background for homepage */
	}

    .homepage-container {
        /* No specific layout for homepage-container itself, sections will flow block */
    }

    section {
        padding: 2rem 1rem;
        text-align: center;
        border-bottom: 1px solid #eee;
    }

    #hero {
        background-color: #e0f2f7;
        color: #333;
    }

    #hero h1 {
        margin-bottom: 0.5rem;
    }

    #features ul {
        list-style: none;
        padding: 0;
    }

    #features li {
        margin-bottom: 0.5rem;
        font-size: 1.1em;
    }
    
    #auth-section {
        background-color: #fff; /* Keep auth form background white */
    }

	.auth-form-container { /* This was previously .container */
		background-color: #fff;
		padding: 2rem;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		text-align: center;
		width: 100%;
		max-width: 400px;
		margin: 1rem auto; /* Centering the form container */
	}

	p {
		color: #555; /* Slightly softer text color for general paragraphs */
		font-size: 1.1em;
		margin-bottom: 1.5rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	input[type="email"],
	input[type="password"] {
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 1em;
	}

	input[type="email"]:focus,
	input[type="password"]:focus {
		border-color: #007bff;
		outline: none;
		box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
	}

	.button-group {
		display: flex;
		gap: 0.5rem;
	}

	button {
		padding: 0.75rem;
		border: none;
		border-radius: 4px;
		font-size: 1em;
		cursor: pointer;
		transition: background-color 0.2s ease;
		flex-grow: 1;
	}

	button[type="submit"] {
		background-color: #007bff;
		color: white;
	}

	button[type="submit"]:hover {
		background-color: #0056b3;
	}

	form .button-group button {
	}

    footer {
        text-align: center;
        padding: 2rem 1rem;
        background-color: #333;
        color: #f0f0f0;
        font-size: 0.9em;
    }
</style> 