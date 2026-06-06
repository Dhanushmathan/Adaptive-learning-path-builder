import React from 'react'
import { useBuilderStore } from '../../store/builderStore';
import { Handle, Position } from '@xyflow/react';
import clsx from 'clsx';

const NODE_STYLES = {
  start: {
    bg: 'bg-green-50', border: 'border-green-400', text: 'text-green-700',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className='text-green-600'><path d="M5 5v14a2 2 0 0 0 2.75 1.84L20 13.74a2 2 0 0 0 0-3.5L7.75 3.14A2 2 0 0 0 5 4.89" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  end: {
    bg: 'bg-slate-50', border: 'border-slate-300', text: 'text-slate-600',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" className='text-slate-400'><path fill="currentColor" fillRule="evenodd" d="M7.47 3.588a4.45 4.45 0 0 0-4.15-.224a.55.55 0 0 0-.32.499v5.533a6.25 6.25 0 0 1 5.547.439l.344.207a4.02 4.02 0 0 0 3.865.148a.44.44 0 0 0 .244-.395V4.182a6.26 6.26 0 0 1-5.386-.508zm5.957 7.944a5.52 5.52 0 0 1-5.307-.204l-.345-.207a4.75 4.75 0 0 0-4.314-.293L3 11.026v3.255a.75.75 0 0 1-1.5 0V3.863c0-.8.465-1.526 1.19-1.861a5.95 5.95 0 0 1 5.552.3l.144.086a4.76 4.76 0 0 0 4.447.24l.603-.278a.75.75 0 0 1 1.064.681v6.764c0 .735-.416 1.408-1.073 1.737" clipRule="evenodd" /></svg>,
  },
  assessment: {
    bg: 'bg-indigo-50', border: 'border-indigo-400', text: 'text-indigo-700',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className='text-indigo-500'><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14l2 2l4-4" /></g></svg>,
  },
  unit: {
    bg: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-700',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className='text-blue-500'><path fill="currentColor" d="M12 21.5c-1.35-.85-3.8-1.5-5.5-1.5c-1.65 0-3.35.3-4.75 1.05c-.1.05-.15.05-.25.05c-.25 0-.5-.25-.5-.5V6c.6-.45 1.25-.75 2-1c1.11-.35 2.33-.5 3.5-.5c1.95 0 4.05.4 5.5 1.5c1.45-1.1 3.55-1.5 5.5-1.5c1.17 0 2.39.15 3.5.5c.75.25 1.4.55 2 1v14.6c0 .25-.25.5-.5.5c-.1 0-.15 0-.25-.05c-1.4-.75-3.1-1.05-4.75-1.05c-1.7 0-4.15.65-5.5 1.5m-1-14c-1.36-.6-3.16-1-4.5-1c-1.2 0-2.4.15-3.5.5v11.5c1.1-.35 2.3-.5 3.5-.5c1.34 0 3.14.4 4.5 1zM13 19c1.36-.6 3.16-1 4.5-1c1.2 0 2.4.15 3.5.5V7c-1.1-.35-2.3-.5-3.5-.5c-1.34 0-3.14.4-4.5 1z" /></svg>,
  },
}

const ALPNode = ({ id, data, selected }) => {

  const { removeNode } = useBuilderStore();
  const type = data.componentType || 'unit'
  const style = NODE_STYLES[type] || NODE_STYLES.unit
  const isStartOrEnd = type === 'start' || type === 'end'

  return (
    <div className={clsx(
      'relative min-w-40 max-w-50 rounded-xl border-2 transition-all',
      style.bg, style.border,
      selected && 'ring-2 ring-brand-500 ring-offset-2 shadow-lg',
      !selected && 'shadow-node hover:shadow-md'
    )}>
      {(type === 'end' || !isStartOrEnd) && (
        <Handle type="target" position={Position.Top} />
      )}

      <div className="px-3 py-2.5">
        <div className="flex items-center gap-2 mb-1">
          <div className="shrink-0">{style.icon}</div>
          <span className={clsx('text-xs font-semibold leading-tight', style.text)}>
            {data.label}
          </span>
        </div>
        {data.approximateDurationMinutes && (
          <p className="text-[10px] text-surface-400">
            {data.approximateDurationMinutes} min
            {data.passingScore != null && ` · Pass: ${data.passingScore}%`}
          </p>
        )}
      </div>

      {selected && !isStartOrEnd && (
        <button
          onClick={(e) => { e.stopPropagation(); removeNode(id) }}
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07L4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929zM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m.28-6H9.72l-.333 1h5.226z" /></g></svg>
        </button>
      )}

      {type !== 'end' && (
        <Handle type="source" position={Position.Bottom} />
      )}
    </div>
  )
}

export default ALPNode;

export const nodeTypes = { alpNode: ALPNode };