// context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import { useLocation } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(null)
	const [role, setRole] = useState([])
	const [username, setUsername] = useState(null)
	const [csrfToken, setCsrfToken] = useState(null)

	const location = useLocation()

	const publicPaths = ['/login', '/reset-password', '/new-password', '/set-password', '/aplikacja-dla-firm', '/blog/jak-usprawnic-firme']

	useEffect(() => {
		const fetchCsrfToken = async () => {
			try {
				const res = await axios.get(`${API_URL}/api/csrf-token`, { withCredentials: true })
				setCsrfToken(res.data.csrfToken)
			} catch (err) {
				console.error('Błąd CSRF:', err)
			}
		}
		fetchCsrfToken()
	}, [])

	useEffect(() => {
		if (publicPaths.includes(location.pathname)) {
			setLoggedIn(false)
			return
		}
		axios
			.get(`${API_URL}/api/users/me`, { withCredentials: true })
			.then(res => {
				setLoggedIn(true)
				setRole(res.data.roles)
				setUsername(res.data.username)
			})
			.catch(() => {
				setLoggedIn(false)
				setRole([])
				setUsername(null)
			})
	}, [])

	const logout = () => {
		axios
			.post(
				`${API_URL}/api/users/logout`,
				{},
				{
					withCredentials: true,
					headers: {
						'X-CSRF-Token': csrfToken, // 👈 tutaj!
					},
				}
			)
			.then(() => {
				setLoggedIn(false)
				setRole([])
				setUsername(null)
			})
			.catch(err => {
				console.error('Błąd wylogowania:', err)
			})
	}

	return (
		<AuthContext.Provider
			value={{
				loggedIn,
				role,
				username,
				csrfToken,
				setLoggedIn,
				setRole,
				setUsername,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
