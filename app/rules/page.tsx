"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/language-context"
import { dictionary } from "@/lib/dictionary"

export default function Rules() {
  const { lang } = useLanguage()
  const t = dictionary[lang]
  const router = useRouter()
  const [agreed, setAgreed] = useState(false)

  const handleConfirm = () => {
    if (agreed) {
      router.push("/")
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-112px)] justify-center items-center p-4 overflow-auto">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">{t.rules}</h1>
        <ul className="list-disc list-inside space-y-4 mb-8 text-xl">
          {t.rulesList.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
        <div className="flex items-center space-x-4 mb-8">
          <Checkbox
            id="agreement"
            className="h-8 w-8"
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked as boolean)}
          />
          <Label htmlFor="agreement" className="text-xl">
            {t.agreement}
          </Label>
        </div>
        <Button onClick={handleConfirm} className="w-full h-16 text-2xl" disabled={!agreed}>
          {t.confirm}
        </Button>
      </div>
    </div>
  )
}

