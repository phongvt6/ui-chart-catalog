import type { ReactNode } from 'react'

/** Khung điện thoại mô phỏng để đặt demo mobile vào bên trong. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="phone">
      <div className="phone-screen">
        <div className="phone-notch" />
        <div className="phone-status">
          <span>9:41</span>
          <span>▮▮▮ ▲ 100%</span>
        </div>
        <div className="phone-content">{children}</div>
        <div className="phone-home" />
      </div>
    </div>
  )
}
