import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { LanguageProvider } from "@/contexts/language-context"
import { Header } from "@/components/header"
import type React from "react"
import { ProcessTypeProvider } from "@/contexts/process-type-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "電子受付簿",
  description: "Electronic reception register",
  manifest: "/manifest.json",
  themeColor: "#1a4971",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "電子受付簿",
  },
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ccard3dev-Dynamic-Yosemite-Icon-Composer.512-WoxnoUKrgZ3KjzojDc7Wym5cZshDxa.png",
    apple:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ccard3dev-Dynamic-Yosemite-Icon-Composer.512-WoxnoUKrgZ3KjzojDc7Wym5cZshDxa.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="apple-touch-icon"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ccard3dev-Dynamic-Yosemite-Icon-Composer.512-WoxnoUKrgZ3KjzojDc7Wym5cZshDxa.png"
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <ProcessTypeProvider>
            <div className="min-h-screen bg-white flex flex-col">
              <Header />
              <main className="flex-grow flex flex-col overflow-auto">{children}</main>
            </div>
          </ProcessTypeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

