<script>
	import { onMount } from 'svelte';

	let sectionElement;
	let isVisible = false;

	// Background image URL from Appwrite
	const backgroundImageUrl = 'https://fra.cloud.appwrite.io/v1/storage/buckets/6872736b0021a5826ece/files/6875182900077173e876/preview?project=68357409002d8b46f512&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbklkIjoiNjg3NTE4M2M4ZDU4NDIzMjAyOTQiLCJyZXNvdXJjZUlkIjoiNjg3MjczNmIwMDIxYTU4MjZlY2U6Njg3NTE4MjkwMDA3NzE3M2U4NzYiLCJyZXNvdXJjZVR5cGUiOiJmaWxlcyIsInJlc291cmNlSW50ZXJuYWxJZCI6IjI1MjQ0OjUiLCJleHAiOjkuMjIzMzcyMDM4NjA3MzU4ZSsxOH0.3zLqHqT7HepFH8VZD429ft94z-jxmFfkOm6dyOrWjMo';

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
					}
				});
			},
			{ threshold: 0.2 }
		);

		if (sectionElement) {
			observer.observe(sectionElement);
		}

		return () => {
			if (sectionElement) {
				observer.unobserve(sectionElement);
			}
		};
	});
</script>

<section 
	id="contact" 
	bind:this={sectionElement}
	class="relative min-h-screen overflow-hidden py-16 lg:py-24"
	style="background-image: url('{backgroundImageUrl}'); background-size: cover; background-position: center; background-repeat: no-repeat;"
	role="region"
	aria-label="Kontakt und Impressum"
