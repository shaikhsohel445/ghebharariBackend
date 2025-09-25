import { Phone, Shield, Heart, Users, AlertTriangle, Clock } from "lucide-react"

export default function HelplinePage() {
  const helplineServices = [
    {
      icon: Shield,
      title: "महिला सुरक्षा हेल्पलाइन",
      number: "1091",
      description: "महिलांच्या सुरक्षेसाठी 24/7 उपलब्ध",
      color: "bg-red-500",
    },
    {
      icon: Heart,
      title: "घरगुती हिंसाचार हेल्पलाइन",
      number: "181",
      description: "घरगुती हिंसाचारापासून संरक्षण",
      color: "bg-pink-500",
    },
    {
      icon: Users,
      title: "बाल संरक्षण हेल्पलाइन",
      number: "1098",
      description: "मुलांच्या सुरक्षेसाठी तातडीची मदत",
      color: "bg-blue-500",
    },
    {
      icon: Phone,
      title: "पोलिस हेल्पलाइन",
      number: "100",
      description: "तातडीच्या परिस्थितीसाठी पोलिस मदत",
      color: "bg-gray-700",
    },
    {
      icon: AlertTriangle,
      title: "आपत्कालीन सेवा",
      number: "108",
      description: "वैद्यकीय आणि इतर आपत्कालीन सेवा",
      color: "bg-green-500",
    },
    {
      icon: Heart,
      title: "मानसिक आरोग्य हेल्पलाइन",
      number: "9152987821",
      description: "मानसिक आरोग्यासाठी सल्ला आणि मदत",
      color: "bg-purple-500",
    },
  ]

  const organizationContacts = [
    {
      title: "मुख्य कार्यालय",
      phone: "+91 98765 43210",
      email: "info@ghebharari.org",
      address: "मुख्य रस्ता, पुणे, महाराष्ट्र",
    },
    {
      title: "सदस्यत्व विभाग",
      phone: "+91 98765 43211",
      email: "membership@ghebharari.org",
      address: "सदस्यत्व कार्यालय, पुणे",
    },
    {
      title: "व्यवसाय सहाय्य विभाग",
      phone: "+91 98765 43212",
      email: "business@ghebharari.org",
      address: "व्यवसाय मार्गदर्शन केंद्र, पुणे",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 gradient-purple rounded-full flex items-center justify-center mx-auto mb-6">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">हेल्पलाइन सेवा</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">आपत्कालीन परिस्थितीत आणि मदतीसाठी महत्वाचे संपर्क क्रमांक</p>
        </div>

        {/* Emergency Alert */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-red-800">आपत्कालीन परिस्थितीत</h3>
              <p className="text-red-700">
                तातडीच्या मदतीसाठी <strong>100</strong> (पोलिस) किंवा <strong>108</strong> (आपत्कालीन सेवा) वर कॉल करा
              </p>
            </div>
          </div>
        </div>

        {/* Helpline Services */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">महत्वाच्या हेल्पलाइन क्रमांक</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helplineServices.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-bold text-gray-900">{service.title}</h3>
                        <p className="text-2xl font-bold text-purple-600">{service.number}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{service.description}</p>

                    <div className="mt-4 pt-4 border-t">
                      <a
                        href={`tel:${service.number}`}
                        className="inline-flex items-center justify-center w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        कॉल करा
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Organization Contacts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">संस्थेचे संपर्क क्रमांक</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {organizationContacts.map((contact, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-gray-900 mb-4">{contact.title}</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-3" />
                    <a href={`tel:${contact.phone}`} className="hover:text-purple-600">
                      {contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <a href={`mailto:${contact.email}`} className="hover:text-purple-600">
                      {contact.email}
                    </a>
                  </div>
                  <div className="flex items-start text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{contact.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-blue-900">कार्यालयीन वेळ</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-blue-800">
            <div>
              <p className="font-medium">सोमवार ते शुक्रवार</p>
              <p>सकाळी 9:00 ते संध्याकाळी 6:00</p>
            </div>
            <div>
              <p className="font-medium">शनिवार</p>
              <p>सकाळी 9:00 ते दुपारी 2:00</p>
            </div>
          </div>
          <p className="text-blue-700 mt-4 text-sm">
            <strong>टीप:</strong> आपत्कालीन परिस्थितीत वरील हेल्पलाइन क्रमांक 24/7 उपलब्ध आहेत
          </p>
        </div>
      </div>
    </div>
  )
}
