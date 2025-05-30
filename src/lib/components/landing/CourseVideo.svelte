<script>
    export let videoUrl = "";
    export let title = "Course Video";
</script>

{#if videoUrl}
    <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg border border-white/20">
        <iframe 
            src={videoUrl}
            title="{title}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="w-full h-full"
        ></iframe>
    </div>
{:else}
    <p class="text-center text-gray-400">Video currently unavailable.</p>
{/if}

<style>
    /* Ensures iframe responsiveness if aspect ratio classes aren't fully sufficient or for fallback */
    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .aspect-w-16 {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 aspect ratio */
    }
</style> 