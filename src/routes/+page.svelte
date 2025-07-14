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

<svelte:head>
    <title>Quantensprung Retreat - Die 7 Schlüssel zur Befreiung</title>
    <meta name="description" content="Löse in 3 Tagen die tiefsitzenden Blockaden, die dich seit Jahren zurückhalten. Intensiv-Retreat im Chiemgau mit Joachim & Michaela Andert." />
    <meta name="keywords" content="Quantensprung Retreat, 7 Schlüssel, Befreiung, Transformation, wunde Punkte, Chiemgau, Joachim Michaela Andert" />
</svelte:head>

<div class="min-h-screen w-full">
    <!-- Hero Section -->
    <HeroSection backgroundImage={heroBackground} />
    
    <!-- Philosophy Section -->
    <PhilosophySection />
    
    <!-- Current Dates Section -->
    <AktuellSection backgroundImage={aktuellBackground} />
    
    <!-- Über Uns Section -->
    <UeberUnsSection />
    
    <!-- Future sections will go here -->
    <!-- 
    <section>More content sections...</section>
    -->
</div> 