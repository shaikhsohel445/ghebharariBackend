import { Link } from "react-router-dom"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">घे भरारी सेवा भावी संस्था</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              महिला सक्षमीकरण आणि व्यवसाय विकासासाठी समर्पित संस्था. आम्ही महिलांना स्वावलंबी बनवण्यासाठी विविध सेवा पुरवतो.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">द्रुत दुवे</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  मुख्यपृष्ठ
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors">
                  सदस्य नोंदणी
                </Link>
              </li>
              <li>
                <Link to="/businesses" className="text-gray-300 hover:text-white transition-colors">
                  व्यवसाय यादी
                </Link>
              </li>
              <li>
                <Link to="/verify" className="text-gray-300 hover:text-white transition-colors">
                  सदस्य तपासणी
                </Link>
              </li>
              <li>
                <Link to="/videos" className="text-gray-300 hover:text-white transition-colors">
                  व्हिडिओ
                </Link>
              </li>
              <li>
                <Link to="/member/login" className="text-gray-300 hover:text-white transition-colors">
                  सदस्य लॉगिन
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">संपर्क माहिती</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">info@ghebharari.org</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-purple-400 mt-1" />
                <span className="text-gray-300">
                  मुख्य कार्यालय,
                  <br />
                  पुणे, महाराष्ट्र
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-300">
            <span>© 2025 घे भरारी सेवा भावी संस्था. सर्व हक्क राखीव.</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300 mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>for women empowerment</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
