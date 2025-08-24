import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../dashboard/Sidebar'
import { API_URL } from '../../config.js'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthContext'
import Loader from '../Loader'

function ChangePassword() {
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [position, setPosition] = useState('')
	const { t, i18n } = useTranslation()
	const { role } = useAuth()
	const [loading, setLoading] = useState(true)

	const isPasswordValid = newPassword => {
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/
		return regex.test(newPassword)
	}

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get(`${API_URL}/api/users/profile`)
				setPosition(response.data.position || '')
			} catch (error) {
				console.error('Błąd podczas pobierania danych użytkownika:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchUserData()
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()
		if (newPassword !== confirmPassword) {
			alert(t('editprofile.notsamepass'))
			return
		}
		if (!isPasswordValid(newPassword)) {
			alert(t('newpass.invalidPassword'))
			return
		}
		try {
			await axios.post(`${API_URL}/api/users/change-password`, {
				currentPassword,
				newPassword,
			})
			alert(t('editprofile.successchangepass'))
		} catch (error) {
			alert(t('editprofile.failchangepass'))
			console.error(error)
		}
	}

	const handlePositionUpdate = async () => {
		try {
			await axios.put(`${API_URL}/api/users/update-position`, { position })
			alert(t('editprofile.successchangepos'))
		} catch (error) {
			alert(t('editprofile.failchangepos'))
			console.error(error)
		}
	}

	return (
		<>
			<Sidebar />
			{loading ? (
				<div className="content-with-loader">
					<Loader />
				</div>
			) : (
				<div className="container my-5">
					<div className="row justify-content-start">
						<div className="col-md-8">
							<div>
								<div className="card-body">
									<h4><img src="img/user-avatar.png" alt="ikonka w sidebar" />{t('editprofile.headertxt')}</h4>
									<hr />

									<form
										onSubmit={e => {
											e.preventDefault()
											handlePositionUpdate()
										}}
										className="max-w-md space-y-6">
										<div>
											<label htmlFor="position" className="block text-gray-700 font-medium mb-1">
												{t('editprofile.positionlabel')}
											</label>
											<input
												type="text"
												id="position"
												value={position}
												onChange={e => setPosition(e.target.value)}
												placeholder={t('editprofile.placeholder1')}
												className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
											/>
										</div>

										<button
											type="submit"
											className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition mb-4">
											{t('editprofile.confirmposition')}
										</button>
									</form>

									<div className="mb-3">
										<label className="form-label">{t('editprofile.rolelabel')}</label>
										<input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 form-control yourrolesinput" value={role} readOnly />
									</div>

									<form onSubmit={handleSubmit} className="max-w-md space-y-6 pt-10">
										<h4 className="text-xl font-semibold text-gray-800">{t('editprofile.changepassh4')}</h4>
										<hr className="mb-4" />

										<div>
											<label htmlFor="currentPassword" className="block text-gray-700 font-medium mb-1">
												{t('editprofile.currentpasslabel')}
											</label>
											<input
												type="password"
												id="currentPassword"
												value={currentPassword}
												onChange={e => setCurrentPassword(e.target.value)}
												required
												placeholder={t('editprofile.placeholder2')}
												className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
											/>
										</div>

										<div>
											<label htmlFor="newPassword" className="block text-gray-700 font-medium mb-1">
												{t('editprofile.newpasslabel')}
											</label>
											<input
												type="password"
												id="newPassword"
												value={newPassword}
												onChange={e => setNewPassword(e.target.value)}
												required
												placeholder={t('editprofile.placeholder3')}
												className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
											/>
										</div>

										<div>
											<label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
												{t('editprofile.confirmnewpasslabel')}
											</label>
											<input
												type="password"
												id="confirmPassword"
												value={confirmPassword}
												onChange={e => setConfirmPassword(e.target.value)}
												required
												placeholder={t('editprofile.placeholder4')}
												className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
											/>
										</div>

										<button
											type="submit"
											className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition mb-4">
											{t('editprofile.confirmnewpassbtn')}
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default ChangePassword
