import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import CreateUser from './components/profile/CreateUser'
import Login from './components/profile/Login'
import TeamRegistration from './components/profile/TeamRegistration'
import Dashboard from './components/dashboard/Dashboard'
import ChangePassword from './components/profile/ChangePassword'
import SetPassword from './components/profile/SetPassword'
import ResetPassword from './components/profile/ResetPassword'
import ProtectedRoute from './components/route/ProtectedRoute'
import Logs from './components/profile/Logs'
import AdminUserList from './components/listusers/AdminUserList'
import UserCalendar from './components/workcalendars/UserCalendar'
import LeaveRequestForm from './components/leavework/LeaveRequestForm'
import AdminLeaveRequests from './components/leavework/AdminLeaveRequests'
import LeaveRequestPDFPreview from './components/leavework/LeaveRequestPDFPreview'
import LeavePlanner from './components/leavework/LeavePlanner'
import EmployeeListPlanner from './components/listusers/EmployeeListPlanner'
import EmployeeLeaveCalendar from './components/leavework/EmployeeLeaveCalendar'
import AdminAllLeaveCalendar from './components/leavework/AdminAllLeaveCalendar'
import VacationListUser from './components/listusers/VacationListUser'
import NewPassword from './components/profile/NewPassword'
import ProductPromotion from './components/ProductPromotion'
import ENProductPromotion from './components/ENProductPromotion.jsx'
import ENBlogOne from './components/ENBlogOne.jsx'
import Blog from './components/Blog.jsx'
import ENBlog from './components/ENBlog.jsx'
import BlogOne from './components/BlogOne.jsx'
import BlogThree from './components/BlogThree.jsx'
import ENBlogThree from './components/ENBlogThree.jsx'
import HelpTicket from './components/tickets/HelpTicket.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import { isAdmin, isHR, isDepartmentSupervisor, isDepartmentViewer, isWorker } from './utils/roleHelpers'
import { Helmet } from 'react-helmet-async'
import { API_URL } from './config.js'
import '../src/style.css'
import { useAuth } from './context/AuthContext'
import { AuthProvider } from './context/AuthContext'

axios.defaults.withCredentials = true

function AppContent() {
	const location = useLocation()
	const { loggedIn, role, logout } = useAuth()

	useEffect(() => {
		const interceptor = axios.interceptors.response.use(
			res => res,
			async err => {
				const originalRequest = err.config
				if (
					err.response?.status === 401 &&
					originalRequest.url !== `${API_URL}/api/users/refresh-token` &&
					!originalRequest._retry
				) {
					originalRequest._retry = true
					try {
						await axios.post(`${API_URL}/api/users/refresh-token`, {}, { withCredentials: true })
						return axios(originalRequest)
					} catch (refreshError) {
						return Promise.reject(refreshError)
					}
				}
				return Promise.reject(err)
			}
		)
		return () => axios.interceptors.response.eject(interceptor)
	}, [])

	function ScrollToHashElement() {
		const { hash } = useLocation()

		useEffect(() => {
			if (hash) {
				const element = document.querySelector(hash)
				if (element) {
					setTimeout(() => {
						element.scrollIntoView({ behavior: 'smooth' })
					}, 100)
				}
			}
		}, [hash])

		return null
	}

	return (
		<>
			<Helmet>
				<title>Planopia</title>
			</Helmet>

			<div>
				<ScrollToHashElement />
				<ScrollToTop />
				<Routes>
					<Route path="/login" element={loggedIn ? <Navigate to="/dashboard" /> : <Login />} />
					<Route path="/team-registration" element={loggedIn ? <Navigate to="/dashboard" /> : <TeamRegistration />} />
					<Route path="/" element={loggedIn ? <Navigate to="/dashboard" replace /> : <ProductPromotion />} />
					<Route path="/en" element={<ENProductPromotion />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/en/blog" element={<ENBlog />} />
					<Route path="/blog/ewidencja-czasu-pracy-online" element={<BlogOne />} />
					<Route path="/en/blog/time-tracking-online" element={<ENBlogOne />} />
					<Route path="/blog/planowanie-urlopow" element={<BlogThree />} />
					<Route path="/en/blog/leave-planning" element={<ENBlogThree />} />
					<Route path="/set-password/:token" element={<SetPassword />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route path="/new-password/:token" element={<NewPassword />} />
					<Route element={<ProtectedRoute isLoggedIn={loggedIn} handleLogout={logout} />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/create-user" element={isAdmin(role) ? <CreateUser /> : <Navigate to="/" />} />
						<Route path="/leave-request" element={<LeaveRequestForm />} />
						<Route
							path="/calendars-list"
							element={
								isAdmin(role) || isHR(role) || isDepartmentSupervisor(role) || isDepartmentViewer(role) ? (
									<AdminUserList />
								) : (
									<Navigate to="/" />
								)
							}
						/>
						<Route
							path="/leave-list"
							element={
								isAdmin(role) || isHR(role) || isDepartmentSupervisor(role) || isDepartmentViewer(role) ? (
									<VacationListUser />
								) : (
									<Navigate to="/" />
								)
							}
						/>
						<Route
							path="/leave-requests/:userId"
							element={
								isAdmin(role) || isHR(role) || isDepartmentSupervisor(role) || isDepartmentViewer(role) ? (
									<AdminLeaveRequests />
								) : (
									<Navigate to="/" />
								)
							}
						/>
						<Route path="/leave-request-pdf-preview" element={<LeaveRequestPDFPreview />} />
						<Route path="/edit-profile" element={<ChangePassword />} />
						<Route path="/logs" element={isAdmin(role) ? <Logs /> : <Navigate to="/" />} />
						<Route
							path="/work-calendars/:userId"
							element={
								isAdmin(role) || isHR(role) || isDepartmentSupervisor(role) || isDepartmentViewer(role) ? (
									<UserCalendar />
								) : (
									<Navigate to="/" />
								)
							}
						/>
						<Route path="/leave-planner" element={<LeavePlanner />} />
						<Route
							path="/leave-planning-list"
							element={
								isAdmin(role) || isHR(role) || isDepartmentSupervisor(role) || isDepartmentViewer(role) ? (
									<EmployeeListPlanner />
								) : (
									<Navigate to="/" />
								)
							}
						/>
						<Route path="/helpcenter" element={isAdmin(role) ? <HelpTicket /> : <Navigate to="/" />} />
						<Route path="/leave-plans/:userId" element={<EmployeeLeaveCalendar />} />
						<Route path="/all-leave-plans" element={<AdminAllLeaveCalendar />} />
					</Route>
				</Routes>
			</div>
		</>
	)
}

function App() {
	return (
		<Router>
			<AuthProvider>
				<AppContent />
			</AuthProvider>
		</Router>
	)
}

export default App
