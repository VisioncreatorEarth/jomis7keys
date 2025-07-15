<script>
	import { onMount } from 'svelte';

	let sectionElement;
	let isVisible = false;

	// Background image URL from Appwrite
	const backgroundImageUrl = "https://fra.cloud.appwrite.io/v1/storage/buckets/6872736b0021a5826ece/files/68765cbc001d37067419/preview?project=68357409002d8b46f512&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbklkIjoiNjg3NjVjYzM5MWZmOTk4ZjcwZjYiLCJyZXNvdXJjZUlkIjoiNjg3MjczNmIwMDIxYTU4MjZlY2U6Njg3NjVjYmMwMDFkMzcwNjc0MTkiLCJyZXNvdXJjZVR5cGUiOiJmaWxlcyIsInJlc291cmNlSW50ZXJuYWxJZCI6IjI1MjQ0OjE1IiwiZXhwIjo5LjIyMzM3MjAzODYwNzM2NGUrMTh9.eT9K4slYlqvflRhAP-9qWHIu39UmR0p1DP2jkFZDWbg";

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
	<!-- Selective gradient overlay only where text appears (right side) -->
	<div class="absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-transparent"></div>

	<div class="relative z-10 mx-auto max-w-7xl px-8">
		<div class="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
			<!-- Left: Modern Image Grid -->
			<div class="relative">
				<div class="image-grid-container" class:animate-in={isVisible}>
					<!-- Row 1: Two images -->
					<div class="grid grid-cols-2 gap-4 mb-4">
						<div class="image-card aspect-square overflow-hidden rounded-xl shadow-2xl group">
							<img
								src={rawFoodImages[0]}
								alt="Raw food lifestyle"
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
								loading="lazy"
							/>
						</div>
						<div class="image-card aspect-[4/5] overflow-hidden rounded-xl shadow-2xl group">
							<img
								src={rawFoodImages[1]}
								alt="Raw food preparation"
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
								loading="lazy"
							/>
						</div>
					</div>

					<!-- Row 2: Three images -->
					<div class="grid grid-cols-3 gap-4 mb-4">
						<div class="image-card aspect-square overflow-hidden rounded-xl shadow-2xl group">
							<img
								src={rawFoodImages[2]}
								alt="Natural nutrition"
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
								loading="lazy"
							/>
						</div>
						<div class="image-card aspect-[3/4] overflow-hidden rounded-xl shadow-2xl group">
							<img
								src={rawFoodImages[3]}
								alt="Healthy eating"
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
								loading="lazy"
							/>
						</div>
						<div class="image-card aspect-square overflow-hidden rounded-xl shadow-2xl group">
							<img
								src={rawFoodImages[4]}
								alt="Raw food variety"
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
								loading="lazy"
							/>
						</div>
					</div>

					<!-- Row 3: Two images -->
					<div class="grid grid-cols-2 gap-4">
						<div class="image-card aspect-[5/4] overflow-hidden rounded-xl shadow-2xl group">
							<img
								src={rawFoodImages[5]}
								alt="Raw food details"
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
								loading="lazy"
							/>
						</div>
						<div class="image-card aspect-square overflow-hidden rounded-xl shadow-2xl group">
							<img
								src={rawFoodImages[6]}
								alt="Raw food experience"
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
								loading="lazy"
							/>
						</div>
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
						<a
							href="/membership"
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
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Image grid styles */
	.image-grid-container {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s ease-out;
	}

	.image-grid-container.animate-in {
		opacity: 1;
		transform: translateY(0);
	}

	.image-card {
		position: relative;
		overflow: hidden;
		border-radius: 12px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
		transition: all 0.3s ease;
	}

	.image-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
	}

	/* Staggered animation for grid items */
	.animate-in .image-card {
		animation: fadeInUp 0.8s ease-out both;
	}

	.animate-in .image-card:nth-child(1) {
		animation-delay: 0.1s;
	}

	.animate-in .image-card:nth-child(2) {
		animation-delay: 0.2s;
	}

	.animate-in .image-card:nth-child(3) {
		animation-delay: 0.3s;
	}

	.animate-in .image-card:nth-child(4) {
		animation-delay: 0.4s;
	}

	.animate-in .image-card:nth-child(5) {
		animation-delay: 0.5s;
	}

	.animate-in .image-card:nth-child(6) {
		animation-delay: 0.6s;
	}

	.animate-in .image-card:nth-child(7) {
		animation-delay: 0.7s;
	}

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

	/* Group hover effects */
	.group:hover img {
		transform: scale(1.1);
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
		.image-grid-container {
			padding: 0 1rem;
		}

		.grid {
			gap: 0.75rem;
		}

		.mb-4 {
			margin-bottom: 0.75rem;
		}
	}

	@media (max-width: 768px) {
		.image-grid-container {
			padding: 0 0.5rem;
		}

		.grid {
			gap: 0.5rem;
		}

		.mb-4 {
			margin-bottom: 0.5rem;
		}

		/* Stack images vertically on mobile */
		.grid-cols-3 {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 640px) {
		.grid-cols-2 {
			grid-template-columns: 1fr;
		}

		.grid-cols-3 {
			grid-template-columns: 1fr;
		}
	}
</style>
