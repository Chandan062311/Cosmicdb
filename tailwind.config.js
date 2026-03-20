import forms from '@tailwindcss/forms'
import containerQueries from '@tailwindcss/container-queries'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "outline": "#946e69",
                "surface-container-low": "#f3f3f3",
                "surface": "#f9f9f9",
                "surface-variant": "#e2e2e2",
                "inverse-primary": "#ffb4aa",
                "on-tertiary-container": "#4f3e00",
                "primary": "#b7000c",
                "on-background": "#1b1b1b",
                "secondary": "#006d33",
                "surface-container-high": "#e8e8e8",
                "on-primary-fixed-variant": "#930007",
                "on-tertiary-fixed-variant": "#584400",
                "on-secondary": "#ffffff",
                "surface-container-lowest": "#ffffff",
                "on-primary-fixed": "#410001",
                "secondary-container": "#75f999",
                "surface-tint": "#c0000d",
                "tertiary": "#745b00",
                "tertiary-container": "#d1a600",
                "primary-fixed-dim": "#ffb4aa",
                "on-secondary-container": "#007236",
                "on-surface-variant": "#5f3f3b",
                "error-container": "#ffdad6",
                "on-error-container": "#93000a",
                "on-tertiary-fixed": "#241a00",
                "secondary-fixed-dim": "#5adf82",
                "surface-container-highest": "#e2e2e2",
                "inverse-surface": "#303030",
                "surface-bright": "#f9f9f9",
                "on-secondary-fixed-variant": "#005225",
                "on-primary": "#ffffff",
                "tertiary-fixed-dim": "#f1c100",
                "on-error": "#ffffff",
                "error": "#ba1a1a",
                "on-tertiary": "#ffffff",
                "on-secondary-fixed": "#00210b",
                "on-surface": "#1b1b1b",
                "on-primary-container": "#fff7f6",
                "primary-container": "#e60012",
                "surface-dim": "#dadada",
                "tertiary-fixed": "#ffe08b",
                "secondary-fixed": "#78fc9c",
                "primary-fixed": "#ffdad5",
                "surface-container": "#eeeeee",
                "inverse-on-surface": "#f1f1f1",
                "background": "#f9f9f9",
                "outline-variant": "#e9bcb6"
            },
            fontFamily: {
                "headline": ["Space Grotesk", "sans-serif"],
                "body": ["Space Grotesk", "sans-serif"],
                "label": ["Space Grotesk", "sans-serif"]
            },
            borderRadius: { "DEFAULT": "0", "lg": "0", "xl": "0", "full": "9999px" },
        },
    },
    plugins: [
        forms,
        containerQueries
    ],
}
