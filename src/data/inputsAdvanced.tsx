/* eslint-disable react-refresh/only-export-components -- demo components được đặt cạnh dữ liệu catalog cho dễ đối chiếu */
import { useRef, useState } from 'react'
import type { CatalogEntry } from '../types'

/* -------------------------------------------------------------------------- */
/* Demos                                                                       */
/* -------------------------------------------------------------------------- */

function OtpDemo() {
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const filled = digits.every((d) => d !== '')

  const setAt = (i: number, v: string) => {
    const next = [...digits]
    next[i] = v
    setDigits(next)
  }

  return (
    <div className="d-stack" style={{ alignItems: 'center' }}>
      <span className="d-label">Nhập mã 6 số vừa gửi tới ****789</span>
      <div className="d-row" style={{ gap: 7, justifyContent: 'center' }}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el
            }}
            className="d-field"
            inputMode="numeric"
            maxLength={1}
            value={d}
            aria-label={`Số thứ ${i + 1}`}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, '')
              if (!raw) return setAt(i, '')
              // Dán cả mã vào ô đầu: rải ra các ô còn lại.
              if (raw.length > 1) {
                const next = [...digits]
                raw.split('').forEach((c, k) => {
                  if (i + k < 6) next[i + k] = c
                })
                setDigits(next)
                refs.current[Math.min(i + raw.length, 5)]?.focus()
                return
              }
              setAt(i, raw)
              if (i < 5) refs.current[i + 1]?.focus()
            }}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus()
            }}
            style={{
              width: 42,
              height: 50,
              padding: 0,
              fontSize: 20,
              fontWeight: 600,
              textAlign: 'center',
            }}
          />
        ))}
      </div>
      <p className="d-hint" style={{ margin: 0 }}>
        {filled ? '✓ Đang xác thực…' : 'Gửi lại mã sau 00:42'}
      </p>
    </div>
  )
}

function CurrencyDemo() {
  const [raw, setRaw] = useState('182400000')
  const formatted = raw ? Number(raw).toLocaleString('vi-VN') : ''
  return (
    <div className="d-panel d-stack">
      <div>
        <label className="d-label" htmlFor="cur">
          Doanh thu tiền mặt
        </label>
        <div style={{ position: 'relative' }}>
          <input
            id="cur"
            className="d-field"
            inputMode="numeric"
            value={formatted}
            onChange={(e) => setRaw(e.target.value.replace(/\D/g, ''))}
            style={{ paddingRight: 38, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}
          />
          <span
            style={{
              position: 'absolute',
              right: 11,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--fg-subtle)',
            }}
          >
            đ
          </span>
        </div>
        <p className="d-hint">
          {raw ? `≈ ${(Number(raw) / 1_000_000).toFixed(1)} triệu đồng` : 'Chưa nhập'}
        </p>
      </div>
      <div className="d-row">
        {[1_000_000, 10_000_000, 100_000_000].map((n) => (
          <button
            key={n}
            type="button"
            className="d-btn is-secondary is-sm"
            onClick={() => setRaw(String(Number(raw || 0) + n))}
          >
            +{(n / 1_000_000).toLocaleString('vi-VN')}tr
          </button>
        ))}
      </div>
    </div>
  )
}

