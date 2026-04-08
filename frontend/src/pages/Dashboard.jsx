import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BarChart3,
    History,
    Settings,
    ShieldAlert,
    LogOut,
    Zap
} from 'lucide-react';
import Scanner from '../components/cyber/Scanner';
import ResultsPanel from '../components/cyber/ResultsPanel';
import HistoryView from '../components/cyber/HistoryView';
import AIInsights from '../components/cyber/AIInsights';
import SettingsView from '../components/cyber/SettingsView';

const API_BASE = "http://localhost:8000/api/video";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('scan'); // 'scan', 'history', 'stats', 'settings'
    const [scanningStatus, setScanningStatus] = useState('idle'); // 'idle', 'uploading', 'scanning', 'completed'
    const [, setVideoId] = useState(null);
    const [results, setResults] = useState(null);
    const [history, setHistory] = useState([]);

    const handleUpload = async (file) => {
        setScanningStatus('uploading');
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${API_BASE}/upload`, formData);
            setVideoId(response.data.video_id);
            setScanningStatus('scanning');
            pollResults(response.data.video_id);
        } catch (error) {
            console.error("Upload failed", error);
            setScanningStatus('idle');
            alert("Upload failed. Make sure the backend is running.");
        }
    };

    const handleLinkScan = async (url) => {
        setScanningStatus('uploading');
        const formData = new FormData();
        formData.append('url', url);

        try {
            const response = await axios.post(`${API_BASE}/upload`, formData);
            setVideoId(response.data.video_id);
            setScanningStatus('scanning');
            pollResults(response.data.video_id);
        } catch (error) {
            console.error("Link scan failed", error);
            setScanningStatus('idle');
            alert("Link scan failed. Make sure the backend is running.");
        }
    };

    const pollResults = async (id) => {
        const interval = setInterval(async () => {
            try {
                const response = await axios.get(`${API_BASE}/results/${id}`);
                const data = response.data;
                
                if (data.status === 'completed') {
                    setResults(data);
                    setScanningStatus('completed');
                    clearInterval(interval);
                    fetchHistory();
                } else if (data.status === 'error') {
                    console.error("Scan failed internally", data.message);
                    setScanningStatus('idle');
                    setResults(null);
                    clearInterval(interval);
                    alert(`Forensic Scan Failed: ${data.message || 'Unknown error'}`);
                }
            } catch (error) {
                console.error("Polling network failed", error);
                clearInterval(interval);
                setScanningStatus('idle');
            }
        }, 2000);
    };

    const fetchHistory = async () => {
        try {
            const response = await axios.get(`${API_BASE}/history`);
            setHistory(response.data);
        } catch (error) {
            console.error("History fetch failed", error);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    useEffect(() => {
        if (activeTab === 'history' || activeTab === 'scan') fetchHistory();
    }, [activeTab]);

    return (
        <div className="flex h-screen overflow-hidden bg-cyber-dark text-slate-200">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-black/20 flex flex-col p-6">
                <div className="flex items-center space-x-3 mb-12">
                    <div className="w-8 h-8 bg-gradient-to-tr from-cyber-blue to-cyber-purple rounded flex items-center justify-center">
                        <ShieldAlert className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold tracking-tighter text-cyber-blue uppercase">VeriMask</span>
                </div>

                <div className="space-y-2 flex-grow">
                    <button
                        onClick={() => setActiveTab('scan')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'scan' ? 'bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20' : 'hover:bg-white/5 text-slate-400'}`}
                    >
                        <Zap className="w-5 h-5" />
                        <span className="font-medium text-sm">Start Scan</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('history')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'history' ? 'bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20' : 'hover:bg-white/5 text-slate-400'}`}
                    >
                        <History className="w-5 h-5" />
                        <span className="font-medium text-sm">Scan History</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('stats')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'stats' ? 'bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20' : 'hover:bg-white/5 text-slate-400'}`}
                    >
                        <BarChart3 className="w-5 h-5" />
                        <span className="font-medium text-sm">AI Insights</span>
                    </button>
                </div>

                <div className="mt-auto space-y-2 pt-6 border-t border-white/5">
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'settings' ? 'bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20' : 'hover:bg-white/5 text-slate-500'}`}
                    >
                        <Settings className="w-5 h-5" />
                        <span className="font-medium text-sm">Settings</span>
                    </button>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-red-400/70"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow overflow-y-auto relative p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold uppercase tracking-widest text-white">
                            {activeTab === 'scan' ? 'Neural Scanner' : activeTab === 'history' ? 'Scan Archive' : activeTab === 'stats' ? 'System Insights' : 'System Configuration'}
                        </h2>
                        <p className="text-slate-500 text-sm">
                            {activeTab === 'scan' ? 'Monitor digital authenticity in real-time.' : activeTab === 'history' ? 'Review past detection reports.' : activeTab === 'stats' ? 'Global authenticity intelligence.' : 'Manage neural detection parameters.'}
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">System Online</span>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-cyber-blue/30 p-1">
                            <div className="w-full h-full rounded-full bg-gradient-to-tr from-cyber-blue to-cyber-purple"></div>
                        </div>
                    </div>
                </header>

                <div className="max-w-6xl">
                    {activeTab === 'scan' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                {scanningStatus === 'completed' && results ? (
                                    <ResultsPanel results={results} onReset={() => {
                                        setScanningStatus('idle');
                                        setResults(null);
                                    }} />
                                ) : (
                                    <Scanner status={scanningStatus} onUpload={handleUpload} onLinkScan={handleLinkScan} />
                                )}
                            </div>

                            <div className="space-y-6">
                                <div className="glass-card p-6 border-cyber-blue/10 bg-gradient-to-br from-cyber-card to-transparent">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                        <History className="w-4 h-4 text-cyber-blue" />
                                        Recent Activity
                                    </h3>
                                    <div className="space-y-4">
                                        {history.length > 0 ? history.slice(0, 5).map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-slate-300 truncate max-w-[120px]">{item.filename}</span>
                                                    <span className="text-[8px] font-mono text-slate-500 uppercase">{item.prediction}</span>
                                                </div>
                                                <div className={`text-[10px] font-bold ${item.prediction === 'AI Generated' ? 'text-red-400' : 'text-green-400'}`}>
                                                    {item.confidence}%
                                                </div>
                                            </div>
                                        )) : (
                                            <p className="text-xs text-slate-600 italic">No recent scans.</p>
                                        )}
                                    </div>
                                    {history.length > 5 && (
                                        <button
                                            onClick={() => setActiveTab('history')}
                                            className="w-full mt-4 py-2 text-[10px] font-bold uppercase tracking-widest text-cyber-blue hover:text-white transition-colors"
                                        >
                                            View All Activity
                                        </button>
                                    )}
                                </div>

                                <div className="glass-card p-6 border-cyber-purple/10">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Neural Status</h3>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-2 h-2 rounded-full bg-cyber-blue shadow-[0_0_8px_#14f1ff]"></div>
                                        <span className="text-[10px] font-mono text-cyber-blue uppercase tracking-widest">Model Active</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 leading-relaxed font-mono">
                                        [CORE] v4.2.0-stable<br />
                                        [LATENCY] 12ms<br />
                                        [PRECISION] 0.982
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <HistoryView history={history} />
                    )}

                    {activeTab === 'stats' && (
                        <AIInsights />
                    )}

                    {activeTab === 'settings' && (
                        <SettingsView />
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
