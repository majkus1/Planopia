import React, { useState } from 'react'
import axios from 'axios'
import Sidebar from '../dashboard/Sidebar'
import { API_URL } from '../../config.js'
import { useTranslation } from 'react-i18next'

function CreateUser() {
	const availableRoles = [
		'Admin',
		'IT',
		'Marketing',
		'Bukmacher',
		'Bok',
		'Kierownik IT',
		'Kierownik BOK',
		'Kierownik Bukmacher',
		'Kierownik Marketing',
		'Urlopy czas pracy',
		'Zarząd',
	]

	const [username, setUsername] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [selectedRoles, setSelectedRoles] = useState([])
	const [draggedRole, setDraggedRole] = useState(null)
	const { t, i18n } = useTranslation()

	const handleUsernameChange = e => {
		const value = e.target.value.toLowerCase()
		setUsername(value)
	}

	const handleDragStart = role => {
		setDraggedRole(role)
	}

	const handleDrop = () => {
		if (draggedRole && !selectedRoles.includes(draggedRole)) {
			setSelectedRoles(prevRoles => [...prevRoles, draggedRole])
		}
		setDraggedRole(null)
	}

	const handleRoleClick = role => {
		if (selectedRoles.includes(role)) {
			setSelectedRoles(prevRoles => prevRoles.filter(r => r !== role))
		} else {
			setSelectedRoles(prevRoles => [...prevRoles, role])
		}
	}

	const handleRemoveRole = roleToRemove => {
		setSelectedRoles(prevRoles => prevRoles.filter(role => role !== roleToRemove))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const newUser = { username, firstName, lastName, roles: selectedRoles }

			const response = await axios.post(`${API_URL}/api/users/register`, newUser)

			if (response.status === 201) {
				alert(t('newuser.alertone'))
				setUsername('')
				setFirstName('')
				setLastName('')
				setSelectedRoles([])
			} else {
				throw new Error('Error')
			}
		} catch (error) {
			const code = error.response?.data?.code

			if (code === 'USER_EXISTS') {
				alert(t('newuser.error_user_exists'))
			} else {
				alert(t('newuser.error_generic') || error.message)
			}
		}
	}

	return (
		<>
			<Sidebar />
			<div className="container my-5 d-flex justify-content-center align-items-center">
				<div className="row justify-content-start">
					<div className="col-md-8">
						<div>
							<div className="card-body">
								<h4>{t('newuser.h4')}</h4>
								<hr></hr>
								<form onSubmit={handleSubmit} className="max-w-2xl space-y-6" id="addusers">
									<div>
										<label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
											{t('newuser.email')}
										</label>
										<br></br>
										<input
											type="email"
											id="username"
											value={username}
											onChange={handleUsernameChange}
											required
											className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
										/>
									</div>

									<div>
										<label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
											{t('newuser.firstn')}
										</label>
										<br></br>
										<input
											type="text"
											id="firstName"
											value={firstName}
											onChange={e => setFirstName(e.target.value)}
											required
											className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
										/>
									</div>

									<div>
										<label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
											{t('newuser.lastn')}
										</label>
										<br></br>
										<input
											type="text"
											id="lastName"
											value={lastName}
											onChange={e => setLastName(e.target.value)}
											required
											className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
										/>
									</div>

									<div className="mt-8">
										<label htmlFor="roles" className="block text-sm font-medium text-gray-700 mb-4">
											{t('newuser.giverole')}
										</label>

										<div className="flex flex-col lg:flex-row gap-6">
											{/* Available Roles */}
											<div className="w-full lg:w-1/2 bg-gray-50 border border-gray-300 rounded-lg p-4 min-h-[120px]">
												<p className="font-semibold text-gray-700 mb-2">{t('newuser.avair')}</p>
												{availableRoles.map(role => (
													<div
														key={role}
														draggable
														onDragStart={() => handleDragStart(role)}
														onClick={() => handleRoleClick(role)}
														className={`border px-3 py-1 rounded-md cursor-pointer mb-2 text-sm ${
															selectedRoles.includes(role)
																? 'bg-blue-600 text-white'
																: 'bg-white hover:bg-gray-100 text-gray-800'
														}`}>
														{role}
													</div>
												))}
											</div>

											{/* Selected Roles */}
											<div
												className="w-full lg:w-1/2 bg-gray-50 border border-gray-300 rounded-lg p-4 min-h-[120px]"
												onDragOver={e => e.preventDefault()}
												onDrop={handleDrop}>
												<p className="font-semibold text-gray-700 mb-2">{t('newuser.choosen')}</p>
												{selectedRoles.map(role => (
													<div
														key={role}
														className="flex items-center justify-between bg-white border px-3 py-1 rounded-md mb-2">
														<span className="text-sm text-gray-800">{role}</span>
														<button
															type="button"
															className="text-red-600 text-xl hover:text-red-800 ml-3"
															onClick={() => handleRemoveRole(role)}>
															&times;
														</button>
													</div>
												))}
											</div>
										</div>
									</div>

									<button
										type="submit"
										className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition mb-5">
										{t('newuser.register')}
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default CreateUser
