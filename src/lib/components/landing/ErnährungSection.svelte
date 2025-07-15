<script>
	import { onMount } from 'svelte';

	let sectionElement;
	let isVisible = false;

	// Background image URL from Appwrite
	const backgroundImageUrl = "https://fra.cloud.appwrite.io/v1/storage/buckets/6872736b0021a5826ece/files/68761c7a001687aae13f/preview?project=68357409002d8b46f512&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbklkIjoiNjg3NjFmNDA2YTZlMDJmZWZmYjEiLCJyZXNvdXJjZUlkIjoiNjg3MjczNmIwMDIxYTU4MjZlY2U6Njg3NjFjN2EwMDE2ODdhYWUxM2YiLCJyZXNvdXJjZVR5cGUiOiJmaWxlcyIsInJlc291cmNlSW50ZXJuYWxJZCI6IjI1MjQ0OjkiLCJleHAiOjkuMjIzMzcyMDM4NjA3MzU4ZSsxOH0._XTvsD1Ni-WO8Hw_kDhIFHZtFG_LzCYGpJWpkSbTcnE";

	// Raw food images from Appwrite storage
	const rawFoodImages = [
		'https://fra.cloud.appwrite.io/v1/storage/buckets/6872736b0021a5826ece/files/68761c500020134b1f03/preview?project=68357409002d8b46f512&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbklkIjoiNjg3NjFlYTk0NzQ0N2JhODE5MGEiLCJyZXNvdXJjZUlkIjoiNjg3MjczNmIwMDIxYTU4MjZlY2U6Njg3NjFjNTAwMDIwMTM0YjFmMDMiLCJyZXNvdXJjZVR5cGUiOiJmaWxlcyIsInJlc291cmNlSW50ZXJuYWxJZCI6IjI1MjQ0OjYiLCJleHAiOjkuMjIzMzcyMDM4NjA3MzQ4ZSsxOH0.yBqBwNy1mSxRvSHj-FUg4y4RXEG0sFK12wA1p0IQsAM',
		'https://fra.cloud.appwrite.io/v1/storage/buckets/6872736b0021a5826ece/files/68761c5a0030dc620308/preview?project=68357409002d8b46f512&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbklkIjoiNjg3NjFlZjJiYjAyYjM3N2E3NzUiLCJyZXNvdXJjZUlkIjoiNjg3MjczNmIwMDIxYTU4MjZlY2U6Njg3NjFjNWEwMDMwZGM2MjAzMDgiLCJyZXNvdXJjZVR5cGUiOiJmaWxlcyIsInJlc291cmNlSW50ZXJuYWxJZCI6IjI1MjQ0OjciLCJleHAiOjkuMjIzMzcyMDM4NjA3MzQ4ZSsxOH0.99-p8RArcqHa9RpIyTMo0F1vbUk6SeO8R5NCISkWgnA',
		'https://fra.cloud.appwrite.io/v1/storage/buckets/6872736b0021a5826ece/files/68761c680033ca696bd4/preview?project=68357409002d8b46f512&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbklkIjoiNjg3NjFmMDgyYzBlOTRjY2MwZTgiLCJyZXNvdXJjZUlkIjoiNjg3MjczNmIwMDIxYTU4MjZlY2U6Njg3NjFjNjgwMDMzY2E2OTZiZDQiLCJyZXNvdXJjZVR5cGUiOiJmaWxlcyIsInJlc291cmNlSW50ZXJuYWxJZCI6IjI1MjQ0OjgiLCJleHAiOjkuMjIzMzcyMDM4NjA3MzQ4ZSsxOH0.xryezyDov2DdkZFjfjdaaujA_NzzfoSaTUWZyA4aseo',
		'https://fra.cloud.appwrite.io/v1/storage/buckets/6872736b0021a5826ece/files/68761c850036277bd5bd/preview?project=68357409002d8b46f512&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbklkIjoiNjg3NjFmMjdlZmRlYzRlNjBhM2MiLCJyZXNvdXJjZUlkIjoiNjg3MjczNmIwMDIxYTU4MjZlY2U6Njg3NjFjODUwMDM2Mjc3YmQ1YmQiLCJyZXNvdXJjZVR5cGUiOiJmaWxlcyIsInJlc291cmNlSW50ZXJuYWxJZCI6IjI1MjQ0OjEwIiwiZXhwIjo5LjIyMzM3MjAzODYwNzM0OGUrMTh9.8MS_4Rf4sNZEcH5CG0kEqzgRM7ymijWBiFBoJRrrEvs',
		'https://fra.cloud.appwrite.io/v1/storage/buckets/6872736b0021a5826ece/files/68761c7a001687aae13f/preview?project=68357409002d8b46f512&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbklkIjoiNjg3NjFmNDA2YTZlMDJmZWZmYjEiLCJyZXNvdXJjZUlkIjoiNjg3MjczNmIwMDIxYTU4MjZlY2U6Njg3NjFjN2EwMDE2ODdhYWUxM2YiLCJyZXNvdXJjZVR5cGUiOiJmaWxlcyIsInJlc291cmNlSW50ZXJuYWxJZCI6IjI1MjQ0OjkiLCJleHAiOjkuMjIzMzcyMDM4NjA3MzQ4ZSsxOH0.tZQIu0Jb3tTYXrs2Fi19MQPCvbTf2ZoZJLUCEACGVws',
		'https://fra.cloud.appwrite.io/v1/storage/buckets/6872736b0021a5826ece/files/68761c8f00022908d081/preview?project=68357409002d8b46f512&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbklkIjoiNjg3NjFmNjVlMTVkZmQ0OWFiY2YiLCJyZXNvdXJjZUlkIjoiNjg3MjczNmIwMDIxYTU4MjZlY2U6Njg3NjFjOGYwMDAyMjkwOGQwODEiLCJyZXNvdXJjZVR5cGUiOiJmaWxlcyIsInJlc291cmNlSW50ZXJuYWxJZCI6IjI1MjQ0OjExIiwiZXhwIjo5LjIyMzM3MjAzODYwNzM0OGUrMTh9.Lwmjixkfh5UjsXEsCcsbm0CuqosRS--LQD4hdZMLBlQ',
		'https://fra.cloud.appwrite.io/v1/storage/buckets/6872736b0021a5826ece/files/68761c9900089f0a4535/preview?project=68357409002d8b46f512&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbklkIjoiNjg3NjFmN2EzY2IxYzFiNzQzYjAiLCJyZXNvdXJjZUlkIjoiNjg3MjczNmIwMDIxYTU4MjZlY2U6Njg3NjFjOTkwMDA4OWYwYTQ1MzUiLCJyZXNvdXJjZVR5cGUiOiJmaWxlcyIsInJlc291cmNlSW50ZXJuYWxJZCI6IjI1MjQ0OjEyIiwiZXhwIjo5LjIyMzM3MjAzODYwNzM0OGUrMTh9.vwCuLNudWM4amY9_6O84fVKm0vfBRDOsoAKoXwJ3kPw'
	];

	onMount(() => {
		setTimeout(() => {
			isVisible = true;
		}, 300);

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

<section
	bind:this={sectionElement}
	class="relative min-h-screen overflow-hidden py-16 lg:py-24"
	style="background-image: url('{backgroundImageUrl}'); background-size: cover; background-position: center; background-repeat: no-repeat;"
>
	<!-- Background overlay for better readability -->
	<div class="absolute inset-0 bg-black/60"></div>
	<div class="relative z-10 mx-auto max-w-7xl px-8">
		<div class="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
			<!-- Left: Artistic Collage -->
			<div class="relative min-h-[600px] lg:min-h-[800px]">
				<div class="collage-container relative h-full w-full" class:animate-in={isVisible}>

					<!-- Image 1 - Large central focus -->
					<div
						class="collage-item-1 absolute transform overflow-hidden rounded-lg shadow-2xl transition-all duration-1000"
					>
						<img
							src={rawFoodImages[0]}
							alt="Raw food lifestyle"
							class="h-full w-full object-cover"
							loading="lazy"
						/>
					</div>

					<!-- Image 2 - Top right -->
					<div
						class="collage-item-2 absolute transform overflow-hidden rounded-lg shadow-xl transition-all duration-1000"
					>
						<img
							src={rawFoodImages[1]}
							alt="Raw food preparation"
							class="h-full w-full object-cover"
							loading="lazy"
						/>
					</div>

					<!-- Image 3 - Left side -->
					<div
						class="collage-item-3 absolute transform overflow-hidden rounded-lg shadow-xl transition-all duration-1000"
					>
						<img
							src={rawFoodImages[2]}
							alt="Natural nutrition"
							class="h-full w-full object-cover"
							loading="lazy"
						/>
					</div>

					<!-- Image 4 - Bottom right -->
					<div
						class="collage-item-4 absolute transform overflow-hidden rounded-lg shadow-xl transition-all duration-1000"
					>
						<img
							src={rawFoodImages[3]}
							alt="Healthy eating"
							class="h-full w-full object-cover"
							loading="lazy"
						/>
					</div>

					<!-- Image 5 - Small accent -->
					<div
						class="collage-item-5 absolute transform overflow-hidden rounded-lg shadow-lg transition-all duration-1000"
					>
						<img
							src={rawFoodImages[5]}
							alt="Raw food details"
							class="h-full w-full object-cover"
							loading="lazy"
						/>
					</div>

					<!-- Text overlay integrated into collage -->
					<div
						class="collage-text absolute rounded-lg bg-black/80 p-6 shadow-xl backdrop-blur-sm border border-white/20"
					>
						<h3 class="mb-2 text-sm font-bold tracking-wider text-[#C2A36E] uppercase">
							20+ Jahre
						</h3>
						<p class="text-lg leading-tight font-semibold text-white">
							Rohkost<br />
							Erfahrung
						</p>
					</div>
				</div>
			</div>

			<!-- Right: Content -->
			<div class="flex flex-col justify-center space-y-8">
				<div
					class="transform transition-all delay-300 duration-1000"
					class:translate-y-0={isVisible}
					class:opacity-100={isVisible}
					class:translate-y-8={!isVisible}
					class:opacity-0={!isVisible}
				>
					<!-- Title -->
					<div class="mb-8">
						<h2 class="text-4xl leading-tight font-bold text-white lg:text-5xl xl:text-6xl">
							Über Unsere
							<span
								class="bg-gradient-to-r from-[#C2A36E] to-[#E6E6FA] bg-clip-text text-transparent"
							>
								Ernährung
							</span>
						</h2>
					</div>

					<!-- Main content -->
					<div class="space-y-6">
						<p class="text-xl leading-relaxed text-white/90 lg:text-2xl">
							Seit über zwei Jahrzehnten leben wir rohköstlich und haben dadurch eine Transformation
							erlebt, die weit über das Körperliche hinausgeht.
						</p>

						<p class="text-lg leading-relaxed text-white/80">
							Diese Lebensweise hat unsere Wahrnehmung geschärft, unsere Energie vervielfacht und
							unsere Fähigkeit verfeinert, Menschen bei ihrer inneren Heilung zu begleiten.
						</p>
					</div>

					<!-- Key benefits -->
					<div class="space-y-4">
						<div class="flex items-center space-x-3">
							<div class="flex h-2 w-2 rounded-full bg-[#C2A36E]"></div>
							<span class="text-white/80">Natürliche Vitalität & Klarheit</span>
						</div>
						<div class="flex items-center space-x-3">
							<div class="flex h-2 w-2 rounded-full bg-[#C2A36E]"></div>
							<span class="text-white/80">Emotionale Balance & Intuition</span>
						</div>
						<div class="flex items-center space-x-3">
							<div class="flex h-2 w-2 rounded-full bg-[#C2A36E]"></div>
							<span class="text-white/80">Tiefere Verbindung zur Natur</span>
						</div>
					</div>

					<!-- Subtle CTA -->
					<div class="pt-8">
						<div
							class="inline-flex cursor-pointer items-center space-x-2 text-[#C2A36E] transition-colors duration-300 hover:text-[#E6E6FA]"
						>
							<span class="text-sm font-medium">Erfahre mehr über unseren Ansatz</span>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								></path>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.collage-container {
		perspective: 1000px;
	}



	/* Collage items positioning */
	.collage-item-1 {
		top: 20%;
		left: 20%;
		width: 280px;
		height: 320px;
		transform: rotate(2deg);
		z-index: 5;
	}

	.collage-item-2 {
		top: 5%;
		right: 10%;
		width: 200px;
		height: 160px;
		transform: rotate(-5deg);
		z-index: 4;
	}

	.collage-item-3 {
		top: 45%;
		left: 5%;
		width: 180px;
		height: 220px;
		transform: rotate(8deg);
		z-index: 3;
	}

	.collage-item-4 {
		bottom: 15%;
		right: 15%;
		width: 240px;
		height: 180px;
		transform: rotate(-3deg);
		z-index: 4;
	}

	.collage-item-5 {
		bottom: 35%;
		left: 35%;
		width: 120px;
		height: 120px;
		transform: rotate(15deg);
		z-index: 6;
	}

	.collage-text {
		bottom: 10%;
		left: 50%;
		transform: translateX(-50%) rotate(-2deg);
		z-index: 7;
	}

	/* Animations */
	.animate-in .collage-item-1 {
		animation: slideIn 1s ease-out 0.2s both;
	}

	.animate-in .collage-item-2 {
		animation: slideIn 1s ease-out 0.4s both;
	}

	.animate-in .collage-item-3 {
		animation: slideIn 1s ease-out 0.6s both;
	}

	.animate-in .collage-item-4 {
		animation: slideIn 1s ease-out 0.8s both;
	}

	.animate-in .collage-item-5 {
		animation: slideIn 1s ease-out 1s both;
	}

	.animate-in .collage-text {
		animation: slideIn 1s ease-out 1.2s both;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(30px) scale(0.9);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	/* Hover effects */
	.collage-item-1:hover,
	.collage-item-2:hover,
	.collage-item-3:hover,
	.collage-item-4:hover,
	.collage-item-5:hover {
		transform: scale(1.05);
		z-index: 10;
	}

	/* Text styling */
	h2 {
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
		font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	p {
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
	}

	/* Responsive adjustments */
	@media (max-width: 1024px) {
		.collage-item-1 {
			width: 240px;
			height: 280px;
		}

		.collage-item-2 {
			width: 160px;
			height: 120px;
		}

		.collage-item-3 {
			width: 140px;
			height: 180px;
		}

		.collage-item-4 {
			width: 200px;
			height: 140px;
		}

		.collage-item-5 {
			width: 100px;
			height: 100px;
		}
	}

	@media (max-width: 768px) {
		.collage-container {
			min-height: 500px;
		}
	}
</style>
