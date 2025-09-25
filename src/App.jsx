"use client"

import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import Navigation from "./components/Navigation"
import AdminNavigation from "./components/AdminNavigation"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import BusinessesPage from "./pages/BusinessesPage"
import VerifyPage from "./pages/VerifyPage"
import MembersPage from "./pages/MembersPage"
import VideosPage from "./pages/VideosPage"
import HelplinePage from "./pages/HelplinePage"
import ContactPage from "./pages/ContactPage"
import AdminLoginPage from "./pages/AdminLoginPage"
import AdminDashboard from "./pages/AdminDashboard"
import AdminMembersPage from "./pages/AdminMembersPage"
import AdminVideosPage from "./pages/AdminVideosPage"
import MemberLoginPage from "./pages/MemberLoginPage"
import MemberDashboard from "./pages/MemberDashboard"

function App() {
  const [adminUser, setAdminUser] = useState(null)
  const [adminToken, setAdminToken] = useState(null)
  const [memberData, setMemberData] = useState(null)
  const [memberToken, setMemberToken] = useState(null)

  useEffect(() => {
    // Check for admin session
    const adminTokenStored = localStorage.getItem("adminToken")
    const adminUserStored = localStorage.getItem("adminUser")

    if (adminTokenStored && adminUserStored) {
      setAdminToken(adminTokenStored)
      setAdminUser(JSON.parse(adminUserStored))
    }

    // Check for member session
    const memberTokenStored = localStorage.getItem("memberToken")
    const memberDataStored = localStorage.getItem("memberData")

    if (memberTokenStored && memberDataStored) {
      setMemberToken(memberTokenStored)
      setMemberData(JSON.parse(memberDataStored))
    }
  }, [])

  const handleAdminLogin = (user, token) => {
    setAdminUser(user)
    setAdminToken(token)
  }

  const handleAdminLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    setAdminUser(null)
    setAdminToken(null)
  }

  const handleMemberLogin = (member, token) => {
    setMemberData(member)
    setMemberToken(token)
  }

  const handleMemberLogout = () => {
    localStorage.removeItem("memberToken")
    localStorage.removeItem("memberData")
    setMemberData(null)
    setMemberToken(null)
  }

  const isAdminRoute = window.location.pathname.startsWith("/admin")
  const isMemberRoute = window.location.pathname.startsWith("/member")

  return (
    <div className="min-h-screen bg-background">
      {!isAdminRoute && !isMemberRoute && <Navigation />}
      {isAdminRoute && adminUser && <AdminNavigation user={adminUser} onLogout={handleAdminLogout} />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/businesses" element={<BusinessesPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/helpline" element={<HelplinePage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage onLogin={handleAdminLogin} />} />
        <Route
          path="/admin"
          element={adminUser ? <AdminDashboard token={adminToken} /> : <AdminLoginPage onLogin={handleAdminLogin} />}
        />
        <Route
          path="/admin/members"
          element={adminUser ? <AdminMembersPage token={adminToken} /> : <AdminLoginPage onLogin={handleAdminLogin} />}
        />
        <Route
          path="/admin/videos"
          element={adminUser ? <AdminVideosPage token={adminToken} /> : <AdminLoginPage onLogin={handleAdminLogin} />}
        />

        {/* Member Routes */}
        <Route path="/member/login" element={<MemberLoginPage onLogin={handleMemberLogin} />} />
        <Route
          path="/member/dashboard"
          element={
            memberData ? (
              <MemberDashboard member={memberData} onLogout={handleMemberLogout} />
            ) : (
              <MemberLoginPage onLogin={handleMemberLogin} />
            )
          }
        />
      </Routes>

      {!isAdminRoute && <Footer />}
    </div>
  )
}

export default App
