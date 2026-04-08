import { motion } from 'framer-motion';
import { Shield, Globe, Save } from 'lucide-react';

const SettingsView = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-6"
        >
            <div className="glass-card p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Shield className="w-5 h-5 text-cyber-blue" />
                    Neural Scanner Configuration
                </h3>

                <div className="space-y-8">
                    <SettingItem
                        title="Analysis Sensitivity"
                        description="Adjust the threshold for AI artifact detection."
                        control={
                            <div className="flex items-center gap-4 w-full max-w-xs">
                                <input type="range" className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyber-blue" />
                                <span className="text-xs font-mono text-cyber-blue">85%</span>
                            </div>
                        }
                    />

                    <SettingItem
                        title="Frame Sampling Rate"
                        description="Higher rates provide better accuracy but increase processing time."
                        control={
                            <select className="bg-black/40 border border-white/10 rounded-md px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyber-blue">
                                <option>8 Frames (Balanced)</option>
                                <option>16 Frames (High Detail)</option>
                                <option>32 Frames (Full Forensic)</option>
                            </select>
                        }
                    />

                    <SettingItem
                        title="Real-time Interception"
                        description="Automatically scan video streams in background."
                        control={<Toggle active={true} />}
                    />
                </div>
            </div>

            <div className="glass-card p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Globe className="w-5 h-5 text-cyber-purple" />
                    System Preferences
                </h3>

                <div className="space-y-8">
                    <SettingItem
                        title="Dark Protocol (UI Mode)"
                        description="Switch between high-contrast and phantom themes."
                        control={<Toggle active={true} />}
                    />

                    <SettingItem
                        title="Neural Notifications"
                        description="Get alerted when high-confidence AI content is detected."
                        control={<Toggle active={false} />}
                    />

                    <SettingItem
                        title="Data Retention"
                        description="How long to store scan history locally."
                        control={
                            <select className="bg-black/40 border border-white/10 rounded-md px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyber-blue">
                                <option>24 Hours</option>
                                <option>7 Days</option>
                                <option>30 Days</option>
                                <option>Infinite</option>
                            </select>
                        }
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4 pb-12">
                <button className="px-6 py-2 text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
                    Reset Defaults
                </button>
                <button className="px-8 py-2 btn-cyber text-cyber-dark text-xs font-bold tracking-widest flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Apply Changes
                </button>
            </div>
        </motion.div>
    );
};

const SettingItem = ({ title, description, control }) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wide">{title}</h4>
            <p className="text-xs text-slate-500 max-w-md">{description}</p>
        </div>
        <div className="flex-shrink-0">
            {control}
        </div>
    </div>
);

const Toggle = ({ active }) => (
    <div className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${active ? 'bg-cyber-blue/30' : 'bg-white/5 border border-white/10'}`}>
        <div className={`absolute top-1 w-3 h-3 rounded-full transition-all ${active ? 'bg-cyber-blue left-6 shadow-[0_0_8px_rgba(0,242,255,0.5)]' : 'bg-slate-600 left-1'}`}></div>
    </div>
);

export default SettingsView;
