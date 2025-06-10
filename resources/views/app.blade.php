<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="Quentin Lequeux">
        <meta name="description" content="PetShelter - Une application de parrainage pour les animaux en refuge.">
        <meta name="keywords" content="PetShelter, petshelter, parrainage, animaux, refuge, dons, don, chien, chat, aide">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!--Open Graph-->

        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:site_name" content="PetShelter">
        <meta property="og:description" content="PetShelter - Une application de parrainage pour les animaux en refuge.">
        <meta property="og:locale" content="fr_BE">
        <meta property="og:title" content="PetShelter">

        <!-- SEO -->

        <script type="application/ld+json">
            {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "PetShelter",
            "url": "https://petshelter.be",
            "foundingDate": "2025",
            "description": "PetShelter - Une application de parrainage pour les animaux en refuge.",
            "sameAs": [
                "https://github.com/QuentinLequeux",
                "https://www.linkedin.com/in/quentin-lequeux-8a11a3192/"
            ],
            "alumni": [
                {
                    "@type": "Person",
                    "name": "Lequeux Quentin"
                }
            ],
            "makesOffer": {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Parrainage d'animaux",
                    "description": "Soutenez un animal parmi nos animaux prêts au parrainage."
                }
            }
            }
        </script>

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', 'PetShelter') }}</title>

        <!--Adobe font-->

        <link rel="stylesheet" href="https://use.typekit.net/xcu5nly.css">

        <!--Favicon-->

        <link rel="icon" type="image/svg" href="{{ asset('favicon.svg') }}">
        <link rel="apple-touch-icon" type="image/svg" href="{{ asset('favicon.svg') }}">
        <link rel="apple-touch-icon-precomposed" type="image/svg" href="{{ asset('favicon.svg') }}">

        <!--
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        -->

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-nunito antialiased scroll">
        @inertia
    </body>
</html>
