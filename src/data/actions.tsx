/* eslint-disable react-refresh/only-export-components -- demo components được đặt cạnh dữ liệu catalog cho dễ đối chiếu */
import { useState } from 'react'
import type { CatalogEntry } from '../types'

/* -------------------------------------------------------------------------- */
/* Demos                                                                       */
/* -------------------------------------------------------------------------- */

function ButtonDemo() {
  const [loading, setLoading] = useState(false)
  return (
    <div className="d-stack" style={{ alignItems: 'center' }}>
      <div className="d-row" style={{ justifyContent: 'center' }}>
        <button type="button" className="d-btn">
          Lưu báo cáo
        </button>
        <button type="button" className="d-btn is-secondary">
          Huỷ
        </button>
        <button type="button" className="d-btn is-ghost">
          Xem sau
        </button>
        <button type="button" className="d-btn is-danger">
          Xoá
        </button>
      </div>
      <div className="d-row" style={{ justifyContent: 'center' }}>
        <button type="button" className="d-btn" disabled>
          Không khả dụng
        </button>
        <button
          type="button"
          className="d-btn"
          disabled={loading}
          onClick={() => {
            setLoading(true)
            window.setTimeout(() => setLoading(false), 1400)
          }}
        >
          {loading && <span className="d-spinner" style={{ width: 14, height: 14 }} />}
          {loading ? 'Đang gửi…' : 'Bấm để xem trạng thái tải'}
        </button>
      </div>
    </div>
  )
}

function IconButtonDemo() {
  const [liked, setLiked] = useState(false)
  return (
    <div className="d-row" style={{ justifyContent: 'center' }}>
      {[
        { icon: '✎', label: 'Sửa' },
        { icon: '⧉', label: 'Nhân bản' },
        { icon: '⤓', label: 'Tải xuống' },
      ].map((b) => (
        <button key={b.label} type="button" className="icon-btn" title={b.label} aria-label={b.label}>
          {b.icon}
        </button>
      ))}
      <button
        type="button"
        className="icon-btn"
        aria-label={liked ? 'Bỏ thích' : 'Thích'}
        aria-pressed={liked}
        onClick={() => setLiked((v) => !v)}
        style={{ color: liked ? 'var(--danger)' : undefined }}
      >
        {liked ? '♥' : '♡'}
      </button>
      <button type="button" className="icon-btn" disabled aria-label="Xoá (không có quyền)">
        🗑
      </button>
    </div>
  )
}

function LinkDemo() {
  return (
    <div className="d-stack d-panel">
      <p className="d-muted" style={{ margin: 0 }}>
        Xem chi tiết tại{' '}
        <a href="#demo" style={{ color: 'var(--accent)' }}>
          báo cáo doanh thu tháng 7
        </a>
        , hoặc{' '}
        <a href="#demo" style={{ color: 'var(--accent)' }}>
          tải bản PDF ↗
        </a>
        .
      </p>
      <p className="d-hint" style={{ margin: 0 }}>
        Link đi tới một nơi khác. Nút thực hiện một hành động. Đừng dùng lẫn lộn.
      </p>
    </div>
  )
}

