<script>
    // Removed: import CourseTextContent from '$lib/components/landing/CourseTextContent.svelte';
    import CourseEnrollmentForm from '$lib/components/landing/CourseEnrollmentForm.svelte';
    import CourseVideo from '$lib/components/landing/CourseVideo.svelte';
    import { currentUser } from '$lib/stores/userStore';
    // Removed: import backgroundImage from '$lib/images/stone.jpg';

    const retreatDetails = {
        mainTitle: "Retreat - Die 7 Schlüssel zur Befreiung",
        subtitle1: "Die Befreiung erfolgt in dir – 3 Tage für nachhaltige Veränderung",
        subtitle2: "von und mit Joachim & Michaela Andert",
        introduction: [
            "Das Retreat 'Die 7 Schlüssel zur Befreiung' ist ein wesentlicher Schritt auf dem Weg zu einem erfüllten und glücklichen Sein. Es gibt dir langjährig erprobte Methoden an die Hand, deine innere Freiheit zu entdecken und dadurch ein Leben zu führen, das von Selbstvertrauen, Authentizität und Liebe geprägt ist. Du erlebst eine tiefgreifende Transformation, die dich auf eine höhere Ebene des Seins erhebt.",
            "In diesem intensiven Retreat befreist du dich Schritt für Schritt von alten Mustern, inneren Blockaden und Selbstsabotage. Du lernst vor allem, wie du selbst unbewusste, auch geerbte Verhaltensmuster und emotionale Konflikte aufstöbern und endgültig lösen kannst.",
            "Alle Werkzeuge aus dem Retreat kannst du auch danach in deinem Alltag selbst anwenden. Dir wird eine schwere Last von den Schultern genommen und Dein Leben fühlt sich leichter an."
        ],
        videoUrl: "https://www.youtube.com/embed/your_placeholder_video_id", // Replace with actual video ID
        videoTitle: "Retreat Vorschau",
        whatToExpect: {
            title: "Was dich erwartet:",
            items: [
                "3 Tage individueller Transformation und ein unglaublich gutes Gefühl im Miteinander",
                "Die 7 Schlüssel & andere tiefgehende Werkzeuge zur inneren Arbeit",
                "Praktische Übungen & Selbstanwendung",
                "Austausch & Begleitung in einer geschützten Gruppe Gleichgesinnter",
                "Umfangreiches Wissen & Unterlagen zusätzlich im Online-Zugang",
                "Eine Ernährung, die perfekt auf deinen Körper und dein Gefühl zugeschnitten ist"
            ]
        },
        investment: {
            title: "Deine Investition (Ratenzahlung möglich):",
            items: [
                { text: "Intensiv-Retreat über 3 Tage:", price: "1.400,- €" },
                { text: "Wiederholer oder Partner nur:", price: "1.120,- €" },
                { text: "Essens-Pauschale für 6 Mahlzeiten und Vitalstoffdrinks:", price: "120,- €" },
                { text: "Zum Lösen der Blockaden im Nervensystem (optional): Q-Wirbler:", price: "250,- €" }
            ]
        },
        included: {
            title: "Im Preis enthalten sind:",
            items: [
                "Ein Quanten-Lanthaniden Scan*) im Wert von 120,- €",
                "Nachbesprechung (optional): 30 Min. Sitzung, Zoom/Präsenz im Wert von 135,- €",
                "Zugang zur Gruppe aller Teilnehmer zum Austausch, von unschätzbarem Wert",
                "Download des umfangreichen Studienmaterials (kostenlos)"
            ]
        },
        additionalOffers: {
            title: "Weitere Angebote:",
            orientation: "Erst-Gespräch zur Orientierung: 30 min. frei",
            consultation: "Beratungs-Sitzung (Zoom oder Präsenz): pro Std. 270,-",
            vatNote: "Alle Preise inkl. MwSt."
        },
        nextDates: {
            title: "Die nächsten Termine (4 - 10 Teilnehmer)",
            location: "Ort: Guntersberg mit Alpenblick im Chiemgau",
            dates: "12. - 15. Juni 2025 und 17. – 20. Juli 2025"
        },
        finalSlogan: "Deine Selbstermächtigung bringt dir Klarheit, Freiheit und Erfüllung.",
        footnote: "*) Die homöopathische Gruppe der Lanthaniden beinhaltet als Hauptthema die Selbstbestimmung und das Streben nach Freiheit. Wir arbeiten seit 25 Jahren mit dieser Quanten-Informations-Methode.",
        contact: {
            name: "Quantensprung Forum e.V.",
            phone: "+49-1525 35867-33 & -35",
            email: "info@quantensprung-forum.de"
        }
    };

    const designPrinciples = [
        {
            id: "contrast",
            name: "1. Contrast",
            explanation: "Contrast refers to the difference between two or more elements in a design. It can be achieved through differences in color, size, shape, texture, typography, or spacing. High contrast makes elements stand out and creates visual interest, while low contrast can make a design appear dull or difficult to read.",
            examples: [
                "Netflix Homepage: The bright red \"Netflix\" logo sharply contrasts with the dark background, making it immediately visible and establishing brand identity. Within show posters, the title text often uses a light color against a dark or muted image to ensure readability.",
                "Road Signs: A stop sign (red octagon with white text) uses high contrast in both color and shape to grab immediate attention and convey an urgent message, even from a distance.",
                "Newspaper Headlines: Large, bold headlines stand in stark contrast to the smaller body text, guiding the reader\'s eye to the most important information first."
            ]
        },
        {
            id: "repetition",
            name: "2. Repetition",
            explanation: "Repetition involves consistently using certain elements throughout a design. This can include colors, fonts, shapes, lines, textures, or even spacing. Repetition creates a sense of unity, rhythm, and consistency, reinforcing brand identity and making a design feel cohesive.",
            examples: [
                "Coca-Cola Branding: The distinctive red and white color scheme, the Spencerian script logo, and the contour bottle shape are consistently repeated across all Coca-Cola products, advertisements, and merchandise worldwide. This strong repetition makes the brand instantly recognizable.",
                "Website Navigation Menus: Most websites use repetition for their navigation links – typically a consistent font, size, and spacing for each menu item, often with a consistent hover effect. This makes it easy for users to understand and predict how to navigate the site.",
                "Microsoft Office Suite: The consistent use of ribbon interfaces, icons, and button styles across Word, Excel, PowerPoint, etc., provides a familiar user experience and reinforces the Microsoft brand identity."
            ]
        },
        {
            id: "alignment",
            name: "3. Alignment",
            explanation: "Alignment refers to the arrangement of design elements along a common edge or line. Proper alignment creates a sense of order, neatness, and professionalism. Misalignment can make a design look messy, unprofessional, and difficult to follow.",
            examples: [
                "Magazine Layouts: Text columns, images, and headlines in magazines are meticulously aligned along invisible grids. This creates clean edges and a structured appearance, making the content easy to read and visually appealing.",
                "Business Cards: Information like names, titles, contact details, and company logos are usually aligned, often to the left, right, or center. This ensures clarity and a professional appearance.",
                "Mobile App Interfaces: Buttons, text fields, and icons are consistently aligned to create a clean, intuitive, and user-friendly interface. For example, the back button and title on most app screens are typically left-aligned or center-aligned at the top."
            ]
        },
        {
            id: "proximity",
            name: "4. Proximity",
            explanation: "Proximity is the principle of grouping related items together. When elements are close to each other, they are perceived as belonging to the same group or having a similar relationship. This helps organize information, reduces clutter, and improves readability.",
            examples: [
                "Contact Information on a Brochure: Instead of scattering a phone number, email address, and website URL randomly, they are typically grouped together in a single block. This visually communicates that these pieces of information are related and makes them easy to find.",
                "Product Packaging: On a food package, the nutritional information, ingredients list, and allergen warnings are usually grouped together, often in a distinct box or section. This makes it easy for consumers to locate all relevant dietary information.",
                "Social Media Profile Pages: Your profile picture, name, bio, and follower count are all placed in close proximity at the top of your profile, indicating they are all part of your identity on that platform."
            ]
        },
        {
            id: "hierarchy",
            name: "5. Hierarchy",
            explanation: "Hierarchy is the arrangement of design elements to indicate their order of importance. It guides the viewer\'s eye through the design, directing attention to the most crucial information first. This is achieved through variations in size, color, placement, or typography.",
            examples: [
                "Newspaper Front Page: The main headline is the largest and most prominent, indicating the day\'s most important story. Sub-headlines are smaller, and body text is even smaller, establishing a clear hierarchy of information.",
                "Movie Posters: The movie title is typically the largest and most prominent element, followed by the lead actors\' names (often smaller but still noticeable), then the director\'s name, and finally smaller credits at the bottom. This directs attention to what the audience wants to know most.",
                "Restaurant Menus: Dish names are usually larger and bolder than descriptions, and prices are often set apart. Special offers or chef\'s recommendations might be highlighted with a different color or a larger font to attract immediate attention."
            ]
        },
        {
            id: "balance",
            name: "6. Balance",
            explanation: "Balance refers to the distribution of visual weight within a design. It creates a sense of stability and equilibrium. There are two main types: Symmetrical Balance (elements are evenly distributed on either side of a central axis, creating a formal and stable feel) and Asymmetrical Balance (elements are unevenly distributed but still create a sense of equilibrium through contrasting weights, e.g., a large element on one side balanced by several smaller elements on the other).",
            examples: [
                "Symmetrical Balance: Traditional Architecture: Many classical buildings, like the White House or a grand cathedral, exhibit symmetrical balance. The left and right sides are mirror images, conveying a sense of formality, strength, and timelessness.",
                "Asymmetrical Balance: Modern Art or Web Design: A website layout might have a large, striking image on one side and a smaller block of text and a navigation menu on the other. The visual weight is balanced not by mirroring but by the interplay of different-sized elements. For example, the homepage of Apple\'s website often uses a large product image on one side and concise product information on the other, creating a dynamic yet balanced layout.",
                "Logos: The Mercedes-Benz star logo is symmetrically balanced. The Nike \"swoosh\" achieves asymmetrical balance; its dynamic shape creates movement that is balanced by its placement and the accompanying text."
            ]
        },
        {
            id: "space",
            name: "7. Space (White Space/Negative Space)",
            explanation: "Space refers to the areas of a design that are left empty, either around or between elements. It\'s often called \"white space\" or \"negative space\" even if it\'s not literally white. Effective use of space improves readability, reduces clutter, emphasizes elements, and creates a sense of sophistication and breathing room.",
            examples: [
                "Apple\'s Product Advertisements: Apple is renowned for its minimalist approach, using generous amounts of white space around its products in advertisements. This draws the viewer\'s eye directly to the product, making it feel sleek, exclusive, and desirable, rather than cluttered.",
                "Art Gallery Walls: Paintings are hung with ample space between them, allowing each piece to be appreciated individually without visual interference from others. This enhances the focus on each artwork.",
                "Minimalist Websites: Many modern websites, especially those for high-end brands, use significant negative space around headlines and images. This makes the content feel premium, clean, and easy to consume, as there are fewer distractions."
            ]
        }
    ];
