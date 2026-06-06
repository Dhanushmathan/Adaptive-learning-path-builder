import clsx from 'clsx'
import React from 'react'

const ASSESSMENT_METRICS = ['completion', 'passed', 'score', 'score_range']
const UNIT_METRICS = ['completion', 'time_spent_minutes', 'percentage_completion']
const OPERATORS = ['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'between']
const OP_LABELS = {
    eq: '= equals', ne: '≠ not equals', gt: '> greater than',
    gte: '≥ at least', lt: '< less than', lte: '≤ at most', between: '↔ between',
}

export const Select = ({ value, onChange, options, className }) => {
    return (
        <div className={clsx('relative', className)}>
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className='w-full appearance-none rounded-lg border border-surface-200 bg-white px-3 py-1.5 text-xs text-surface-700 pr-7 focus:outline-none focus:ring-2 focus:ring-brand-400'
            >
                {
                    options.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))
                }
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 640" className="absolute right-2 top-1/2 -translate-y-1/2 text-surface-400 pointer-events-none"><path fill="currentColor" d="m577 608l426-434q21-21 21-51t-21-51l-51-51Q931 0 901 0t-51 21L512 359L174 21Q153 0 123 0T72 21L21 72Q0 93 0 123t21 51l428 434q32 32 64 32t64-32" /></svg>
        </div>
    );
};

export const RoleRow = ({ rule, sourceNode, onChange, onDelete }) => {

    const metrics = sourceNode?.type === 'assessment' ? ASSESSMENT_METRICS : UNIT_METRICS
    const needsRange = rule.metric === 'score_range' || rule.operator === 'between'
    const needsBool = rule.metric === 'completion' || rule.metric === 'passed'

    return (
        <div className='bg-surface-50 rounded-xl p-3 border border-surface-200 space-y-2'>
            <div className='flex items-center justify-center'>
                <span className='text-[10px] font-bold text-surface-400 uppercase tracking-wide'>Condition</span>
                <button onClick={onDelete} className='text-surface-200 hover:text-red-400 transition-colors'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07L4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929zM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m.28-6H9.72l-.333 1h5.226z" /></g></svg>
                </button>
            </div>

            <Select
                value={rule.metric}
                onChange={(v) => onChange({ ...rule, metric: v })}
                options={metrics.map((m) => ({ value: m, label: m.replace(/_/g, ' ') }))} />

            {!needsBool && (
                <Select
                    value={rule.operator}
                    onChange={(v) => onChange({ ...rule, operator: v })}
                    options={OPERATORS.map((o) => ({ value: o, label: OP_LABELS[o] }))}
                />
            )}

            {needsBool && (
                <Select
                    value={String(rule.value ?? 'true')}
                    onChange={(v) => onChange({ ...rule, value: v === 'true' })}
                    options={[{ value: 'true', label: 'true' }, { value: 'false', label: 'false' }]}
                />
            )}

            {needsRange ? (
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={rule.range?.min ?? ''}
                        onChange={(e) => onChange({ ...rule, range: { ...rule.range, min: Number(e.target.value), max: rule.range?.max ?? 100 } })}
                        className="flex-1 border border-surface-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-brand-400"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        value={rule.range?.max ?? ''}
                        onChange={(e) => onChange({ ...rule, range: { ...rule.range, max: Number(e.target.value), min: rule.range?.min ?? 0 } })}
                        className="flex-1 border border-surface-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-brand-400"
                    />
                </div>
            ) : !needsBool && (
                <input
                    type="number"
                    placeholder="Value"
                    value={typeof rule.value === 'number' ? rule.value : ''}
                    onChange={(e) => onChange({ ...rule, value: Number(e.target.value) })}
                    className="w-full border border-surface-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-brand-400"
                />
            )}
        </div>
    )
}

export default RoleRow;