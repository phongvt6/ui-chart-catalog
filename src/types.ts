import type { ReactNode } from 'react'

export type Platform = 'web' | 'mobile'

export type CategoryId =
  | 'input'
  | 'selection'
  | 'action'
  | 'navigation'
  | 'feedback'
  | 'data'
  | 'layout'
  | 'overlay'
  | 'media'
  | 'mobile'

export interface Category {
  id: CategoryId
  nameVi: string
  nameEn: string
  /** Mô tả ngắn hiển thị ở đầu nhóm */
  blurb: string
}

/** Một trạng thái / biến thể của component (default, hover, disabled, error...) */
export interface StateVariant {
  name: string
  note: string
}

export interface CatalogEntry {
  id: string
  /** Tên gọi chuẩn (tiếng Anh) — dùng khi trao đổi với dev/designer */
  nameEn: string
  /** Tên gọi tiếng Việt — dùng khi trao đổi nội bộ */
  nameVi: string
  /** Các tên gọi khác hay gặp, giúp tìm kiếm ra đúng component */
  aliases?: string[]
  category: CategoryId
  platforms: Platform[]
  /** Diễn giải: nó LÀ cái gì */
  description: string
  /** Công dụng: dùng để LÀM gì, khi nào nên chọn nó */
  purpose: string
  states: StateVariant[]
  dos: string[]
  donts: string[]
  /** Tên tương đương trên nền tảng native */
  nativeNames?: { ios?: string; android?: string }
  /** Demo bản web (bắt buộc) */
  demo: () => ReactNode
  /** Demo bản mobile — nếu bỏ trống sẽ dùng lại demo web trong khung điện thoại */
  mobileDemo?: () => ReactNode
  /** Đoạn code minh hoạ để copy */
  code: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'input',
    nameVi: 'Nhập liệu',
    nameEn: 'Inputs',
    blurb: 'Người dùng gõ hoặc nhập dữ liệu tự do vào hệ thống.',
  },
  {
    id: 'selection',
    nameVi: 'Chọn lựa',
    nameEn: 'Selection',
    blurb: 'Người dùng chọn từ một tập giá trị có sẵn.',
  },
  {
    id: 'action',
    nameVi: 'Hành động',
    nameEn: 'Actions',
    blurb: 'Kích hoạt một thao tác: lưu, gửi, xoá, chuyển trang.',
  },
  {
    id: 'navigation',
    nameVi: 'Điều hướng',
    nameEn: 'Navigation',
    blurb: 'Giúp người dùng biết mình đang ở đâu và đi tiếp thế nào.',
  },
  {
    id: 'feedback',
    nameVi: 'Phản hồi',
    nameEn: 'Feedback',
    blurb: 'Báo cho người dùng biết chuyện gì vừa/đang xảy ra.',
  },
  {
    id: 'data',
    nameVi: 'Hiển thị dữ liệu',
    nameEn: 'Data display',
    blurb: 'Trình bày thông tin đã có cho người dùng đọc.',
  },
  {
    id: 'layout',
    nameVi: 'Bố cục',
    nameEn: 'Layout',
    blurb: 'Khung chứa, phân nhóm và tạo nhịp cho nội dung.',
  },
  {
    id: 'overlay',
    nameVi: 'Lớp phủ',
    nameEn: 'Overlay',
    blurb: 'Nổi lên trên nội dung chính, thường cần người dùng xử lý rồi đóng.',
  },
  {
    id: 'media',
    nameVi: 'Media & tệp',
    nameEn: 'Media & files',
    blurb: 'Hình ảnh, tệp đính kèm, avatar, biểu tượng.',
  },
  {
    id: 'mobile',
    nameVi: 'Đặc thù mobile',
    nameEn: 'Mobile-specific',
    blurb: 'Pattern chỉ có (hoặc chỉ hợp lý) trên điện thoại.',
  },
]

export const PLATFORM_LABEL: Record<Platform, string> = {
  web: 'Web',
  mobile: 'Mobile',
}
