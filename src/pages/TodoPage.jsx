import { registry } from '../data/componentRegistry'
import { ShowcasePage, Section } from '../components/layout/ShowcasePage'

/* ──────────────────────────────────────────────────────────────────────────
   RUČNÍ CHECKLIST — přidávej / odebírej / přepisuj položky zde
   status: 'todo' | 'in-progress' | 'done'
   ────────────────────────────────────────────────────────────────────────── */
const MANUAL_TASKS = [
  {
    group: 'Komponenty — showcase stránky',
    items: [
      { status: 'done',        text: 'Toggle — showcase stránka' },
      { status: 'done',        text: 'Slider — showcase stránka' },
      { status: 'done',        text: 'Select — showcase stránka' },
      { status: 'done',        text: 'ProgressBar — showcase stránka' },
      { status: 'done',        text: 'Modal — showcase stránka' },
      { status: 'done',        text: 'Toast — showcase stránka' },
      { status: 'done',        text: 'Tooltip — showcase stránka' },
      { status: 'done',        text: 'Tabs — showcase stránka' },
      { status: 'done',        text: 'ButtonGroup — showcase stránka' },
      { status: 'done',        text: 'FloatFeedback — showcase stránka' },
      { status: 'todo',        text: 'ScoopClip — vlastní showcase (teď jen v /shapes)' },
      { status: 'todo',        text: 'CornerOrnament — vlastní showcase (teď jen v /ornaments)' },
    ],
  },
  {
    group: 'Herní assets',
    items: [
      { status: 'done',        text: 'HexTile — /hexagon showcase' },
      { status: 'done',        text: 'DieFace — /dice showcase' },
      { status: 'todo',        text: 'HexTile — interaktivní demo (výběr stavu + barvy hráče)' },
      { status: 'todo',        text: 'DieFace — animace přehazování ve showcase' },
      { status: 'todo',        text: 'Erb / heraldický štít — dokumentace props' },
    ],
  },
  {
    group: 'Design tokeny & foundations',
    items: [
      { status: 'done',        text: 'Barvy — paleta dokumentována' },
      { status: 'done',        text: 'Typografie — dokumentována' },
      { status: 'done',        text: 'Spacing — dokumentován' },
      { status: 'in-progress', text: 'Pictograms — přidat zbývající herní ikony do sady' },
      { status: 'todo',        text: 'Shapes — doplnit interaktivní demo CornerOrnament variant' },
      { status: 'todo',        text: 'Tokens — exportovat CSS custom properties ze style guidu' },
    ],
  },
  {
    group: 'Interakce & pohyb',
    items: [
      { status: 'in-progress', text: 'Animace — dokončit sekci "Ohnisko" a "Sudden death"' },
      { status: 'todo',        text: 'Motion — specifikovat easing kř ivky a délky přechodů' },
      { status: 'todo',        text: 'Focus ring — unifikovat styl across všech interaktivních komponent' },
    ],
  },
  {
    group: 'Dokumentace & meta',
    items: [
      { status: 'done',        text: 'Testovací suite — 200+ testů pro TkajUI' },
      { status: 'done',        text: 'ComponentsPage — přehled s API chipy' },
      { status: 'todo',        text: 'Storybook nebo live sandbox pro izolované demo komponent' },
      { status: 'todo',        text: 'Changelog — sledovat změny API mezi verzemi' },
    ],
  },
]

/* ── Status konfigurace ── */
const STATUS = {
  'todo':        { label: 'todo',        dot: 'bg-neutral-700',   text: 'text-neutral-500',  badge: 'bg-neutral-800 text-neutral-500 border-neutral-700' },
  'in-progress': { label: 'probíhá',    dot: 'bg-amber-500',     text: 'text-neutral-300',  badge: 'bg-amber-900/40 text-amber-400 border-amber-700/40' },
  'done':        { label: 'hotovo',     dot: 'bg-emerald-600',   text: 'text-neutral-600 line-through',  badge: 'bg-emerald-900/30 text-emerald-600 border-emerald-800/40' },
}

