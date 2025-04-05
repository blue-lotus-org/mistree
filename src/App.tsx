import React from 'react';
import { Github, AlertCircle } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import DiagramViewer from './components/DiagramViewer';
import CodeViewer from './components/CodeViewer';
import { useSettingsStore } from './store/settings';
import { parseGitHubUrl, fetchRepositoryStructure } from './utils/github';
import type { DiagramData } from './types';

function App() {
  const [url, setUrl] = React.useState('');
  const [activeTab, setActiveTab] = React.useState<'diagram' | 'code'>('diagram');
  const [data, setData] = React.useState<DiagramData | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { apiKey, model } = useSettingsStore();

  const generateDiagram = async () => {
    if (!url || !apiKey) return;
    
    // Validate GitHub URL
    const isValid = parseGitHubUrl(url);
    if (!isValid) {
      setError('Please enter a valid GitHub repository URL');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const data = await fetchRepositoryStructure(url);
      setData(data);
    } catch (error) {
      console.error('Error generating diagram:', error);
      setError('Failed to generate diagram. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto p-4 space-y-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter GitHub repository URL (e.g., https://github.com/owner/repo)"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-slate-300 outline-none"
            />
            <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <button
            onClick={generateDiagram}
            disabled={loading || !apiKey || !url}
            className="px-6 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('diagram')}
                className={`px-4 py-2.5 ${
                  activeTab === 'diagram'
                    ? 'border-b-2 border-slate-800 font-medium text-slate-800'
                    : 'text-gray-500 hover:text-gray-700'
                } transition-colors`}
              >
                Diagram
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-4 py-2.5 ${
                  activeTab === 'code'
                    ? 'border-b-2 border-slate-800 font-medium text-slate-800'
                    : 'text-gray-500 hover:text-gray-700'
                } transition-colors`}
              >
                Code
              </button>
            </div>
          </div>

          <div className="p-4 min-h-[500px]">
            {activeTab === 'diagram' ? (
              <DiagramViewer data={data} />
            ) : (
              <CodeViewer data={data} />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;