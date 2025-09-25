"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Play, Calendar, User, X } from "lucide-react"
import { apiRequest } from "../lib/utils"

export default function AdminVideosPage({ token }) {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingVideo, setEditingVideo] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    youtubeUrl: "",
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      setLoading(true)
      console.log("[v0] Fetching videos")
      const response = await apiRequest("/api/videos")
      console.log("[v0] Videos response:", response)
      setVideos(response.videos || [])
    } catch (error) {
      console.error("[v0] Failed to fetch videos:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.youtubeUrl.trim()) {
      alert("Title and YouTube URL are required")
      return
    }

    try {
      setSubmitting(true)
      console.log("[v0] Submitting video:", formData)

      const response = await apiRequest("/api/videos", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      })

      console.log("[v0] Video submission response:", response)

      if (response.success) {
        // Reset form and refresh videos
        setFormData({ title: "", description: "", youtubeUrl: "" })
        setShowAddForm(false)
        setEditingVideo(null)
        await fetchVideos()
        alert("Video added successfully!")
      } else {
        throw new Error(response.error || "Failed to add video")
      }
    } catch (error) {
      console.error("[v0] Failed to add video:", error)
      alert(`Failed to add video: ${error.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({ title: "", description: "", youtubeUrl: "" })
    setShowAddForm(false)
    setEditingVideo(null)
  }

  const VideoCard = ({ video }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative">
        <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all"
          >
            <Play className="w-6 h-6 text-red-600" />
          </a>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
        {video.description && <p className="text-gray-600 text-sm mb-4 line-clamp-3">{video.description}</p>}

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(video.createdDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{video.createdBy}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => {
              setEditingVideo(video)
              setFormData({
                title: video.title,
                description: video.description,
                youtubeUrl: video.youtubeUrl,
              })
              setShowAddForm(true)
            }}
            className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this video?")) {
                // TODO: Implement delete functionality
                console.log("Delete video:", video.id)
              }
            }}
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Video Management</h1>
            <p className="text-gray-600 mt-2">Manage educational videos for members</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="gradient-purple text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Video</span>
          </button>
        </div>

        {/* Add/Edit Video Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{editingVideo ? "Edit Video" : "Add New Video"}</h2>
                  <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Video Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="title"
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter video title"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter video description"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700 mb-2">
                      YouTube URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="youtubeUrl"
                      type="url"
                      required
                      value={formData.youtubeUrl}
                      onChange={(e) => setFormData((prev) => ({ ...prev, youtubeUrl: e.target.value }))}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">Paste the full YouTube video URL</p>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 gradient-purple text-white py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Saving..." : editingVideo ? "Update Video" : "Add Video"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Videos Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading videos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No videos yet</h3>
            <p className="text-gray-600 mb-4">Start by adding your first educational video</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="gradient-purple text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Add First Video
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
