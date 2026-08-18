import React, { useState } from 'react';
import { Menu, X, Zap, Brain, Gamepad2, Code, Rocket, Settings, Home, ExternalLink, Book } from 'lucide-react';
import './App.css';

interface Module {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  status: 'active' | 'beta' | 'maintenance';
  liveDemo?: string;
  docs?: string;
  features: string[];
  techStack: string[];
}

const modules: Module[] = [
  {
    id: 'universal-method',
    name: 'Universal Comparability Method',
    description: 'Core comparative analysis engine with advanced algorithms and real-time visualization',
    icon: <Zap className="w-12 h-12" />,
    color: 'from-blue-400 to-cyan-500',
    status: 'active',
    liveDemo: 'https://universal-comparability-method.vercel.app',
    docs: '/docs/modules#universal-method',
    features: [
      'Multi-parameter comparison',
      'Real-time visualization',
      'Advanced analytics',
      'Export/import data',
      'REST API',
      'Custom rules'
    ],
    techStack: ['React 19', 'TypeScript', 'Vite', 'Express.js', 'Google GenAI']
  },
  {
    id: 'light-genesis',
    name: 'Light Genesis Core',
    description: 'Browser-native civilization operating system with modular architecture and procedural animations',
    icon: <Brain className="w-12 h-12" />,
    color: 'from-purple-400 to-pink-500',
    status: 'active',
    liveDemo: 'https://light-genesis-core.lovable.app',
    docs: '/docs/modules#light-genesis',
    features: [
      '8 Scanner modes',
      'Procedural animations',
      'Knowledge engine',
      'Radial controls',
      'Real-time simulation',
      'AI diagnostics'
    ],
    techStack: ['React 19', 'TanStack Start', 'Radix UI', 'Recharts', 'Bun']
  },
  {
    id: 'ai-vision',
    name: 'AI Vision',
    description: 'Programmable game engine with AI integration and vision processing capabilities',
    icon: <Gamepad2 className="w-12 h-12" />,
    color: 'from-orange-400 to-red-500',
    status: 'active',
    docs: '/docs/modules#ai-vision',
    features: [
      'Game mechanics',
      'AI integration',
      'Vision processing',
      'Multiple game modes',
      'Scriptable gameplay',
      'Real-time graphics'
    ],
    techStack: ['React', 'TypeScript', 'WebGL', 'Canvas', 'Physics Engine']
  },
  {
    id: 'light-protocol',
    name: 'Light Protocol',
    description: 'Advanced coding language specification with full compiler and runtime implementation',
    icon: <Code className="w-12 h-12" />,
    color: 'from-green-400 to-emerald-500',
    status: 'active',
    docs: '/docs/modules#light-protocol',
    features: [
      'Language specification',
      'Compiler frontend',
      'Runtime VM',
      'Type system',
      'Standard library',
      'Validator/Formatter'
    ],
    techStack: ['TypeScript', 'Lexer/Parser', 'AST', 'Code Generation', 'Bytecode']
  },
  {
    id: 'light-stage-one',
    name: 'Light Stage One',
    description: 'Foundation implementation of Light Protocol with core systems and testing framework',
    icon: <Rocket className="w-12 h-12" />,
    color: 'from-indigo-400 to-blue-500',
    status: 'active',
    docs: '/docs/modules#light-stage-one',
    features: [
      'Core protocol features',
      'Foundation structures',
      'Basic runtime',
      'Standard library',
      'Compiler frontend',
      'Testing framework'
    ],
    techStack: ['TypeScript', 'Lexer/Parser', 'Type System', 'Runtime', 'Jest']
  },
  {
    id: 'integrations',
    name: 'Extended Integrations',
    description: 'Advanced modules and experimental features extending all platforms',
    icon: <Settings className="w-12 h-12" />,
    color: 'from-yellow-400 to-orange-500',
    status: 'beta',
    docs: '/docs/modules#integrations',
    features: [
      'Concurrent execution',
      'Network protocols',
      'Database integration',
      'Microservices',
      'Cloud deployment',
      'Performance monitoring'
    ],
    techStack: ['TypeScript', 'Node.js', 'Docker', 'Kubernetes', 'gRPC']
  }
];

