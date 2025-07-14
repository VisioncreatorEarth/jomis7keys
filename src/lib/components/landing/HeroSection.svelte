<script>
    export let backgroundImage = null;
</script>

<section class="relative h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Image Container -->
    <div class="absolute inset-0 bg-white">
        {#if backgroundImage}
            <img 
                src={backgroundImage} 
                alt="Joachim & Michaela Andert - Retreat Leiter" 
                class="w-full h-full object-cover"
            />
            <!-- Stronger dark overlay for better text readability -->
            <div class="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/50"></div>
        {/if}
    </div>

    <!-- Hero Content -->
    <div class="relative z-10 w-full h-full flex items-center justify-end px-8 lg:px-16 pt-32">
        <div class="max-w-3xl mr-8 lg:mr-16 xl:mr-24">
            <!-- Main Headline with better spacing and stronger contrast -->

            <!-- Subheadline with improved spacing and stronger contrast -->
            <h2 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-12 font-semibold leading-relaxed text-right hero-subtitle" style="color: #E6E6FA;">
                Löse in 3 Tagen die tiefsitzenden Blockaden,<br>
                die dich seit Jahren zurückhalten.
            </h2>

            <!-- Description Text with better spacing and stronger contrast -->
            <p class="text-xl md:text-2xl lg:text-3xl mb-16 leading-relaxed font-medium text-right hero-description" style="color: #FFFFFF;">
                Befreie dich von endlosen Gedankenschleifen und emotionalen Reaktionen.<br>
                Erlebe echte Transformation mit bewährten Methoden aus 40 Jahren Erfahrung.
            </p>

            <!-- Call-to-Action with improved spacing and stronger prominence -->
            <div class="space-y-6 mb-20 text-right">
                <div class="space-y-3">
                    <button class="glassmorphic-button text-white font-bold py-6 px-16 rounded-full text-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 backdrop-blur-xl border border-white/30">
                        Beginne deine Transformation
                    </button>
                    
                    <p class="text-lg font-semibold" style="color: #C2A36E;">
                        → Jetzt anmelden
                    </p>
                </div>
                
                <p class="text-lg font-medium" style="color: #E6E6FA;">
                    Intensiv-Retreat im Chiemgau mit Alpenblick
                </p>
            </div>
        </div>

        <!-- Retreat Leaders Credit with better positioning -->
        <div class="absolute bottom-12 left-8 text-left">
            <p class="text-sm font-light mb-1" style="color: #E6E6FA;">
                von und mit
            </p>
            <p class="text-lg font-medium" style="color: #FFFFFF;">
                Joachim & Michaela Andert
            </p>
        </div>
    </div>

    <!-- Subtle scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6" style="color: #E6E6FA;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
    </div>
</section>

<style>
    /* Custom animations for enhanced visual appeal */
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

    h1, h2, p {
        animation: fadeInUp 0.8s ease-out;
    }

    h2 {
        animation-delay: 0.2s;
    }

    p {
        animation-delay: 0.4s;
    }

    button {
        animation: fadeInUp 0.8s ease-out;
        animation-delay: 0.6s;
    }

    /* Elegant text shadows for readability */
    .hero-title {
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .hero-subtitle {
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
        font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .hero-description {
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
        font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .hero-gradient {
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
    }

    .glassmorphic-button {
        background: rgba(194, 163, 110, 0.2);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25), 
                    0 0 20px rgba(194, 163, 110, 0.3);
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .glassmorphic-button:hover {
        background: rgba(194, 163, 110, 0.3);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3), 
                    0 0 40px rgba(194, 163, 110, 0.6) !important;
        border: 1px solid rgba(255, 255, 255, 0.4);
    }
</style> 