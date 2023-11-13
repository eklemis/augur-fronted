const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			backgroundImage: {
				'section-bg': "url('/src/lib/assets/bgs/section_bg.svg')"
			}
		},
		colors: {
			transparent: 'transparent',
			white: '#ffffff',
			gray: colors.gray,
			primary: {
				900: '#090F20',
				800: '#162750',
				700: '#1F366F',
				600: '#28458E',
				300: '#4067C9',
				200: '#708DD7',
				50: '#EFF2FB'
			},
			accent: {
				900: '#001D29',
				800: '#00557A',
				700: '#0072A3',
				600: '#0094D5',
				300: '#1FBCFF',
				200: '#5CCEFF',
				50: '#EBF9FF'
			},
			warning: {
				900: '#381A06',
				800: '#95440F',
				700: '#CC5E14',
				600: '#EB7B30',
				300: '#F0A06A',
				200: '#F6C4A2',
				50: '#FDF3EC'
			},
			danger: {
				900: '#290007',
				800: '#660013',
				700: '#A3001E',
				600: '#DE0029',
				300: '#FF1F48',
				200: '#FF5C7A',
				50: '#FFEBEE'
			},
			positive: {
				900: '#092014',
				800: '#155131',
				700: '#22814E',
				600: '#2CA765',
				300: '#4ED08A',
				200: '#7EDDAA',
				50: '#EFFBF4'
			}
		}
	},
	plugins: []
};
