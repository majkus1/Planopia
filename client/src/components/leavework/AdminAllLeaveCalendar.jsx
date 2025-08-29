import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Sidebar from '../dashboard/Sidebar'
import axios from 'axios'
import { API_URL } from '../../config.js'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthContext'
import Loader from '../Loader'

function AdminAllLeaveCalendar() {
	const [leavePlans, setLeavePlans] = useState([])
	const [acceptedLeaveRequests, setAcceptedLeaveRequests] = useState([])
	const colorsRef = useRef({})
	const usedColors = useRef(new Set())
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
	const calendarRef = useRef(null)
	const [users, setUsers] = useState([])
	const [selectedUser, setSelectedUser] = useState(null)
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()
	const { role, logout, username, teamId } = useAuth()
	const [loading, setLoading] = useState(true)

	// Sprawdź czy teamId jest dostępny
	useEffect(() => {
		if (!teamId) {
			console.log('AdminAllLeaveCalendar: teamId is null, cannot load data')
			setLoading(false)
			setError('Team ID is not available')
		}
	}, [teamId])

	useEffect(() => {
		if (teamId) {
			fetchUsers()
		}
	}, [teamId])

	useEffect(() => {
		if (users.length > 0 && teamId) {
			console.log('Users loaded, now fetching leave plans')
			fetchAllLeavePlans()
			fetchAcceptedLeaveRequests()
		}
	}, [users, teamId])

	const fetchUsers = async () => {
		try {
			setLoading(true)
			setError('') 
			
			console.log('Fetching users with teamId:', teamId)
			
			const response = await axios.get(`${API_URL}/api/users/all-users`, {
				withCredentials: true
			})
			
			console.log('Users loaded:', response.data.length)
			console.log('Users data:', response.data)
			setUsers(response.data)
		} catch (error) {
			console.error('Error fetching users:', error)
			console.error('Error response:', error.response?.data)
			setError(t('list.error'))
		} finally {
			setLoading(false)
		}
	}

	const fetchAllLeavePlans = async () => {
		try {
			console.log('Fetching leave plans for users:', users.length)
			
			
			const response = await axios.get(`${API_URL}/api/planlea/admin/all-leave-plans`, {
				withCredentials: true
			})
			
			console.log('All leave plans loaded:', response.data.length)
			
			
			const teamLeavePlans = response.data.filter(plan => {
				
				const hasUser = users.some(user => user._id === plan.userId)
				if (hasUser) {
					console.log('Plan for user:', plan.userId, 'included')
				}
				return hasUser
			})
			
			console.log('Team leave plans filtered:', teamLeavePlans.length)
			setLeavePlans(teamLeavePlans)
		} catch (error) {
			console.error('Failed to fetch leave plans:', error)
			setError(t('list.error'))
		}
	}

	const fetchAcceptedLeaveRequests = async () => {
		try {
			console.log('Fetching accepted leave requests')
			
			const response = await axios.get(`${API_URL}/api/leaveworks/accepted-leave-requests`, {
				withCredentials: true
			})
			
			console.log('Accepted leave requests loaded:', response.data.length)
			console.log('Sample request data:', response.data[0])
			
			// Filtruj tylko wnioski użytkowników z tego samego teamu i sprawdź czy userId istnieje
			const teamLeaveRequests = response.data.filter(request => {
				if (!request.userId || !request.userId._id) {
					console.log('Request without userId:', request)
					return false
				}
				const hasUser = users.some(user => user._id === request.userId._id)
				return hasUser
			})
			
			console.log('Team leave requests filtered:', teamLeaveRequests.length)
			setAcceptedLeaveRequests(teamLeaveRequests)
		} catch (error) {
			console.error('Failed to fetch accepted leave requests:', error)
			setError(t('list.error'))
		}
	}

	const generateUniqueColor = () => {
		let color
		do {
			const randomHue = Math.random() * 360
			color = `hsl(${randomHue}, 70%, 80%)`
		} while (usedColors.current.has(color))
		usedColors.current.add(color)
		return color
	}
	
	const getColorForUser = username => {
		if (!colorsRef.current[username]) {
			colorsRef.current[username] = generateUniqueColor()
		}
		return colorsRef.current[username]
	}

	const handleMonthSelect = event => {
		const newMonth = parseInt(event.target.value, 10)
		setCurrentMonth(newMonth)
		goToSelectedDate(newMonth, currentYear)
	}

	const handleYearSelect = event => {
		const newYear = parseInt(event.target.value, 10)
		setCurrentYear(newYear)
		goToSelectedDate(currentMonth, newYear)
	}

	const goToSelectedDate = (month, year) => {
		const calendarApi = calendarRef.current.getApi()
		calendarApi.gotoDate(new Date(year, month, 1))
	}

	const handleMonthChange = info => {
		const newMonth = info.view.currentStart.getMonth()
		const newYear = info.view.currentStart.getFullYear()
		setCurrentMonth(newMonth)
		setCurrentYear(newYear)
	}

	const handleUserClick = userId => {
		navigate(`/leave-plans/${userId}`)
	}

	return (
		<>
			<Sidebar handleLogout={logout} role={role} username={username} />
			{loading ? (
				<div className="content-with-loader">
					<Loader />
				</div>
			) : (
			<div id='all-leaveplans' style={{ padding: "20px" }}>
				<h3><img src="img/schedule.png" alt="ikonka w sidebar" /> {t('planslist.h3')}</h3>
				<hr />
				{error && <p style={{ color: 'red' }}>{error}</p>}
                <p>{t('planslist.emplo')}</p>
				<ul>
					{users.map(user => (
						<li key={user._id} onClick={() => handleUserClick(user._id)} style={{ cursor: "pointer" }}>
							{user.firstName} {user.lastName} - {user.roles.join(', ')} - {user.position || 'Brak stanowiska'}
						</li>
					))}
				</ul>
				<div className="calendar-controls flex flex-wrap gap-4 items-center" style={{ marginTop: '40px' }}>
					<label className="flex items-center space-x-2">
					{t('workcalendar.monthlabel')}
						<select value={currentMonth} onChange={handleMonthSelect} style={{ marginLeft: '5px' }} className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
							{Array.from({ length: 12 }, (_, i) => (
								<option key={i} value={i}>
									{new Date(0, i)
										.toLocaleString(i18n.resolvedLanguage, { month: 'long' })
										.replace(/^./, str => str.toUpperCase())}
								</option>
							))}
						</select>
					</label>
					<label style={{ marginLeft: '10px' }} className="flex items-center space-x-2">
					{t('workcalendar.yearlabel')}
						<select value={currentYear} onChange={handleYearSelect} style={{ marginLeft: '5px' }} className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
							{Array.from({ length: 20 }, (_, i) => {
								const year = new Date().getFullYear() - 10 + i
								return (
									<option key={year} value={year}>
										{year}
									</option>
								)
							})}
						</select>
					</label>
				</div>
				<div>
					<FullCalendar
						plugins={[dayGridPlugin]}
						initialView='dayGridMonth'
						initialDate={new Date()}
						locale={i18n.resolvedLanguage}
						height='auto'
						firstDay={1}
						showNonCurrentDates={false}
						events={[
							// Plany urlopów
							...leavePlans.map(plan => ({
								title: `${plan.firstName} ${plan.lastName} (Plan)`,
								start: plan.date,
								allDay: true,
								backgroundColor: getColorForUser(plan.username),
								borderColor: getColorForUser(plan.username),
								extendedProps: { type: 'plan', userId: plan.userId }
							})),
							// Zaakceptowane wnioski urlopowe
							...acceptedLeaveRequests
								.filter(request => request.userId && request.userId.username) // Dodatkowe zabezpieczenie
								.map(request => ({
									title: `${request.userId.firstName} ${request.userId.lastName} (${t(request.type)})`,
									start: request.startDate,
									end: request.endDate,
									allDay: true,
									backgroundColor: getColorForUser(request.userId.username),
									borderColor: getColorForUser(request.userId.username),
									extendedProps: { type: 'request', userId: request.userId._id, requestId: request._id }
								}))
						]}
						ref={calendarRef}
						datesSet={handleMonthChange}
					/>
				</div>
			</div>
			)}
		</>
	)
}

export default AdminAllLeaveCalendar
