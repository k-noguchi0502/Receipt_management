"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useLanguage } from "@/contexts/language-context"
import { dictionary } from "@/lib/dictionary"

export default function CargoInfo() {
  const { lang } = useLanguage()
  const t = dictionary[lang]
  const router = useRouter()
  const [cargo, setCargo] = useState("")
  const [handling, setHandling] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/rules")
  }

  return (
    <div className="flex flex-col h-[calc(100vh-112px)] justify-center items-center p-4 overflow-auto">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">{t.cargoInfo}</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-8">
            <div>
              <Label className="text-2xl font-semibold mb-4 block">{t.cargo}</Label>
              <RadioGroup className="grid grid-cols-2 md:grid-cols-3 gap-4" onValueChange={setCargo}>
                {Object.entries(t.cargoTypes).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <RadioGroupItem value={key} id={`cargo-${key}`} className="h-6 w-6" />
                    <Label htmlFor={`cargo-${key}`} className="text-xl">
                      {value}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div>
              <Label className="text-2xl font-semibold mb-4 block">{t.handling}</Label>
              <RadioGroup className="grid grid-cols-2 gap-4" onValueChange={setHandling}>
                {Object.entries(t.handlingTypes).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <RadioGroupItem value={key} id={`handling-${key}`} className="h-6 w-6" />
                    <Label htmlFor={`handling-${key}`} className="text-xl">
                      {value}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          <Button type="submit" className="w-full h-16 text-2xl mt-8">
            {t.complete}
          </Button>
        </form>
      </div>
    </div>
  )
}