function StatusBadge({ status }) {
  const s = STATUS[status] ?? STATUS.todo
  return (
    <span className={`inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium border ${s.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
      {s.label}
    </span>
  )
}

function TaskRow({ item }) {
  const s = STATUS[item.status] ?? STATUS.todo
  return (
    <div className="flex items-start gap-3 py-2 border-b border-neutral-800/50 last:border-0">
      <StatusBadge status={item.status} />
      <span className={`text-sm leading-relaxed ${s.text}`}>{item.text}</span>
    </div>
  )
}

/* ── Dynamická sekce — komponenty z registru ── */
function ComponentBacklog() {
  const needsDocs   = registry.filter(c => c.status === 'generated' && c.visibility !== 'internal')
  const draft       = registry.filter(c => c.status === 'draft')
  const noShowcase  = registry.filter(c => c.visibility === 'public' && !c.showcaseRoute)

  if (needsDocs.length === 0 && draft.length === 0 && noShowcase.length === 0) {
    return (
      <p className="text-sm text-emerald-500 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        Všechny public komponenty jsou zdokumentované a mají showcase. 🎉
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {needsDocs.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mb-3">
            Bez dokumentace ({needsDocs.length})
          </p>
          <div className="flex flex-col rounded-lg border border-neutral-800 overflow-hidden">
            {needsDocs.map(c => (
              <div key={c.slug} className="flex items-center justify-between gap-3 px-3 py-2 border-b border-neutral-800/50 last:border-0 hover:bg-neutral-800/30 transition-colors">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm text-neutral-400 truncate">{c.name}</span>
                  <code className="text-[10px] text-neutral-700 font-mono hidden sm:block">{c.filePath}</code>
                </div>
                <span className="text-[10px] font-mono text-neutral-700 shrink-0 px-1.5 py-0.5 rounded border border-neutral-800">{c.category}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {draft.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-700 mb-3">
            Draft — nedokončená dokumentace ({draft.length})
          </p>
          <div className="flex flex-col rounded-lg border border-amber-900/40 overflow-hidden">
            {draft.map(c => (
              <div key={c.slug} className="flex items-center justify-between gap-3 px-3 py-2 border-b border-neutral-800/50 last:border-0 hover:bg-neutral-800/30 transition-colors">
                <span className="text-sm text-neutral-400">{c.name}</span>
                <span className="text-[10px] font-mono text-amber-700 shrink-0">{c.slug}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {noShowcase.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mb-3">
            Bez showcase stránky ({noShowcase.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {noShowcase.map(c => (
              <span key={c.slug} className="text-[11px] font-mono px-2 py-1 rounded border border-neutral-800 text-neutral-600 bg-neutral-900">
                {c.slug}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Počítadlo progress ── */
function Progress() {
  const all   = MANUAL_TASKS.flatMap(g => g.items)
  const done  = all.filter(i => i.status === 'done').length
  const wip   = all.filter(i => i.status === 'in-progress').length
  const todo  = all.filter(i => i.status === 'todo').length
  const pct   = Math.round((done / all.length) * 100)

  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg bg-neutral-900 border border-neutral-800">
      <div className="flex items-center justify-between text-sm">
        <span className="text-neutral-400">Celkový postup</span>
        <span className="font-semibold text-neutral-100 tabular-nums">{done} / {all.length}</span>
      </div>
      <div className="h-2 rounded-full bg-neutral-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-emerald-600 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex gap-4 text-[11px]">
        <span className="flex items-center gap-1.5 text-emerald-600"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />{done} hotovo</span>
        <span className="flex items-center gap-1.5 text-amber-500"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" />{wip} probíhá</span>
        <span className="flex items-center gap-1.5 text-neutral-600"><span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />{todo} todo</span>
      </div>
    </div>
  )
}

/* ── Main ── */
export default function TodoPage() {
  return (
    <ShowcasePage
      title="TODO"
      description="Co ještě zbývá graficky dodělat. Edituj seznam přímo v src/pages/TodoPage.jsx → sekce MANUAL_TASKS."
    >
      {/* Progress bar */}
      <Section id="progress">
        <Progress />
      </Section>

      {/* Ruční checklist */}
      {MANUAL_TASKS.map(group => (
        <Section key={group.group} id={group.group.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}>
          <h2 className="text-base font-semibold text-neutral-100 mb-1">{group.group}</h2>
          <div className="rounded-lg border border-neutral-800 overflow-hidden px-3">
            {group.items.map((item, i) => (
              <TaskRow key={i} item={item} />
            ))}
          </div>
        </Section>
      ))}

      {/* Dynamická sekce z registru */}
      <Section
        id="komponenty-backlog"
        description="Automaticky generováno z componentRegistry — aktualizuje se samo při změně souborů."
      >
        <h2 className="text-base font-semibold text-neutral-100 mb-4">Backlog komponent (auto)</h2>
        <ComponentBacklog />
      </Section>

    </ShowcasePage>
  )
}
