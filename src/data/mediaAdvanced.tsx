/* eslint-disable react-refresh/only-export-components -- demo components được đặt cạnh dữ liệu catalog cho dễ đối chiếu */
import { useEffect, useState } from 'react'
import type { CatalogEntry } from '../types'

/* -------------------------------------------------------------------------- */
/* Demos                                                                       */
/* -------------------------------------------------------------------------- */

function VideoPlayerDemo() {
  const [playing, setPlaying] = useState(false)
  const [pos, setPos] = useState(18)
  const total = 96
  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(
      () => setPos((p) => (p >= total ? (setPlaying(false), total) : p + 1)),
      160,
    )
    return () => window.clearInterval(id)
  }, [playing])
  const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  return (
    <div className="d-panel">
      <div
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background: 'linear-gradient(140deg, #1b2033 0%, #3a2c52 100%)',
          aspectRatio: '16 / 9',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <button
          type="button"
          aria-label={playing ? 'Tạm dừng' : 'Phát'}
          onClick={() => setPlaying((v) => !v)}
          style={{
            width: 52,
            height: 52,
            border: 0,
            borderRadius: '50%',
            background: 'rgb(255 255 255 / 88%)',
            color: '#16181d',
            fontSize: 18,
            cursor: 'pointer',
          }}
        >
          {playing ? '❚❚' : '▶'}
        </button>
        <div
          style={{
            position: 'absolute',
            right: 10,
            bottom: 8,
            left: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            color: '#fff',
            fontSize: 11,
          }}
        >
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{mmss(pos)}</span>
          <input
            type="range"
            min={0}
            max={total}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Vị trí phát"
            style={{ flex: 1, accentColor: '#fff' }}
          />
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{mmss(total)}</span>
          <button
            type="button"
            aria-label="Toàn màn hình"
            style={{ border: 0, background: 'none', color: '#fff', cursor: 'pointer' }}
          >
            ⛶
          </button>
        </div>
      </div>
      <p className="d-hint">Hướng dẫn nhập báo cáo ngày · 1:36 · có phụ đề tiếng Việt</p>
    </div>
  )
}

function MapDemo() {
  const pins = [
    { id: 'cn-07', x: 38, y: 62, label: 'CN-07 Quận 1' },
    { id: 'cn-12', x: 55, y: 44, label: 'CN-12 Thủ Đức' },
    { id: 'cn-03', x: 72, y: 28, label: 'CN-03 Bình Thạnh' },
  ]
  const [sel, setSel] = useState('cn-07')
  return (
    <div className="d-panel">
      <div
        style={{
          position: 'relative',
          height: 190,
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background:
            'linear-gradient(160deg, #d7e6d2 0%, #cfe0e8 55%, #bcd3e0 100%)',
        }}
      >
        {/* Trục đường chính mô phỏng */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <path d="M20 90 L45 55 L62 40 L88 15" stroke="#f0b429" strokeWidth="2.2" fill="none" />
          <path d="M0 70 L30 66 L60 72 L100 60" stroke="#ffffff" strokeWidth="1.4" fill="none" opacity="0.8" />
        </svg>
        {pins.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-label={p.label}
            aria-pressed={sel === p.id}
            onClick={() => setSel(p.id)}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: 'translate(-50%, -100%)',
              width: sel === p.id ? 24 : 18,
              height: sel === p.id ? 24 : 18,
              border: '2px solid #fff',
              borderRadius: '50% 50% 50% 0',
              rotate: '-45deg',
              background: sel === p.id ? 'var(--danger)' : 'var(--accent)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
            }}
          />
        ))}
        <div
          className="d-card"
          style={{ position: 'absolute', right: 8, bottom: 8, left: 8, padding: '8px 10px' }}
        >
          <strong style={{ fontSize: 13 }}>{pins.find((p) => p.id === sel)?.label}</strong>
          <p className="d-hint" style={{ margin: 0 }}>
            Doanh thu hôm nay 182,4 tr · 24 nhân sự
          </p>
        </div>
        <div className="d-row" style={{ position: 'absolute', top: 8, right: 8, gap: 4 }}>
          <button type="button" className="icon-btn" aria-label="Phóng to">
            +
          </button>
          <button type="button" className="icon-btn" aria-label="Thu nhỏ">
            −
          </button>
        </div>
      </div>
      <p className="d-hint">Bấm vào ghim để xem thông tin chi nhánh.</p>
    </div>
  )
}

