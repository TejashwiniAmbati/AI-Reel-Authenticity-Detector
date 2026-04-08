import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Zap, Search, Eye, ArrowRight } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <Shield className="w-8 h-8 text-cyber-blue" />,
            title: "Deepfake Detection",
            desc: "State-of-the-art AI models to identify GAN noise and facial artifacts."
        },
        {
            icon: <Eye className="w-8 h-8 text-cyber-purple" />,
            title: "Frame Forensics",
            desc: "Analyze every frame for inconsistencies in lighting and lip sync."
        },
        {
            icon: <Zap className="w-8 h-8 text-cyber-blue" />,
            title: "Instant Results",
            desc: "Get an authenticity score within seconds of uploading your video."
        },
        {
            icon: <Search className="w-8 h-8 text-cyber-purple" />,
            title: "Explainable AI",
            desc: "Know exactly why a video was flagged with detailed heatmaps."
        }
    ];

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Navbar */}
            <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-tr from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center">
                        <Shield className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold tracking-tighter neon-text uppercase">VeriMask AI</span>
                </div>
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-widest text-slate-400">
                    <a href="#" className="hover:text-cyber-blue transition-colors">Features</a>
                    <a href="#" className="hover:text-cyber-blue transition-colors">How it works</a>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-5 py-2 glass-card border-none bg-cyber-blue/10 text-cyber-blue hover:bg-cyber-blue/20 transition-all"
                    >
                        Launch App
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 pt-20 pb-32 px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
                            DETECT <span className="text-transparent bg-clip-text bg-neon-gradient">DEEPFAKES</span> <br />
                            WITH PRECISION
                        </h1>
                        <p className="text-lg text-slate-400 mb-10 max-w-lg">
                            Unmask AI-generated reels and videos using our advanced cybersecurity scanner.
                            Upload or paste a link to verify authenticity in real-time.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="btn-cyber flex items-center justify-center gap-2 text-cyber-dark"
                            >
                                Scan Now <ArrowRight className="w-5 h-5" />
                            </button>
                            <button className="px-8 py-3 rounded-lg border border-slate-700 bg-white/5 hover:bg-white/10 transition-all font-bold">
                                View Documentation
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative glass-card p-4 aspect-video flex items-center justify-center overflow-hidden border-cyber-blue/50">
                            <div className="absolute inset-0 bg-cyber-blue/5 animate-pulse-slow"></div>
                            <div className="scan-line"></div>
                            <div className="text-center z-10">
                                <Search className="w-16 h-16 text-cyber-blue mx-auto mb-4 opacity-50" />
                                <p className="text-cyber-blue font-mono text-xs tracking-widest uppercase">Initializing Neural Scanner...</p>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyber-blue/20 blur-3xl rounded-full"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyber-purple/20 blur-3xl rounded-full"></div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative z-10 py-24 px-8 bg-black/40 border-y border-white/5">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4 uppercase tracking-widest">Advanced Features</h2>
                    <div className="h-1 w-20 bg-neon-gradient mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="glass-card p-8 group border-transparent hover:border-cyber-blue/30 transition-all"
                        >
                            <div className="mb-6 group-hover:scale-110 transition-transform">{f.icon}</div>
                            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-12 px-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center opacity-50 text-xs tracking-widest uppercase">
                    <p>© 2026 VeriMask AI. Built for Digital Authenticity.</p>
                    <div className="flex space-x-8 mt-4 md:mt-0">
                        <a href="#" className="hover:text-cyber-blue">Privacy Policy</a>
                        <a href="#" className="hover:text-cyber-blue">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
