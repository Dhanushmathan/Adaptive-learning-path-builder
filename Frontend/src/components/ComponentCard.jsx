import clsx from 'clsx';
import React from 'react'

const TypeBadge = ({ type }) => {
    return (
        <span className={clsx(
            'text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded',
            type === 'assessment' ? 'bg-brand-100 text-brand-700' : 'bg-blue-100 text-blue-700'
        )}>
            {type}
        </span>
    )
}

const ComponentCard = ({ item }) => {

    const onDraftStart = (e) => {
        e.dataTransfer.setData('application/alp-component', JSON.stringify(item))
        e.dataTransfer.effectAllowed = 'copy'
    };

    return (
        <div
            draggable onDragStart={onDraftStart}
            className={clsx(
                'group relative p-3 rounded-xl border cursor-grab active:cursor-grabbing transition-all select-none',
                'bg-white border-surface-200 hover:border-brand-400 hover:shadow-node',
                item.type === 'assessment' ? 'hover:bg-brand-50' : 'hover:bg-blue-50'
            )}>
            <div className='flex items-start justify-between gap-2 mb-1.5'>
                <div className={clsx(
                    'w-7 h-7 rounded-full flex items-center justify-center shrink-0',
                    item.type === 'assessment' ? 'bg-brand-100' : 'bg-blue-100'
                )}>
                    {
                        item.type === 'assessment' ? <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className='text-brand-600'><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 3h2.6A2.4 2.4 0 0 1 21 5.4v15.2a2.4 2.4 0 0 1-2.4 2.4H5.4A2.4 2.4 0 0 1 3 20.6V5.4A2.4 2.4 0 0 1 5.4 3H8m0 11l3 3l5-7M8.8 1h6.4a.8.8 0 0 1 .8.8v2.4a.8.8 0 0 1-.8.8H8.8a.8.8 0 0 1-.8-.8V1.8a.8.8 0 0 1 .8-.8" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className='text-blue-600'><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7v14m-9-3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4a4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3a3 3 0 0 0-3-3z" /></svg>
                    }
                </div>
                <TypeBadge type={item.type} />
            </div>

            <p className='text-xs font-semibold text-surface-800 leading-tight mb-1 line-clamp-2'>
                {item.title}
            </p>
            <p className='text-[11px] text-surface-500 leading-relaxed line-clamp-2 mb-2'>
                {item.shortDescription}
            </p>

            <div className='flex items-center gap-1 text-[11px] text-surface-400'>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8" /><path fill="currentColor" d="M12.5 7H11v6l5.25 3.15l.75-1.23l-4.5-2.67z" /></svg>
                <span>{item.approximateDurationMinutes} min</span>
                {
                    item.metadata?.assessment && (
                        <span className='ml-auto text-brand-500 font-medium'>
                            Pass : {item.metadata.assessment.passingScore}%
                        </span>
                    )
                }
            </div>

            <div className='absolute inset-0 rounded-xl ring-2 ring-brand-400 opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity' />
        </div>
    )
}

export default ComponentCard;