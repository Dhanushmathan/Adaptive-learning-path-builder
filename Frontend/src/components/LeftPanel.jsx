import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import { useBuilderStore } from '../store/builderStore';
import { fetchComponents } from '../api';
import ComponentCard from './ComponentCard';

const LeftPanel = () => {

  const { components, setComponents } = useBuilderStore();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [howOpen, setHowOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchComponents()
      .then((res) => setComponents(res.items))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [setComponents]);

  const filtered = components.filter(
    (c) => filter === 'all' || c.type === filter
  );

  return (
    <aside className='w-64 bg-white border-r border-surface-200 flex flex-col shrink-0 overflow-hidden'>
      <div className='px-4 pt-4 pb-3 border-b border-surface-100'>
        <h2 className='text-xs font-bold text-surface-700 uppercase tracking-widest mb-0.5'>
          Add Components
        </h2>
        <p className='text-[11px] text-surface-400'>Drag or click to add to canvas</p>
      </div>

      <div className='flex gap-1 px-3 py-2 border-b border-surface-100'>
        {['all', 'unit', 'assessment'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={clsx(
              'flex-1 py-1 text-[11px] font-medium rounded-md capitalize transition-all',
              filter === f ? 'bg-brand-500 text-white' : 'text-surface-500 hover:text-surface-700'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div>
        {
          loading ? [1, 2, 3].map((i) => (
            <div key={i} className='h-20 rounded-xl bg-surface-100 animate-pulse' />
          )) : filtered.length === 0 ? (
            <p className='text-center text-xs text-surface-400 py-8'>No components found</p>
          ) : (
            filtered.map((item, index) => <ComponentCard key={index} item={item} />))
        }
      </div>

      <div className='border-t border-surface-100 px-3 py-2'>
        <button
          onClick={() => setHowOpen(!howOpen)}
          className='w-full flex items-center gap-2 text-[11px] font-semibold text-surface-500 hover:text-surface-700 py-1'
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 432 432"><path fill="currentColor" d="M192 323V195h43v128zM213.5 3q88.5 0 151 62.5T427 216t-62.5 150.5t-151 62.5t-151-62.5T0 216T62.5 65.5T213.5 3m0 384q70.5 0 120.5-50t50-121t-50-121t-120.5-50T93 95T43 216t50 121t120.5 50M192 152v-43h43v43z" /></svg>
          How it works
          <svg xmlns="http://www.w3.org/2000/svg" className={clsx('ml-auto transition-transform', howOpen && 'rotate-180')} width="1em" height="1em" viewBox="0 0 1024 640"><path fill="currentColor" d="m577 608l426-434q21-21 21-51t-21-51l-51-51Q931 0 901 0t-51 21L512 359L174 21Q153 0 123 0T72 21L21 72Q0 93 0 123t21 51l428 434q32 32 64 32t64-32" /></svg>
        </button>
        {
          howOpen && (
            <div className="text-[11px] text-surface-500 leading-relaxed pb-2 space-y-1">
              <p>• Drag items from this panel onto the canvas</p>
              <p>• Connect nodes by dragging between handles</p>
              <p>• Click an edge to define routing conditions</p>
              <p>• Click a node to edit its properties</p>
            </div>
          )
        }
      </div>
    </aside>
  )
}

export default LeftPanel;