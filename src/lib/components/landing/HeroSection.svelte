<script>
	export let backgroundImage = null;
</script>

<section id="hero" class="relative flex h-screen items-center justify-center overflow-hidden">
	<!-- Background Image Container -->
	<div class="absolute inset-0 bg-white">
		{#if backgroundImage}
			<img
				src={backgroundImage}
				alt="Joachim & Michaela Andert - Retreat Leiter"
				class="h-full w-full object-cover"
			/>
			<!-- Selective gradient overlay only where text appears (right side) -->
			<div class="absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-transparent"></div>
		{/if}
	</div>

	<!-- Hero Content -->
	<div class="relative z-10 flex h-full w-full items-center justify-end px-8 pt-32 lg:px-16">
		<div class="mr-8 max-w-3xl lg:mr-16 xl:mr-24">
			<!-- Main Headline with better spacing and stronger contrast -->

			<!-- Subheadline with improved spacing and stronger contrast -->
			<h2
				class="hero-subtitle mb-12 text-right text-2xl leading-relaxed font-semibold md:text-3xl lg:text-4xl xl:text-5xl"
				style="color: #E6E6FA;"
			>
				Löse in 3 Tagen die tiefsitzenden Blockaden,<br />
				die dich seit Jahren zurückhalten.
			</h2>

			<!-- Description Text with better spacing and stronger contrast -->
			<p
				class="hero-description mb-16 text-right text-xl leading-relaxed font-medium md:text-2xl lg:text-3xl"
				style="color: #FFFFFF;"
			>
				Befreie dich von endlosen Gedankenschleifen und emotionalen Reaktionen.<br />
				Erlebe echte Transformation mit bewährten Methoden aus 40 Jahren Erfahrung.
			</p>

			<!-- Call-to-Action with improved spacing and stronger prominence -->
			<div class="mb-20 space-y-6 text-right">
				<div class="space-y-3">
					<button
						class="glassmorphic-button hover:shadow-3xl transform rounded-full border border-white/30 px-16 py-6 text-2xl font-bold text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105"
						on:click={() => {
							document.getElementById('contact')?.scrollIntoView({ 
								behavior: 'smooth',
								block: 'start'
							});
						}}
					>
						Beginne deine Transformation
					</button>

					<p class="text-lg font-semibold" style="color: #C2A36E;">→ Jetzt anmelden</p>
				</div>

				<p class="text-lg font-medium" style="color: #E6E6FA;">
					Intensiv-Retreat im Chiemgau mit Alpenblick
				</p>
			</div>
		</div>

		<!-- Retreat Leaders Credit with better positioning -->
		<div class="absolute bottom-12 left-8 text-left">
			<p class="mb-1 text-sm font-light" style="color: #E6E6FA;">von und mit</p>
			<p class="text-lg font-medium" style="color: #FFFFFF;">Joachim & Michaela Andert</p>
		</div>
	</div>

	<!-- Subtle scroll indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
		<svg
			class="h-6 w-6"
			style="color: #E6E6FA;"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M19 14l-7 7m0 0l-7-7m7 7V3"
			></path>
		</svg>
	</div>
</section>

<style>
	/* Custom animations for enhanced visual appeal */
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.hero-subtitle {
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
		font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.hero-description {
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
		font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.glassmorphic-button {
		background: rgba(194, 163, 110, 0.2);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow:
			0 25px 50px rgba(0, 0, 0, 0.25),
			0 0 20px rgba(194, 163, 110, 0.3);
		text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
		font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.glassmorphic-button:hover {
		background: rgba(194, 163, 110, 0.3);
		box-shadow:
			0 30px 60px rgba(0, 0, 0, 0.3),
			0 0 40px rgba(194, 163, 110, 0.6) !important;
		border: 1px solid rgba(255, 255, 255, 0.4);
	}
</style>
