"use client"

import { useState, useCallback } from "react"
import { useLocalStorage } from "./useLocalStorage"

const PHQ9_QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed, or the opposite being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself",
]

const ANSWER_OPTIONS = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "2-3 days in last 2 week" },
  { value: 2, label: "4-5 days in last2 week" },
  { value: 3, label: "Nearly every day" },
]

export function useAssessment() {
  const [assessments, setAssessments] = useLocalStorage("mindcare_assessments", [])
  const [currentAssessment, setCurrentAssessment] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const startAssessment = useCallback(() => {
    const newAssessment = {
      id: Date.now(),
      startTime: new Date().toISOString(),
      answers: new Array(PHQ9_QUESTIONS.length).fill(null),
      completed: false,
    }
    setCurrentAssessment(newAssessment)
  }, [])

  const updateAnswer = useCallback((questionIndex, value) => {
    setCurrentAssessment((prev) => {
      if (!prev) return null
      const newAnswers = [...prev.answers]
      newAnswers[questionIndex] = value
      return { ...prev, answers: newAnswers }
    })
  }, [])

  const calculateScore = useCallback((answers) => {
    return answers.reduce((sum, answer) => sum + (answer || 0), 0)
  }, [])

  const getScoreInterpretation = useCallback((score) => {
    if (score <= 4) return { level: "Minimal", color: "green", description: "Minimal depression symptoms" }
    if (score <= 9) return { level: "Mild", color: "yellow", description: "Mild depression symptoms" }
    if (score <= 14) return { level: "Moderate", color: "orange", description: "Moderate depression symptoms" }
    if (score <= 19)
      return { level: "Moderately Severe", color: "red", description: "Moderately severe depression symptoms" }
    return { level: "Severe", color: "red", description: "Severe depression symptoms" }
  }, [])

  const completeAssessment = useCallback(() => {
    if (!currentAssessment) return null

    setIsLoading(true)

    const score = calculateScore(currentAssessment.answers)
    const interpretation = getScoreInterpretation(score)

    const completedAssessment = {
      ...currentAssessment,
      completed: true,
      completedTime: new Date().toISOString(),
      score,
      interpretation,
    }

    setAssessments((prev) => [...prev, completedAssessment])
    setCurrentAssessment(null)
    setIsLoading(false)

    return completedAssessment
  }, [currentAssessment, calculateScore, getScoreInterpretation, setAssessments])

  const getLatestAssessment = useCallback(() => {
    return assessments.length > 0 ? assessments[assessments.length - 1] : null
  }, [assessments])

  return {
    PHQ9_QUESTIONS,
    ANSWER_OPTIONS,
    assessments,
    currentAssessment,
    isLoading,
    startAssessment,
    updateAnswer,
    completeAssessment,
    getLatestAssessment,
    calculateScore,
    getScoreInterpretation,
  }
}
