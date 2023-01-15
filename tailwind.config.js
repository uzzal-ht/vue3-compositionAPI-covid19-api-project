/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#0071dc",
                },
                secondary: {
                    DEFAULT: "#ffc221",
                },
                heading: {
                    DEFAULT: "#252525",
                },
                body: "#333333",
                light: "#666666",
            },
        },
        fontFamily: {
            base: ["Gordita"]
        },
        container: {
            center: true,
            padding: {
                DEFAULT: "15px",
            },
        }
    },
    plugins: [],
}


