import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import Sidebar from '../dashboard/Sidebar'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { API_URL } from '../../config.js'
import { useTranslation } from 'react-i18next'
import Loader from '../Loader'

function UserCalendar() {
	const { userId } = useParams()
	const [user, setUser] = useState(null)
	const [workdays, setWorkdays] = useState([])
	const [totalHours, setTotalHours] = useState(0)
	const [totalLeaveDays, setTotalLeaveDays] = useState(0)
	const [totalLeaveHours, setTotalLeaveHours] = useState(0)
	const [totalWorkDays, setTotalWorkDays] = useState(0)
	const [totalOtherAbsences, setTotalOtherAbsences] = useState(0)
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
	const [isConfirmed, setIsConfirmed] = useState(false)
	const [additionalHours, setAdditionalHours] = useState(0)
	const pdfRef = useRef()
	const calendarRef = useRef(null)
	const { t, i18n } = useTranslation()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchUserDetails()
		fetchUserWorkdays()
	}, [userId])

	useEffect(() => {
		calculateTotals(workdays, currentMonth, currentYear)
	}, [workdays, currentMonth, currentYear])

	useEffect(() => {
		checkConfirmationStatus()
	}, [currentMonth, currentYear, userId])

	const fetchUserDetails = async () => {
		try {
			const response = await axios.get(`${API_URL}/api/users/${userId}`)
			// console.log('Fetched user details:', response.data)
			setUser(response.data)
		} catch (error) {
			console.error('Failed to fetch user details:', error)
		} finally {
			setLoading(false)
		}
	}

	const fetchUserWorkdays = async () => {
		try {
			const response = await axios.get(`${API_URL}/api/workdays/user/${userId}`)
			// console.log('Fetched workdays:', response.data)
			setWorkdays(response.data)
		} catch (error) {
			console.error('Failed to fetch workdays:', error)
		} finally {
			setLoading(false)
		}
	}

	const checkConfirmationStatus = async () => {
		try {
			const response = await axios.get(`${API_URL}/api/calendar/confirmation-status/${userId}`, {
				params: { month: currentMonth, year: currentYear }
			})
			setIsConfirmed(response.data.isConfirmed || false)
		} catch (error) {
			console.error('Failed to check confirmation status:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		checkConfirmationStatus()
	}, [currentMonth, currentYear, userId])

	const calculateTotals = (workdays, month, year) => {
		let hours = 0
		let leaveDays = 0
		let overtime = 0
		let workDaysSet = new Set()
		let otherAbsences = 0

		const filteredWorkdays = workdays.filter(day => {
			const eventDate = new Date(day.date)
			return eventDate.getMonth() === month && eventDate.getFullYear() === year
		})

		filteredWorkdays.forEach(day => {
			if (day.hoursWorked) {
				hours += day.hoursWorked
				workDaysSet.add(new Date(day.date).toDateString())
			}
			if (day.additionalWorked) {
				overtime += day.additionalWorked
			}
			if (day.absenceType) {
				if (day.absenceType.toLowerCase().includes('urlop')) {
					leaveDays += 1
				} else {
					otherAbsences += 1
				}
			}
		})

		setTotalHours(hours)
		setAdditionalHours(overtime)
		setTotalWorkDays(workDaysSet.size)
		setTotalLeaveDays(leaveDays)
		setTotalLeaveHours(leaveDays * 8)
		setTotalOtherAbsences(otherAbsences)
	}

	const handleMonthChange = info => {
		const newMonth = info.view.currentStart.getMonth()
		const newYear = info.view.currentStart.getFullYear()
		setCurrentMonth(newMonth)
		setCurrentYear(newYear)
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

	const generatePDF = () => {
		const input = pdfRef.current
		
		// Lepsze opcje dla html2canvas
		html2canvas(input, { 
			scale: 1.5,
			useCORS: true,
			allowTaint: true,
			backgroundColor: '#ffffff'
		}).then(canvas => {
			const imgData = canvas.toDataURL('image/png')
			const pdf = new jsPDF('l', 'mm', 'a4') // Orientacja pozioma (landscape)
			
			const imgProps = pdf.getImageProperties(imgData)
			const pdfWidth = pdf.internal.pageSize.getWidth()
			const pdfHeight = pdf.internal.pageSize.getHeight()
			
			// Oblicz optymalne wymiary żeby kalendarz zajmował całą stronę
			const imgWidth = pdfWidth - 20 // Margines 10mm z każdej strony
			const imgHeight = (imgProps.height * imgWidth) / imgProps.width
			
			// Jeśli obraz jest za wysoki, zmniejsz proporcjonalnie
			let finalWidth = imgWidth
			let finalHeight = imgHeight
			
			if (imgHeight > pdfHeight - 20) {
				finalHeight = pdfHeight - 20
				finalWidth = (imgProps.width * finalHeight) / imgProps.height
			}
			
			// Wycentruj obraz na stronie
			const x = (pdfWidth - finalWidth) / 2
			const y = (pdfHeight - finalHeight) / 2
			
			pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight)
			
			
			
			pdf.save(`${t('pdf.filename')}_${user?.firstName}_${user?.lastName}_${currentMonth + 1}_${currentYear}.pdf`)
		})
	}

	return (
		<>
			<Sidebar />
			{loading ? (
				<div className="content-with-loader">
					<Loader />
				</div>
			) : (
			<div id="calendars-works-review" className='custom-flex'>
				<button onClick={generatePDF} className="btn-pdf btn btn-primary">
				{t('workcalendar.genepdf')}
				</button>
				<label style={{ marginLeft: '30px' }} className="flex items-center space-x-2">
				{t('workcalendar.monthlabel')}
					<select value={currentMonth} onChange={handleMonthSelect} style={{ marginRight: '5px', marginLeft: '5px' }} className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
						{Array.from({ length: 12 }, (_, i) => (
							<option key={i} value={i}>
								{new Date(0, i).toLocaleString(i18n.resolvedLanguage, { month: 'long' })}
							</option>
						))}
					</select>
				</label>
				<label className="flex items-center space-x-2">
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
				<div ref={pdfRef} style={{ 
					marginTop: '30px', 
					padding: '20px',
					backgroundColor: '#ffffff',
					border: '1px solid #e5e7eb',
					borderRadius: '8px',
					boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
				}}>
					{user && (
						<div style={{ 
							marginBottom: '20px',
							padding: '15px',
							backgroundColor: '#f8fafc',
							borderRadius: '6px',
							borderLeft: '4px solid #3b82f6'
						}}>
							<h3 style={{ 
								margin: '0',
								color: '#1e40af',
								fontSize: '18px',
								fontWeight: '600'
							}}>
								{t('workcalendar.h3admin')} {' '} 
								<span style={{ 
									fontWeight: 'bold',
									color: '#1f2937',
									marginLeft: '7px'
								}}>
									 {user.firstName} {user.lastName} {user.position && `(${user.position})`}
								</span>
							</h3>
						</div>
					)}

					<div className="calendar-controls" style={{ 
						marginBottom: '20px',
						padding: '10px 15px',
						// backgroundColor: isConfirmed ? '#dcfce7' : '#fef3c7',
						borderRadius: '6px',
						// border: `1px solid ${isConfirmed ? '#22c55e' : '#f59e0b'}`
					}}>
						<label style={{ 
							display: 'flex', 
							alignItems: 'center',
							margin: '0',
							color: isConfirmed ? '#166534' : '#92400e',
							fontWeight: '500',
							padding: '0'
						}}>
							{/* <input 
								type="checkbox" 
								checked={isConfirmed} 
								readOnly 
								style={{ 
									marginRight: '8px',
									transform: 'scale(1.2)'
								}} 
							/> */}
							{isConfirmed ? t('workcalendar.confirmed') : t('workcalendar.notConfirmed')}
						</label>
					</div>

					<div className="row">
						<div className="col-xl-9">
							<FullCalendar
								plugins={[dayGridPlugin, interactionPlugin]}
								initialView="dayGridMonth"
								locale={i18n.resolvedLanguage}
								firstDay={1}
								showNonCurrentDates={false}
								events={[
									...workdays.map(day => ({
										title: day.hoursWorked
								? `${day.hoursWorked} ${t('workcalendar.allfrommonthhours')} ${day.additionalWorked ? ` ${t('workcalendar.include')} ${day.additionalWorked} ${t('workcalendar.overtime')}` : ''}`
								: day.absenceType,
										start: day.date,
										backgroundColor: day.hoursWorked ? 'blue' : 'green',
										textColor: 'white',
										id: day._id,
										classNames: day.hoursWorked ? 'event-workday' : 'event-absence',
										extendedProps: {
											isWorkday: !!day.hoursWorked,
										},
									})),
									...workdays
										.filter(day => day.realTimeDayWorked)
										.map(day => ({
											title: `${t('workcalendar.worktime')} ${day.realTimeDayWorked}`,
											start: day.date,
											backgroundColor: 'yellow',
											textColor: 'black',
											id: `${day._id}-realTime`,
											classNames: 'event-real-time',
										})),
								]}
								ref={calendarRef}
								displayEventTime={false}
								datesSet={handleMonthChange}
								height="auto"
							/>
						</div>
						<div className="col-xl-3 resume-month-work small-mt">
				<h3 className="resumecales h3resume">{t('workcalendar.allfrommonth')}</h3>
				<p>
					{t('workcalendar.allfrommonth1')} {totalWorkDays}
				</p>
				<p>
					{t('workcalendar.allfrommonth2')} {totalHours} {t('workcalendar.allfrommonthhours')}
				</p>
				<p>
					{t('workcalendar.allfrommonth3')} {additionalHours} {t('workcalendar.allfrommonthhours')}
				</p>

				<p>
					{t('workcalendar.allfrommonth4')} {totalLeaveDays} ({totalLeaveHours} {t('workcalendar.allfrommonthhours')})
				</p>
				<p>
					{t('workcalendar.allfrommonth5')} {totalOtherAbsences}
				</p>
			</div>
					</div>
				</div>
			</div>
			)}
		</>
	)
}

export default UserCalendar
