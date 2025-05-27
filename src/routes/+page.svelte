<script>
    import { account, ID } from '$lib/appwrite';
    import { currentUser } from '$lib/stores/userStore';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    onMount(() => {
        if ($currentUser) {
            goto('/dashboard');
        }
    });

    currentUser.subscribe(value => {
        if (value) {
            goto('/dashboard');
        }
    });

    async function login(email, password) {
        await account.createEmailPasswordSession(email, password);
        const user = await account.get();
        currentUser.set(user);
    }

    async function register(email, password) {
        await account.create(ID.unique(), email, password);
        await account.createEmailPasswordSession(email, password);
        const user = await account.get();
        currentUser.set(user);
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

    async function logout() {
        await account.deleteSession('current');
        currentUser.set(null);
    }
</script>

<svelte:head>
	<title>JOMA - Welcome</title>
</svelte:head>

{#if !$currentUser}
<div class="container">
	<p>
		Not logged in
	</p>

	<form on:submit={submit}>
		<input type="email" placeholder="Email" name="email" required />
		<input type="password" placeholder="Password" name="password" required />

		<div class="button-group">
			<button type="submit" data-type="login">Login</button>
			<button type="submit" data-type="register">Register</button>
		</div>
	</form>

	<button class="logout-button" on:click={logout}>Logout</button>
</div>
{:else}
    <p>Loading dashboard...</p>
{/if}

<style>
	:global(body) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		margin: 0;
		background-color: #f0f2f5;
	}

	.container {
		background-color: #fff;
		padding: 2rem 3rem;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		text-align: center;
		width: 100%;
		max-width: 400px;
	}

	p {
		color: #333;
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

	.logout-button {
		background-color: #dc3545;
		color: white;
		width: 100%;
		margin-top: 0.5rem;
	}

	.logout-button:hover {
		background-color: #c82333;
	}

	form .button-group button {
	}

</style> 