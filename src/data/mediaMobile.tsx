/* eslint-disable react-refresh/only-export-components -- demo components được đặt cạnh dữ liệu catalog cho dễ đối chiếu */
import { useRef, useState } from 'react'
import type { CatalogEntry } from '../types'

/* -------------------------------------------------------------------------- */
/* Demos                                                                       */
/* -------------------------------------------------------------------------- */

function AvatarDemo() {
  return (
    <div className="d-stack" style={{ alignItems: 'center' }}>
      <div className="d-row" style={{ justifyContent: 'center' }}>
        <span className="d-avatar" style={{ width: 24, height: 24, fontSize: 10 }}>
          AN
        </span>
        <span className="d-avatar">BT</span>
        <span className="d-avatar" style={{ width: 52, height: 52, fontSize: 18 }}>
          CL
        </span>
        <span style={{ position: 'relative', display: 'inline-block' }}>
          <span className="d-avatar">DM</span>
          <span
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: 'var(--success)',
              border: '2px solid var(--surface)',
            }}
          />
        </span>
      </div>
      <div className="d-row" style={{ gap: 0, justifyContent: 'center' }}>
        {['AN', 'BT', 'CL'].map((n, i) => (
          <span key={n} className="d-avatar" style={{ marginLeft: i ? -10 : 0, border: '2px solid var(--surface)' }}>
            {n}
          </span>
        ))}
        <span
          className="d-avatar"
          style={{ marginLeft: -10, border: '2px solid var(--surface)', background: 'var(--surface-3)', color: 'var(--fg-muted)' }}
        >
          +5
        </span>
      </div>
      <p className="d-hint">Cỡ nhỏ / vừa / lớn · có chấm trạng thái · nhóm chồng nhau</p>
    </div>
  )
}

function ImageDemo() {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="d-stack" style={{ alignItems: 'center' }}>
      <div
        style={{
          position: 'relative',
          width: 240,
          height: 140,
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background: 'var(--surface-2)',
        }}
      >
        {!loaded && <div className="d-skeleton" style={{ position: 'absolute', inset: 0 }} />}
        <div
          onAnimationEnd={() => setLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
            display: 'grid',
            placeItems: 'center',
            color: '#fff',
            fontSize: 12,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s',
            animation: 'd-shimmer 0.9s forwards',
          }}
        >
          Ảnh 16:9 · object-fit: cover
        </div>
      </div>
      <p className="d-hint">Luôn cố định tỷ lệ khung để trang không giật khi ảnh tải xong.</p>
    </div>
  )
}

