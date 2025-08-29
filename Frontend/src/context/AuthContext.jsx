"use client"

import { createContext, useContext, useReducer, useEffect } from "react"

const AuthContext = createContext()

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
}

function authReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      }
    case "CLEAR_ERROR":
      return { ...state, error: null }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem("mindcare_user")
        const savedSession = localStorage.getItem("mindcare_session")

        if (savedUser && savedSession) {
          const user = JSON.parse(savedUser)
          const session = JSON.parse(savedSession)

         
          const now = new Date().getTime()
          if (now - session.timestamp < 24 * 60 * 60 * 1000) {
            dispatch({ type: "LOGIN_SUCCESS", payload: user })
          } else {
            
            localStorage.removeItem("mindcare_user")
            localStorage.removeItem("mindcare_session")
            dispatch({ type: "SET_LOADING", payload: false })
          }
        } else {
          dispatch({ type: "SET_LOADING", payload: false })
        }
      } catch (error) {
        console.error("Auth check error:", error)
        dispatch({ type: "SET_LOADING", payload: false })
      }
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    dispatch({ type: "SET_LOADING", payload: true })
    dispatch({ type: "CLEAR_ERROR" })

    try {
     
      await new Promise((resolve) => setTimeout(resolve, 1000))

      
      if (email && password.length >= 6) {
        const user = {
          id: Date.now(),
          email: email,
          name: email.split("@")[0],
          avatar: email.charAt(0).toUpperCase(),
          joinDate: new Date().toISOString(),
        }

        const session = {
          timestamp: new Date().getTime(),
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        }

      
        localStorage.setItem("mindcare_user", JSON.stringify(user))
        localStorage.setItem("mindcare_session", JSON.stringify(session))

        dispatch({ type: "LOGIN_SUCCESS", payload: user })
        return { success: true }
      } else {
        throw new Error("Invalid email or password. Password must be at least 6 characters.")
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message })
      return { success: false, error: error.message }
    }
  }

  const register = async (name, email, password) => {
    dispatch({ type: "SET_LOADING", payload: true })
    dispatch({ type: "CLEAR_ERROR" })

    try {
     
      await new Promise((resolve) => setTimeout(resolve, 1000))

      
      if (name && email && password.length >= 6) {
        const user = {
          id: Date.now(),
          email: email,
          name: name,
          avatar: name.charAt(0).toUpperCase(),
          joinDate: new Date().toISOString(),
        }

        const session = {
          timestamp: new Date().getTime(),
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        }

    
        localStorage.setItem("mindcare_user", JSON.stringify(user))
        localStorage.setItem("mindcare_session", JSON.stringify(session))

        dispatch({ type: "LOGIN_SUCCESS", payload: user })
        return { success: true }
      } else {
        throw new Error("Please fill all fields. Password must be at least 6 characters.")
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message })
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    localStorage.removeItem("mindcare_user")
    localStorage.removeItem("mindcare_session")
    dispatch({ type: "LOGOUT" })
  }

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
