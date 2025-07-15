<script>
	import { onMount } from 'svelte';
	import { imageService } from '$lib/services/imageService.js';

	let sectionElement;
	let isVisible = true; // Text ist sofort sichtbar

	// Get background image from Appwrite
	const backgroundImage = imageService.getImageUrl('about-us-bg');

	onMount(() => {
		// Animation nach kurzer Verzögerung starten
		setTimeout(() => {
			isVisible = true;
		}, 200);

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					isVisible = true;
				}
			},
			{ threshold: 0.1 }
		);

		if (sectionElement) {
			observer.observe(sectionElement);
		}

		return () => {
			observer.disconnect();
		};
	});
</script>

<section id="ueber-uns" bind:this={sectionElement} class="relative min-h-screen overflow-hidden">
	<!-- Background Image -->
	<div class="absolute inset-0 z-0 bg-gray-900">
		<img
			src={backgroundImage}
			alt="Joachim und Michaela Andert"
			class="h-full w-full object-cover"
		/>
		<!-- Selective gradient overlay only where text appears (left side) -->
		<div class="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>
	</div>

	<!-- Content - Left Side -->
	<div class="relative z-10 flex min-h-screen items-center">
		<div class="w-full px-8 py-16 md:w-1/2 lg:px-16">
			<div
				class="transform transition-all duration-1000 {isVisible
					? 'translate-y-0 opacity-100'
					: 'translate-y-8 opacity-0'}"
			>
				<!-- Title -->
				<h2 class="mb-8 text-4xl font-black text-white text-shadow-lg md:text-6xl">Über Uns</h2>

				<!-- Glassmorphic Content Card -->
				<div
					class="glassmorphic-card max-w-lg rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-lg md:p-8"
				>
					<div class="space-y-6">
						<p class="text-base leading-relaxed font-light text-white md:text-lg">
							Wir sind <span class="font-semibold text-[#C2A36E]">Joachim und Michaela Andert</span
							>, mit über 40 Jahren Erfahrung in der Begleitung von Menschen auf ihrem Weg zur
							inneren Freiheit.
						</p>
						<p class="text-base leading-relaxed font-light text-white md:text-lg">
							Unser Ansatz kombiniert tiefgehende Methoden mit einer individuellen Transformation,
							um alte Blockaden zu lösen und ein erfülltes Leben zu ermöglichen.
						</p>
						<p class="text-base leading-relaxed font-light text-white md:text-lg">
							Mit Hingabe und Intuition unterstützen wir dich auf deinem <span
								class="font-semibold text-[#C2A36E]">Quantensprung</span
							>.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.text-shadow-lg {
		text-shadow:
			2px 2px 4px rgba(0, 0, 0, 0.8),
			4px 4px 8px rgba(0, 0, 0, 0.6),
			6px 6px 12px rgba(0, 0, 0, 0.4);
	}

	.glassmorphic-card {
		backdrop-filter: blur(15px);
		transition: all 0.3s ease;
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	}

	.glassmorphic-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
		border-color: rgba(194, 163, 110, 0.3);
	}

	/* Smooth scroll target */
	#ueber-uns {
		scroll-margin-top: 80px;
	}
</style>
