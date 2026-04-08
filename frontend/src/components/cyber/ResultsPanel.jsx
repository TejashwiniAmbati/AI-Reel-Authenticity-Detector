
import { motion } from 'framer-motion';
import {
    ShieldCheck,
    ShieldAlert,
    Info,
    Download,
    Activity,
    AlertTriangle,
    Search,
    Cpu
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

const ResultsPanel = ({ results, onReset }) => {
    const isAi = results?.results?.prediction === "AI Generated";

    const chartData = [
        { name: 'REALITY', value: results?.results?.reality_score_percent || 0, color: '#00f2ff' },
        { name: 'AI LIKELIHOOD', value: results?.results?.ai_likelihood_percent || 0, color: '#bc13fe' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 pb-12"
        >
            {/* Header Info */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${isAi ? 'bg-red-500/10 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'bg-green-500/10 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]'}`}>
                        {isAi ? <ShieldAlert className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
                    </div>
                    <div>
                        <h3 className="text-3xl font-black tracking-tighter uppercase italic">
                            {isAi ? <span className="text-red-500">POSSIBLY AI</span> : <span className="text-green-500">VERIFIED REAL</span>}
                        </h3>
                        <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">
                            Scan ID: {results?.video_id?.substring(0, 8) || 'Unknown'} • Accuracy: {results?.results?.confidence_percent || 0}%
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 glass-card hover:bg-white/10 transition-all text-slate-400">
                        <Download className="w-5 h-5" />
                    </button>
                    <button onClick={onReset} className="px-4 py-2 btn-cyber text-cyber-dark text-[10px] font-bold tracking-widest">
                        NEW SCAN
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Probability Meter */}
                <div className="md:col-span-2 glass-card p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="w-4 h-4 text-cyber-blue" />
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Authenticity Meter</span>
                    </div>

                    <div className="h-64 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                                <XAxis type="number" hide domain={[0, 100]} />
                                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} />
                                <Tooltip
                                    cursor={{ fill: '#ffffff05' }}
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(0, 242, 255, 0.2)', color: '#fff' }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* AI Insights Card */}
                <div className="glass-card p-6 bg-gradient-to-br from-cyber-card to-transparent border-cyber-blue/20">
                    <div className="flex items-center gap-2 mb-4">
                        <Info className="w-4 h-4 text-cyber-purple" />
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">AI Artifacts Detected</span>
                    </div>

                    {results?.results?.detected_anomalies?.length > 0 ? (
                        <ul className="space-y-4">
                            {results.results.detected_anomalies.map((anomaly, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-cyber-purple shadow-[0_0_5px_#bc13fe]"></div>
                                    <span className="text-sm text-slate-400 leading-tight">{anomaly}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center text-slate-600">
                            <ShieldCheck className="w-12 h-12 mb-2 opacity-20" />
                            <p className="text-xs font-mono">No significant anomalies detected in patterns.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Video Analysis Preview */}
            <div className="glass-card overflow-hidden">
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-cyber-blue" />
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Source Video</span>
                    </div>
                </div>
                <div className="w-full flex justify-center bg-black/80 aspect-video relative">
                    <video 
                        src={`http://localhost:8000/uploads/${results.video_id}.mp4`} 
                        controls 
                        className="h-full object-contain"
                    />
                </div>
            </div>

            {/* Frame Forensics Section */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <Search className="w-4 h-4 text-cyber-blue" />
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Frame Forensics Archive</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase">Archive Size: {results?.results?.suspicious_frames?.length || 0} frames</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {results?.results?.suspicious_frames?.map((frame, i) => (
                            <div key={i} className="relative group overflow-hidden rounded-lg border border-white/5 bg-black/40">
                                <img src={frame.data} alt="Suspicious frame" className="w-full aspect-video object-cover opacity-80 group-hover:opacity-100 transition-all" />
                                <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-500/80 text-[8px] font-bold text-white rounded flex items-center gap-1">
                                    <AlertTriangle className="w-2 h-2" />
                                    SUSPICIOUS #00{frame.frame_index}
                                </div>
                            </div>
                        ))}
                        {(!results?.results?.suspicious_frames || results.results.suspicious_frames.length === 0) && (
                            <div className="col-span-2 py-8 text-center text-slate-600 font-mono text-xs italic">
                                All frames marked consistent with real video dynamics.
                            </div>
                        )}
                    </div>
                </div>

                <div className="glass-card p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Cpu className="w-4 h-4 text-cyber-blue" />
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Metadata Analysis</span>
                    </div>

                    <div className="space-y-4">
                        <MetadataItem label="Resolution" value={results.metadata?.resolution || 'Unknown'} />
                        <MetadataItem label="Framerate" value={`${results.metadata?.fps || 0} FPS`} />
                        <MetadataItem label="Duration" value={`${results.metadata?.duration_sec || 0}s`} />
                        <MetadataItem label="File Size" value={`${results.metadata?.file_size_mb || 0} MB`} />
                        <MetadataItem label="Bitrate" value={`${results.metadata?.bitrate_kbps || 0} kbps`} />
                        <MetadataItem label="Codec" value={results.metadata?.codec || 'Unknown'} />
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5">
                        <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase mb-2">
                            <span>Processing Latency</span>
                            <span>{results.results.analysis_time_ms || 0}ms</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-cyber-blue opacity-50" style={{ width: '45%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const MetadataItem = ({ label, value }) => (
    <div className="flex justify-between items-center border-b border-white/5 pb-2">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
        <span className="text-xs font-mono text-slate-300">{value}</span>
    </div>
);

export default ResultsPanel;
