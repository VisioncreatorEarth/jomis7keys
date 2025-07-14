<script>
	import { imageService } from '$lib/services/imageService.js';

	// Get background image from Appwrite
	const backgroundImage = imageService.getImageUrl('philosophy-bg');
</script>

<section class="relative overflow-hidden py-16 lg:py-24">
	<!-- Background Image -->
	<div class="absolute inset-0 z-0">
		<img src={backgroundImage} alt="Background" class="h-full w-full object-cover" />
		<div class="absolute inset-0 bg-black/40"></div>
	</div>

	<!-- Content Container -->
	<div class="relative z-10 mx-auto max-w-5xl px-8">
		<!-- Header -->
		<div class="mb-16 text-center">
			<p class="mb-4 text-sm font-semibold tracking-widest uppercase" style="color: #C2A36E;">
				UNSER ANSATZ
			</p>
			<h2 class="mb-6 text-3xl leading-tight font-bold text-white lg:text-4xl">
				Der
				<span
					class="block bg-gradient-to-r bg-clip-text text-transparent"
					style="background: linear-gradient(to right, #C2A36E, #E6E6FA); -webkit-background-clip: text; background-clip: text;"
				>
					wunde Punkt
				</span>
			</h2>
		</div>

		<!-- Philosophy Content Grid -->
		<div class="mb-16 grid gap-8 lg:grid-cols-3">
			<!-- Card 1 -->
			<div
				class="philosophy-card rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg"
			>
				<h3 class="mb-3 text-xl font-semibold text-white">Was ist ein wunder Punkt?</h3>
				<p class="leading-relaxed text-white/90">
					Ein ungelöstes Erlebnis im Nervensystem, das emotional überreagieren lässt.
				</p>
			</div>

			<!-- Card 2 -->
			<div
				class="philosophy-card rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg"
			>
				<h3 class="mb-3 text-xl font-semibold text-white">Wenn getroffen wird</h3>
				<p class="leading-relaxed text-white/90">
					Überreaktionen, endlose Gedankenschleifen, Ohnmacht - alte Wunden melden sich.
				</p>
			</div>

			<!-- Card 3 -->
			<div
				class="philosophy-card rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg"
			>
				<h3 class="mb-3 text-xl font-semibold text-white">Der Weg zur Heilung</h3>
				<p class="leading-relaxed text-white/90">
					Heilung an der Wurzel - jede Zelle, jede Ebene will mit einbezogen sein.
				</p>
			</div>
		</div>

		<!-- Experience Highlight -->
		<div class="text-center">
			<div class="inline-block rounded-2xl border border-white/30 bg-white/15 p-8 backdrop-blur-lg">
				<div class="mb-6">
					<svg
						class="mx-auto mb-4 h-12 w-12"
						style="color: #C2A36E;"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						></path>
					</svg>
					<h3 class="mb-3 text-2xl font-bold text-white">40 Jahre Erfahrung</h3>
					<p class="max-w-2xl text-lg leading-relaxed text-white/90">
						Wir verbinden Atem, Gedanken und innere Reinigung mit der gezielten Lösung tiefsitzender
						emotionaler Konflikte.
					</p>
				</div>
			</div>
		</div>

		<!-- Bottom Quote -->
		<div class="mt-16 text-center">
			<blockquote
				class="mx-auto max-w-3xl text-xl leading-relaxed font-light text-white italic lg:text-2xl"
			>
				"Du machst einen nachhaltigen Quantensprung in deinem Leben."
			</blockquote>
			<div class="mt-6">
				<p class="text-lg font-semibold" style="color: #C2A36E;">Joachim & Michaela Andert</p>
			</div>
		</div>
	</div>
</section>

<style>
	/* Animations */
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

	@keyframes slideInLeft {
		from {
			opacity: 0;
			transform: translateX(-30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	/* Cards */
	.philosophy-card {
		animation: slideInLeft 1s ease-out;
		font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		transition: all 0.3s ease;
	}

	.philosophy-card:nth-child(2) {
		animation-delay: 0.2s;
	}

	.philosophy-card:nth-child(3) {
		animation-delay: 0.4s;
	}

	.philosophy-card:hover {
		transform: translateY(-5px);
		background: rgba(255, 255, 255, 0.2);
		border-color: rgba(194, 163, 110, 0.5);
	}

	/* Quote */
	blockquote {
		animation: fadeInUp 1.4s ease-out;
		font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	/* Text shadows for better readability */
	h2,
	h3 {
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	p {
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	}
</style>
