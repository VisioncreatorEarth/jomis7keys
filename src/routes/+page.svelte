<script>
    import { currentUser } from '$lib/stores/userStore';
    import HeroSection from '$lib/components/landing/HeroSection.svelte';
    import AktuellSection from '$lib/components/landing/AktuellSection.svelte';
    
    // Import the background image for hero section
    import heroBackground from '$lib/images/Still 2025-07-12 105710_1.5.1.jpg';
    // import aktuellBackground from '$lib/images/your-aktuell-background.jpg';
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
    
    <!-- Current Dates Section -->
    <AktuellSection backgroundImage={aktuellBackground} />
    
    <!-- Future sections will go here -->
    <!-- 
    <section>More content sections...</section>
    -->
</div> 