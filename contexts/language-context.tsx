"use client"

import { createContext, useContext, useState, useEffect } from "react"
import type { Language } from "@/lib/dictionary"

type LanguageContextType = {
  lang: Language
  setLang: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("ja")

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as Language
    if (storedLang) {
      setLang(storedLang)
    }
  }, [])

  const handleSetLang = (newLang: Language) => {
    setLang(newLang)
    localStorage.setItem("lang", newLang)
  }

  return <LanguageContext.Provider value={{ lang, setLang: handleSetLang }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

