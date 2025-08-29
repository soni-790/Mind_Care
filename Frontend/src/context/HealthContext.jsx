"use client"

import { createContext, useContext, useReducer, useEffect } from "react"

const HealthContext = createContext()

const initialState = {
  assessments: [],
  currentAssessment: null,
  resources: [],
  appointments: [],
  loading: false,
  error: null,
}

function healthReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "ADD_ASSESSMENT":
      return {
        ...state,
        assessments: [...state.assessments, action.payload],
        currentAssessment: action.payload,
        loading: false,
      }
    case "SET_CURRENT_ASSESSMENT":
      return { ...state, currentAssessment: action.payload }
    case "CLEAR_ERROR":
      return { ...state, error: null }
    default:
      return state
  }
}

export function HealthProvider({ children }) {
  const [state, dispatch] = useReducer(healthReducer, initialState)

  useEffect(() => {
    
    const savedAssessments = localStorage.getItem("mindcare_assessments")
    if (savedAssessments) {
      try {
        const assessments = JSON.parse(savedAssessments)
        assessments.forEach((assessment) => {
          dispatch({ type: "ADD_ASSESSMENT", payload: assessment })
        })
      } catch (error) {
        console.error("Error loading assessments:", error)
      }
    }
  }, [])

  const addAssessment = (assessment) => {
    const newAssessment = {
      ...assessment,
      id: Date.now(),
      date: new Date().toISOString(),
    }

    dispatch({ type: "ADD_ASSESSMENT", payload: newAssessment })

  
    const updatedAssessments = [...state.assessments, newAssessment]
    localStorage.setItem("mindcare_assessments", JSON.stringify(updatedAssessments))
  }

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" })
  }

  return (
    <HealthContext.Provider
      value={{
        ...state,
        addAssessment,
        clearError,
      }}
    >
      {children}
    </HealthContext.Provider>
  )
}

export function useHealth() {
  const context = useContext(HealthContext)
  if (!context) {
    throw new Error("useHealth must be used within a HealthProvider")
  }
  return context
}
