/* eslint-disable react-refresh/only-export-components -- demo components được đặt cạnh dữ liệu catalog cho dễ đối chiếu */
import { useEffect, useState } from 'react'
import type { CatalogEntry } from '../types'

/* -------------------------------------------------------------------------- */
/* Demos                                                                       */
/* -------------------------------------------------------------------------- */

function SplitButtonDemo() {
  const [open, setOpen] = useState(false)
  const [last, setLast] = useState('—')
  const more = ['Lưu và tạo mới', 'Lưu dưới dạng nháp', 'Lưu và gửi duyệt']
  return (
    <div className="d-stack" style={{ alignItems: 'center' }}>
      <span style={{ position: 'relative', display: 'inline-flex' }}>
        <button
          type="button"
          className="d-btn"
          style={{ borderRadius: '8px 0 0 8px' }}
          onClick={() => setLast('Lưu')}
        >
          Lưu
        </button>
        <span style={{ width: 1, background: 'rgb(255 255 255 / 30%)' }} />
        <button
          type="button"
          className="d-btn"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="Tuỳ chọn lưu khác"
          style={{ borderRadius: '0 8px 8px 0', padding: '8px 10px' }}
          onClick={() => setOpen((v) => !v)}
        >
          ▾
        </button>
        {open && (
          <div role="menu" className="combo-pop" style={{ top: 'calc(100% + 4px)', width: 190 }}>
            {more.map((m) => (
              <button
                key={m}
                type="button"
                role="menuitem"
                className="combo-opt"
                onClick={() => {
                  setLast(m)
                  setOpen(false)
                }}
              >
                {m}
              </button>
            ))}
          </div>
        )}
      </span>
      <p className="d-muted">Vừa chọn: {last}</p>
    </div>
  )
}

function ButtonGroupDemo() {
  const [align, setAlign] = useState('left')
  return (
    <div className="d-stack" style={{ alignItems: 'center' }}>
      <div
        className="d-row"
        role="toolbar"
        aria-label="Định dạng"
        style={{ gap: 0, border: '1px solid var(--border-strong)', borderRadius: 8, padding: 2 }}
      >
        {[
          { id: 'left', g: '⬱', l: 'Căn trái' },
          { id: 'center', g: '⬍', l: 'Căn giữa' },
          { id: 'right', g: '⬲', l: 'Căn phải' },
        ].map((b) => (
          <button
            key={b.id}
            type="button"
            aria-pressed={align === b.id}
            aria-label={b.l}
            onClick={() => setAlign(b.id)}
            style={{
              width: 36,
              height: 30,
              border: 0,
              borderRadius: 6,
              background: align === b.id ? 'var(--accent-soft)' : 'transparent',
              color: align === b.id ? 'var(--accent)' : 'var(--fg-muted)',
              cursor: 'pointer',
              font: 'inherit',
            }}
          >
            {b.g}
          </button>
        ))}
        <span style={{ width: 1, margin: '0 4px', background: 'var(--border)' }} />
        <button type="button" className="icon-btn" style={{ border: 0 }} aria-label="Hoàn tác">
          ↶
        </button>
        <button type="button" className="icon-btn" style={{ border: 0 }} aria-label="Làm lại">
          ↷
        </button>
      </div>
      <div className="d-row" style={{ gap: 0 }}>
        <button type="button" className="d-btn is-secondary" style={{ borderRadius: '8px 0 0 8px' }}>
          Ngày
        </button>
        <button
          type="button"
          className="d-btn is-secondary"
          style={{ borderRadius: 0, borderLeftWidth: 0, borderRightWidth: 0 }}
        >
          Tuần
        </button>
        <button type="button" className="d-btn is-secondary" style={{ borderRadius: '0 8px 8px 0' }}>
          Tháng
        </button>
      </div>
    </div>
  )
}