>
	<!-- Background overlay for better readability -->
	<div class="absolute inset-0 bg-black/40"></div>

	<div class="relative z-10 mx-auto max-w-4xl px-8">
		<!-- Header -->
		<div class="mb-12 text-center">
			<!-- Tag -->
			<div class="mb-4 inline-block">
				<span
					class="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#C2A36E] backdrop-blur-sm"
				>
					Kontakt & Impressum
				</span>
			</div>

			<!-- Title -->
			<h2 class="mb-4 text-3xl leading-tight font-bold text-white lg:text-4xl">
				Kontaktieren Sie
				<span
					class="block bg-gradient-to-r bg-clip-text text-transparent"
					style="background: linear-gradient(to right, #C2A36E, #E6E6FA); -webkit-background-clip: text; background-clip: text;"
				>
					uns
				</span>
			</h2>

			<!-- Subtitle -->
			<p class="mx-auto max-w-2xl text-base leading-relaxed text-white/90">
				Wir sind für Sie da. Nehmen Sie Kontakt mit uns auf oder informieren Sie sich über unsere Geschäftsdaten.
			</p>
		</div>

		<!-- Contact Content Grid -->
		<div class="grid gap-6 lg:grid-cols-2">
			<!-- Contact Information Card -->
			<div 
				class="glassmorphic-card transform transition-all duration-1000 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}"
				style="animation-delay: 0.2s;"
			>
				<div class="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl">
					<div class="mb-6 text-center">
						<h3 class="mb-3 text-xl font-bold text-white">
							Kontakt
						</h3>
						<div class="mx-auto h-0.5 w-12 bg-gradient-to-r from-[#C2A36E] to-[#E6E6FA] rounded-full"></div>
					</div>

					<div class="space-y-4">
						<!-- Email -->
						<div class="flex items-center space-x-3">
							<div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#C2A36E]/20">
								<svg class="h-5 w-5 text-[#C2A36E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
								</svg>
							</div>
							<div>
								<p class="text-xs font-medium text-white/70">E-Mail</p>
								<p class="text-sm font-semibold text-white">info@jomis7keys.de</p>
							</div>
						</div>

						<!-- Phone -->
						<div class="flex items-center space-x-3">
							<div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#C2A36E]/20">
								<svg class="h-5 w-5 text-[#C2A36E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
								</svg>
							</div>
							<div>
								<p class="text-xs font-medium text-white/70">Telefon</p>
								<p class="text-sm font-semibold text-white">+49 (0) 123 456 789</p>
							</div>
						</div>

						<!-- Address -->
						<div class="flex items-start space-x-3">
							<div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#C2A36E]/20">
								<svg class="h-5 w-5 text-[#C2A36E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
								</svg>
							</div>
							<div>
								<p class="text-xs font-medium text-white/70">Adresse</p>
								<p class="text-sm font-semibold text-white">Guntersberg im Chiemgau</p>
								<p class="text-sm text-white/80">83224 Grassau, Deutschland</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Booking System Card -->
			<div 
				class="glassmorphic-card transform transition-all duration-1000 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}"
				style="animation-delay: 0.4s;"
			>
				<div class="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl">
					<div class="mb-6 text-center">
						<h3 class="mb-3 text-xl font-bold text-white">
							Buchungssystem
						</h3>
						<div class="mx-auto h-0.5 w-12 bg-gradient-to-r from-[#C2A36E] to-[#E6E6FA] rounded-full"></div>
					</div>

					<div class="space-y-4 text-center">
						<!-- Coming Soon Icon -->
						<div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E6E6FA]/20">
							<svg class="h-8 w-8 text-[#E6E6FA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
						</div>

						<!-- Coming Soon Message -->
						<div class="space-y-3">
							<h4 class="text-lg font-bold text-white">
								Membership & Booking System
							</h4>
							<p class="text-lg font-bold text-[#C2A36E]">
								Coming Soon
							</p>
							<p class="text-sm leading-relaxed text-white/80">
								Wir entwickeln gerade ein modernes Buchungssystem für Sie. Bis dahin kontaktieren Sie uns gerne direkt per E-Mail oder Telefon.
							</p>
						</div>

						<!-- Temporary Contact Button -->
						<div class="pt-3">
							<a
								href="mailto:info@jomis7keys.de"
								class="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-2xl"
							>
								<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
								</svg>
								Jetzt E-Mail senden
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>

					<!-- Impressum Section -->
		<div class="mt-12">
			<div 
				class="glassmorphic-card transform transition-all duration-1000 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}"
				style="animation-delay: 0.6s;"
			>
				<div class="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl">
					<div class="mb-6 text-center">
						<h3 class="mb-3 text-xl font-bold text-white">
							Impressum
						</h3>
						<div class="mx-auto h-0.5 w-12 bg-gradient-to-r from-[#C2A36E] to-[#E6E6FA] rounded-full"></div>
					</div>

					<div class="grid gap-6 md:grid-cols-2">
						<!-- Legal Information -->
						<div class="space-y-3">
							<h4 class="text-sm font-semibold text-[#C2A36E]">Angaben gemäß § 5 TMG</h4>
							<div class="space-y-1 text-white/90">
								<p class="text-sm"><strong>Joachim & Michaela Andert</strong></p>
								<p class="text-sm">Quantensprung - Die 7 Schlüssel zur Befreiung</p>
								<p class="text-sm">Guntersberg im Chiemgau</p>
								<p class="text-sm">83224 Grassau, Deutschland</p>
							</div>
						</div>

						<!-- Contact Legal -->
						<div class="space-y-3">
							<h4 class="text-sm font-semibold text-[#C2A36E]">Kontakt</h4>
							<div class="space-y-1 text-white/90">
								<p class="text-sm"><strong>E-Mail:</strong> info@jomis7keys.de</p>
								<p class="text-sm"><strong>Telefon:</strong> +49 (0) 123 456 789</p>
								<p class="text-sm"><strong>Verantwortlich für den Inhalt:</strong> Joachim & Michaela Andert</p>
							</div>
						</div>
					</div>

					<!-- Legal Footer -->
					<div class="mt-6 border-t border-white/20 pt-4">
						<p class="text-center text-xs text-white/70">
							Alle Angaben ohne Gewähr. Änderungen und Irrtümer vorbehalten.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Glassmorphic card effects */
	.glassmorphic-card {
		transition: all 0.3s ease;
	}

	.glassmorphic-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
	}

	/* Smooth scroll target */
	#contact {
		scroll-margin-top: 80px;
	}

	/* Animation delays */
	.glassmorphic-card:nth-child(1) {
		animation-delay: 0.2s;
	}
	.glassmorphic-card:nth-child(2) {
		animation-delay: 0.4s;
	}
	.glassmorphic-card:nth-child(3) {
		animation-delay: 0.6s;
	}
</style> 