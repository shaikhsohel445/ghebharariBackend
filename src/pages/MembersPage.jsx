"use client"

import { useState, useEffect } from "react"
import { Users, MapPin, Building2, Calendar } from "lucide-react"
import { apiRequest, formatDate } from "../lib/utils"

export default function MembersPage() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  })

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

  const fetchMembers = async () => {
    setLoading(true)
    setError("")

    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })

      if (selectedDistrict) params.append("district", selectedDistrict)

      const response = await apiRequest(`/api/members?${params}`)
      setMembers(response.members)
      setPagination(response.pagination)
    } catch (err) {
      setError("सदस्य यादी लोड करताना त्रुटी आली")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [pagination.page, selectedDistrict])

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district)
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">सदस्य यादी</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">आमच्या संस्थेच्या सर्व सदस्यांची माहिती</p>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-medium text-gray-900 mb-4 sm:mb-0">जिल्ह्यानुसार फिल्टर करा</h3>
            <select
              value={selectedDistrict}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">सर्व जिल्हे</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">सदस्य लोड करत आहे...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Members Grid */}
        {!loading && !error && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 gradient-purple rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div className="ml-3">
                          <h3 className="font-bold text-gray-900">{member.fullName}</h3>
                          <p className="text-sm text-gray-600">{member.businessType}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{member.district}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Building2 className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{member.business}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>सामील झाली: {formatDate(member.registrationDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => setPagination((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                  disabled={pagination.page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  मागील
                </button>

                <span className="px-4 py-2 text-gray-600">
                  पृष्ठ {pagination.page} / {pagination.totalPages}
                </span>

                <button
                  onClick={() => setPagination((prev) => ({ ...prev, page: Math.min(prev.totalPages, prev.page + 1) }))}
                  disabled={pagination.page === pagination.totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  पुढील
                </button>
              </div>
            )}

            {/* Stats */}
            <div className="mt-12 bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">एकूण सदस्य: {pagination.total}</h3>
                <p className="text-gray-600">
                  {selectedDistrict ? `${selectedDistrict} जिल्ह्यातील सदस्य` : "सर्व जिल्ह्यांतील सदस्य"}
                </p>
              </div>
            </div>

            {/* No Results */}
            {members.length === 0 && !loading && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">कोणतेही सदस्य सापडले नाहीत</h3>
                <p className="text-gray-600">कृपया वेगळा जिल्हा निवडून पहा</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
