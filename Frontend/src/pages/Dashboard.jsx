"use client"

import { useAuth } from "../context/AuthContext"
import { useHealth } from "../context/HealthContext"
import { Link } from "react-router-dom"
import { CalendarIcon, ChartBarIcon, ExclamationTriangleIcon, TrophyIcon, HeartIcon } from "@heroicons/react/24/outline"
import ShareButton from "../components/ShareButton"
import ShareModal from "../components/ShareModal"
import { useWebShare } from "../hooks/useWebShare"
import { useState } from "react"

export default function Dashboard() {
  const { user } = useAuth()
  const { assessments } = useHealth()

  const latestAssessment = assessments.length > 0 ? assessments[assessments.length - 1] : null

  const [showShareModal, setShowShareModal] = useState(false)
  const [shareData, setShareData] = useState(null)
  const { shareProgress, shareAssessmentResult } = useWebShare()

  const getScoreColor = (level) => {
    switch (level) {
      case "Low":
        return "from-green-500 to-emerald-500"
      case "Moderate":
        return "from-yellow-500 to-orange-500"
      case "High":
        return "from-red-500 to-pink-500"
      default:
        return "from-gray-500 to-slate-500"
    }
  }

  const getScoreIcon = (level) => {
    switch (level) {
      case "Low":
        return TrophyIcon
      case "Moderate":
        return ChartBarIcon
      case "High":
        return ExclamationTriangleIcon
      default:
        return ChartBarIcon
    }
  }

  const getMotivationalMessage = (level) => {
    switch (level) {
      case "Low":
        return "Great job! You're maintaining good mental health. Keep up the excellent work! 🌟"
      case "Moderate":
        return "You're on the right path. Small steps can lead to big improvements. 💪"
      case "High":
        return "Remember, seeking help is a sign of strength. You're not alone in this journey. 🤝"
      default:
        return "Every step forward is progress worth celebrating. 🎯"
    }
  }

  const handleShareProgress = async () => {
    return await shareProgress(assessments.length, latestAssessment)
  }

  const handleShareResult = async () => {
    return await shareAssessmentResult(latestAssessment)
  }

  const openShareModal = (data, title) => {
    setShareData(data)
    setShowShareModal(true)
  }

  if (!latestAssessment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <HeartIcon className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to Your Dashboard</h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Start your mental health journey by taking your first assessment. Get personalized insights and track your
              progress over time.
            </p>
            <Link
              to="/assessment"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Take Your First Assessment
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const ScoreIcon = getScoreIcon(latestAssessment.interpretation.level)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="mt-2 text-gray-600">Here's your mental wellness overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Assessments</h3>
            <p className="text-3xl font-bold text-blue-600">{assessments.length}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Latest Score</h3>
            <p className="text-3xl font-bold text-green-600">
              {latestAssessment ? `${latestAssessment.score}/27` : "N/A"}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Status</h3>
            <p className="text-lg font-medium text-gray-700">
              {latestAssessment ? latestAssessment.interpretation.level : "No data"}
            </p>
          </div>
        </div>

        {latestAssessment && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Latest Assessment Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Score: {latestAssessment.score}/27</p>
                <p className="text-sm text-gray-600 mb-2">Level: {latestAssessment.interpretation.level}</p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(latestAssessment.completedTime).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{latestAssessment.interpretation.description}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Assessment History</h3>
          {assessments.length > 0 ? (
            <div className="space-y-4">
              {assessments
                .slice(-5)
                .reverse()
                .map((assessment) => (
                  <div key={assessment.id} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Score: {assessment.score}/27</p>
                        <p className="text-sm text-gray-600">{assessment.interpretation.level}</p>
                      </div>
                      <p className="text-sm text-gray-500">{new Date(assessment.completedTime).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500">No assessments completed yet.</p>
          )}
        </div>

        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Latest Assessment Result</h2>
            <div className="flex items-center text-gray-500 bg-gray-100 px-4 py-2 rounded-xl">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">
                {new Date(latestAssessment.completedTime).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${getScoreColor(latestAssessment.interpretation.level)} rounded-2xl flex items-center justify-center mr-6 shadow-lg`}
                >
                  <ScoreIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">{latestAssessment.score}/27</div>
                  <div className="text-sm text-gray-500 font-medium">Assessment Score</div>
                </div>
              </div>

              <div
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${getScoreColor(latestAssessment.interpretation.level)} shadow-lg`}
              >
                {latestAssessment.interpretation.level} Risk Level
              </div>

              {/* Progress Bar */}
              <div className="mt-8">
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span className="font-medium">Assessment Progress</span>
                  <span className="font-bold">{latestAssessment.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${getScoreColor(latestAssessment.interpretation.level)} transition-all duration-1000 ease-out`}
                    style={{ width: `${latestAssessment.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <HeartIcon className="h-5 w-5 text-blue-600 mr-2" />
                Personalized Recommendation
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">{latestAssessment.recommendation}</p>

              <div className="bg-white/80 rounded-xl p-4 border border-blue-200">
                <p className="text-sm text-blue-800 font-medium">
                  {getMotivationalMessage(latestAssessment.interpretation.level)}
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <ShareButton onShare={handleShareResult} variant="outline" size="sm" className="flex-1">
                  Share Result
                </ShareButton>
                <ShareButton onShare={handleShareProgress} variant="gradient" size="sm" className="flex-1">
                  Share Progress
                </ShareButton>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            to="/assessment"
            className="group bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">Take New Assessment</h3>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                <ChartBarIcon className="h-6 w-6" />
              </div>
            </div>
            <p className="text-blue-100 mb-4">
              Track your progress with another comprehensive mental health assessment.
            </p>
            <div className="text-sm font-medium text-blue-200">✨ Get updated insights and recommendations</div>
          </Link>

          <Link
            to="/resources"
            className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl border border-gray-100 hover:border-gray-200 transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Explore Resources</h3>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <HeartIcon className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Discover professional resources, self-help tools, and support networks.
            </p>
            <div className="text-sm font-medium text-green-600">🌟 Curated by mental health professionals</div>
          </Link>
        </div>
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          shareData={shareData}
          title="Share Your Progress"
        />
      </div>
    </div>
  )
}