function TimePickerDemo() {
  const [time, setTime] = useState('17:00')
  return (
    <div className="d-panel d-stack">
      <div>
        <label className="d-label" htmlFor="tp">
          Hạn chót nộp báo cáo
        </label>
        <input
          id="tp"
          className="d-field"
          type="time"
          step={900}
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <p className="d-hint">Bước nhảy 15 phút · giờ 24h</p>
      </div>
      <div className="d-row">
        {['08:00', '12:00', '17:00', '22:00'].map((t) => (
          <button
            key={t}
            type="button"
            className={`d-btn is-sm${t === time ? '' : ' is-secondary'}`}
            onClick={() => setTime(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}

function ColorPickerDemo() {
  const swatches = ['#4f46e5', '#0f8a4d', '#cd2b2b', '#a86212', '#1f6fb2', '#7c3aed']
  const [color, setColor] = useState('#4f46e5')
  return (
    <div className="d-panel d-stack">
      <span className="d-label">Màu nhận diện của chi nhánh</span>
      <div className="d-row">
        {swatches.map((s) => (
          <button
            key={s}
            type="button"
            aria-label={s}
            aria-pressed={s === color}
            onClick={() => setColor(s)}
            style={{
              width: 30,
              height: 30,
              padding: 0,
              borderRadius: 8,
              border: s === color ? '2px solid var(--fg)' : '1px solid var(--border)',
              background: s,
              cursor: 'pointer',
            }}
          />
        ))}
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          aria-label="Chọn màu tuỳ ý"
          style={{
            width: 30,
            height: 30,
            padding: 0,
            border: '1px solid var(--border)',
            borderRadius: 8,
            background: 'none',
            cursor: 'pointer',
          }}
        />
      </div>
      <div className="d-row" style={{ gap: 10 }}>
        <input
          className="d-field"
          value={color.toUpperCase()}
          onChange={(e) => setColor(e.target.value)}
          style={{ width: 110, fontFamily: 'ui-monospace, monospace' }}
          aria-label="Mã màu HEX"
        />
        <span
          style={{
            padding: '6px 12px',
            borderRadius: 999,
            background: color,
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Xem thử
        </span>
      </div>
    </div>
  )
}

function RichTextDemo() {
  const [html, setHtml] = useState(
    '<b>Lý do từ chối:</b> số liệu tiền mặt không khớp với sổ quỹ.',
  )
  const ref = useRef<HTMLDivElement>(null)
  const exec = (cmd: string) => {
    ref.current?.focus()
    document.execCommand(cmd)
    setHtml(ref.current?.innerHTML ?? '')
  }
  return (
    <div className="d-panel">
      <span className="d-label">Nội dung phản hồi</span>
      <div className="d-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div
          className="d-row"
          style={{ gap: 2, padding: 5, borderBottom: '1px solid var(--border)' }}
        >
          {[
            { cmd: 'bold', label: 'B', style: { fontWeight: 800 } },
            { cmd: 'italic', label: 'I', style: { fontStyle: 'italic' } },
            { cmd: 'underline', label: 'U', style: { textDecoration: 'underline' } },
            { cmd: 'insertUnorderedList', label: '•—', style: {} },
          ].map((b) => (
            <button
              key={b.cmd}
              type="button"
              className="icon-btn"
              style={{ width: 30, height: 28, ...b.style }}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec(b.cmd)}
              aria-label={b.cmd}
            >
              {b.label}
            </button>
          ))}
        </div>
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          aria-label="Nội dung phản hồi"
          onInput={(e) => setHtml(e.currentTarget.innerHTML)}
          dangerouslySetInnerHTML={{ __html: html }}
          style={{ minHeight: 88, padding: 11, outline: 'none', fontSize: 14 }}
        />
      </div>
      <p className="d-hint">Bôi đen chữ rồi bấm B / I / U.</p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Entries                                                                     */
/* -------------------------------------------------------------------------- */

export const inputsAdvancedEntries: CatalogEntry[] = [
  {
    id: 'otp-input',
    nameEn: 'OTP / Verification Code Input',
    nameVi: 'Ô nhập mã xác thực',
    aliases: ['otp', 'pin code', 'mã otp', 'verification code', 'mã xác minh'],
    category: 'input',
    platforms: ['web', 'mobile'],
    description:
      'Dãy 4–6 ô, mỗi ô một chữ số, con trỏ tự nhảy sang ô kế khi gõ và lùi lại khi bấm Backspace. Dán cả mã vào ô đầu thì tự rải ra các ô còn lại.',
    purpose:
      'Dùng cho mã OTP gửi qua SMS/email, mã PIN, mã xác nhận giao dịch — tách từng ký tự giúp người dùng đọc-nhập theo nhịp và dễ phát hiện gõ nhầm.',
    states: [
      { name: 'Empty', note: 'Con trỏ nằm ở ô đầu tiên ngay khi mở màn hình.' },
      { name: 'Typing', note: 'Tự nhảy ô, ô đang nhập có viền nhấn.' },
      { name: 'Complete', note: 'Đủ số — tự động gửi đi, không cần bấm nút.' },
      { name: 'Error', note: 'Sai mã — toàn bộ ô viền đỏ, có hiệu ứng lắc, xoá sạch để nhập lại.' },
      { name: 'Expired', note: 'Hết hạn — hiện nút “Gửi lại mã”.' },
    ],
    dos: [
      'Cho dán nguyên mã 6 số vào ô đầu.',
      'Bật autocomplete="one-time-code" để iOS/Android tự điền từ SMS.',
      'Đếm ngược thời gian được gửi lại mã.',
    ],
    donts: [
      'Không bắt bấm nút Xác nhận khi đã đủ số.',
      'Không xoá mã người dùng vừa gõ khi mạng lỗi tạm thời.',
      'Không dùng type="password" — người dùng cần nhìn thấy mã để đối chiếu.',
    ],
    demo: () => <OtpDemo />,
    code: `{digits.map((d, i) => (
  <input key={i} ref={(el) => (refs.current[i] = el)}
    inputMode="numeric" maxLength={1} value={d}
    autoComplete="one-time-code"
    aria-label={\`Số thứ \${i + 1}\`}
    onChange={(e) => handleChange(i, e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus()
    }} />
))}`,
  },
  {
    id: 'currency-input',
    nameEn: 'Currency / Formatted Number Input',
    nameVi: 'Ô nhập tiền',
    aliases: ['money input', 'ô nhập số tiền', 'amount', 'định dạng số'],
    category: 'input',
    platforms: ['web', 'mobile'],
    description:
      'Ô nhập số tự chèn dấu phân cách hàng nghìn ngay khi gõ, có ký hiệu tiền tệ cố định và căn phải. Giá trị lưu vào hệ thống là số thuần, không phải chuỗi đã định dạng.',
    purpose:
      'Dùng cho mọi trường tiền: doanh thu, chi phí, đơn giá, hạn mức. Định dạng ngay khi gõ giúp người dùng đếm số 0 mà không phải nhẩm — chống sai lệch 10 lần.',
    states: [
      { name: 'Empty', note: 'Hiện 0 hoặc placeholder, không hiện ký hiệu lơ lửng.' },
      { name: 'Typing', note: 'Dấu chấm hàng nghìn chèn theo từng ký tự.' },
      { name: 'Blurred', note: 'Chuẩn hoá về đúng số chữ số thập phân.' },
      { name: 'Over limit', note: 'Vượt hạn mức — báo lỗi kèm con số trần.' },
      { name: 'Negative', note: 'Số âm — màu đỏ hoặc bọc trong ngoặc đơn.' },
    ],
    dos: [
      'Căn phải và dùng chữ số đều nhau (tabular-nums) để cột số thẳng hàng.',
      'Hiện dòng đọc-hiểu bên dưới: “≈ 182,4 triệu đồng”.',
      'Bật bàn phím số trên mobile (inputMode="numeric").',
      'Cho nút cộng nhanh nếu người dùng nhập số tròn thường xuyên.',
    ],
    donts: [
      'Không lưu chuỗi đã định dạng xuống cơ sở dữ liệu.',
      'Không dùng <input type="number"> cho tiền — không định dạng được và dễ lăn chuột làm sai số.',
      'Không đổi vị trí con trỏ về cuối khi người dùng đang sửa ở giữa.',
    ],
    demo: () => <CurrencyDemo />,
    code: `const formatted = raw ? Number(raw).toLocaleString('vi-VN') : ''

<input inputMode="numeric" value={formatted}
  onChange={(e) => setRaw(e.target.value.replace(/\\D/g, ''))}
  style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }} />
<span className="suffix">đ</span>`,
  },
  {
    id: 'time-picker',
    nameEn: 'Time Picker',
    nameVi: 'Bộ chọn giờ',
    aliases: ['chọn giờ', 'time input', 'giờ phút'],
    category: 'input',
    platforms: ['web', 'mobile'],
    description:
      'Ô chọn giờ–phút, thường có bước nhảy cố định (15/30 phút) và các mốc giờ hay dùng đặt sẵn thành nút bấm nhanh.',
    purpose:
      'Dùng cho giờ mở/đóng cửa, hạn chót, giờ vào ca. Đi kèm Date Picker khi cần một mốc thời gian đầy đủ.',
    states: [
      { name: 'Default', note: 'Giá trị mặc định hợp lý theo nghiệp vụ.' },
      { name: 'Open', note: 'Danh sách giờ xổ ra, cuộn tới giờ hiện tại.' },
      { name: 'Out of range', note: 'Ngoài khung giờ cho phép — mờ hoặc báo lỗi.' },
      { name: 'Cross-midnight', note: 'Ca đêm 22:00 → 06:00 — phải nói rõ là hôm sau.' },
    ],
    dos: [
      'Dùng giờ 24h cho app nội bộ — bỏ hẳn AM/PM cho đỡ nhầm.',
      'Đặt step hợp lý, ít khi cần chính xác tới từng phút.',
      'Nêu rõ múi giờ nếu hệ thống có nhiều vùng.',
    ],
    donts: [
      'Không bắt cuộn qua 60 phút để chọn — cho gõ tay.',
      'Không cho chọn giờ kết thúc trước giờ bắt đầu.',
    ],
    nativeNames: { ios: 'UIDatePicker (.time)', android: 'MaterialTimePicker' },
    demo: () => <TimePickerDemo />,
    code: `<input type="time" step={900} value={time}
  onChange={(e) => setTime(e.target.value)} />

{/* Mốc giờ hay dùng */}
{['08:00', '12:00', '17:00'].map((t) => (
  <button key={t} onClick={() => setTime(t)}>{t}</button>
))}`,
  },
  {
    id: 'color-picker',
    nameEn: 'Color Picker',
    nameVi: 'Bộ chọn màu',
    aliases: ['chọn màu', 'swatch', 'palette', 'color input'],
    category: 'input',
    platforms: ['web'],
    description:
      'Bộ chọn màu gồm hai tầng: một dải màu gợi ý sẵn (swatch) để bấm một phát là xong, và ô chọn tự do + ô nhập mã HEX cho trường hợp cần chính xác.',
    purpose:
      'Dùng khi người dùng phải gán màu cho một đối tượng: màu nhãn phân loại, màu nhận diện chi nhánh, màu đường trên biểu đồ.',
    states: [
      { name: 'Swatch selected', note: 'Ô màu đang chọn có viền đậm bao quanh.' },
      { name: 'Custom', note: 'Người dùng tự chọn màu ngoài dải gợi ý.' },
      { name: 'Invalid hex', note: 'Mã HEX sai định dạng — giữ nguyên màu cũ.' },
      { name: 'Low contrast', note: 'Cảnh báo khi màu chọn khó đọc trên nền.' },
    ],
    dos: [
      'Luôn có dải màu gợi ý — đa số người dùng chỉ cần bấm một cái.',
      'Hiện ô xem thử màu trên nền thật sẽ dùng.',
      'Cho nhập và copy mã HEX.',
    ],
    donts: [
      'Không để người dùng chọn màu chữ trùng màu nền.',
      'Không dùng màu làm cách duy nhất phân biệt trạng thái.',
    ],
    demo: () => <ColorPickerDemo />,
    code: `{swatches.map((s) => (
  <button key={s} aria-label={s} aria-pressed={s === color}
    onClick={() => setColor(s)} style={{ background: s }} />
))}
<input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
<input value={color.toUpperCase()} onChange={(e) => setColor(e.target.value)} />`,
  },
  {
    id: 'rich-text-editor',
    nameEn: 'Rich Text Editor / WYSIWYG',
    nameVi: 'Trình soạn thảo định dạng',
    aliases: ['wysiwyg', 'editor', 'soạn thảo', 'text editor'],
    category: 'input',
    platforms: ['web'],
    description:
      'Ô soạn thảo cho phép in đậm, in nghiêng, gạch chân, danh sách, chèn link — kết quả hiện đúng như khi hiển thị. Thanh công cụ nằm ngay trên vùng soạn.',
    purpose:
      'Dùng khi nội dung cần cấu trúc để đọc: thông báo nội bộ, mô tả sản phẩm, lý do từ chối dài. Nếu chỉ cần vài dòng chữ thuần thì Textarea gọn hơn nhiều.',
    states: [
      { name: 'Empty', note: 'Placeholder mờ trong vùng soạn.' },
      { name: 'Focused', note: 'Nút định dạng sáng lên theo vùng chữ đang chọn.' },
      { name: 'Active format', note: 'Nút B sáng khi con trỏ đang ở chữ in đậm.' },
      { name: 'Read-only', note: 'Ẩn thanh công cụ, chỉ hiện nội dung đã định dạng.' },
    ],
    dos: [
      'Giới hạn số nút định dạng — càng nhiều càng ít người dùng.',
      'Làm sạch HTML khi dán từ Word/Excel.',
      'Hỗ trợ phím tắt quen thuộc (Ctrl+B, Ctrl+I).',
      'Luôn lọc HTML ở phía server trước khi hiển thị lại (chống XSS).',
    ],
    donts: [
      'Không dùng cho trường chỉ cần chữ thuần.',
      'Không cho tuỳ chọn font và cỡ chữ tự do — sẽ phá vỡ thiết kế.',
      'Không lưu HTML thô chưa lọc xuống cơ sở dữ liệu.',
    ],
    demo: () => <RichTextDemo />,
    code: `<div className="toolbar">
  <button onMouseDown={(e) => e.preventDefault()} onClick={() => exec('bold')}>B</button>
  <button onMouseDown={(e) => e.preventDefault()} onClick={() => exec('italic')}>I</button>
</div>
<div contentEditable role="textbox" aria-multiline="true"
  onInput={(e) => setHtml(e.currentTarget.innerHTML)} />

{/* Bắt buộc: lọc HTML ở server trước khi render lại */}`,
  },
]
