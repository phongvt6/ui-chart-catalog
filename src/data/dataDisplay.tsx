/* eslint-disable react-refresh/only-export-components -- demo components được đặt cạnh dữ liệu catalog cho dễ đối chiếu */
import { useState } from 'react'
import type { CatalogEntry } from '../types'

/* -------------------------------------------------------------------------- */
/* Demos                                                                       */
/* -------------------------------------------------------------------------- */

const ROWS = [
  { branch: 'CN-07 Quận 1', date: '22/07', rev: 182_400_000, status: 'Đã duyệt' },
  { branch: 'CN-12 Thủ Đức', date: '22/07', rev: 96_150_000, status: 'Chờ duyệt' },
  { branch: 'CN-03 Bình Thạnh', date: '22/07', rev: 141_800_000, status: 'Đã duyệt' },
  { branch: 'CN-19 Gò Vấp', date: '22/07', rev: 54_300_000, status: 'Từ chối' },
]

const vnd = (n: number) => n.toLocaleString('vi-VN')

function TableDemo() {
  const [sortDesc, setSortDesc] = useState(true)
  const rows = [...ROWS].sort((a, b) => (sortDesc ? b.rev - a.rev : a.rev - b.rev))
  const badge = (s: string) =>
    s === 'Đã duyệt' ? 'is-success' : s === 'Chờ duyệt' ? 'is-warning' : 'is-danger'
  return (
    <div className="d-card" style={{ padding: 0, overflow: 'auto', width: '100%', maxWidth: 560 }}>
      <table className="d-table">
        <thead>
          <tr>
            <th>Chi nhánh</th>
            <th>Ngày</th>
            <th className="num">
              <button
                type="button"
                onClick={() => setSortDesc((v) => !v)}
                style={{
                  border: 0,
                  background: 'none',
                  color: 'inherit',
                  font: 'inherit',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Doanh thu (đ) {sortDesc ? '▼' : '▲'}
              </button>
            </th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.branch}>
              <td>{r.branch}</td>
              <td>{r.date}</td>
              <td className="num">{vnd(r.rev)}</td>
              <td>
                <span className={`d-badge ${badge(r.status)}`}>{r.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
              <strong>Tổng</strong>
            </td>
            <td className="num">
              <strong>{vnd(ROWS.reduce((s, r) => s + r.rev, 0))}</strong>
            </td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

function ListDemo() {
  return (
    <div className="d-card d-panel" style={{ padding: 0, overflow: 'hidden' }}>
      {[
        { n: 'Nguyễn Văn A', r: 'Trưởng chi nhánh', t: '09:12' },
        { n: 'Trần Thị B', r: 'Kế toán', t: '08:45' },
        { n: 'Lê Văn C', r: 'Thu ngân', t: 'Hôm qua' },
      ].map((p, i) => (
        <div
          key={p.n}
          className="d-row"
          style={{
            gap: 11,
            padding: 11,
            flexWrap: 'nowrap',
            borderTop: i ? '1px solid var(--border)' : undefined,
          }}
        >
          <span className="d-avatar">
            {p.n.split(' ').slice(-1)[0][0]}
            {p.n[0]}
          </span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <strong style={{ display: 'block' }}>{p.n}</strong>
            <span className="d-hint">{p.r}</span>
          </span>
          <span className="d-hint">{p.t}</span>
          <span style={{ color: 'var(--fg-subtle)' }}>›</span>
        </div>
      ))}
    </div>
  )
}

function CardDemo() {
  return (
    <div className="d-card" style={{ maxWidth: 300, padding: 0, overflow: 'hidden' }}>
      <div
        style={{
          height: 92,
          background: 'linear-gradient(135deg, var(--accent) 0%, #9c6ef0 100%)',
        }}
      />
      <div style={{ padding: 14 }}>
        <span className="d-badge is-info">Chi nhánh</span>
        <h4 style={{ margin: '8px 0 4px' }}>CN-07 Quận 1</h4>
        <p className="d-muted" style={{ margin: '0 0 12px' }}>
          Số 12 Lê Lợi, Quận 1, TP.HCM. 24 nhân sự, 3 danh mục.
        </p>
        <div className="d-row">
          <button type="button" className="d-btn is-sm">
            Xem báo cáo
          </button>
          <button type="button" className="d-btn is-secondary is-sm">
            Sửa
          </button>
        </div>
      </div>
    </div>
  )
}

function StatDemo() {
  const stats = [
    { label: 'Doanh thu hôm nay', value: '474,6 tr', delta: +6.3 },
    { label: 'Chi nhánh đã nộp', value: '18/20', delta: -2 },
    { label: 'Chờ duyệt', value: '5', delta: 0 },
  ]
  return (
    <div className="d-row" style={{ justifyContent: 'center', gap: 12 }}>
      {stats.map((s) => (
        <div key={s.label} className="d-card" style={{ minWidth: 148 }}>
          <p className="d-hint" style={{ margin: 0 }}>
            {s.label}
          </p>
          <p style={{ margin: '4px 0 2px', fontSize: 23, fontWeight: 680, letterSpacing: '-0.02em' }}>
            {s.value}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color:
                s.delta > 0 ? 'var(--success)' : s.delta < 0 ? 'var(--danger)' : 'var(--fg-subtle)',
            }}
          >
            {s.delta > 0 ? '▲' : s.delta < 0 ? '▼' : '—'} {Math.abs(s.delta)}
            {typeof s.delta === 'number' && s.label.includes('thu') ? '%' : ''} so với hôm qua
          </p>
        </div>
      ))}
    </div>
  )
}

function ChartDemo() {
  const data = [
    { d: 'T2', v: 62 },
    { d: 'T3', v: 74 },
    { d: 'T4', v: 58 },
    { d: 'T5', v: 91 },
    { d: 'T6', v: 100 },
    { d: 'T7', v: 88 },
    { d: 'CN', v: 79 },
  ]
  const [hover, setHover] = useState<string | null>(null)
  return (
    <div className="d-card d-panel">
      <p className="d-hint" style={{ margin: '0 0 10px' }}>
        Doanh thu 7 ngày gần nhất (tỷ đồng)
      </p>
      <div className="d-row" style={{ gap: 8, alignItems: 'flex-end', height: 120, flexWrap: 'nowrap' }}>
        {data.map((b) => (
          <div
            key={b.d}
            style={{ flex: 1, textAlign: 'center' }}
            onMouseEnter={() => setHover(b.d)}
            onMouseLeave={() => setHover(null)}
          >
            <div style={{ height: 18, fontSize: 11, color: 'var(--fg-muted)' }}>
              {hover === b.d ? (b.v / 20).toFixed(1) : ''}
            </div>
            <div
              style={{
                height: b.v,
                borderRadius: '5px 5px 0 0',
                background: hover === b.d ? 'var(--accent)' : 'var(--accent-soft)',
                borderTop: `3px solid var(--accent)`,
                transition: 'background 0.15s',
              }}
            />
            <div className="d-hint" style={{ marginTop: 4 }}>
              {b.d}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AccordionDemo() {
  const items = [
    {
      q: 'Khi nào phải nộp số liệu?',
      a: 'Trước 17:00 mỗi ngày cho số liệu của ngày hôm đó. Sau 17:00 hệ thống khoá và cần quản lý mở lại.',
    },
    {
      q: 'Ai được sửa số liệu đã nộp?',
      a: 'Chỉ quản lý cấp vùng. Mọi lần sửa đều ghi lại trong nhật ký.',
    },
    { q: 'Báo cáo tổng hợp gửi cho ai?', a: 'Ban giám đốc và kế toán trưởng, tự động lúc 18:00.' },
  ]
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="d-card d-panel" style={{ padding: 0, overflow: 'hidden' }}>
      {items.map((it, i) => (
        <div key={it.q} style={{ borderTop: i ? '1px solid var(--border)' : undefined }}>
          <button
            type="button"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              display: 'flex',
              width: '100%',
              gap: 10,
              padding: '11px 13px',
              border: 0,
              background: 'none',
              color: 'inherit',
              font: 'inherit',
              fontWeight: 600,
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            <span style={{ flex: 1 }}>{it.q}</span>
            <span style={{ color: 'var(--fg-subtle)' }}>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && (
            <p className="d-muted" style={{ margin: 0, padding: '0 13px 13px' }}>
              {it.a}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

function TimelineDemo() {
  const events = [
    { t: '22/07 09:12', who: 'Nguyễn Văn A', what: 'Tạo đề xuất mua văn phòng phẩm', done: true },
    { t: '22/07 10:40', who: 'Trần Thị B', what: 'Trưởng bộ phận duyệt', done: true },
    { t: '—', who: 'Kế toán', what: 'Đang chờ duyệt', done: false },
  ]
  return (
    <div className="d-panel" style={{ paddingLeft: 6 }}>
      {events.map((e, i) => (
        <div key={e.what} className="d-row" style={{ gap: 12, flexWrap: 'nowrap', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 14 }}>
            <span
              style={{
                width: 11,
                height: 11,
                marginTop: 5,
                borderRadius: '50%',
                background: e.done ? 'var(--accent)' : 'var(--surface)',
                border: `2px solid ${e.done ? 'var(--accent)' : 'var(--border-strong)'}`,
              }}
            />
            {i < events.length - 1 && (
              <span style={{ flex: 1, width: 2, background: 'var(--border)' }} />
            )}
          </div>
          <div style={{ paddingBottom: 16 }}>
            <strong style={{ display: 'block', fontSize: 13.5 }}>{e.what}</strong>
            <span className="d-hint">
              {e.who} · {e.t}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

function DescriptionListDemo() {
  const rows = [
    ['Mã chi nhánh', 'CN-07'],
    ['Địa chỉ', 'Số 12 Lê Lợi, Quận 1, TP.HCM'],
    ['Ngày khai trương', '14/03/2019'],
    ['Người phụ trách', 'Nguyễn Văn A'],
  ]
  return (
    <dl
      className="d-card d-panel"
      style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '9px 18px', margin: 0 }}
    >
      {rows.map(([k, v]) => (
        <div key={k} style={{ display: 'contents' }}>
          <dt className="d-hint" style={{ margin: 0 }}>
            {k}
          </dt>
          <dd style={{ margin: 0 }}>{v}</dd>
        </div>
      ))}
    </dl>
  )
}

function DividerDemo() {
  return (
    <div className="d-panel d-stack" style={{ gap: 0 }}>
      <p className="d-muted" style={{ margin: 0 }}>
        Thông tin cơ bản của chi nhánh.
      </p>
      <hr style={{ width: '100%', border: 0, borderTop: '1px solid var(--border)', margin: '14px 0' }} />
      <div
        className="d-row"
        style={{ gap: 12, alignItems: 'center', margin: '0 0 14px', flexWrap: 'nowrap' }}
      >
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span className="d-hint" style={{ margin: 0 }}>
          hoặc
        </span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <p className="d-muted" style={{ margin: 0 }}>
        Cấu hình nâng cao (ít dùng).
      </p>
    </div>
  )
}

function SectionHeaderDemo() {
  return (
    <div className="d-panel">
      <div
        className="d-row"
        style={{ justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'nowrap' }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: 18 }}>Báo cáo doanh thu</h3>
          <p className="d-hint" style={{ margin: 0 }}>
            20 chi nhánh · cập nhật lúc 09:12
          </p>
        </div>
        <div className="d-row">
          <button type="button" className="d-btn is-secondary is-sm">
            Xuất Excel
          </button>
          <button type="button" className="d-btn is-sm">
            Nhập số liệu
          </button>
        </div>
      </div>
      <hr style={{ border: 0, borderTop: '1px solid var(--border)', margin: '12px 0 0' }} />
    </div>
  )
}

function FormLayoutDemo() {
  return (
    <form className="d-panel d-stack" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="d-label" htmlFor="fl-1">
          Chi nhánh <span style={{ color: 'var(--danger)' }}>*</span>
        </label>
        <select id="fl-1" className="d-field" defaultValue="a">
          <option value="a">CN-07 Quận 1</option>
        </select>
      </div>
      <div className="d-row" style={{ gap: 12, flexWrap: 'nowrap' }}>
        <div style={{ flex: 1 }}>
          <label className="d-label" htmlFor="fl-2">
            Ngày <span style={{ color: 'var(--danger)' }}>*</span>
          </label>
          <input id="fl-2" className="d-field" type="date" defaultValue="2026-07-22" />
        </div>
        <div style={{ flex: 1 }}>
          <label className="d-label" htmlFor="fl-3">
            Ca
          </label>
          <select id="fl-3" className="d-field" defaultValue="">
            <option value="">Cả ngày</option>
            <option>Ca sáng</option>
          </select>
        </div>
      </div>
      <div>
        <label className="d-label" htmlFor="fl-4">
          Doanh thu (đ) <span style={{ color: 'var(--danger)' }}>*</span>
        </label>
        <input id="fl-4" className="d-field" inputMode="numeric" placeholder="0" />
        <p className="d-hint">Chưa gồm VAT.</p>
      </div>
      <div
        className="d-row"
        style={{ justifyContent: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: 12 }}
      >
        <button type="button" className="d-btn is-secondary is-sm">
          Huỷ
        </button>
        <button type="submit" className="d-btn is-sm">
          Lưu báo cáo
        </button>
      </div>
    </form>
  )
}

/* -------------------------------------------------------------------------- */
/* Entries                                                                     */
/* -------------------------------------------------------------------------- */

export const dataEntries: CatalogEntry[] = [
  {
    id: 'table',
    nameEn: 'Table / Data Grid',
    nameVi: 'Bảng dữ liệu',
    aliases: ['data table', 'grid', 'bảng', 'danh sách bảng'],
    category: 'data',
    platforms: ['web'],
    description:
      'Lưới hàng–cột để so sánh nhiều bản ghi trên nhiều thuộc tính. Bản đầy đủ (data grid) có sắp xếp, lọc, ghim cột, chọn nhiều dòng và hàng tổng.',
    purpose:
      'Dùng khi người dùng cần đối chiếu số liệu giữa các dòng — báo cáo doanh thu, danh sách đơn hàng, bảng công. Trên mobile phải chuyển thành danh sách thẻ.',
    states: [
      { name: 'Sorted', note: 'Cột đang sắp xếp có mũi tên ▲▼.' },
      { name: 'Row hover', note: 'Đổi nền để mắt không lạc dòng.' },
      { name: 'Selected', note: 'Chọn nhiều dòng bằng checkbox, hiện thanh hành động.' },
      { name: 'Loading', note: 'Skeleton dòng, giữ nguyên chiều cao bảng.' },
      { name: 'Empty', note: 'Trạng thái rỗng nằm trong thân bảng.' },
    ],
    dos: [
      'Số căn phải, chữ căn trái, dùng chữ số đều nhau (tabular-nums).',
      'Ghim dòng tiêu đề khi cuộn dọc.',
      'Có hàng tổng nếu bảng chứa số tiền.',
    ],
    donts: [
      'Không nhồi quá 7–8 cột trên một màn hình.',
      'Không dùng bảng làm công cụ dàn trang.',
      'Không để bảng tràn ngang mà không cho cuộn.',
    ],
    demo: () => <TableDemo />,
    code: `<table>
  <thead>
    <tr>
      <th>Chi nhánh</th>
      <th aria-sort={desc ? 'descending' : 'ascending'}>
        <button onClick={toggleSort}>Doanh thu ▼</button>
      </th>
    </tr>
  </thead>
  <tbody>
    {rows.map((r) => (
      <tr key={r.id}>
        <td>{r.branch}</td>
        <td className="num">{r.rev.toLocaleString('vi-VN')}</td>
      </tr>
    ))}
  </tbody>
</table>`,
  },
  {
    id: 'list',
    nameEn: 'List / List Item',
    nameVi: 'Danh sách',
    aliases: ['list view', 'danh sách dòng', 'row'],
    category: 'data',
    platforms: ['web', 'mobile'],
    description:
      'Chuỗi các dòng đồng dạng, mỗi dòng gồm phần đầu (avatar/icon), nội dung chính, nội dung phụ và phần đuôi (thời gian, mũi tên, nút).',
    purpose:
      'Là dạng hiển thị chủ đạo trên mobile và cho mọi tập dữ liệu chỉ cần 2–3 thuộc tính mỗi mục: danh bạ, thông báo, lịch sử thao tác.',
    states: [
      { name: 'Default', note: 'Dòng bình thường.' },
      { name: 'Pressed', note: 'Nền đổi màu khi chạm/bấm.' },
      { name: 'Selected', note: 'Đang mở ở khung bên phải (bố cục 2 cột).' },
      { name: 'Unread', note: 'Chữ đậm hoặc chấm màu ở đầu dòng.' },
      { name: 'Swiped', note: 'Trên mobile — vuốt lộ ra hành động ẩn.' },
    ],
    dos: [
      'Cho bấm cả dòng, không chỉ mỗi chữ tiêu đề.',
      'Giữ chiều cao dòng đồng đều để cuộn mượt.',
      'Cắt chữ dài bằng “…” thay vì xuống dòng vô hạn.',
    ],
    donts: [
      'Không nhét quá 3 dòng chữ vào một mục.',
      'Không đặt nhiều nút nhỏ trong mỗi dòng trên mobile.',
    ],
    nativeNames: { ios: 'UITableView', android: 'RecyclerView / LazyColumn' },
    demo: () => <ListDemo />,
    code: `<ul className="list">
  {people.map((p) => (
    <li key={p.id}>
      <Avatar name={p.name} />
      <div>
        <strong>{p.name}</strong>
        <span className="hint">{p.role}</span>
      </div>
      <time>{p.at}</time>
    </li>
  ))}
</ul>`,
  },
  {
    id: 'card',
    nameEn: 'Card',
    nameVi: 'Thẻ nội dung',
    aliases: ['tile', 'thẻ', 'panel'],
    category: 'data',
    platforms: ['web', 'mobile'],
    description:
      'Khối chữ nhật bo góc, có viền hoặc đổ bóng, gom một cụm nội dung liên quan về CÙNG một đối tượng: ảnh, tiêu đề, mô tả, hành động.',
    purpose:
      'Dùng khi mỗi mục cần nhiều hơn một dòng chữ và người dùng lướt để chọn thay vì so sánh chính xác — danh sách chi nhánh, sản phẩm, bài viết.',
    states: [
      { name: 'Default', note: 'Viền nhẹ hoặc bóng nhỏ.' },
      { name: 'Hover', note: 'Nâng bóng lên nếu cả thẻ bấm được.' },
      { name: 'Selected', note: 'Viền màu nhấn khi được chọn.' },
      { name: 'Loading', note: 'Skeleton giữ đúng khung thẻ.' },
    ],
    dos: [
      'Mỗi thẻ chỉ nói về một đối tượng.',
      'Giữ chiều cao thẻ đồng đều trong một lưới.',
      'Nếu cả thẻ bấm được thì chỉ nên có tối đa một nút phụ bên trong.',
    ],
    donts: [
      'Không lồng thẻ trong thẻ.',
      'Không dùng thẻ cho dữ liệu cần so sánh chính xác (dùng Bảng).',
    ],
    demo: () => <CardDemo />,
    code: `<article className="card">
  <img src={cover} alt="" />
  <div className="card-body">
    <span className="badge">Chi nhánh</span>
    <h4>CN-07 Quận 1</h4>
    <p>Số 12 Lê Lợi, Quận 1, TP.HCM.</p>
    <button className="btn">Xem báo cáo</button>
  </div>
</article>`,
  },
  {
    id: 'stat-tile',
    nameEn: 'Stat / KPI Tile',
    nameVi: 'Ô chỉ số',
    aliases: ['metric', 'kpi', 'stat card', 'số liệu tổng'],
    category: 'data',
    platforms: ['web', 'mobile'],
    description:
      'Ô nhỏ nêu bật một con số duy nhất, kèm nhãn và mức thay đổi so với kỳ trước (▲ xanh / ▼ đỏ). Thường xếp thành hàng trên đầu dashboard.',
    purpose:
      'Trả lời câu hỏi “tình hình có ổn không?” trong 3 giây. Là thứ đầu tiên người quản lý nhìn khi mở dashboard.',
    states: [
      { name: 'Positive', note: 'Tăng so với kỳ trước — mũi tên lên, màu xanh.' },
      { name: 'Negative', note: 'Giảm — mũi tên xuống, màu đỏ.' },
      { name: 'Neutral', note: 'Không đổi hoặc không có kỳ so sánh.' },
      { name: 'Loading', note: 'Skeleton đúng kích thước con số.' },
    ],
    dos: [
      'Luôn ghi rõ mốc so sánh (“so với hôm qua”).',
      'Rút gọn số lớn cho dễ đọc (474,6 tr thay vì 474.600.000).',
      'Giới hạn 3–5 ô trên một hàng.',
    ],
    donts: [
      'Không mặc định xanh = tốt: chi phí tăng là xấu.',
      'Không hiện % thay đổi khi mẫu số quá nhỏ.',
    ],
    demo: () => <StatDemo />,
    code: `<div className="stat">
  <p className="stat-label">Doanh thu hôm nay</p>
  <p className="stat-value">474,6 tr</p>
  <p className={delta > 0 ? 'up' : 'down'}>
    {delta > 0 ? '▲' : '▼'} {Math.abs(delta)}% so với hôm qua
  </p>
</div>`,
  },
  {
    id: 'chart',
    nameEn: 'Chart',
    nameVi: 'Biểu đồ',
    aliases: ['graph', 'đồ thị', 'bar chart', 'line chart'],
    category: 'data',
    platforms: ['web', 'mobile'],
    description:
      'Hình hoá dữ liệu để thấy xu hướng và so sánh. Chọn dạng theo câu hỏi: cột = so sánh giữa các nhóm, đường = xu hướng theo thời gian, tròn = tỷ trọng (tối đa 5 phần).',
    purpose:
      'Dùng khi hình dạng của dữ liệu quan trọng hơn con số cụ thể. Nếu người dùng cần con số chính xác thì bảng vẫn tốt hơn biểu đồ.',
    states: [
      { name: 'Default', note: 'Có trục, nhãn và chú giải đầy đủ.' },
      { name: 'Hover', note: 'Tooltip hiện giá trị chính xác của điểm đang trỏ.' },
      { name: 'Empty', note: 'Không có dữ liệu trong khoảng đã chọn.' },
      { name: 'Loading', note: 'Khung xám giữ đúng chiều cao biểu đồ.' },
    ],
    dos: [
      'Trục giá trị bắt đầu từ 0 với biểu đồ cột.',
      'Ghi rõ đơn vị (tỷ đồng, %, lượt).',
      'Đảm bảo phân biệt được khi in trắng đen hoặc với người mù màu.',
    ],
    donts: [
      'Không dùng biểu đồ tròn cho trên 5 hạng mục.',
      'Không dùng hiệu ứng 3D — làm sai lệch cảm nhận tỷ lệ.',
      'Không vẽ biểu đồ khi chỉ có 2 điểm dữ liệu.',
    ],
    demo: () => <ChartDemo />,
    code: `{data.map((b) => (
  <div key={b.d} className="bar-col" title={\`\${b.d}: \${b.v}\`}>
    <div className="bar" style={{ height: \`\${(b.v / max) * 100}%\` }} />
    <span className="bar-label">{b.d}</span>
  </div>
))}`,
  },
  {
    id: 'accordion',
    nameEn: 'Accordion / Collapse',
    nameVi: 'Khối gập mở',
    aliases: ['collapse', 'expander', 'disclosure', 'gập mở', 'faq'],
    category: 'data',
    platforms: ['web', 'mobile'],
    description:
      'Danh sách các tiêu đề bấm được để mở/đóng phần nội dung bên dưới. Có thể cho mở nhiều mục cùng lúc hoặc chỉ một mục.',
    purpose:
      'Dùng để rút gọn trang dài mà vẫn cho người dùng quét được toàn bộ đề mục: câu hỏi thường gặp, cấu hình nâng cao, chi tiết từng phần của hồ sơ.',
    states: [
      { name: 'Collapsed', note: 'Chỉ hiện tiêu đề, dấu + hoặc ▸.' },
      { name: 'Expanded', note: 'Nội dung mở ra, dấu − hoặc ▾.' },
      { name: 'Disabled', note: 'Mục chưa có nội dung.' },
    ],
    dos: [
      'Dùng aria-expanded trên nút tiêu đề.',
      'Mở sẵn mục đầu tiên nếu đó là nội dung quan trọng nhất.',
      'Cho phép mở tất cả khi người dùng cần tìm bằng Ctrl+F.',
    ],
    donts: [
      'Không giấu nội dung quan trọng hoặc bắt buộc phải đọc.',
      'Không lồng accordion trong accordion.',
    ],
    demo: () => <AccordionDemo />,
    code: `<button aria-expanded={open === i} aria-controls={\`sec-\${i}\`}
  onClick={() => setOpen(open === i ? null : i)}>
  {item.q} <span>{open === i ? '−' : '+'}</span>
</button>
{open === i && <div id={\`sec-\${i}\`}>{item.a}</div>}`,
  },
  {
    id: 'timeline',
    nameEn: 'Timeline / Activity Feed',
    nameVi: 'Dòng thời gian',
    aliases: ['activity log', 'nhật ký', 'audit trail', 'lịch sử'],
    category: 'data',
    platforms: ['web', 'mobile'],
    description:
      'Chuỗi sự kiện theo thứ tự thời gian, nối bằng một đường dọc với chấm đánh dấu từng mốc; mốc đã xảy ra và mốc đang chờ được phân biệt rõ.',
    purpose:
      'Dùng cho lịch sử phê duyệt, nhật ký thao tác, tiến trình đơn hàng — trả lời “ai làm gì, lúc nào, và giờ đang ở đâu”.',
    states: [
      { name: 'Completed', note: 'Chấm đặc, có thời gian cụ thể.' },
      { name: 'Current', note: 'Chấm nổi bật, thường đang chờ xử lý.' },
      { name: 'Upcoming', note: 'Chấm rỗng, mờ, chưa có thời gian.' },
      { name: 'Rejected', note: 'Chấm đỏ — luồng dừng ở đây, kèm lý do.' },
    ],
    dos: [
      'Ghi cả thời gian tuyệt đối lẫn tương đối (“2 giờ trước”).',
      'Nêu rõ tên người thực hiện từng bước.',
      'Nhóm theo ngày khi danh sách dài.',
    ],
    donts: [
      'Không đảo lộn thứ tự thời gian trong cùng một dòng.',
      'Không ghi log kỹ thuật khó hiểu cho người dùng nghiệp vụ.',
    ],
    demo: () => <TimelineDemo />,
    code: `{events.map((e, i) => (
  <li key={e.id} className={e.done ? 'is-done' : 'is-pending'}>
    <span className="dot" />
    {i < events.length - 1 && <span className="line" />}
    <strong>{e.what}</strong>
    <span className="hint">{e.who} · {e.at}</span>
  </li>
))}`,
  },
  {
    id: 'description-list',
    nameEn: 'Description List / Key–Value',
    nameVi: 'Danh sách thuộc tính',
    aliases: ['detail list', 'key value', 'thông tin chi tiết', 'definition list'],
    category: 'data',
    platforms: ['web', 'mobile'],
    description:
      'Cặp nhãn – giá trị xếp thành hai cột, dùng thẻ ngữ nghĩa <dl>/<dt>/<dd>. Là phiên bản chỉ-đọc của một biểu mẫu.',
    purpose:
      'Dùng ở màn hình xem chi tiết một bản ghi: thông tin chi nhánh, hồ sơ nhân viên, thông số đơn hàng — nơi người dùng chỉ đọc chứ không sửa.',
    states: [
      { name: 'Default', note: 'Nhãn mờ, giá trị đậm hơn.' },
      { name: 'Empty value', note: 'Hiện “—” chứ không để trống hẳn.' },
      { name: 'Copyable', note: 'Mã số, ID — kèm nút sao chép.' },
      { name: 'Editable', note: 'Có nút ✎ để chỉnh tại chỗ.' },
    ],
    dos: [
      'Xếp theo tầm quan trọng, không theo thứ tự trong cơ sở dữ liệu.',
      'Căn thẳng cột nhãn cho dễ quét mắt.',
      'Định dạng giá trị theo kiểu người Việt đọc (ngày dd/mm, tiền có dấu chấm).',
    ],
    donts: [
      'Không để ô trống mà không giải thích.',
      'Không hiển thị tên cột thô của cơ sở dữ liệu làm nhãn.',
    ],
    demo: () => <DescriptionListDemo />,
    code: `<dl className="kv">
  <dt>Mã chi nhánh</dt><dd>CN-07</dd>
  <dt>Địa chỉ</dt><dd>Số 12 Lê Lợi, Quận 1, TP.HCM</dd>
  <dt>Người phụ trách</dt><dd>{person ?? '—'}</dd>
</dl>`,
  },
  {
    id: 'divider',
    nameEn: 'Divider / Separator',
    nameVi: 'Đường phân cách',
    aliases: ['hr', 'separator', 'rule', 'gạch ngang'],
    category: 'layout',
    platforms: ['web', 'mobile'],
    description:
      'Đường kẻ mảnh ngăn hai nhóm nội dung. Có thể kèm chữ ở giữa (“hoặc”) để làm rõ quan hệ giữa hai nhóm.',
    purpose:
      'Dùng khi khoảng trắng chưa đủ để tách nhóm, hoặc cần báo rõ “từ đây trở xuống là chuyện khác”. Là công cụ phân nhóm nhẹ nhất.',
    states: [
      { name: 'Horizontal', note: 'Ngăn theo chiều dọc trang.' },
      { name: 'Vertical', note: 'Ngăn hai nhóm trong cùng một hàng.' },
      { name: 'With label', note: 'Có chữ ở giữa.' },
    ],
    dos: [
      'Ưu tiên tăng khoảng trắng trước, dùng đường kẻ sau.',
      'Dùng <hr> khi thực sự có ý nghĩa ngăn cách nội dung.',
    ],
    donts: [
      'Không rải đường kẻ giữa mọi phần tử — màn hình sẽ rối.',
      'Không dùng đường kẻ đậm màu làm điểm nhấn.',
    ],
    demo: () => <DividerDemo />,
    code: `<hr className="divider" />

{/* Có nhãn ở giữa */}
<div className="divider-label" role="separator">
  <span /> <em>hoặc</em> <span />
</div>`,
  },
  {
    id: 'section-header',
    nameEn: 'Section Header / Page Header',
    nameVi: 'Tiêu đề khu vực',
    aliases: ['page title', 'toolbar', 'tiêu đề trang', 'header'],
    category: 'layout',
    platforms: ['web', 'mobile'],
    description:
      'Cụm gồm tiêu đề, dòng phụ đề mô tả, và nhóm nút hành động của khu vực đó — canh trái tiêu đề, canh phải nút.',
    purpose:
      'Cho người dùng biết đang xem gì và có thể làm gì với nó. Là mẫu bố cục lặp lại ở đầu mọi trang trong ứng dụng quản trị.',
    states: [
      { name: 'Default', note: 'Tiêu đề + nút hành động.' },
      { name: 'With meta', note: 'Có phụ đề: số lượng, thời điểm cập nhật.' },
      { name: 'Sticky', note: 'Bám trên khi cuộn ở trang dài.' },
      { name: 'Selection mode', note: 'Đổi thành thanh hành động khi chọn nhiều dòng.' },
    ],
    dos: [
      'Chỉ một nút chính (Primary) trong nhóm hành động.',
      'Dùng đúng cấp thẻ tiêu đề h1/h2 cho trình đọc màn hình.',
      'Trên mobile, đẩy các hành động phụ vào menu “…”.',
    ],
    donts: [
      'Không đặt trên 3 nút trong một tiêu đề khu vực.',
      'Không lặp lại tên ứng dụng làm tiêu đề trang.',
    ],
    demo: () => <SectionHeaderDemo />,
    code: `<header className="page-head">
  <div>
    <h1>Báo cáo doanh thu</h1>
    <p className="hint">20 chi nhánh · cập nhật lúc 09:12</p>
  </div>
  <div className="actions">
    <button className="btn is-secondary">Xuất Excel</button>
    <button className="btn">Nhập số liệu</button>
  </div>
</header>`,
  },
  {
    id: 'form-layout',
    nameEn: 'Form',
    nameVi: 'Biểu mẫu',
    aliases: ['form layout', 'phiếu nhập', 'nhập liệu'],
    category: 'layout',
    platforms: ['web', 'mobile'],
    description:
      'Tập hợp các trường nhập được sắp xếp thành nhóm logic, kèm dấu * cho trường bắt buộc và một hàng nút cố định ở cuối (Huỷ + Lưu).',
    purpose:
      'Là khung xương của mọi màn hình nhập liệu. Chất lượng biểu mẫu quyết định phần lớn tốc độ nhập liệu hằng ngày của người dùng.',
    states: [
      { name: 'Pristine', note: 'Chưa sửa gì — nút Lưu có thể để mờ.' },
      { name: 'Dirty', note: 'Đã sửa — cảnh báo nếu rời trang.' },
      { name: 'Submitting', note: 'Khoá toàn bộ form, nút Lưu hiện spinner.' },
      { name: 'Error summary', note: 'Nhiều lỗi — tóm tắt ở đầu và nhảy tới từng trường.' },
      { name: 'Saved', note: 'Xác nhận bằng toast, giữ nguyên vị trí cuộn.' },
    ],
    dos: [
      'Xếp một cột dọc — nhanh hơn hai cột với hầu hết biểu mẫu.',
      'Nhóm các trường liên quan và đặt tiêu đề nhóm.',
      'Đánh dấu trường bắt buộc, và nói rõ định dạng mong đợi.',
      'Cho phép lưu nháp với biểu mẫu dài.',
    ],
    donts: [
      'Không hỏi thông tin mà hệ thống đã có.',
      'Không đặt nút Xoá/Reset cạnh nút Lưu.',
      'Không để mất dữ liệu khi gửi thất bại.',
    ],
    demo: () => <FormLayoutDemo />,
    code: `<form onSubmit={handleSubmit}>
  <Field label="Chi nhánh" required>{/* … */}</Field>
  <div className="row">
    <Field label="Ngày" required>{/* … */}</Field>
    <Field label="Ca">{/* … */}</Field>
  </div>
  <footer className="form-actions">
    <button type="button" className="btn is-secondary">Huỷ</button>
    <button type="submit" className="btn" disabled={submitting}>Lưu báo cáo</button>
  </footer>
</form>`,
  },
]
