import React, { useState } from 'react'
import TopBar from './components/TopBar';
import LeftPanel from './components/LeftPanel';
import Canvas from './components/Canvas/Canvas';
import PropertiesPanel from './components/RightPanel/PropertiesPanel';

const App = () => {

  const [mode, setMode] = useState('builder');

  return (
    <div className='font-poppins h-screen flex flex-col overflow-hidden bg-surface-100 text-surface-800'>
      <TopBar mode={mode} onModeChange={setMode} />

      <div className='flex flex-1 overflow-hidden'>
        <LeftPanel />

        <main className='flex-1 relative overflow-hidden'>
          {
            mode === 'builder' ? (
              <Canvas />
            ) : (
              <div className="flex items-center justify-center h-full text-surface-400 text-sm gap-2">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"><path d="M24 36c11.046 0 20-12 20-12s-8.954-12-20-12S4 24 4 24s8.954 12 20 12Z" /><path d="M24 29a5 5 0 1 0 0-10a5 5 0 0 0 0 10Z" /></g></svg>
                </span> Preview mode — coming soon
              </div>
            )
          }
        </main>

        <PropertiesPanel />
      </div>
    </div>
  )
}

export default App;