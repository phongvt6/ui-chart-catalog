/* eslint-disable react-refresh/only-export-components -- demo components được đặt cạnh dữ liệu catalog cho dễ đối chiếu */
import { useState } from 'react'
import type { CatalogEntry } from '../types'

/* -------------------------------------------------------------------------- */
/* Demos                                                                       */
/* -------------------------------------------------------------------------- */

function ModalDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="d-stagebox">
      <div className="d-stagebox-inner d-stack">
        <p className="d-muted">Bấm để mở hộp thoại xác nhận.</p>
        <button
          type="button"
          className="d-btn is-danger is-sm"
          style={{ alignSelf: 'start' }}
          onClick={() => setOpen(true)}
        >
          Xoá báo cáo
        </button>
      </div>
      {open && (
        <div className="d-scrim" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            className="d-card"
            style={{ width: 300, boxShadow: 'var(--shadow-lg)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 id="demo-modal-title" style={{ margin: '0 0 6px' }}>
              Xoá báo cáo ngày 22/07?
            </h4>
            <p className="d-muted" style={{ margin: '0 0 14px' }}>
              Số liệu đã nộp sẽ bị xoá vĩnh viễn và không khôi phục được.
            </p>
            <div className="d-row" style={{ justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="d-btn is-secondary is-sm"
                onClick={() => setOpen(false)}
              >
                Giữ lại
              </button>
              <button type="button" className="d-btn is-danger is-sm" onClick={() => setOpen(false)}>
                Xoá vĩnh viễn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DrawerDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="d-stagebox">
      <div className="d-stagebox-inner d-stack">
        <p className="d-muted">Ngăn kéo trượt từ cạnh phải — hợp cho form phụ và bộ lọc.</p>
        <button
          type="button"
          className="d-btn is-sm"
          style={{ alignSelf: 'start' }}
          onClick={() => setOpen(true)}
        >
          Mở bộ lọc
        </button>
      </div>
      {open && (
        <div className="d-scrim" style={{ placeItems: 'stretch' }} onClick={() => setOpen(false)}>
          <aside
            role="dialog"
            aria-label="Bộ lọc"
            onClick={(e) => e.stopPropagation()}
            style={{
              marginLeft: 'auto',
              width: 210,
              padding: 14,
              background: 'var(--surface)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div className="d-row" style={{ justifyContent: 'space-between' }}>
              <strong>Bộ lọc</strong>
              <button
                type="button"
                className="icon-btn"
                aria-label="Đóng"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>
            <label className="d-check">
              <input type="checkbox" defaultChecked /> Đã duyệt
            </label>
            <label className="d-check">
              <input type="checkbox" /> Chờ duyệt
            </label>
            <button
              type="button"
              className="d-btn is-sm"
              style={{ marginTop: 'auto' }}
              onClick={() => setOpen(false)}
            >
              Áp dụng
            </button>
          </aside>
        </div>
      )}
    </div>
  )
}

function PopoverDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="d-stack" style={{ alignItems: 'center' }}>
      <span style={{ position: 'relative', display: 'inline-block' }}>
        <button type="button" className="d-btn is-secondary" onClick={() => setOpen((v) => !v)}>
          Nguyễn Văn A ▾
        </button>
        {open && (
          <div
            role="dialog"
            className="d-card"
            style={{
              position: 'absolute',
              zIndex: 5,
              top: 'calc(100% + 8px)',
              left: 0,
              width: 230,
              textAlign: 'left',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div className="d-row" style={{ gap: 10, flexWrap: 'nowrap' }}>
              <span className="d-avatar">NA</span>
              <div>
                <strong>Nguyễn Văn A</strong>
                <p className="d-hint" style={{ margin: 0 }}>
                  Trưởng chi nhánh CN-07
                </p>
              </div>
            </div>
            <button type="button" className="d-btn is-sm" style={{ marginTop: 10, width: '100%', justifyContent: 'center' }}>
              Nhắn tin
            </button>
          </div>
        )}
      </span>
      <p className="d-hint">Popover chứa được nội dung tương tác — khác Tooltip chỉ có chữ.</p>
    </div>
  )
}

function DropdownMenuDemo() {
  const [open, setOpen] = useState(false)
  const items = [
    { label: 'Xem chi tiết', icon: '◱' },
    { label: 'Nhân bản', icon: '⧉' },
    { label: 'Xuất Excel', icon: '⤓' },
    { label: 'Xoá', icon: '🗑', danger: true },
  ]
  return (
    <div className="d-stack" style={{ alignItems: 'center' }}>
      <span style={{ position: 'relative', display: 'inline-block' }}>
        <button
          type="button"
          className="icon-btn"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="Thao tác khác"
          onClick={() => setOpen((v) => !v)}
        >
          ⋯
        </button>
        {open && (
          <div
            role="menu"
            className="combo-pop"
            style={{ top: 'calc(100% + 4px)', left: 0, right: 'auto', width: 172 }}
          >
            {items.map((it, i) => (
              <span key={it.label}>
                {it.danger && (
                  <span
                    style={{
                      display: 'block',
                      height: 1,
                      margin: '4px 0',
                      background: 'var(--border)',
                    }}
                  />
                )}
                <button
                  type="button"
                  role="menuitem"
                  className="combo-opt"
                  onClick={() => setOpen(false)}
                  style={{ color: it.danger ? 'var(--danger)' : undefined }}
                  autoFocus={i === 0}
                >
                  <span>
                    {it.icon} {it.label}
                  </span>
                </button>
              </span>
            ))}
          </div>
        )}
      </span>
      <p className="d-hint">Menu “⋯” gom các hành động phụ của một dòng.</p>
    </div>
  )
}

function BottomSheetDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="d-stack" style={{ flex: 1 }}>
        <p className="d-muted">Chạm để mở tấm trượt từ đáy.</p>
        <button type="button" className="d-btn is-sm" onClick={() => setOpen(true)}>
          Chọn danh mục
        </button>
      </div>
      {open && (
        <div
          className="d-scrim"
          style={{ placeItems: 'end stretch', margin: -12 }}
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-label="Chọn danh mục"
            onClick={(e) => e.stopPropagation()}
            style={{
              padding: '10px 14px 16px',
              borderRadius: '16px 16px 0 0',
              background: 'var(--surface)',
            }}
          >
            <span
              style={{
                display: 'block',
                width: 38,
                height: 4,
                margin: '0 auto 12px',
                borderRadius: 999,
                background: 'var(--border-strong)',
              }}
            />
            <strong style={{ display: 'block', marginBottom: 8 }}>Chọn danh mục</strong>
            {['Thiết bị', 'Vật tư', 'Dịch vụ'].map((o) => (
              <button
                key={o}
                type="button"
                className="combo-opt"
                onClick={() => setOpen(false)}
                style={{ padding: '10px 6px' }}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ActionSheetDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="d-stack" style={{ flex: 1 }}>
        <p className="d-muted">Kiểu iOS: danh sách hành động ở đáy, nút Huỷ tách riêng.</p>
        <button type="button" className="d-btn is-secondary is-sm" onClick={() => setOpen(true)}>
          Thao tác với báo cáo
        </button>
      </div>
      {open && (
        <div
          className="d-scrim"
          style={{ placeItems: 'end stretch', margin: -12, padding: 8 }}
          onClick={() => setOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="d-stack" style={{ gap: 8 }}>
            <div
              style={{
                borderRadius: 13,
                background: 'var(--surface)',
                overflow: 'hidden',
                textAlign: 'center',
              }}
            >
              {['Chia sẻ', 'Nhân bản', 'Xoá'].map((o, i) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '12px 8px',
                    border: 0,
                    borderTop: i ? '1px solid var(--border)' : undefined,
                    background: 'none',
                    color: o === 'Xoá' ? 'var(--danger)' : 'var(--accent)',
                    font: 'inherit',
                    fontSize: 15,
                    cursor: 'pointer',
                  }}
                >
                  {o}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                width: '100%',
                padding: '12px 8px',
                border: 0,
                borderRadius: 13,
                background: 'var(--surface)',
                color: 'var(--accent)',
                font: 'inherit',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Huỷ
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Entries                                                                     */
/* -------------------------------------------------------------------------- */

export const overlayEntries: CatalogEntry[] = [
  {
    id: 'modal',
    nameEn: 'Modal / Dialog',
    nameVi: 'Hộp thoại chặn',
    aliases: ['dialog', 'popup', 'hộp thoại', 'lightbox', 'confirm'],
    category: 'overlay',
    platforms: ['web', 'mobile'],
    description:
      'Hộp nổi giữa màn hình trên một lớp phủ mờ, chặn mọi thao tác phía sau cho tới khi người dùng xử lý xong. Dạng hay dùng nhất là hộp xác nhận hành động nguy hiểm.',
    purpose:
      'Dùng khi bắt buộc phải có quyết định của người dùng trước khi đi tiếp: xác nhận xoá, cảnh báo mất dữ liệu, nhập nhanh một mẩu thông tin.',
    states: [
      { name: 'Closed', note: 'Không tồn tại trong DOM.' },
      { name: 'Open', note: 'Focus bị khoá bên trong hộp thoại.' },
      { name: 'Confirming', note: 'Nút chính hiện spinner, các nút khác bị khoá.' },
      { name: 'Destructive', note: 'Hành động phá huỷ — nút chính màu đỏ.' },
    ],
    dos: [
      'Khoá focus trong hộp thoại và trả focus về nút cũ khi đóng.',
      'Cho đóng bằng phím Esc và bấm ra ngoài (trừ khi đang nhập dở).',
      'Nhãn nút nói rõ hậu quả: “Xoá vĩnh viễn”, không phải “OK”.',
    ],
    donts: [
      'Không dùng modal cho nội dung dài phải cuộn nhiều.',
      'Không mở modal chồng lên modal.',
      'Không dùng modal chỉ để báo tin — dùng Toast hoặc Alert.',
    ],
    nativeNames: { ios: 'UIAlertController', android: 'AlertDialog' },
    demo: () => <ModalDemo />,
    code: `{open && (
  <div className="scrim" onClick={close}>
    <div role="dialog" aria-modal="true" aria-labelledby="t"
      onClick={(e) => e.stopPropagation()}>
      <h4 id="t">Xoá báo cáo ngày 22/07?</h4>
      <p>Số liệu đã nộp sẽ bị xoá vĩnh viễn.</p>
      <button className="btn is-secondary" onClick={close}>Giữ lại</button>
      <button className="btn is-danger" onClick={confirm}>Xoá vĩnh viễn</button>
    </div>
  </div>
)}`,
  },
  {
    id: 'drawer',
    nameEn: 'Drawer / Side Panel',
    nameVi: 'Ngăn kéo bên',
    aliases: ['side panel', 'off-canvas', 'sheet', 'panel trượt'],
    category: 'overlay',
    platforms: ['web', 'mobile'],
    description:
      'Tấm nội dung trượt vào từ cạnh màn hình (thường bên phải cho nội dung, bên trái cho menu), có lớp phủ mờ phía sau nhưng vẫn thấy ngữ cảnh.',
    purpose:
      'Dùng khi cần nhiều chỗ hơn Popover nhưng không muốn rời khỏi trang hiện tại: bộ lọc nâng cao, xem nhanh chi tiết, form phụ.',
    states: [
      { name: 'Closed', note: 'Nằm ngoài màn hình.' },
      { name: 'Open', note: 'Trượt vào, nội dung nền bị khoá cuộn.' },
      { name: 'Dirty', note: 'Đang sửa dở — hỏi lại trước khi đóng.' },
      { name: 'Full screen', note: 'Trên mobile chiếm trọn màn hình.' },
    ],
    dos: [
      'Có nút ✕ rõ ràng, cộng với Esc và bấm ra ngoài.',
      'Giữ nút hành động chính luôn thấy ở đáy ngăn kéo.',
      'Khoá cuộn của trang nền khi ngăn kéo mở.',
    ],
    donts: [
      'Không mở nhiều ngăn kéo chồng nhau.',
      'Không dùng cho luồng chính của nghiệp vụ — nên là một trang riêng.',
    ],
    demo: () => <DrawerDemo />,
    code: `<aside className={open ? 'drawer is-open' : 'drawer'}
  role="dialog" aria-label="Bộ lọc">
  <header>
    <strong>Bộ lọc</strong>
    <button aria-label="Đóng" onClick={close}>✕</button>
  </header>
  {/* nội dung */}
  <footer><button className="btn" onClick={apply}>Áp dụng</button></footer>
</aside>`,
  },
  {
    id: 'popover',
    nameEn: 'Popover',
    nameVi: 'Bảng nổi nhỏ',
    aliases: ['flyout', 'hovercard', 'bong bóng nội dung'],
    category: 'overlay',
    platforms: ['web'],
    description:
      'Bảng nhỏ nổi neo vào một phần tử cụ thể, chứa được nội dung có tương tác: chữ, ảnh, nút. Không chặn thao tác toàn màn hình như Modal.',
    purpose:
      'Dùng cho thông tin phụ mở rộng theo yêu cầu: hồ sơ rút gọn khi rê vào tên người, giải thích cách tính một chỉ số kèm link đọc thêm.',
    states: [
      { name: 'Closed', note: 'Ẩn.' },
      { name: 'Open', note: 'Neo vào phần tử kích hoạt, có mũi nhọn chỉ về.' },
      { name: 'Repositioned', note: 'Tự lật hướng khi sát mép màn hình.' },
    ],
    dos: [
      'Đóng khi bấm ra ngoài hoặc nhấn Esc.',
      'Mở bằng click (không phải hover) nếu bên trong có nút bấm.',
      'Giữ kích thước nhỏ gọn.',
    ],
    donts: [
      'Không dùng trên mobile — chuyển thành Bottom Sheet.',
      'Không nhét form dài vào popover.',
    ],
    demo: () => <PopoverDemo />,
    code: `<button onClick={() => setOpen((v) => !v)} aria-expanded={open}>
  Nguyễn Văn A ▾
</button>
{open && (
  <div role="dialog" className="popover">
    <Avatar /> <strong>Nguyễn Văn A</strong>
    <button className="btn">Nhắn tin</button>
  </div>
)}`,
  },
  {
    id: 'dropdown-menu',
    nameEn: 'Dropdown Menu / Context Menu',
    nameVi: 'Menu thao tác',
    aliases: ['context menu', 'kebab menu', 'overflow menu', 'menu ⋯'],
    category: 'overlay',
    platforms: ['web', 'mobile'],
    description:
      'Danh sách các lệnh bung ra từ một nút (thường là nút ⋯ hoặc chuột phải). Khác Select ở chỗ mỗi mục là một HÀNH ĐỘNG, không phải một giá trị.',
    purpose:
      'Gom các hành động phụ của một đối tượng để không làm rối giao diện: sửa, nhân bản, xuất file, xoá — thường đặt ở cuối mỗi dòng trong bảng.',
    states: [
      { name: 'Closed', note: 'Chỉ thấy nút ⋯.' },
      { name: 'Open', note: 'Menu bung, mục đầu nhận focus.' },
      { name: 'Highlighted', note: 'Mục đang trỏ bằng ↑↓.' },
      { name: 'Disabled item', note: 'Mục không đủ quyền — mờ, kèm giải thích.' },
      { name: 'Destructive item', note: 'Mục xoá tách riêng, màu đỏ.' },
    ],
    dos: [
      'Tách mục nguy hiểm xuống cuối bằng một đường kẻ.',
      'Hỗ trợ ↑ ↓ Enter Esc.',
      'Nhóm các lệnh cùng loại lại với nhau.',
    ],
    donts: [
      'Không giấu hành động chính vào menu ⋯.',
      'Không để menu quá 7–8 mục.',
    ],
    demo: () => <DropdownMenuDemo />,
    code: `<button aria-haspopup="menu" aria-expanded={open}
  onClick={() => setOpen((v) => !v)} aria-label="Thao tác khác">⋯</button>
{open && (
  <div role="menu">
    <button role="menuitem">Xem chi tiết</button>
    <hr />
    <button role="menuitem" className="is-danger">Xoá</button>
  </div>
)}`,
  },
  {
    id: 'bottom-sheet',
    nameEn: 'Bottom Sheet',
    nameVi: 'Tấm trượt từ đáy',
    aliases: ['modal sheet', 'sheet', 'tấm kéo lên'],
    category: 'overlay',
    platforms: ['mobile'],
    description:
      'Tấm nội dung trượt lên từ đáy màn hình, có thanh kéo nhỏ ở đầu, kéo xuống để đóng. Có loại chỉ mở một phần và loại kéo lên toàn màn hình.',
    purpose:
      'Là cách thay thế Modal trên mobile — nội dung nằm gần ngón cái, thao tác đóng tự nhiên bằng cách vuốt xuống. Dùng cho chọn lựa, bộ lọc, chi tiết nhanh.',
    states: [
      { name: 'Hidden', note: 'Nằm ngoài màn hình.' },
      { name: 'Peek', note: 'Mở một phần, vẫn thấy nội dung nền.' },
      { name: 'Expanded', note: 'Kéo lên gần hết màn hình.' },
      { name: 'Dragging', note: 'Đang kéo — bám theo ngón tay.' },
    ],
    dos: [
      'Luôn có thanh kéo (grabber) ở đầu để báo là kéo được.',
      'Cho đóng bằng cả vuốt xuống lẫn chạm ra ngoài.',
      'Chừa khoảng an toàn ở đáy cho vùng thanh home.',
    ],
    donts: [
      'Không dùng cho nội dung quá dài — nên mở trang riêng.',
      'Không chặn thao tác vuốt xuống để đóng.',
    ],
    nativeNames: { ios: 'UISheetPresentationController', android: 'BottomSheetDialog' },
    demo: () => <BottomSheetDemo />,
    mobileDemo: () => <BottomSheetDemo />,
    code: `<div className="sheet-scrim" onClick={close}>
  <div className="sheet" role="dialog" onClick={(e) => e.stopPropagation()}>
    <span className="grabber" />
    <strong>Chọn danh mục</strong>
    {options.map((o) => <button key={o} onClick={() => pick(o)}>{o}</button>)}
  </div>
</div>`,
  },
  {
    id: 'action-sheet',
    nameEn: 'Action Sheet',
    nameVi: 'Bảng hành động (kiểu iOS)',
    aliases: ['ios sheet', 'menu đáy', 'action menu'],
    category: 'overlay',
    platforms: ['mobile'],
    description:
      'Kiểu iOS: danh sách các hành động xếp dọc ở đáy màn hình, hành động phá huỷ tô đỏ, nút Huỷ nằm tách riêng bên dưới.',
    purpose:
      'Dùng khi người dùng chạm vào một đối tượng và cần chọn “làm gì với nó” — tương đương menu ⋯ của bản web nhưng theo quy ước mobile.',
    states: [
      { name: 'Default', note: 'Danh sách hành động thường.' },
      { name: 'Destructive', note: 'Mục xoá tô đỏ.' },
      { name: 'Cancel', note: 'Nút Huỷ tách khối, chữ đậm.' },
      { name: 'With title', note: 'Có tiêu đề mô tả đang thao tác với gì.' },
    ],
    dos: [
      'Luôn có nút Huỷ trên iOS.',
      'Giữ tối đa 5–6 hành động.',
      'Đặt hành động nguy hiểm cách xa hành động hay dùng.',
    ],
    donts: [
      'Không dùng để chọn giá trị (dùng Picker hoặc Bottom Sheet).',
      'Không lồng menu con bên trong.',
    ],
    nativeNames: { ios: 'UIAlertController (.actionSheet)', android: '(dùng Bottom Sheet)' },
    demo: () => <ActionSheetDemo />,
    mobileDemo: () => <ActionSheetDemo />,
    code: `<div className="action-sheet" role="dialog">
  <div className="group">
    <button>Chia sẻ</button>
    <button>Nhân bản</button>
    <button className="is-destructive">Xoá</button>
  </div>
  <button className="cancel">Huỷ</button>
</div>`,
  },
]
