import { useEffect, useState } from 'react'
import type { CatalogEntry, Category, Platform } from '../types'
import { PLATFORM_LABEL } from '../types'
import { EntryCard } from './EntryCard'

interface Props {
  category: Category
  entries: CatalogEntry[]
}

/** Trang riêng của một nhóm: mô tả nhóm + bộ lọc nền tảng + lưới thẻ. */
export function CategoryPage({ category, entries }: Props) {
  const [platform, setPlatform] = useState<Platform | ''>('')

  // Đổi nhóm thì bỏ bộ lọc cũ — nếu không, mở nhóm mới có thể thấy lưới trống.
  useEffect(() => setPlatform(''), [category.id])

  const list = platform ? entries.filter((e) => e.platforms.includes(platform)) : entries
  const counts: Record<Platform, number> = {
    web: entries.filter((e) => e.platforms.includes('web')).length,
    mobile: entries.filter((e) => e.platforms.includes('mobile')).length,
  }

  return (
    <div className="page">
      <header className="page-head">
        <h1>{category.nameVi}</h1>
        <p className="page-lede">
          <span className="page-en">{category.nameEn}</span> — {category.blurb}
        </p>
        <div className="chip-row" role="group" aria-label="Lọc theo nền tảng">
          <button
            type="button"
            className={platform === '' ? 'chip is-on' : 'chip'}
            aria-pressed={platform === ''}
            onClick={() => setPlatform('')}
          >
            Tất cả <span>{entries.length}</span>
          </button>
          {(['web', 'mobile'] as Platform[]).map((p) => (
            <button
              key={p}
              type="button"
              className={platform === p ? 'chip is-on' : 'chip'}
              aria-pressed={platform === p}
              onClick={() => setPlatform(p)}
            >
              {PLATFORM_LABEL[p]} <span>{counts[p]}</span>
            </button>
          ))}
        </div>
      </header>

      {list.length ? (
        <div className="hp-grid">
          {list.map((e) => (
            <EntryCard key={e.id} entry={e} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <strong>Nhóm này chưa có component nào cho {PLATFORM_LABEL[platform as Platform]}</strong>
          <span>Bỏ bộ lọc nền tảng để xem toàn bộ.</span>
        </div>
      )}
    </div>
  )
}
