import React, { useState, version } from 'react'
import { useBuilderStore } from '../store/builderStore';
import { saveLearningPath } from '../api';
import clsx from 'clsx';

const TopBar = ({ mode, onModeChange }) => {

  const {
    pathName, setPathName, pathId, setPathId,
    pathStatus, setPathStatus,
    nodes, edges,
    isSaving, setIsSaving,
    lastSavedAt, setLastSavedAt, } = useBuilderStore();

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(pathName);

  const handleSave = async (publish = false) => {
    setIsSaving(true);
    try {
      const status = publish ? 'published' : 'draft';
      const saved = await saveLearningPath({
        id: pathId ?? undefined,
        name: pathName,
        status,
        version: 1,
        canvas: { zoom: 0.7, offsetX: 0, offsetY: 0 },
        nodes,
        edges,
      });
      if (saved.id) setPathId(saved.id);
      setPathStatus(status);
      setLastSavedAt(new Date().toISOString());
    } catch (error) {
      console.error('Error saving learning path:', error);
      alert('Failed to save learning path. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <header className='h-14 bg-white border-b bordersurface-200 flex items-center justify-between px-5 z-20 shadow-sm shrink-0'>
      <div className='flex items-center gap-3'>
        <div className='flex items-center gap-2'>
          <div className='w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M219.71 117.38a12 12 0 0 0-7.25-8.52l-51.18-20.47l10.59-70.61a12 12 0 0 0-20.64-10l-112 120a12 12 0 0 0 4.31 19.33l51.18 20.47l-10.59 70.64a12 12 0 0 0 20.64 10l112-120a12 12 0 0 0 2.94-10.84M113.6 203.55l6.27-41.77a12 12 0 0 0-7.41-12.92l-43.72-17.49l73.66-78.92l-6.27 41.77a12 12 0 0 0 7.41 12.92l43.72 17.49Z" /></svg>
          </div>
          <span className='text-sm font-semibold text-surface-700 hidden sm:block'>
            Learning Path Builder
          </span>
        </div>

        <span className='text-surface-200 select-none'>|</span>
        {
          editingName ? (
            <input type="text"
              autoFocus value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onBlur={() => { setPathName(nameInput); setEditingName(false) }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') { setPathName(nameInput); setEditingName(false) }
                if (e.key === 'Escape') { setNameInput(pathName); setEditingName(false) }
              }}
              className='text-sm font-medium text-surface-800 border-b border-brand-500 outline-none bg-transparent w-56'
            />
          ) : (
            <button className='text-sm font-medium text-surface-800 hover:text-brand-600 transition-colors' onClick={() => { setNameInput(pathName); setEditingName(true) }}>
              {pathName}
            </button>
          )
        }
        {
          pathStatus === 'published' && (
            <span className='text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium'>
              Published
            </span>
          )
        }
      </div>

      <div className='flex items-center gap-1 bg-surface-100 rounded-lg p-1'>
        {[
          { id: 'builder', label: 'Builder', Icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></g></svg> },
          { id: 'preview', label: 'Preview', Icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" className='text-surface-700' viewBox="0 0 48 48"><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="4"><path d="M24 36c11.046 0 20-12 20-12s-8.954-12-20-12S4 24 4 24s8.954 12 20 12Z" /><path d="M24 29a5 5 0 1 0 0-10a5 5 0 0 0 0 10Z" /></g></svg> },
        ].map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => onModeChange(id)}
            className={clsx('flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer transition-colors', mode === id ? 'bg-white text-blue-600 shadow-sm' : 'text-surface-700 hover:text-surface-800')}
          >
            <Icon size={15} />
            {label}</button>
        ))}
      </div>

      <div className='flex items-center gap-3'>
        {
          lastSavedAt && (
            <span className='text-xs text-surface-400 hidden md:block'>
              Saved {lastSavedAt.toLocaleString()}
            </span>
          )
        }
        <button
          onClick={() => handleSave(false)}
          disabled={isSaving}
          className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-200 bg-white text-xs font-medium text-surface-700 hover:bg-surface-50 transition-all disabled:opacity-50 cursor-pointer'
        >
          {isSaving ?
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="16" strokeDashoffset="16" d="M12 3c4.97 0 9 4.03 9 9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="16;0" /><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path><path strokeDasharray="64" strokeDashoffset="64" strokeOpacity=".3" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="64;0" /></path></g></svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 21H7m10 0h.803c1.118 0 1.677 0 2.104-.218c.377-.192.683-.498.875-.874c.218-.427.218-.987.218-2.105V9.22c0-.45 0-.675-.048-.889a2 2 0 0 0-.209-.545c-.106-.19-.256-.355-.55-.682l-2.755-3.062c-.341-.378-.514-.57-.721-.708a2 2 0 0 0-.61-.271C15.863 3 15.6 3 15.075 3H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 4.52 3 5.08 3 6.2v11.6c0 1.12 0 1.68.218 2.107c.192.377.497.683.874.875c.427.218.987.218 2.105.218H7m10 0v-3.803c0-1.118 0-1.678-.218-2.105a2 2 0 0 0-.875-.874C15.48 14 14.92 14 13.8 14h-3.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C7 15.52 7 16.08 7 17.2V21m8-14H9" /></svg>}
          Save Draft
        </button>
        <button
          onClick={() => handleSave(true)}
          disabled={isSaving}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 text-sm font-medium text-white hover:bg-brand-700 transition-all disabled:opacity-50 shadow-sm cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" /></svg>
          Publish
        </button>
      </div>
    </header>
  )
}

export default TopBar;