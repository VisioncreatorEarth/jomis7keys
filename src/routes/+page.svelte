<script>
	import { currentUser } from '$lib/stores/userStore';
	import HeroSection from '$lib/components/landing/HeroSection.svelte';
	import PhilosophySection from '$lib/components/landing/PhilosophySection.svelte';
	import UeberUnsSection from '$lib/components/landing/UeberUnsSection.svelte';
	import AktuellSection from '$lib/components/landing/AktuellSection.svelte';
	import { imageService } from '$lib/services/imageService.js';

	// Use Appwrite image for hero section
	const heroBackground = imageService.getImageUrl('joachim-michaela-garden');
	const aktuellBackground = null; // Keep gradient background for now
</script>

<!-- Hero Section -->
<HeroSection backgroundImage={heroBackground} />

<!-- Philosophy Section -->
<PhilosophySection />

<!-- Über Uns Section -->
<UeberUnsSection />

<!-- Aktuell Section -->
<AktuellSection backgroundImage={aktuellBackground} />
