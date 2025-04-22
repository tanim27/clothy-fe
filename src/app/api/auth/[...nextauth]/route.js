import axiosRequest from '@/utils/axiosRequest'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'admin@example.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				try {
					const user = await axiosRequest({
						req, // Pass `req` for server-side token support
						url: '/api/auth/login',
						method: 'POST',
						data: credentials,
					})

					if (user) {
						return user
					} else {
						return null
					}
				} catch (error) {
					throw new Error('Invalid credentials')
				}
			},
		}),

		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],

	callbacks: {
		// Save Google user to your backend
		async signIn({ user, account }) {
			if (account?.provider === 'google') {
				try {
					const res = await axiosRequest({
						url: '/api/auth/google-login',
						method: 'POST',
						data: {
							name: user.name,
							email: user.email,
						},
					})

					// Attach token from backend to user object
					user.token = res.token
					user.id = res.user._id
				} catch (error) {
					console.error('Google login failed to save user:', error)
					return false
				}
			}
			return true
		},

		async jwt({ token, user, account }) {
			if (user) {
				token.user = user
				token.accessToken = user.token
			}
			if (account) {
				token.provider = account.provider // store provider info
			}
			return token
		},

		async session({ session, token }) {
			const rawUser = token.user?.user || token.user // handles both cases

			session.user = {
				_id: rawUser._id,
				name: rawUser.name,
				email: rawUser.email,
				provider: token.provider || 'credentials', // default to 'credentials' if not present
			}
			session.accessToken = token.accessToken
			return session
		},

		async redirect({ url, baseUrl }) {
			return url.startsWith(baseUrl) ? url : baseUrl
		},
	},

	pages: {
		signIn: '/login',
	},
	secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
