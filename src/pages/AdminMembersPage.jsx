"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Search, Filter, Check, X, Eye, Calendar, Phone, MapPin, Briefcase } from "lucide-react"
import { apiRequest } from "../lib/utils"

export default function AdminMembersPage({ token }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMember, setSelectedMember] = useState(null)
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "all")
  const [searchTerm, setSearchTerm] = useState("")
  const [actionLoading, setActionLoading] = useState(null)

  useEffect(() => {
    fetchMembers()
  }, [statusFilter])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      console.log("[v0] Fetching members with status:", statusFilter)
      const response = await apiRequest(`/api/admin/members?status=${statusFilter}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log("[v0] Members response:", response)
      setMembers(response.members || [])
    } catch (error) {
      console.error("[v0] Failed to fetch members:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleMemberAction = async (memberId, action, reason = "") => {
    try {
      setActionLoading(memberId)
      console.log("[v0] Processing member action:", memberId, action)

      const response = await apiRequest("/api/admin/members/approve", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ memberId, action, reason }),
      })

      console.log("[v0] Member action response:", response)

      if (response.success) {
        // Refresh members list
        await fetchMembers()
        setSelectedMember(null)
        alert(`Member ${action}d successfully!`)
      } else {
        throw new Error(response.error || `Failed to ${action} member`)
      }
    } catch (error) {
      console.error(`[v0] Failed to ${action} member:`, error)
      alert(`Failed to ${action} member: ${error.message}`)
    } finally {
      setActionLoading(null)
    }
  }

  const filteredMembers = members.filter(
    (member) =>
      member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.mobile.includes(searchTerm) ||
      member.district.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      active: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    }
    return styles[status] || "bg-gray-100 text-gray-800"
  }

  const getStatusText = (status) => {
    const texts = {
      pending: "Pending",
      active: "Approved",
      rejected: "Rejected",
    }
    return texts[status] || status
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Member Management</h1>
          <p className="text-gray-600 mt-2">Review and manage member applications</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="active">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search by name, mobile, or district..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Members List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading members...</p>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">No members found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registration Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{member.fullName}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {member.district}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {member.mobile}
                        </div>
                        {member.email && <div className="text-sm text-gray-500">{member.email}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{member.business}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Briefcase className="w-3 h-3 mr-1" />
                            {member.businessType}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(member.status)}`}
                        >
                          {getStatusText(member.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(member.registrationDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => setSelectedMember(member)}
                          className="text-purple-600 hover:text-purple-900 flex items-center space-x-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        {member.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleMemberAction(member.id, "approve")}
                              disabled={actionLoading === member.id}
                              className="text-green-600 hover:text-green-900 flex items-center space-x-1 disabled:opacity-50"
                            >
                              <Check className="w-4 h-4" />
                              <span>{actionLoading === member.id ? "Processing..." : "Approve"}</span>
                            </button>
                            <button
                              onClick={() => handleMemberAction(member.id, "reject")}
                              disabled={actionLoading === member.id}
                              className="text-red-600 hover:text-red-900 flex items-center space-x-1 disabled:opacity-50"
                            >
                              <X className="w-4 h-4" />
                              <span>{actionLoading === member.id ? "Processing..." : "Reject"}</span>
                            </button>
                          </>
                        )}
                        {(member.status === "active" || member.status === "rejected") && (
                          <button
                            onClick={() => {
                              const newAction = member.status === "active" ? "reject" : "approve"
                              if (confirm(`Are you sure you want to ${newAction} this member?`)) {
                                handleMemberAction(member.id, newAction)
                              }
                            }}
                            disabled={actionLoading === member.id}
                            className="text-blue-600 hover:text-blue-900 flex items-center space-x-1 disabled:opacity-50"
                          >
                            <span>{member.status === "active" ? "Reject" : "Approve"}</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Member Detail Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Member Details</h2>
                  <button onClick={() => setSelectedMember(null)} className="text-gray-500 hover:text-gray-700">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <p className="text-gray-900">{selectedMember.fullName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Mobile</label>
                      <p className="text-gray-900">{selectedMember.mobile}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">District</label>
                      <p className="text-gray-900">{selectedMember.district}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="text-gray-900">{selectedMember.email || "Not provided"}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <p className="text-gray-900">{selectedMember.address}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Business/Work</label>
                      <p className="text-gray-900">{selectedMember.business}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Business Type</label>
                      <p className="text-gray-900">{selectedMember.businessType}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(selectedMember.status)}`}
                      >
                        {getStatusText(selectedMember.status)}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Registration Date</label>
                      <p className="text-gray-900">{new Date(selectedMember.registrationDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {selectedMember.status === "pending" && (
                    <div className="flex space-x-4 pt-4 border-t">
                      <button
                        onClick={() => handleMemberAction(selectedMember.id, "approve")}
                        disabled={actionLoading === selectedMember.id}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center space-x-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>{actionLoading === selectedMember.id ? "Processing..." : "Approve Member"}</span>
                      </button>
                      <button
                        onClick={() => handleMemberAction(selectedMember.id, "reject")}
                        disabled={actionLoading === selectedMember.id}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>{actionLoading === selectedMember.id ? "Processing..." : "Reject Member"}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
