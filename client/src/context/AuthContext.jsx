// context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../config.js'
import { useLocation } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null)
  const [role, setRole] = useState([])
  const [username, setUsername] = useState(null)

  const location = useLocation()

  const publicPaths = [
    '/login',
    '/reset-password',
    '/new-password',
    '/set-password',
    '/aplikacja-dla-firm',
    '/blog/jak-usprawnic-firme',
  ]

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/me`, { withCredentials: true })
        setLoggedIn(true)
        setRole(res.data.roles)
        setUsername(res.data.username)
      } catch (err) {
        try {
          // Próbujemy odświeżyć token
          await axios.post(`${API_URL}/api/users/refresh-token`, {}, { withCredentials: true })
          const res = await axios.get(`${API_URL}/api/users/me`, { withCredentials: true })
          setLoggedIn(true)
          setRole(res.data.roles)
          setUsername(res.data.username)
        } catch (refreshErr) {
          // refresh się nie udał, czyli user faktycznie wylogowany
          setLoggedIn(false)
          setRole([])
          setUsername(null)
        }
      }
    }

    if (!publicPaths.includes(location.pathname)) {
      checkAuth()
    } else {
      setLoggedIn(false)
    }
  }, [location.pathname])

  const logout = () => {
    axios
      .post(`${API_URL}/api/users/logout`, {}, { withCredentials: true })
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
