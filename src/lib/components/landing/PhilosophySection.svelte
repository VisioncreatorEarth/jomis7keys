<script>
    import { imageService } from '$lib/services/imageService.js';
    
    // Get background image from Appwrite
    const backgroundImage = imageService.getImageUrl('philosophy-bg');
</script>

<section class="relative py-16 lg:py-24 overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
        <img 
            src={backgroundImage}
            alt="Background"
            class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <!-- Content Container -->
    <div class="relative z-10 max-w-5xl mx-auto px-8">
        <!-- Header -->
        <div class="text-center mb-16">
            <p class="text-sm font-semibold uppercase tracking-widest mb-4" style="color: #C2A36E;">
                UNSER ANSATZ
            </p>
            <h2 class="text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
                Der
                <span class="block text-transparent bg-gradient-to-r bg-clip-text" style="background: linear-gradient(to right, #C2A36E, #E6E6FA); -webkit-background-clip: text; background-clip: text;">
                    wunde Punkt
                </span>
            </h2>
        </div>

        <!-- Philosophy Content Grid -->
        <div class="grid lg:grid-cols-3 gap-8 mb-16">
            <!-- Card 1 -->
            <div class="philosophy-card p-6 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20">
                <h3 class="text-xl font-semibold text-white mb-3">Was ist ein wunder Punkt?</h3>
                <p class="text-white/90 leading-relaxed">
                    Ein ungelöstes Erlebnis im Nervensystem, das emotional überreagieren lässt.
                </p>
            </div>

            <!-- Card 2 -->
            <div class="philosophy-card p-6 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20">
                <h3 class="text-xl font-semibold text-white mb-3">Wenn getroffen wird</h3>
                <p class="text-white/90 leading-relaxed">
                    Überreaktionen, endlose Gedankenschleifen, Ohnmacht - alte Wunden melden sich.
                </p>
            </div>

            <!-- Card 3 -->
            <div class="philosophy-card p-6 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20">
                <h3 class="text-xl font-semibold text-white mb-3">Der Weg zur Heilung</h3>
                <p class="text-white/90 leading-relaxed">
                    Heilung an der Wurzel - jede Zelle, jede Ebene will mit einbezogen sein.
                </p>
            </div>
        </div>

        <!-- Experience Highlight -->
        <div class="text-center">
            <div class="inline-block p-8 rounded-2xl backdrop-blur-lg bg-white/15 border border-white/30">
                <div class="mb-6">
                    <svg class="w-12 h-12 mx-auto mb-4" style="color: #C2A36E;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    <h3 class="text-2xl font-bold text-white mb-3">40 Jahre Erfahrung</h3>
                    <p class="text-lg text-white/90 leading-relaxed max-w-2xl">
                        Wir verbinden Atem, Gedanken und innere Reinigung mit der gezielten Lösung 
                        tiefsitzender emotionaler Konflikte.
                    </p>
                </div>
            </div>
        </div>

        <!-- Bottom Quote -->
        <div class="text-center mt-16">
            <blockquote class="text-xl lg:text-2xl font-light text-white italic leading-relaxed max-w-3xl mx-auto">
                "Du machst einen nachhaltigen Quantensprung in deinem Leben."
            </blockquote>
            <div class="mt-6">
                <p class="text-lg font-semibold" style="color: #C2A36E;">
                    Joachim & Michaela Andert
                </p>
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
    h2, h3 {
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    p {
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }
</style> 