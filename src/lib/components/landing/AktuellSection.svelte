<script>
	import { imageService } from '$lib/services/imageService.js';

	// Get video from Appwrite
	const videoSource = imageService.getImageUrl('hero-video');
</script>

<section class="relative flex h-screen items-center justify-center overflow-hidden">
	<!-- Video Background -->
	<div class="absolute inset-0">
		<video autoplay muted loop playsinline class="h-full w-full object-cover">
			<source src={videoSource} type="video/quicktime" />
			<source src={videoSource} type="video/mp4" />
		</video>
		<!-- Cinematic overlay -->
		<div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
	</div>

	<!-- Glassmorphic Content Overlay -->
	<div class="relative z-10 mx-auto max-w-2xl px-8 text-center">
		<!-- Header -->
		<div class="mb-16">
			<p
				class="glassmorphic-text mb-6 text-lg font-semibold tracking-widest uppercase"
				style="color: #C2A36E;"
			>
				AKTUELL
			</p>
			<h2
				class="cinematic-title mb-8 text-6xl leading-tight font-bold text-white lg:text-7xl xl:text-8xl"
			>
				Die nächsten
				<span
					class="cinematic-gradient block bg-gradient-to-r bg-clip-text text-transparent"
					style="background: linear-gradient(to right, #C2A36E, #E6E6FA); -webkit-background-clip: text; background-clip: text;"
				>
					Termine
				</span>
			</h2>
		</div>

		<!-- Glassmorphic Dates Container -->
		<div
			class="glassmorphic-container rounded-3xl border border-white/20 p-8 shadow-2xl backdrop-blur-xl"
		>
			<div class="space-y-8">
				<!-- Location -->
				<div class="mb-8 text-center">
					<div class="mb-3 flex items-center justify-center space-x-3">
						<svg
							class="h-6 w-6"
							style="color: #C2A36E;"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							></path>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							></path>
						</svg>
						<p class="text-xl font-semibold text-white">Guntersberg mit Alpenblick im Chiemgau</p>
					</div>
					<p class="text-base text-white/80">(4-8 Teilnehmer)</p>
				</div>

				<!-- Dates Grid -->
				<div class="grid gap-6 md:grid-cols-2">
					<div
						class="date-card rounded-2xl border border-white/10 p-6 backdrop-blur-sm"
						style="background: rgba(194, 163, 110, 0.15);"
					>
						<div class="text-center">
							<p class="mb-2 text-base font-medium text-white/80">Retreat 1</p>
							<p class="mb-2 text-3xl font-bold text-white">24. - 27.</p>
							<p class="text-xl font-semibold" style="color: #C2A36E;">Juli 2025</p>
						</div>
					</div>

					<div
						class="date-card rounded-2xl border border-white/10 p-6 backdrop-blur-sm"
						style="background: rgba(194, 163, 110, 0.15);"
					>
						<div class="text-center">
							<p class="mb-2 text-base font-medium text-white/80">Retreat 2</p>
							<p class="mb-2 text-3xl font-bold text-white">14. - 17.</p>
							<p class="text-xl font-semibold" style="color: #C2A36E;">August 2025</p>
						</div>
					</div>
				</div>

				<!-- CTA Button -->
				<div class="pt-6">
					<button
						class="cta-button hover:shadow-3xl transform rounded-full border-2 border-white/20 px-12 py-4 text-xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105"
						style="background: linear-gradient(135deg, #C2A36E, #E6E6FA, #C2A36E);"
						on:click={() => {
							document.getElementById('contact')?.scrollIntoView({ 
								behavior: 'smooth',
								block: 'start'
							});
						}}
					>
						Jetzt Platz sichern
					</button>
					<p class="mt-3 text-base text-white/70">
						Begrenzte Teilnehmerzahl - Frühe Anmeldung empfohlen
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Cinematic animations */
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(50px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes scaleIn {
		from {
			opacity: 0;
			transform: scale(0.9);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes glow {
		0%,
		100% {
			text-shadow: 0 0 20px rgba(194, 163, 110, 0.5);
		}
		50% {
			text-shadow: 0 0 30px rgba(194, 163, 110, 0.8);
		}
	}

	/* Glassmorphic container */
	.glassmorphic-container {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
		animation: scaleIn 1s ease-out;
	}

	/* Cinematic title */
	.cinematic-title {
		animation: fadeInUp 1.2s ease-out;
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
		font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.cinematic-gradient {
		animation: glow 3s ease-in-out infinite;
	}

	/* Glassmorphic text */
	.glassmorphic-text {
		text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
		animation: fadeInUp 1s ease-out;
		font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	/* Date cards */
	.date-card {
		animation: fadeInUp 1.4s ease-out;
		transition: all 0.3s ease;
		font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.date-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 15px 30px rgba(194, 163, 110, 0.3);
	}

	.date-card:nth-child(2) {
		animation-delay: 0.2s;
	}

	/* CTA Button */
	.cta-button {
		animation: fadeInUp 1.6s ease-out;
		text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
		font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.cta-button:hover {
		box-shadow:
			0 20px 40px rgba(0, 0, 0, 0.4),
			0 0 30px rgba(194, 163, 110, 0.6) !important;
	}

	/* Video background styling */
	video {
		filter: brightness(0.7) contrast(1.1);
	}
</style>
