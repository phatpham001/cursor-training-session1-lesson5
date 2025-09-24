/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#eef2ff',
					100: '#e0e7ff',
					200: '#c7d2fe',
					300: '#a5b4fc',
					400: '#818cf8',
					500: '#6366f1',
					600: '#4f46e5',
					700: '#4338ca',
					800: '#3730a3',
					900: '#312e81',
				},
				accent: '#10b981',
			},
			container: {
				center: true,
				padding: '1rem',
				screens: {
					sm: '640px',
					md: '768px',
					lg: '1024px',
					xl: '1280px',
				},
			},
		},
	},
	plugins: [],
};