function CommandPaletteDemo() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [i, setI] = useState(0)
  const commands = [
    { label: 'Đi tới Báo cáo doanh thu', hint: 'Điều hướng' },
    { label: 'Tạo đề xuất mua sắm', hint: 'Hành động' },
    { label: 'Xuất Excel tháng này', hint: 'Hành động' },
    { label: 'Mở cài đặt tài khoản', hint: 'Điều hướng' },
    { label: 'Đổi giao diện sáng / tối', hint: 'Hệ thống' },
  ]
  const hits = commands.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()))

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setI((v) => (v + 1) % Math.max(hits.length, 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setI((v) => (v - 1 + hits.length) % Math.max(hits.length, 1))
      }
      if (e.key === 'Enter') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, hits.length])

  return (
    <div className="d-stagebox">
      <div className="d-stagebox-inner d-stack">
        <p className="d-muted">Bấm nút (hoặc ⌘K trong app thật) để mở bảng lệnh.</p>
        <button
          type="button"
          className="d-btn is-secondary is-sm"
          style={{ alignSelf: 'start' }}
          onClick={() => setOpen(true)}
        >
          Mở bảng lệnh ⌘K
        </button>
      </div>
      {open && (
        <div
          className="d-scrim"
          style={{ placeItems: 'start center', paddingTop: 26 }}
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-label="Bảng lệnh"
            className="d-card"
            style={{ width: 320, padding: 0, overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              autoFocus
              className="d-field"
              placeholder="Gõ lệnh hoặc tên trang…"
              value={q}
              onChange={(e) => {
                setQ(e.target.value)
                setI(0)
              }}
              style={{ border: 0, borderBottom: '1px solid var(--border)', borderRadius: 0 }}
            />
            <div style={{ maxHeight: 150, overflowY: 'auto', padding: 4 }}>
              {hits.map((c, n) => (
                <button
                  key={c.label}
                  type="button"
                  className={`combo-opt${n === i ? ' is-active' : ''}`}
                  onMouseEnter={() => setI(n)}
                  onClick={() => setOpen(false)}
                >
                  <span>{c.label}</span>
                  <small>{c.hint}</small>
                </button>
              ))}
              {hits.length === 0 && <div className="combo-empty">Không có lệnh nào khớp</div>}
            </div>
            <div
              className="d-row"
              style={{
                gap: 12,
                padding: '6px 10px',
                borderTop: '1px solid var(--border)',
                fontSize: 11,
                color: 'var(--fg-subtle)',
              }}
            >
              <span>↑↓ di chuyển</span>
              <span>↵ chọn</span>
              <span>esc đóng</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function AnchorNavDemo() {
  const sections = ['Thông tin chung', 'Doanh thu', 'Nhân sự', 'Nhật ký']
  const [active, setActive] = useState(sections[0])
  return (
    <div className="d-card d-panel" style={{ display: 'flex', gap: 14, padding: 12, maxWidth: 480 }}>
      <nav aria-label="Mục lục" style={{ width: 132, flex: 'none' }}>
        {sections.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setActive(s)}
            aria-current={active === s ? 'true' : undefined}
            style={{
              display: 'block',
              width: '100%',
              padding: '5px 9px',
              border: 0,
              borderLeft: `2px solid ${active === s ? 'var(--accent)' : 'var(--border)'}`,
              background: 'none',
              color: active === s ? 'var(--accent)' : 'var(--fg-muted)',
              font: 'inherit',
              fontSize: 13,
              fontWeight: active === s ? 600 : 400,
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            {s}
          </button>
        ))}
      </nav>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 6px' }}>{active}</h4>
        <p className="d-muted" style={{ margin: 0 }}>
          Nội dung của phần “{active}”. Trong app thật, mục lục tự làm nổi phần đang nằm trong tầm
          nhìn khi bạn cuộn trang.
        </p>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Entries                                                                     */
/* -------------------------------------------------------------------------- */

export const actionsAdvancedEntries: CatalogEntry[] = [
  {
    id: 'split-button',
    nameEn: 'Split Button',
    nameVi: 'Nút kép có menu',
    aliases: ['dropdown button', 'nút tách', 'menu button'],
    category: 'action',
    platforms: ['web'],
    description:
      'Nút gồm hai phần dính liền: phần chính chạy ngay hành động mặc định, phần mũi tên ▾ mở menu các biến thể khác của cùng hành động đó.',
    purpose:
      'Dùng khi một hành động có nhiều biến thể nhưng có một cái áp đảo về tần suất: Lưu / Lưu và tạo mới / Lưu và gửi duyệt. Người dùng thường không phải mở menu.',
    states: [
      { name: 'Default', note: 'Hai phần liền khối, có vạch ngăn ở giữa.' },
      { name: 'Menu open', note: 'Mũi tên xoay, menu bung dưới nút.' },
      { name: 'Loading', note: 'Cả hai phần bị khoá, phần chính hiện spinner.' },
      { name: 'Disabled', note: 'Khoá cả cụm, không chỉ khoá một nửa.' },
    ],
    dos: [
      'Hành động mặc định phải là cái dùng nhiều nhất.',
      'Nhớ lựa chọn gần nhất nếu nghiệp vụ cho phép.',
      'Đặt aria-label riêng cho phần mũi tên.',
    ],
    donts: [
      'Không nhét các hành động không liên quan vào menu (dùng menu ⋯).',
      'Không dùng khi chỉ có đúng một hành động.',
    ],
    demo: () => <SplitButtonDemo />,
    code: `<div className="split-btn">
  <button onClick={save}>Lưu</button>
  <button aria-haspopup="menu" aria-expanded={open}
    aria-label="Tuỳ chọn lưu khác" onClick={toggle}>▾</button>
</div>
{open && (
  <div role="menu">
    <button role="menuitem">Lưu và tạo mới</button>
    <button role="menuitem">Lưu dưới dạng nháp</button>
  </div>
)}`,
  },
  {
    id: 'button-group',
    nameEn: 'Button Group / Toolbar',
    nameVi: 'Nhóm nút / Thanh công cụ',
    aliases: ['toolbar', 'action bar', 'thanh nút', 'nhóm nút'],
    category: 'action',
    platforms: ['web'],
    description:
      'Các nút liên quan xếp liền nhau thành một khối, ngăn giữa các cụm bằng vạch dọc. Có hai kiểu: nhóm chỉ để gom nút, và nhóm có trạng thái chọn (như căn lề).',
    purpose:
      'Gom các hành động cùng chủ đề để mắt xử lý một cụm thay vì nhiều nút rời — thanh định dạng, thanh thao tác trên bảng, cụm chuyển chế độ xem.',
    states: [
      { name: 'Default', note: 'Các nút ngang hàng, không nút nào nổi hơn.' },
      { name: 'Selected', note: 'Với nhóm có trạng thái — nút đang bật đổi nền.' },
      { name: 'Mixed', note: 'Vùng chọn có nhiều định dạng khác nhau — không nút nào sáng.' },
      { name: 'Overflow', note: 'Hẹp chỗ — dồn phần thừa vào menu ⋯.' },
    ],
    dos: [
      'Dùng role="toolbar" và cho di chuyển giữa các nút bằng ← →.',
      'Ngăn các cụm chức năng khác nhau bằng vạch dọc.',
      'Giữ cùng một cỡ và cùng kiểu cho mọi nút trong nhóm.',
    ],
    donts: [
      'Không trộn nút hành động với nút chọn trạng thái trong cùng một cụm.',
      'Không xếp quá 7 nút liền nhau không phân cụm.',
    ],
    demo: () => <ButtonGroupDemo />,
    code: `<div role="toolbar" aria-label="Định dạng" className="btn-group">
  <button aria-pressed={align === 'left'} aria-label="Căn trái">⬱</button>
  <button aria-pressed={align === 'center'} aria-label="Căn giữa">⬍</button>
  <span className="divider" />
  <button aria-label="Hoàn tác">↶</button>
</div>`,
  },
  {
    id: 'command-palette',
    nameEn: 'Command Palette',
    nameVi: 'Bảng lệnh nhanh',
    aliases: ['cmd+k', 'quick actions', 'spotlight', 'omnibox', 'bảng lệnh'],
    category: 'navigation',
    platforms: ['web'],
    description:
      'Hộp tìm kiếm nổi giữa màn hình, mở bằng ⌘K / Ctrl+K, gõ vài chữ để nhảy tới trang bất kỳ hoặc chạy một lệnh — không cần rời tay khỏi bàn phím.',
    purpose:
      'Dành cho người dùng thành thạo phải thao tác cả ngày trong app quản trị. Nó không thay thế menu, mà là đường tắt song song cho người đã biết mình muốn gì.',
    states: [
      { name: 'Closed', note: 'Ẩn hoàn toàn — chỉ gợi ý phím tắt ở đâu đó.' },
      { name: 'Empty', note: 'Mở ra hiện các lệnh gần đây / hay dùng.' },
      { name: 'Filtering', note: 'Kết quả gom nhóm theo loại: Điều hướng, Hành động.' },
      { name: 'Highlighted', note: 'Mục đang trỏ bằng ↑↓, Enter để chạy.' },
      { name: 'No match', note: 'Gợi ý tìm trên toàn dữ liệu thay vì chỉ tìm lệnh.' },
    ],
    dos: [
      'Hiện chân trang nhắc phím: ↑↓ di chuyển, ↵ chọn, esc đóng.',
      'Gom nhóm kết quả và ghi rõ loại của từng mục.',
      'Cho tìm được cả dữ liệu (tên chi nhánh, mã đơn) chứ không chỉ tên trang.',
    ],
    donts: [
      'Không để đây là cách DUY NHẤT tới một chức năng.',
      'Không chiếm phím tắt ⌘K của trình duyệt trong ô nhập liệu khác.',
    ],
    demo: () => <CommandPaletteDemo />,
    code: `useEffect(() => {
  const onKey = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(true) }
    if (e.key === 'Escape') setOpen(false)
  }
  window.addEventListener('keydown', onKey)
  return () => window.removeEventListener('keydown', onKey)
}, [])`,
  },
  {
    id: 'anchor-nav',
    nameEn: 'Anchor Navigation / Table of Contents',
    nameVi: 'Mục lục trong trang',
    aliases: ['toc', 'on-page nav', 'scrollspy', 'mục lục', 'anchor'],
    category: 'navigation',
    platforms: ['web'],
    description:
      'Danh sách các phần của trang, bấm vào là cuộn tới đúng phần đó; mục tương ứng với vùng đang nằm trong tầm nhìn tự được làm nổi (scrollspy).',
    purpose:
      'Dùng cho trang chi tiết dài một mạch: hồ sơ đối tác, tài liệu quy trình, trang cấu hình nhiều phần. Khác Tabs ở chỗ nội dung vẫn hiện hết, chỉ là cuộn nhanh tới.',
    states: [
      { name: 'Active', note: 'Phần đang trong tầm nhìn — vạch màu bên trái.' },
      { name: 'Visited', note: 'Không cần đánh dấu — đây là điều hướng trong trang.' },
      { name: 'Sticky', note: 'Mục lục bám theo khi cuộn.' },
      { name: 'Collapsed', note: 'Màn hình hẹp — gộp thành một dropdown “Nhảy tới…”.' },
    ],
    dos: [
      'Cuộn mượt và chừa khoảng trống cho header cố định.',
      'Cập nhật URL theo phần đang xem để chia sẻ được.',
      'Dùng IntersectionObserver thay vì lắng nghe sự kiện scroll.',
    ],
    donts: [
      'Không dùng cho trang ngắn dưới 2 màn hình.',
      'Không lồng quá 2 cấp mục lục.',
    ],
    demo: () => <AnchorNavDemo />,
    code: `<nav aria-label="Mục lục">
  {sections.map((s) => (
    <a key={s.id} href={\`#\${s.id}\`}
      aria-current={active === s.id ? 'true' : undefined}>{s.title}</a>
  ))}
</nav>

// Làm nổi phần đang trong tầm nhìn
const io = new IntersectionObserver(
  (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
  { rootMargin: '-20% 0px -70% 0px' },
)`,
  },
]
