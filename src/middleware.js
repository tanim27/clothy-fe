import { withAuth } from 'next-auth/middleware'

export default withAuth({
	pages: {
		signIn: '/login', // Redirect to login if not authenticated
	},
	// callbacks: {
	// 	authorized: ({ token }) => {
	// 		// Ensure the user is logged in and has an "admin" role
	// 		return !!token && token.role === 'admin'
	// 	},
	// },
})

export const config = {
	matcher: [
		'/profile/:path*',
		'/cart/:path*',
		'/order/:path*',
		// '/user/:path*',
	],
}
