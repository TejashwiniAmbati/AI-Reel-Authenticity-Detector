import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    Tooltip, ResponsiveContainer, Cell,
    PieChart, Pie
} from 'recharts';
import { Activity, ShieldCheck, ShieldAlert, Cpu, Zap, TrendingUp } from 'lucide-react';

const API_BASE = "http://localhost:8000/api/video";

const AIInsights = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get(`${API_BASE}/stats`);
                setStats(response.data);
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <Cpu className="w-8 h-8 text-cyber-blue animate-spin" />
        </div>
    );

    const pieData = [
        { name: 'Real', value: stats?.real_detected || 0, color: '#00f2ff' },
        { name: 'AI', value: stats?.ai_detected || 0, color: '#bc13fe' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard title="Total Scans" value={stats?.total_scans} icon={<Activity className="w-4 h-4" />} color="blue" />
                <StatCard title="AI Detected" value={stats?.ai_detected} icon={<ShieldAlert className="w-4 h-4" />} color="purple" />
                <StatCard title="Authenticity Rate" value={`${stats?.authenticity_rate}%`} icon={<ShieldCheck className="w-4 h-4" />} color="green" />
                <StatCard title="System Load" value={`${stats?.neural_load}%`} icon={<Zap className="w-4 h-4" />} color="yellow" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 min-h-[300px]">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-cyber-blue" />
                        Detection Distribution
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(0, 242, 255, 0.2)', color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                        {pieData.map(item => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                <span className="text-[10px] font-bold uppercase text-slate-400">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-cyber-purple" />
                        Top AI Artifacts
                    </h3>
                    <div className="space-y-4">
                        {stats?.top_anomalies.length > 0 ? stats.top_anomalies.map((anomaly, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono uppercase">
                                    <span className="text-slate-300">{anomaly.name}</span>
                                    <span className="text-cyber-purple">{anomaly.count} hits</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-cyber-purple"
                                        style={{ width: `${(anomaly.count / stats.total_scans) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        )) : (
                            <div className="h-48 flex items-center justify-center text-slate-600 italic text-xs">
                                No artifact data available yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const StatCard = ({ title, value, icon, color }) => {
    const colors = {
        blue: 'text-cyber-blue bg-cyber-blue/10 border-cyber-blue/20',
        purple: 'text-cyber-purple bg-cyber-purple/10 border-cyber-purple/20',
        green: 'text-green-400 bg-green-400/10 border-green-400/20',
        yellow: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
    };

    return (
        <div className={`glass-card p-4 border ${colors[color]}`}>
            <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">{title}</span>
                {icon}
            </div>
            <div className="text-2xl font-black tracking-tighter text-white">{value}</div>
        </div>
    );
};

export default AIInsights;
