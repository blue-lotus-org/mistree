import React from 'react';
import { X } from 'lucide-react';
import { useSettingsStore } from '../store/settings';
import type { MistralModel } from '../types';

const MODELS: MistralModel[] = [
  'mistral-small-latest',
  'pixtral-12b-2409',
  'open-codestral-mamba',
  'open-mistral-nemo'
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SettingsModal({ open, onClose }: Props) {
  const { apiKey, model, setApiKey, setModel } = useSettingsStore();

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-4 border-b">
          <h2 className="text-2xl font-semibold text-slate-800">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Mistral API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              placeholder="Enter your API key"
            />
            <p className="text-xs text-slate-500">
              Your API key is stored securely in your browser's local storage.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              AI Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value as MistralModel)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
            >
              {MODELS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500">
              Select the Mistral AI model to use for diagram generation.
            </p>
          </div>
        </div>

        <div className="p-6 pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}