import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // 既存の言語設定を取得
  const lang = request.cookies.get("lang")

  // 言語設定がない場合はデフォルトで日本語を設定
  if (!lang) {
    response.cookies.set("lang", "ja")
  }

  return response
}

export const config = {
  matcher: "/:path*",
}

