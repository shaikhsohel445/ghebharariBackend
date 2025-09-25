"use client"

import { useState, useEffect } from "react"
import { Building2, MapPin, Phone, Mail, Search } from "lucide-react"
import { apiRequest } from "../lib/utils"

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filters, setFilters] = useState({
    district: "",
    businessType: "",
    search: "",
  })
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
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

  const businessTypes = ["गृहउद्योग", "ब्युटी पार्लर", "बुटीक", "कॅटरिंग", "शिक्षण", "आरोग्य सेवा", "कृषी व्यवसाय", "हस्तकला", "अन्य"]

  const fetchBusinesses = async () => {
    setLoading(true)
    setError("")

    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })

      if (filters.district) params.append("district", filters.district)
      if (filters.businessType) params.append("businessType", filters.businessType)

      const response = await apiRequest(`/api/businesses?${params}`)
      setBusinesses(response.businesses)
      setPagination(response.pagination)
    } catch (err) {
      setError("व्यवसाय यादी लोड करताना त्रुटी आली")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBusinesses()
  }, [pagination.page, filters.district, filters.businessType])

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const filteredBusinesses = businesses.filter(
    (business) =>
      business.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      business.owner.toLowerCase().includes(filters.search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">व्यवसाय यादी</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">आमच्या सदस्यांच्या व्यवसायांची संपूर्ण माहिती</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">जिल्हा</label>
              <select
                value={filters.district}
                onChange={(e) => handleFilterChange("district", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">सर्व जिल्हे</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">व्यवसाय प्रकार</label>
              <select
                value={filters.businessType}
                onChange={(e) => handleFilterChange("businessType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">सर्व प्रकार</option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">शोधा</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  placeholder="व्यवसाय किंवा मालकाचे नाव शोधा"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">व्यवसाय लोड करत आहे...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Business Grid */}
        {!loading && !error && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredBusinesses.map((business) => (
                <div
                  key={business.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 gradient-purple rounded-lg flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div className="ml-3">
                          <h3 className="font-bold text-gray-900">{business.name}</h3>
                          <p className="text-sm text-gray-600">{business.type}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{business.district}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{business.mobile}</span>
                      </div>
                      {business.email && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          <span>{business.email}</span>
                        </div>
                      )}
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">मालक:</span> {business.owner}
                      </p>
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

            {/* No Results */}
            {filteredBusinesses.length === 0 && !loading && (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">कोणतेही व्यवसाय सापडले नाहीत</h3>
                <p className="text-gray-600">कृपया वेगळे फिल्टर वापरून पहा</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
