export default function Resources() {
  
  const resources = [
    {
      id: 1,
      title: "Understanding Depression",
      description: "Learn about the signs, symptoms, and treatment options for depression.",
      category: "Education",
      type: "Article",
      url: "#",
    },
    {
      id: 2,
      title: "Anxiety Management Techniques",
      description: "Practical strategies for managing anxiety in daily life.",
      category: "Self-Help",
      type: "Guide",
      url: "#",
    },
    {
      id: 3,
      title: "Mindfulness Meditation",
      description: "Introduction to mindfulness practices for mental wellness.",
      category: "Wellness",
      type: "Video",
      url: "#",
    },
    {
      id: 4,
      title: "Crisis Hotlines",
      description: "24/7 support lines for mental health emergencies.",
      category: "Emergency",
      type: "Resource",
      url: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mental Health Resources</h1>
          <p className="mt-2 text-gray-600">Curated resources to support your mental wellness journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {resource.category}
                </span>
                <span className="text-xs text-gray-500">{resource.type}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{resource.title}</h3>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Access Resource
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