</script>

<svelte:head>
    <title>{retreatDetails.mainTitle} - {retreatDetails.subtitle2}</title>
    <meta name="description" content={retreatDetails.introduction[0]} />
</svelte:head>

<div class="min-h-screen w-full bg-background-main text-primary-text font-sans">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        
        <header class="text-center mb-12 md:mb-16">
            <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-3 text-primary-text leading-tight">
                {retreatDetails.mainTitle}
            </h1>
            <p class="text-xl sm:text-2xl md:text-3xl text-accent-primary font-semibold mb-2">
                {retreatDetails.subtitle1}
            </p>
            <p class="text-lg sm:text-xl text-primary-text/70 italic">
                {retreatDetails.subtitle2}
            </p>
        </header>

        <main class="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            
            <div class="lg:col-span-2 space-y-10">
                <section class="prose prose-lg lg:prose-xl max-w-none text-primary-text/90 space-y-4">
                    {#each retreatDetails.introduction as paragraph}
                        <p>{paragraph}</p>
                    {/each}
                </section>

                <section class="p-6 bg-background-card rounded-xl shadow-lg border border-accent-secondary/20">
                    <h2 class="text-2xl sm:text-3xl font-semibold mb-5 text-accent-primary border-b-2 border-accent-primary/30 pb-2">
                        {retreatDetails.whatToExpect.title}
                    </h2>
                    <ul class="list-disc list-inside space-y-2 text-primary-text/90 pl-2">
                        {#each retreatDetails.whatToExpect.items as item}
                            <li>{item}</li>
                        {/each}
                    </ul>
                </section>
                
                <section id="video-preview" class="bg-background-card rounded-xl shadow-lg border border-accent-secondary/20 overflow-hidden">
                    <div class="p-6 border-b border-accent-secondary/20">
                         <h2 class="text-2xl sm:text-3xl font-semibold text-accent-primary">Video Vorschau</h2>
                         <p class="text-primary-text/70 mt-1">Erhalte einen ersten Eindruck vom Retreat.</p>
                    </div>
                    <div class="p-2 sm:p-4 bg-accent-secondary/10">
                        <CourseVideo videoUrl={retreatDetails.videoUrl} title={retreatDetails.videoTitle} />
                    </div>
                </section>

                <section class="p-6 bg-background-card rounded-xl shadow-lg border border-accent-secondary/20">
                    <h2 class="text-2xl sm:text-3xl font-semibold mb-5 text-accent-primary border-b-2 border-accent-primary/30 pb-2">
                        {retreatDetails.investment.title}
                    </h2>
                    <ul class="space-y-3 text-primary-text/90">
                        {#each retreatDetails.investment.items as item}
                            <li class="flex justify-between items-center">
                                <span><span class="text-accent-primary mr-2">►</span>{item.text}</span>
                                <span class="font-semibold">{item.price}</span>
                            </li>
                        {/each}
                    </ul>
                </section>

                <section class="p-6 bg-background-card rounded-xl shadow-lg border border-accent-secondary/20">
                    <h2 class="text-2xl sm:text-3xl font-semibold mb-5 text-accent-primary border-b-2 border-accent-primary/30 pb-2">
                        {retreatDetails.included.title}
                    </h2>
                    <ul class="list-disc list-inside space-y-2 text-primary-text/90 pl-2">
                        {#each retreatDetails.included.items as item}
                            <li>{item}</li>
                        {/each}
                    </ul>
                </section>

                 <section class="p-6 bg-background-card rounded-xl shadow-lg border border-accent-secondary/20">
                    <h2 class="text-2xl sm:text-3xl font-semibold mb-5 text-accent-primary border-b-2 border-accent-primary/30 pb-2">
                        {retreatDetails.additionalOffers.title}
                    </h2>
                    <div class="space-y-3 text-primary-text/90">
                        <p><span class="font-semibold">Erst-Gespräch zur Orientierung:</span> {retreatDetails.additionalOffers.orientation.split(': ')[1]}</p>
                        <p><span class="font-semibold">Beratungs-Sitzung (Zoom oder Präsenz):</span> {retreatDetails.additionalOffers.consultation.split(': ')[1]}</p>
                        <p class="text-sm text-primary-text/60 mt-3">{retreatDetails.additionalOffers.vatNote}</p>
                    </div>
                </section>

                <section class="p-6 bg-accent-primary/10 rounded-xl shadow-lg border border-accent-primary/30 text-center">
                    <h2 class="text-2xl sm:text-3xl font-semibold mb-3 text-accent-primary">
                        {retreatDetails.nextDates.title}
                    </h2>
                    <p class="text-lg text-primary-text/90 font-medium">{retreatDetails.nextDates.location}</p>
                    <p class="text-xl text-primary-text font-bold my-2 bg-highlight-calm/30 py-2 px-4 rounded-md inline-block">{retreatDetails.nextDates.dates}</p>
                </section>
                
                <section class="mt-10 text-center">
                     <p class="text-2xl lg:text-3xl font-semibold text-primary-text italic leading-tight">
                        "{retreatDetails.finalSlogan}"
                    </p>
                </section>

            </div>
            
            <aside class="lg:col-span-1 lg:sticky lg:top-24 h-fit">
                <div class="bg-primary-text/90 p-6 sm:p-8 rounded-xl shadow-2xl border-accent-secondary/20 text-background-main">
                    {#if $currentUser}
                        <div class="text-center">
                            <h2 class="text-2xl font-bold mb-3">Willkommen zurück, {$currentUser.name || $currentUser.email}!</h2>
                            <p class="mb-2">Du bist bereits eingeloggt.</p>
                            <p class="text-sm text-accent-secondary">Entdecke die Details oder verwalte bald dein Konto.</p>
                        </div>
                    {:else}
                        <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-center">
                            Interesse am Retreat?
                        </h2>
                        <CourseEnrollmentForm courseTitle={retreatDetails.mainTitle} /> 
                    {/if}
                </div>
                <p class="mt-8 text-xs text-primary-text/60 text-center px-2">
                    {retreatDetails.footnote}
                </p>
            </aside>
        </main>

        <footer class="text-center mt-16 md:mt-20 lg:mt-24 pt-10 border-t border-accent-secondary/20">
            <p class="text-primary-text font-semibold text-lg">{retreatDetails.contact.name}</p>
            <p class="text-primary-text/70">{retreatDetails.contact.phone}</p>
            <p class="text-primary-text/70">
                <a href="mailto:{retreatDetails.contact.email}" class="hover:text-accent-primary underline transition-colors">
                    {retreatDetails.contact.email}
                </a>
            </p>
            <p class="text-sm text-accent-secondary mt-6">&copy; {new Date().getFullYear()} {retreatDetails.contact.name}. Alle Rechte vorbehalten.</p>
        </footer>
    </div>
</div>

<style>
    :global(body) {
        font-family: 'ui-sans-serif', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        background-color: #F8F5F2; /* Ensure main background for entire page */
    }
    .prose ul > li::before {
        background-color: theme('colors.accent-primary'); /* Bullets match primary accent */
    }
</style> 