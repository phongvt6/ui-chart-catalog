import { useEffect, useId, useMemo, useRef, useState } from 'react'

export interface ComboOption {
  value: string
  label: string
  /** Số lượng hiển thị bên phải, ví dụ số component trong nhóm */
  count?: number
}

interface Props {
  options: ComboOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  /** Nhãn của lựa chọn "tất cả" — luôn nằm đầu danh sách, value = '' */
  allLabel?: string
}

/**
 * Dropdown lọc kiểu gõ-để-tìm: gõ để thu hẹp danh sách, ↑↓ để di chuyển,
 * Enter để chọn, Esc để đóng.
 */
export function Combobox({
  options,
  value,
  onChange,
  placeholder = 'Chọn…',
  allLabel,
}: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listId = useId()

  const allOptions = useMemo<ComboOption[]>(
    () => (allLabel ? [{ value: '', label: allLabel }, ...options] : options),
    [options, allLabel],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allOptions
    return allOptions.filter((o) => o.label.toLowerCase().includes(q))
  }, [allOptions, query])

  const selected = allOptions.find((o) => o.value === value)

  useEffect(() => {
    if (!open) return
    const onDocDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocDown)
    return () => document.removeEventListener('mousedown', onDocDown)
  }, [open])

  const commit = (option: ComboOption) => {
    onChange(option.value)
    setQuery('')
    setOpen(false)
    inputRef.current?.blur()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) {
        setOpen(true)
        return
      }
      const delta = e.key === 'ArrowDown' ? 1 : -1
      setActiveIndex((i) => (i + delta + filtered.length) % Math.max(filtered.length, 1))
    } else if (e.key === 'Enter') {
      if (open && filtered[activeIndex]) {
        e.preventDefault()
        commit(filtered[activeIndex])
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      setQuery('')
    }
  }

  return (
    <div className="combo" ref={rootRef}>
      <input
        ref={inputRef}
        className="combo-input"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        placeholder={selected ? selected.label : placeholder}
        value={open ? query : selected?.label ?? ''}
        onChange={(e) => {
          setQuery(e.target.value)
          setActiveIndex(0)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
      />
      {value && !open ? (
        <button
          type="button"
          className="combo-clear"
          aria-label="Xoá bộ lọc"
          onClick={() => onChange('')}
        >
          ✕
        </button>
      ) : (
        <span className="combo-caret">▾</span>
      )}

      {open && (
        <div className="combo-pop" id={listId} role="listbox">
          {filtered.length === 0 && <div className="combo-empty">Không có kết quả</div>}
          {filtered.map((o, i) => (
            <button
              type="button"
              key={o.value || '__all__'}
              role="option"
              aria-selected={o.value === value}
              className={`combo-opt${i === activeIndex ? ' is-active' : ''}`}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => commit(o)}
            >
              <span>{o.label}</span>
              {o.count !== undefined && <small>{o.count}</small>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
