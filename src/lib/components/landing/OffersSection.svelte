<script>
	import { onMount } from 'svelte';

	let sectionElement;
	let carouselElement;
	let currentSlide = 0;
	let autoPlayInterval;
	let hasAnimated = false;

	// Background image URL from Appwrite
	const backgroundImageUrl =
		'https://fra.cloud.appwrite.io/v1/storage/buckets/6872736b0021a5826ece/files/68763ebc000574f8c44f/preview?project=68357409002d8b46f512&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbklkIjoiNjg3NjNlZDU2NmY1MDM4Nzg1NmUiLCJyZXNvdXJjZUlkIjoiNjg3MjczNmIwMDIxYTU4MjZlY2U6Njg3NjNlYmMwMDA1NzRmOGM0NGYiLCJyZXNvdXJjZVR5cGUiOiJmaWxlcyIsInJlc291cmNlSW50ZXJuYWxJZCI6IjI1MjQ0OjE0IiwiZXhwIjo5LjIyMzM3MjAzODYwNzM1NGUrMTh9.IZ7AYLMKGt8JiyZnZjbHXjV77PCvtbxxDBa84KQsPIU';

	// Three main offers
	const offers = [
		{
			id: 1,
			title: 'Die 7 Schlüssel zur Befreiung',
			subtitle: '3-Tage Intensiv-Retreat im Chiemgau',
			description:
				'Befreie dich von alten Mustern und inneren Blockaden. Entdecke deine innere Freiheit und führe ein Leben voller Selbstvertrauen, Authentizität und Liebe.',
			features: [
				'3 Tage tiefgreifende Transformation von Jo & Mi',
				'Die 7 Schlüssel & praktische Werkzeuge',
				'Geschützte Gruppe Gleichgesinnter',
				'Umfangreiche Unterlagen & Online-Zugang',
				'Quanten-Lanthaniden Scan (Wert 120€)',
				'30 Min. Nachbesprechung (Wert 135€)'
			],
			price: '1.400',
			originalPrice: '2.000',
			currency: '€',
			badge: 'Nur 30 Tage - Spar 600€',
			gradientFrom: '#C2A36E',
			gradientTo: '#E6E6FA',
			imageUrl: '/static/images/retreat-image.jpg' // Placeholder
		},
		{
			id: 2,
			title: '5er Block Zoom-Sessions',
			subtitle: 'Online Transformation',
			description:
				'Fünf intensive 2-Stunden Zoom-Sessions für nachhaltigen Wandel von zuhause aus. Flexibel terminierbar nach Ihren Bedürfnissen.',
			features: [
				'5 x 2-Stunden Zoom-Sessions',
				'Flexible Terminvereinbarung',
				'Persönliche 1:1 Betreuung',
				'Aufzeichnung der Sessions',
				'Email-Support zwischen Sessions'
			],
			price: '1.000',
			originalPrice: '1.350',
			currency: '€',
			badge: 'Spar-Angebot',
			gradientFrom: '#10B981',
			gradientTo: '#34D399',
			imageUrl: '/static/images/zoom-sessions.jpg' // Placeholder
		},
		{
			id: 3,
			title: '10-Stunden Zoom-Bundle',
			subtitle: 'Intensive Online-Begleitung',
			description:
				'Umfassendes 10-Stunden Paket für tiefgreifende Transformation. Ideal für komplexe Themen und nachhaltige Veränderung.',
			features: [
				'10 Stunden individuelle Betreuung',
				'Aufteilung nach Ihren Wünschen',
				'Umfassende Vor- und Nachbereitung',
				'Persönliche Übungen und Materialien',
				'3 Monate Email-Support inklusive'
			],
			price: '1.800',
			originalPrice: null,
			currency: '€',
			badge: 'Premium Paket',
			gradientFrom: '#8B5CF6',
			gradientTo: '#A78BFA',
			imageUrl: '/static/images/premium-bundle.jpg' // Placeholder
		}
	];

	function stopAutoPlay() {
		if (autoPlayInterval) {
			clearInterval(autoPlayInterval);
		}
	}

	function nextSlide() {
		currentSlide = (currentSlide + 1) % offers.length;
	}

	function prevSlide() {
		currentSlide = currentSlide === 0 ? offers.length - 1 : currentSlide - 1;
	}

	function goToSlide(index) {
		currentSlide = index;
	}

	onMount(() => {
		// After initial animation completes, make future cards load instantly
		setTimeout(() => {
			hasAnimated = true;
		}, 1000);

		return () => {
			stopAutoPlay();
		};
	});
