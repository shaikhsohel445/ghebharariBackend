"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Users, Building2, Shield, Phone, Mail, UserPlus, Video, LogIn } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: "/", label: "मुख्यपृष्ठ", icon: null },
    { path: "/register", label: "नोंदणी करा", icon: UserPlus },
    { path: "/businesses", label: "व्यवसाय यादी", icon: Building2 },
    { path: "/verify", label: "सदस्य तपासा", icon: Shield },
    { path: "/members", label: "सदस्य यादी", icon: Users },
    { path: "/videos", label: "व्हिडिओ", icon: Video },
    { path: "/helpline", label: "हेल्पलाइन", icon: Phone },
    { path: "/contact", label: "संपर्क", icon: Mail },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-purple rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">घ</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">घे भरारी सेवा भावी संस्था</h1>
                <p className="text-xs text-gray-600">महिला सक्षमीकरण संस्था</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1 ${
                    isActive(item.path)
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </Link>
              )
            })}

            {/* Member Login Button */}
            <Link
              to="/member/login"
              className="ml-4 flex items-center space-x-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>सदस्य लॉगिन</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none focus:text-purple-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center space-x-2 ${
                    isActive(item.path)
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  <span>{item.label}</span>
                </Link>
              )
            })}

            {/* Mobile Member Login */}
            <Link
              to="/member/login"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center space-x-2 mt-2"
            >
              <LogIn className="w-5 h-5" />
              <span>सदस्य लॉगिन</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
