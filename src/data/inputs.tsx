/* eslint-disable react-refresh/only-export-components -- demo components được đặt cạnh dữ liệu catalog cho dễ đối chiếu */
import { useState } from 'react'
import type { CatalogEntry } from '../types'

/* -------------------------------------------------------------------------- */
/* Demos                                                                       */
/* -------------------------------------------------------------------------- */

function TextInputDemo() {
  const [value, setValue] = useState('')
  const invalid = value.length > 0 && value.length < 3
  return (
    <div className="d-panel d-stack">
      <div>
        <label className="d-label" htmlFor="demo-name">
          Họ và tên
        </label>
        <input
          id="demo-name"
          className={`d-field${invalid ? ' is-error' : ''}`}
          placeholder="Nguyễn Văn A"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p className={`d-hint${invalid ? ' is-error' : ''}`}>
          {invalid ? 'Tên phải có ít nhất 3 ký tự.' : 'Ghi đúng như trên CCCD.'}
        </p>
      </div>
      <div>
        <label className="d-label" htmlFor="demo-disabled">
          Mã nhân viên (hệ thống cấp)
        </label>
        <input id="demo-disabled" className="d-field" value="NV-00421" disabled readOnly />
      </div>
    </div>
  )
}

function TextareaDemo() {
  const max = 120
  const [value, setValue] = useState('')
  return (
    <div className="d-panel">
      <label className="d-label" htmlFor="demo-note">
        Ghi chú
      </label>
      <textarea
        id="demo-note"
        className="d-field"
        rows={4}
        maxLength={max}
        placeholder="Mô tả thêm về đề xuất…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p className="d-hint">
        {value.length}/{max} ký tự
      </p>
    </div>
  )
}

function PasswordDemo() {
  const [show, setShow] = useState(false)
  const [value, setValue] = useState('')
  const strength = Math.min(3, Math.floor(value.length / 4))
  const labels = ['Rất yếu', 'Yếu', 'Khá', 'Mạnh']
  return (
    <div className="d-panel">
      <label className="d-label" htmlFor="demo-pass">
        Mật khẩu
      </label>
      <div className="d-row" style={{ flexWrap: 'nowrap', gap: 8 }}>
        <input
          id="demo-pass"
          className="d-field"
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Tối thiểu 8 ký tự"
        />
        <button
          type="button"
          className="d-btn is-secondary is-sm"
          onClick={() => setShow((s) => !s)}
        >
          {show ? 'Ẩn' : 'Hiện'}
        </button>
      </div>
      <div className="d-row" style={{ gap: 5, marginTop: 8 }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              height: 4,
              flex: 1,
              borderRadius: 999,
              background: i < strength ? 'var(--success)' : 'var(--surface-3)',
            }}
          />
        ))}
      </div>
      <p className="d-hint">Độ mạnh: {labels[strength]}</p>
    </div>
  )
}

function NumberStepperDemo() {
  const [qty, setQty] = useState(1)
  return (
    <div className="d-stack" style={{ alignItems: 'center' }}>
      <label className="d-label">Số lượng đặt</label>
      <div className="d-row" style={{ gap: 0 }}>
        <button
          type="button"
          className="d-btn is-secondary"
          style={{ borderRadius: '8px 0 0 8px' }}
          onClick={() => setQty((q) => Math.max(0, q - 1))}
          disabled={qty === 0}
          aria-label="Giảm"
        >
          −
        </button>
        <input
          className="d-field"
          style={{ width: 66, borderRadius: 0, textAlign: 'center' }}
          value={qty}
          inputMode="numeric"
          onChange={(e) => setQty(Number(e.target.value.replace(/\D/g, '')) || 0)}
          aria-label="Số lượng"
        />
        <button
          type="button"
          className="d-btn is-secondary"
          style={{ borderRadius: '0 8px 8px 0' }}
          onClick={() => setQty((q) => q + 1)}
          aria-label="Tăng"
        >
          +
        </button>
      </div>
    </div>
  )
}

function SearchDemo() {
  const products = ['Bàn phím không dây', 'Chuột không dây', 'Màn hình 24 inch', 'Ghế xoay', 'Giấy A4']
  const [q, setQ] = useState('')
  const hits = products.filter((f) => f.toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="d-panel">
      <div style={{ position: 'relative' }}>
        <input
          className="d-field"
          style={{ paddingLeft: 32 }}
          type="search"
          placeholder="Tìm sản phẩm…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Tìm sản phẩm"
        />
        <span
          style={{
            position: 'absolute',
            left: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--fg-subtle)',
          }}
        >
          ⌕
        </span>
      </div>
      <ul className="d-stack" style={{ gap: 4, margin: '10px 0 0', padding: 0, listStyle: 'none' }}>
        {hits.map((f) => (
          <li key={f} className="d-muted">
            {f}
          </li>
        ))}
        {hits.length === 0 && <li className="d-muted">Không tìm thấy “{q}”.</li>}
      </ul>
    </div>
  )
}

