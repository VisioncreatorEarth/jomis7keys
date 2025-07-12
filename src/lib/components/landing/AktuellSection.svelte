<script>
    export let backgroundImage = null;
</script>

<section class="relative py-24 lg:py-32 overflow-hidden">
    <!-- Background Image Container -->
    <div class="absolute inset-0">
        {#if backgroundImage}
            <img 
                src={backgroundImage} 
                alt="Retreat location" 
                class="w-full h-full object-cover"
            />
            <!-- Light overlay for text readability -->
            <div class="absolute inset-0 bg-gradient-to-r from-black/20 to-black/10"></div>
        {:else}
            <!-- Clean gradient background -->
            <div class="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-yellow-50"></div>
        {/if}
    </div>

    <!-- Content with improved spacing -->
    <div class="relative z-10 max-w-7xl mx-auto px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
            
            <!-- Left side - Text Content with better spacing -->
            <div class="space-y-12">
                <!-- AKTUELL Header with more breathing room -->
                <div class="text-center lg:text-left">
                    <p class="text-sm font-semibold text-amber-600 uppercase tracking-widest mb-4">
                        AKTUELL
                    </p>
                    <h2 class="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 leading-tight mb-6">
                        Die nächsten Termine
                    </h2>
                    <p class="text-xl text-gray-600 font-light">
                        (4-8 Teilnehmer)
                    </p>
                </div>

                <!-- Location with cleaner design -->
                <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100">
                    <div class="flex items-start space-x-4">
                        <svg class="w-7 h-7 text-amber-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <div>
                            <h3 class="font-semibold text-gray-800 text-xl mb-2">Ort</h3>
                            <p class="text-gray-600 text-lg leading-relaxed">Guntersberg mit Alpenblick im Chiemgau</p>
                        </div>
                    </div>
                </div>

                <!-- Dates with improved spacing -->
                <div class="space-y-6">
                    <div class="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-8 border border-amber-200 shadow-sm">
                        <div class="flex items-center space-x-4">
                            <svg class="w-7 h-7 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <div>
                                <h4 class="font-semibold text-gray-800 text-lg mb-1">Retreat 1</h4>
                                <p class="text-2xl font-bold text-amber-700">24. - 27. Juli 2025</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-8 border border-amber-200 shadow-sm">
                        <div class="flex items-center space-x-4">
                            <svg class="w-7 h-7 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <div>
                                <h4 class="font-semibold text-gray-800 text-lg mb-1">Retreat 2</h4>
                                <p class="text-2xl font-bold text-amber-700">14. - 17. August 2025</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Call to Action with better spacing -->
                <div class="pt-8">
                    <button class="w-full lg:w-auto bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-semibold py-5 px-14 rounded-full text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                        Jetzt Platz sichern
                    </button>
                    <p class="text-sm text-gray-500 mt-4 font-light">
                        Begrenzte Teilnehmerzahl - Frühe Anmeldung empfohlen
                    </p>
                </div>
            </div>

            <!-- Right side - Cleaner image placeholder -->
            <div class="lg:order-last">
                <div class="bg-white/90 backdrop-blur-sm rounded-3xl p-10 text-center border border-amber-100 shadow-lg">
                    <!-- Placeholder for retreat image -->
                    <div class="w-full h-80 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-2xl flex items-center justify-center mb-8">
                        <div class="text-center">
                            <svg class="w-20 h-20 text-amber-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                            <p class="text-amber-700 font-semibold text-lg">Alpenpanorama</p>
                            <p class="text-amber-600">Guntersberg</p>
                        </div>
                    </div>
                    
                    <h3 class="text-2xl font-semibold text-gray-800 mb-4">
                        Idyllische Bergkulisse
                    </h3>
                    <p class="text-gray-600 leading-relaxed text-lg">
                        Finde deine innere Ruhe in der majestätischen Alpenlandschaft. 
                        Ein Ort der Kraft und Transformation.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    /* Subtle animation for the cards */
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .bg-gradient-to-r {
        animation: slideInUp 0.6s ease-out;
    }

    .bg-gradient-to-r:nth-child(2) {
        animation-delay: 0.2s;
    }
</style> 