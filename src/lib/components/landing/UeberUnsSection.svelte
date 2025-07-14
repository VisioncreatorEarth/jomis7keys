<script>
  import { onMount } from 'svelte';
  import { imageService } from '$lib/services/imageService.js';
  
  let sectionElement;
  let isVisible = false;
  
  // Get background image from Appwrite
  const backgroundImage = imageService.getImageUrl('about-us-bg');
  
  onMount(() => {
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
  class="relative min-h-screen overflow-hidden"
>
  <!-- Background Image -->
  <div class="absolute inset-0 z-0">
    <img
      src={backgroundImage}
      alt="Joachim und Michaela Andert"
      class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-black/30"></div>
  </div>
  
  <!-- Content - Left Side -->
  <div class="relative z-10 min-h-screen flex items-center">
    <div class="w-full md:w-1/2 px-8 lg:px-16 py-16">
      <div class="transform transition-all duration-1000 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
        <!-- Title -->
        <h2 class="text-4xl md:text-6xl font-black text-white mb-8 text-shadow-lg">
          Über Uns
        </h2>
        
        <!-- Glassmorphic Content Card -->
        <div class="glassmorphic-card p-6 md:p-8 rounded-3xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl max-w-lg">
          <div class="space-y-6">
            <p class="text-base md:text-lg text-white leading-relaxed font-light">
              Wir sind <span class="font-semibold text-[#C2A36E]">Joachim und Michaela Andert</span>, mit über 40 Jahren Erfahrung in der Begleitung von Menschen auf ihrem Weg zur inneren Freiheit.
            </p>
            <p class="text-base md:text-lg text-white leading-relaxed font-light">
              Unser Ansatz kombiniert tiefgehende Methoden mit einer individuellen Transformation, um alte Blockaden zu lösen und ein erfülltes Leben zu ermöglichen.
            </p>
            <p class="text-base md:text-lg text-white leading-relaxed font-light">
              Mit Hingabe und Intuition unterstützen wir dich auf deinem <span class="font-semibold text-[#C2A36E]">Quantensprung</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .text-shadow-lg {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8),
                 4px 4px 8px rgba(0, 0, 0, 0.6),
                 6px 6px 12px rgba(0, 0, 0, 0.4);
  }
  
  .glassmorphic-card {
    backdrop-filter: blur(15px);
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
  
  .glassmorphic-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
    border-color: rgba(194, 163, 110, 0.3);
  }
</style> 