function FabDemo() {
  return (
    <div
      className="d-stagebox"
      style={{ background: 'var(--surface-2)' }}
    >
      <div className="d-stagebox-inner d-stack">
        {['Đề xuất mua văn phòng phẩm', 'Đề xuất sửa máy lạnh', 'Đề xuất in ấn'].map((t) => (
          <div className="d-card" key={t} style={{ padding: 10 }}>
            {t}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="d-btn"
        aria-label="Tạo đề xuất mới"
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
          width: 52,
          height: 52,
          borderRadius: '50%',
          justifyContent: 'center',
          fontSize: 24,
          padding: 0,
          boxShadow: 'var(--shadow-md)',
        }}
      >
        +
      </button>
    </div>
  )
}

function TabsDemo() {
  const tabs = [
    { id: 'info', label: 'Thông tin', body: 'Mã chi nhánh CN-07 · Khai trương 2019 · 24 nhân sự.' },
    { id: 'rev', label: 'Doanh thu', body: 'Tháng 7: 4,82 tỷ đồng — tăng 6,3% so với tháng 6.' },
    { id: 'log', label: 'Nhật ký', body: '22/07 09:12 — Nguyễn Văn A cập nhật số liệu ngày 21/07.' },
  ]
  const [active, setActive] = useState('info')
  return (
    <div className="d-panel d-card" style={{ padding: 0, overflow: 'hidden' }}>
      <div role="tablist" style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            style={{
              flex: 1,
              padding: '10px 8px',
              border: 0,
              borderBottom: `2px solid ${active === t.id ? 'var(--accent)' : 'transparent'}`,
              background: 'none',
              color: active === t.id ? 'var(--accent)' : 'var(--fg-muted)',
              font: 'inherit',
              fontWeight: active === t.id ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" style={{ padding: 16 }} className="d-muted">
        {tabs.find((t) => t.id === active)?.body}
      </div>
    </div>
  )
}

function BreadcrumbDemo() {
  const trail = ['Trang chủ', 'Chi nhánh', 'CN-07 Quận 1']
  return (
    <nav aria-label="Đường dẫn" className="d-row" style={{ gap: 6 }}>
      {trail.map((t, i) => (
        <span key={t} className="d-row" style={{ gap: 6 }}>
          {i < trail.length - 1 ? (
            <a href="#demo" style={{ color: 'var(--accent)' }}>
              {t}
            </a>
          ) : (
            <span aria-current="page" style={{ fontWeight: 600 }}>
              {t}
            </span>
          )}
          {i < trail.length - 1 && <span style={{ color: 'var(--fg-subtle)' }}>/</span>}
        </span>
      ))}
    </nav>
  )
}

function PaginationDemo() {
  const [page, setPage] = useState(3)
  const total = 12
  const pages = [1, 2, 3, 4, 5].map((p) => p + Math.max(0, Math.min(page - 3, total - 5)))
  return (
    <div className="d-stack" style={{ alignItems: 'center' }}>
      <div className="d-row" style={{ gap: 4 }}>
        <button
          type="button"
          className="d-btn is-secondary is-sm"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          ‹ Trước
        </button>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            className={`d-btn is-sm${p === page ? '' : ' is-secondary'}`}
            aria-current={p === page ? 'page' : undefined}
            onClick={() => setPage(p)}
            style={{ minWidth: 34, justifyContent: 'center' }}
          >
            {p}
          </button>
        ))}
        <span className="d-muted">…</span>
        <button
          type="button"
          className="d-btn is-secondary is-sm"
          disabled={page === total}
          onClick={() => setPage((p) => p + 1)}
        >
          Sau ›
        </button>
      </div>
      <p className="d-muted">
        Trang {page}/{total} — hiển thị 20 trong 237 bản ghi
      </p>
    </div>
  )
}

function StepperDemo() {
  const steps = ['Nhập đề xuất', 'Trưởng bộ phận duyệt', 'Kế toán duyệt', 'Hoàn tất']
  const [current, setCurrent] = useState(1)
  return (
    <div className="d-stack d-panel" style={{ maxWidth: 520 }}>
      <div className="d-row" style={{ gap: 0, flexWrap: 'nowrap', alignItems: 'flex-start' }}>
        {steps.map((s, i) => (
          <div key={s} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
            {i > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: 13,
                  right: '50%',
                  width: '100%',
                  height: 2,
                  background: i <= current ? 'var(--accent)' : 'var(--border)',
                }}
              />
            )}
            <span
              style={{
                position: 'relative',
                display: 'grid',
                placeItems: 'center',
                width: 27,
                height: 27,
                margin: '0 auto 6px',
                borderRadius: '50%',
                border: `2px solid ${i <= current ? 'var(--accent)' : 'var(--border-strong)'}`,
                background: i < current ? 'var(--accent)' : 'var(--surface)',
                color: i < current ? 'var(--accent-fg)' : i === current ? 'var(--accent)' : 'var(--fg-subtle)',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {i < current ? '✓' : i + 1}
            </span>
            <span
              style={{
                fontSize: 11.5,
                color: i === current ? 'var(--fg)' : 'var(--fg-subtle)',
                fontWeight: i === current ? 600 : 400,
              }}
            >
              {s}
            </span>
          </div>
        ))}
      </div>
      <div className="d-row" style={{ justifyContent: 'center' }}>
        <button
          type="button"
          className="d-btn is-secondary is-sm"
          disabled={current === 0}
          onClick={() => setCurrent((c) => c - 1)}
        >
          Quay lại
        </button>
        <button
          type="button"
          className="d-btn is-sm"
          disabled={current === steps.length - 1}
          onClick={() => setCurrent((c) => c + 1)}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  )
}

