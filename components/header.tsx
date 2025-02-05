"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { dictionary } from "@/lib/dictionary"
import { useLanguage } from "@/contexts/language-context"
import { useProcessType } from "@/contexts/process-type-context"

export function Header() {
  const pathname = usePathname()
  const { lang, setLang } = useLanguage()
  const { bgColor } = useProcessType()
  const t = dictionary[lang]
  const isHomePage = pathname === "/"

  // 現在の日付をYYYY/MM/DD形式で取得
  const today = new Date()
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "/")

  return (
    <header className={`flex justify-between items-center p-4 border-b h-28 ${bgColor}`}>
      <div className="w-1/3 flex items-center gap-4">
        {isHomePage ? (
          <Button variant="outline" size="lg" asChild className="h-16 text-xl px-6">
            <Link href="/admin">{t.management}</Link>
          </Button>
        ) : (
          <>
            <Button variant="outline" size="lg" asChild className="h-16 text-xl px-6">
              <Link href="/">{t.home}</Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.history.back()} className="h-16 text-xl px-6">
              {t.back}
            </Button>
          </>
        )}
      </div>
      <div className="w-1/3 flex justify-center space-x-4">
        <Button
          variant={lang === "ja" ? "default" : "outline"}
          size="lg"
          onClick={() => setLang("ja")}
          className="h-16 text-xl px-6"
        >
          日本語
        </Button>
        <Button
          variant={lang === "en" ? "default" : "outline"}
          size="lg"
          onClick={() => setLang("en")}
          className="h-16 text-xl px-6"
        >
          English
        </Button>
      </div>
      <div className="w-1/3 flex justify-end items-center">
        <span className="text-xl">{today}</span>
      </div>
    </header>
  )
}

