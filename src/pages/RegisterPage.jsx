"use client"

import { useState } from "react"
import { CheckCircle, AlertCircle } from "lucide-react"
import { apiRequest, validateMobile, validateEmail } from "../lib/utils"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    district: "",
    mobile: "",
    business: "",
    businessType: "",
    email: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState("idle") // idle, success, error
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState("")

  const districts = [
    "अहमदनगर",
    "अकोला",
    "अमरावती",
    "औरंगाबाद",
    "बीड",
    "भंडारा",
    "बुलढाणा",
    "चंद्रपूर",
    "धुळे",
    "गडचिरोली",
    "गोंदिया",
    "हिंगोली",
    "जालना",
    "जळगाव",
    "कोल्हापूर",
    "लातूर",
    "मुंबई शहर",
    "मुंबई उपनगर",
    "नागपूर",
    "नांदेड",
    "नाशिक",
    "उस्मानाबाद",
    "पालघर",
    "परभणी",
    "पुणे",
    "रायगड",
    "रत्नागिरी",
    "सांगली",
    "सातारा",
    "सिंधुदुर्ग",
    "सोलापूर",
    "ठाणे",
    "वर्धा",
    "वाशिम",
    "यवतमाळ",
  ]

  const businessTypes = ["गृहउद्योग", "ब्युटी पार्लर", "बुटीक", "कॅटरिंग", "शिक्षण", "आरोग्य सेवा", "कृषी व्यवसाय", "हस्तकला", "अन्य"]

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "पूर्ण नाव आवश्यक आहे"
    }

    if (!formData.address.trim()) {
      newErrors.address = "पत्ता आवश्यक आहे"
    }

    if (!formData.district) {
      newErrors.district = "जिल्हा निवडा"
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "मोबाईल नंबर आवश्यक आहे"
    } else if (!validateMobile(formData.mobile)) {
      newErrors.mobile = "वैध मोबाईल नंबर टाका"
    }

    if (!formData.business.trim()) {
      newErrors.business = "व्यवसाय/काम आवश्यक आहे"
    }

    if (!formData.businessType) {
      newErrors.businessType = "व्यवसाय प्रकार निवडा"
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "वैध ईमेल पत्ता टाका"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")
    setApiError("")

    try {
      await apiRequest("/api/members/register", {
        method: "POST",
        body: JSON.stringify(formData),
      })

      setSubmitStatus("success")
      setFormData({
        fullName: "",
        address: "",
        district: "",
        mobile: "",
        business: "",
        businessType: "",
        email: "",
      })
    } catch (error) {
      setSubmitStatus("error")
      setApiError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">नोंदणी यशस्वी!</h2>
            <p className="text-gray-600 mb-6">
              तुमची नोंदणी यशस्वीरित्या पूर्ण झाली आहे. आमच्या टीमचा सदस्य लवकरच तुमच्याशी संपर्क साधेल.
            </p>
            <button
              onClick={() => setSubmitStatus("idle")}
              className="gradient-purple text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              नवीन नोंदणी करा
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-8 sm:px-8">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">सदस्य नोंदणी फॉर्म</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  पूर्ण नाव <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="तुमचे पूर्ण नाव टाका"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  पत्ता <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="तुमचा पूर्ण पत्ता टाका"
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
              </div>

              {/* District */}
              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
                  जिल्हा <span className="text-red-500">*</span>
                </label>
                <select
                  id="district"
                  value={formData.district}
                  onChange={(e) => handleInputChange("district", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.district ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">जिल्हा निवडा</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                {errors.district && <p className="text-sm text-red-500 mt-1">{errors.district}</p>}
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  मोबाईल नंबर <span className="text-red-500">*</span>
                </label>
                <input
                  id="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                  placeholder="9876543210"
                  maxLength={10}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.mobile ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.mobile && <p className="text-sm text-red-500 mt-1">{errors.mobile}</p>}
              </div>

              {/* Business */}
              <div>
                <label htmlFor="business" className="block text-sm font-medium text-gray-700 mb-2">
                  व्यवसाय/काम <span className="text-red-500">*</span>
                </label>
                <input
                  id="business"
                  type="text"
                  value={formData.business}
                  onChange={(e) => handleInputChange("business", e.target.value)}
                  placeholder="तुमचा व्यवसाय किंवा काम"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.business ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.business && <p className="text-sm text-red-500 mt-1">{errors.business}</p>}
              </div>

              {/* Business Type */}
              <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                  व्यवसाय प्रकार <span className="text-red-500">*</span>
                </label>
                <select
                  id="businessType"
                  value={formData.businessType}
                  onChange={(e) => handleInputChange("businessType", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.businessType ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">व्यवसाय प्रकार निवडा</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.businessType && <p className="text-sm text-red-500 mt-1">{errors.businessType}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  ईमेल (पर्यायी)
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Error Alert */}
              {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                  <p className="text-red-700">{apiError || "नोंदणी करताना काही त्रुटी आली. कृपया पुन्हा प्रयत्न करा."}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full gradient-purple text-white py-4 px-6 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "नोंदणी करत आहे..." : "नोंदणी करा"}
              </button>

              <div className="text-center text-sm text-gray-600">
                <p>नोंदणी करून तुम्ही आमच्या अटी व शर्तींशी सहमत आहात</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
