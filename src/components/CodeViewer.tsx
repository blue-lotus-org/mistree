import React from 'react';
import { Copy, Download } from 'lucide-react';
import type { DiagramData } from '../types';

interface Props {
  data: DiagramData | null;
}

export default function CodeViewer({ data }: Props) {
  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!data) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Enter a GitHub URL to generate code
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Mermaid Diagram</h3>
          <div className="space-x-2">
            <button
              onClick={() => copyToClipboard(data.mermaid)}
              className="p-1 hover:bg-slate-200 rounded"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={() => downloadFile(data.mermaid, 'diagram.mmd')}
              className="p-1 hover:bg-slate-200 rounded"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
        <pre className="bg-white p-4 rounded border overflow-x-auto">
          {data.mermaid}
        </pre>
      </div>

      <div className="bg-slate-50 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">JSON Data</h3>
          <div className="space-x-2">
            <button
              onClick={() => copyToClipboard(data.json)}
              className="p-1 hover:bg-slate-200 rounded"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={() => downloadFile(data.json, 'data.json')}
              className="p-1 hover:bg-slate-200 rounded"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
        <pre className="bg-white p-4 rounded border overflow-x-auto">
          {data.json}
        </pre>
      </div>
    </div>
  );
}