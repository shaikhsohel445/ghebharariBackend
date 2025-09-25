"use client"
import { User, Calendar, MapPin, Briefcase, Phone, Award, CreditCard, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function MemberDashboard({ member, onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("memberToken")
    localStorage.removeItem("memberData")
    onLogout()
    navigate("/member/login")
  }

  const generateIDCard = () => {
    // Create a simple ID card design
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    // Set canvas size
    canvas.width = 400
    canvas.height = 250

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 400, 250)
    gradient.addColorStop(0, "#8b5cf6")
    gradient.addColorStop(0.5, "#a855f7")
    gradient.addColorStop(1, "#ec4899")

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 400, 250)

    // White content area
    ctx.fillStyle = "white"
    ctx.fillRect(20, 20, 360, 210)

    // Header
    ctx.fillStyle = "#8b5cf6"
    ctx.fillRect(20, 20, 360, 60)

    // Organization name
    ctx.fillStyle = "white"
    ctx.font = "bold 16px Arial"
    ctx.textAlign = "center"
    ctx.fillText("घे भरारी सेवा भावी संस्था", 200, 40)
    ctx.font = "12px Arial"
    ctx.fillText("महिला सक्षमीकरण संस्था", 200, 60)

    // Member info
    ctx.fillStyle = "#333"
    ctx.font = "bold 18px Arial"
    ctx.textAlign = "left"
    ctx.fillText(member.fullName, 40, 120)

    ctx.font = "14px Arial"
    ctx.fillText(`ID: ${member.id.substring(0, 8).toUpperCase()}`, 40, 145)
    ctx.fillText(`District: ${member.district}`, 40, 165)
    ctx.fillText(`Mobile: ${member.mobile}`, 40, 185)
    ctx.fillText(`Business: ${member.business}`, 40, 205)

    // Status badge
    if (member.status === "active") {
      ctx.fillStyle = "#10b981"
      ctx.fillRect(280, 100, 80, 25)
      ctx.fillStyle = "white"
      ctx.font = "bold 12px Arial"
      ctx.textAlign = "center"
      ctx.fillText("ACTIVE", 320, 117)
    }

    // Download the image
    const link = document.createElement("a")
    link.download = `${member.fullName}_ID_Card.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  const generateCertificate = () => {
    // Create a certificate design
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    // Set canvas size (A4 landscape proportions)
    canvas.width = 800
    canvas.height = 600

    // Background
    ctx.fillStyle = "#f8f9fa"
    ctx.fillRect(0, 0, 800, 600)

    // Border
    ctx.strokeStyle = "#8b5cf6"
    ctx.lineWidth = 8
    ctx.strokeRect(20, 20, 760, 560)

    // Inner border
    ctx.strokeStyle = "#a855f7"
    ctx.lineWidth = 2
    ctx.strokeRect(40, 40, 720, 520)

    // Header
    ctx.fillStyle = "#8b5cf6"
    ctx.font = "bold 36px Arial"
    ctx.textAlign = "center"
    ctx.fillText("CERTIFICATE OF MEMBERSHIP", 400, 120)

    // Organization name
    ctx.fillStyle = "#333"
    ctx.font = "bold 24px Arial"
    ctx.fillText("घे भरारी सेवा भावी संस्था", 400, 160)
    ctx.font = "18px Arial"
    ctx.fillText("महिला सक्षमीकरण संस्था", 400, 185)

    // Certificate text
    ctx.font = "20px Arial"
    ctx.fillText("This is to certify that", 400, 250)

    ctx.fillStyle = "#8b5cf6"
    ctx.font = "bold 32px Arial"
    ctx.fillText(member.fullName, 400, 300)

    ctx.fillStyle = "#333"
    ctx.font = "20px Arial"
    ctx.fillText("is a registered member of our organization", 400, 340)
    ctx.fillText(`specializing in ${member.businessType}`, 400, 370)

    // Date
    ctx.font = "16px Arial"
    ctx.fillText(`Member since: ${new Date(member.registrationDate).toLocaleDateString()}`, 400, 420)
    ctx.fillText(`Certificate ID: ${member.id.substring(0, 12).toUpperCase()}`, 400, 445)

    // Signature area
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText("Authorized Signature", 100, 520)
    ctx.textAlign = "right"
    ctx.fillText("Organization Seal", 700, 520)

    // Download the certificate
    const link = document.createElement("a")
    link.download = `${member.fullName}_Certificate.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  const InfoCard = ({ icon: Icon, title, value, className = "" }) => (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-lg font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-purple rounded-full flex items-center justify-center">
                <User className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">सदस्य डॅशबोर्ड</h1>
                <p className="text-sm text-gray-600">Welcome, {member.fullName}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Alert */}
        {member.status === "pending" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <Calendar className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-yellow-800 font-semibold">Membership Pending Approval</h3>
                <p className="text-yellow-700 text-sm">
                  Your membership application is under review. You will be notified once approved.
                </p>
              </div>
            </div>
          </div>
        )}

        {member.status === "rejected" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <User className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <h3 className="text-red-800 font-semibold">Membership Application Rejected</h3>
                <p className="text-red-700 text-sm">Please contact our support team for more information.</p>
              </div>
            </div>
          </div>
        )}

        {/* Member Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <InfoCard icon={User} title="Member ID" value={member.id.substring(0, 8).toUpperCase()} />
          <InfoCard icon={MapPin} title="District" value={member.district} />
          <InfoCard icon={Briefcase} title="Business Type" value={member.businessType} />
          <InfoCard
            icon={Calendar}
            title="Member Since"
            value={new Date(member.registrationDate).toLocaleDateString()}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Member Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Member Information</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <p className="text-gray-900">{member.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900">{member.mobile}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business/Work</label>
                  <p className="text-gray-900">{member.business}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                    <p className="text-gray-900">{member.businessType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        member.status === "active"
                          ? "bg-green-100 text-green-800"
                          : member.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {member.status === "active" ? "Active" : member.status === "pending" ? "Pending" : "Rejected"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-6">
            {/* Download Cards */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Download Documents</h3>

              <div className="space-y-3">
                <button
                  onClick={generateIDCard}
                  disabled={member.status !== "active"}
                  className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Download ID Card</span>
                </button>

                <button
                  onClick={generateCertificate}
                  disabled={member.status !== "active"}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Award className="w-4 h-4" />
                  <span>Download Certificate</span>
                </button>
              </div>

              {member.status !== "active" && (
                <p className="text-sm text-gray-500 mt-3 text-center">Documents available after membership approval</p>
              )}
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>

              <div className="space-y-2">
                <a
                  href="/videos"
                  className="block w-full text-left px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  Educational Videos
                </a>
                <a
                  href="/businesses"
                  className="block w-full text-left px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  Business Directory
                </a>
                <a
                  href="/members"
                  className="block w-full text-left px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  Member Directory
                </a>
                <a
                  href="/helpline"
                  className="block w-full text-left px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  Helpline
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
