import React from 'react';
import { Settings, Instagram as TreeDiagram } from 'lucide-react';
import SettingsModal from './SettingsModal';

export default function Header() {
  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <header className="bg-slate-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TreeDiagram className="w-6 h-6" />
          <h1 className="text-xl font-bold">MisTree</h1>
        </div>
        <button
          onClick={() => setShowSettings(true)}
          className="p-2 hover:bg-slate-700 rounded-full transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
      <SettingsModal open={showSettings} onClose={() => setShowSettings(false)} />
    </header>
  );
}