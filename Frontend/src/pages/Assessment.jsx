"use client"

import { useState } from "react"
import { useAssessment } from "../hooks/useAssessment"
import { useHealth } from "../context/HealthContext"

export default function Assessment() {
  const { PHQ9_QUESTIONS, ANSWER_OPTIONS, currentAssessment, startAssessment, updateAnswer, completeAssessment } =
    useAssessment()
  const { addAssessment } = useHealth()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [results, setResults] = useState(null)

  const handleStartAssessment = () => {
    startAssessment()
    setCurrentQuestion(0)
    setResults(null)
  }

  const handleAnswerSelect = (value) => {
    updateAnswer(currentQuestion, value)
  }

  const handleNext = () => {
    if (currentQuestion < PHQ9_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const completedAssessment = completeAssessment()
      if (completedAssessment) {
        addAssessment(completedAssessment)
        setResults(completedAssessment)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const canProceed = currentAssessment?.answers[currentQuestion] !== null

  if (results) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Assessment Complete!</h2>
            <div className="mb-8">
              <div className="text-6xl font-bold text-blue-600 mb-2">{results.score}</div>
              <div className="text-xl text-gray-600">out of 27</div>
            </div>
            <div className="mb-8">
              <div
                className={`inline-block px-4 py-2 rounded-full text-white font-semibold bg-${results.interpretation.color}-500`}
              >
                {results.interpretation.level}
              </div>
              <p className="mt-4 text-gray-600">{results.interpretation.description}</p>
            </div>
            <div className="space-y-4">
              <button
                onClick={handleStartAssessment}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Take Another Assessment
              </button>
              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!currentAssessment) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Mental Health Assessment</h1>
            <p className="text-lg text-gray-600 mb-8">
              This assessment uses the PHQ-9 questionnaire to help evaluate your mental wellness. It takes about 5
              minutes to complete.
            </p>
            <button
              onClick={handleStartAssessment}
              className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Assessment
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Question {currentQuestion + 1} of {PHQ9_QUESTIONS.length}
              </h2>
              <div className="text-sm text-gray-500">
                Progress: {Math.round(((currentQuestion + 1) / PHQ9_QUESTIONS.length) * 100)}%
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / PHQ9_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Over the last 2 weeks, how often have you been bothered by:
            </h3>
            <p className="text-lg text-gray-700 mb-8">{PHQ9_QUESTIONS[currentQuestion]}</p>

            <div className="space-y-3">
              {ANSWER_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswerSelect(option.value)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    currentAssessment.answers[currentQuestion] === option.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        currentAssessment.answers[currentQuestion] === option.value
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {currentAssessment.answers[currentQuestion] === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <span className="text-gray-700">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === PHQ9_QUESTIONS.length - 1 ? "Complete" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