function FileUploadDemo() {
  const [files, setFiles] = useState<string[]>(['hoa-don-22-07.pdf'])
  const [over, setOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div className="d-panel d-stack">
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setOver(true)
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setOver(false)
          setFiles((f) => [...f, ...Array.from(e.dataTransfer.files).map((x) => x.name)])
        }}
        onClick={() => inputRef.current?.click()}
        style={{
          padding: '22px 16px',
          border: `2px dashed ${over ? 'var(--accent)' : 'var(--border-strong)'}`,
          borderRadius: 'var(--radius-lg)',
          background: over ? 'var(--accent-soft)' : 'var(--surface-2)',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <div style={{ fontSize: 22, opacity: 0.5 }} aria-hidden>
          ⤒
        </div>
        <strong style={{ display: 'block', marginTop: 6 }}>Kéo tệp vào đây</strong>
        <span className="d-hint">hoặc bấm để chọn · PDF, JPG · tối đa 10MB</span>
        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          onChange={(e) =>
            setFiles((f) => [...f, ...Array.from(e.target.files ?? []).map((x) => x.name)])
          }
        />
      </div>
      {files.map((f) => (
        <div key={f} className="d-row" style={{ gap: 9, flexWrap: 'nowrap' }}>
          <span>📄</span>
          <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {f}
          </span>
          <span className="d-badge is-success">Xong</span>
          <button
            type="button"
            className="icon-btn"
            aria-label={`Xoá ${f}`}
            onClick={() => setFiles((x) => x.filter((y) => y !== f))}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}

function IconDemo() {
  const icons = [
    { g: '⌂', n: 'Trang chủ' },
    { g: '⌕', n: 'Tìm kiếm' },
    { g: '✎', n: 'Sửa' },
    { g: '🗑', n: 'Xoá' },
    { g: '⤓', n: 'Tải xuống' },
    { g: '⚙', n: 'Cài đặt' },
    { g: '✓', n: 'Xác nhận' },
    { g: '✕', n: 'Đóng' },
  ]
  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, textAlign: 'center' }}
    >
      {icons.map((i) => (
        <div key={i.n}>
          <div style={{ fontSize: 22 }} aria-hidden>
            {i.g}
          </div>
          <span className="d-hint">{i.n}</span>
        </div>
      ))}
    </div>
  )
}

function CarouselDemo() {
  const slides = ['Khuyến mãi tháng 7', 'Chi nhánh mới khai trương', 'Hướng dẫn nộp báo cáo']
  const [i, setI] = useState(0)
  return (
    <div className="d-panel d-stack" style={{ alignItems: 'center' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 110,
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(120deg, var(--accent) 0%, #9c6ef0 100%)',
          color: '#fff',
          display: 'grid',
          placeItems: 'center',
          fontWeight: 600,
        }}
      >
        {slides[i]}
        <button
          type="button"
          className="icon-btn"
          aria-label="Trước"
          onClick={() => setI((v) => (v - 1 + slides.length) % slides.length)}
          style={{ position: 'absolute', left: 8 }}
        >
          ‹
        </button>
        <button
          type="button"
          className="icon-btn"
          aria-label="Sau"
          onClick={() => setI((v) => (v + 1) % slides.length)}
          style={{ position: 'absolute', right: 8 }}
        >
          ›
        </button>
      </div>
      <div className="d-row" style={{ gap: 6 }}>
        {slides.map((s, n) => (
          <button
            key={s}
            type="button"
            aria-label={`Tới slide ${n + 1}`}
            onClick={() => setI(n)}
            style={{
              width: n === i ? 18 : 7,
              height: 7,
              padding: 0,
              border: 0,
              borderRadius: 999,
              background: n === i ? 'var(--accent)' : 'var(--border-strong)',
              cursor: 'pointer',
              transition: 'width 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function PullToRefreshDemo() {
  const [pull, setPull] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const start = () => {
    if (refreshing) return
    setPull(60)
    window.setTimeout(() => {
      setPull(0)
      setRefreshing(true)
      window.setTimeout(() => setRefreshing(false), 1200)
    }, 450)
  }
  return (
    <div className="d-stack">
      <div
        style={{
          height: pull || (refreshing ? 34 : 0),
          display: 'grid',
          placeItems: 'center',
          transition: 'height 0.3s',
          overflow: 'hidden',
        }}
      >
        {refreshing ? (
          <span className="d-spinner" />
        ) : (
          pull > 0 && <span className="d-hint">Thả ra để làm mới ↑</span>
        )}
      </div>
      <button type="button" className="d-btn is-secondary is-sm" onClick={start}>
        Mô phỏng kéo xuống
      </button>
      {['Báo cáo 22/07', 'Báo cáo 21/07', 'Báo cáo 20/07'].map((t) => (
        <div key={t} className="d-card" style={{ padding: 10 }}>
          {t}
        </div>
      ))}
    </div>
  )
}

function SwipeActionDemo() {
  const [open, setOpen] = useState<string | null>(null)
  const rows = ['Báo cáo 22/07', 'Báo cáo 21/07']
  return (
    <div className="d-stack" style={{ gap: 8 }}>
      <p className="d-hint" style={{ margin: 0 }}>
        Bấm vào dòng để mô phỏng thao tác vuốt sang trái.
      </p>
      {rows.map((r) => (
        <div
          key={r}
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 'var(--radius)',
            background: 'var(--danger)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: 16,
              color: '#fff',
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            Xoá
          </div>
          <button
            type="button"
            onClick={() => setOpen(open === r ? null : r)}
            style={{
              position: 'relative',
              display: 'block',
              width: '100%',
              padding: 12,
              border: 0,
              background: 'var(--surface)',
              color: 'inherit',
              font: 'inherit',
              textAlign: 'left',
              cursor: 'pointer',
              transform: open === r ? 'translateX(-72px)' : 'none',
              transition: 'transform 0.22s',
            }}
          >
            {r}
          </button>
        </div>
      ))}
    </div>
  )
}

function SegmentedPickerDemo() {
  const [v, setV] = useState('Thiết bị')
  const opts = ['Thiết bị', 'Vật tư', 'Dịch vụ']
  return (
    <div className="d-stack">
      <span className="d-label">Danh mục</span>
      <div className="seg" style={{ width: '100%' }}>
        {opts.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={v === o}
            onClick={() => setV(o)}
            style={{ flex: 1 }}
          >
            {o}
          </button>
        ))}
      </div>
      <div className="d-card" style={{ padding: 12 }}>
        <p className="d-hint" style={{ margin: 0 }}>
          Doanh thu {v}
        </p>
        <strong style={{ fontSize: 20 }}>182,4 tr</strong>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Entries                                                                     */
/* -------------------------------------------------------------------------- */

export const mediaMobileEntries: CatalogEntry[] = [
  {
    id: 'avatar',
    nameEn: 'Avatar',
    nameVi: 'Ảnh đại diện',
    aliases: ['profile picture', 'ảnh đại diện', 'initials'],
    category: 'media',
    platforms: ['web', 'mobile'],
    description:
      'Hình tròn (hoặc bo góc) đại diện cho một người hoặc tổ chức. Khi không có ảnh thì rơi về chữ cái đầu của tên trên nền màu sinh từ tên đó.',
    purpose:
      'Giúp nhận diện nhanh ai là ai trong danh sách, bình luận, nhật ký thao tác — mắt nhận ra hình nhanh hơn đọc chữ.',
    states: [
      { name: 'Image', note: 'Có ảnh thật.' },
      { name: 'Initials', note: 'Không có ảnh — chữ cái đầu trên nền màu.' },
      { name: 'With status', note: 'Chấm nhỏ báo đang trực tuyến.' },
      { name: 'Group', note: 'Nhiều avatar chồng nhau + “+N”.' },
    ],
    dos: [
      'Luôn có phương án dự phòng khi ảnh lỗi.',
      'Sinh màu nền ổn định từ tên để cùng người luôn cùng màu.',
      'Đặt alt là tên người, hoặc alt="" nếu tên đã hiện ngay cạnh.',
    ],
    donts: [
      'Không dùng avatar mặc định giống hệt nhau cho mọi người.',
      'Không để avatar méo hình — luôn dùng object-fit: cover.',
    ],
    demo: () => <AvatarDemo />,
    code: `<span className="avatar" style={{ background: colorFrom(name) }}>
  {img ? <img src={img} alt="" /> : initials(name)}
</span>

{/* Nhóm chồng nhau */}
{users.slice(0, 3).map((u) => <Avatar key={u.id} {...u} />)}
{rest > 0 && <span className="avatar is-more">+{rest}</span>}`,
  },
  {
    id: 'image',
    nameEn: 'Image / Thumbnail',
    nameVi: 'Hình ảnh',
    aliases: ['thumbnail', 'ảnh', 'picture', 'media'],
    category: 'media',
    platforms: ['web', 'mobile'],
    description:
      'Khối hiển thị ảnh với tỷ lệ khung cố định, có trạng thái đang tải và trạng thái lỗi. Dùng object-fit để ảnh lấp đầy khung mà không méo.',
    purpose:
      'Dùng cho ảnh sản phẩm, ảnh chứng từ, ảnh bìa. Điểm quan trọng nhất về kỹ thuật: giữ chỗ trước để trang không nhảy khi ảnh tải xong.',
    states: [
      { name: 'Loading', note: 'Khung xám hoặc skeleton đúng kích thước.' },
      { name: 'Loaded', note: 'Ảnh hiện ra, thường kèm mờ dần.' },
      { name: 'Error', note: 'Ảnh hỏng — hiện biểu tượng thay thế, không để vỡ hình.' },
      { name: 'Zoomable', note: 'Bấm để mở lớn (lightbox).' },
    ],
    dos: [
      'Khai báo width/height hoặc aspect-ratio để giữ chỗ.',
      'Viết alt mô tả nội dung; ảnh trang trí thì để alt="".',
      'Dùng loading="lazy" cho ảnh nằm dưới màn hình đầu.',
    ],
    donts: [
      'Không kéo giãn ảnh sai tỷ lệ.',
      'Không tải ảnh gốc 4000px cho một ô thumbnail 80px.',
    ],
    demo: () => <ImageDemo />,
    code: `<div className="thumb" style={{ aspectRatio: '16 / 9' }}>
  <img src={src} alt={alt} loading="lazy"
    onError={(e) => (e.currentTarget.src = fallback)}
    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
</div>`,
  },
  {
    id: 'file-upload',
    nameEn: 'File Upload / Dropzone',
    nameVi: 'Tải tệp lên',
    aliases: ['dropzone', 'attachment', 'đính kèm', 'upload'],
    category: 'media',
    platforms: ['web', 'mobile'],
    description:
      'Vùng kéo-thả kèm nút chọn tệp, cộng với danh sách tệp đã chọn hiển thị tiến độ và nút xoá cho từng tệp.',
    purpose:
      'Dùng để đính kèm chứng từ, hoá đơn, ảnh hiện trường. Trên mobile phải mở được cả camera lẫn thư viện ảnh.',
    states: [
      { name: 'Idle', note: 'Viền nét đứt, ghi rõ định dạng và dung lượng cho phép.' },
      { name: 'Drag over', note: 'Viền và nền đổi màu khi kéo tệp vào.' },
      { name: 'Uploading', note: 'Thanh tiến độ riêng cho từng tệp.' },
      { name: 'Success', note: 'Tệp có dấu ✓ và nút xoá.' },
      { name: 'Rejected', note: 'Sai định dạng hoặc quá nặng — báo rõ lý do.' },
    ],
    dos: [
      'Nói trước định dạng, số lượng và dung lượng tối đa.',
      'Cho xoá từng tệp và tải lại tệp lỗi.',
      'Vẫn phải có nút bấm chọn tệp, không chỉ kéo-thả.',
    ],
    donts: [
      'Không im lặng bỏ qua tệp không hợp lệ.',
      'Không chặn giao diện trong lúc tải lên.',
    ],
    demo: () => <FileUploadDemo />,
    code: `<div className={over ? 'dropzone is-over' : 'dropzone'}
  onDragOver={(e) => { e.preventDefault(); setOver(true) }}
  onDragLeave={() => setOver(false)}
  onDrop={handleDrop}
  onClick={() => inputRef.current?.click()}>
  <strong>Kéo tệp vào đây</strong>
  <span>hoặc bấm để chọn · PDF, JPG · tối đa 10MB</span>
  <input ref={inputRef} type="file" multiple hidden onChange={handlePick} />
</div>`,
  },
  {
    id: 'icon',
    nameEn: 'Icon',
    nameVi: 'Biểu tượng',
    aliases: ['glyph', 'symbol', 'icon set', 'ký hiệu'],
    category: 'media',
    platforms: ['web', 'mobile'],
    description:
      'Ký hiệu đồ hoạ nhỏ mang một ý nghĩa quy ước. Phải dùng chung một bộ icon cho toàn ứng dụng để giữ độ dày nét và phong cách nhất quán.',
    purpose:
      'Rút ngắn thời gian nhận diện chức năng và tiết kiệm chỗ. Chỉ hiệu quả với các ý nghĩa đã phổ biến — icon tự chế thường gây hiểu nhầm.',
    states: [
      { name: 'Outline', note: 'Nét — dùng cho trạng thái không được chọn.' },
      { name: 'Filled', note: 'Đặc — dùng cho trạng thái đang chọn.' },
      { name: 'Sizes', note: '16 / 20 / 24px — bám theo cỡ chữ xung quanh.' },
      { name: 'Decorative', note: 'Chỉ trang trí — đặt aria-hidden="true".' },
    ],
    dos: [
      'Dùng một bộ icon duy nhất trong toàn hệ thống.',
      'Ghép chữ kèm icon cho các chức năng ít gặp.',
      'Dùng currentColor để icon đổi màu theo chữ.',
    ],
    donts: [
      'Không trộn nhiều bộ icon khác phong cách.',
      'Không dùng icon một mình cho hành động quan trọng.',
    ],
    demo: () => <IconDemo />,
    code: `<button className="btn">
  <TrashIcon aria-hidden width={16} /> Xoá
</button>

/* Icon đổi màu theo chữ */
svg { width: 1em; height: 1em; fill: currentColor; }`,
  },
  {
    id: 'carousel',
    nameEn: 'Carousel / Slider',
    nameVi: 'Băng chuyền ảnh',
    aliases: ['slideshow', 'banner slider', 'trình chiếu'],
    category: 'media',
    platforms: ['web', 'mobile'],
    description:
      'Khung hiển thị lần lượt từng khối nội dung, có nút ‹ › và các chấm chỉ vị trí. Trên mobile chuyển sang vuốt ngang.',
    purpose:
      'Dùng cho banner khuyến mãi, ảnh sản phẩm nhiều góc, tin nổi bật — khi nội dung ngang hàng nhau và không phải thứ người dùng bắt buộc phải xem hết.',
    states: [
      { name: 'Active slide', note: 'Chấm tương ứng được làm nổi.' },
      { name: 'Auto-play', note: 'Tự chạy — phải dừng khi rê chuột hoặc focus.' },
      { name: 'Swiping', note: 'Đang vuốt trên mobile.' },
      { name: 'End', note: 'Hết slide — dừng hoặc quay vòng.' },
    ],
    dos: [
      'Luôn hiện các chấm để biết có bao nhiêu slide.',
      'Cho điều khiển bằng phím ← →.',
      'Nếu tự chạy thì phải có nút tạm dừng.',
    ],
    donts: [
      'Không đặt nội dung quan trọng ở slide thứ 2 trở đi — rất ít người xem tới.',
      'Không tự chuyển slide quá nhanh (dưới 5 giây).',
    ],
    demo: () => <CarouselDemo />,
    code: `<div className="carousel" aria-roledescription="carousel">
  <div className="slide">{slides[i]}</div>
  <button aria-label="Trước" onClick={prev}>‹</button>
  <button aria-label="Sau" onClick={next}>›</button>
  <div className="dots">
    {slides.map((_, n) => (
      <button key={n} aria-label={\`Tới slide \${n + 1}\`}
        aria-current={n === i} onClick={() => setI(n)} />
    ))}
  </div>
</div>`,
  },
  {
    id: 'pull-to-refresh',
    nameEn: 'Pull to Refresh',
    nameVi: 'Kéo xuống để làm mới',
    aliases: ['swipe to refresh', 'làm mới', 'refresh'],
    category: 'mobile',
    platforms: ['mobile'],
    description:
      'Kéo danh sách xuống quá đầu để kích hoạt tải lại dữ liệu; một vòng xoay hiện ra ở khoảng trống phía trên rồi thu lại khi xong.',
    purpose:
      'Là cử chỉ chuẩn để làm mới thủ công trên mobile — thay cho nút “Tải lại”, tiết kiệm chỗ và người dùng đã quen tay.',
    states: [
      { name: 'Pulling', note: 'Chỉ báo xuất hiện dần theo lực kéo.' },
      { name: 'Ready', note: 'Kéo đủ ngưỡng — báo “Thả ra để làm mới”.' },
      { name: 'Refreshing', note: 'Đang tải, vòng xoay chạy.' },
      { name: 'Done', note: 'Thu lại, có thể báo “Đã cập nhật lúc 09:12”.' },
    ],
    dos: [
      'Có phản hồi rung nhẹ khi đạt ngưỡng (nếu nền tảng hỗ trợ).',
      'Vẫn giữ nội dung cũ trong lúc tải.',
      'Cho biết lần cập nhật gần nhất là khi nào.',
    ],
    donts: [
      'Không dùng ở màn hình không có gì để làm mới.',
      'Không dùng trên web desktop — ở đó nên có nút Tải lại.',
    ],
    nativeNames: { ios: 'UIRefreshControl', android: 'SwipeRefreshLayout' },
    demo: () => <PullToRefreshDemo />,
    mobileDemo: () => <PullToRefreshDemo />,
    code: `<RefreshControl
  refreshing={refreshing}
  onRefresh={async () => {
    setRefreshing(true)
    await reload()
    setRefreshing(false)
  }}
/>`,
  },
  {
    id: 'swipe-actions',
    nameEn: 'Swipe Actions',
    nameVi: 'Vuốt để thao tác',
    aliases: ['swipe to delete', 'vuốt xoá', 'row actions'],
    category: 'mobile',
    platforms: ['mobile'],
    description:
      'Vuốt ngang một dòng trong danh sách để lộ ra các nút hành động ẩn phía sau: xoá (đỏ), lưu trữ, đánh dấu đã đọc.',
    purpose:
      'Cho phép xử lý nhanh từng dòng mà không cần mở chi tiết — cực hiệu quả với hộp thư, danh sách việc, danh sách chờ duyệt.',
    states: [
      { name: 'Rest', note: 'Dòng bình thường, không thấy hành động.' },
      { name: 'Revealed', note: 'Vuốt một phần — hiện nút.' },
      { name: 'Full swipe', note: 'Vuốt hết — thực thi luôn hành động chính.' },
      { name: 'Undo', note: 'Sau khi xoá, hiện toast Hoàn tác trong vài giây.' },
    ],
    dos: [
      'Luôn có cách khác để làm cùng hành động (menu ⋯) — vuốt là thao tác ẩn.',
      'Dùng màu và icon rõ nghĩa cho từng hành động.',
      'Luôn có Hoàn tác cho hành động xoá.',
    ],
    donts: [
      'Không đặt quá 2 hành động mỗi bên.',
      'Không để hành động phá huỷ kích hoạt chỉ bằng vuốt nhẹ.',
    ],
    nativeNames: { ios: 'UISwipeActionsConfiguration', android: 'ItemTouchHelper' },
    demo: () => <SwipeActionDemo />,
    mobileDemo: () => <SwipeActionDemo />,
    code: `<SwipeableRow
  rightActions={[
    { label: 'Xoá', color: 'danger', onPress: () => remove(id) },
  ]}
>
  <Row item={item} />
</SwipeableRow>`,
  },
  {
    id: 'mobile-segmented',
    nameEn: 'Mobile Segmented Filter',
    nameVi: 'Bộ lọc đoạn trên mobile',
    aliases: ['filter chips', 'segment mobile', 'lọc nhanh'],
    category: 'mobile',
    platforms: ['mobile'],
    description:
      'Dải nút lọc chiếm trọn chiều ngang màn hình, đặt ngay dưới tiêu đề. Khi nhiều hơn 4 lựa chọn thì chuyển thành dải chip cuộn ngang.',
    purpose:
      'Là cách lọc nhanh chủ đạo trên mobile — thay cho dropdown vì bấm được ngay bằng một chạm, không phải mở lớp phủ.',
    states: [
      { name: 'Selected', note: 'Nền nổi, chữ đậm.' },
      { name: 'Unselected', note: 'Chìm.' },
      { name: 'Scrollable', note: 'Nhiều lựa chọn — cuộn ngang, chừa hé mục kế tiếp.' },
      { name: 'With count', note: 'Kèm số lượng kết quả mỗi nhóm.' },
    ],
    dos: [
      'Chừa hé một phần mục cuối để người dùng biết còn cuộn được.',
      'Ghim mục đang chọn vào tầm nhìn khi mở lại màn hình.',
      'Chiều cao chạm tối thiểu 44px.',
    ],
    donts: [
      'Không để quá 4 đoạn dàn đều — chữ sẽ bị cắt.',
      'Không dùng cho bộ lọc nhiều chiều (dùng Bottom Sheet).',
    ],
    demo: () => <SegmentedPickerDemo />,
    mobileDemo: () => <SegmentedPickerDemo />,
    code: `<div className="seg-mobile" role="tablist">
  {options.map((o) => (
    <button key={o} role="tab" aria-selected={v === o}
      onClick={() => setV(o)}>{o}</button>
  ))}
</div>`,
  },
]
