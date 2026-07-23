import type { CatalogEntry } from '../types'
import { CATEGORIES, RELEASES } from '../types'
import { EntryCard } from './EntryCard'
import { hrefOf } from '../lib/route'

export type NewTab = 'ui' | 'chart'

interface Props {
  entries: CatalogEntry[]
  tab: NewTab
  onTab: (t: NewTab) => void
  /** Số biểu đồ được thêm ở đợt gần nhất — hiện trên tab Chart. */
  chartNewCount: number
}

/**
 * “Mới cập nhật”: xem nhanh đợt nào vừa thêm những gì, không phải đọc changelog
 * rồi tự đi tìm từng mục. Hai khu vực tách thành hai tab — mỗi lần chỉ đọc một
 * dòng thời gian, không phải cuộn qua khu mình không quan tâm.
 */
export function NewPage({ entries, tab, onTab, chartNewCount }: Props) {
  // Mục mới được nối vào CUỐI lô trong `data/index.ts`, nên trong cùng một đợt
  // thì phần tử càng về sau càng mới → đảo lại để mới nhất nằm trên cùng.
  const batches = RELEASES.map((r) => ({
    release: r,
    items: entries.filter((e) => e.since === r.version).reverse(),
  })).filter((b) => b.items.length > 0)

  const nameOfCategory = (id: string) => CATEGORIES.find((c) => c.id === id)?.nameVi ?? id
  const newCount = batches[0]?.items.length ?? 0

  return (
    <>
      <header className="page-head">
        <h1>Mới cập nhật</h1>
        <p className="page-lede">
          Các đợt bổ sung, mới nhất trước — số trên tab là lượng mục vừa thêm ở đợt gần
          nhất. Muốn đọc đầy đủ mọi thay đổi (kể cả sửa lỗi và chỉnh giao diện) thì xem{' '}
          <a href={hrefOf({ kind: 'changelog' })}>Nhật ký thay đổi</a>.
        </p>
      </header>

      <div className="chip-row" role="tablist" aria-label="Khu vực">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'ui'}
          className={tab === 'ui' ? 'chip is-on' : 'chip'}
          onClick={() => onTab('ui')}
        >
          Component <span>{newCount}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'chart'}
          className={tab === 'chart' ? 'chip is-on' : 'chip'}
          onClick={() => onTab('chart')}
        >
          Chart <span>{chartNewCount}</span>
        </button>
      </div>

      {tab === 'chart'
        ? null
        : batches.map((b) => {
        const inCats = [...new Set(b.items.map((e) => nameOfCategory(e.category)))]
        return (
          <section key={b.release.version} className="hp-group">
            <div className="hp-group-head">
              <div>
                <h2>
                  {b.release.unreleased ? 'Chưa phát hành' : `Phiên bản ${b.release.version}`}{' '}
                  <span className="hp-group-en">
                    · {b.release.date} · {b.items.length} mục
                  </span>
                </h2>
                <p>
                  {b.release.note} <em>Nhóm: {inCats.join(' · ')}.</em>
                </p>
              </div>
            </div>
            <div className="hp-grid">
              {b.items.map((e) => (
                <EntryCard key={e.id} entry={e} />
              ))}
            </div>
            </section>
          )
        })}
    </>
  )
}
