import SearchResult from '@/components/search/SearchResult'
import { CircularProgress } from '@mui/material'
import { Suspense } from 'react'

export default function SearchResultsPage() {
	return (
		<Suspense
			fallback={
				<div>
					<CircularProgress color='default' />
				</div>
			}
		>
			<SearchResult />
		</Suspense>
	)
}
