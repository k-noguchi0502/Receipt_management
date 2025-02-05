interface UserData {
  companyName: string
  carNumber: string
  name: string
}

const demoData: Record<string, UserData> = {
  "09012345678": {
    companyName: "デモ株式会社",
    carNumber: "品川 500 あ 1234",
    name: "山田太郎",
  },
  "08098765432": {
    companyName: "テスト運輸",
    carNumber: "横浜 300 い 5678",
    name: "鈴木花子",
  },
}

export function getDemoUserData(phoneNumber: string): UserData | null {
  return demoData[phoneNumber] || null
}

