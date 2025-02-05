"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/contexts/language-context"
import { useProcessType } from "@/contexts/process-type-context"
import { dictionary } from "@/lib/dictionary"
import { PhoneInput } from "@/components/phone-input"
import { getDemoUserData } from "@/lib/demo-data"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import type React from "react" // Added import for React

export default function UserInfoForm() {
  const { lang } = useLanguage()
  const { setProcessType } = useProcessType()
  const t = dictionary[lang]
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [carNumber, setCarNumber] = useState("")
  const [name, setName] = useState("")
  const [healthCondition, setHealthCondition] = useState("")
  const [alcoholCheck, setAlcoholCheck] = useState(false)
  const [error, setError] = useState("")
  const [isNewUser, setIsNewUser] = useState(false)

  useEffect(() => {
    setProcessType(type as "entry" | "exit" | null)
  }, [type, setProcessType])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (type === "exit") {
      console.log("退場処理")
      router.push("/")
    } else {
      router.push("/cargo-info")
    }
  }

  const handlePhoneSubmit = (phone: string) => {
    setPhoneNumber(phone)
    const userData = getDemoUserData(phone)
    if (userData) {
      setCompanyName(userData.companyName)
      setCarNumber(userData.carNumber)
      setName(userData.name)
      setIsNewUser(false)
      setError("")
    } else {
      setCompanyName("")
      setCarNumber("")
      setName("")
      setIsNewUser(true)
      setError("")
    }
  }

  useEffect(() => {
    if (type === "exit" && phoneNumber) {
      const userData = getDemoUserData(phoneNumber)
      if (!userData) {
        setError(t.phoneNotRegistered)
      }
    }
  }, [phoneNumber, type, t.phoneNotRegistered])

  if (!phoneNumber) {
    return (
      <div className="h-[calc(100vh-112px)] flex flex-col justify-center items-center">
        <PhoneInput onSubmit={handlePhoneSubmit} />
        {error && (
          <Alert variant="destructive" className="mt-4 w-full max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>エラー</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-112px)] justify-center items-center p-4 overflow-auto">
      <div className="w-full max-w-4xl">
        <h2 className="!text-4xl font-bold mb-8 text-center">{isNewUser ? t.newUserInfo : t.userInfo}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Label htmlFor="phone" className="text-2xl mb-2 block">
                {t.phoneNumber}
              </Label>
              <Input
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                readOnly={type === "exit"}
                className="!text-4xl p-4 h-20"
              />
            </div>
            <div>
              <Label htmlFor="company" className="text-2xl mb-2 block">
                {t.companyName}
              </Label>
              <Input
                id="company"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                readOnly={type === "exit"}
                className="!text-4xl p-4 h-20"
              />
            </div>
            <div>
              <Label htmlFor="car" className="text-2xl mb-2 block">
                {t.carNumber}
              </Label>
              <Input
                id="car"
                value={carNumber}
                onChange={(e) => setCarNumber(e.target.value)}
                required
                readOnly={type === "exit"}
                className="!text-4xl p-4 h-20"
              />
            </div>
            <div>
              <Label htmlFor="name" className="text-2xl mb-2 block">
                {t.name}
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                readOnly={type === "exit"}
                className="text-4xl p-4 h-20"
              />
            </div>
          </div>
          {type === "entry" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <Label className="text-2xl mb-2 block">{t.healthCondition}</Label>
                <RadioGroup className="flex space-x-8" onValueChange={setHealthCondition}>
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="good" id="health-good" className="h-8 w-8" />
                    <Label htmlFor="health-good" className="text-2xl">
                      {t.good}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="bad" id="health-bad" className="h-8 w-8" />
                    <Label htmlFor="health-bad" className="text-2xl">
                      {t.bad}
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label className="text-2xl mb-2 block">{t.alcoholCheck}</Label>
                <div className="flex items-center space-x-4">
                  <Checkbox id="alcohol" checked={alcoholCheck} onCheckedChange={setAlcoholCheck} className="h-8 w-8" />
                  <Label htmlFor="alcohol" className="text-2xl">
                    {t.alcoholCheckConfirmation}
                  </Label>
                </div>
              </div>
            </div>
          )}
          <Button type="submit" className="w-full h-16 text-2xl mt-8">
            {type === "exit" ? t.exit : t.complete}
          </Button>
        </form>
      </div>
    </div>
  )
}