export default function App() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredModules = modules.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg transition"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Universal Platform Hub
              </h1>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 transition text-white placeholder-slate-400"
            />
            <button className="p-2 hover:bg-slate-800 rounded-lg transition">
              <Book className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 bg-slate-800/50 border-r border-slate-700/50 overflow-y-auto">
            <nav className="p-4 space-y-2">
              <button
                onClick={() => setSelectedModule(null)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition text-left font-medium"
              >
                <Home className="w-5 h-5" />
                Dashboard
              </button>
              {filteredModules.map(module => (
                <button
                  key={module.id}
                  onClick={() => setSelectedModule(module)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-left font-medium ${
                    selectedModule?.id === module.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-l-2 border-cyan-500'
                      : 'hover:bg-slate-700'
                  }`}
                >
                  <div className="text-cyan-400">{module.icon}</div>
                  <span className="text-sm">{module.name}</span>
                </button>
              ))}
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {!selectedModule ? (
            // Dashboard View
            <div className="p-8">
              <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">Welcome to Your Platform Hub</h2>
                  <p className="text-xl text-slate-300 max-w-3xl">
                    A unified ecosystem combining 6 distinct projects into a single, powerful interface. 
                    Each module maintains its individuality while sharing core infrastructure.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                  <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-cyan-400">6</div>
                    <div className="text-slate-400 mt-2">Integrated Modules</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-green-400">100%</div>
                    <div className="text-slate-400 mt-2">Operational Status</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-purple-400">∞</div>
                    <div className="text-slate-400 mt-2">Scalability</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-orange-400">Live</div>
                    <div className="text-slate-400 mt-2">Real-time Updates</div>
                  </div>
                </div>

                {/* Modules Grid */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-6">All Modules</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredModules.map(module => (
                      <button
                        key={module.id}
                        onClick={() => setSelectedModule(module)}
                        className="group text-left hover:scale-105 transition-transform duration-300"
                      >
                        <div className={`bg-gradient-to-br ${module.color} rounded-lg p-0.5 mb-4`}>
                          <div className="bg-slate-800 rounded-lg p-6 group-hover:bg-slate-700/50 transition h-full">
                            <div className="text-cyan-400 mb-4">{module.icon}</div>
                            <h4 className="text-xl font-bold text-white mb-2">{module.name}</h4>
                            <p className="text-slate-300 text-sm mb-4">{module.description}</p>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                module.status === 'active'
                                  ? 'bg-green-500/20 text-green-300'
                                  : 'bg-yellow-500/20 text-yellow-300'
                              }`}>
                                {module.status === 'active' ? '✓ Active' : '◆ Beta'}
                              </span>
                              <span className="text-cyan-400 group-hover:translate-x-1 transition">→</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Module Detail View
            <div className="p-8">
              <div className="max-w-5xl mx-auto">
                <button
                  onClick={() => setSelectedModule(null)}
                  className="mb-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition"
                >
                  ← Back to Dashboard
                </button>

                <div className={`bg-gradient-to-br ${selectedModule.color} rounded-lg p-0.5 mb-8`}>
                  <div className="bg-slate-800 rounded-lg p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="text-cyan-400">{selectedModule.icon}</div>
                        <div>
                          <h2 className="text-4xl font-bold text-white">{selectedModule.name}</h2>
                          <p className="text-slate-400 mt-2">{selectedModule.description}</p>
                        </div>
                      </div>
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        selectedModule.status === 'active'
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {selectedModule.status === 'active' ? '✓ Production Ready' : '◆ Beta Phase'}
                      </span>
                    </div>

                    {/* Live Demo & Docs Links */}
                    <div className="flex gap-3 mb-8">
                      {selectedModule.liveDemo && (
                        <a
                          href={selectedModule.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                      {selectedModule.docs && (
                        <a
                          href={selectedModule.docs}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
                        >
                          <Book className="w-4 h-4" />
                          Documentation
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">✨ Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedModule.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                        <span className="text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">🛠️ Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedModule.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-slate-700 to-slate-800 border border-slate-600 rounded-full text-sm text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Start */}
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">🚀 Quick Start</h3>
                  <div className="bg-slate-900 rounded p-4 font-mono text-sm text-slate-300 overflow-x-auto">
                    <div>npm run dev</div>
                    <div>→ Module starts on port 3000</div>
                    <div>→ Open browser to http://localhost:3000</div>
                  </div>
                </div>

                {/* API Info */}
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">📡 API Endpoints</h3>
                  <p className="text-slate-400 mb-4">
                    This module exposes REST API endpoints. See documentation for complete reference.
                  </p>
                  <div className="bg-slate-900 rounded p-4 font-mono text-sm text-slate-300 space-y-2">
                    <div><span className="text-orange-400">POST</span> /api/{selectedModule.id}/action</div>
                    <div><span className="text-blue-400">GET</span> /api/{selectedModule.id}/data</div>
                    <div><span className="text-green-400">PUT</span> /api/{selectedModule.id}/config</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
