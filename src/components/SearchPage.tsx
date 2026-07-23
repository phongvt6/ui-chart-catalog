import type { CatalogEntry } from '../types'
import { CATEGORIES } from '../types'
import { EntryCard } from './EntryCard'

interface Props {
  query: string
  results: CatalogEntry[]
  onClear: () => void
}

/** Gõ vào ô tìm kiếm thì cả khung nội dung thành trang kết quả. */
export function SearchPage({ query, results, onClear }: Props) {
  const groups = CATEGORIES.map((c) => ({
    category: c,
    items: results.filter((e) => e.category === c.id),
  })).filter((g) => g.items.length > 0)

  return (
    <div className="page">
      <header className="page-head">
        <h1>Kết quả cho “{query}”</h1>
        <p className="page-lede">
          {results.length} component khớp
          {groups.length > 0 && ` · ${groups.length} nhóm`}.{' '}
          <button type="button" className="link-btn" onClick={onClear}>
            Xoá tìm kiếm
          </button>
        </p>
      </header>

      {results.length === 0 ? (
        <div className="empty-state">
          <strong>Không tìm thấy component nào</strong>
          <span>Thử từ khoá khác — gõ không dấu cũng được, ví dụ “o nhap”, “xem anh”, “gantt”.</span>
        </div>
      ) : (
        groups.map((g) => (
          <section key={g.category.id} className="hp-group">
            <div className="hp-group-head">
              <div>
                <h2>
                  {g.category.nameVi} <span className="hp-group-en">· {g.items.length} mục</span>
                </h2>
              </div>
            </div>
            <div className="hp-grid">
              {g.items.map((e) => (
                <EntryCard key={e.id} entry={e} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}
