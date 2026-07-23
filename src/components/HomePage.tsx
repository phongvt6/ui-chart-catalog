import type { CatalogEntry } from '../types'
import { CATEGORIES } from '../types'
import { EntryCard } from './EntryCard'
import { hrefOf } from '../lib/route'

interface Props {
  entries: CatalogEntry[]
  total: number
}

export function HomePage({ entries, total }: Props) {
  const groups = CATEGORIES.map((c) => ({
    category: c,
    items: entries.filter((e) => e.category === c.id),
  })).filter((g) => g.items.length > 0)

  return (
    <div className="page">
      <header className="page-head">
        <h1>Từ điển UI — Element &amp; Component</h1>
        <p className="page-lede">
          Toàn bộ <strong>{total} component</strong> của web và mobile, chia {CATEGORIES.length}{' '}
          nhóm. Mỗi thẻ bên dưới là một demo <strong>chạy thật</strong> — bấm, gõ, kéo ngay tại
          đây. Mở chi tiết để xem diễn giải, công dụng và đoạn code mẫu.
        </p>
      </header>

      {groups.map((g) => (
        <section key={g.category.id} className="hp-group">
          <div className="hp-group-head">
            <div>
              <h2>
                <a href={hrefOf({ kind: 'category', id: g.category.id })}>{g.category.nameVi}</a>{' '}
                <span className="hp-group-en">· {g.category.nameEn}</span>
              </h2>
              <p>{g.category.blurb}</p>
            </div>
            <a
              className="d-btn is-secondary is-sm"
              href={hrefOf({ kind: 'category', id: g.category.id })}
            >
              Mở nhóm ({g.items.length}) →
            </a>
          </div>
          <div className="hp-grid">
            {g.items.map((e) => (
              <EntryCard key={e.id} entry={e} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
