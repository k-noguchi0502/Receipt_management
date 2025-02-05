"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type ProcessType = "entry" | "exit" | null

type ProcessTypeContextType = {
  processType: ProcessType
  setProcessType: (type: ProcessType) => void
  resetProcessType: () => void
  bgColor: string
}

const ProcessTypeContext = createContext<ProcessTypeContextType | undefined>(undefined)

export function ProcessTypeProvider({ children }: { children: ReactNode }) {
  const [processType, setProcessType] = useState<ProcessType>(null)
  const [bgColor, setBgColor] = useState<string>("bg-white")

  const updateProcessType = (type: ProcessType) => {
    setProcessType(type)
    if (type === "entry") {
      setBgColor("bg-blue-100")
    } else if (type === "exit") {
      setBgColor("bg-red-100")
    } else {
      setBgColor("bg-white")
    }
  }

  const resetProcessType = () => {
    setProcessType(null)
    setBgColor("bg-white")
  }

  return (
    <ProcessTypeContext.Provider
      value={{
        processType,
        setProcessType: updateProcessType,
        resetProcessType,
        bgColor,
      }}
    >
      {children}
    </ProcessTypeContext.Provider>
  )
}

export function useProcessType() {
  const context = useContext(ProcessTypeContext)
  if (context === undefined) {
    throw new Error("useProcessType must be used within a ProcessTypeProvider")
  }
  return context
}

