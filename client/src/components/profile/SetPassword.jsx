import React, { useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { API_URL } from '../../config.js'
import { useTranslation } from 'react-i18next'

function SetPassword() {
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [position, setPosition] = useState('')
	const { token } = useParams()
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	const lngs = {
		en: { nativeName: '', flag: '/img/united-kingdom.png' },
		pl: { nativeName: '', flag: '/img/poland.png' },
	}

	const isPasswordValid = password => {
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/
		return regex.test(password)
	}

	const handleSubmit = async e => {
		e.preventDefault()
		if (password !== confirmPassword) {
			alert(t('newpass.messone'))
			return
		}
		if (!isPasswordValid(password)) {
			alert(t('newpass.invalidPassword'))
			return
		}
		try {
			const response = await axios.post(`${API_URL}/api/users/set-password`, {
				password,
				token,
				position,
			})
			alert(t('newpass.messtwo'))
			navigate('/')
		} catch (error) {
			alert(t('newpass.messthree'))
		}
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
					<div className="set-pass">
						<h2 style={{ marginTop: '20px', marginBottom: '20px' }}>{t('newpass.h2n')}</h2>
						<form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
							{/* Hasło */}
							<input
								type="password"
								id="password"
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
								placeholder={t('newpass.newpassone')}
								className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
							/>

							{/* Powtórz hasło */}
							<input
								type="password"
								id="confirmPassword"
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
								required
								placeholder={t('newpass.newpassrepeat')}
								className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
							/>

							{/* Wymagania hasła */}
							<small className="text-gray-500 block">{t('newpass.requirements')}</small>

							{/* Stanowisko */}
							<input
								type="text"
								id="position"
								value={position}
								onChange={e => setPosition(e.target.value)}
								required
								placeholder={t('newpass.position')}
								className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 mt-3"
							/>

							{/* Przycisk */}
							<button
								type="submit"
								className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition mb-4">
								{t('newpass.btnsuccess')}
							</button>
						</form>
					</div>
				</div>
			</div>
			<Link
				to="/login"
				style={{ margin: '20px', fontSize: '14px', textDecoration: 'none', color: 'blue', opacity: '0.6' }}>
				{t('resetpass.backto')}
			</Link>
		</div>
	)
}

export default SetPassword
