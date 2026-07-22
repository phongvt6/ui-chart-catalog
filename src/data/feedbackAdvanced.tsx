/* eslint-disable react-refresh/only-export-components -- demo components được đặt cạnh dữ liệu catalog cho dễ đối chiếu */
import { useState } from 'react'
import type { CatalogEntry } from '../types'

/* -------------------------------------------------------------------------- */
/* Demos                                                                       */
/* -------------------------------------------------------------------------- */

const NOTIFS = [
  {
    id: 1,
    who: 'Trần Thị B',
    what: 'đã duyệt đề xuất mua văn phòng phẩm',
    at: '5 phút trước',
    unread: true,
  },
  { id: 2, who: 'Hệ thống', what: 'Chi nhánh CN-19 chưa nộp số liệu ngày 22/07', at: '1 giờ trước', unread: true },
  { id: 3, who: 'Lê Văn C', what: 'nhắc bạn về báo cáo tuần', at: 'Hôm qua', unread: false },
]

function NotificationCenterDemo() {
  const [open, setOpen] = useState(true)
  const [items, setItems] = useState(NOTIFS)
  const unread = items.filter((i) => i.unread).length
  return (
    <div className="d-stack" style={{ alignItems: 'center' }}>
      <span style={{ position: 'relative', display: 'inline-block' }}>
        <button
          type="button"
          className="icon-btn"
          aria-label={`Thông báo${unread ? `, ${unread} chưa đọc` : ''}`}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ✉
          {unread > 0 && (
            <span
              style={{
                position: 'absolute',
                top: -3,
                right: -3,
                minWidth: 16,
                padding: '0 4px',
                borderRadius: 999,
                background: 'var(--danger)',
                color: '#fff',
                fontSize: 10,
                fontWeight: 700,
                lineHeight: '16px',
              }}
            >
              {unread}
            </span>
          )}
        </button>
        {open && (
          <div
            className="d-card"
            style={{
              position: 'absolute',
              zIndex: 5,
              top: 'calc(100% + 8px)',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 300,
              padding: 0,
              overflow: 'hidden',
              textAlign: 'left',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div
              className="d-row"
              style={{
                justifyContent: 'space-between',
                padding: '9px 12px',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <strong>Thông báo</strong>
              <button
                type="button"
                className="d-btn is-ghost is-sm"
                onClick={() => setItems((x) => x.map((i) => ({ ...i, unread: false })))}
              >
                Đánh dấu đã đọc
              </button>
            </div>
            {items.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() =>
                  setItems((x) => x.map((i) => (i.id === n.id ? { ...i, unread: false } : i)))
                }
                style={{
                  display: 'flex',
                  gap: 9,
                  width: '100%',
                  padding: '10px 12px',
                  border: 0,
                  borderTop: '1px solid var(--border)',
                  background: n.unread ? 'var(--accent-soft)' : 'transparent',
                  color: 'inherit',
                  font: 'inherit',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    marginTop: 6,
                    flex: 'none',
                    borderRadius: '50%',
                    background: n.unread ? 'var(--accent)' : 'transparent',
                  }}
                />
                <span>
                  <span style={{ fontSize: 13 }}>
                    <strong>{n.who}</strong> {n.what}
                  </span>
                  <span className="d-hint" style={{ display: 'block' }}>
                    {n.at}
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </span>
      <p className="d-hint" style={{ marginTop: 190 }}>
        Bấm từng dòng để đánh dấu đã đọc.
      </p>
    </div>
  )
}

function TourDemo() {
  const steps = [
    { n: 1, title: 'Chọn chi nhánh ở đây', body: 'Danh sách chỉ hiện các chi nhánh bạn được phân quyền.' },
    { n: 2, title: 'Nhập doanh thu', body: 'Số liệu tự lưu nháp sau mỗi 30 giây.' },
    { n: 3, title: 'Gửi duyệt', body: 'Sau khi gửi, chỉ quản lý vùng mới sửa được.' },
  ]
  const [i, setI] = useState(0)
  const [done, setDone] = useState(false)
  const step = steps[i]
  return (
    <div className="d-stagebox">
      <div className="d-stagebox-inner d-stack">
        <div className="d-card" style={{ padding: 10, outline: i === 0 && !done ? '2px solid var(--accent)' : 'none' }}>
          Chi nhánh: CN-07 Quận 1
        </div>
        <div className="d-card" style={{ padding: 10, outline: i === 1 && !done ? '2px solid var(--accent)' : 'none' }}>
          Doanh thu: 182.400.000 đ
        </div>
        <button
          type="button"
          className="d-btn is-sm"
          style={{ alignSelf: 'start', outline: i === 2 && !done ? '2px solid var(--accent)' : 'none' }}
        >
          Gửi duyệt
        </button>
        {done && (
          <button type="button" className="d-btn is-secondary is-sm" style={{ alignSelf: 'start' }} onClick={() => { setDone(false); setI(0) }}>
            Xem lại hướng dẫn
          </button>
        )}
      </div>
      {!done && (
        <div
          className="d-card"
          style={{
            position: 'absolute',
            right: 12,
            bottom: 12,
            width: 236,
            boxShadow: 'var(--shadow-lg)',
            borderColor: 'var(--accent)',
          }}
        >
          <div className="d-row" style={{ justifyContent: 'space-between' }}>
            <span className="d-badge is-info">
              Bước {step.n}/{steps.length}
            </span>
            <button
              type="button"
              className="d-btn is-ghost is-sm"
              onClick={() => setDone(true)}
              style={{ padding: 0 }}
            >
              Bỏ qua
            </button>
          </div>
          <strong style={{ display: 'block', margin: '7px 0 3px' }}>{step.title}</strong>
          <p className="d-muted" style={{ margin: '0 0 10px', fontSize: 13 }}>
            {step.body}
          </p>
          <div className="d-row" style={{ justifyContent: 'flex-end' }}>
            {i > 0 && (
              <button type="button" className="d-btn is-secondary is-sm" onClick={() => setI(i - 1)}>
                Quay lại
              </button>
            )}
            <button
              type="button"
              className="d-btn is-sm"
              onClick={() => (i === steps.length - 1 ? setDone(true) : setI(i + 1))}
            >
              {i === steps.length - 1 ? 'Xong' : 'Tiếp'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function OfflineBannerDemo() {
  const [state, setState] = useState<'online' | 'offline' | 'syncing'>('offline')
  return (
    <div className="d-panel d-stack">
      {state === 'offline' && (
        <div className="d-alert is-warning">
          <span aria-hidden>⚠</span>
          <span>
            <strong>Đang ngoại tuyến</strong>
            Số liệu bạn nhập được lưu tạm trên máy và sẽ tự gửi khi có mạng lại.
          </span>
        </div>
      )}
      {state === 'syncing' && (
        <div className="d-alert is-info">
          <span className="d-spinner" style={{ width: 15, height: 15, borderWidth: 2 }} />
          <span>
            <strong>Đang đồng bộ</strong>
            Gửi 3 bản ghi đã lưu tạm…
          </span>
        </div>
      )}
      {state === 'online' && (
        <div className="d-alert is-success">
          <span aria-hidden>✓</span>
          <span>
            <strong>Đã đồng bộ</strong>
            Toàn bộ số liệu đã được gửi lên máy chủ lúc 09:12.
          </span>
        </div>
      )}
      <div className="d-row">
        {(['offline', 'syncing', 'online'] as const).map((s) => (
          <button
            key={s}
            type="button"
            className={`d-btn is-sm${s === state ? '' : ' is-secondary'}`}
            onClick={() => setState(s)}
          >
            {s === 'offline' ? 'Mất mạng' : s === 'syncing' ? 'Đang đồng bộ' : 'Đã đồng bộ'}
          </button>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Entries                                                                     */
/* -------------------------------------------------------------------------- */

export const feedbackAdvancedEntries: CatalogEntry[] = [
  {
    id: 'notification-center',
    nameEn: 'Notification Center / Inbox',
    nameVi: 'Hộp thông báo',
    aliases: ['notification bell', 'inbox', 'chuông thông báo', 'activity feed'],
    category: 'feedback',
    platforms: ['web', 'mobile'],
    description:
      'Biểu tượng chuông/thư có số đếm chưa đọc, bấm vào mở danh sách thông báo có thể xem lại bất cứ lúc nào. Mỗi dòng phân biệt rõ đã đọc – chưa đọc.',
    purpose:
      'Là nơi lưu trữ lâu dài cho những gì Toast chỉ hiện thoáng qua. Nguyên tắc: việc gì người dùng có thể bỏ lỡ mà vẫn cần biết thì phải nằm ở đây.',
    states: [
      { name: 'Empty', note: 'Chưa có thông báo — trạng thái rỗng thân thiện.' },
      { name: 'Unread', note: 'Chấm màu + nền nhạt, số đếm trên biểu tượng.' },
      { name: 'Read', note: 'Nền trong suốt, chữ nhạt hơn.' },
      { name: 'Grouped', note: 'Gom “5 người đã duyệt đề xuất của bạn”.' },
      { name: 'Loading more', note: 'Cuộn tới cuối — tải thêm trang cũ hơn.' },
    ],
    dos: [
      'Có nút “Đánh dấu tất cả đã đọc”.',
      'Mỗi thông báo phải bấm được để đi thẳng tới đối tượng liên quan.',
      'Cho người dùng tắt từng loại thông báo trong cài đặt.',
    ],
    donts: [
      'Không để số đếm chưa đọc mãi không về 0 — người dùng sẽ mặc kệ nó.',
      'Không gửi thông báo cho hành động do chính người dùng vừa làm.',
      'Không dùng badge đỏ cho thông tin không khẩn cấp.',
    ],
    demo: () => <NotificationCenterDemo />,
    code: `<button aria-label={\`Thông báo, \${unread} chưa đọc\`} aria-expanded={open}>
  <BellIcon />
  {unread > 0 && <span className="badge-count">{unread}</span>}
</button>

{open && (
  <div className="notif-panel">
    <header>
      <strong>Thông báo</strong>
      <button onClick={markAllRead}>Đánh dấu đã đọc</button>
    </header>
    {items.map((n) => <NotifRow key={n.id} {...n} />)}
  </div>
)}`,
  },
  {
    id: 'onboarding-tour',
    nameEn: 'Onboarding Tour / Coach Mark',
    nameVi: 'Hướng dẫn lần đầu',
    aliases: ['product tour', 'walkthrough', 'coachmark', 'tooltip tour', 'hướng dẫn'],
    category: 'feedback',
    platforms: ['web', 'mobile'],
    description:
      'Chuỗi bong bóng hướng dẫn trỏ lần lượt vào từng phần của giao diện, có đánh số bước, nút Tiếp / Quay lại và luôn có nút Bỏ qua.',
    purpose:
      'Dùng để dẫn người dùng mới qua đúng luồng chính lần đầu tiên. Chỉ nên chỉ ra thứ người ta không tự tìm được, không phải mô tả lại từng nút.',
    states: [
      { name: 'Step n', note: 'Phần tử đang nói tới được viền nổi, phần còn lại tối đi.' },
      { name: 'Skipped', note: 'Người dùng bỏ qua — không hỏi lại ở lần sau.' },
      { name: 'Completed', note: 'Đã xong — lưu cờ để không hiện lại.' },
      { name: 'Replay', note: 'Có chỗ để mở lại hướng dẫn khi cần.' },
    ],
    dos: [
      'Giữ tối đa 3–5 bước.',
      'Luôn có nút Bỏ qua ngay từ bước đầu.',
      'Lưu tiến độ để người dùng đóng giữa chừng không phải làm lại.',
      'Cho phép xem lại hướng dẫn từ menu trợ giúp.',
    ],
    donts: [
      'Không chạy tour ngay khi người dùng đang vội làm việc gì đó.',
      'Không dùng tour để bù cho giao diện khó hiểu — sửa giao diện thì đúng hơn.',
      'Không lặp lại tour ở mỗi lần đăng nhập.',
    ],
    demo: () => <TourDemo />,
    code: `<Tour
  steps={[
    { target: '#branch-select', title: 'Chọn chi nhánh ở đây', body: '…' },
    { target: '#revenue', title: 'Nhập doanh thu', body: '…' },
  ]}
  onFinish={() => localStorage.setItem('tour-done', '1')}
  onSkip={() => localStorage.setItem('tour-done', '1')}
/>`,
  },
  {
    id: 'connection-banner',
    nameEn: 'Connection / Sync Banner',
    nameVi: 'Dải báo kết nối',
    aliases: ['offline banner', 'sync status', 'mất mạng', 'trạng thái đồng bộ'],
    category: 'feedback',
    platforms: ['web', 'mobile'],
    description:
      'Dải thông báo bám trên hoặc dưới màn hình, báo trạng thái kết nối và đồng bộ: mất mạng, đang gửi lại, đã đồng bộ xong.',
    purpose:
      'Bắt buộc phải có với app nhập liệu ngoài hiện trường (chi nhánh, kho, công trường) — người dùng cần biết số liệu vừa nhập đã thực sự lên máy chủ hay chưa.',
    states: [
      { name: 'Offline', note: 'Vàng — báo dữ liệu đang lưu tạm ở máy.' },
      { name: 'Syncing', note: 'Xanh dương + spinner, ghi rõ còn bao nhiêu bản ghi.' },
      { name: 'Synced', note: 'Xanh lá, tự ẩn sau vài giây.' },
      { name: 'Conflict', note: 'Đỏ — bản ghi bị người khác sửa, cần người dùng chọn.' },
    ],
    dos: [
      'Nói rõ hậu quả: “sẽ tự gửi khi có mạng lại”, đừng chỉ ghi “Offline”.',
      'Cho phép tiếp tục nhập liệu khi mất mạng.',
      'Ghi thời điểm đồng bộ thành công gần nhất.',
    ],
    donts: [
      'Không chặn toàn bộ giao diện chỉ vì mất mạng.',
      'Không im lặng bỏ mất dữ liệu người dùng vừa nhập.',
    ],
    demo: () => <OfflineBannerDemo />,
    code: `useEffect(() => {
  const on = () => setState('syncing')
  const off = () => setState('offline')
  window.addEventListener('online', on)
  window.addEventListener('offline', off)
  return () => {
    window.removeEventListener('online', on)
    window.removeEventListener('offline', off)
  }
}, [])`,
  },
]