function DatePickerDemo() {
  const [date, setDate] = useState('2026-07-22')
  return (
    <div className="d-panel d-stack">
      <div>
        <label className="d-label" htmlFor="demo-date">
          Ngày báo cáo
        </label>
        <input
          id="demo-date"
          className="d-field"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="d-row">
        {['Hôm nay', 'Hôm qua', '7 ngày'].map((p) => (
          <button key={p} type="button" className="d-btn is-secondary is-sm">
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}

function CheckboxDemo() {
  const items = ['Thiết bị', 'Vật tư', 'Dịch vụ']
  const [checked, setChecked] = useState<string[]>(['Thiết bị'])
  const all = checked.length === items.length
  const toggle = (i: string) =>
    setChecked((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]))
  return (
    <div className="d-stack">
      <label className="d-check">
        <input
          type="checkbox"
          checked={all}
          ref={(el) => {
            if (el) el.indeterminate = checked.length > 0 && !all
          }}
          onChange={() => setChecked(all ? [] : items)}
        />
        <strong>Tất cả danh mục</strong>
      </label>
      <div className="d-stack" style={{ gap: 8, paddingLeft: 22 }}>
        {items.map((i) => (
          <label className="d-check" key={i}>
            <input type="checkbox" checked={checked.includes(i)} onChange={() => toggle(i)} />
            {i}
          </label>
        ))}
      </div>
      <label className="d-check" style={{ opacity: 0.5 }}>
        <input type="checkbox" disabled />
        Dịch vụ khác (chưa mở)
      </label>
    </div>
  )
}

function RadioDemo() {
  const [value, setValue] = useState('tienmat')
  const options = [
    { id: 'tienmat', label: 'Tiền mặt', hint: 'Thu tại quầy' },
    { id: 'chuyenkhoan', label: 'Chuyển khoản', hint: 'Đối soát cuối ngày' },
    { id: 'the', label: 'Quẹt thẻ', hint: 'Qua máy POS' },
  ]
  return (
    <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
      <legend className="d-label">Hình thức thanh toán</legend>
      <div className="d-stack" style={{ gap: 9 }}>
        {options.map((o) => (
          <label className="d-check" key={o.id} style={{ alignItems: 'flex-start' }}>
            <input
              type="radio"
              name="demo-pay"
              checked={value === o.id}
              onChange={() => setValue(o.id)}
              style={{ marginTop: 2 }}
            />
            <span>
              {o.label}
              <span className="d-hint" style={{ margin: 0 }}>
                {o.hint}
              </span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function SwitchDemo() {
  const [on, setOn] = useState(true)
  return (
    <div className="d-panel d-card d-stack">
      <label className="d-switch" style={{ justifyContent: 'space-between', width: '100%' }}>
        <span>
          <strong>Nhận thông báo</strong>
          <span className="d-hint" style={{ margin: 0 }}>
            Áp dụng ngay, không cần bấm Lưu
          </span>
        </span>
        <input type="checkbox" checked={on} onChange={() => setOn((v) => !v)} />
        <span className="d-switch-track" />
      </label>
      <p className="d-muted">Trạng thái: {on ? 'Bật' : 'Tắt'}</p>
    </div>
  )
}

function SelectDemo() {
  const [v, setV] = useState('')
  return (
    <div className="d-panel">
      <label className="d-label" htmlFor="demo-select">
        Chi nhánh
      </label>
      <select
        id="demo-select"
        className="d-field"
        value={v}
        onChange={(e) => setV(e.target.value)}
      >
        <option value="">— Chọn chi nhánh —</option>
        <option value="a">Chi nhánh Quận 1</option>
        <option value="b">Chi nhánh Thủ Đức</option>
        <option value="c">Chi nhánh Bình Thạnh</option>
      </select>
      <p className="d-hint">Dưới 7 lựa chọn thì Radio dễ dùng hơn Select.</p>
    </div>
  )
}

function SearchableSelectDemo() {
  const options = [
    'Chi nhánh Quận 1',
    'Chi nhánh Thủ Đức',
    'Chi nhánh Bình Thạnh',
    'Chi nhánh Gò Vấp',
    'Chi nhánh Tân Bình',
    'Chi nhánh Phú Nhuận',
  ]
  const [q, setQ] = useState('')
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const hits = options.filter((o) => o.toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="d-panel" style={{ position: 'relative' }}>
      <label className="d-label" htmlFor="demo-combo">
        Chi nhánh (gõ để tìm)
      </label>
      <input
        id="demo-combo"
        className="d-field"
        role="combobox"
        aria-expanded={open}
        placeholder="Gõ tên chi nhánh…"
        value={open ? q : value}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        onChange={(e) => {
          setQ(e.target.value)
          setOpen(true)
        }}
      />
      {open && (
        <div className="combo-pop" style={{ top: 'calc(100% + 2px)' }} role="listbox">
          {hits.map((o) => (
            <button
              type="button"
              key={o}
              role="option"
              aria-selected={o === value}
              className="combo-opt"
              onMouseDown={() => {
                setValue(o)
                setQ('')
                setOpen(false)
              }}
            >
              {o}
            </button>
          ))}
          {hits.length === 0 && <div className="combo-empty">Không có kết quả</div>}
        </div>
      )}
    </div>
  )
}

function TagInputDemo() {
  const [tags, setTags] = useState(['Thiết bị', 'Dịch vụ'])
  const [draft, setDraft] = useState('')
  return (
    <div className="d-panel">
      <label className="d-label" htmlFor="demo-tags">
        Danh mục áp dụng
      </label>
      <div
        className="d-field d-row"
        style={{ gap: 6, minHeight: 42, alignItems: 'center', padding: 6 }}
      >
        {tags.map((t) => (
          <span key={t} className="d-badge is-info">
            {t}{' '}
            <button
              type="button"
              onClick={() => setTags((x) => x.filter((y) => y !== t))}
              style={{
                border: 0,
                background: 'none',
                color: 'inherit',
                cursor: 'pointer',
                padding: 0,
              }}
              aria-label={`Bỏ ${t}`}
            >
              ✕
            </button>
          </span>
        ))}
        <input
          id="demo-tags"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && draft.trim()) {
              e.preventDefault()
              setTags((x) => [...new Set([...x, draft.trim()])])
              setDraft('')
            }
          }}
          placeholder={tags.length ? '' : 'Gõ rồi Enter…'}
          style={{
            flex: 1,
            minWidth: 90,
            border: 0,
            background: 'none',
            color: 'inherit',
            font: 'inherit',
            outline: 'none',
          }}
        />
      </div>
      <p className="d-hint">Enter để thêm, ✕ để bỏ.</p>
    </div>
  )
}

function SliderDemo() {
  const [v, setV] = useState(30)
  return (
    <div className="d-panel">
      <label className="d-label" htmlFor="demo-slider">
        Tỷ lệ chiết khấu: <strong>{v}%</strong>
      </label>
      <input
        id="demo-slider"
        type="range"
        min={0}
        max={100}
        step={5}
        value={v}
        onChange={(e) => setV(Number(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--accent)' }}
      />
      <div className="d-row" style={{ justifyContent: 'space-between' }}>
        <span className="d-hint">0%</span>
        <span className="d-hint">100%</span>
      </div>
    </div>
  )
}

function SegmentedDemo() {
  const opts = ['Ngày', 'Tuần', 'Tháng']
  const [v, setV] = useState('Tuần')
  return (
    <div className="d-stack" style={{ alignItems: 'center' }}>
      <div className="seg" role="tablist">
        {opts.map((o) => (
          <button key={o} type="button" aria-pressed={v === o} onClick={() => setV(o)}>
            {o}
          </button>
        ))}
      </div>
      <p className="d-muted">Đang xem doanh thu theo: {v}</p>
    </div>
  )
}

function RatingDemo() {
  const [v, setV] = useState(4)
  const [hover, setHover] = useState(0)
  return (
    <div className="d-stack" style={{ alignItems: 'center' }}>
      <div className="d-row" style={{ gap: 4 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-label={`${n} sao`}
            onClick={() => setV(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            style={{
              border: 0,
              background: 'none',
              cursor: 'pointer',
              fontSize: 26,
              lineHeight: 1,
              padding: 0,
              color: n <= (hover || v) ? '#f5a524' : 'var(--surface-3)',
            }}
          >
            ★
          </button>
        ))}
      </div>
      <p className="d-muted">{v}/5 — dựa trên 128 đánh giá</p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Entries                                                                     */
/* -------------------------------------------------------------------------- */

export const inputEntries: CatalogEntry[] = [
  {
    id: 'text-input',
    nameEn: 'Text Input / Text Field',
    nameVi: 'Ô nhập văn bản',
    aliases: ['textbox', 'input', 'ô nhập liệu', 'trường nhập'],
    category: 'input',
    platforms: ['web', 'mobile'],
    description:
      'Một ô cho người dùng gõ một dòng văn bản tự do. Bộ ba luôn đi cùng nhau: nhãn (label) nói ô này là gì, ô nhập, và dòng gợi ý/lỗi bên dưới (hint / error message).',
    purpose:
      'Dùng khi giá trị không thể liệt kê trước — tên người, địa chỉ, mã đơn hàng. Nếu tập giá trị hữu hạn và biết trước thì phải dùng Select/Radio, không dùng ô nhập.',
    states: [
      { name: 'Default', note: 'Trống, chỉ có placeholder mờ.' },
      { name: 'Focus', note: 'Con trỏ đang ở trong ô — viền đổi màu nhấn.' },
      { name: 'Filled', note: 'Đã có giá trị hợp lệ.' },
      { name: 'Error', note: 'Viền đỏ + thông báo lỗi cụ thể bên dưới.' },
      { name: 'Disabled', note: 'Không sửa được, nền xám (vd: hệ thống tự cấp).' },
      { name: 'Read-only', note: 'Không sửa được nhưng vẫn copy/chọn được.' },
    ],
    dos: [
      'Luôn có label hiện rõ, không dùng placeholder thay label.',
      'Báo lỗi ngay dưới ô, nói rõ sai gì và sửa thế nào.',
      'Đặt độ rộng ô tương ứng độ dài dữ liệu (mã bưu chính thì ngắn).',
    ],
    donts: [
      'Không xoá dữ liệu người dùng đã gõ khi validate thất bại.',
      'Không dùng cho dữ liệu có tập giá trị cố định (dùng Select).',
      'Không báo lỗi ngay khi người dùng mới gõ ký tự đầu tiên.',
    ],
    nativeNames: { ios: 'UITextField', android: 'EditText / TextField' },
    demo: () => <TextInputDemo />,
    code: `<label htmlFor="name">Họ và tên</label>
<input
  id="name"
  className={invalid ? 'field is-error' : 'field'}
  placeholder="Nguyễn Văn A"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  aria-invalid={invalid}
  aria-describedby="name-hint"
/>
<p id="name-hint" className="hint">
  {invalid ? 'Tên phải có ít nhất 3 ký tự.' : 'Ghi đúng như trên CCCD.'}
</p>`,
  },
  {
    id: 'textarea',
    nameEn: 'Textarea / Multiline Input',
    nameVi: 'Ô nhập nhiều dòng',
    aliases: ['text area', 'ô ghi chú', 'multiline'],
    category: 'input',
    platforms: ['web', 'mobile'],
    description:
      'Ô nhập cho nội dung dài nhiều dòng, thường kèm bộ đếm ký tự và có thể tự giãn chiều cao theo nội dung.',
    purpose:
      'Dùng cho ghi chú, mô tả, lý do từ chối, phản hồi — những nội dung không có cấu trúc cố định và có thể dài quá một dòng.',
    states: [
      { name: 'Default', note: 'Cao 3–5 dòng để gợi ý người dùng viết dài được.' },
      { name: 'Focus', note: 'Viền nhấn, thường hiện bộ đếm ký tự.' },
      { name: 'Near limit', note: 'Bộ đếm chuyển màu cảnh báo khi gần chạm giới hạn.' },
      { name: 'Error', note: 'Vượt giới hạn hoặc bỏ trống trường bắt buộc.' },
    ],
    dos: [
      'Cho chiều cao mặc định đủ lớn để thấy được vài dòng.',
      'Hiện bộ đếm nếu có giới hạn ký tự.',
      'Cho phép kéo giãn (resize) trên web.',
    ],
    donts: [
      'Không dùng cho dữ liệu một dòng như tên hoặc email.',
      'Không chặn cứng khi vượt giới hạn mà không nói trước.',
    ],
    demo: () => <TextareaDemo />,
    code: `<label htmlFor="note">Ghi chú</label>
<textarea id="note" rows={4} maxLength={120}
  value={value} onChange={(e) => setValue(e.target.value)} />
<p className="hint">{value.length}/120 ký tự</p>`,
  },
  {
    id: 'password-input',
    nameEn: 'Password Field',
    nameVi: 'Ô mật khẩu',
    aliases: ['password', 'ô nhập mật khẩu'],
    category: 'input',
    platforms: ['web', 'mobile'],
    description:
      'Ô nhập che ký tự, thường có nút hiện/ẩn và thanh đo độ mạnh mật khẩu khi đăng ký.',
    purpose:
      'Dùng cho mật khẩu, mã PIN, mã bí mật — bất cứ giá trị nào không nên hiển thị trên màn hình trước mặt người khác.',
    states: [
      { name: 'Masked', note: 'Mặc định — ký tự bị che.' },
      { name: 'Revealed', note: 'Người dùng chủ động bấm nút hiện.' },
      { name: 'Strength', note: 'Yếu / Khá / Mạnh — chỉ hiện ở màn đăng ký.' },
      { name: 'Error', note: 'Sai mật khẩu, hoặc không đạt yêu cầu độ phức tạp.' },
    ],
    dos: [
      'Luôn có nút hiện/ẩn — gõ mù là nguyên nhân lỗi đăng nhập số 1.',
      'Nói trước yêu cầu độ phức tạp, đừng để người dùng đoán.',
      'Cho phép dán (paste) để trình quản lý mật khẩu hoạt động.',
    ],
    donts: [
      'Không chặn dán mật khẩu.',
      'Không báo lỗi kiểu “sai tên đăng nhập hoặc mật khẩu” rồi xoá sạch ô.',
      'Không giới hạn độ dài tối đa quá ngắn.',
    ],
    demo: () => <PasswordDemo />,
    code: `<input
  type={show ? 'text' : 'password'}
  value={value}
  onChange={(e) => setValue(e.target.value)}
  autoComplete="current-password"
/>
<button type="button" onClick={() => setShow((s) => !s)}>
  {show ? 'Ẩn' : 'Hiện'}
</button>`,
  },
  {
    id: 'number-stepper',
    nameEn: 'Number Input / Stepper',
    nameVi: 'Ô nhập số / Nút tăng giảm',
    aliases: ['spinner', 'quantity', 'số lượng', 'stepper'],
    category: 'input',
    platforms: ['web', 'mobile'],
    description:
      'Ô nhập số kèm hai nút − và + để tăng giảm từng bước. Trên mobile nên bật bàn phím số (inputMode="numeric").',
    purpose:
      'Dùng cho số lượng, số suất, số người — các con số nhỏ mà người dùng hay chỉnh ±1. Với số lớn (doanh thu, giá) thì bỏ nút bấm, chỉ để ô nhập.',
    states: [
      { name: 'Default', note: 'Giá trị mặc định hợp lý, thường là 1.' },
      { name: 'Min reached', note: 'Nút − bị vô hiệu khi chạm giá trị nhỏ nhất.' },
      { name: 'Max reached', note: 'Nút + bị vô hiệu khi chạm tồn kho / hạn mức.' },
      { name: 'Invalid', note: 'Người dùng gõ chữ hoặc số ngoài khoảng cho phép.' },
    ],
    dos: [
      'Cho phép gõ trực tiếp, đừng bắt bấm + 50 lần.',
      'Vô hiệu nút thay vì để bấm rồi báo lỗi.',
      'Định dạng số có phân cách hàng nghìn khi hiển thị.',
    ],
    donts: [
      'Không dùng stepper cho khoảng giá trị rộng (0–10.000).',
      'Không để nút bấm quá nhỏ trên mobile (tối thiểu 44×44px).',
    ],
    demo: () => <NumberStepperDemo />,
    code: `<button onClick={() => setQty((q) => Math.max(0, q - 1))} disabled={qty === 0}>−</button>
<input inputMode="numeric" value={qty}
  onChange={(e) => setQty(Number(e.target.value.replace(/\\D/g, '')) || 0)} />
<button onClick={() => setQty((q) => q + 1)}>+</button>`,
  },
  {
    id: 'search-input',
    nameEn: 'Search Field',
    nameVi: 'Ô tìm kiếm',
    aliases: ['search bar', 'thanh tìm kiếm'],
    category: 'input',
    platforms: ['web', 'mobile'],
    description:
      'Ô nhập chuyên cho tìm kiếm: có icon kính lúp, nút xoá nhanh, và thường lọc kết quả ngay khi gõ (live search) thay vì đợi bấm Enter.',
    purpose:
      'Dùng khi danh sách dài tới mức cuộn tay không còn hợp lý (khoảng trên 20 mục). Là cách nhanh nhất để người dùng tự thu hẹp dữ liệu.',
    states: [
      { name: 'Empty', note: 'Chỉ có placeholder gợi ý tìm được cái gì.' },
      { name: 'Typing', note: 'Kết quả lọc dần theo từng ký tự.' },
      { name: 'Loading', note: 'Nếu tìm ở server — hiện spinner nhỏ trong ô.' },
      { name: 'No results', note: 'Nói rõ đã tìm từ khoá nào và gợi ý cách khác.' },
    ],
    dos: [
      'Hiện nút ✕ để xoá nhanh từ khoá.',
      'Trì hoãn gọi API khoảng 250–300ms (debounce) khi tìm ở server.',
      'Cho tìm cả tên tiếng Việt lẫn tiếng Anh, bỏ dấu vẫn ra.',
    ],
    donts: [
      'Không bắt bấm nút “Tìm” nếu dữ liệu đã có sẵn ở máy khách.',
      'Không hiện màn hình trắng khi không có kết quả.',
    ],
    demo: () => <SearchDemo />,
    code: `<input
  type="search"
  placeholder="Tìm sản phẩm…"
  value={q}
  onChange={(e) => setQ(e.target.value)}
  aria-label="Tìm sản phẩm"
/>`,
  },
  {
    id: 'date-picker',
    nameEn: 'Date Picker',
    nameVi: 'Bộ chọn ngày',
    aliases: ['calendar', 'lịch', 'date range', 'chọn ngày'],
    category: 'input',
    platforms: ['web', 'mobile'],
    description:
      'Ô chọn ngày (hoặc khoảng ngày) qua một tấm lịch bung ra. Thường kèm các nút tắt: Hôm nay, Hôm qua, 7 ngày, Tháng này.',
    purpose:
      'Dùng cho ngày báo cáo, ngày hiệu lực, khoảng thời gian lọc. Có lịch giúp người dùng thấy thứ trong tuần và tránh sai định dạng ngày/tháng.',
    states: [
      { name: 'Collapsed', note: 'Chỉ hiện ngày đã chọn dạng chữ.' },
      { name: 'Open', note: 'Lịch bung ra, ngày hôm nay được đánh dấu.' },
      { name: 'Range', note: 'Chọn 2 điểm — bôi màu khoảng ở giữa.' },
      { name: 'Disabled dates', note: 'Ngày ngoài phạm vi cho phép bị mờ.' },
    ],
    dos: [
      'Ghi rõ định dạng ngày đang dùng (dd/mm/yyyy).',
      'Cho gõ tay ngày, không bắt buộc phải bấm lịch.',
      'Đặt sẵn các lựa chọn nhanh hay dùng nhất.',
    ],
    donts: [
      'Không cho chọn ngày vô lý (ngày kết thúc trước ngày bắt đầu).',
      'Không dùng lịch để chọn năm sinh — dùng ô nhập nhanh hơn nhiều.',
    ],
    nativeNames: { ios: 'UIDatePicker', android: 'MaterialDatePicker' },
    demo: () => <DatePickerDemo />,
    code: `<input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
{/* Nút tắt hay dùng */}
<button onClick={() => setDate(today())}>Hôm nay</button>`,
  },
  {
    id: 'checkbox',
    nameEn: 'Checkbox',
    nameVi: 'Ô đánh dấu',
    aliases: ['tick box', 'chọn nhiều', 'tích chọn'],
    category: 'selection',
    platforms: ['web', 'mobile'],
    description:
      'Ô vuông tích chọn cho phép chọn nhiều mục độc lập nhau. Ô “Tất cả” ở cấp cha có thêm trạng thái nửa vời (indeterminate) khi con chỉ chọn một phần.',
    purpose:
      'Dùng khi các lựa chọn không loại trừ nhau, hoặc cho một câu hỏi bật/tắt trong biểu mẫu cần bấm Lưu (khác Switch — Switch áp dụng ngay).',
    states: [
      { name: 'Unchecked', note: 'Chưa chọn.' },
      { name: 'Checked', note: 'Đã chọn.' },
      { name: 'Indeterminate', note: 'Cha có con chọn một phần — hiện dấu gạch.' },
      { name: 'Disabled', note: 'Không được phép đổi.' },
      { name: 'Error', note: 'Trường bắt buộc (vd: chưa đồng ý điều khoản).' },
    ],
    dos: [
      'Cho bấm được cả vào phần chữ, không chỉ ô vuông.',
      'Viết nhãn ở thể khẳng định (“Nhận email”, không phải “Không nhận email”).',
      'Nhóm các lựa chọn liên quan trong một fieldset có tiêu đề.',
    ],
    donts: [
      'Không dùng checkbox cho lựa chọn loại trừ nhau (dùng Radio).',
      'Không tự động lưu ngay khi tích, trừ khi đó là bộ lọc.',
    ],
    demo: () => <CheckboxDemo />,
    code: `<label>
  <input type="checkbox" checked={checked.includes(item)}
    onChange={() => toggle(item)} />
  {item}
</label>

{/* Ô cha nửa vời */}
<input type="checkbox" checked={all}
  ref={(el) => { if (el) el.indeterminate = some && !all }} />`,
  },
  {
    id: 'radio-group',
    nameEn: 'Radio Group',
    nameVi: 'Nhóm nút chọn một',
    aliases: ['radio button', 'chọn một', 'option button'],
    category: 'selection',
    platforms: ['web', 'mobile'],
    description:
      'Nhóm nút tròn mà chọn cái này thì tự bỏ cái kia. Toàn bộ lựa chọn hiện ra cùng lúc nên người dùng so sánh được ngay.',
    purpose:
      'Dùng khi chỉ được chọn 1 trong 2–6 lựa chọn và người dùng cần thấy hết để cân nhắc: hình thức thanh toán, loại hợp đồng, mức ưu tiên.',
    states: [
      { name: 'Unselected', note: 'Vòng tròn rỗng.' },
      { name: 'Selected', note: 'Có chấm ở giữa — luôn chỉ 1 mục trong nhóm.' },
      { name: 'Disabled', note: 'Lựa chọn tồn tại nhưng chưa dùng được.' },
      { name: 'Error', note: 'Bắt buộc chọn mà chưa chọn.' },
    ],
    dos: [
      'Đặt sẵn một lựa chọn mặc định an toàn nếu có thể.',
      'Thêm dòng giải thích ngắn dưới mỗi lựa chọn khi cần.',
      'Xếp dọc — dễ đọc và ít nhầm hơn xếp ngang.',
    ],
    donts: [
      'Không dùng khi có trên ~7 lựa chọn (chuyển sang Select).',
      'Không để nhóm radio không có lựa chọn nào mà cũng không có cách bỏ chọn.',
    ],
    demo: () => <RadioDemo />,
    code: `<fieldset>
  <legend>Hình thức thanh toán</legend>
  {options.map((o) => (
    <label key={o.id}>
      <input type="radio" name="pay" checked={value === o.id}
        onChange={() => setValue(o.id)} />
      {o.label}
    </label>
  ))}
</fieldset>`,
  },
  {
    id: 'switch',
    nameEn: 'Toggle Switch',
    nameVi: 'Công tắc gạt',
    aliases: ['toggle', 'switch', 'gạt bật tắt'],
    category: 'selection',
    platforms: ['web', 'mobile'],
    description:
      'Công tắc gạt hai trạng thái bật/tắt, có hiệu ứng trượt. Khác biệt cốt lõi so với Checkbox: Switch có hiệu lực ngay lập tức.',
    purpose:
      'Dùng trong màn hình Cài đặt và các thiết lập áp dụng tức thì: bật thông báo, chế độ tối, kích hoạt tài khoản.',
    states: [
      { name: 'Off', note: 'Nút tròn nằm trái, nền xám.' },
      { name: 'On', note: 'Nút tròn nằm phải, nền màu nhấn.' },
      { name: 'Pending', note: 'Đang gọi API — hiện spinner, khoá tạm thao tác.' },
      { name: 'Disabled', note: 'Không đủ quyền để đổi.' },
    ],
    dos: [
      'Đặt nhãn bên trái, công tắc canh phải — chuẩn của app cài đặt.',
      'Nhãn mô tả cái được bật, không phải hành động ("Nhận thông báo").',
      'Nếu lưu thất bại, tự gạt trở lại và báo lỗi.',
    ],
    donts: [
      'Không đặt Switch trong form có nút Lưu — dễ hiểu nhầm (dùng Checkbox).',
      'Không dùng Switch cho hành động phá huỷ (xoá tài khoản).',
    ],
    nativeNames: { ios: 'UISwitch', android: 'Switch / MaterialSwitch' },
    demo: () => <SwitchDemo />,
    code: `<label className="switch">
  <span>Nhận thông báo</span>
  <input type="checkbox" role="switch"
    checked={on} onChange={() => setOn((v) => !v)} />
  <span className="switch-track" />
</label>`,
  },
  {
    id: 'select',
    nameEn: 'Select / Dropdown',
    nameVi: 'Danh sách xổ xuống',
    aliases: ['dropdown', 'combo', 'menu xổ', 'picker'],
    category: 'selection',
    platforms: ['web', 'mobile'],
    description:
      'Ô đóng lại chỉ hiện giá trị đang chọn, bấm vào thì xổ danh sách lựa chọn. Tiết kiệm chỗ nhưng che mất các lựa chọn khác.',
    purpose:
      'Dùng khi số lựa chọn nhiều hơn mức Radio kham nổi (7+) nhưng vẫn hữu hạn và người dùng đã biết mình muốn gì.',
    states: [
      { name: 'Placeholder', note: 'Chưa chọn — hiện “— Chọn… —”.' },
      { name: 'Open', note: 'Danh sách xổ xuống, mục đang chọn được đánh dấu.' },
      { name: 'Selected', note: 'Hiện giá trị đã chọn.' },
      { name: 'Disabled', note: 'Khoá, thường vì phụ thuộc ô khác chưa chọn.' },
      { name: 'Error', note: 'Bắt buộc mà bỏ trống.' },
    ],
    dos: [
      'Sắp xếp có logic: theo tần suất dùng, theo bảng chữ cái, hoặc theo nhóm.',
      'Trên mobile để trình duyệt dùng picker gốc — quen tay hơn.',
      'Có mục rỗng rõ ràng nếu được phép không chọn.',
    ],
    donts: [
      'Không dùng cho danh sách trên ~15 mục nếu không có ô tìm.',
      'Không dùng cho 2 lựa chọn (dùng Radio hoặc Switch).',
    ],
    nativeNames: { ios: 'UIPickerView', android: 'Spinner / ExposedDropdownMenu' },
    demo: () => <SelectDemo />,
    code: `<label htmlFor="branch">Chi nhánh</label>
<select id="branch" value={v} onChange={(e) => setV(e.target.value)}>
  <option value="">— Chọn chi nhánh —</option>
  <option value="a">Chi nhánh Quận 1</option>
</select>`,
  },
  {
    id: 'combobox',
    nameEn: 'Combobox / Searchable Select',
    nameVi: 'Danh sách gõ để tìm',
    aliases: ['autocomplete', 'typeahead', 'select có tìm kiếm'],
    category: 'selection',
    platforms: ['web', 'mobile'],
    description:
      'Lai giữa ô nhập và danh sách xổ: người dùng gõ vài ký tự để lọc, rồi chọn một mục trong danh sách rút gọn. Điều hướng được bằng ↑ ↓ Enter Esc.',
    purpose:
      'Dùng khi danh sách dài (hàng chục đến hàng nghìn mục): danh mục nhân viên, mã hàng, đối tác, tỉnh/thành. Đây nên là mặc định cho mọi bộ lọc có nhiều giá trị.',
    states: [
      { name: 'Idle', note: 'Hiện giá trị đã chọn, có nút ✕ để bỏ chọn.' },
      { name: 'Typing', note: 'Danh sách thu hẹp theo từ khoá, có làm nổi phần khớp.' },
      { name: 'Highlighted', note: 'Mục đang được ↑↓ trỏ tới.' },
      { name: 'No match', note: 'Không có kết quả — có thể cho tạo mới.' },
      { name: 'Loading', note: 'Đang tải gợi ý từ server.' },
    ],
    dos: [
      'Hỗ trợ đầy đủ bàn phím: ↑ ↓ để chọn, Enter xác nhận, Esc đóng.',
      'Tìm được cả khi bỏ dấu tiếng Việt.',
      'Giữ nguyên lựa chọn cũ nếu người dùng bấm ra ngoài mà không chọn gì.',
    ],
    donts: [
      'Không xoá lựa chọn hiện tại ngay khi người dùng vừa bấm vào ô.',
      'Không bắt gõ đúng chính xác — nên khớp gần đúng.',
    ],
    demo: () => <SearchableSelectDemo />,
    code: `<input role="combobox" aria-expanded={open}
  value={open ? q : value}
  onFocus={() => setOpen(true)}
  onChange={(e) => { setQ(e.target.value); setOpen(true) }} />

{open && (
  <ul role="listbox">
    {hits.map((o) => (
      <li role="option" key={o} aria-selected={o === value}
        onMouseDown={() => select(o)}>{o}</li>
    ))}
  </ul>
)}`,
  },
  {
    id: 'tag-input',
    nameEn: 'Tag Input / Multi-select Chips',
    nameVi: 'Ô nhập thẻ (chọn nhiều)',
    aliases: ['chips input', 'token input', 'multi select'],
    category: 'selection',
    platforms: ['web', 'mobile'],
    description:
      'Ô nhập mà mỗi giá trị đã chọn biến thành một “thẻ” (chip) có nút ✕ để bỏ. Enter để thêm thẻ mới.',
    purpose:
      'Dùng khi cần chọn nhiều giá trị nhưng danh sách quá dài để dùng checkbox: người nhận email, nhãn phân loại, danh mục áp dụng.',
    states: [
      { name: 'Empty', note: 'Chỉ có placeholder hướng dẫn cách thêm.' },
      { name: 'Has tags', note: 'Các thẻ xếp trước con trỏ nhập.' },
      { name: 'Duplicate', note: 'Gõ trùng — nháy thẻ đã có thay vì thêm mới.' },
      { name: 'Max reached', note: 'Đạt giới hạn số thẻ, khoá ô nhập.' },
    ],
    dos: [
      'Cho phép Backspace ở ô rỗng để xoá thẻ cuối.',
      'Gợi ý sẵn danh sách khi bấm vào, đừng bắt nhớ.',
      'Cho dán một chuỗi phân tách bằng dấu phẩy để thêm hàng loạt.',
    ],
    donts: [
      'Không để thẻ tràn ra ngoài ô — phải xuống dòng.',
      'Không dùng khi số lựa chọn ít (dùng Checkbox rõ ràng hơn).',
    ],
    demo: () => <TagInputDemo />,
    code: `<div className="tag-field">
  {tags.map((t) => (
    <span className="chip" key={t}>
      {t} <button onClick={() => remove(t)} aria-label={\`Bỏ \${t}\`}>✕</button>
    </span>
  ))}
  <input value={draft} onChange={(e) => setDraft(e.target.value)}
    onKeyDown={(e) => e.key === 'Enter' && add(draft)} />
</div>`,
  },
  {
    id: 'slider',
    nameEn: 'Slider / Range',
    nameVi: 'Thanh trượt',
    aliases: ['range', 'thanh kéo', 'seek bar'],
    category: 'selection',
    platforms: ['web', 'mobile'],
    description:
      'Thanh kéo để chọn một giá trị (hoặc một khoảng, với hai tay cầm) trên một dải liên tục. Luôn hiện con số hiện tại.',
    purpose:
      'Dùng khi giá trị chính xác không quan trọng bằng cảm giác tương đối: âm lượng, độ sáng, khoảng giá lọc, tỷ lệ phần trăm.',
    states: [
      { name: 'Default', note: 'Tay cầm ở giá trị hiện tại.' },
      { name: 'Dragging', note: 'Hiện tooltip giá trị ngay trên tay cầm.' },
      { name: 'Range', note: 'Hai tay cầm, đoạn giữa được tô màu.' },
      { name: 'Disabled', note: 'Xám, không kéo được.' },
    ],
    dos: [
      'Luôn hiện giá trị bằng số bên cạnh.',
      'Đặt bước nhảy (step) hợp lý, đừng để 0.01.',
      'Cho phép dùng phím ← → để chỉnh chính xác.',
    ],
    donts: [
      'Không dùng khi cần con số chính xác (dùng ô nhập số).',
      'Không để tay cầm quá nhỏ trên mobile.',
    ],
    demo: () => <SliderDemo />,
    code: `<label htmlFor="dis">Tỷ lệ chiết khấu: <strong>{v}%</strong></label>
<input id="dis" type="range" min={0} max={100} step={5}
  value={v} onChange={(e) => setV(Number(e.target.value))} />`,
  },
  {
    id: 'segmented-control',
    nameEn: 'Segmented Control',
    nameVi: 'Nút chọn theo đoạn',
    aliases: ['toggle group', 'button group chọn', 'tab pill'],
    category: 'selection',
    platforms: ['web', 'mobile'],
    description:
      'Một dải 2–4 nút dính liền nhau, luôn có đúng một nút đang được chọn. Về mặt logic nó chính là Radio nhưng gọn và bấm nhanh hơn.',
    purpose:
      'Dùng để đổi cách xem cùng một dữ liệu: Ngày/Tuần/Tháng, Danh sách/Lưới, Tất cả/Chưa xử lý. Chọn xong là đổi ngay, không cần bấm Áp dụng.',
    states: [
      { name: 'Selected', note: 'Nền nổi lên, chữ đậm.' },
      { name: 'Unselected', note: 'Nền chìm, chữ mờ hơn.' },
      { name: 'Disabled', note: 'Đoạn không khả dụng với dữ liệu hiện tại.' },
    ],
    dos: [
      'Giữ tối đa 4 đoạn — nhiều hơn thì dùng Select hoặc Tabs.',
      'Nhãn ngắn, độ dài tương đương nhau.',
      'Luôn có một đoạn được chọn sẵn.',
    ],
    donts: [
      'Không dùng để điều hướng sang trang khác (đó là Tabs).',
      'Không cho phép bỏ chọn hết.',
    ],
    nativeNames: { ios: 'UISegmentedControl', android: 'MaterialButtonToggleGroup' },
    demo: () => <SegmentedDemo />,
    code: `<div className="seg" role="group">
  {opts.map((o) => (
    <button key={o} aria-pressed={v === o} onClick={() => setV(o)}>{o}</button>
  ))}
</div>`,
  },
  {
    id: 'rating',
    nameEn: 'Rating',
    nameVi: 'Chấm điểm sao',
    aliases: ['star rating', 'đánh giá', 'sao'],
    category: 'selection',
    platforms: ['web', 'mobile'],
    description:
      'Dãy biểu tượng (thường là 5 ngôi sao) để chấm điểm, có xem trước khi rê chuột. Ở chế độ chỉ đọc thì dùng để hiển thị điểm trung bình.',
    purpose:
      'Dùng để thu thập hoặc hiển thị mức độ hài lòng: đánh giá món ăn, chất lượng phục vụ, mức độ ưu tiên.',
    states: [
      { name: 'Empty', note: 'Chưa chấm — tất cả sao xám.' },
      { name: 'Hover', note: 'Xem trước số sao sẽ chọn.' },
      { name: 'Rated', note: 'Đã chấm, có thể sửa lại.' },
      { name: 'Read-only', note: 'Hiển thị điểm trung bình, có nửa sao.' },
    ],
    dos: [
      'Ghi kèm con số và tổng lượt đánh giá.',
      'Cho phép sửa lại điểm đã chấm.',
      'Có nhãn cho từng mức khi cần rõ nghĩa (1 = Rất tệ).',
    ],
    donts: [
      'Không dùng thang lẻ khó hiểu (1–7) mà không giải thích.',
      'Không bắt buộc chấm sao mới cho gửi phản hồi.',
    ],
    demo: () => <RatingDemo />,
    code: `{[1, 2, 3, 4, 5].map((n) => (
  <button key={n} aria-label={\`\${n} sao\`}
    onClick={() => setV(n)}
    onMouseEnter={() => setHover(n)}
    onMouseLeave={() => setHover(0)}
    className={n <= (hover || v) ? 'star is-on' : 'star'}>★</button>
))}`,
  },
]
