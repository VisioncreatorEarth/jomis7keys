<script>
	import { onMount } from 'svelte';

	let sectionElement;
	let isVisible = false;
	let expandedCards = new Set(); // Track which cards are expanded

	// Background image URL from Appwrite
	const backgroundImageUrl =
		'https://fra.cloud.appwrite.io/v1/storage/buckets/6872736b0021a5826ece/files/68763ab4002a3efa2954/preview?project=68357409002d8b46f512&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbklkIjoiNjg3NjNhYmRjOTVhODM5MDVlNDgiLCJyZXNvdXJjZUlkIjoiNjg3MjczNmIwMDIxYTU4MjZlY2U6Njg3NjNhYjQwMDJhM2VmYTI5NTQiLCJyZXNvdXJjZVR5cGUiOiJmaWxlcyIsInJlc291cmNlSW50ZXJuYWxJZCI6IjI1MjQ0OjEzIiwiZXhwIjo5LjIyMzM3MjAzODYwNzM1NGUrMTh9.zl4mRZz4NR-WqoZdFuinT2Y3H133-tFW3dQfNdbiWIA';

	// Toggle expansion of a testimonial card
	function toggleExpansion(index) {
		if (expandedCards.has(index)) {
			expandedCards.delete(index);
		} else {
			expandedCards.add(index);
		}
		expandedCards = new Set(expandedCards); // Trigger reactivity
	}

	// Real testimonials from retreat participants (first 6 testimonials)
	const testimonials = [
		{
			name: 'Maria-Luisa',
			avatar: 'ML',
			text: 'Ich schwebe die ganze Zeit wie auf Wolke 7 und bin durch und durch glücklich. Ich fühle mich um ein Vielfaches leichter. Ein RIESEN-Dankeschön! ❤️',
			full: 'Ich schwebe die ganze Zeit hier in meinem Haus wie auf Wolke 7 und bin durch und durch glücklich. Ich habe sogar vergessen zu essen 😊😊😊 Die letzte Mahlzeit war gestern nach dem Kurs, ein kleiner Spezial-Kakao-Shake vom Joachim. Ich fühle mich um ein Vielfaches leichter (obwohl sich an der Waage nicht geändert hat 😂😂😂) Mein Kopf mag nicht denken. Der ist noch voll von dem Wochenende an Erkenntnissen und Eindrücke, die verarbeitet werden wollen. Ein RIESEN-Dankeschön an ALLE, die das möglich gemacht haben ❤️❤️❤️'
		},
		{
			name: 'Verena',
			avatar: 'V',
			text: "Das 'systemische Brettspiel' bringt einiges ans Tageslicht, wovon ich vorher überhaupt keinen Schimmer hatte. Immer wieder ins Fühlen kommen - das ist wertvoll und einzigartig.",
			full: "Ich bin mit vielen Themen hierher gekommen, mit Themen, die ich nicht greifen konnte. Wo ich nur gewusst hab', es drängt richtig nach einer Veränderung. Aber dadurch, dass es in so tiefen Schichten verborgen war, hatte ich überhaupt keine Idee, was es sein könnte und wie es zu einer Lösung kommen könnte. Doch so ein 'systemisches Brettspiel' bringt dann doch einiges ans Tageslicht, wovon ich vorher überhaupt keinen Schimmer hatte. Dann die brillante Anleitung, immer wieder ins Fühlen zu kommen, und immer wieder an den Atem erinnert zu werden und immer wieder an das primäre Menschsein erinnert zu werden, was es bedeutet Mensch zu sein. Das ist dann doch sehr wertvoll und einzigartig."
		},
		{
			name: 'Cornelia',
			avatar: 'C',
			text: 'Mein Weg mit Jo&Mi begann vor anderthalb Jahren. Die Befreiung von uraltem Ballast hat bewirkt, dass ein Mann in mein Leben kommen konnte. Ein Riesendank! 🙏',
			full: "Ein Erfahrungsbericht von mir, was durch das Retreat möglich ist: mein Weg mit Jo&Mi hat vor circa anderthalb Jahren begonnen und was seither in meinem Leben passiert ist, ist wirklich erstaunlich. Im letzten Jahr konnte ich mich dank dieser Arbeit von zwei Riesen-'Klöpsen' aus einer früheren Inkarnation und aus dem vorgeburtlichen Raum befreien. Diese Befreiung von uraltem Ballast hat bewirkt, dass vor kurzem ein Mann in mein Leben kommen konnte zu einem Zeitpunkt als ich das Thema 'Mann in meinem Leben' als unerfüllbar abgelegt habe. Ein Riesendank an die Liebende Quelle Allen Seins und an JoMi, die diesen Weg für mich eröffnet haben."
		},
		{
			name: 'Elena',
			avatar: 'E',
			text: 'Nach 2,5 Jahren waren so viele Quantensprünge möglich. Ich schick meine Dankbarkeit über das Quantenfeld zu euch. Die Welt ist der Spiegel meiner Seele. ❤️🙏',
			full: 'Lieber Joachim und Michaela, vor ca. 2,5 Jahren war ich erstes mal bei euch. Damals habe ich mich erst auf diesen Weg getraut und habe nicht alles verstanden, was und wieso im Leben das und dies geschiet. Ich habe nur im Herzen gespürt, dass ich mich bei euch so geboren und gut fühle. Nach diese Zeit, waren so viele Quantensprünge, dass ich gar nicht meine Dankbarkeit in Worte fassen kann. Ich schick meine Dankbarkeit einfach über Quantenfeld zu euch❤️🙏. DASS DIE Welt der Spiegel meiner Seele ist.'
		},
		{
			name: 'Dankbare Teilnehmerin',
			avatar: 'DT',
			text: 'Nach 6 Jahren Erfahrung mit Joachim und Michaela bin ich zutiefst DANKBAR 💝 Bin ich einfach nur glücklich. Ich bin stabil in mir geworden.',
			full: 'Wenn ich nun auf 6 Jahre Erfahrung mit Joachim und Michaela zurück blicke, dann bin ich zutiefst DANKBAR💝 Ich habe nie gedacht, dass ich jetzt so wie es ist zurück blicken darf... Bin ich einfach nur glücklich 💕 Was ich auch fühlen kann ist, das meine Wahrnehmung im Aussen sich so verändert hat und ich so viel Dankbarkeit spüre, ich stabil in mir geworden bin. Das was da draussen abgeht mir keine Angst mehr macht.'
		},
		{
			name: 'Marcus',
			avatar: 'M',
			text: 'Diese drei Tage haben mein Leben verändert. Die Arbeit mit den wunden Punkten hat mir gezeigt, wo meine wahren Blockaden lagen. Ich fühle mich wie neugeboren!',
			full: 'Diese drei Tage haben mein Leben verändert. Ich konnte endlich loslassen, was mich jahrelang belastet hat. Die Arbeit mit den wunden Punkten hat mir gezeigt, wo meine wahren Blockaden lagen. Joachim und Michaela haben mich mit so viel Liebe und Achtsamkeit durch diesen Prozess geführt. Ich fühle mich wie neugeboren!'
		}
	];

	onMount(() => {
		// Make cards visible immediately as fallback
		setTimeout(() => {
			isVisible = true;
		}, 100);

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
	class="relative overflow-hidden py-16 lg:py-24"
	style="background-image: url('{backgroundImageUrl}'); background-size: cover; background-position: center; background-repeat: no-repeat;"
>
	<!-- Selective gradient overlay only in center area where content appears -->
	<div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-transparent"></div>

	<!-- Subtle pattern overlay -->
	<div class="absolute inset-0 opacity-10">
		<div
			class="absolute inset-0"
			style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0); background-size: 20px 20px;"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-7xl px-8">
		<!-- Header -->
		<div class="mb-16 text-center">
			<!-- Tag -->
			<div class="mb-6 inline-block">
				<span
					class="inline-flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-purple-800 backdrop-blur-sm"
				>
					Erfahrungen unserer Teilnehmer
				</span>
			</div>

			<!-- Title -->
			<h2 class="mb-6 text-4xl leading-tight font-bold text-white lg:text-5xl xl:text-6xl">
				Unsere Wand der
				<span
					class="block bg-gradient-to-r bg-clip-text text-transparent"
					style="background: linear-gradient(to right, #C2A36E, #FFD700); -webkit-background-clip: text; background-clip: text;"
				>
					Transformation
				</span>
			</h2>

			<!-- Subtitle -->
			<p class="mx-auto max-w-3xl text-xl leading-relaxed text-white/90">
				Lesen Sie, was unsere Teilnehmer über ihre lebensverändernde Erfahrung beim Quantensprung
				Retreat sagen.
			</p>
		</div>

		<!-- Testimonials Grid -->
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
			{#each testimonials as testimonial, index (index)}
				<div
					class="testimonial-card glassmorphic-card rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-xl lg:p-8"
					class:animate-in={isVisible}
					class:expanded={expandedCards.has(index)}
					style="animation-delay: {index * 100}ms"
				>
					<!-- Testimonial Text -->
					<div class="mb-6">
						<blockquote class="leading-relaxed font-medium text-white">
							"{expandedCards.has(index) && testimonial.full ? testimonial.full : testimonial.text}"
						</blockquote>

						<!-- Read More/Less Button -->
						{#if testimonial.full}
							<button
								class="mt-3 text-sm font-semibold text-[#C2A36E] transition-colors duration-200 hover:text-[#FFD700]"
								on:click={() => toggleExpansion(index)}
							>
								{expandedCards.has(index) ? 'Weniger lesen' : 'Mehr lesen'}
							</button>
						{/if}
					</div>

					<!-- Author Info -->
					<div class="flex items-center space-x-4">
						<!-- Avatar -->
						<div
							class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C2A36E] to-[#8B7355] text-sm font-bold text-white shadow-lg"
						>
							{testimonial.avatar}
						</div>

						<!-- Name -->
						<div class="min-w-0 flex-1">
							<div class="truncate font-semibold text-white">
								{testimonial.name}
							</div>
							<div class="text-sm text-white/70">
								Retreat Teilnehmer{testimonial.name.includes('in') ? 'in' : ''}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.glassmorphic-card {
		backdrop-filter: blur(20px);
		transition: all 0.3s ease;
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.1);
	}

	.glassmorphic-card:hover {
		transform: translateY(-4px);
		border-color: rgba(194, 163, 110, 0.4);
		background: rgba(255, 255, 255, 0.15);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
	}

	.glassmorphic-button {
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
	}

	.glassmorphic-button:hover {
		box-shadow: 0 8px 32px rgba(194, 163, 110, 0.4);
	}

	.testimonial-card {
		opacity: 1; /* Start visible */
		transform: translateY(0); /* Start in position */
		transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		max-height: 350px; /* Base height for mobile */
		overflow: hidden;
	}

	.testimonial-card.expanded {
		max-height: none; /* Allow expansion */
	}

	.testimonial-card.animate-in {
		opacity: 1;
		transform: translateY(0);
		animation: slideInUp 0.6s ease-out forwards;
	}

	@keyframes slideInUp {
		from {
			opacity: 0.8;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Staggered animation delays */
	.testimonial-card:nth-child(1) {
		animation-delay: 0ms;
	}
	.testimonial-card:nth-child(2) {
		animation-delay: 100ms;
	}
	.testimonial-card:nth-child(3) {
		animation-delay: 200ms;
	}
	.testimonial-card:nth-child(4) {
		animation-delay: 300ms;
	}
	.testimonial-card:nth-child(5) {
		animation-delay: 400ms;
	}
	.testimonial-card:nth-child(6) {
		animation-delay: 500ms;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.testimonial-card {
			margin-bottom: 1rem;
			max-height: 280px; /* Smaller base height on mobile */
			padding: 1rem; /* Reduce padding on mobile */
		}

		.testimonial-card blockquote {
			font-size: 0.875rem; /* Smaller text on mobile */
			line-height: 1.5;
		}
	}

	@media (min-width: 1024px) {
		.testimonial-card {
			max-height: 400px; /* Larger base height on desktop */
		}
	}
</style>