function StickyActionBarDemo() {
  const [dirty, setDirty] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="d-stack" style={{ flex: 1, overflow: 'auto' }}>
        <div>
          <label className="d-label" htmlFor="sab-1">
            Doanh thu thiết bị
          </label>
          <input
            id="sab-1"
            className="d-field"
            inputMode="numeric"
            placeholder="0"
            onChange={() => setDirty(true)}
          />
        </div>
        <div>
          <label className="d-label" htmlFor="sab-2">
            Doanh thu dịch vụ
          </label>
          <input
            id="sab-2"
            className="d-field"
            inputMode="numeric"
            placeholder="0"
            onChange={() => setDirty(true)}
          />
        </div>
        <div>
          <label className="d-label" htmlFor="sab-3">
            Ghi chú
          </label>
          <textarea id="sab-3" className="d-field" rows={3} onChange={() => setDirty(true)} />
        </div>
        <p className="d-hint">Cuộn xuống — thanh nút vẫn nằm nguyên ở đáy.</p>
      </div>
      <div
        style={{
          margin: '0 -12px -12px',
          padding: 10,
          borderTop: '1px solid var(--border)',
          background: 'var(--surface)',
          display: 'flex',
          gap: 8,
        }}
      >
        <button type="button" className="d-btn is-secondary is-sm" style={{ flex: 1, justifyContent: 'center' }}>
          Lưu nháp
        </button>
        <button
          type="button"
          className="d-btn is-sm"
          style={{ flex: 2, justifyContent: 'center' }}
          disabled={!dirty}
        >
          Gửi duyệt
        </button>
      </div>
    </div>
  )
}

