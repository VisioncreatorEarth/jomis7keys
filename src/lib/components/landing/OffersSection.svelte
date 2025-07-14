<script>
	import { onMount } from 'svelte';

	let sectionElement;
	let carouselElement;
	let isVisible = false;
	let currentSlide = 0;
	let autoPlayInterval;
	let isPlaying = true;

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

	// Auto-play functionality
	function startAutoPlay() {
		autoPlayInterval = setInterval(() => {
			if (isPlaying) {
				nextSlide();
			}
		}, 5000);
	}

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

	function pauseAutoPlay() {
		isPlaying = false;
	}

	function resumeAutoPlay() {
		isPlaying = true;
	}

	onMount(() => {
		// Make carousel visible immediately as fallback
		setTimeout(() => {
			isVisible = true;
			startAutoPlay();
		}, 100);

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					isVisible = true;
					startAutoPlay();
				} else {
					stopAutoPlay();
				}
			},
			{ threshold: 0.1 }
		);

		if (sectionElement) {
			observer.observe(sectionElement);
		}

		return () => {
			observer.disconnect();
			stopAutoPlay();
		};
	});
</script>

<section
	bind:this={sectionElement}
	class="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 lg:py-24"
	on:mouseenter={pauseAutoPlay}
	on:mouseleave={resumeAutoPlay}
>
	<!-- Background Elements -->
	<div class="absolute inset-0 opacity-5">
		<div
			class="absolute inset-0"
			style="background-image: radial-gradient(circle at 2px 2px, rgba(194,163,110,0.2) 1px, transparent 0); background-size: 40px 40px;"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-7xl px-8">
		<!-- Header -->
		<div class="mb-16 text-center">
			<!-- Tag -->
			<div class="mb-6 inline-block">
				<span
					class="inline-flex items-center rounded-full border border-[#C2A36E]/20 bg-[#C2A36E]/10 px-4 py-2 text-sm font-semibold text-[#C2A36E]"
				>
					Unsere Angebote
				</span>
			</div>

			<!-- Title -->
			<h2 class="mb-6 text-4xl leading-tight font-bold text-gray-900 lg:text-5xl xl:text-6xl">
				Was wir
				<span
					class="block bg-gradient-to-r bg-clip-text text-transparent"
					style="background: linear-gradient(to right, #C2A36E, #8B7355); -webkit-background-clip: text; background-clip: text;"
				>
					anbieten
				</span>
			</h2>

			<!-- Subtitle -->
			<p class="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
				Wählen Sie den Weg zur Transformation, der am besten zu Ihnen passt. Alle Optionen führen zu
				nachhaltiger Befreiung.
			</p>
		</div>

		<!-- Carousel Container -->
		<div class="relative mx-auto max-w-5xl">
			<!-- Main Carousel -->
			<div
				bind:this={carouselElement}
				class="relative overflow-hidden rounded-3xl shadow-2xl"
				class:animate-in={isVisible}
			>
				<div
					class="flex transition-transform duration-700 ease-out"
					style="transform: translateX(-{currentSlide * 100}%)"
				>
					{#each offers as offer (offer.id)}
						<div class="w-full flex-shrink-0">
							<div
								class="relative min-h-[600px] overflow-hidden rounded-3xl bg-white lg:min-h-[500px]"
							>
								<!-- Background Gradient -->
								<div
									class="absolute inset-0 opacity-10"
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
											<h3 class="mb-2 text-3xl font-bold text-gray-900 lg:text-4xl">
												{offer.title}
											</h3>
											<p class="text-lg font-medium text-gray-600">
												{offer.subtitle}
											</p>
										</div>

										<!-- Description -->
										<p class="text-lg leading-relaxed text-gray-700">
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
													<span class="text-gray-700">{feature}</span>
												</div>
											{/each}
										</div>
									</div>

									<!-- Right: Price & CTA -->
									<div class="flex flex-col items-center justify-center space-y-8 text-center">
										<!-- Price Display -->
										<div class="space-y-2">
											{#if offer.originalPrice}
												<div class="text-lg text-gray-500 line-through">
													{offer.originalPrice}{offer.currency}
												</div>
											{/if}
											<div class="text-5xl font-bold text-gray-900 lg:text-6xl">
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
										<p class="max-w-xs text-sm text-gray-500">
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
				class="absolute top-1/2 left-4 z-10 flex h-12 w-12 -translate-y-1/2 transform items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white"
				on:click={prevSlide}
			>
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"
					></path>
				</svg>
			</button>

			<button
				class="absolute top-1/2 right-4 z-10 flex h-12 w-12 -translate-y-1/2 transform items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white"
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
						class="h-3 w-3 rounded-full transition-all duration-300"
						class:bg-[#C2A36E]={currentSlide === offer.id - 1}
						class:bg-gray-300={currentSlide !== offer.id - 1}
						class:scale-125={currentSlide === offer.id - 1}
						on:click={() => goToSlide(offer.id - 1)}
					></button>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.animate-in {
		animation: slideInUp 0.8s ease-out forwards;
		opacity: 1; /* Ensure visibility */
	}

	@keyframes slideInUp {
		from {
			opacity: 0.8;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Smooth transitions */
	.transition-transform {
		transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
	}
</style>
