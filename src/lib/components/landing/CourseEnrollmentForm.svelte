<script>
	import { appwriteService } from '$lib/services/appwriteService.js';
	import { currentUser } from '$lib/stores/userStore.js';
	import { tick } from 'svelte';

	export let courseTitle = 'Selected Course'; // Could be dynamic if there are multiple courses

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
			class="mb-4 rounded-md p-3 text-center text-sm font-medium"
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
			<label for="name-enroll" class="text-background-main/80 sr-only block text-sm font-medium"
				>Full Name</label
			>
			<input
				id="name-enroll"
				type="text"
				placeholder="Full Name"
				bind:value={name}
				required
				class="border-accent-secondary/50 focus:ring-accent-primary focus:border-accent-primary bg-background-main/20 text-background-card placeholder-background-main/70 mt-1 block w-full rounded-md border px-4 py-2.5 shadow-sm sm:text-sm"
			/>
		</div>
	{/if}

	<div>
		<label for="email-enroll" class="text-background-main/80 sr-only block text-sm font-medium"
			>Email</label
		>
		<input
			id="email-enroll"
			type="email"
			placeholder="Email Address"
			bind:value={email}
			required
			class="border-accent-secondary/50 focus:ring-accent-primary focus:border-accent-primary bg-background-main/20 text-background-card placeholder-background-main/70 mt-1 block w-full rounded-md border px-4 py-2.5 shadow-sm sm:text-sm"
		/>
	</div>

	<div>
		<label for="password-enroll" class="text-background-main/80 sr-only block text-sm font-medium"
			>Password</label
		>
		<input
			id="password-enroll"
			type="password"
			placeholder="Password"
			bind:value={password}
			required
			class="border-accent-secondary/50 focus:ring-accent-primary focus:border-accent-primary bg-background-main/20 text-background-card placeholder-background-main/70 mt-1 block w-full rounded-md border px-4 py-2.5 shadow-sm sm:text-sm"
		/>
	</div>

	<button
		type="submit"
		class="text-background-card bg-accent-primary focus:ring-accent-primary/80 focus:ring-offset-primary-text/90 flex w-full justify-center rounded-md border border-transparent px-4 py-2.5 text-sm font-medium shadow-sm transition-colors hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:outline-none"
	>
		{#if isLogin}Login & Access Content{:else}Sign Up & Learn{/if}
	</button>

	<p class="text-background-main/80 text-center text-sm">
		{#if isLogin}
			Don't have an account?
			<button
				type="button"
				on:click={toggleForm}
				class="text-highlight-calm hover:text-opacity-80 font-medium underline"
			>
				Sign up here
			</button>
		{:else}
			Already have an account?
			<button
				type="button"
				on:click={toggleForm}
				class="text-highlight-calm hover:text-opacity-80 font-medium underline"
			>
				Login here
			</button>
		{/if}
	</p>
</form>

<style>
	/* Specific styles for the form if needed */
</style>
