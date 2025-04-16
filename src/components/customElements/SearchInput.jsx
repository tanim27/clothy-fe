// components/SearchInput.jsx
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

const SearchInput = ({ value, onChange, placeholder }) => {
	return (
		<div className='w-full max-w-sm'>
			<div className='relative'>
				<input
					type='text'
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className='w-full pl-10 pr-4 py-2 text-md text-gray-900 placeholder-gray-400 bg-gray-100 hover:bg-gray-200 rounded transition-colors duration-300 outline-none'
				/>
				<SearchRoundedIcon className='absolute left-2 top-1/2 -translate-y-1/2 text-#1A1A1D' />
			</div>
		</div>
	)
}

export default SearchInput
