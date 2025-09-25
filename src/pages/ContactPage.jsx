import { MapPin, Phone, Mail, Clock, Users, Building2 } from "lucide-react"

export default function ContactPage() {
  const contactInfo = {
    address: "मुख्य रस्ता, पुणे, महाराष्ट्र 411001",
    phone: "+91 98765 43210",
    email: "info@ghebharari.org",
    website: "www.ghebharari.org",
  }

  const departments = [
    {
      name: "सदस्यत्व विभाग",
      head: "श्रीमती सुनीता पाटील",
      phone: "+91 98765 43211",
      email: "membership@ghebharari.org",
      icon: Users,
    },
    {
      name: "व्यवसाय सहाय्य विभाग",
      head: "श्रीमती प्रिया शर्मा",
      phone: "+91 98765 43212",
      email: "business@ghebharari.org",
      icon: Building2,
    },
  ]

  const socialLinks = [
    { name: "Facebook", url: "#", icon: "📘" },
    { name: "Instagram", url: "#", icon: "📷" },
    { name: "WhatsApp", url: "#", icon: "💬" },
    { name: "YouTube", url: "#", icon: "📺" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">आमच्याशी संपर्क साधा</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            आम्ही तुमच्या प्रश्नांची उत्तरे देण्यासाठी आणि मदत करण्यासाठी येथे आहोत
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">संपर्क माहिती</h2>

            {/* Main Contact Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">मुख्य कार्यालय</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-purple-600 mr-3 mt-1" />
                  <div>
                    <p className="text-gray-900 font-medium">पत्ता</p>
                    <p className="text-gray-600">{contactInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <p className="text-gray-900 font-medium">फोन</p>
                    <a href={`tel:${contactInfo.phone}`} className="text-purple-600 hover:text-purple-700">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <p className="text-gray-900 font-medium">ईमेल</p>
                    <a href={`mailto:${contactInfo.email}`} className="text-purple-600 hover:text-purple-700">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Contacts */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">विभागीय संपर्क</h3>
              {departments.map((dept, index) => {
                const Icon = dept.icon
                return (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 gradient-purple rounded-lg flex items-center justify-center mr-3">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                        <p className="text-sm text-gray-600">{dept.head}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-gray-400 mr-2" />
                        <a href={`tel:${dept.phone}`} className="text-purple-600 hover:text-purple-700">
                          {dept.phone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        <a href={`mailto:${dept.email}`} className="text-purple-600 hover:text-purple-700">
                          {dept.email}
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Operating Hours */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">कार्यालयीन वेळ</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">सोमवार - शुक्रवार</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">शनिवार</span>
                  <span className="font-medium">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">रविवार</span>
                  <span className="font-medium text-red-600">बंद</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">सोशल मीडिया</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-2xl mr-3">{social.icon}</span>
                    <span className="font-medium text-gray-700">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">त्वरित कृती</h3>
              <div className="space-y-3">
                <a
                  href="/register"
                  className="block w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-3 text-center hover:bg-white/30 transition-colors duration-200"
                >
                  सदस्य नोंदणी करा
                </a>
                <a
                  href="/verify"
                  className="block w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-3 text-center hover:bg-white/30 transition-colors duration-200"
                >
                  सदस्यत्व तपासा
                </a>
                <a
                  href="/helpline"
                  className="block w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-3 text-center hover:bg-white/30 transition-colors duration-200"
                >
                  हेल्पलाइन पहा
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-12 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">नकाशा लवकरच उपलब्ध होईल</p>
              <p className="text-sm text-gray-500 mt-1">{contactInfo.address}</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">महत्वाची माहिती</h3>
          <ul className="text-blue-800 space-y-1">
            <li>• आपत्कालीन परिस्थितीसाठी हेल्पलाइन पृष्ठ पहा</li>
            <li>• सदस्यत्वासंबंधी प्रश्नांसाठी सदस्यत्व विभागाशी संपर्क साधा</li>
            <li>• व्यवसाय सहाय्यासाठी व्यवसाय सहाय्य विभागाशी बोला</li>
            <li>• सर्व सेवा विनामूल्य आहेत</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
