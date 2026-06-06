import React from 'react'
import { useBuilderStore } from '../../store/builderStore'
import RoleRow, { Select } from './RoleRow'

const EdgeProperties = ({ edgeId }) => {
    const { edges, nodes, updateEdge, removeEdge, selectEdge } = useBuilderStore()
    const edge = edges.find((e) => e.id === edgeId)
    if (!edge) return null

    const sourceNode = nodes.find((n) => n.id === edge.sourceNodeId)
    const rules = edge.conditions.rules

    const addRule = () => {
        const newRule = {
            id: `rule-${Date.now()}`,
            sourceType: sourceNode?.type === 'assessment' ? 'assessment' : 'unit',
            sourceNodeId: edge.sourceNodeId,
            metric: sourceNode?.type === 'assessment' ? 'score' : 'completion',
            operator: 'gte',
            value: sourceNode?.type === 'assessment' ? 50 : true,
        }
        updateEdge(edgeId, { conditions: { ...edge.conditions, rules: [...rules, newRule] } })
    }

    const updateRule = (idx, updated) => {
        const newRules = rules.map((r, i) => (i === idx ? updated : r))
        updateEdge(edgeId, { conditions: { ...edge.conditions, rules: newRules } })
    }

    const deleteRule = (idx) => {
        updateEdge(edgeId, { conditions: { ...edge.conditions, rules: rules.filter((_, i) => i !== idx) } })
    }

    return (
        <div className='space-y-4'>
            <div>
                <label className="text-[10px] font-bold text-surface-400 uppercase tracking-wide block mb-1">Edge Label</label>
                <input
                    value={edge.label ?? ''}
                    onChange={(e) => updateEdge(edgeId, { label: e.target.value })}
                    placeholder="e.g. Score below passing"
                    className="w-full border border-surface-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-brand-400"
                />
            </div>

            <div className="flex items-center gap-2">
                <label className="text-[10px] font-bold text-surface-400 uppercase tracking-wide shrink-0">Logic</label>
                <Select
                    value={edge.conditions.operator}
                    onChange={(v) => updateEdge(edgeId, { conditions: { ...edge.conditions, operator: v } })}
                    options={[{ value: 'AND', label: 'AND — all must match' }, { value: 'OR', label: 'OR — any match' }]}
                    className="flex-1"
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold text-surface-400 uppercase tracking-wide">Conditions</p>
                    <button
                        onClick={addRule}
                        className="flex items-center gap-1 text-[11px] text-brand-600 hover:text-brand-700 font-mediumv cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 21v-8H3v-2h8V3h2v8h8v2h-8v8z" /></svg>
                        Add
                    </button>
                </div>

                {rules.length === 0 && (
                    <p className="text-[11px] text-surface-400 text-center py-3 bg-surface-50 rounded-lg border border-dashed border-surface-200">
                        No conditions — always routes here
                    </p>
                )}

                {rules.map((rule, idx) => (
                    <RoleRow
                        key={rule.id}
                        rule={rule}
                        sourceNode={sourceNode}
                        onChange={(r) => updateRule(idx, r)}
                        onDelete={() => deleteRule(idx)}
                    />
                ))}
            </div>

            <div className="flex items-center gap-2">
                <label className="text-[10px] text-surface-500">Default route?</label>
                <input
                    type="checkbox"
                    checked={edge.isDefault ?? false}
                    onChange={(e) => updateEdge(edgeId, { isDefault: e.target.checked })}
                    className="accent-brand-500"
                />
            </div>

            <button
                onClick={() => { removeEdge(edgeId); selectEdge(null) }}
                className="w-full py-2 rounded-lg text-xs font-medium text-red-500 border border-red-200 hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07L4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929zM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m.28-6H9.72l-.333 1h5.226z" /></g></svg>
                Delete Connection
            </button>
        </div>
    )
}

export default EdgeProperties;