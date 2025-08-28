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
			const response = await axios.get(`${API_URL}/api/departments`, { withCredentials: true })
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
		setEditedDepartment(user.department || '')  // Ustaw obecny dział użytkownika
		setDepartmentMode('choose')  // Zawsze zaczynaj od trybu wyboru
	}

	const handleRoleChange = role => {
		setEditedRoles(prevRoles => (prevRoles.includes(role) ? prevRoles.filter(r => r !== role) : [...prevRoles, role]))
	}

	const handleSaveRoles = async userId => {
		try {
			// Jeśli to nowy dział i nie istnieje w liście, dodaj go do kolekcji departments
			if (departmentMode === 'new' && editedDepartment && !departments.includes(editedDepartment)) {
				await axios.post(`${API_URL}/api/departments`, { name: editedDepartment }, { withCredentials: true })
				await refreshDepartments()
			}

			// Zaktualizuj użytkownika z nowymi rolami i działem
			await axios.patch(`${API_URL}/api/users/${userId}/roles`, {
				roles: editedRoles,
				department: editedDepartment,
			}, { withCredentials: true })
			
			setUsers(prevUsers =>
				prevUsers.map(user =>
					user._id === userId ? { ...user, roles: editedRoles, department: editedDepartment } : user
				)
			)
			
			// Resetuj tryb do wyboru działu i odśwież listę
			setDepartmentMode('choose')
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

			<div className="logs-container" style={{ 
				padding: '20px', 
				maxWidth: '1200px', 
				margin: '0 auto'
			}}>
				<div className="logs-header" style={{ marginBottom: '30px', textAlign: 'center' }}>
					
				</div>

				{error && (
					<div style={{ 
						backgroundColor: '#f8d7da', 
						color: '#721c24', 
						padding: '15px', 
						borderRadius: '8px', 
						marginBottom: '20px',
						border: '1px solid #f5c6cb'
					}}>
						{error}
					</div>
				)}

			{loading ? (
				<div className="content-with-loader">
					<Loader />
				</div>
			) : (
				<div className="logs-content">
					{/* Desktop view - tabela */}
					<div className="users-table-container desktop-view" style={{ 
						backgroundColor: 'white', 
						borderRadius: '12px', 
						boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
						overflow: 'hidden',
						display: 'none' // Ukrywamy na mobile
					}}>
						<table className="table" style={{ margin: 0 }}>
							<thead style={{ backgroundColor: '#f8f9fa' }}>
								<tr>
									<th style={{ 
										padding: '20px', 
										borderBottom: '2px solid #dee2e6',
										color: '#495057',
										fontWeight: '600'
									}}>
										{t('logs.user')}
									</th>
									<th style={{ 
										padding: '20px', 
										borderBottom: '2px solid #dee2e6',
										color: '#495057',
										fontWeight: '600',
										textAlign: 'center'
									}}>
										{t('logs.action')}
									</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user, index) => (
							<React.Fragment key={user._id}>
								<tr style={{ 
									backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa',
									transition: 'background-color 0.2s'
								}}>
									<td style={{ 
										padding: '20px', 
										verticalAlign: 'middle'
									}}>
										<div style={{ 
											display: 'flex', 
											alignItems: 'center'
										}}>
											<div style={{ 
												width: '40px', 
												height: '40px', 
												borderRadius: '50%', 
												backgroundColor: '#3498db',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												color: 'white',
												fontWeight: 'bold',
												marginRight: '15px'
											}}>
												{user.username.charAt(0).toUpperCase()}
											</div>
											<div>
												<div style={{ 
													fontWeight: '600', 
													color: '#2c3e50', 
													marginBottom: '5px'
												}}>
													{user.username}
												</div>
												<div style={{ 
													fontSize: '14px', 
													color: '#7f8c8d'
												}}>
													{user.roles?.join(', ') || 'Brak ról'}
												</div>
												{user.department && (
													<div style={{ 
														fontSize: '12px', 
														color: '#95a5a6', 
														marginTop: '3px'
													}}>
														Dział: {user.department}
													</div>
												)}
											</div>
										</div>
									</td>
									<td style={{ 
										padding: '20px', 
										textAlign: 'center'
									}}>
										<div style={{ 
											display: 'flex', 
											gap: '10px', 
											justifyContent: 'center'
										}}>
										<button
											className="btn btn-primary"
											onClick={() => handleEditClick(user)}
											style={{ 
												padding: '8px 16px',
												borderRadius: '6px',
												border: 'none',
												fontSize: '14px',
												fontWeight: '500',
												transition: 'all 0.2s',
												boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
											}}>
											{t('logs.rolebtn')}
										</button>
										<button
											className="btn btn-info"
											onClick={() => handleExpandLogs(user._id)}
											style={{ 
												padding: '8px 16px',
												borderRadius: '6px',
												border: 'none',
												fontSize: '14px',
												fontWeight: '500',
												transition: 'all 0.2s',
												boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
											}}>
											{t('logs.actionbtn')}
										</button>
													</div>
									</td>
								</tr>
								{editingUser?._id === user._id && (
									<tr>
										<td colSpan="2" style={{ padding: '0' }}>
											<div style={{ 
												backgroundColor: '#f8f9fa', 
												padding: '30px',
												borderTop: '1px solid #dee2e6'
											}}>
												<div style={{ maxWidth: '800px', margin: '0 auto' }}>
													<h4 style={{ 
														color: '#2c3e50', 
														marginBottom: '20px',
														paddingBottom: '10px',
														borderBottom: '2px solid #3498db'
													}}>
														{t('logs.editrole')}
													</h4>
													
													{/* Role */}
													<div style={{ marginBottom: '30px' }}>
														<h5 style={{ color: '#34495e', marginBottom: '15px' }}>Role użytkownika:</h5>
														<div style={{ 
															display: 'grid', 
															gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
															gap: '10px'
														}}>
															{availableRoles.map(role => (
																<label key={role} style={{ 
																	display: 'flex', 
																	alignItems: 'center',
																	padding: '12px',
																	backgroundColor: 'white',
																	borderRadius: '6px',
																	border: '1px solid #dee2e6',
																	cursor: 'pointer',
																	transition: 'all 0.2s',
																	boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
																}}>
																	<input
																		type="checkbox"
																		checked={editedRoles.includes(role)}
																		onChange={() => handleRoleChange(role)}
																		style={{ 
																			marginRight: '10px',
																			transform: 'scale(1.2)'
																		}}
																	/>
																	<span style={{ fontSize: '14px' }}>{role}</span>
																</label>
															))}
														</div>
													</div>

													{/* Dział */}
													<div style={{ marginBottom: '30px' }}>
														<h5 style={{ 
															color: '#34495e', 
															marginBottom: '15px'
														}}>
															{t('newuser.department5')}
														</h5>
														
														{/* Tryb wyboru z listy */}
														{departmentMode === 'choose' && (
															<div style={{ marginBottom: '20px' }}>
																<div style={{ 
																	display: 'grid', 
																	gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
																	gap: '10px',
																	marginBottom: '15px'
																}}>
																	{departments.map((dep) => (
																		<label key={dep} style={{ 
																			display: 'flex', 
																			alignItems: 'center',
																			padding: '10px',
																			backgroundColor: 'white',
																			borderRadius: '6px',
																			border: '1px solid #dee2e6',
																			cursor: 'pointer',
																			transition: 'all 0.2s'
																		}}>
																			<input
																				type="radio"
																				name="department"
																				value={dep}
																				checked={editedDepartment === dep}
																				onChange={e => setEditedDepartment(e.target.value)}
																				style={{ marginRight: '10px', transform: 'scale(1.2)' }}
																			/>
																			<span>{dep}</span>
																		</label>
																	))}
																</div>
																
																<button
																	type="button"
																	className="btn btn-outline-primary"
																	onClick={() => {
																		setEditedDepartment('')
																		setDepartmentMode('new')
																	}}
																	style={{ 
																		padding: '8px 16px',
																		borderRadius: '6px',
																		border: '1px solid #3498db',
																		backgroundColor: 'transparent',
																		color: '#3498db',
																		transition: 'all 0.2s'
																	}}>
																	{t('newuser.department2')}
																</button>
															</div>
														)}
														
														{/* Tryb dodawania nowego działu */}
														{departmentMode === 'new' && (
															<div style={{ 
																backgroundColor: 'white',
																padding: '20px',
																borderRadius: '8px',
																border: '2px solid #3498db'
															}}>
																<div style={{ marginBottom: '15px' }}>
																	<label style={{ 
																		display: 'block',
																		marginBottom: '8px',
																		fontWeight: '600',
																		color: '#2c3e50'
																	}}>
																		{t('newuser.department2')}
																	</label>
																	<input
																		type="text"
																		placeholder={t('newuser.department4')}
																		value={editedDepartment}
																		onChange={e => setEditedDepartment(e.target.value)}
																		style={{ 
																			width: '100%',
																			padding: '12px',
																			border: '1px solid #bdc3c7',
																			borderRadius: '6px',
																			fontSize: '16px',
																			transition: 'border-color 0.2s'
																		}}
																	/>
																</div>
																
																<div style={{ display: 'flex', gap: '10px' }}>
																	
																	
																	<button
																		type="button"
																		className="btn btn-outline-primary"
																		onClick={() => setDepartmentMode('choose')}
																		style={{ 
																			padding: '8px 16px',
																			borderRadius: '6px',
																			border: '1px solid #3498db',
																			backgroundColor: 'transparent',
																			color: '#3498db'
																		}}>
																		{t('newuser.department3')}
																	</button>
																</div>
															</div>
														)}
													</div>

													{/* Przyciski akcji */}
													<div style={{ 
														display: 'flex', 
														gap: '15px',
														paddingTop: '20px',
														borderTop: '1px solid #dee2e6'
													}}>
														<button
															className="btn btn-success"
															onClick={() => handleSaveRoles(user._id)}
															style={{ 
																padding: '12px 24px',
																borderRadius: '6px',
																border: 'none',
																fontSize: '16px',
																fontWeight: '500',
																transition: 'all 0.2s',
																boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
															}}>
															{t('logs.save')}
														</button>
														<button
															className="btn btn-danger"
															onClick={() => setEditingUser(null)}
															style={{ 
																padding: '12px 24px',
																borderRadius: '6px',
																border: 'none',
																fontSize: '16px',
																fontWeight: '500',
																transition: 'all 0.2s',
																boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
															}}>
															{t('logs.notsave')}
														</button>
													</div>
												</div>
											</div>
										</td>
									</tr>
								)}
								{expandedLogs.includes(user._id) && logs[user._id] && (
									<tr>
										<td colSpan="2" style={{ padding: '0' }}>
											<div style={{ 
												backgroundColor: '#f8f9fa', 
												padding: '30px',
												borderTop: '1px solid #dee2e6'
											}}>
												<h4 style={{ 
													color: '#2c3e50', 
													marginBottom: '20px',
													paddingBottom: '10px',
													borderBottom: '2px solid #3498db'
												}}>
													{t('logs.userl')} - {user.username}
												</h4>
												<div style={{ 
													backgroundColor: 'white',
													borderRadius: '8px',
													overflow: 'hidden',
													boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
												}}>
													<table className="table" style={{ margin: 0 }}>
														<thead style={{ backgroundColor: '#f8f9fa' }}>
															<tr>
																<th style={{ 
																	padding: '15px', 
																	color: '#495057', 
																	fontWeight: '600'
																}}>
																	{t('logs.actionth')}
																</th>
																<th style={{ 
																	padding: '15px', 
																	color: '#495057', 
																	fontWeight: '600'
																}}>
																	{t('logs.detailsth')}
																</th>
																<th style={{ 
																	padding: '15px', 
																	color: '#495057', 
																	fontWeight: '600'
																}}>
																	{t('logs.timeth')}
																</th>
															</tr>
														</thead>
														<tbody>
															{logs[user._id].map((log, logIndex) => (
																<tr key={log._id} style={{ 
																	backgroundColor: logIndex % 2 === 0 ? '#ffffff' : '#f8f9fa'
																}}>
																	<td style={{ 
																		padding: '15px', 
																		fontWeight: '500', 
																		color: '#2c3e50'
																	}}>
																		{log.action}
																	</td>
																	<td style={{ 
																		padding: '15px', 
																		color: '#7f8c8d'
																	}}>
																		{log.details}
																	</td>
																	<td style={{ 
																		padding: '15px', 
																		color: '#95a5a6', 
																		fontSize: '14px'
																	}}>
																		{new Date(log.timestamp).toLocaleString()}
																	</td>
																</tr>
															))}
														</tbody>
													</table>
												</div>
											</div>
										</td>
									</tr>
								)}
							</React.Fragment>
						))}
					</tbody>
				</table>
					</div>

					{/* Mobile view - karty */}
					<div className="users-cards-container mobile-view" style={{ 
						display: 'block' // Pokazujemy na mobile
					}}>
						{users.map((user, index) => (
							<div key={user._id} style={{ 
								backgroundColor: 'white',
								borderRadius: '12px',
								boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
								marginBottom: '20px',
								overflow: 'hidden'
							}}>
								{/* Nagłówek karty */}
								<div style={{ 
									padding: '20px',
									borderBottom: '1px solid #e9ecef'
								}}>
									<div style={{ 
										display: 'flex', 
										alignItems: 'center',
										marginBottom: '15px'
									}}>
										<div style={{ 
											width: '50px', 
											height: '50px', 
											borderRadius: '50%', 
											backgroundColor: '#3498db',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											color: 'white',
											fontWeight: 'bold',
											marginRight: '15px',
											flexShrink: 0
										}}>
											{user.username.charAt(0).toUpperCase()}
										</div>
										<div style={{ flex: 1 }}>
											<div style={{ 
												fontWeight: '600', 
												color: '#2c3e50', 
												marginBottom: '5px',
												fontSize: '18px'
											}}>
												{user.username}
											</div>
											<div style={{ 
												fontSize: '14px', 
												color: '#7f8c8d',
												marginBottom: '3px'
											}}>
												{user.roles?.join(', ') || 'Brak ról'}
											</div>
											{user.department && (
												<div style={{ 
													fontSize: '12px', 
													color: '#95a5a6'
												}}>
													Dział: {user.department}
												</div>
											)}
										</div>
									</div>

									{/* Przyciski akcji - zawsze widoczne */}
									<div style={{ 
										display: 'flex', 
										gap: '10px',
										flexWrap: 'wrap'
									}}>
										<button
											className="btn btn-primary"
											onClick={() => handleEditClick(user)}
											style={{ 
												flex: 1,
												minWidth: '120px',
												padding: '12px 16px',
												borderRadius: '8px',
												border: 'none',
												fontSize: '14px',
												fontWeight: '500',
												transition: 'all 0.2s',
												boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
											}}>
											{t('logs.rolebtn')}
										</button>
										<button
											className="btn btn-info"
											onClick={() => handleExpandLogs(user._id)}
											style={{ 
												flex: 1,
												minWidth: '120px',
												padding: '12px 16px',
												borderRadius: '8px',
												border: 'none',
												fontSize: '14px',
												fontWeight: '500',
												transition: 'all 0.2s',
												boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
											}}>
											{t('logs.actionbtn')}
										</button>
									</div>
								</div>

								{/* Panel edycji */}
								{editingUser?._id === user._id && (
									<div style={{ 
										backgroundColor: '#f8f9fa', 
										padding: '20px',
										borderTop: '1px solid #e9ecef'
									}}>
										<h4 style={{ 
											color: '#2c3e50', 
											marginBottom: '20px',
											paddingBottom: '10px',
											borderBottom: '2px solid #3498db',
											fontSize: '18px'
										}}>
											{t('logs.editrole')}
										</h4>
										
										{/* Role */}
										<div style={{ marginBottom: '25px' }}>
											<h5 style={{ 
												color: '#34495e', 
												marginBottom: '15px',
												fontSize: '16px'
											}}>Role użytkownika:</h5>
											<div style={{ 
												display: 'flex',
												flexDirection: 'column',
												gap: '10px'
											}}>
												{availableRoles.map(role => (
													<label key={role} style={{ 
														display: 'flex', 
														alignItems: 'flex-start',
														padding: '15px',
														backgroundColor: 'white',
														borderRadius: '8px',
														border: '1px solid #dee2e6',
														cursor: 'pointer',
														transition: 'all 0.2s',
														boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
													}}>
														<input
															type="checkbox"
															checked={editedRoles.includes(role)}
															onChange={() => handleRoleChange(role)}
															style={{ 
																marginRight: '12px',
																transform: 'scale(1.3)',
																marginTop: '2px',
																flexShrink: 0
															}}
														/>
														<span style={{ fontSize: '14px', lineHeight: '1.4' }}>{role}</span>
													</label>
												))}
											</div>
										</div>

										{/* Dział */}
										<div style={{ marginBottom: '25px' }}>
											<h5 style={{ 
												color: '#34495e', 
												marginBottom: '15px',
												fontSize: '16px'
											}}>
												{t('newuser.department5')}
											</h5>
											
											{/* Tryb wyboru z listy */}
											{departmentMode === 'choose' && (
												<div style={{ marginBottom: '20px' }}>
													<div style={{ 
														display: 'flex',
														flexDirection: 'column',
														gap: '10px',
														marginBottom: '15px'
													}}>
														{departments.map((dep) => (
															<label key={dep} style={{ 
																display: 'flex', 
																alignItems: 'center',
																padding: '12px',
																backgroundColor: 'white',
																borderRadius: '8px',
																border: '1px solid #dee2e6',
																cursor: 'pointer',
																transition: 'all 0.2s'
															}}>
																<input
																	type="radio"
																	name="department"
																	value={dep}
																	checked={editedDepartment === dep}
																	onChange={e => setEditedDepartment(e.target.value)}
																	style={{ marginRight: '12px', transform: 'scale(1.3)', flexShrink: 0 }}
																/>
																<span>{dep}</span>
															</label>
														))}
													</div>
													
													<button
														type="button"
														className="btn btn-outline-primary"
														onClick={() => {
															setEditedDepartment('')
															setDepartmentMode('new')
														}}
														style={{ 
															width: '100%',
															padding: '12px 16px',
															borderRadius: '8px',
															border: '1px solid #3498db',
															backgroundColor: 'transparent',
															color: '#3498db',
															transition: 'all 0.2s',
															fontSize: '14px'
														}}>
														{t('newuser.department2')}
													</button>
												</div>
											)}
											
											{/* Tryb dodawania nowego działu */}
											{departmentMode === 'new' && (
												<div style={{ 
													backgroundColor: 'white',
													padding: '20px',
													borderRadius: '8px',
													border: '2px solid #3498db'
												}}>
													<div style={{ marginBottom: '15px' }}>
														<label style={{ 
															display: 'block',
															marginBottom: '8px',
															fontWeight: '600',
															color: '#2c3e50'
														}}>
															{t('newuser.department2')}
														</label>
														<input
															type="text"
															placeholder={t('newuser.department4')}
															value={editedDepartment}
															onChange={e => setEditedDepartment(e.target.value)}
															style={{ 
																width: '100%',
																padding: '12px',
																border: '1px solid #bdc3c7',
																borderRadius: '8px',
																fontSize: '16px',
																transition: 'border-color 0.2s'
															}}
														/>
													</div>
													
													<div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
														<button
															type="button"
															className="btn btn-outline-primary"
															onClick={() => setDepartmentMode('choose')}
															style={{ 
																width: '100%',
																padding: '12px 16px',
																borderRadius: '8px',
																border: '1px solid #3498db',
																backgroundColor: 'transparent',
																color: '#3498db',
																fontSize: '14px'
															}}>
															{t('newuser.department3')}
														</button>
													</div>
												</div>
											)}
										</div>

										{/* Przyciski akcji */}
										<div style={{ 
											display: 'flex', 
											gap: '10px',
											paddingTop: '20px',
											borderTop: '1px solid #dee2e6',
											flexDirection: 'column'
										}}>
											<button
												className="btn btn-success"
												onClick={() => handleSaveRoles(user._id)}
												style={{ 
													width: '100%',
													padding: '14px 20px',
													borderRadius: '8px',
													border: 'none',
													fontSize: '16px',
													fontWeight: '500',
													transition: 'all 0.2s',
													boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
												}}>
												{t('logs.save')}
											</button>
											<button
												className="btn btn-danger"
												onClick={() => setEditingUser(null)}
												style={{ 
													width: '100%',
													padding: '14px 20px',
													borderRadius: '8px',
													border: 'none',
													fontSize: '16px',
													fontWeight: '500',
													transition: 'all 0.2s',
													boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
												}}>
												{t('logs.notsave')}
											</button>
										</div>
									</div>
								)}

								{/* Panel logów */}
								{expandedLogs.includes(user._id) && logs[user._id] && (
									<div style={{ 
										backgroundColor: '#f8f9fa', 
										padding: '20px',
										borderTop: '1px solid #e9ecef'
									}}>
										<h4 style={{ 
											color: '#2c3e50', 
											marginBottom: '20px',
											paddingBottom: '10px',
											borderBottom: '2px solid #3498db',
											fontSize: '18px'
										}}>
											{t('logs.userl')} - {user.username}
										</h4>
										<div style={{ 
											backgroundColor: 'white',
											borderRadius: '8px',
											overflow: 'hidden',
											boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
										}}>
											{logs[user._id].map((log, logIndex) => (
												<div key={log._id} style={{ 
													padding: '15px',
													borderBottom: logIndex < logs[user._id].length - 1 ? '1px solid #e9ecef' : 'none',
													backgroundColor: logIndex % 2 === 0 ? '#ffffff' : '#f8f9fa'
												}}>
													<div style={{ 
														display: 'flex',
														justifyContent: 'space-between',
														alignItems: 'flex-start',
														marginBottom: '8px',
														flexWrap: 'wrap',
														gap: '10px'
													}}>
														<div style={{ 
															fontWeight: '600', 
															color: '#2c3e50',
															fontSize: '14px'
														}}>
															{log.action}
														</div>
														<div style={{ 
															color: '#95a5a6', 
															fontSize: '12px',
															whiteSpace: 'nowrap'
														}}>
															{new Date(log.timestamp).toLocaleString()}
														</div>
													</div>
													<div style={{ 
														color: '#7f8c8d',
														fontSize: '14px',
														lineHeight: '1.4'
													}}>
														{log.details}
													</div>
												</div>
											))}
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			)}
			</div>

			{/* CSS dla responsywności */}
			<style jsx>{`
				@media (min-width: 768px) {
					.desktop-view {
						display: block !important;
					}
					.mobile-view {
						display: none !important;
					}
				}
				
				@media (max-width: 767px) {
					.desktop-view {
						display: none !important;
					}
					.mobile-view {
						display: block !important;
					}
				}
			`}</style>
		</>
	)
}

export default Logs