function NavbarDemo() {
  return (
    <div className="d-panel d-card" style={{ padding: 0, maxWidth: 520, overflow: 'hidden' }}>
      <header
        className="d-row"
        style={{
          gap: 14,
          padding: '10px 14px',
          borderBottom: '1px solid var(--border)',
          flexWrap: 'nowrap',
        }}
      >
        <strong style={{ whiteSpace: 'nowrap' }}>◆ Acme</strong>
        <nav className="d-row" style={{ gap: 12, flex: 1 }}>
          {['Tổng quan', 'Báo cáo', 'Đối tác'].map((n, i) => (
            <a
              key={n}
              href="#demo"
              style={{
                color: i === 0 ? 'var(--accent)' : 'var(--fg-muted)',
                fontWeight: i === 0 ? 600 : 400,
                fontSize: 13,
              }}
            >
              {n}
            </a>
          ))}
        </nav>
        <span className="d-avatar" style={{ width: 28, height: 28, fontSize: 11 }}>
          PV
        </span>
      </header>
      <div style={{ padding: 18 }} className="d-muted">
        Nội dung trang…
      </div>
    </div>
  )
}

function SidebarNavDemo() {
  const items = [
    { label: 'Tổng quan', icon: '▦' },
    { label: 'Báo cáo ngày', icon: '▤' },
    { label: 'Đối tác', icon: '◍' },
    { label: 'Cài đặt', icon: '⚙' },
  ]
  const [active, setActive] = useState('Tổng quan')
  return (
    <div
      className="d-card d-panel"
      style={{ display: 'flex', padding: 0, overflow: 'hidden', height: 200 }}
    >
      <nav style={{ width: 160, borderRight: '1px solid var(--border)', padding: 8 }}>
        {items.map((i) => (
          <button
            key={i.label}
            type="button"
            className="side-item"
            aria-current={active === i.label}
            onClick={() => setActive(i.label)}
          >
            <span aria-hidden>{i.icon}</span>
            <span className="side-item-en">{i.label}</span>
          </button>
        ))}
      </nav>
      <div style={{ flex: 1, padding: 16 }} className="d-muted">
        {active}
      </div>
    </div>
  )
}

