<script>
    let isMenuOpen = false;
    
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }
</script>

<!-- Main Navbar -->
<nav class="fixed top-0 left-0 right-0 z-50 bg-transparent">
    <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
            <!-- Logo -->
            <div class="flex items-center">
                <a href="/" class="flex flex-col items-start">
                    <div class="w-16 h-16 rounded-full flex items-center justify-center logo-gradient mb-2">
                        <span class="text-white font-bold text-2xl drop-shadow-lg">Q</span>
                    </div>
                    <div class="text-white font-bold text-sm tracking-wider logo-text">
                        QUANTENSPRUNG
                    </div>
                    <div class="text-white font-light text-xs tracking-widest logo-text">
                        RETREAT
                    </div>
                </a>
            </div>

            <!-- Right Side: Hamburger Menu + Login -->
            <div class="flex items-center space-x-6">
                <!-- Login Button -->
                <button class="login-btn px-6 py-3 bg-black/30 hover:bg-black/40 backdrop-blur-md text-white font-medium rounded-full transition-all border border-white/40">
                    Login
                </button>

                <!-- Hamburger Menu -->
                <button 
                    on:click={toggleMenu}
                    class="hamburger-menu flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
                    class:active={isMenuOpen}
                >
                    <div class="hamburger-line w-6 h-0.5 bg-white transition-all duration-300 drop-shadow-lg"></div>
                    <div class="hamburger-line w-6 h-0.5 bg-white transition-all duration-300 drop-shadow-lg"></div>
                    <div class="hamburger-line w-6 h-0.5 bg-white transition-all duration-300 drop-shadow-lg"></div>
                </button>
            </div>
        </div>
    </div>

    <!-- Fullscreen Navigation Menu -->
    {#if isMenuOpen}
        <div class="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center">
            <div class="text-center space-y-8">
                <a href="/" class="fullscreen-nav-link">Home</a>
                <a href="/ueber-uns" class="fullscreen-nav-link">Über Uns</a>
                <a href="/retreats" class="fullscreen-nav-link">Retreats</a>
                <a href="/kontakt" class="fullscreen-nav-link">Kontakt</a>
            </div>
            
            <!-- Close Button -->
            <button 
                on:click={toggleMenu}
                class="absolute top-8 right-8 text-white hover:text-gray-300 transition-colors"
            >
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    {/if}
</nav>

<style>
    .logo-gradient {
        background: linear-gradient(135deg, #C2A36E, #E6E6FA);
        box-shadow: 0 4px 15px rgba(194, 163, 110, 0.4);
    }

    .logo-text {
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
        font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 500;
    }

    .login-btn {
        backdrop-filter: blur(10px);
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 500;
    }

    .login-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(194, 163, 110, 0.3);
        background: rgba(194, 163, 110, 0.4) !important;
    }

    .hamburger-menu:hover .hamburger-line {
        background: #C2A36E;
    }

    .hamburger-menu.active .hamburger-line:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .hamburger-menu.active .hamburger-line:nth-child(2) {
        opacity: 0;
    }

    .hamburger-menu.active .hamburger-line:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }

    .fullscreen-nav-link {
        display: block;
        color: white;
        font-weight: 300;
        font-size: 3rem;
        letter-spacing: 0.1em;
        text-decoration: none;
        transition: all 0.3s ease;
        position: relative;
        font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .fullscreen-nav-link::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 2px;
        background: linear-gradient(135deg, #C2A36E, #E6E6FA);
        transition: width 0.3s ease;
    }

    .fullscreen-nav-link:hover {
        color: #C2A36E;
        transform: translateY(-5px);
        text-shadow: 0 10px 30px rgba(194, 163, 110, 0.3);
    }

    .fullscreen-nav-link:hover::after {
        width: 100%;
    }

    /* Animation for menu open/close */
    .hamburger-line {
        transform-origin: center;
    }
</style> 