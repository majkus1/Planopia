import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../dashboard/Sidebar'
import { API_URL } from '../../config.js'
import { useTranslation } from 'react-i18next'
import Loader from '../Loader'

function Logs() {
	const [users, setUsers] = useState([])
	const [logs, setLogs] = useState({})
	const [expandedLogs, setExpandedLogs] = useState([])
	const [editingUser, setEditingUser] = useState(null)
	const [editedRoles, setEditedRoles] = useState([])
	const [error, setError] = useState('')
	const { t, i18n } = useTranslation()
	const [loading, setLoading] = useState(true)
	const [departments, setDepartments] = useState([])
	const [editedDepartment, setEditedDepartment] = useState('')
	const [departmentMode, setDepartmentMode] = useState('choose')

	const availableRoles = [
		'Admin',
		'Pracownik (Worker)',
		'Może zatwierdzać urlopy swojego działu (Approve Leaves Department)',
		'Może widzieć ewidencję czasu pracy swojego działu (View Timesheets Department)',
		'Może widzieć wszystkie wnioski i ewidencje (HR) (View All Leaves And Timesheets)',
	]

	const fetchDepartments = async () => {
		try {
			console.log('Fetching departments...');
			const response = await axios.get(`${API_URL}/api/departments`, { withCredentials: true })
			console.log('Departments response:', response.data);
			setDepartments(response.data)
		} catch (error) {
			console.error('Błąd pobierania departmentów:', error)
			console.error('Error response:', error.response?.data);
		}
	}

	const refreshDepartments = async () => {
		await fetchDepartments()
	}

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(`${API_URL}/api/users/all-users`, { withCredentials: true })
				setUsers(response.data)
			} catch (error) {
				console.error('Error fetching users:', error)
				setError('Nie udało się pobrać listy użytkowników')
			} finally {
				setLoading(false)
			}
		}

		fetchUsers()
		fetchDepartments()
	}, [])

	const fetchLogs = async userId => {
		try {
			const response = await axios.get(`${API_URL}/api/userlogs/${userId}`, { withCredentials: true })
			const filteredLogs = response.data.filter(log => log.action !== 'LOGOUT')
			setLogs(prevLogs => ({
				...prevLogs,
				[userId]: filteredLogs,
			}))
		} catch (error) {
			console.error('Error fetching logs:', error)
			setError('Nie udało się pobrać logów')
		} finally {
			setLoading(false)
		}
	}

	const handleExpandLogs = userId => {
		if (expandedLogs.includes(userId)) {
			setExpandedLogs(expandedLogs.filter(id => id !== userId))
		} else {
			setExpandedLogs([...expandedLogs, userId])
			if (!logs[userId]) {
				fetchLogs(userId)
			}
		}
	}

	const handleEditClick = user => {
		setEditingUser(editingUser?._id === user._id ? null : user)
		setEditedRoles(user.roles || [])
		setEditedDepartment(user.department || '')
		setDepartmentMode('choose')
	}

	const handleRoleChange = role => {
		setEditedRoles(prevRoles => (prevRoles.includes(role) ? prevRoles.filter(r => r !== role) : [...prevRoles, role]))
	}

	const handleSaveRoles = async userId => {
		try {
			if (departmentMode === 'new' && editedDepartment && !departments.includes(editedDepartment)) {
				await axios.post(`${API_URL}/api/departments`, { name: editedDepartment }, { withCredentials: true })
				await refreshDepartments()
			}

			await axios.patch(`${API_URL}/api/users/${userId}/roles`, {
				roles: editedRoles,
				department: editedDepartment,
			}, { withCredentials: true })
			
			setUsers(prevUsers =>
				prevUsers.map(user =>
					user._id === userId ? { ...user, roles: editedRoles, department: editedDepartment } : user
				)
			)
			
			setEditingUser(null)
			alert(t('logs.alert'))
		} catch (error) {
			console.error('Error updating roles/department:', error)
			setError(t('logs.alerttwo'))
		}
	}

	return (
		<>
			<Sidebar />

			{error && <p className="text-danger">{error}</p>}

			{loading ? (
				<div className="content-with-loader">
					<Loader />
				</div>
			) : (
				<table className="table table-bordered" id="userandlogs">
					<thead>
						<tr>
							<th>{t('logs.user')}</th>
							<th>{t('logs.action')}</th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<React.Fragment key={user._id}>
								<tr>
									<td>
										{user.username} ({user.roles?.join(', ') || 'Brak ról'})
									</td>
									<td>
										<button
											className="btn btn-primary btn-sm me-2"
											onClick={() => handleEditClick(user)}
											style={{ margin: '3px' }}>
											{t('logs.rolebtn')}
										</button>
										<button
											className="btn btn-info btn-sm me-2"
											onClick={() => handleExpandLogs(user._id)}
											style={{ margin: '3px' }}>
											{t('logs.actionbtn')}
										</button>
									</td>
								</tr>
								{editingUser?._id === user._id && (
									<tr>
										<td colSpan="2">
											<h3>{t('logs.editrole')}</h3>
											{availableRoles.map(role => (
												<label key={role} style={{ marginRight: '10px' }}>
													<input
														type="checkbox"
														checked={editedRoles.includes(role)}
														onChange={() => handleRoleChange(role)}
														style={{ margin: '3px' }}
													/>
													{role}
												</label>
											))}
											<br />

											<h3 className='mt-3'>{t('newuser.department5')}</h3>
											{departments.length > 0 && departmentMode === 'choose' ? (
												<>
												<div className='edit-department'>
													<div>
														{departments.map((dep, index) => (
															<label key={dep} style={{ marginRight: '10px' }}>
																<input
																	type="radio"
																	name="department"
																	value={dep}
																	checked={editedDepartment === dep}
																	onChange={e => setEditedDepartment(e.target.value)}
																	style={{ margin: '3px' }}
																/>
																{dep}
															</label>
														))}
													</div>
													<button
														type="button"
														className="btn btn-link ms-2 py-1 mb-4 to-left-max"
														onClick={() => {
															setEditedDepartment('')
															setDepartmentMode('new')
														}}>
														{t('newuser.department2')}
													</button>
													</div>
												</>
											) : (
												<>
												<div className='edit-department'>
													<input
														type="text"
														placeholder={t('newuser.department4')}
														value={editedDepartment}
														onChange={e => setEditedDepartment(e.target.value)}
														className="w-full border border-gray-300 rounded-md px-4 py-2 m-2 width-custom"
													/>
													{departments.length > 0 && (
														<button
															type="button"
															className="btn btn-link p-2 ms-2 mb-4"
															onClick={() => setDepartmentMode('choose')}>
															{t('newuser.department3')}
														</button>
													)}
													</div>
												</>
											)}
											{/* <br></br> */}
											<button
												className="btn btn-success btn-sm me-2"
												onClick={() => handleSaveRoles(user._id)}
												style={{ margin: '3px' }}>
												{t('logs.save')}
											</button>
											<button
												className="btn btn-danger btn-sm"
												onClick={() => setEditingUser(null)}
												style={{ margin: '3px' }}>
												{t('logs.notsave')}
											</button>
										</td>
									</tr>
								)}
								{expandedLogs.includes(user._id) && logs[user._id] && (
									<tr id="logstable">
										<td colSpan="2">
											<h3>{t('logs.userl')}</h3>
											<table className="table table-bordered">
												<thead>
													<tr>
														<th>{t('logs.actionth')}</th>
														<th>{t('logs.detailsth')}</th>
														<th>{t('logs.timeth')}</th>
													</tr>
												</thead>
												<tbody>
													{logs[user._id].map(log => (
														<tr key={log._id}>
															<td data-label="Akcja">{log.action}</td>
															<td data-label="Szczegóły">{log.details}</td>
															<td data-label="Czas">{new Date(log.timestamp).toLocaleString()}</td>
														</tr>
													))}
												</tbody>
											</table>
										</td>
									</tr>
								)}
							</React.Fragment>
						))}
					</tbody>
				</table>
			)}
		</>
	)
}

export default Logs
