import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"
import { dictionary } from "@/lib/dictionary"

interface PhoneInputProps {
  onSubmit: (phone: string) => void
}

export function PhoneInput({ onSubmit }: PhoneInputProps) {
  const { lang } = useLanguage()
  const t = dictionary[lang]
  const [phone, setPhone] = useState(["", "", "", "", "", "", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPhone = [...phone]
      newPhone[index] = value
      setPhone(newPhone)

      if (value && index < 10) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !phone[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  useEffect(() => {
    if (phone.every((digit) => digit !== "")) {
      onSubmit(phone.join(""))
    }
  }, [phone, onSubmit])

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 gap-4">
      <h2 className="text-7xl font-bold mb-8">{t.enterPhoneNumber}</h2>
      <div className="flex items-center justify-center gap-2 mb-8 mt-4">
        {phone.slice(0, 3).map((digit, index) => (
          <Input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-16 h-20 text-center !text-4xl p-2 border-2 border-black"
            maxLength={1}
            inputMode="numeric"
          />
        ))}
        <span className="text-4xl mx-2">-</span>
        {phone.slice(3, 7).map((digit, index) => (
          <Input
            key={index + 3}
            ref={(el) => (inputRefs.current[index + 3] = el)}
            value={digit}
            onChange={(e) => handleChange(index + 3, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index + 3, e)}
            className="w-16 h-20 text-center !text-4xl p-2 border-2 border-black"
            maxLength={1}
            inputMode="numeric"
          />
        ))}
        <span className="text-4xl mx-2">-</span>
        {phone.slice(7).map((digit, index) => (
          <Input
            key={index + 7}
            ref={(el) => (inputRefs.current[index + 7] = el)}
            value={digit}
            onChange={(e) => handleChange(index + 7, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index + 7, e)}
            className="w-16 h-20 text-center !text-4xl p-2 border-2 border-black"
            maxLength={1}
            inputMode="numeric"
          />
        ))}
      </div>
    </div>
  )
}

