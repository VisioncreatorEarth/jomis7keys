<script>
    import { imageService } from '$lib/services/imageService.js';
    
    export let backgroundImage = null;
    
    // Get video from Appwrite
    const videoSource = imageService.getImageUrl('hero-video');
</script>

<section class="relative h-screen overflow-hidden flex items-center justify-center">
    <!-- Video Background -->
    <div class="absolute inset-0">
        <video 
            autoplay 
            muted 
            loop 
            playsinline
            class="w-full h-full object-cover"
        >
            <source src={videoSource} type="video/quicktime">
            <source src={videoSource} type="video/mp4">
        </video>
        <!-- Cinematic overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
    </div>

    <!-- Glassmorphic Content Overlay -->
    <div class="relative z-10 text-center max-w-2xl mx-auto px-8">
        <!-- Header -->
        <div class="mb-16">
            <p class="text-lg font-semibold uppercase tracking-widest mb-6 glassmorphic-text" style="color: #C2A36E;">
                AKTUELL
            </p>
            <h2 class="text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight cinematic-title">
                Die nächsten
                <span class="block text-transparent bg-gradient-to-r bg-clip-text cinematic-gradient" style="background: linear-gradient(to right, #C2A36E, #E6E6FA); -webkit-background-clip: text; background-clip: text;">
                    Termine
                </span>
            </h2>
        </div>

        <!-- Glassmorphic Dates Container -->
        <div class="glassmorphic-container p-8 rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl">
            <div class="space-y-8">
                <!-- Location -->
                <div class="text-center mb-8">
                    <div class="flex items-center justify-center space-x-3 mb-3">
                        <svg class="w-6 h-6" style="color: #C2A36E;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <p class="text-xl font-semibold text-white">Guntersberg mit Alpenblick im Chiemgau</p>
                    </div>
                    <p class="text-base text-white/80">(4-8 Teilnehmer)</p>
                </div>

                <!-- Dates Grid -->
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="date-card p-6 rounded-2xl backdrop-blur-sm border border-white/10" style="background: rgba(194, 163, 110, 0.15);">
                        <div class="text-center">
                            <p class="text-base font-medium text-white/80 mb-2">Retreat 1</p>
                            <p class="text-3xl font-bold text-white mb-2">24. - 27.</p>
                            <p class="text-xl font-semibold" style="color: #C2A36E;">Juli 2025</p>
                        </div>
                    </div>

                    <div class="date-card p-6 rounded-2xl backdrop-blur-sm border border-white/10" style="background: rgba(194, 163, 110, 0.15);">
                        <div class="text-center">
                            <p class="text-base font-medium text-white/80 mb-2">Retreat 2</p>
                            <p class="text-3xl font-bold text-white mb-2">14. - 17.</p>
                            <p class="text-xl font-semibold" style="color: #C2A36E;">August 2025</p>
                        </div>
                    </div>
                </div>

                <!-- CTA Button -->
                <div class="pt-6">
                    <button class="cta-button text-white font-bold py-4 px-12 rounded-full text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20" style="background: linear-gradient(135deg, #C2A36E, #E6E6FA, #C2A36E);">
                        Jetzt Platz sichern
                    </button>
                    <p class="text-white/70 mt-3 text-base">
                        Begrenzte Teilnehmerzahl - Frühe Anmeldung empfohlen
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    /* Cinematic animations */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes glow {
        0%, 100% {
            text-shadow: 0 0 20px rgba(194, 163, 110, 0.5);
        }
        50% {
            text-shadow: 0 0 30px rgba(194, 163, 110, 0.8);
        }
    }

    /* Glassmorphic container */
    .glassmorphic-container {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
        animation: scaleIn 1s ease-out;
    }

    /* Cinematic title */
    .cinematic-title {
        animation: fadeInUp 1.2s ease-out;
        text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
        font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .cinematic-gradient {
        animation: glow 3s ease-in-out infinite;
    }

    /* Glassmorphic text */
    .glassmorphic-text {
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        animation: fadeInUp 1s ease-out;
        font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    /* Date cards */
    .date-card {
        animation: fadeInUp 1.4s ease-out;
        transition: all 0.3s ease;
        font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .date-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(194, 163, 110, 0.3);
    }

    .date-card:nth-child(2) {
        animation-delay: 0.2s;
    }

    /* CTA Button */
    .cta-button {
        animation: fadeInUp 1.6s ease-out;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .cta-button:hover {
        box-shadow: 0 20px 40px rgba(0,0,0,0.4), 
                    0 0 30px rgba(194,163,110,0.6) !important;
    }

    /* Video background styling */
    video {
        filter: brightness(0.7) contrast(1.1);
    }
</style> 