function BottomNavDemo() {
  const items = [
    { label: 'Trang chủ', icon: '⌂' },
    { label: 'Báo cáo', icon: '▤' },
    { label: 'Thông báo', icon: '◔', badge: 3 },
    { label: 'Tôi', icon: '◯' },
  ]
  const [active, setActive] = useState('Trang chủ')
  return (
    <div className="d-stack" style={{ height: '100%' }}>
      <div className="d-stack" style={{ flex: 1 }}>
        <h3 style={{ margin: 0, fontSize: 18 }}>{active}</h3>
        <p className="d-muted">Nội dung của tab đang chọn.</p>
      </div>
      <nav
        className="d-row"
        style={{
          gap: 0,
          margin: '0 -12px -12px',
          padding: '6px 0',
          borderTop: '1px solid var(--border)',
          background: 'var(--surface)',
        }}
      >
        {items.map((i) => (
          <button
            key={i.label}
            type="button"
            onClick={() => setActive(i.label)}
            style={{
              flex: 1,
              border: 0,
              background: 'none',
              color: active === i.label ? 'var(--accent)' : 'var(--fg-subtle)',
              cursor: 'pointer',
              font: 'inherit',
              fontSize: 10,
              padding: 4,
            }}
          >
            <span style={{ display: 'block', fontSize: 18, position: 'relative' }}>
              {i.icon}
              {i.badge && (
                <span
                  style={{
                    position: 'absolute',
                    top: -2,
                    marginLeft: -4,
                    padding: '0 4px',
                    borderRadius: 999,
                    background: 'var(--danger)',
                    color: '#fff',
                    fontSize: 9,
                    fontWeight: 700,
                  }}
                >
                  {i.badge}
                </span>
              )}
            </span>
            {i.label}
          </button>
        ))}
      </nav>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Entries                                                                     */
/* -------------------------------------------------------------------------- */

export const actionEntries: CatalogEntry[] = [
  {
    id: 'button',
    nameEn: 'Button',
    nameVi: 'Nút bấm',
    aliases: ['nút', 'cta', 'nút hành động'],
    category: 'action',
    platforms: ['web', 'mobile'],
    description:
      'Phần tử bấm để thực hiện một hành động. Thứ bậc thể hiện qua kiểu dáng: Primary (chính, nền đặc) → Secondary (phụ, viền) → Ghost/Text (nhẹ nhất) → Danger (phá huỷ).',
    purpose:
      'Dùng cho mọi hành động làm thay đổi dữ liệu hoặc trạng thái: lưu, gửi, duyệt, xoá. Mỗi màn hình chỉ nên có duy nhất một nút Primary.',
    states: [
      { name: 'Default', note: 'Trạng thái nghỉ.' },
      { name: 'Hover / Pressed', note: 'Sáng hoặc tối hơn để phản hồi thao tác.' },
      { name: 'Focus', note: 'Có vòng focus rõ khi đi bằng phím Tab.' },
      { name: 'Loading', note: 'Spinner + khoá nút, chống bấm hai lần.' },
      { name: 'Disabled', note: 'Chưa đủ điều kiện bấm.' },
    ],
    dos: [
      'Đặt nhãn là động từ cụ thể: “Lưu báo cáo”, không phải “OK”.',
      'Khoá nút trong lúc đang gửi để tránh tạo trùng bản ghi.',
      'Nút phá huỷ dùng màu đỏ và luôn có bước xác nhận.',
    ],
    donts: [
      'Không đặt hai nút Primary cạnh nhau — người dùng không biết chọn cái nào.',
      'Không disable nút mà không nói lý do.',
      'Không dùng nút để điều hướng thuần tuý (dùng Link).',
    ],
    nativeNames: { ios: 'UIButton', android: 'MaterialButton' },
    demo: () => <ButtonDemo />,
    code: `<button className="btn">Lưu báo cáo</button>
<button className="btn is-secondary">Huỷ</button>
<button className="btn is-danger">Xoá</button>

{/* Trạng thái đang tải */}
<button className="btn" disabled={loading}>
  {loading && <Spinner />} {loading ? 'Đang gửi…' : 'Gửi duyệt'}
</button>`,
  },
  {
    id: 'icon-button',
    nameEn: 'Icon Button',
    nameVi: 'Nút biểu tượng',
    aliases: ['nút icon', 'icon only button'],
    category: 'action',
    platforms: ['web', 'mobile'],
    description:
      'Nút chỉ có biểu tượng, không chữ. Bắt buộc phải có aria-label và tooltip vì người dùng không đọc được ý nghĩa từ hình.',
    purpose:
      'Dùng ở nơi chật chỗ và hành động đã quá quen thuộc: sửa, xoá, đóng, tải xuống — thường nằm trong hàng của bảng hoặc thanh công cụ.',
    states: [
      { name: 'Default', note: 'Chỉ hiện biểu tượng.' },
      { name: 'Hover', note: 'Hiện tooltip giải thích + đổi nền.' },
      { name: 'Toggled', note: 'Với nút bật/tắt như ♥ — đổi màu và aria-pressed.' },
      { name: 'Disabled', note: 'Mờ, tooltip nên nói vì sao không dùng được.' },
    ],
    dos: [
      'Luôn có aria-label mô tả hành động.',
      'Vùng bấm tối thiểu 44×44px trên mobile.',
      'Dùng biểu tượng phổ biến, đừng sáng tạo ký hiệu riêng.',
    ],
    donts: [
      'Không dùng cho hành động quan trọng hoặc hiếm gặp — dùng nút có chữ.',
      'Không xếp quá nhiều icon giống nhau cạnh nhau.',
    ],
    demo: () => <IconButtonDemo />,
    code: `<button className="icon-btn" aria-label="Sửa" title="Sửa">✎</button>

{/* Nút bật/tắt */}
<button className="icon-btn" aria-pressed={liked}
  aria-label={liked ? 'Bỏ thích' : 'Thích'}
  onClick={() => setLiked((v) => !v)}>
  {liked ? '♥' : '♡'}
</button>`,
  },
  {
    id: 'link',
    nameEn: 'Link / Hyperlink',
    nameVi: 'Liên kết',
    aliases: ['anchor', 'text link', 'đường dẫn'],
    category: 'action',
    platforms: ['web', 'mobile'],
    description:
      'Đoạn chữ bấm được để đi tới một trang/vị trí khác. Phân biệt với Nút: Link ĐI ĐÂU ĐÓ, Nút LÀM GÌ ĐÓ.',
    purpose:
      'Dùng để điều hướng: mở trang chi tiết, tải tệp, mở tài liệu ngoài. Link mở tab mới cần có ký hiệu ↗ báo trước.',
    states: [
      { name: 'Default', note: 'Màu nhấn, thường có gạch chân khi nằm trong đoạn văn.' },
      { name: 'Hover', note: 'Đổi màu hoặc thêm gạch chân.' },
      { name: 'Visited', note: 'Đã xem — thường chỉ dùng cho web nội dung.' },
      { name: 'External', note: 'Mở ra ngoài — kèm biểu tượng ↗.' },
    ],
    dos: [
      'Nhãn nói rõ đích đến, không dùng “bấm vào đây”.',
      'Dùng thẻ <a href> thật để copy link và mở tab mới hoạt động.',
      'Báo trước nếu link mở tab mới hoặc tải tệp về.',
    ],
    donts: [
      'Không tạo link giả bằng <div onClick>.',
      'Không cho link trông giống hệt chữ thường xung quanh.',
    ],
    demo: () => <LinkDemo />,
    code: `<a href="/reports/2026-07">báo cáo doanh thu tháng 7</a>

{/* Link ra ngoài */}
<a href="https://…" target="_blank" rel="noopener noreferrer">
  Tải bản PDF <span aria-hidden>↗</span>
  <span className="sr-only">(mở tab mới)</span>
</a>`,
  },
  {
    id: 'fab',
    nameEn: 'Floating Action Button (FAB)',
    nameVi: 'Nút nổi hành động chính',
    aliases: ['fab', 'nút tròn nổi', 'nút thêm mới'],
    category: 'action',
    platforms: ['mobile', 'web'],
    description:
      'Nút tròn nổi lên trên nội dung, cố định ở góc dưới phải, đại diện cho hành động chính duy nhất của màn hình. Xuất phát từ Material Design của Android.',
    purpose:
      'Dùng khi màn hình có đúng một hành động nổi bật mà người dùng sẽ làm nhiều lần: tạo đề xuất mới, soạn tin, thêm bản ghi.',
    states: [
      { name: 'Default', note: 'Nổi với đổ bóng rõ.' },
      { name: 'Pressed', note: 'Bóng giảm, có hiệu ứng gợn.' },
      { name: 'Extended', note: 'Giãn ra kèm chữ khi ở đầu danh sách.' },
      { name: 'Hidden', note: 'Ẩn khi cuộn xuống để không che nội dung.' },
    ],
    dos: [
      'Mỗi màn hình chỉ một FAB.',
      'Chừa khoảng cách với thanh tab dưới, đừng chồng lên.',
      'Dùng biểu tượng rõ nghĩa (dấu +, cây bút).',
    ],
    donts: [
      'Không dùng FAB cho hành động phá huỷ hoặc ít dùng.',
      'Không để FAB che mất dòng cuối của danh sách.',
    ],
    nativeNames: { android: 'FloatingActionButton', ios: '(không chuẩn — dùng nút ở thanh trên)' },
    demo: () => <FabDemo />,
    code: `<button className="fab" aria-label="Tạo đề xuất mới">+</button>

.fab {
  position: fixed; right: 16px; bottom: 80px;
  width: 56px; height: 56px; border-radius: 50%;
  box-shadow: 0 4px 14px rgb(0 0 0 / 25%);
}`,
  },
  {
    id: 'navbar',
    nameEn: 'Navbar / App Bar / Header',
    nameVi: 'Thanh điều hướng trên cùng',
    aliases: ['header', 'top bar', 'app bar', 'thanh menu'],
    category: 'navigation',
    platforms: ['web', 'mobile'],
    description:
      'Dải cố định trên cùng chứa logo, các mục điều hướng chính, ô tìm kiếm và khu vực tài khoản. Trên mobile thu lại còn tiêu đề + nút quay lại + 1–2 hành động.',
    purpose:
      'Là mỏ neo định hướng của toàn ứng dụng: người dùng luôn biết mình đang ở đâu và về trang chủ bằng cách nào.',
    states: [
      { name: 'Default', note: 'Trong suốt hoặc trùng nền trang.' },
      { name: 'Scrolled', note: 'Thêm đổ bóng/viền khi trang cuộn xuống.' },
      { name: 'Active item', note: 'Mục của trang hiện tại được làm nổi.' },
      { name: 'Collapsed', note: 'Trên màn hình hẹp, gộp vào nút ☰.' },
    ],
    dos: [
      'Logo luôn bấm được để về trang chủ.',
      'Làm nổi rõ mục đang ở.',
      'Giữ tối đa 5–7 mục cấp một.',
    ],
    donts: [
      'Không nhồi mọi thứ vào thanh trên — phần còn lại đưa vào menu tài khoản.',
      'Không để thanh cố định chiếm quá nhiều chiều cao trên mobile.',
    ],
    nativeNames: { ios: 'UINavigationBar', android: 'TopAppBar / Toolbar' },
    demo: () => <NavbarDemo />,
    code: `<header className="navbar">
  <a href="/" className="logo">◆ Acme</a>
  <nav>
    <a href="/" aria-current="page">Tổng quan</a>
    <a href="/reports">Báo cáo</a>
  </nav>
  <Avatar name="Phong V." />
</header>`,
  },
  {
    id: 'sidebar-nav',
    nameEn: 'Sidebar / Side Navigation',
    nameVi: 'Thanh điều hướng bên',
    aliases: ['side nav', 'menu dọc', 'rail', 'thanh bên'],
    category: 'navigation',
    platforms: ['web'],
    description:
      'Cột dọc bên trái liệt kê các khu vực chính của ứng dụng, có thể lồng nhiều cấp và thu gọn thành dải icon.',
    purpose:
      'Dùng cho ứng dụng quản trị nhiều mục (trên 6–7) mà người dùng chuyển qua lại liên tục. Nhìn thấy toàn bộ cấu trúc là ưu điểm lớn nhất.',
    states: [
      { name: 'Expanded', note: 'Icon + chữ đầy đủ.' },
      { name: 'Collapsed', note: 'Chỉ còn icon, hiện tooltip khi rê chuột.' },
      { name: 'Active', note: 'Mục hiện tại có nền và chữ nổi bật.' },
      { name: 'Nested', note: 'Nhóm con mở ra dưới nhóm cha.' },
    ],
    dos: [
      'Nhớ trạng thái thu gọn giữa các lần truy cập.',
      'Nhóm các mục theo nghiệp vụ và đặt tiêu đề nhóm.',
      'Cho cuộn riêng phần danh sách, giữ header/footer cố định.',
    ],
    donts: [
      'Không lồng quá 2 cấp.',
      'Không dùng trên mobile — chuyển thành Drawer.',
    ],
    demo: () => <SidebarNavDemo />,
    code: `<nav className="sidebar">
  {items.map((i) => (
    <a key={i.href} href={i.href}
       aria-current={i.href === pathname ? 'page' : undefined}>
      <Icon name={i.icon} /> {i.label}
    </a>
  ))}
</nav>`,
  },
  {
    id: 'tabs',
    nameEn: 'Tabs',
    nameVi: 'Thẻ chuyển nội dung',
    aliases: ['tab bar', 'tab', 'thẻ'],
    category: 'navigation',
    platforms: ['web', 'mobile'],
    description:
      'Dãy nhãn ngang, mỗi nhãn ứng với một khối nội dung; chỉ một khối hiển thị tại một thời điểm. Nội dung các tab nên ngang cấp nhau.',
    purpose:
      'Dùng để chia nhỏ một trang dài về CÙNG một đối tượng: Thông tin / Doanh thu / Nhật ký của cùng một chi nhánh.',
    states: [
      { name: 'Active', note: 'Có gạch chân màu nhấn, chữ đậm.' },
      { name: 'Inactive', note: 'Chữ mờ, không viền.' },
      { name: 'With badge', note: 'Kèm số lượng cần chú ý (vd: 3 mục chờ duyệt).' },
      { name: 'Scrollable', note: 'Quá nhiều tab — cuộn ngang thay vì xuống dòng.' },
      { name: 'Disabled', note: 'Tab chưa dùng được với dữ liệu hiện tại.' },
    ],
    dos: [
      'Đưa tab đang chọn vào URL để chia sẻ và F5 không mất.',
      'Nhãn ngắn 1–2 từ.',
      'Dùng ← → để chuyển tab bằng bàn phím.',
    ],
    donts: [
      'Không dùng Tabs cho các bước tuần tự (dùng Stepper).',
      'Không lồng tab trong tab.',
      'Không để quá 6 tab trên desktop.',
    ],
    demo: () => <TabsDemo />,
    code: `<div role="tablist">
  {tabs.map((t) => (
    <button key={t.id} role="tab" aria-selected={active === t.id}
      aria-controls={\`panel-\${t.id}\`} onClick={() => setActive(t.id)}>
      {t.label}
    </button>
  ))}
</div>
<div role="tabpanel" id={\`panel-\${active}\`}>{body}</div>`,
  },
  {
    id: 'breadcrumb',
    nameEn: 'Breadcrumb',
    nameVi: 'Đường dẫn phân cấp',
    aliases: ['breadcrumbs', 'đường dẫn', 'vệt đường'],
    category: 'navigation',
    platforms: ['web'],
    description:
      'Chuỗi liên kết thể hiện vị trí hiện tại trong cây phân cấp, ngăn nhau bằng dấu / hoặc ›. Mục cuối là trang hiện tại và không bấm được.',
    purpose:
      'Dùng cho ứng dụng có cấu trúc lồng sâu, giúp người dùng biết mình đang ở tầng nào và nhảy ngược lên nhanh — nhất là khi vào thẳng từ một link.',
    states: [
      { name: 'Default', note: 'Các cấp cha là link, cấp hiện tại là chữ thường.' },
      { name: 'Truncated', note: 'Đường dẫn quá dài — rút gọn phần giữa thành “…”.' },
    ],
    dos: [
      'Đánh dấu mục cuối bằng aria-current="page".',
      'Phản ánh đúng cây phân cấp, không phải lịch sử duyệt.',
    ],
    donts: [
      'Không dùng cho web phẳng chỉ 1–2 cấp.',
      'Không thay thế nút Quay lại của trình duyệt.',
    ],
    demo: () => <BreadcrumbDemo />,
    code: `<nav aria-label="Đường dẫn">
  <a href="/">Trang chủ</a> /
  <a href="/branches">Chi nhánh</a> /
  <span aria-current="page">CN-07 Quận 1</span>
</nav>`,
  },
  {
    id: 'pagination',
    nameEn: 'Pagination',
    nameVi: 'Phân trang',
    aliases: ['paging', 'chuyển trang', 'phân trang'],
    category: 'navigation',
    platforms: ['web'],
    description:
      'Bộ nút số trang kèm Trước/Sau để đi qua một tập dữ liệu lớn được chia thành từng trang. Thường kèm dòng “hiển thị X trong Y bản ghi”.',
    purpose:
      'Dùng cho bảng dữ liệu nghiệp vụ khi người dùng cần quay lại đúng một trang, hoặc cần biết tổng số bản ghi. Với nội dung xem lướt (feed) thì cuộn vô hạn hợp hơn.',
    states: [
      { name: 'First page', note: 'Nút “Trước” bị vô hiệu.' },
      { name: 'Last page', note: 'Nút “Sau” bị vô hiệu.' },
      { name: 'Truncated', note: 'Nhiều trang — rút gọn bằng “…”.' },
      { name: 'Loading', note: 'Đang tải trang mới, giữ nguyên chiều cao bảng.' },
    ],
    dos: [
      'Luôn hiện tổng số bản ghi và trang hiện tại.',
      'Cho chọn số dòng mỗi trang (20/50/100).',
      'Đưa số trang vào URL.',
    ],
    donts: [
      'Không để bảng nhảy chiều cao khi đổi trang.',
      'Không dùng cuộn vô hạn cho dữ liệu cần đối chiếu.',
    ],
    demo: () => <PaginationDemo />,
    code: `<nav aria-label="Phân trang">
  <button disabled={page === 1} onClick={() => setPage(page - 1)}>‹ Trước</button>
  {pages.map((p) => (
    <button key={p} aria-current={p === page ? 'page' : undefined}
      onClick={() => setPage(p)}>{p}</button>
  ))}
  <button disabled={page === total} onClick={() => setPage(page + 1)}>Sau ›</button>
</nav>`,
  },
  {
    id: 'stepper-wizard',
    nameEn: 'Stepper / Wizard',
    nameVi: 'Thanh tiến trình theo bước',
    aliases: ['wizard', 'progress steps', 'quy trình', 'các bước'],
    category: 'navigation',
    platforms: ['web', 'mobile'],
    description:
      'Dãy các bước đánh số nối bằng đường kẻ, thể hiện quy trình tuần tự: bước đã xong (✓), bước hiện tại, bước chưa tới.',
    purpose:
      'Dùng cho biểu mẫu dài chia nhiều bước hoặc luồng phê duyệt nhiều cấp — cho người dùng thấy còn bao xa nữa mới xong.',
    states: [
      { name: 'Completed', note: 'Dấu ✓, thường bấm quay lại được.' },
      { name: 'Current', note: 'Được làm nổi, là bước đang thao tác.' },
      { name: 'Upcoming', note: 'Mờ, chưa bấm vào được.' },
      { name: 'Error', note: 'Bước đã qua nhưng dữ liệu không hợp lệ — đánh dấu đỏ.' },
    ],
    dos: [
      'Cho phép quay lại bước trước mà không mất dữ liệu đã nhập.',
      'Lưu nháp giữa các bước.',
      'Giữ số bước ở mức 3–5.',
    ],
    donts: [
      'Không dùng khi các phần không có thứ tự bắt buộc (dùng Tabs).',
      'Không cho nhảy tới bước sau khi bước hiện tại chưa hợp lệ.',
    ],
    demo: () => <StepperDemo />,
    code: `{steps.map((s, i) => (
  <div key={s} className={
    i < current ? 'step is-done' : i === current ? 'step is-current' : 'step'
  }>
    <span className="step-dot">{i < current ? '✓' : i + 1}</span>
    <span className="step-label">{s}</span>
  </div>
))}`,
  },
  {
    id: 'bottom-nav',
    nameEn: 'Bottom Navigation / Tab Bar',
    nameVi: 'Thanh điều hướng dưới',
    aliases: ['tab bar', 'bottom bar', 'thanh dưới'],
    category: 'navigation',
    platforms: ['mobile'],
    description:
      'Thanh cố định ở đáy màn hình với 3–5 mục icon + chữ, mỗi mục là một khu vực chính của app. Có thể gắn chấm/số thông báo.',
    purpose:
      'Là cách điều hướng cấp một chuẩn mực trên mobile — nằm trong tầm ngón cái và luôn nhìn thấy. Thay thế cho Sidebar của bản web.',
    states: [
      { name: 'Active', note: 'Icon đặc + màu nhấn.' },
      { name: 'Inactive', note: 'Icon nét + màu xám.' },
      { name: 'With badge', note: 'Chấm đỏ hoặc số đếm ở góc icon.' },
      { name: 'Re-tap', note: 'Bấm lại tab đang mở — cuộn lên đầu hoặc về gốc.' },
    ],
    dos: [
      'Giữ 3–5 mục, không hơn.',
      'Luôn có cả icon và chữ.',
      'Mỗi tab giữ riêng lịch sử điều hướng của nó.',
    ],
    donts: [
      'Không đặt hành động (như “Tạo mới”) vào thanh tab — đó là việc của FAB.',
      'Không ẩn thanh tab khi cuộn ở các màn hình chính.',
    ],
    nativeNames: { ios: 'UITabBar', android: 'BottomNavigationView / NavigationBar' },
    demo: () => <BottomNavDemo />,
    code: `<nav className="bottom-nav">
  {tabs.map((t) => (
    <button key={t.id} aria-current={active === t.id ? 'page' : undefined}
      onClick={() => setActive(t.id)}>
      <Icon name={t.icon} />
      {t.badge && <span className="badge">{t.badge}</span>}
      <span>{t.label}</span>
    </button>
  ))}
</nav>`,
  },
]
