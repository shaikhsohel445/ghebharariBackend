"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User, AlertCircle, Phone, Lock } from "lucide-react"
import { apiRequest } from "../lib/utils"

export default function MemberLoginPage({ onLogin }) {
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await apiRequest("/api/auth/member/login", {
        method: "POST",
        body: JSON.stringify(formData),
      })

      // Store token and member info
      localStorage.setItem("memberToken", response.token)
      localStorage.setItem("memberData", JSON.stringify(response.member))

      onLogin(response.member, response.token)
      navigate("/member/dashboard")
    } catch (err) {
      setError(err.message || "Login failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 gradient-purple rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">सदस्य लॉगिन</h2>
          <p className="mt-2 text-gray-600">घे भरारी सेवा भावी संस्था</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                मोबाईल नंबर
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="mobile"
                  type="tel"
                  required
                  maxLength={10}
                  value={formData.mobile}
                  onChange={(e) => setFormData((prev) => ({ ...prev, mobile: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="9876543210"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                पासवर्ड
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="तुमच्या मोबाईलचे शेवटचे 4 अंक"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">पासवर्ड म्हणून तुमच्या मोबाईल नंबरचे शेवटचे 4 अंक वापरा</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full gradient-purple text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "लॉगिन करत आहे..." : "लॉगिन करा"}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              अद्याप सदस्य नाही?{" "}
              <a href="/register" className="text-purple-600 hover:text-purple-700 font-medium">
                नोंदणी करा
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
