"use client"

import { useState, useEffect } from "react"
import { Users, UserCheck, UserX, Clock, Video } from "lucide-react"
import { apiRequest } from "../lib/utils"

export default function AdminDashboard({ token }) {
  const [stats, setStats] = useState({
    totalMembers: 0,
    pendingMembers: 0,
    approvedMembers: 0,
    rejectedMembers: 0,
    totalVideos: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      console.log("[v0] Fetching admin stats")

      const statsResponse = await apiRequest("/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      })

      console.log("[v0] Stats response:", statsResponse)

      if (statsResponse.success) {
        setStats(statsResponse.stats)
      } else {
        // Fallback to old method if stats endpoint fails
        console.log("[v0] Stats endpoint failed, using fallback")

        // Fetch members data
        const membersResponse = await apiRequest("/api/admin/members", {
          headers: { Authorization: `Bearer ${token}` },
        })

        const members = membersResponse.members || []
        const totalMembers = members.length
        const pendingMembers = members.filter((m) => m.status === "pending").length
        const approvedMembers = members.filter((m) => m.status === "active").length
        const rejectedMembers = members.filter((m) => m.status === "rejected").length

        // Fetch videos data
        const videosResponse = await apiRequest("/api/videos")
        const totalVideos = videosResponse.videos?.length || 0

        setStats({
          totalMembers,
          pendingMembers,
          approvedMembers,
          rejectedMembers,
          totalVideos,
        })
      }
    } catch (error) {
      console.error("[v0] Failed to fetch stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ title, value, icon: Icon, color, bgColor }) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{loading ? "..." : value}</p>
        </div>
        <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">घे भरारी सेवा भावी संस्था - Overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            title="Total Members"
            value={stats.totalMembers}
            icon={Users}
            color="text-blue-600"
            bgColor="bg-blue-100"
          />
          <StatCard
            title="Pending Approval"
            value={stats.pendingMembers}
            icon={Clock}
            color="text-yellow-600"
            bgColor="bg-yellow-100"
          />
          <StatCard
            title="Approved Members"
            value={stats.approvedMembers}
            icon={UserCheck}
            color="text-green-600"
            bgColor="bg-green-100"
          />
          <StatCard
            title="Rejected Members"
            value={stats.rejectedMembers}
            icon={UserX}
            color="text-red-600"
            bgColor="bg-red-100"
          />
          <StatCard
            title="Total Videos"
            value={stats.totalVideos}
            icon={Video}
            color="text-purple-600"
            bgColor="bg-purple-100"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/members?status=pending"
              className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-yellow-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Review Pending Members</h3>
                  <p className="text-sm text-gray-600">{stats.pendingMembers} members waiting for approval</p>
                </div>
              </div>
            </a>

            <a
              href="/admin/videos"
              className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Video className="w-8 h-8 text-purple-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Manage Videos</h3>
                  <p className="text-sm text-gray-600">Add or edit educational videos</p>
                </div>
              </div>
            </a>

            <a
              href="/admin/members"
              className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">All Members</h3>
                  <p className="text-sm text-gray-600">View and manage all members</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
