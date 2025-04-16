const config = {
	content: [
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backdropBlur: {
				sm: '4px',
			},
		},
		keyframes: {
			fadeZoom: {
				'0%': { opacity: '0', transform: 'scale(0.95)' },
				'100%': { opacity: '1', transform: 'scale(1)' },
			},
		},
		animation: {
			fadeZoom: 'fadeZoom 1s ease-in-out',
		},

		// keyframes: {
		// 	fadeZoom: {
		// 		'0%': { opacity: '0', transform: 'scale(0.95)' },
		// 		'100%': { opacity: '1', transform: 'scale(1)' },
		// 	},
		// },
		// animation: {
		// 	fadeZoom: 'fadeZoom 1s ease-in-out forwards',
		// },
	},
	plugins: [],
}

export default config
