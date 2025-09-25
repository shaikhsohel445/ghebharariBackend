"use client"

import { useState } from "react"
import { Shield, CheckCircle, XCircle, Search } from "lucide-react"
import { apiRequest, validateMobile, formatDate } from "../lib/utils"

export default function VerifyPage() {
  const [mobile, setMobile] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState(null)
  const [error, setError] = useState("")

  const handleVerify = async (e) => {
    e.preventDefault()

    if (!mobile.trim()) {
      setError("मोबाईल नंबर टाका")
      return
    }

    if (!validateMobile(mobile)) {
      setError("वैध मोबाईल नंबर टाका")
      return
    }

    setIsVerifying(true)
    setError("")
    setVerificationResult(null)

    try {
      const response = await apiRequest("/api/members/verify", {
        method: "POST",
        body: JSON.stringify({ mobile }),
      })

      setVerificationResult(response)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleInputChange = (value) => {
    setMobile(value)
    if (error) setError("")
    if (verificationResult) setVerificationResult(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 gradient-purple rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">सदस्य तपासणी</h1>
          <p className="text-lg text-gray-600">तुमचा मोबाईल नंबर वापरून सदस्यत्व तपासा</p>
        </div>

        {/* Verification Form */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-8 sm:px-8">
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  मोबाईल नंबर
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="9876543210"
                    maxLength={10}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      error ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full gradient-purple text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? "तपासत आहे..." : "तपासा"}
              </button>
            </form>
          </div>
        </div>

        {/* Verification Result */}
        {verificationResult && (
          <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-8 sm:px-8">
              {verificationResult.verified ? (
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">सदस्यत्व सत्यापित!</h2>
                  <p className="text-gray-600 mb-8">हा मोबाईल नंबर आमच्या संस्थेत नोंदणीकृत आहे</p>

                  <div className="bg-gray-50 rounded-lg p-6 text-left">
                    <h3 className="font-semibold text-gray-900 mb-4">सदस्य माहिती:</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">नाव:</span>
                        <span className="font-medium">{verificationResult.member.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">जिल्हा:</span>
                        <span className="font-medium">{verificationResult.member.district}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">व्यवसाय:</span>
                        <span className="font-medium">{verificationResult.member.business}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">व्यवसाय प्रकार:</span>
                        <span className="font-medium">{verificationResult.member.businessType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">नोंदणी दिनांक:</span>
                        <span className="font-medium">{formatDate(verificationResult.member.registrationDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">सदस्यत्व सापडले नाही</h2>
                  <p className="text-gray-600 mb-8">हा मोबाईल नंबर आमच्या संस्थेत नोंदणीकृत नाही</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800">कृपया आधी नोंदणी करा किंवा योग्य मोबाईल नंबर टाका</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">महत्वाची माहिती:</h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• फक्त नोंदणीकृत मोबाईल नंबर वापरा</li>
            <li>• मोबाईल नंबर 10 अंकी असावा</li>
            <li>• नंबर 6, 7, 8, किंवा 9 ने सुरू होणे आवश्यक</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
