<script>
	import { onMount } from 'svelte';

	let isVisible = false;

	onMount(() => {
		// Trigger animation after component mounts
		setTimeout(() => {
			isVisible = true;
		}, 100);
	});
</script>

<svelte:head>
	<title>Quantensprung Membership - Exklusiver Zugang</title>
	<meta name="description" content="Willkommen zur Quantensprung Membership - Entdecke exklusive Kurse, Video-Material und Studien für deine persönliche Transformation." />
</svelte:head>

<section class="relative min-h-screen overflow-hidden py-16 lg:py-24 flex items-center justify-center"
	style="background-image: url('https://fra.cloud.appwrite.io/v1/storage/buckets/6872736b0021a5826ece/files/6876716d0019eea6718c/preview?project=68357409002d8b46f512&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbklkIjoiNjg3NjcxN2E0ZTE4NTA0OWVkNWYiLCJyZXNvdXJjZUlkIjoiNjg3MjczNmIwMDIxYTU4MjZlY2U6Njg3NjcxNmQwMDE5ZWVhNjcxOGMiLCJyZXNvdXJjZVR5cGUiOiJmaWxlcyIsInJlc291cmNlSW50ZXJuYWxJZCI6IjI1MjQ0OjE5IiwiZXhwIjo5LjIyMzM3MjAzODYwNzM2OGUrMTh9.Z1U3usmejRN9ri7wuW2aP0H3YdBmAWIWKb_dnx3_dVU'); background-size: cover; background-position: center; background-repeat: no-repeat;">
	
	<!-- Selective gradient overlay only in center area where content appears -->
	<div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-transparent"></div>

	<!-- Subtle pattern overlay -->
	<div class="absolute inset-0 opacity-10">
		<div
			class="absolute inset-0"
			style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0); background-size: 40px 40px;"
		></div>
	</div>

	<!-- Main content container -->
	<div class="relative z-10 w-full max-w-2xl mx-auto px-8">
		<!-- Glassmorphic card -->
		<div 
			class="transform transition-all duration-1000 {isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}"
		>
			<div class="glassmorphic-card relative min-h-[350px] overflow-hidden rounded-2xl border border-white/5 bg-white/2 shadow-2xl backdrop-blur-sm p-6 lg:p-8">
				<!-- Background Gradient -->
				<div class="absolute inset-0 opacity-5" style="background: linear-gradient(135deg, #C2A36E, #E6E6FA)"></div>
				
				<!-- Lock icon -->
				<div class="relative z-10 text-center mb-6">
					<div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#C2A36E] to-[#E6E6FA] rounded-full shadow-lg mb-4">
						<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
						</svg>
					</div>
					<h1 class="text-2xl lg:text-3xl font-bold text-white mb-3">
						Willkommen zur
						<span class="block bg-gradient-to-r from-[#C2A36E] to-[#E6E6FA] bg-clip-text text-transparent">
							Quantensprung Membership
						</span>
					</h1>
					<p class="text-lg text-white/90 leading-relaxed">
						Exklusive Inhalte für deinen persönlichen Quantensprung.
					</p>
				</div>

				<!-- Benefits grid -->
				<div class="relative z-10 grid md:grid-cols-2 gap-6 mb-8">
					<!-- Kurse & Videos -->
					<div class="benefit-card bg-white/3 rounded-xl p-4 border border-white/5 hover:border-[#C2A36E]/40 transition-all duration-300 backdrop-blur-sm">
						<div class="flex items-center mb-3">
							<div class="w-10 h-10 bg-gradient-to-br from-[#C2A36E] to-[#E6E6FA] rounded-full flex items-center justify-center mr-3">
								<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
								</svg>
							</div>
							<h3 class="text-lg font-semibold text-white">Kurse & Videos</h3>
						</div>
						<p class="text-white/90 text-sm leading-relaxed">
							Exklusive Lerninhalte und praktische Übungen basierend auf 40 Jahren Erfahrung.
						</p>
					</div>

					<!-- Transformation -->
					<div class="benefit-card bg-white/3 rounded-xl p-4 border border-white/5 hover:border-[#C2A36E]/40 transition-all duration-300 backdrop-blur-sm">
						<div class="flex items-center mb-3">
							<div class="w-10 h-10 bg-gradient-to-br from-[#C2A36E] to-[#E6E6FA] rounded-full flex items-center justify-center mr-3">
								<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
								</svg>
							</div>
							<h3 class="text-lg font-semibold text-white">Persönliche Begleitung</h3>
						</div>
						<p class="text-white/90 text-sm leading-relaxed">
							Individuelle Werkzeuge und Methoden für deinen persönlichen Quantensprung.
						</p>
					</div>
				</div>

				<!-- Status message -->
				<div class="relative z-10 text-center">
					<p class="text-white/90 text-lg">
						Das Membership-System ist in Entwicklung und wird bald verfügbar sein.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Glassmorphic cards with cinematic entrance */
	.glassmorphic-card {
		backdrop-filter: blur(2px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: rgba(255, 255, 255, 0.02);
		animation: cinematicEntrance 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		opacity: 0;
		transform: translateY(40px) scale(0.95);
	}

	.glassmorphic-card:hover {
		transform: translateY(-6px) scale(1.01);
		border-color: rgba(194, 163, 110, 0.3);
		background: rgba(255, 255, 255, 0.03);
		backdrop-filter: blur(4px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
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

	.benefit-card {
		backdrop-filter: blur(2px);
		transition: all 0.3s ease;
	}

	.benefit-card:hover {
		transform: translateY(-2px);
		background: rgba(255, 255, 255, 0.05);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
		border-color: rgba(194, 163, 110, 0.5);
	}

	/* Text styling */
	h1, h2, h3 {
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
		font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	p {
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
		font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.glassmorphic-card {
			padding: 1.25rem;
		}
		
		.benefit-card {
			padding: 1rem;
		}
	}
</style> 