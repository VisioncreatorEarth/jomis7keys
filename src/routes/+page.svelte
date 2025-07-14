<script>
	import HeroSection from '$lib/components/landing/HeroSection.svelte';
	import PhilosophySection from '$lib/components/landing/PhilosophySection.svelte';
	import OffersSection from '$lib/components/landing/OffersSection.svelte';
	import AktuellSection from '$lib/components/landing/AktuellSection.svelte';
	import TestimonialSection from '$lib/components/landing/TestimonialSection.svelte';
	import UeberUnsSection from '$lib/components/landing/UeberUnsSection.svelte';
	import { imageService } from '$lib/services/imageService.js';

	// Use Appwrite image for hero section
	const heroBackground = imageService.getImageUrl('joachim-michaela-garden');
</script>

<!-- Hero Section -->
<HeroSection backgroundImage={heroBackground} />

<!-- Philosophy Section -->
<PhilosophySection />

<!-- Offers Section -->
<OffersSection />

<!-- Aktuell Section -->
<AktuellSection />

<!-- Testimonial Section -->
<TestimonialSection />

<!-- Über Uns Section -->
<UeberUnsSection />
