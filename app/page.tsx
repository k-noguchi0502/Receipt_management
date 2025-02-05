"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { useProcessType } from "@/contexts/process-type-context"
import { dictionary } from "@/lib/dictionary"

export default function Home() {
  const { lang } = useLanguage()
  const { resetProcessType } = useProcessType()
  const t = dictionary[lang]

  useEffect(() => {
    resetProcessType()
  }, [resetProcessType])

  return (
    <div className="flex flex-col h-[calc(100vh-112px)]">
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-6xl font-bold text-center px-4">{t.title}</h1>
      </div>
      <div className="flex-1 grid grid-cols-2 p-4 gap-4">
        <Link href="/user-info?type=entry" className="w-full h-full">
          <Button className="w-full h-full text-5xl font-bold bg-[#1a4971] hover:bg-[#1a4971]/90 rounded-lg">
            {t.entry}
          </Button>
        </Link>
        <Link href="/user-info?type=exit" className="w-full h-full">
          <Button className="w-full h-full text-5xl font-bold bg-[#963447] hover:bg-[#963447]/90 rounded-lg">
            {t.exit}
          </Button>
        </Link>
      </div>
    </div>
  )
}

