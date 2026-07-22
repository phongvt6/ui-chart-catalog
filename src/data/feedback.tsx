/* eslint-disable react-refresh/only-export-components -- demo components được đặt cạnh dữ liệu catalog cho dễ đối chiếu */
import { useEffect, useState } from 'react'
import type { CatalogEntry } from '../types'

/* -------------------------------------------------------------------------- */
/* Demos                                                                       */
/* -------------------------------------------------------------------------- */

function AlertDemo() {
  return (
    <div className="d-stack d-panel">
      <div className="d-alert is-info">
        <span aria-hidden>ℹ</span>
        <span>
          <strong>Thông tin</strong>
          Số liệu ngày 21/07 đã chốt, không sửa được nữa.
        </span>
      </div>
      <div className="d-alert is-success">
        <span aria-hidden>✓</span>
        <span>
          <strong>Thành công</strong>
          Đã lưu báo cáo doanh thu ngày 22/07.
        </span>
      </div>
      <div className="d-alert is-warning">
        <span aria-hidden>⚠</span>
        <span>
          <strong>Cảnh báo</strong>
          Còn 2 chi nhánh chưa nộp số liệu — hạn chót 17:00 hôm nay.
        </span>
      </div>
      <div className="d-alert is-danger">
        <span aria-hidden>✕</span>
        <span>
          <strong>Lỗi</strong>
          Không lưu được: doanh thu tiền mặt không khớp với tổng.
        </span>
      </div>
    </div>
  )
}

function ToastDemo() {
  const [toasts, setToasts] = useState<{ id: number; text: string }[]>([])
  const push = () => {
    const id = performance.now()
    setToasts((t) => [...t, { id, text: 'Đã lưu báo cáo ngày 22/07.' }])
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }
  return (
    <div className="d-stagebox">
      <div className="d-stagebox-inner d-stack">
        <p className="d-muted">Bấm nút để bắn một thông báo nổi.</p>
        <button type="button" className="d-btn is-sm" onClick={push} style={{ alignSelf: 'start' }}>
          Lưu báo cáo
        </button>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 12,
          bottom: 12,
          left: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          pointerEvents: 'none',
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="d-card"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 12px',
              boxShadow: 'var(--shadow-md)',
              pointerEvents: 'auto',
            }}
          >
            <span style={{ color: 'var(--success)' }}>✓</span>
            <span style={{ flex: 1, fontSize: 13 }}>{t.text}</span>
            <button
              type="button"
              className="d-btn is-ghost is-sm"
              onClick={() => setToasts((x) => x.filter((y) => y.id !== t.id))}
            >
              Hoàn tác
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProgressDemo() {
  const [pct, setPct] = useState(35)
  useEffect(() => {
    const id = window.setInterval(() => setPct((p) => (p >= 100 ? 0 : p + 5)), 400)
    return () => window.clearInterval(id)
  }, [])
  return (
    <div className="d-panel d-stack">
      <div>
        <div className="d-row" style={{ justifyContent: 'space-between' }}>
          <span className="d-label" style={{ margin: 0 }}>
            Đang tải lên hoá đơn
          </span>
          <span className="d-muted">{pct}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{
            height: 8,
            marginTop: 6,
            borderRadius: 999,
            background: 'var(--surface-3)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: '100%',
              background: 'var(--accent)',
              transition: 'width 0.35s',
            }}
          />
        </div>
      </div>
      <div>
        <span className="d-label">Không xác định thời lượng (indeterminate)</span>
        <div
          style={{
            height: 8,
            borderRadius: 999,
            background: 'var(--surface-3)',
            overflow: 'hidden',
          }}
        >
          <div
            className="d-skeleton"
            style={{ width: '100%', height: '100%', borderRadius: 999 }}
          />
        </div>
      </div>
    </div>
  )
}

function SpinnerDemo() {
  return (
    <div className="d-row" style={{ gap: 26, justifyContent: 'center' }}>
      <div className="d-stack" style={{ alignItems: 'center', gap: 8 }}>
        <span className="d-spinner" />
        <span className="d-hint">Trong nút / ô nhỏ</span>
      </div>
      <div className="d-stack" style={{ alignItems: 'center', gap: 8 }}>
        <span className="d-spinner" style={{ width: 34, height: 34, borderWidth: 3.5 }} />
        <span className="d-hint">Toàn khối nội dung</span>
      </div>
      <div className="d-stack" style={{ alignItems: 'center', gap: 8 }}>
        <button type="button" className="d-btn" disabled>
          <span className="d-spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />
          Đang gửi…
        </button>
        <span className="d-hint">Gắn trong nút</span>
      </div>
    </div>
  )
}

