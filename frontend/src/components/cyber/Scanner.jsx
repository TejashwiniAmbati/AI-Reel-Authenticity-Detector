import React from 'react';
import { Upload, Link as LinkIcon, Search, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const Scanner = ({ status, onUpload, onLinkScan }) => {
    const [url, setUrl] = React.useState('');
    const isIdle = status === 'idle';
    const isUploading = status === 'uploading';
    const isScanning = status === 'scanning';

    const handleFileChange = (e) => {
        if (e.target.files[0]) onUpload(e.target.files[0]);
    };

    return (
        <div className="space-y-6">
            <div className="glass-card p-12 relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center border-dashed border-2 border-cyber-blue/20">
                {(isIdle || isUploading) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="z-10"
                    >
                        <div className="w-20 h-20 bg-cyber-blue/5 rounded-full flex items-center justify-center mb-6 mx-auto border border-cyber-blue/20 group-hover:bg-cyber-blue/10 transition-all">
                            {isUploading ? (
                                <Cpu className="w-10 h-10 text-cyber-blue animate-spin" />
                            ) : (
                                <Upload className="w-10 h-10 text-cyber-blue" />
                            )}
                        </div>
                        <h3 className="text-2xl font-bold mb-2 uppercase tracking-widest text-white">
                            {isUploading ? 'Securing Data Stream...' : 'Upload Video Evidence'}
                        </h3>
                        <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                            Drag and drop your MP4, MOV or AVI file for deepfake analysis.
                        </p>

                        <label className="btn-cyber cursor-pointer inline-flex items-center gap-2 text-cyber-dark uppercase text-xs tracking-widest">
                            <input type="file" className="hidden" accept="video/*" onChange={handleFileChange} disabled={isUploading} />
                            Browse Files
                        </label>
                    </motion.div>
                )}

                {isScanning && (
                    <div className="z-10 w-full max-w-md">
                        <div className="relative aspect-video glass-card border-cyber-blue/50 mb-8 flex items-center justify-center bg-black/40 overflow-hidden">
                            <div className="scan-line"></div>
                            <div className="absolute inset-0 grid-background opacity-20"></div>
                            <Search className="w-12 h-12 text-cyber-blue opacity-30 animate-pulse" />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-xs uppercase tracking-tighter mb-1">
                                <span className="text-cyber-blue">Neural Pattern Analysis</span>
                                <span className="text-slate-400">Processing...</span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 10, repeat: Infinity }}
                                    className="h-full bg-neon-gradient shadow-[0_0_10px_rgba(0,242,255,0.5)]"
                                />
                            </div>
                            <p className="text-[10px] text-slate-500 font-mono text-left">
                                [SYSTEM] Extracting frames... Detecting facial landmarks... Analyzing GAN noise...
                            </p>
                        </div>
                    </div>
                )}

                {/* Dynamic Background Effect */}
                <div className="absolute inset-0 grid-background opacity-10"></div>
                {isScanning && (
                    <motion.div
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-cyber-blue/5"
                    />
                )}
            </div>

            {isIdle && (
                <div className="glass-card p-6 flex items-center gap-4">
                    <div className="p-2 bg-cyber-purple/10 rounded border border-cyber-purple/20">
                        <LinkIcon className="w-5 h-5 text-cyber-purple" />
                    </div>
                    <div className="flex-grow">
                        <input
                            type="text"
                            placeholder="PASTE INSTAGRAM REEL LINK..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full bg-transparent border-none text-sm font-mono focus:ring-0 placeholder:text-slate-600 text-slate-300"
                        />
                    </div>
                        <button
                            onClick={() => {
                                if (url.trim()) {
                                    if (!url.includes('instagram.com/reel/') && !url.includes('instagram.com/p/')) {
                                        alert('Error: Please enter a valid Instagram Reel URL.');
                                        return;
                                    }
                                    onLinkScan(url);
                                }
                            }}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded uppercase text-[10px] font-bold tracking-widest transition-all"
                        >
                        Link Scan
                    </button>
                </div>
            )}
        </div>
    );
};

export default Scanner;
