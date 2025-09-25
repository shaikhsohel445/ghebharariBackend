import { Link } from "react-router-dom"
import { ArrowRight, Users, Building2, Shield, Award, Heart, Sparkles } from "lucide-react"
import ImageSlider from "../components/ImageSlider"

export default function HomePage() {
  const features = [
    {
      icon: Users,
      title: "सदस्य नोंदणी",
      description: "आमच्या संस्थेत सामील होऊन महिला सक्षमीकरणाचा भाग बना",
      link: "/register",
    },
    {
      icon: Building2,
      title: "व्यवसाय यादी",
      description: "महिलांच्या व्यवसायांची संपूर्ण माहिती आणि संपर्क तपशील",
      link: "/businesses",
    },
    {
      icon: Shield,
      title: "सदस्य तपासणी",
      description: "तुमचा मोबाईल नंबर वापरून सदस्यत्व तपासा",
      link: "/verify",
    },
  ]

  const successStories = [
    {
      name: "प्रिया शर्मा",
      business: "ब्युटी पार्लर",
      district: "पुणे",
      story: "आमच्या संस्थेच्या मदतीने मी माझा ब्युटी पार्लर सुरू केला आणि आता ५० महिलांना रोजगार देते.",
    },
    {
      name: "सुनीता पाटील",
      business: "कॅटरिंग सर्विस",
      district: "मुंबई",
      story: "घरगुती कॅटरिंग सर्विसमधून आज मी एक यशस्वी उद्योजक बनले आहे.",
    },
    {
      name: "मीरा देशमुख",
      business: "हस्तकला",
      district: "नाशिक",
      story: "पारंपरिक हस्तकलेला आधुनिक रूप देऊन मी राष्ट्रीय पातळीवर व्यवसाय केला.",
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-purple text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-float">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">घे भरारी सेवा भावी संस्था</h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto text-pretty">
              महिला सक्षमीकरण आणि व्यवसाय विकासासाठी समर्पित संस्था
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
              >
                आज सामील व्हा
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/businesses"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition-colors duration-200"
              >
                व्यवसाय पहा
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image Slider Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">आमचे कार्य</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              महिला सक्षमीकरणाच्या दिशेने आमच्या संस्थेच्या विविध उपक्रमांची झलक
            </p>
          </div>
          <ImageSlider />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">आमच्या सेवा</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">महिलांच्या सक्षमीकरणासाठी आम्ही विविध सेवा पुरवतो</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 gradient-purple rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <Link
                    to={feature.link}
                    className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 group"
                  >
                    अधिक जाणा
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">यशोगाथा</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">आमच्या सदस्यांच्या प्रेरणादायक कहाण्या</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 gradient-teal rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900">{story.name}</h3>
                    <p className="text-sm text-gray-600">
                      {story.business} • {story.district}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{story.story}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-purple text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Heart className="w-16 h-16 mx-auto mb-6 animate-float" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">आमच्यासोबत जुडा आणि सशक्त बना</h2>
          <p className="text-xl mb-8 text-white/90">
            महिला सक्षमीकरणाच्या या प्रवासात सामील व्हा आणि आपल्या स्वप्नांना साकार करा
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
          >
            आज सामील व्हा
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  )
}
