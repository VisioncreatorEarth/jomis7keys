<script>
    import { onMount } from 'svelte';
    
    let sectionElement;
    let isVisible = false;
    let expandedCards = new Set(); // Track which cards are expanded
    
    // Toggle expansion of a testimonial card
    function toggleExpansion(index) {
        if (expandedCards.has(index)) {
            expandedCards.delete(index);
        } else {
            expandedCards.add(index);
        }
        expandedCards = new Set(expandedCards); // Trigger reactivity
    }
    
    // Real testimonials from retreat participants (shortened for readability)
    const testimonials = [
        {
            name: "Maria-Luisa",
            avatar: "ML",
            text: "Ich schwebe die ganze Zeit wie auf Wolke 7 und bin durch und durch glücklich. Ich fühle mich um ein Vielfaches leichter. Ein RIESEN-Dankeschön! ❤️",
            full: "Ich schwebe die ganze Zeit hier in meinem Haus wie auf Wolke 7 und bin durch und durch glücklich. Ich habe sogar vergessen zu essen 😊😊😊 Die letzte Mahlzeit war gestern nach dem Kurs, ein kleiner Spezial-Kakao-Shake vom Joachim. Ich fühle mich um ein Vielfaches leichter (obwohl sich an der Waage nicht geändert hat 😂😂😂) Mein Kopf mag nicht denken. Der ist noch voll von dem Wochenende an Erkenntnissen und Eindrücke, die verarbeitet werden wollen. Ein RIESEN-Dankeschön an ALLE, die das möglich gemacht haben ❤️❤️❤️"
        },
        {
            name: "Verena",
            avatar: "V",
            text: "Das 'systemische Brettspiel' bringt einiges ans Tageslicht, wovon ich vorher überhaupt keinen Schimmer hatte. Immer wieder ins Fühlen kommen - das ist wertvoll und einzigartig.",
            full: "Ich bin mit vielen Themen hierher gekommen, mit Themen, die ich nicht greifen konnte. Wo ich nur gewusst hab', es drängt richtig nach einer Veränderung. Aber dadurch, dass es in so tiefen Schichten verborgen war, hatte ich überhaupt keine Idee, was es sein könnte und wie es zu einer Lösung kommen könnte. Doch so ein 'systemisches Brettspiel' bringt dann doch einiges ans Tageslicht, wovon ich vorher überhaupt keinen Schimmer hatte. Dann die brillante Anleitung, immer wieder ins Fühlen zu kommen, und immer wieder an den Atem erinnert zu werden und immer wieder an das primäre Menschsein erinnert zu werden, was es bedeutet Mensch zu sein. Das ist dann doch sehr wertvoll und einzigartig."
        },
        {
            name: "Cornelia",
            avatar: "C",
            text: "Mein Weg mit Jo&Mi begann vor anderthalb Jahren. Die Befreiung von uraltem Ballast hat bewirkt, dass ein Mann in mein Leben kommen konnte. Ein Riesendank! 🙏",
            full: "Ein Erfahrungsbericht von mir, was durch das Retreat möglich ist: mein Weg mit Jo&Mi hat vor circa anderthalb Jahren begonnen und was seither in meinem Leben passiert ist, ist wirklich erstaunlich. Im letzten Jahr konnte ich mich dank dieser Arbeit von zwei Riesen-'Klöpsen' aus einer früheren Inkarnation und aus dem vorgeburtlichen Raum befreien. Diese Befreiung von uraltem Ballast hat bewirkt, dass vor kurzem ein Mann in mein Leben kommen konnte zu einem Zeitpunkt als ich das Thema 'Mann in meinem Leben' als unerfüllbar abgelegt habe. Ein Riesendank an die Liebende Quelle Allen Seins und an JoMi, die diesen Weg für mich eröffnet haben."
        },
        {
            name: "Elena",
            avatar: "E",
            text: "Nach 2,5 Jahren waren so viele Quantensprünge möglich. Ich schick meine Dankbarkeit über das Quantenfeld zu euch. Die Welt ist der Spiegel meiner Seele. ❤️🙏",
            full: "Lieber Joachim und Michaela, vor ca. 2,5 Jahren war ich erstes mal bei euch. Damals habe ich mich erst auf diesen Weg getraut und habe nicht alles verstanden, was und wieso im Leben das und dies geschiet. Ich habe nur im Herzen gespürt, dass ich mich bei euch so geboren und gut fühle. Nach diese Zeit, waren so viele Quantensprünge, dass ich gar nicht meine Dankbarkeit in Worte fassen kann. Ich schick meine Dankbarkeit einfach über Quantenfeld zu euch❤️🙏. DASS DIE Welt der Spiegel meiner Seele ist."
        },
        {
            name: "Dankbare Teilnehmerin",
            avatar: "DT",
            text: "Nach 6 Jahren Erfahrung mit Joachim und Michaela bin ich zutiefst DANKBAR 💝 Bin ich einfach nur glücklich. Ich bin stabil in mir geworden.",
            full: "Wenn ich nun auf 6 Jahre Erfahrung mit Joachim und Michaela zurück blicke, dann bin ich zutiefst DANKBAR💝 Ich habe nie gedacht, dass ich jetzt so wie es ist zurück blicken darf... Bin ich einfach nur glücklich 💕 Was ich auch fühlen kann ist, das meine Wahrnehmung im Aussen sich so verändert hat und ich so viel Dankbarkeit spüre, ich stabil in mir geworden bin. Das was da draussen abgeht mir keine Angst mehr macht."
        },
        {
            name: "Marcus",
            avatar: "M",
            text: "Diese drei Tage haben mein Leben verändert. Die Arbeit mit den wunden Punkten hat mir gezeigt, wo meine wahren Blockaden lagen. Ich fühle mich wie neugeboren!",
            full: "Diese drei Tage haben mein Leben verändert. Ich konnte endlich loslassen, was mich jahrelang belastet hat. Die Arbeit mit den wunden Punkten hat mir gezeigt, wo meine wahren Blockaden lagen. Joachim und Michaela haben mich mit so viel Liebe und Achtsamkeit durch diesen Prozess geführt. Ich fühle mich wie neugeboren!"
        },
        {
            name: "Wochenend-Teilnehmerin",
            avatar: "WT",
            text: "So viel ehrliche und tiefe Begegnungen in einem feinen Kreis. Fühlen und begreifen und wieder fühlen. So bewegend und befreiend! ✨🌈🌟",
            full: "Vielen Dank für dieses wunderbare Wochenende! ✨🌈🌟 So viel ehrliche und tiefe Begegnungen in einem feinen und sehr persönlichen Kreis. 💫 Ich bin mit meinen gut verdeckten Gefühlen wieder in Kontakt gekommen und hatte so einige Aha-Momente. Fühlen und begreifen und wieder fühlen. So bewegend und befreiend! Das ganze Ausmaß der Entfaltung meines erweiterten Potentials wird sich Stück für Stück zeigen."
        },
        {
            name: "Thomas",
            avatar: "T",
            text: "Vor dem Retreat war ich innerlich zerrissen. Die Arbeit mit dem Nervensystem und den alten Traumata war heilsam. Ich bin unendlich dankbar für diese Transformation.",
            full: "Vor dem Retreat war ich innerlich zerrissen und konnte nicht mehr klar denken. Die Arbeit mit Joachim und Michaela hat mir geholfen, meine innere Ruhe wiederzufinden. Besonders die Arbeit mit dem Nervensystem und den alten Traumata war heilsam. Ich bin unendlich dankbar für diese Transformation."
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
    class="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-slate-50 to-white"
>
    <!-- Subtle background pattern -->
    <div class="absolute inset-0 opacity-5">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(194,163,110,0.15) 1px, transparent 0); background-size: 20px 20px;"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-8">
        <!-- Header -->
        <div class="text-center mb-16">
            <!-- Tag -->
            <div class="inline-block mb-6">
                <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-purple-100 text-purple-800">
                    Erfahrungen unserer Teilnehmer
                </span>
            </div>
            
            <!-- Title -->
            <h2 class="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Unsere Wand der
                <span class="block text-transparent bg-gradient-to-r bg-clip-text" style="background: linear-gradient(to right, #C2A36E, #8B7355); -webkit-background-clip: text; background-clip: text;">
                    Transformation
                </span>
            </h2>
            
            <!-- Subtitle -->
            <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Lesen Sie, was unsere Teilnehmer über ihre lebensverändernde Erfahrung beim Quantensprung Retreat sagen.
            </p>
        </div>

        <!-- Testimonials Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {#each testimonials as testimonial, index}
                <div 
                    class="testimonial-card glassmorphic-card p-6 lg:p-8 rounded-2xl backdrop-blur-lg bg-white/70 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500"
                    class:animate-in={isVisible}
                    class:expanded={expandedCards.has(index)}
                    style="animation-delay: {index * 100}ms"
                >
                    <!-- Testimonial Text -->
                    <div class="mb-6">
                        <blockquote class="text-gray-700 leading-relaxed font-medium">
                            "{expandedCards.has(index) && testimonial.full ? testimonial.full : testimonial.text}"
                        </blockquote>
                        
                        <!-- Read More/Less Button -->
                        {#if testimonial.full}
                            <button 
                                class="mt-3 text-sm text-[#C2A36E] hover:text-[#8B7355] font-semibold transition-colors duration-200"
                                on:click={() => toggleExpansion(index)}
                            >
                                {expandedCards.has(index) ? 'Weniger lesen' : 'Mehr lesen'}
                            </button>
                        {/if}
                    </div>
                    
                    <!-- Author Info -->
                    <div class="flex items-center space-x-4">
                        <!-- Avatar -->
                        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#C2A36E] to-[#8B7355] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {testimonial.avatar}
                        </div>
                        
                        <!-- Name -->
                        <div class="min-w-0 flex-1">
                            <div class="font-semibold text-gray-900 truncate">
                                {testimonial.name}
                            </div>
                            <div class="text-sm text-gray-500">
                                Retreat Teilnehmer{testimonial.name.includes('in') ? 'in' : ''}
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Bottom CTA -->
        <div class="text-center mt-16">
            <div class="inline-block glassmorphic-card p-8 rounded-2xl backdrop-blur-lg bg-white/80 border border-gray-200/50 shadow-lg">
                <h3 class="text-2xl font-bold text-gray-900 mb-4">
                    Bereit für Ihre eigene Transformation?
                </h3>
                <p class="text-gray-600 mb-6 max-w-md mx-auto">
                    Werden Sie Teil unserer Gemeinschaft und erleben Sie Ihren persönlichen Quantensprung.
                </p>
                <button class="glassmorphic-button bg-gradient-to-r from-[#C2A36E] to-[#8B7355] text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    Jetzt anmelden
                </button>
            </div>
        </div>
    </div>
</section>

<style>
    .glassmorphic-card {
        backdrop-filter: blur(20px);
        transition: all 0.3s ease;
    }
    
    .glassmorphic-card:hover {
        transform: translateY(-4px);
        border-color: rgba(194, 163, 110, 0.3);
        background: rgba(255, 255, 255, 0.85);
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
    .testimonial-card:nth-child(1) { animation-delay: 0ms; }
    .testimonial-card:nth-child(2) { animation-delay: 100ms; }
    .testimonial-card:nth-child(3) { animation-delay: 200ms; }
    .testimonial-card:nth-child(4) { animation-delay: 300ms; }
    .testimonial-card:nth-child(5) { animation-delay: 400ms; }
    .testimonial-card:nth-child(6) { animation-delay: 500ms; }
    .testimonial-card:nth-child(7) { animation-delay: 600ms; }
    .testimonial-card:nth-child(8) { animation-delay: 700ms; }
    
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