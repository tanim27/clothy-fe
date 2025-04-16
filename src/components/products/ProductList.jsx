'use client'

import SearchInput from '@/components/customElements/SearchInput'
import { CustomSlider } from '@/components/customMUI/customslider/CustomSlider'
import { useGetProducts } from '@/hooks/useProduct'
import FilterProductDrawer from '../customElements/FilterProductDrawer'
import ProductCard from './ProductCard'

import { Button, CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'

import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import slugify from 'slugify'

const ProductList = () => {
	const { data: products, isLoading, isError } = useGetProducts()
	const searchParams = useSearchParams()
	const router = useRouter()

	// Slug params
	const categorySlug = searchParams.get('category') || ''
	const subCategorySlug = searchParams.get('sub_category') || ''
	const brandSlug = searchParams.get('brand') || ''
	const minPriceQuery = Number(searchParams.get('min_price')) || 0
	const maxPriceQuery = Number(searchParams.get('max_price')) || 1000

	const [selectedCategory, setSelectedCategory] = useState('')
	const [selectedSubCategory, setSelectedSubCategory] = useState('')
	const [selectedBrand, setSelectedBrand] = useState('')
	const [categoryQuery, setCategoryQuery] = useState('')
	const [subCategoryQuery, setSubCategoryQuery] = useState('')
	const [brandQuery, setBrandQuery] = useState('')
	const [sortOption, setSortOption] = useState('default') // Default is no sort
	const [showAllCategories, setShowAllCategories] = useState(false)
	const [showAllSubCategories, setShowAllSubCategories] = useState(false)
	const [showAllBrands, setShowAllBrands] = useState(false)

	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)

	const [currentPage, setCurrentPage] = useState(1)
	const productsPerPage = 8

	const MIN = 0
	const MAX = 1000
	const minDistance = 100
	const [priceRange, setPriceRange] = useState([minPriceQuery, maxPriceQuery])

	const handlePriceChange = (event, newValue, activeThumb) => {
		if (!Array.isArray(newValue)) return

		const updatedRange =
			activeThumb === 0
				? [Math.min(newValue[0], priceRange[1] - minDistance), priceRange[1]]
				: [priceRange[0], Math.max(newValue[1], priceRange[0] + minDistance)]

		setPriceRange(updatedRange)

		const query = new URLSearchParams(searchParams.toString())
		query.set('min_price', updatedRange[0])
		query.set('max_price', updatedRange[1])
		router.push(`?${query.toString()}`)
	}

	const handleCategoryClick = (category) => {
		const slug = slugify(category, { lower: true })
		router.push(`/products?category=${slug}`)
	}

	const handleSubCategoryClick = (subCategory) => {
		const slug = slugify(subCategory, { lower: true })
		const query = new URLSearchParams(searchParams.toString())
		query.set('sub_category', slug)
		router.push(`?${query.toString()}`)
	}

	const handleBrandClick = (brand) => {
		const slug = slugify(brand, { lower: true })
		const query = new URLSearchParams(searchParams.toString())
		query.set('brand', slug)
		router.push(`?${query.toString()}`)
	}

	const handleFilterMenuClick = () => {
		setIsFilterMenuOpen(!isFilterMenuOpen)
	}

	const allCategories = useMemo(
		() => Array.from(new Set(products?.map((p) => p.category))),
		[products],
	)

	const allSubCategories = useMemo(
		() =>
			Array.from(
				new Set(
					products
						?.filter((p) =>
							selectedCategory ? p.category === selectedCategory : true,
						)
						.map((p) => p.sub_category)
						.filter(Boolean),
				),
			),
		[products, selectedCategory],
	)

	const allBrands = useMemo(() => {
		return Array.from(
			new Set(
				products
					?.filter((p) => {
						const categoryMatch = selectedCategory
							? p.category === selectedCategory
							: true
						const subCategoryMatch = selectedSubCategory
							? p.sub_category === selectedSubCategory
							: true
						return categoryMatch && subCategoryMatch
					})
					.map((p) => p.brand)
					.filter(Boolean),
			),
		)
	}, [products, selectedCategory, selectedSubCategory])

	useEffect(() => {
		const categoryMatch = allCategories.find(
			(c) => slugify(c, { lower: true }) === categorySlug,
		)
		const subCategoryMatch = allSubCategories.find(
			(s) => slugify(s, { lower: true }) === subCategorySlug,
		)
		const brandMatch = allBrands.find(
			(b) => slugify(b, { lower: true }) === brandSlug,
		)

		setSelectedCategory(categoryMatch || '')
		setSelectedSubCategory(subCategoryMatch || '')
		setSelectedBrand(brandMatch || '')
		setPriceRange([minPriceQuery, maxPriceQuery])
	}, [categorySlug, subCategorySlug, brandSlug, minPriceQuery, maxPriceQuery])

	const filteredCategories = allCategories.filter((c) =>
		c.toLowerCase().includes(categoryQuery.toLowerCase()),
	)
	const displayedCategories = showAllCategories
		? filteredCategories
		: filteredCategories.slice(0, 5)

	const filteredSubCategories = allSubCategories.filter((s) =>
		s.toLowerCase().includes(subCategoryQuery.toLowerCase()),
	)
	const displayedSubCategories = showAllSubCategories
		? filteredSubCategories
		: filteredSubCategories.slice(0, 5)

	const filteredBrands = allBrands.filter((b) =>
		b.toLowerCase().includes(brandQuery.toLowerCase()),
	)
	const displayedBrands = showAllBrands
		? filteredBrands
		: filteredBrands.slice(0, 5)

	const filteredProducts = (products || [])?.filter((product) => {
		const sellingPrice = product.offer_price ?? product.price
		const matchPrice =
			sellingPrice >= priceRange[0] && sellingPrice <= priceRange[1]
		const matchCategory = selectedCategory
			? product.category === selectedCategory
			: true
		const matchSubCategory = selectedSubCategory
			? product.sub_category === selectedSubCategory
			: true
		const matchBrand = selectedBrand ? product.brand === selectedBrand : true

		return matchPrice && matchCategory && matchSubCategory && matchBrand
	})

	const handleSort = (option) => {
		setSortOption(option)
	}

	const sortProducts = (products) => {
		switch (sortOption) {
			case 'best_selling':
				return [...products].sort((a, b) => b.best_selling - a.best_selling)
			case 'new_arrival':
				return [...products].sort((a, b) => b.new_arrival - a.new_arrival)
			case 'price_asc':
				return [...products].sort((a, b) => {
					const priceA = a.offer_price || a.price
					const priceB = b.offer_price || b.price
					return priceA - priceB
				})
			case 'price_desc':
				return [...products].sort((a, b) => {
					const priceA = a.offer_price || a.price
					const priceB = b.offer_price || b.price
					return priceB - priceA
				})
			default:
				return products // No sort
		}
	}

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [currentPage])

	const sortedAndFilteredProducts = sortProducts(filteredProducts || [])

	const indexOfLastProduct = currentPage * productsPerPage
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage
	const currentProducts = sortedAndFilteredProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct,
	)

	// Calculate the total number of pages
	const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

	// Create a smart pagination list (with ellipsis)
	const paginate = () => {
		const pageNumbers = []
		const delta = 2 // How many pages to show around the current page

		// Always show the first and last page
		if (currentPage > delta + 2) pageNumbers.push(1)
		if (currentPage > delta + 3) pageNumbers.push('...')

		// Add pages before and after the current page
		for (
			let i = Math.max(1, currentPage - delta);
			i <= Math.min(currentPage + delta, totalPages);
			i++
		) {
			pageNumbers.push(i)
		}

		// Always show the last page if we haven't already shown it
		if (currentPage < totalPages - delta - 2) pageNumbers.push('...')
		if (currentPage < totalPages - delta - 1) pageNumbers.push(totalPages)

		return pageNumbers
	}

	// Handle page click
	const handlePageClick = (page) => {
		if (page === '...') return
		setCurrentPage(page)
	}

	if (isLoading)
		return (
			<div className='flex justify-center items-center h-screen'>
				<CircularProgress color='default' />
			</div>
		)

	if (isError)
		return (
			<div className='p-6 text-center'>
				<p className='text-red-500 text-lg'>Product list not found.</p>
				<Link
					href='/'
					className='mt-4 text-blue-600 underline'
				>
					Go Back
				</Link>
			</div>
		)

	return (
		<div className='p-4'>
			<FilterProductDrawer
				isFilterMenuOpen={isFilterMenuOpen}
				onFilterClose={handleFilterMenuClick}
			/>

			<div
				onClick={handleFilterMenuClick}
				className='fixed top-1/2 left-5 transform -translate-y-1/2 md:hidden flex items-center justify-center bg-white border border-gray-400 shadow-2xl w-12 h-12 p-2 z-30 cursor-pointer'
			>
				<FilterAltRoundedIcon fontSize='medium' />
			</div>

			<div className='flex items-center space-x-2 font-bold text-[#1a1a1d] text-lg uppercase px-4 py-2'>
				<span className='text-gray-600'>Home</span>
				<span className='text-gray-600'>|</span>
				<span className='text-gray-600'>Products</span>
				{selectedCategory && <span className='text-gray-600'>|</span>}
				{selectedCategory && <span className=''>{selectedCategory}</span>}
				{selectedSubCategory && <span className='text-gray-600'>|</span>}
				{selectedSubCategory && <span className=''>{selectedSubCategory}</span>}
				{selectedBrand && <span className='text-gray-600'>|</span>}
				{selectedBrand && <span className=''>{selectedBrand}</span>}
			</div>
			<div className='w-full flex flex-col md:flex-row border-t-2 border-gray-200'>
				{/* Sidebar Filters */}
				<div className='w-full md:w-2/6 hidden md:flex flex-col justify-start items-start space-y-6 px-4 py-4 overflow-hidden'>
					{/* Price Filter */}
					<div className='flex flex-col gap-2 w-full max-w-sm'>
						<div className='flex justify-between items-center'>
							<h4 className='font-bold text-[#1a1a1d] text-md'>Price</h4>

							{(priceRange[0] !== MIN || priceRange[1] !== MAX) && (
								<button
									onClick={() => {
										const defaultMin = MIN
										const defaultMax = MAX
										setPriceRange([defaultMin, defaultMax])
										const query = new URLSearchParams(searchParams.toString())
										query.delete('min_price')
										query.delete('max_price')
										router.push(`?${query.toString()}`)
									}}
									className='text-sm underline cursor-pointer'
								>
									Reset filter
								</button>
							)}
						</div>
						<span className='text-sm font-lg'>
							Range: ${priceRange[0]} - ${priceRange[1]}
						</span>
						<Box sx={{ width: '80%', cursor: 'pointer' }}>
							<CustomSlider
								value={priceRange}
								onChange={handlePriceChange}
								valueLabelDisplay='auto'
								min={MIN}
								max={MAX}
								disableSwap
							/>
						</Box>
					</div>

					{/* Category Filter */}
					<div className='flex flex-col gap-2 w-full'>
						<div className='flex justify-between items-center'>
							<h4 className='font-bold text-[#1a1a1d] text-md'>Category</h4>
							{selectedCategory && (
								<button
									onClick={() => router.push('?')}
									className='text-sm underline cursor-pointer'
								>
									Reset filter
								</button>
							)}
						</div>
						<SearchInput
							placeholder='Search category'
							value={categoryQuery}
							onChange={(e) => setCategoryQuery(e.target.value)}
						/>
						<div className='flex flex-wrap gap-2 mt-2'>
							{displayedCategories.map((category) => (
								<button
									key={category}
									onClick={() => handleCategoryClick(category)}
									className={`px-3 py-1 border rounded-full text-sm capitalize cursor-pointer ${
										selectedCategory === category
											? 'bg-black text-white'
											: 'text-black border-black hover:bg-black hover:text-white'
									}`}
								>
									{category}
								</button>
							))}
						</div>
						<div>
							{filteredCategories.length > 5 && (
								<button
									onClick={() => setShowAllCategories(!showAllCategories)}
									className='text-sm underline mt-2 cursor-pointer'
								>
									{showAllCategories ? 'Show Less' : 'Show More'}
								</button>
							)}
						</div>
					</div>

					{/* Sub Category Filter */}
					<div className='flex flex-col gap-2 w-full'>
						<div className='flex justify-between items-center'>
							<h4 className='font-bold text-[#1a1a1d] text-md'>Type</h4>
							{selectedSubCategory && (
								<button
									onClick={() => {
										const query = new URLSearchParams(searchParams.toString())
										query.delete('sub_category')
										router.push(`?${query.toString()}`)
									}}
									className='text-sm underline cursor-pointer'
								>
									Reset filter
								</button>
							)}
						</div>
						<SearchInput
							placeholder='Search type'
							value={subCategoryQuery}
							onChange={(e) => setSubCategoryQuery(e.target.value)}
						/>
						<div className='flex flex-wrap gap-2 mt-2'>
							{displayedSubCategories.map((subCategory) => (
								<button
									key={subCategory}
									onClick={() => handleSubCategoryClick(subCategory)}
									className={`px-3 py-1 border rounded-full text-sm capitalize cursor-pointer ${
										selectedSubCategory === subCategory
											? 'bg-black text-white'
											: 'text-black border-black hover:bg-black hover:text-white'
									}`}
								>
									{subCategory}
								</button>
							))}
						</div>
						<div>
							{filteredSubCategories.length > 5 && (
								<button
									onClick={() => setShowAllSubCategories(!showAllSubCategories)}
									className='text-sm underline mt-2 cursor-pointer'
								>
									{showAllSubCategories ? 'Show Less' : 'Show More'}
								</button>
							)}
						</div>
					</div>

					{/* Brand Filter */}
					<div className='flex flex-col gap-2 w-full'>
						<div className='flex justify-between items-center'>
							<h4 className='font-bold text-[#1a1a1d] text-md'>Brand</h4>
							{selectedBrand && (
								<button
									onClick={() => {
										const query = new URLSearchParams(searchParams.toString())
										query.delete('brand')
										router.push(`?${query.toString()}`)
									}}
									className='text-sm underline cursor-pointer'
								>
									Reset filter
								</button>
							)}
						</div>
						<SearchInput
							placeholder='Search brand'
							value={brandQuery}
							onChange={(e) => setBrandQuery(e.target.value)}
						/>
						<div className='flex flex-wrap gap-2 mt-2'>
							{displayedBrands.map((brand) => (
								<button
									key={brand}
									onClick={() => handleBrandClick(brand)}
									className={`px-3 py-1 border rounded-full text-sm capitalize cursor-pointer ${
										selectedBrand === brand
											? 'bg-black text-white'
											: 'text-black border-black hover:bg-black hover:text-white'
									}`}
								>
									{brand}
								</button>
							))}
						</div>
						<div>
							{filteredBrands.length > 5 && (
								<button
									onClick={() => setShowAllBrands(!showAllBrands)}
									className='text-sm underline mt-2 cursor-pointer'
								>
									{showAllBrands ? 'Show Less' : 'Show More'}
								</button>
							)}
						</div>
					</div>
				</div>

				{/* Product List */}
				<div className='w-full md:w-8/6 px-4 py-4'>
					<div className='hidden lg:flex justify-end items-center gap-2 p-2'>
						<Button
							type='button'
							variant='outlined'
							onClick={() => handleSort('default')}
							sx={{
								backgroundColor:
									sortOption === 'default' ? '#1a1a1d' : 'transparent',
								color: sortOption === 'default' ? '#fff' : '#1a1a1d',
								borderColor: '#1a1a1d',
								'&:hover': {
									backgroundColor: '#1a1a1d',
									color: '#fff',
								},
							}}
						>
							Default
						</Button>

						<Button
							type='button'
							variant='outlined'
							onClick={() => handleSort('best_selling')}
							sx={{
								backgroundColor:
									sortOption === 'best_selling' ? '#1a1a1d' : 'transparent',
								color: sortOption === 'best_selling' ? '#fff' : '#1a1a1d',
								borderColor: '#1a1a1d',
								'&:hover': {
									backgroundColor: '#1a1a1d',
									color: '#fff',
								},
							}}
						>
							Best Selling
						</Button>

						<Button
							type='button'
							variant='outlined'
							onClick={() => handleSort('new_arrival')}
							sx={{
								backgroundColor:
									sortOption === 'new_arrival' ? '#1a1a1d' : 'transparent',
								color: sortOption === 'new_arrival' ? '#fff' : '#1a1a1d',
								borderColor: '#1a1a1d',
								'&:hover': {
									backgroundColor: '#1a1a1d',
									color: '#fff',
								},
							}}
						>
							New Arrival
						</Button>

						<Button
							type='button'
							variant='outlined'
							onClick={() => handleSort('price_asc')}
							sx={{
								backgroundColor:
									sortOption === 'price_asc' ? '#1a1a1d' : 'transparent',
								color: sortOption === 'price_asc' ? '#fff' : '#1a1a1d',
								borderColor: '#1a1a1d',
								'&:hover': {
									backgroundColor: '#1a1a1d',
									color: '#fff',
								},
							}}
						>
							Price: Low to High
						</Button>

						<Button
							type='button'
							variant='outlined'
							onClick={() => handleSort('price_desc')}
							sx={{
								backgroundColor:
									sortOption === 'price_desc' ? '#1a1a1d' : 'transparent',
								color: sortOption === 'price_desc' ? '#fff' : '#1a1a1d',
								borderColor: '#1a1a1d',
								'&:hover': {
									backgroundColor: '#1a1a1d',
									color: '#fff',
								},
							}}
						>
							Price: High to Low
						</Button>
					</div>

					{filteredProducts?.length > 0 ? (
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
							{currentProducts.map((product) => (
								<Link
									key={product?._id}
									href={`/products/${product?._id}`}
								>
									<ProductCard product={product} />
								</Link>
							))}
						</div>
					) : (
						<div className='flex justify-center items-center'>
							<p className='text-center text-gray-600 text-lg'>
								No products found.
							</p>
						</div>
					)}
				</div>
			</div>

			{/* Pagination */}
			<div className='flex justify-center mt-6 gap-2'>
				{paginate().map((page, index) => (
					<button
						key={index}
						onClick={() => handlePageClick(page)}
						className={`px-3 py-1 rounded cursor-pointer ${
							currentPage === page
								? 'bg-black text-white'
								: 'bg-gray-200 text-black hover:bg-black hover:text-white'
						}`}
						disabled={page === '...'}
					>
						{page}
					</button>
				))}
			</div>

			{/* <div className='bg-white sticky top-5 left-5 md:hidden flex justify-center items-center text-black text-center border border-gray-400 h-15 w-15 shadow-2xl z-50'>
				<FilterAltRoundedIcon fontSize='large' />
			</div> */}
		</div>
	)
}

export default ProductList
