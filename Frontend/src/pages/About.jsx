"use client"

import { useState } from "react"

export default function About() {
  const [activeTab, setActiveTab] = useState("mission")

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Clinical Psychologist",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Dr. Johnson has over 15 years of experience in mental health treatment and research.",
    },
    {
      name: "Dr. Michael Chen",
      role: "Psychiatrist",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Dr. Chen specializes in anxiety disorders and evidence-based treatment approaches.",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Research Director",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Dr. Rodriguez leads our research initiatives in digital mental health interventions.",
    },
  ]

  const features = [
    {
      title: "Evidence-Based Assessments",
      description: "Our assessments are based on validated psychological instruments and research.",
      icon: "📊",
    },
    {
      title: "Privacy First",
      description: "Your data stays on your device. We prioritize your privacy and security.",
      icon: "🔒",
    },
    {
      title: "Expert Resources",
      description: "Access curated resources from licensed mental health professionals.",
      icon: "👨‍⚕️",
    },
    {
      title: "Progress Tracking",
      description: "Monitor your mental wellness journey with detailed insights and trends.",
      icon: "📈",
    },
  ]

  const stats = [
    { number: "50,000+", label: "Users Helped" },
    { number: "98%", label: "User Satisfaction" },
    { number: "24/7", label: "Support Available" },
    { number: "15+", label: "Expert Partners" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About MindCare</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Empowering individuals to take control of their mental wellness through science-backed tools and expert
              guidance.
            </p>
          </div>
        </div>
      </div>

      
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-lg">
            {["mission", "team", "features"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-md font-medium capitalize transition-colors duration-200 ${
                  activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        
        {activeTab === "mission" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">About MindCare</h1>

              <div className="prose max-w-none">
                <p className="text-lg text-gray-600 mb-6">
                  MindCare is a comprehensive mental wellness platform designed to help individuals track, understand,
                  and improve their mental health through scientifically-backed assessments and expert resources.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-6">
                  We believe that mental health is just as important as physical health. Our mission is to make mental
                  wellness tools accessible, private, and effective for everyone.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>PHQ20 based mental health assessments</li>
                  <li>Progress tracking and analytics</li>
                  <li>Curated mental health resources</li>
                  <li>Privacy-focused design</li>
                  <li>Progressive Web App capabilities</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy & Security</h2>
                <p className="text-gray-600 mb-6">
                  Your privacy is our top priority. All assessment data is stored locally on your device and never
                  transmitted to external servers without your explicit consent.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "team" && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
              <p className="text-lg text-gray-600">
                Our team consists of licensed mental health professionals, researchers, and technology experts dedicated
                to improving mental wellness.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "features" && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Makes Us Different</h2>
              <p className="text-lg text-gray-600">
                Discover the features that make MindCare a trusted platform for mental wellness.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Wellness Journey?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have taken control of their mental wellness with MindCare.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200">
              Take Your First Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