function SkeletonDemo() {
  const [loading, setLoading] = useState(true)
  return (
    <div className="d-panel d-stack">
      <button
        type="button"
        className="d-btn is-secondary is-sm"
        style={{ alignSelf: 'start' }}
        onClick={() => setLoading((v) => !v)}
      >
        {loading ? 'Hiện dữ liệu thật' : 'Quay lại trạng thái tải'}
      </button>
      <div className="d-card d-row" style={{ gap: 12, flexWrap: 'nowrap' }}>
        {loading ? (
          <>
            <div className="d-skeleton" style={{ width: 36, height: 36, borderRadius: '50%' }} />
            <div className="d-stack" style={{ flex: 1, gap: 7 }}>
              <div className="d-skeleton" style={{ width: '55%', height: 12 }} />
              <div className="d-skeleton" style={{ width: '85%', height: 10 }} />
            </div>
          </>
        ) : (
          <>
            <span className="d-avatar">NA</span>
            <div>
              <strong>Nguyễn Văn A</strong>
              <p className="d-hint" style={{ margin: 0 }}>
                Trưởng chi nhánh CN-07 · Cập nhật 09:12
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function EmptyStateDemo() {
  return (
    <div className="d-card d-panel" style={{ textAlign: 'center', padding: '30px 20px' }}>
      <div style={{ fontSize: 34, opacity: 0.4 }} aria-hidden>
        ▤
      </div>
      <h4 style={{ margin: '10px 0 4px' }}>Chưa có đề xuất nào</h4>
      <p className="d-muted" style={{ margin: '0 0 14px' }}>
        Đề xuất mua sắm bạn tạo sẽ hiện ở đây để theo dõi tiến độ duyệt.
      </p>
      <button type="button" className="d-btn is-sm">
        Tạo đề xuất đầu tiên
      </button>
    </div>
  )
}

function BadgeDemo() {
  return (
    <div className="d-stack" style={{ alignItems: 'center' }}>
      <div className="d-row" style={{ justifyContent: 'center' }}>
        <span className="d-badge is-success">Đã duyệt</span>
        <span className="d-badge is-warning">Chờ duyệt</span>
        <span className="d-badge is-danger">Từ chối</span>
        <span className="d-badge is-info">Bản nháp</span>
        <span className="d-badge">Đã đóng</span>
      </div>
      <div className="d-row" style={{ justifyContent: 'center', gap: 20 }}>
        <span className="d-row" style={{ gap: 6 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--success)',
              display: 'inline-block',
            }}
          />
          <span className="d-muted">Đang hoạt động</span>
        </span>
        <span style={{ position: 'relative', display: 'inline-block', fontSize: 20 }}>
          ✉
          <span
            style={{
              position: 'absolute',
              top: -4,
              right: -10,
              padding: '0 5px',
              borderRadius: 999,
              background: 'var(--danger)',
              color: '#fff',
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            12
          </span>
        </span>
      </div>
    </div>
  )
}

function TooltipDemo() {
  const [show, setShow] = useState(false)
  return (
    <div className="d-stack" style={{ alignItems: 'center' }}>
      <span style={{ position: 'relative', display: 'inline-block' }}>
        <button
          type="button"
          className="d-btn is-secondary"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
          aria-describedby="demo-tip"
        >
          Rê chuột vào đây ⓘ
        </button>
        {show && (
          <span
            id="demo-tip"
            role="tooltip"
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 8px)',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '6px 10px',
              borderRadius: 6,
              background: 'var(--fg)',
              color: 'var(--bg)',
              fontSize: 12,
              whiteSpace: 'nowrap',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            Doanh thu đã trừ chiết khấu và VAT
          </span>
        )}
      </span>
      <p className="d-hint">Tooltip chỉ giải thích thêm — không được chứa thông tin bắt buộc.</p>
    </div>
  )
}

function InlineValidationDemo() {
  const [email, setEmail] = useState('phong@@vrs')
  const [touched, setTouched] = useState(true)
  const ok = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email)
  return (
    <div className="d-panel">
      <label className="d-label" htmlFor="demo-email">
        Email nhận báo cáo
      </label>
      <input
        id="demo-email"
        className={`d-field${touched && !ok ? ' is-error' : ''}`}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched(true)}
        aria-invalid={touched && !ok}
        aria-describedby="demo-email-msg"
      />
      <p id="demo-email-msg" className={`d-hint${touched && !ok ? ' is-error' : ''}`}>
        {touched && !ok
          ? 'Email chưa đúng định dạng — cần dạng ten@congty.vn.'
          : ok
            ? '✓ Email hợp lệ'
            : 'Báo cáo hằng ngày sẽ gửi tới địa chỉ này.'}
      </p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Entries                                                                     */
/* -------------------------------------------------------------------------- */

export const feedbackEntries: CatalogEntry[] = [
  {
    id: 'alert',
    nameEn: 'Alert / Inline Message',
    nameVi: 'Hộp thông báo tại chỗ',
    aliases: ['banner', 'callout', 'notice', 'thông báo'],
    category: 'feedback',
    platforms: ['web', 'mobile'],
    description:
      'Khối thông báo nằm cố định trong luồng nội dung, phân theo 4 mức: Thông tin (xanh dương), Thành công (xanh lá), Cảnh báo (vàng), Lỗi (đỏ).',
    purpose:
      'Dùng cho thông điệp quan trọng cần ở lại trên màn hình để người dùng đọc kỹ và xử lý — khác Toast là loại tự biến mất.',
    states: [
      { name: 'Info', note: 'Thông tin trung tính, không cần hành động.' },
      { name: 'Success', note: 'Xác nhận việc vừa làm đã xong.' },
      { name: 'Warning', note: 'Có rủi ro hoặc điều kiện cần lưu ý trước khi tiếp tục.' },
      { name: 'Error', note: 'Có gì đó thất bại — phải nói rõ cách khắc phục.' },
      { name: 'Dismissible', note: 'Có nút ✕ nếu người dùng được phép bỏ qua.' },
    ],
    dos: [
      'Không chỉ dựa vào màu — luôn kèm biểu tượng và tiêu đề.',
      'Với lỗi, nói rõ nguyên nhân và bước tiếp theo.',
      'Đặt ngay cạnh chỗ phát sinh vấn đề.',
    ],
    donts: [
      'Không hiện nhiều alert chồng lên nhau cùng lúc.',
      'Không dùng alert đỏ cho việc không nghiêm trọng.',
    ],
    demo: () => <AlertDemo />,
    code: `<div className="alert is-danger" role="alert">
  <Icon name="x-circle" />
  <div>
    <strong>Lỗi</strong>
    <p>Không lưu được: doanh thu tiền mặt không khớp với tổng.</p>
  </div>
</div>`,
  },
  {
    id: 'toast',
    nameEn: 'Toast / Snackbar',
    nameVi: 'Thông báo nổi tạm thời',
    aliases: ['snackbar', 'notification', 'thông báo nổi', 'flash message'],
    category: 'feedback',
    platforms: ['web', 'mobile'],
    description:
      'Thẻ nhỏ nổi lên ở góc màn hình (web) hoặc đáy màn hình (mobile), tự biến mất sau 3–5 giây. Thường kèm một hành động ngắn như “Hoàn tác”.',
    purpose:
      'Xác nhận một việc vừa hoàn tất mà không cắt ngang thao tác của người dùng: đã lưu, đã gửi, đã xoá (kèm nút hoàn tác).',
    states: [
      { name: 'Enter', note: 'Trượt vào kèm mờ dần.' },
      { name: 'Visible', note: 'Ở lại 3–5 giây; dừng đếm khi rê chuột vào.' },
      { name: 'With action', note: 'Có nút Hoàn tác / Xem.' },
      { name: 'Stacked', note: 'Nhiều toast xếp chồng, giới hạn 3 cái.' },
    ],
    dos: [
      'Kéo dài thời gian nếu có nút hành động.',
      'Cho phép đóng tay bằng nút ✕.',
      'Dùng role="status" để trình đọc màn hình đọc được.',
    ],
    donts: [
      'Không dùng toast cho lỗi nghiêm trọng — người dùng dễ bỏ lỡ.',
      'Không đặt thông tin duy nhất, không thể xem lại, vào toast.',
      'Không che mất nút bấm quan trọng.',
    ],
    nativeNames: { android: 'Snackbar / Toast', ios: '(tự dựng — không có chuẩn hệ thống)' },
    demo: () => <ToastDemo />,
    code: `function push(text) {
  const id = crypto.randomUUID()
  setToasts((t) => [...t, { id, text }])
  setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000)
}

<div className="toast" role="status">
  <span>{text}</span>
  <button onClick={undo}>Hoàn tác</button>
</div>`,
  },
  {
    id: 'progress-bar',
    nameEn: 'Progress Bar',
    nameVi: 'Thanh tiến độ',
    aliases: ['progress', 'thanh tải', 'loading bar'],
    category: 'feedback',
    platforms: ['web', 'mobile'],
    description:
      'Thanh ngang lấp đầy dần theo phần trăm công việc đã xong. Có hai loại: xác định (biết % chính xác) và không xác định (chỉ chạy qua lại).',
    purpose:
      'Dùng cho tác vụ chạy lâu hơn ~2 giây mà đo được tiến độ: tải tệp lên, xuất Excel, nhập dữ liệu hàng loạt.',
    states: [
      { name: 'Determinate', note: 'Biết % — luôn hiện con số kèm theo.' },
      { name: 'Indeterminate', note: 'Không biết còn bao lâu — vạch chạy liên tục.' },
      { name: 'Complete', note: 'Đầy 100%, chuyển sang trạng thái thành công.' },
      { name: 'Error', note: 'Dừng giữa chừng, đổi màu đỏ, có nút Thử lại.' },
    ],
    dos: [
      'Hiện phần trăm hoặc “3/10 tệp” bằng chữ.',
      'Cho phép huỷ nếu tác vụ chạy lâu.',
      'Dùng role="progressbar" kèm aria-valuenow.',
    ],
    donts: [
      'Không giả lập tiến độ chạy tới 90% rồi đứng im.',
      'Không dùng cho tác vụ dưới 1 giây (dùng spinner hoặc không gì cả).',
    ],
    demo: () => <ProgressDemo />,
    code: `<div role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
  <div className="bar" style={{ width: \`\${pct}%\` }} />
</div>
<span>{pct}%</span>`,
  },
  {
    id: 'spinner',
    nameEn: 'Spinner / Loading Indicator',
    nameVi: 'Vòng xoay đang tải',
    aliases: ['loader', 'loading', 'đang tải', 'activity indicator'],
    category: 'feedback',
    platforms: ['web', 'mobile'],
    description:
      'Vòng tròn xoay báo hiệu hệ thống đang xử lý mà không biết còn bao lâu. Có ba cỡ dùng cho ba ngữ cảnh: trong nút, trong một khối, và toàn màn hình.',
    purpose:
      'Dùng cho chờ ngắn (1–3 giây) và không đo được tiến độ. Chờ lâu hơn nên chuyển sang Skeleton hoặc Progress Bar để đỡ sốt ruột.',
    states: [
      { name: 'Inline', note: 'Cỡ nhỏ, nằm trong nút hoặc ô nhập.' },
      { name: 'Block', note: 'Cỡ vừa, thay thế nội dung một khối.' },
      { name: 'Full page', note: 'Che toàn màn hình khi tải lần đầu.' },
    ],
    dos: [
      'Đi kèm chữ mô tả đang làm gì khi chờ trên 2 giây.',
      'Giữ nguyên bố cục để trang không nhảy khi tải xong.',
      'Tôn trọng prefers-reduced-motion.',
    ],
    donts: [
      'Không dùng spinner toàn màn hình cho một thao tác nhỏ.',
      'Không để spinner quay mãi khi request đã lỗi.',
    ],
    nativeNames: { ios: 'UIActivityIndicatorView', android: 'CircularProgressIndicator' },
    demo: () => <SpinnerDemo />,
    code: `<span className="spinner" role="status" aria-label="Đang tải" />

.spinner {
  width: 20px; height: 20px;
  border: 2.5px solid var(--surface-3);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}`,
  },
  {
    id: 'skeleton',
    nameEn: 'Skeleton Screen',
    nameVi: 'Khung xương chờ tải',
    aliases: ['shimmer', 'placeholder loading', 'khung chờ'],
    category: 'feedback',
    platforms: ['web', 'mobile'],
    description:
      'Các khối xám mô phỏng đúng hình dáng nội dung sắp hiện, có hiệu ứng loé sáng chạy qua. Người dùng thấy trước bố cục nên cảm giác nhanh hơn spinner.',
    purpose:
      'Dùng cho lần tải đầu của trang/danh sách/thẻ có cấu trúc đoán trước được — thay cho spinner ở những khối nội dung lớn.',
    states: [
      { name: 'Loading', note: 'Khối xám có hiệu ứng loé sáng.' },
      { name: 'Loaded', note: 'Thay bằng nội dung thật, kích thước không đổi.' },
      { name: 'Error', note: 'Chuyển sang trạng thái lỗi kèm nút Thử lại.' },
    ],
    dos: [
      'Khung xương phải khớp kích thước nội dung thật, tránh giật bố cục.',
      'Chỉ hiện tối đa 3–5 dòng mẫu, không lấp đầy cả trang.',
      'Dùng cho lần tải đầu; lần tải lại thì giữ dữ liệu cũ và làm mờ nhẹ.',
    ],
    donts: [
      'Không dùng skeleton cho tác vụ dưới 300ms — chỉ gây nhấp nháy.',
      'Không dùng cùng lúc với spinner ở cùng một khối.',
    ],
    demo: () => <SkeletonDemo />,
    code: `{loading ? (
  <div className="row">
    <div className="skeleton avatar" />
    <div className="skeleton line" style={{ width: '55%' }} />
  </div>
) : (
  <UserRow user={user} />
)}`,
  },
  {
    id: 'empty-state',
    nameEn: 'Empty State',
    nameVi: 'Trạng thái rỗng',
    aliases: ['zero state', 'blank state', 'không có dữ liệu'],
    category: 'feedback',
    platforms: ['web', 'mobile'],
    description:
      'Màn hình thay thế khi chưa có dữ liệu, gồm: hình minh hoạ nhẹ, một câu giải thích, và một nút dẫn tới hành động tiếp theo.',
    purpose:
      'Biến khoảnh khắc “trống trơn” thành hướng dẫn. Có 3 loại khác nhau cần viết khác nhau: chưa có gì lần đầu, lọc không ra kết quả, và tải lỗi.',
    states: [
      { name: 'First use', note: 'Chưa từng có dữ liệu — nên hướng dẫn tạo mới.' },
      { name: 'No results', note: 'Lọc/tìm không ra — gợi ý nới bộ lọc.' },
      { name: 'Error', note: 'Tải thất bại — nút Thử lại.' },
      { name: 'No permission', note: 'Có dữ liệu nhưng không đủ quyền xem.' },
    ],
    dos: [
      'Luôn có một nút hành động rõ ràng.',
      'Nói rõ nội dung gì sẽ xuất hiện ở đây.',
      'Viết giọng bình thường, đừng đùa quá đà trong app nghiệp vụ.',
    ],
    donts: [
      'Không để trang trắng trơn không chữ nào.',
      'Không dùng chung một câu cho cả 4 trường hợp trên.',
    ],
    demo: () => <EmptyStateDemo />,
    code: `<div className="empty">
  <Illustration />
  <h4>Chưa có đề xuất nào</h4>
  <p>Đề xuất mua sắm bạn tạo sẽ hiện ở đây để theo dõi tiến độ duyệt.</p>
  <button className="btn">Tạo đề xuất đầu tiên</button>
</div>`,
  },
  {
    id: 'badge',
    nameEn: 'Badge / Status Chip',
    nameVi: 'Nhãn trạng thái',
    aliases: ['status', 'pill', 'chip', 'tag trạng thái', 'label'],
    category: 'feedback',
    platforms: ['web', 'mobile'],
    description:
      'Nhãn nhỏ bo tròn thể hiện trạng thái hoặc đếm số. Ba dạng hay gặp: nhãn trạng thái có chữ, chấm tròn báo hiệu, và số đếm gắn góc biểu tượng.',
    purpose:
      'Dùng để quét nhanh trạng thái trong bảng và danh sách: Chờ duyệt / Đã duyệt / Từ chối; hoặc báo số việc chưa xử lý.',
    states: [
      { name: 'Neutral', note: 'Trạng thái trung tính, đã kết thúc.' },
      { name: 'Success / Warning / Danger', note: 'Theo mức độ nghiêm trọng.' },
      { name: 'Dot', note: 'Chấm tròn cho trạng thái online/offline.' },
      { name: 'Count', note: 'Số đếm, quá 99 thì hiện “99+”.' },
    ],
    dos: [
      'Dùng bảng màu nhất quán cho cùng một trạng thái trong toàn hệ thống.',
      'Luôn có chữ, không chỉ dựa vào màu.',
      'Giữ nhãn ngắn 1–2 từ.',
    ],
    donts: [
      'Không dùng badge làm nút bấm.',
      'Không dùng quá 5 màu trạng thái khác nhau.',
    ],
    demo: () => <BadgeDemo />,
    code: `<span className="badge is-success">Đã duyệt</span>
<span className="badge is-warning">Chờ duyệt</span>

{/* Số đếm gắn icon */}
<span className="icon-wrap">
  <BellIcon />
  <span className="badge-count">{count > 99 ? '99+' : count}</span>
</span>`,
  },
  {
    id: 'tooltip',
    nameEn: 'Tooltip',
    nameVi: 'Chú thích bật lên',
    aliases: ['hint', 'chú giải', 'gợi ý'],
    category: 'feedback',
    platforms: ['web'],
    description:
      'Bong bóng chữ nhỏ hiện khi rê chuột hoặc focus vào một phần tử, biến mất khi rời đi. Chỉ chứa chữ thuần, không chứa nút bấm.',
    purpose:
      'Dùng để giải thích nút biểu tượng, làm rõ thuật ngữ, hoặc ghi chú cách tính một con số — thông tin phụ trợ mà thiếu vẫn dùng được.',
    states: [
      { name: 'Hidden', note: 'Mặc định — không chiếm chỗ.' },
      { name: 'Visible', note: 'Hiện sau độ trễ ~300ms.' },
      { name: 'Flipped', note: 'Tự lật hướng khi sát mép màn hình.' },
    ],
    dos: [
      'Hiện cả khi focus bằng bàn phím, không chỉ khi rê chuột.',
      'Giữ nội dung dưới một câu.',
      'Nối với phần tử bằng aria-describedby.',
    ],
    donts: [
      'Không đặt thông tin bắt buộc trong tooltip — mobile không rê chuột được.',
      'Không đặt link hoặc nút bên trong tooltip (dùng Popover).',
    ],
    demo: () => <TooltipDemo />,
    code: `<button aria-describedby="tip-1"
  onMouseEnter={show} onMouseLeave={hide}
  onFocus={show} onBlur={hide}>
  Doanh thu thuần ⓘ
</button>
{open && (
  <span id="tip-1" role="tooltip">Đã trừ chiết khấu và VAT</span>
)}`,
  },
  {
    id: 'inline-validation',
    nameEn: 'Inline Validation',
    nameVi: 'Kiểm tra hợp lệ tại chỗ',
    aliases: ['form validation', 'error message', 'báo lỗi', 'validate'],
    category: 'feedback',
    platforms: ['web', 'mobile'],
    description:
      'Cơ chế báo đúng/sai ngay dưới từng trường nhập, thay vì gom hết lỗi lên đầu trang sau khi bấm Gửi.',
    purpose:
      'Giúp người dùng sửa sai ngay tại chỗ. Quy tắc thời điểm: kiểm tra khi rời khỏi ô (blur), rồi từ đó cập nhật ngay theo từng ký tự.',
    states: [
      { name: 'Pristine', note: 'Chưa chạm vào — chỉ hiện gợi ý, không báo lỗi.' },
      { name: 'Valid', note: 'Hợp lệ — có thể hiện dấu ✓ nhẹ.' },
      { name: 'Invalid', note: 'Viền đỏ + câu lỗi cụ thể.' },
      { name: 'Pending', note: 'Đang kiểm tra ở server (vd: mã đã tồn tại chưa).' },
    ],
    dos: [
      'Câu lỗi phải nói cách sửa: “Cần dạng ten@congty.vn”.',
      'Đưa con trỏ về trường lỗi đầu tiên khi bấm Gửi thất bại.',
      'Dùng aria-invalid và aria-describedby cho trình đọc màn hình.',
    ],
    donts: [
      'Không báo lỗi khi người dùng mới gõ ký tự đầu.',
      'Không dùng câu lỗi chung chung như “Dữ liệu không hợp lệ”.',
      'Không chỉ tô đỏ mà không có chữ giải thích.',
    ],
    demo: () => <InlineValidationDemo />,
    code: `<input
  aria-invalid={touched && !ok}
  aria-describedby="email-msg"
  onBlur={() => setTouched(true)}
  onChange={(e) => setEmail(e.target.value)}
/>
<p id="email-msg" className={touched && !ok ? 'hint is-error' : 'hint'}>
  {touched && !ok ? 'Email chưa đúng định dạng — cần dạng ten@congty.vn.' : 'Báo cáo sẽ gửi tới đây.'}
</p>`,
  },
]
