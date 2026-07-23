import './chart.css'
import { ChartHome, ChartJobPage, ChartDetail, ChartRules } from './ChartPages'
import { Anatomy } from './pages/Anatomy'
import { EntryCard } from './components/EntryCard'
import type { ChartEntry, JobId } from './types'
import { JOBS } from './types'
import { entries } from './entries'
import { ENTRY_HISTORY, versionOf } from './entries/history'

/**
 * Toàn bộ khu vực Biểu đồ nằm trong `.chart-scope` — CSS và token màu của nó
 * chỉ có hiệu lực bên trong khối này, nên hai khu vực không giẫm chân nhau.
 * File này được nạp bằng `lazy()` để ECharts không vào bundle lần tải đầu.
 */
export type ChartView =
  | { kind: 'home' }
  | { kind: 'job'; id: JobId }
  | { kind: 'entry'; id: string }
  | { kind: 'rules' }
  | { kind: 'anatomy' }
  | { kind: 'new' }
  | { kind: 'search'; query: string; results: ChartEntry[] }

export default function ChartArea({ view }: { view: ChartView }) {
  return (
    <div className="chart-scope">
      {view.kind === 'home' ? (
        <ChartHome />
      ) : view.kind === 'job' ? (
        <ChartJobPage id={view.id} />
      ) : view.kind === 'entry' ? (
        <ChartDetail id={view.id} />
      ) : view.kind === 'rules' ? (
        <ChartRules />
      ) : view.kind === 'anatomy' ? (
        <Anatomy />
      ) : view.kind === 'new' ? (
        <ChartWhatsNew />
      ) : (
        <ChartSearch query={view.query} results={view.results} />
      )}
    </div>
  )
}

function ChartSearch({ query, results }: { query: string; results: ChartEntry[] }) {
  const groups = JOBS.map((j) => ({
    job: j,
    items: results.filter((e) => e.job === j.id),
  })).filter((g) => g.items.length > 0)

  if (!results.length) return null

  return (
    <>
      <div className="page-head">
        <h2 className="wn-h2">
          Biểu đồ · {results.length} mục khớp “{query}”
        </h2>
      </div>
      {groups.map((g) => (
        <section className="job-block" key={g.job.id}>
          <div className="job-head">
            <h2>
              <a href={`#/chart/nhom/${g.job.id}`}>{g.job.nameVi}</a>
              <span className="job-en">{g.items.length} mục</span>
            </h2>
          </div>
          <div className="card-grid">
            {g.items.map((e) => (
              <EntryCard key={e.id} entry={e} />
            ))}
          </div>
        </section>
      ))}
    </>
  )
}

/**
 * Phần “Biểu đồ” của trang Mới cập nhật. Nguồn là `ENTRY_HISTORY` — bảng ghi
 * mục nào vào catalog ở phiên bản nào. Mục chưa ai gắn phiên bản được gom vào
 * một khối riêng thay vì im lặng biến mất.
 */
function ChartWhatsNew() {
  const unlisted = entries.filter((e) => !versionOf(e.id))
  const batches = ENTRY_HISTORY.map((r) => ({
    release: r,
    items: r.ids.map((id) => entries.find((e) => e.id === id)).filter((e) => e !== undefined),
  })).filter((b) => b.items.length > 0)

  return (
    <>
      {batches.map((b) => (
        <section className="job-block" key={b.release.version}>
          <div className="job-head">
            <h2>
              v{b.release.version}
              <span className="job-en">
                {b.release.date} · {b.items.length} mục
              </span>
            </h2>
            <p className="job-q">{b.release.summary}</p>
          </div>
          <div className="card-grid">
            {b.items.map((e) => (
              <EntryCard key={e.id} entry={e} />
            ))}
          </div>
        </section>
      ))}

      {unlisted.length > 0 && (
        <section className="job-block">
          <div className="job-head">
            <h2>
              Chưa gắn phiên bản
              <span className="job-en">{unlisted.length} mục</span>
            </h2>
            <p className="job-q">
              Thêm id của chúng vào <code>src/chart/entries/history.ts</code> để chúng xuất hiện
              đúng đợt.
            </p>
          </div>
          <div className="card-grid">
            {unlisted.map((e) => (
              <EntryCard key={e.id} entry={e} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
