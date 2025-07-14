<script>
	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<!-- Main Navbar -->
<nav class="fixed top-0 right-0 left-0 z-50 bg-transparent">
	<div class="mx-auto max-w-7xl px-6 py-4">
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<div class="flex items-center">
				<a href="/" class="flex flex-col items-start">
					<div class="logo-gradient mb-2 flex h-16 w-16 items-center justify-center rounded-full">
						<span class="text-2xl font-bold text-white drop-shadow-lg">Q</span>
					</div>
					<div class="logo-text text-sm font-bold tracking-wider text-white">QUANTENSPRUNG</div>
				</a>
			</div>

			<!-- Right Side: Hamburger Menu + Login -->
			<div class="flex items-center space-x-6">
				<!-- Login Button -->
				<button
					class="login-btn rounded-full border border-white/40 bg-black/30 px-6 py-3 font-medium text-white backdrop-blur-md transition-all hover:bg-black/40"
				>
					Login
				</button>

				<!-- Hamburger Menu -->
				<button
					on:click={toggleMenu}
					class="hamburger-menu flex h-8 w-8 flex-col items-center justify-center space-y-1 focus:outline-none"
					class:active={isMenuOpen}
					aria-label="Navigation menü öffnen"
				>
					<div
						class="hamburger-line h-0.5 w-6 bg-white drop-shadow-lg transition-all duration-300"
					></div>
					<div
						class="hamburger-line h-0.5 w-6 bg-white drop-shadow-lg transition-all duration-300"
					></div>
					<div
						class="hamburger-line h-0.5 w-6 bg-white drop-shadow-lg transition-all duration-300"
					></div>
				</button>
			</div>
		</div>
	</div>

	<!-- Fullscreen Navigation Menu -->
	{#if isMenuOpen}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg">
			<div class="space-y-8 text-center">
				<a href="/" class="fullscreen-nav-link">Home</a>
				<a href="/ueber-uns" class="fullscreen-nav-link">Über Uns</a>
				<a href="/retreats" class="fullscreen-nav-link">Retreats</a>
				<a href="/kontakt" class="fullscreen-nav-link">Kontakt</a>
			</div>

			<!-- Close Button -->
			<button
				on:click={toggleMenu}
				class="absolute top-8 right-8 text-white transition-colors hover:text-gray-300"
				aria-label="Navigation menü schließen"
			>
				<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	{/if}
</nav>

<style>
	.logo-gradient {
		background: linear-gradient(135deg, #c2a36e, #e6e6fa);
		box-shadow: 0 4px 15px rgba(194, 163, 110, 0.4);
	}

	.logo-text {
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
		font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-weight: 500;
	}

	.login-btn {
		backdrop-filter: blur(10px);
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
		font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-weight: 500;
	}

	.login-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(194, 163, 110, 0.3);
		background: rgba(194, 163, 110, 0.4) !important;
	}

	.hamburger-menu:hover .hamburger-line {
		background: #c2a36e;
	}

	.hamburger-menu.active .hamburger-line:nth-child(1) {
		transform: rotate(45deg) translate(5px, 5px);
	}

	.hamburger-menu.active .hamburger-line:nth-child(2) {
		opacity: 0;
	}

	.hamburger-menu.active .hamburger-line:nth-child(3) {
		transform: rotate(-45deg) translate(7px, -6px);
	}

	.fullscreen-nav-link {
		display: block;
		color: white;
		font-weight: 300;
		font-size: 3rem;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: all 0.3s ease;
		position: relative;
		font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.fullscreen-nav-link::after {
		content: '';
		position: absolute;
		bottom: -10px;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 2px;
		background: linear-gradient(135deg, #c2a36e, #e6e6fa);
		transition: width 0.3s ease;
	}

	.fullscreen-nav-link:hover {
		color: #c2a36e;
		transform: translateY(-5px);
		text-shadow: 0 10px 30px rgba(194, 163, 110, 0.3);
	}

	.fullscreen-nav-link:hover::after {
		width: 100%;
	}

	/* Animation for menu open/close */
	.hamburger-line {
		transform-origin: center;
	}
</style>
