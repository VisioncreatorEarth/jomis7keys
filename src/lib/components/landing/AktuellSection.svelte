<script>
	// Background image URL from Appwrite
	const backgroundImageUrl = 'https://fra.cloud.appwrite.io/v1/storage/buckets/6872736b0021a5826ece/files/6876618c000790192776/preview?project=68357409002d8b46f512&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbklkIjoiNjg3NjYxOTFjY2ZmZjEwODY3YjQiLCJyZXNvdXJjZUlkIjoiNjg3MjczNmIwMDIxYTU4MjZlY2U6Njg3NjYxOGMwMDA3OTAxOTI3NzYiLCJyZXNvdXJjZVR5cGUiOiJmaWxlcyIsInJlc291cmNlSW50ZXJuYWxJZCI6IjI1MjQ0OjE4IiwiZXhwIjo5LjIyMzM3MjAzODYwNzM2NGUrMTh9.2nK1l0gb31Il0hAycoj32w7X9Tx987tzIAmKHOu8uaI';
	
	// Read more state for Beauty Challenge
	let showMoreBeauty = false;
	
	function toggleBeautyReadMore(event) {
		event.preventDefault();
		showMoreBeauty = !showMoreBeauty;
	}
</script>

<section class="relative flex h-screen items-center justify-center overflow-hidden">
	<!-- Background Image -->
	<div class="absolute inset-0">
		<img
			src={backgroundImageUrl}
			alt="Retreat Location - Guntersberg mit Alpenblick im Chiemgau"
			class="h-full w-full object-cover"
		/>
		<!-- Selective gradient overlay only in center area where content appears -->
		<div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent"></div>
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

		<!-- Cards Container -->
		<div class="grid gap-6 lg:grid-cols-2 lg:items-start">
			<!-- Retreat Card -->
			<div class="glassmorphic-container rounded-2xl border border-white/20 p-6 shadow-2xl backdrop-blur-xl">
				<div class="space-y-6">
					<!-- Location -->
					<div class="text-center">
						<div class="mb-2 flex items-center justify-center space-x-2">
							<svg
								class="h-5 w-5"
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
							<p class="text-lg font-semibold text-white">Guntersberg mit Alpenblick im Chiemgau</p>
						</div>
						<p class="text-sm text-white/80">(4-8 Teilnehmer)</p>
					</div>

					<!-- Dates Grid -->
					<div class="grid gap-4 md:grid-cols-2">
						<div
							class="date-card rounded-xl border border-white/10 p-4 backdrop-blur-sm"
							style="background: rgba(194, 163, 110, 0.15);"
						>
							<div class="text-center">
								<p class="mb-1 text-sm font-medium text-white/80">Retreat 1</p>
								<p class="mb-1 text-2xl font-bold text-white">24. - 27.</p>
								<p class="text-lg font-semibold" style="color: #C2A36E;">Juli 2025</p>
							</div>
						</div>

						<div
							class="date-card rounded-xl border border-white/10 p-4 backdrop-blur-sm"
							style="background: rgba(194, 163, 110, 0.15);"
						>
							<div class="text-center">
								<p class="mb-1 text-sm font-medium text-white/80">Retreat 2</p>
								<p class="mb-1 text-2xl font-bold text-white">14. - 17.</p>
								<p class="text-lg font-semibold" style="color: #C2A36E;">August 2025</p>
							</div>
						</div>
					</div>

					<!-- CTA Button -->
					<div class="pt-2">
						<button
							class="glassmorphic-button w-full transform rounded-full border border-white/30 bg-white/10 px-8 py-3 text-lg font-bold text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/20"
							on:click={() => {
								document.getElementById('contact')?.scrollIntoView({ 
									behavior: 'smooth',
									block: 'start'
								});
							}}
						>
							Jetzt Platz sichern
						</button>
						<p class="mt-2 text-center text-sm text-white/70">
							Begrenzte Teilnehmerzahl - Frühe Anmeldung empfohlen
						</p>
					</div>
				</div>
			</div>

			<!-- Beauty Challenge Card -->
			<div class="glassmorphic-container rounded-2xl border border-white/20 p-6 shadow-2xl backdrop-blur-xl">
				<div class="space-y-4">
					<!-- Title -->
					<div class="text-center">
						<h3 class="mb-2 text-xl font-bold text-white">Beauty Challenge</h3>
						<p class="text-sm font-medium" style="color: #C2A36E;">Bereit für eine Veränderung?</p>
					</div>

					<!-- Description -->
					<div class="space-y-3">
						<p class="text-sm leading-relaxed text-white/90">
							4-monatige Beauty Challenge für mehr Strahlen, Frische und natürliche Schönheit von innen!
						</p>
						
						{#if showMoreBeauty}
							<div class="space-y-3 animate-fade-in">
								<p class="text-sm leading-relaxed text-white/90">
									Mach mit und entfalte Deine natürliche Strahlkraft mit Superfoods & Vitalstoffpower aus der Natur.
								</p>
								
								<!-- Benefits -->
								<div class="space-y-2">
									<p class="text-sm font-semibold text-white">Was du bekommst:</p>
									<ul class="space-y-1 text-sm text-white/80">
										<li>• Superfoods & natürliche Vitalstoffpower</li>
										<li>• Wow-Effekte (Vorher-Nachher-Fotos)</li>
										<li>• Motivation in exklusiver Community</li>
										<li>• Unterstützende Tipps für Ernährung & Pflege</li>
									</ul>
								</div>
							</div>
						{/if}
						
						<!-- Read More Toggle -->
						<button
							type="button"
							class="text-sm font-medium text-[#C2A36E] hover:text-[#E6E6FA] transition-colors duration-200 underline"
							on:click={toggleBeautyReadMore}
						>
							{showMoreBeauty ? 'Weniger anzeigen' : 'Mehr erfahren'}
						</button>
					</div>

					<!-- Details -->
					<div class="space-y-2">
						<div class="flex items-center justify-between">
							<span class="text-sm font-semibold text-white">Start:</span>
							<span class="text-sm font-bold" style="color: #C2A36E;">1. August 2025</span>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-sm font-semibold text-white">Format:</span>
							<span class="text-sm text-white/80">14-tägige Zooms</span>
						</div>
					</div>

					<!-- CTA Button -->
					<div class="pt-2">
						<button
							class="glassmorphic-button w-full transform rounded-full border border-white/30 bg-white/10 px-8 py-3 text-lg font-bold text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/20"
							on:click={() => {
								document.getElementById('contact')?.scrollIntoView({ 
									behavior: 'smooth',
									block: 'start'
								});
							}}
						>
							Jetzt anmelden
						</button>
						<p class="mt-2 text-center text-sm text-white/70">
							🌸 Natürlich - Wirkungsvoll - Schön 🌸
						</p>
					</div>
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

	/* Glassmorphic Button */
	.glassmorphic-button {
		animation: fadeInUp 1.6s ease-out;
		text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
		font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	}

	.glassmorphic-button:hover {
		box-shadow:
			0 20px 40px rgba(0, 0, 0, 0.4),
			0 0 30px rgba(194, 163, 110, 0.6) !important;
		border-color: rgba(194, 163, 110, 0.5);
	}

	/* Background image styling */
	img {
		filter: brightness(0.8) contrast(1.1);
	}

	/* Smooth expansion animation */
	.animate-fade-in {
		animation: fadeIn 0.3s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}


</style>