</script>

<section
	bind:this={sectionElement}
	class="relative overflow-hidden py-16 lg:py-24"
	style="background-image: url('{backgroundImageUrl}'); background-size: cover; background-position: center; background-repeat: no-repeat;"
	role="region"
	aria-label="Angebote Carousel"
>
	<!-- Background overlay for better readability -->
	<div class="absolute inset-0 bg-black/50"></div>

	<!-- Subtle pattern overlay -->
	<div class="absolute inset-0 opacity-10">
		<div
			class="absolute inset-0"
			style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0); background-size: 40px 40px;"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-7xl px-8">
		<!-- Header -->
		<div class="mb-16 text-center">
			<!-- Tag -->
			<div class="mb-6 inline-block">
				<span
					class="inline-flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#C2A36E] backdrop-blur-sm"
				>
					Unsere Angebote
				</span>
			</div>

			<!-- Title -->
			<h2 class="mb-6 text-4xl leading-tight font-bold text-white lg:text-5xl xl:text-6xl">
				Was wir
				<span
					class="block bg-gradient-to-r bg-clip-text text-transparent"
					style="background: linear-gradient(to right, #C2A36E, #FFD700); -webkit-background-clip: text; background-clip: text;"
				>
					anbieten
				</span>
			</h2>

			<!-- Subtitle -->
			<p class="mx-auto max-w-3xl text-xl leading-relaxed text-white/90">
				Wählen Sie den Weg zur Transformation, der am besten zu Ihnen passt. Alle Optionen führen zu
				nachhaltiger Befreiung.
			</p>
		</div>

		<!-- Carousel Container -->
		<div class="relative mx-auto max-w-5xl">
			<!-- Main Carousel -->
			<div bind:this={carouselElement} class="relative overflow-hidden rounded-3xl shadow-2xl">
				<div
					class="flex transition-transform duration-700 ease-out"
					style="transform: translateX(-{currentSlide * 100}%)"
				>
					{#each offers as offer (offer.id)}
						<div class="w-full flex-shrink-0">
							<div
								class="glassmorphic-card relative min-h-[450px] overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl lg:min-h-[400px] {hasAnimated
									? 'no-animation'
									: ''}"
							>
								<!-- Background Gradient -->
								<div
									class="absolute inset-0 opacity-15"
									style="background: linear-gradient(135deg, {offer.gradientFrom}, {offer.gradientTo})"
								></div>

								<!-- Content Grid -->
								<div
									class="relative z-10 grid h-full items-center gap-8 p-8 lg:grid-cols-2 lg:p-12"
								>
									<!-- Left: Content -->
									<div class="space-y-6">
										<!-- Badge -->
										{#if offer.badge}
											<div class="inline-block">
												<span
													class="rounded-full px-3 py-1 text-sm font-semibold text-white"
													style="background: linear-gradient(135deg, {offer.gradientFrom}, {offer.gradientTo})"
												>
													{offer.badge}
												</span>
											</div>
										{/if}

										<!-- Title & Subtitle -->
										<div>
											<h3 class="mb-2 text-3xl font-bold text-white lg:text-4xl">
												{offer.title}
											</h3>
											<p class="text-lg font-medium text-white/80">
												{offer.subtitle}
											</p>
										</div>

										<!-- Description -->
										<p class="text-lg leading-relaxed text-white/90">
											{offer.description}
										</p>

										<!-- Features -->
										<div class="space-y-3">
											{#each offer.features as feature (feature)}
												<div class="flex items-center space-x-3">
													<div
														class="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
														style="background: linear-gradient(135deg, {offer.gradientFrom}, {offer.gradientTo})"
													>
														<svg
															class="h-3 w-3 text-white"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="3"
																d="M5 13l4 4L19 7"
															></path>
														</svg>
													</div>
													<span class="text-white/90">{feature}</span>
												</div>
											{/each}
										</div>
									</div>

									<!-- Right: Price & CTA -->
									<div class="flex flex-col items-center justify-center space-y-8 text-center">
										<!-- Price Display -->
										<div class="space-y-2">
											{#if offer.originalPrice}
												<div class="text-lg text-white/60 line-through">
													{offer.originalPrice}{offer.currency}
												</div>
											{/if}
											<div class="text-5xl font-bold text-white lg:text-6xl">
												<span class="align-top text-3xl lg:text-4xl">{offer.currency}</span
												>{offer.price}
											</div>
										</div>

										<!-- CTA Button -->
										<button
											class="transform rounded-full px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
											style="background: linear-gradient(135deg, {offer.gradientFrom}, {offer.gradientTo}); box-shadow: 0 8px 32px {offer.gradientFrom}40"
										>
											Jetzt buchen
										</button>

										<!-- Additional Info -->
										<p class="max-w-xs text-sm text-white/70">
											Unverbindliche Beratung möglich. Ratenzahlung auf Anfrage verfügbar.
										</p>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Navigation Arrows -->
			<button
				class="absolute top-1/2 left-4 z-10 flex h-12 w-12 -translate-y-1/2 transform items-center justify-center rounded-full bg-white/20 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/30"
				aria-label="Vorheriges Angebot"
				on:click={prevSlide}
			>
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"
					></path>
				</svg>
			</button>

			<button
				class="absolute top-1/2 right-4 z-10 flex h-12 w-12 -translate-y-1/2 transform items-center justify-center rounded-full bg-white/20 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/30"
				aria-label="Nächstes Angebot"
				on:click={nextSlide}
			>
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
					></path>
				</svg>
			</button>

			<!-- Dot Indicators -->
			<div class="mt-8 flex justify-center space-x-3">
				{#each offers as offer (offer.id)}
					<button
						class="h-3 w-3 rounded-full transition-all duration-300 {currentSlide === offer.id - 1
							? 'scale-125 bg-[#C2A36E]'
							: 'bg-opacity-40 bg-white'}"
						aria-label="Zu {offer.title} navigieren"
						on:click={() => goToSlide(offer.id - 1)}
					></button>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	/* Glassmorphic cards with cinematic entrance */
	.glassmorphic-card {
		backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		background: rgba(255, 255, 255, 0.05);
		animation: cinematicEntrance 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		opacity: 0;
		transform: translateY(40px) scale(0.95);
	}

	.glassmorphic-card:hover {
		transform: translateY(-8px) scale(1.02);
		border-color: rgba(194, 163, 110, 0.5);
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(10px);
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
		transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	@keyframes cinematicEntrance {
		0% {
			opacity: 0;
			transform: translateY(40px) scale(0.95);
		}
		50% {
			opacity: 0.6;
			transform: translateY(10px) scale(0.98);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	/* Fast carousel transitions for manual navigation */
	.transition-transform {
		transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	/* Only animate entrance once on page load */
	.glassmorphic-card {
		animation-duration: 0.8s;
		animation-delay: 0s;
	}

	/* After initial load, make cards appear instantly */
	.glassmorphic-card.no-animation {
		animation: none !important;
		opacity: 1 !important;
		transform: translateY(0) scale(1) !important;
	}

	/* Reduced staggered delays for faster initial load */
	.flex-shrink-0:nth-child(1) .glassmorphic-card {
		animation-delay: 0s;
	}
	.flex-shrink-0:nth-child(2) .glassmorphic-card {
		animation-delay: 0.1s;
	}
	.flex-shrink-0:nth-child(3) .glassmorphic-card {
		animation-delay: 0.2s;
	}
</style>
