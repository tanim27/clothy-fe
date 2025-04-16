export const metadata = {
	title: 'Clothy | Search',
	description: 'Clothy application search page.',
}

import SearchResult from '@/components/search/SearchResult'

import { CircularProgress } from '@mui/material'
import { Suspense } from 'react'

const SearchResultsPage = () => {
	return (
		<Suspense
			fallback={
				<div className='min-h-screen flex justify-center items-center'>
					<CircularProgress color='default' />
				</div>
			}
		>
			<SearchResult />
		</Suspense>
	)
}

export default SearchResultsPage
