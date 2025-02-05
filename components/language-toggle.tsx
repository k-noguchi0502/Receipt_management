"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import type { Language } from "@/lib/dictionary"

export function LanguageToggle({
  current,
}: {
  current: Language
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const toggleLanguage = () => {
    const newLang = current === "ja" ? "en" : "ja"
    startTransition(() => {
      document.cookie = `lang=${newLang};path=/`
      router.refresh()
    })
  }

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage} disabled={isPending}>
      {current === "ja" ? "English" : "日本語"}
    </Button>
  )
}

