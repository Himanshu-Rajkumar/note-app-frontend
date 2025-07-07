"use client"

import { createContext, useContext, useReducer, useEffect } from "react"

const AppContext = createContext()

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  notes: [],
  loading: false,
  error: null,
  budgetSummary: {
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    currency: "₹",
  },
}

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "SET_USER":
      return { ...state, user: action.payload, loading: false }
    case "SET_TOKEN":
      return { ...state, token: action.payload }
    case "SET_NOTES":
      return { ...state, notes: action.payload, loading: false }
    case "ADD_NOTE":
      return { ...state, notes: [action.payload, ...state.notes] }
    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) => (note._id === action.payload._id ? action.payload : note)),
      }
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload),
      }
    case "SET_BUDGET_SUMMARY":
      return { ...state, budgetSummary: action.payload }
    case "LOGOUT":
      return { ...initialState, token: null }
    default:
      return state
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    if (state.token) {
      localStorage.setItem("token", state.token)
    } else {
      localStorage.removeItem("token")
    }
  }, [state.token])

  const value = {
    ...state,
    dispatch,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider")
  }
  return context
}
