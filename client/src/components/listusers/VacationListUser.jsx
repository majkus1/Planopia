import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../dashboard/Sidebar'
import { API_URL } from '../../config.js'
import { useTranslation } from 'react-i18next'

function VacationListUser() {
	const [users, setUsers] = useState([])
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	useEffect(() => {
		fetchUsers()
	}, [])

	const fetchUsers = async () => {
		try {
			const response = await axios.get(`${API_URL}/api/users/all-users`)
			setUsers(response.data)
		} catch (error) {
			console.error('Failed to fetch users:', error)
			setError(t('list.error'))
		}
	}

	const handleUserClick = userId => {
		navigate(`/leave-requests/${userId}`)
	}

	return (
		<>
			<Sidebar />

			<div id="list-employee">
				<h3>{t('vacationlisteq.h3')}</h3>
				<hr />
				{error && <p style={{ color: 'red' }}>{error}</p>}
				<h3 style={{ marginTop: '35px' }}>{t('vacationlisteq.request')}</h3>
				<p>{t('planslist.emplo')}</p>
				<ul>
					{users.map(user => (
						<li key={user._id} onClick={() => handleUserClick(user._id)} style={{ cursor: 'pointer' }}>
							{user.firstName} {user.lastName} - {user.roles.join(', ')} - {user.position || 'Brak stanowiska'}
						</li>
					))}
				</ul>
			</div>
		</>
	)
}

export default VacationListUser
