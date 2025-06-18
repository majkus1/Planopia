import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../config.js'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function ResetPassword() {
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	const lngs = {
		en: { nativeName: '', flag: '/img/united-kingdom.png' },
		pl: { nativeName: '', flag: '/img/poland.png' },
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const response = await axios.post(`${API_URL}/api/users/reset-password-request`, { email })
			alert(t('resetpass.messok'))
			setTimeout(() => {
				navigate('/login')
			}, 5000)
		} catch (error) {
			alert(t('resetpass.messfail'))
			if (error.response?.status === 429) {
				alert(t('resetpass.toomany'))
			}
		}
	}

	const handleEmailChange = e => {
		setEmail(e.target.value.toLowerCase())
	}

	return (
		<div className="alllogin">
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
			<div className="login-box">
				<div className="login-logo">
					<div>
						<img src="/img/planopialogo.png" alt="logo oficjalne planopia" style={{ maxWidth: '180px' }}/>
					</div>
				</div>
				<div className="card">
					<div className="reset-password-container">
						<h2 style={{ marginBottom: '20px', marginTop: '20px' }}>{t('resetpass.txt1')}</h2>
						<form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
							{/* Email input */}
							<div>
								<input
									type="email"
									id="email"
									value={email}
									onChange={handleEmailChange}
									placeholder="Email"
									required
									className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							{/* Submit button */}
							<button
								type="submit"
								className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition mb-4">
								{t('resetpass.txt3')}
							</button>

							{/* Optional message */}
							{message && <p className="text-sm text-gray-700 max-w-xs">{message}</p>}
						</form>
					</div>
				</div>
			</div>
			<Link to="/login" style={{ margin: '20px', fontSize: '14px', textDecoration: 'none', color: 'blue', opacity: '0.6' }}>
			{t('resetpass.backto')}
			</Link>
		</div>
	)
}

export default ResetPassword
