import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { API_URL } from '../../config'

const TeamRegistration = () => {
	const [formData, setFormData] = useState({
		teamName: '',
		adminEmail: '',
		adminPassword: '',
		adminFirstName: '',
		adminLastName: ''
	})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const { setLoggedIn, setRole, setUsername } = useAuth()
	const { t, i18n } = useTranslation()

	const lngs = {
		en: { nativeName: '', flag: '/img/united-kingdom.png' },
		pl: { nativeName: '', flag: '/img/poland.png' },
	}

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		setError('')

		try {
			const response = await axios.post(`${API_URL}/api/teams/register`, formData, {
				withCredentials: true
			})

			if (response.data.success) {
				setLoggedIn(true)
				setRole(response.data.user.roles)
				setUsername(response.data.user.username)

				alert(t('newteam.successMessage'))
				
				navigate('/dashboard')
			}
		} catch (error) {
			console.error('Team registration error:', error)
			
			let errorMessage = t('newteam.errorGeneric')
			
			if (error.response?.data?.message) {
				const serverMessage = error.response.data.message
				
				if (serverMessage.includes('nazwie już istnieje') || serverMessage.includes('name already exists')) {
					errorMessage = t('newteam.errorTeamExists')
				} else if (serverMessage.includes('emailu już istnieje') || serverMessage.includes('email already exists')) {
					errorMessage = t('newteam.errorEmailExists')
				} else if (serverMessage.includes('Wszystkie pola są wymagane') || serverMessage.includes('All fields are required')) {
					errorMessage = t('newteam.errorValidation')
				} else {
					errorMessage = serverMessage
				}
			}
			
			setError(errorMessage)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img src="img/new-logoplanopia.png" style={{ width: '250px', margin: '0 auto', marginBottom: '40px' }} />
			<div className="language-box">
				{Object.keys(lngs).map(lng => (
					<button
						key={lng}
						type="button"
						style={{
							fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal',
							marginRight: '5px',
						}}
						className="flag-language"
						onClick={() => i18n.changeLanguage(lng)}>
						<img
							src={lngs[lng].flag}
							alt={`${lngs[lng].nativeName} flag`}
							style={{ width: '23px', marginRight: '5px' }}
						/>
						{lngs[lng].nativeName}
					</button>
				))}
			</div>
			<p className="mt-6 text-center text-3xl font-extrabold text-gray-900 mt-4">
  {t('newteam.h2')}
</p>
<p className="mt-2 text-center text-sm text-gray-600 px-2">
  {t('newteam.subtitle')}
</p>
</div>

<div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
  <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">
          {t('newteam.teamName')}
        </label>
        <div className="mt-1">
          <input
            id="teamName"
            name="teamName"
            type="text"
            required
            value={formData.teamName}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder={t('newteam.teamNamePlaceholder')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700">
          {t('newteam.adminEmail')}
        </label>
        <div className="mt-1">
          <input
            id="adminEmail"
            name="adminEmail"
            type="email"
            required
            value={formData.adminEmail}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder={t('newteam.adminEmailPlaceholder')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700">
          {t('newteam.adminPassword')}
        </label>
        <div className="mt-1">
          <input
            id="adminPassword"
            name="adminPassword"
            type="password"
            required
            value={formData.adminPassword}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder={t('newteam.adminPasswordPlaceholder')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="adminFirstName" className="block text-sm font-medium text-gray-700">
          {t('newteam.adminFirstName')}
        </label>
        <div className="mt-1">
          <input
            id="adminFirstName"
            name="adminFirstName"
            type="text"
            required
            value={formData.adminFirstName}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder={t('newteam.adminFirstNamePlaceholder')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="adminLastName" className="block text-sm font-medium text-gray-700">
          {t('newteam.adminLastName')}
        </label>
        <div className="mt-1">
          <input
            id="adminLastName"
            name="adminLastName"
            type="text"
            required
            value={formData.adminLastName}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder={t('newteam.adminLastNamePlaceholder')}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? t('newteam.creating') : t('newteam.submit')}
        </button>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          {t('newteam.afterCreate')}
        </p>
      </div>
    </form>
    
    {/* Przycisk powrotu do logowania */}
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      marginTop: '30px',
      marginBottom: '20px'
    }}>
      <Link 
        to="/login" 
        style={{ 
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          fontSize: '14px',
          fontWeight: '500',
          textDecoration: 'none',
          color: '#6b7280',
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          transition: 'all 0.2s ease',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#f3f4f6'
          e.target.style.borderColor = '#d1d5db'
          e.target.style.color = '#374151'
          e.target.style.transform = 'translateY(-1px)'
          e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#f9fafb'
          e.target.style.borderColor = '#e5e7eb'
          e.target.style.color = '#6b7280'
          e.target.style.transform = 'translateY(0)'
          e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        {t('newteam.backToLogin')}
      </Link>
    </div>
  </div>
</div>
</div>

	)
}

export default TeamRegistration