function PermissionPromptDemo() {
  const [stage, setStage] = useState<'primer' | 'system' | 'granted' | 'denied'>('primer')
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <div className="d-stack">
        <p className="d-muted" style={{ margin: 0 }}>
          Chụp ảnh hoá đơn để đính kèm báo cáo.
        </p>
        {stage === 'granted' && <div className="d-alert is-success">✓ Đã cấp quyền máy ảnh.</div>}
        {stage === 'denied' && (
          <div className="d-alert is-warning">
            <span>
              <strong>Chưa có quyền máy ảnh</strong>
              Bạn vẫn chọn được ảnh từ thư viện, hoặc bật lại trong Cài đặt.
            </span>
          </div>
        )}
        {(stage === 'granted' || stage === 'denied') && (
          <button type="button" className="d-btn is-secondary is-sm" onClick={() => setStage('primer')}>
            Xem lại từ đầu
          </button>
        )}
      </div>

      {stage === 'primer' && (
        <div className="d-scrim" style={{ margin: -12, placeItems: 'end stretch' }}>
          <div
            style={{
              padding: 16,
              borderRadius: '16px 16px 0 0',
              background: 'var(--surface)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 28 }} aria-hidden>
              ⌗
            </div>
            <strong style={{ display: 'block', margin: '6px 0 4px' }}>Cho phép dùng máy ảnh?</strong>
            <p className="d-muted" style={{ margin: '0 0 12px', fontSize: 13 }}>
              Dùng để chụp hoá đơn đính kèm báo cáo. Ảnh chỉ gửi lên hệ thống nội bộ, không chia sẻ
              ra ngoài.
            </p>
            <div className="d-row" style={{ gap: 8 }}>
              <button
                type="button"
                className="d-btn is-secondary is-sm"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => setStage('denied')}
              >
                Để sau
              </button>
              <button
                type="button"
                className="d-btn is-sm"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => setStage('system')}
              >
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      )}

      {stage === 'system' && (
        <div className="d-scrim" style={{ margin: -12 }}>
          <div
            className="d-card"
            style={{ width: 220, textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}
          >
            <p className="d-hint" style={{ margin: '0 0 4px' }}>
              Hộp thoại của hệ điều hành
            </p>
            <strong style={{ fontSize: 13 }}>“Acme” muốn truy cập Máy ảnh</strong>
            <div className="d-row" style={{ gap: 8, marginTop: 12 }}>
              <button
                type="button"
                className="d-btn is-secondary is-sm"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => setStage('denied')}
              >
                Không cho
              </button>
              <button
                type="button"
                className="d-btn is-sm"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => setStage('granted')}
              >
                Cho phép
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Entries                                                                     */
/* -------------------------------------------------------------------------- */

export const mediaAdvancedEntries: CatalogEntry[] = [
  {
    id: 'video-player',
    nameEn: 'Video Player',
    nameVi: 'Trình phát video',
    aliases: ['player', 'video', 'phát video', 'media player'],
    category: 'media',
    platforms: ['web', 'mobile'],
    description:
      'Khung phát video với nút phát/dừng, thanh tua có thời gian, âm lượng, phụ đề và nút toàn màn hình. Điều khiển tự ẩn khi đang phát và hiện lại khi chạm.',
    purpose:
      'Dùng cho video hướng dẫn nghiệp vụ, video đào tạo, ghi hình hiện trường. Với app nội bộ, video hướng dẫn thường hiệu quả hơn tài liệu chữ.',
    states: [
      { name: 'Idle', note: 'Ảnh bìa + nút phát lớn ở giữa.' },
      { name: 'Buffering', note: 'Spinner chồng lên khung hình.' },
      { name: 'Playing', note: 'Điều khiển tự ẩn sau vài giây.' },
      { name: 'Paused', note: 'Điều khiển hiện thường trực.' },
      { name: 'Ended', note: 'Hiện nút phát lại hoặc video kế tiếp.' },
      { name: 'Error', note: 'Không tải được — thông báo kèm nút Thử lại.' },
    ],
    dos: [
      'Có phụ đề — người dùng thường xem ở nơi ồn hoặc không bật loa được.',
      'Nhớ vị trí đang xem dở.',
      'Hỗ trợ phím Space để phát/dừng và ← → để tua.',
    ],
    donts: [
      'Không tự phát kèm tiếng.',
      'Không đặt video là cách duy nhất truyền đạt thông tin bắt buộc.',
      'Không tải video nặng trên mạng di động mà không hỏi.',
    ],
    nativeNames: { ios: 'AVPlayerViewController', android: 'ExoPlayer / VideoView' },
    demo: () => <VideoPlayerDemo />,
    code: `<video controls preload="metadata" poster={cover}
  onTimeUpdate={(e) => save(e.currentTarget.currentTime)}>
  <source src={src} type="video/mp4" />
  <track kind="captions" src={vtt} srcLang="vi" label="Tiếng Việt" default />
</video>`,
  },
  {
    id: 'map',
    nameEn: 'Map',
    nameVi: 'Bản đồ',
    aliases: ['bản đồ', 'map view', 'marker', 'ghim vị trí', 'geolocation'],
    category: 'media',
    platforms: ['web', 'mobile'],
    description:
      'Khung bản đồ có các ghim (marker) đánh dấu vị trí, bấm vào ghim mở thẻ thông tin, cộng các nút phóng to/thu nhỏ và nút về vị trí hiện tại.',
    purpose:
      'Dùng khi vị trí địa lý thực sự mang thông tin: mạng lưới chi nhánh, điểm giao hàng, chấm công theo vị trí.',
    states: [
      { name: 'Loading', note: 'Khung xám trong lúc tải ô bản đồ.' },
      { name: 'Marker default', note: 'Ghim thường.' },
      { name: 'Marker selected', note: 'Ghim to hơn, đổi màu, mở thẻ thông tin.' },
      { name: 'Cluster', note: 'Nhiều ghim gần nhau — gom thành một cụm có số đếm.' },
      { name: 'No permission', note: 'Chưa có quyền vị trí — vẫn xem được bản đồ.' },
    ],
    dos: [
      'Luôn có danh sách song song với bản đồ — bản đồ một mình không dùng được bằng bàn phím.',
      'Gom cụm khi có nhiều ghim để không rối.',
      'Đặt vùng nhìn mặc định bao trọn dữ liệu, đừng bắt người dùng tự tìm.',
    ],
    donts: [
      'Không bắt buộc cấp quyền vị trí mới cho xem bản đồ.',
      'Không dùng bản đồ khi vị trí không mang ý nghĩa gì cho quyết định.',
    ],
    nativeNames: { ios: 'MapKit', android: 'Google Maps SDK' },
    demo: () => <MapDemo />,
    code: `<Map center={bounds.center} zoom={fitZoom(bounds)}>
  {branches.map((s) => (
    <Marker key={s.id} position={s.latLng}
      selected={sel === s.id} onClick={() => setSel(s.id)} />
  ))}
  {sel && <InfoCard branch={branches.find((s) => s.id === sel)} />}
</Map>

{/* Luôn kèm danh sách để dùng được bằng bàn phím */}
<ul>{branches.map((s) => <li key={s.id}>{s.name}</li>)}</ul>`,
  },
  {
    id: 'sticky-action-bar',
    nameEn: 'Sticky Bottom Action Bar',
    nameVi: 'Thanh nút cố định đáy',
    aliases: ['bottom bar', 'sticky footer', 'thanh hành động', 'cta bar'],
    category: 'mobile',
    platforms: ['mobile', 'web'],
    description:
      'Dải chứa các nút hành động chính bám cố định ở đáy màn hình, luôn nhìn thấy dù nội dung phía trên dài bao nhiêu.',
    purpose:
      'Dùng cho biểu mẫu dài trên mobile: người dùng không phải cuộn xuống tận cuối mới thấy nút Lưu. Nút chính đặt bên phải và rộng hơn nút phụ.',
    states: [
      { name: 'Idle', note: 'Nút chính mờ khi chưa có gì để lưu.' },
      { name: 'Enabled', note: 'Có thay đổi chưa lưu — nút chính sáng lên.' },
      { name: 'Submitting', note: 'Spinner trong nút, khoá cả thanh.' },
      { name: 'With summary', note: 'Kèm dòng tóm tắt: “Tổng: 182,4 tr”.' },
      { name: 'Keyboard open', note: 'Bàn phím bật — thanh phải nổi lên trên bàn phím.' },
    ],
    dos: [
      'Chừa khoảng an toàn cho vùng thanh home của iPhone (safe-area-inset-bottom).',
      'Nút chính rộng hơn và nằm bên phải.',
      'Hiện tóm tắt số liệu quan trọng ngay trên thanh nếu có.',
    ],
    donts: [
      'Không đặt quá 2 nút trên thanh.',
      'Không để thanh che mất trường nhập cuối cùng.',
      'Không dùng đồng thời với thanh tab dưới — người dùng sẽ nhầm.',
    ],
    demo: () => <StickyActionBarDemo />,
    mobileDemo: () => <StickyActionBarDemo />,
    code: `<footer className="action-bar">
  <button className="btn is-secondary">Lưu nháp</button>
  <button className="btn" disabled={!dirty}>Gửi duyệt</button>
</footer>

.action-bar {
  position: sticky; bottom: 0;
  padding: 10px 12px calc(10px + env(safe-area-inset-bottom));
  border-top: 1px solid var(--border);
  background: var(--surface);
}`,
  },
  {
    id: 'permission-prompt',
    nameEn: 'Permission Prompt',
    nameVi: 'Hỏi quyền truy cập',
    aliases: ['permission', 'quyền truy cập', 'pre-permission', 'priming'],
    category: 'mobile',
    platforms: ['mobile', 'web'],
    description:
      'Hai lớp: lớp giải thích của app (priming) nói vì sao cần quyền, rồi mới tới hộp thoại thật của hệ điều hành. Kèm phương án dự phòng khi người dùng từ chối.',
    purpose:
      'Dùng trước khi xin quyền máy ảnh, vị trí, thông báo, thư viện ảnh. Hộp thoại hệ thống chỉ hiện được một lần — hỏi sai thời điểm là mất quyền vĩnh viễn.',
    states: [
      { name: 'Priming', note: 'Lớp giải thích của app, có nút “Để sau”.' },
      { name: 'System dialog', note: 'Hộp thoại của hệ điều hành — không tuỳ biến được.' },
      { name: 'Granted', note: 'Có quyền — chạy tiếp việc đang làm dở.' },
      { name: 'Denied', note: 'Từ chối — chuyển sang phương án thay thế.' },
      { name: 'Blocked', note: 'Từ chối vĩnh viễn — hướng dẫn bật lại trong Cài đặt.' },
    ],
    dos: [
      'Chỉ hỏi ngay lúc người dùng thực sự cần chức năng đó, không hỏi khi vừa mở app.',
      'Nói rõ dùng để làm gì và dữ liệu đi đâu.',
      'Luôn có đường đi thay thế khi bị từ chối (chọn ảnh từ thư viện thay vì chụp).',
    ],
    donts: [
      'Không hỏi hàng loạt quyền ngay màn hình đầu tiên.',
      'Không chặn app nếu người dùng từ chối quyền không thiết yếu.',
      'Không hỏi lại liên tục sau khi đã bị từ chối.',
    ],
    nativeNames: { ios: 'AVCaptureDevice.requestAccess', android: 'ActivityResultContracts.RequestPermission' },
    demo: () => <PermissionPromptDemo />,
    mobileDemo: () => <PermissionPromptDemo />,
    code: `// 1. Lớp giải thích của app trước
setPrimer(true)

// 2. Chỉ khi người dùng bấm Tiếp tục mới gọi hệ thống
async function ask() {
  const res = await navigator.permissions?.query({ name: 'camera' })
  if (res?.state === 'denied') return showSettingsHint()
  try {
    await navigator.mediaDevices.getUserMedia({ video: true })
    onGranted()
  } catch {
    onDenied()   // luôn có phương án thay thế
  }
}`,
  },
]
