import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'

// export const CustomSlider = styled(Slider)({
// 	color: '#1A1A1D',
// 	height: 8,
// 	'& .MuiSlider-track': {
// 		border: 'none',
// 	},
// 	'& .MuiSlider-thumb': {
// 		height: 24,
// 		width: 24,
// 		backgroundColor: '#fff',
// 		border: '2px solid currentColor',
// 		'&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
// 			boxShadow: 'inherit',
// 		},
// 		'&::before': {
// 			display: 'none',
// 		},
// 	},
// 	'& .MuiSlider-valueLabel': {
// 		lineHeight: 1.2,
// 		fontSize: 12,
// 		background: 'unset',
// 		padding: 0,
// 		width: 40,
// 		height: 40,
// 		borderRadius: '50% 50% 50% 50%',
// 		backgroundColor: '#1A1A1D',
// 		transformOrigin: 'bottom left',
// 		transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
// 		'&::before': { display: 'none' },
// 		'&.MuiSlider-valueLabelOpen': {
// 			transform: 'translate(50%, -50%) rotate(-45deg) scale(1)',
// 		},
// 		'& > *': {
// 			transform: 'rotate(45deg)',
// 		},
// 	},
// })

export const CustomSlider = styled(Slider)({
	color: '#1A1A1D',
	height: 5,
	'& .MuiSlider-track': {
		border: 'none',
	},
	'& .MuiSlider-thumb': {
		height: 24,
		width: 24,
		backgroundColor: '#fff',
		border: '2px solid #1A1A1D',
		'&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
			boxShadow: 'inherit',
		},
		'&::before': {
			display: 'none',
		},
	},
	'& .MuiSlider-valueLabel': {
		lineHeight: 1.2,
		fontSize: 12,
		background: 'unset',
		padding: 0,
		width: 50,
		height: 30,
		borderRadius: '5px',
		backgroundColor: '#1A1A1D',
		transformOrigin: 'bottom left',
		transform: 'translate(50%, -100%) scale(0)',
		'&::before': { display: 'none' },
		'&.MuiSlider-valueLabelOpen': {
			transform: 'translate(50%, -50%) scale(1)',
		},
		'& > *': {
			transform: '',
		},
	},
})
