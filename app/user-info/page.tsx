import { Suspense } from "react"
import UserInfoForm from "./user-info-form"

export default function UserInfoPage() {
  return (
    <Suspense fallback={<div className="h-[calc(100vh-80px)] flex items-center justify-center">読み込み中...</div>}>
      <UserInfoForm />
    </Suspense>
  )
}

