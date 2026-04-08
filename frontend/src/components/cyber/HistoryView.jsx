import { Shield, ArrowUpRight } from 'lucide-react';

const HistoryView = ({ history }) => {
    if (history.length === 0) {
        return (
            <div className="glass-card p-12 text-center opacity-50 flex flex-col items-center">
                <Shield className="w-12 h-12 mb-4 text-slate-700" />
                <h4 className="text-lg uppercase tracking-widest font-bold mb-2">No Archived Scans</h4>
                <p className="text-sm max-w-xs mx-auto">Neural database is empty. Initiate your first scan to begin unmasking AI fakes.</p>
            </div>
        );
    }

    return (
        <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] uppercase font-bold tracking-widest text-slate-500 border-b border-white/5">
                        <tr>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Video Identification</th>
                            <th className="px-6 py-4 text-center">Prediction</th>
                            <th className="px-6 py-4 text-right">Confidence</th>
                            <th className="px-6 py-4 text-right">Timestamp</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {history.map((scan) => (
                            <tr key={scan.video_id} className="hover:bg-white/5 transition-all text-sm group">
                                <td className="px-6 py-4">
                                    <div className={`w-2 h-2 rounded-full ${scan.prediction === 'AI Generated' ? 'bg-red-500' : 'bg-green-500'} shadow-[0_0_8px_currentColor]`}></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-mono text-white text-xs truncate max-w-[200px]">{scan.filename}</div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-tighter">{scan.video_id.substring(0, 8)}</div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase ${scan.prediction === 'AI Generated' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                                        {scan.prediction.split(' ')[0]}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right font-mono text-cyber-blue">{scan.confidence}%</td>
                                <td className="px-6 py-4 text-right text-slate-500 text-xs">
                                    {new Date(scan.timestamp * 1000).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-1 opacity-0 group-hover:opacity-100 text-cyber-blue transition-all">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HistoryView;
