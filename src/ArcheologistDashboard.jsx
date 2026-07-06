import React, { useState, useEffect } from 'react';
import { Terminal, Play, ShieldAlert, Cpu, Search, User, Zap, Lock, Unlock, Edit3, Trash2, Save, BarChart2, Volume2, VolumeX, ShieldCheck, Info, PlusCircle, Globe, Radio } from 'lucide-react';
import { supabase } from './supabaseClient';

export default function ArcheologistDashboard() {
  const [artifacts, setArtifacts] = useState([]);
  const [filteredArtifacts, setFilteredArtifacts] = useState([]);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [activeEra, setActiveEra] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Advanced v7.0 OS Architecture Engines
  const [isBooting, setIsBooting] = useState(true);
  const [bootLogs, setBootLogs] = useState([]);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [emulatorOutput, setEmulatorOutput] = useState('');
  const [loading, setLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [editedCode, setEditedCode] = useState('');
  const [terminalInput, setTerminalInput] = useState('');
  const [showHiddenSocials, setShowHiddenSocials] = useState(false);

  // Live Hardware Signals (Location & News)
  const [coordinates, setCoordinates] = useState({ lat: 'FETCHING...', lon: 'FETCHING...' });
  const [liveNews, setLiveNews] = useState('SYNCING TECH SATELLITE CHANNELS...');

  // Deep Security Lockdowns
  const [isAdmin, setIsAdmin] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [authError, setAuthError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);

  // Input Data Buffers
  const [newTitle, setNewTitle] = useState('');
  const [newEra, setNewEra] = useState('MS-DOS Era');
  const [newLanguage, setNewLanguage] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCode, setNewCode] = useState('');
  const [formStatus, setFormStatus] = useState('');

  // Auto-Rotating Mock Live Tech News Stream Database
  const techNewsFeed = [
    "🚨 QUANTUM FIREWALL V3 DEPLOYED BY GLOBAL NETWORKS",
    "⚡ GEMINI MODELS COMPILING MULTI-MODAL PIPELINES LIVE",
    "💾 SUPABASE INSTANCE DISCOVERS ANCIENT SOURCE BLOCK ROWS",
    "🔒 KERNEL ISOLATION PROTOCOLS BREACHED IN LEGACY DOS EMULATORS",
    "🛰️ NETWORKS SYNCED: SECURE MAINFRAME ENCRYPTION SECURED"
  ];

  // Dynamic Audio FX Synthesis Engine
  const playBeep = (freq = 440, type = 'square', duration = 0.08) => {
    if (!isAudioOn) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = type; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  };

  // Hardware Initialization Hook (Favicon, Location, Notifications, Anti-Right Click)
  useEffect(() => {
    // 1. Dynamic Favicon Stream
    try {
      const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%23030712"/><text y="70" x="15" fill="%2310b981" font-family="monospace" font-weight="bold" font-size="65">&gt;_</text></svg>`;
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/svg+xml'; link.rel = 'shortcut icon';
      link.href = `data:image/svg+xml,${svgIcon}`;
      document.getElementsByTagName('head')[0].appendChild(link);
    } catch (e) {}

    // 2. Hardware Geo-Location Tracker
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoordinates({
            lat: pos.coords.latitude.toFixed(4) + '° N',
            lon: pos.coords.longitude.toFixed(4) + '° E'
          });
        },
        () => setCoordinates({ lat: 'ACCESS DENIED', lon: 'ACCESS DENIED' })
      );
    } else {
      setCoordinates({ lat: 'UNSUPPORTED', lon: 'UNSUPPORTED' });
    }

    // 3. Native Push Notification Access Protocol
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log("Notification telemetry pipelines mapped.");
        }
      });
    }

    // 4. Global Anti-Right Click Loop Protection
    const handleContextMenu = (e) => {
      // Input boxes aur textarea ko chhodkar baki sab block
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);

    // 5. Tech News Feed Rotator Loop
    let newsIndex = 0;
    const newsInterval = setInterval(() => {
      setLiveNews(techNewsFeed[newsIndex % techNewsFeed.length]);
      newsIndex++;
    }, 4000);

    // 6. OS Kernel Boot Simulation
    const logs = [
      "[0.00ms] CRITICAL LAYOUT ENVIROMENT: LOCKED IN 100VH OS SOFTWARE STACK",
      "[0.02ms] GEO-LOCATION CHANNELS INITIALIZING INTERACTIVE HANDSHAKE...",
      "[0.05ms] GLOBAL SELECTION BOUNDS LOCKED down EXCLUDING DATA NODES",
      "[0.09ms] COMPILING LIVE TELEMETRY TICKER BROADCAST CHANNELS...",
      "[0.14ms] REQUESTING HARDWARE NOTIFICATION CHANNELS INTERFACE... DEPLOYED",
      "[0.20ms] ANTI-SCREENSHOT BUFFER SECURITY POLICIES ENGAGED",
      "[0.26ms] STABLE CORE COMPILATION READY. WELCOME BACK SYSTEMS EXECUTIVE MANISH."
    ];
    
    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setBootLogs(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
        setTimeout(() => setIsBooting(false), 400);
      }
    }, 200);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      clearInterval(logInterval);
      clearInterval(newsInterval);
    };
  }, []);

  const fetchArtifacts = async () => {
    try {
      const { data, error } = await supabase
        .from('artifacts')
        .select('*')
        .order('year', { ascending: true });

      if (error) throw error;
      if (data) {
        setArtifacts(data);
        setFilteredArtifacts(data);
        if (data.length > 0) {
          setSelectedArtifact(data[0]);
          setEditedCode(data[0].code);
        }
      }
    } catch (error) {
      setEmulatorOutput(`[CONNECTION TERMINATED] Supabase Stream Fail: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isBooting) {
      fetchArtifacts();
      setEmulatorOutput(`System Architecture Core v7.0 Fully Active.\n\n[OS STATUS]: Secure Workspace Lock Applied. Global text extraction vectors disabled.\n\nUse Command prompt shell matrix for core operations.`);
    }
  }, [isBooting]);

  useEffect(() => {
    let results = artifacts;
    if (activeEra !== 'ALL') { results = results.filter(item => item.era === activeEra); }
    if (searchTerm) {
      results = results.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.language.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredArtifacts(results);
  }, [searchTerm, activeEra, artifacts]);

  const handleSelectArtifact = (item) => {
    if (isRunning) return;
    playBeep(680, 'sine', 0.04);
    setSelectedArtifact(item);
    setEditedCode(item.code);
    setIsEditable(false);
    setEmulatorOutput(`[MOUNTED] Active Sector Row Pointer: ${item.title}`);
  };

  const handleTerminalCommand = (e) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    playBeep(980, 'sine', 0.04);
    
    if (command === 'sys.social') {
      setShowHiddenSocials(true);
      setEmulatorOutput(prev => prev + '\n\n[DECRYPT] Verification Match. Mounted identity network blocks within iframe wrapper layer.');
    } else if (command === 'clear') {
      setEmulatorOutput('[CLEARED] Local system shell register registers wiped.');
    } else if (command === 'help') {
      setEmulatorOutput(prev => prev + '\n\nAvailable Node Vectors:\n- sys.social : Load secure portfolio identity array\n- clear : Flush console display registers\n- help : Map system architecture blueprints');
    } else {
      setEmulatorOutput(prev => prev + `\n\n[SHELL OVERLOAD] "${command}" command parameter not recognized.`);
    }
    setTerminalInput('');
  };

  const handleUpdateArtifact = async () => {
    if (!isAdmin) return;
    playBeep(880, 'triangle', 0.1);
    setEmulatorOutput('[MUTATION ENGINE] Patching live structural blocks to Supabase...');
    try {
      const { error } = await supabase
        .from('artifacts')
        .update({ code: editedCode })
        .eq('id', selectedArtifact.id);

      if (error) throw error;
      setEmulatorOutput(`[SUCCESS] Encryption Node updated committed: ${selectedArtifact.title}`);
      setIsEditable(false);
      await fetchArtifacts();
    } catch (error) {
      setEmulatorOutput(`[MUTATION REFUSED] Security Layer Error: ${error.message}`);
    }
  };

  const handleDeleteArtifact = async (id) => {
    if (!isAdmin) return;
    if (!window.confirm("[WARNING] Vaporize this matrix cell row permanently?")) return;
    playBeep(120, 'sawtooth', 0.4);
    try {
      const { error } = await supabase.from('artifacts').delete().eq('id', id);
      if (error) throw error;
      setEmulatorOutput('[WIPED] Secure Database Cell Row Cleared.');
      setSelectedArtifact(null);
      await fetchArtifacts();
    } catch (error) {
      setEmulatorOutput(`[DENIED] Supabase server rejection: ${error.message}`);
    }
  };

  const handleAuthBypass = (e) => {
    e.preventDefault();
    if (isLockedOut) return;

    if (passphrase === 'manish99') {
      setIsAdmin(true); setAuthError('');
      playBeep(1100, 'sine', 0.12);
      setEmulatorOutput('[ACCESS APEX GRANTED] Executive Root parameters unlocked for Lead Architect MANISH RAJDOOT.');
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      playBeep(90, 'sawtooth', 0.5);
      
      if (newAttempts >= 3) {
        setIsLockedOut(true); setAuthError('IP INTERCEPT BAN ACTIVE');
        setEmulatorOutput('[CRITICAL MODE] Security system lockdown engaged. Form channels restricted.');
      } else {
        setAuthError(`DENIED (${newAttempts}/3)`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    setFormStatus('[SANITIZING ENGINE STREAMING...]');
    try {
      const { error } = await supabase.from('artifacts').insert([{
        title: newTitle, era: newEra, language: newLanguage,
        year: parseInt(newYear) || 2026, description: newDescription, code: newCode
      }]);
      
      if (error) throw error;
      setFormStatus('[SUCCESS] Core Node cataloged cleanly!');
      setNewTitle(''); setNewLanguage(''); setNewYear(''); setNewDescription(''); setNewCode('');
      await fetchArtifacts();
      setTimeout(() => setFormStatus(''), 2000);
    } catch (error) { setFormStatus(`[FAIL]: ${error.message}`); }
  };

  const handleRunEmulator = () => {
    if (!selectedArtifact || isRunning) return;
    setIsRunning(true);
    const lines = [
      `[OS_VIRTUAL_BOX] Allocating runtime heap descriptors...`,
      `[SECURITY] Processing sandbox execution loops...`,
      `\n======================================================`,
      `              NATIVE CODE PARSING CONTAINER RUNNING    `,
      `======================================================`
    ];
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setEmulatorOutput(prev => prev + '\n' + lines[currentLine]);
        playBeep(750 + (currentLine * 40), 'square', 0.02);
        currentLine++;
      } else {
        clearInterval(interval);
        setEmulatorOutput(prev => prev + '\n' + editedCode.substring(0, 500) + '\n\n>>> Runtime context terminated. Exited with clean system vector matrix.');
        setIsRunning(false);
      }
    }, 80);
  };

  const getEraLength = (era) => artifacts.filter(item => item.era === era).length;

  if (isBooting) {
    return (
      <div className="w-screen h-screen bg-gray-950 text-emerald-500 font-mono flex flex-col items-start justify-center p-8 crt-effect select-none" style={{ cursor: 'crosshair' }}>
        <div className="max-w-2xl space-y-2 text-xs tracking-wider leading-6">
          <div className="text-emerald-400 font-bold text-sm mb-4 animate-pulse">[SYSTEM UPGRADE ENGINE v7.0 - SOFTWARE LOCK DEPLOYED]</div>
          {bootLogs.map((log, index) => <div key={index} className="whitespace-pre-wrap">{log}</div>)}
          <div className="h-4 w-2 bg-emerald-500 animate-ping mt-2 inline-block" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-gray-950 text-emerald-400 font-mono flex flex-col crt-effect overflow-hidden select-none" style={{ cursor: 'crosshair' }}>
      
      {/* Top Global Command Bar Widget Panel */}
      <header className="border-b border-emerald-900 bg-gray-900/90 px-6 py-2.5 flex justify-between items-center backdrop-blur-md z-30 shadow-md shrink-0">
        <div className="flex items-center space-x-3">
          <Terminal className="h-5 w-5 text-emerald-500 animate-pulse" />
          <h1 className="text-sm font-black tracking-widest text-emerald-300 retro-glow uppercase">
            THE CODE ARCHEOLOGIST <span className="text-[7px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-800 ml-1 font-bold">OS_v7.0_CORE_FIXED</span>
          </h1>
        </div>

        {/* Real-time Hardware Geolocation Tracking Array Matrix */}
        <div className="hidden lg:flex items-center space-x-4 border-l border-r border-emerald-900/40 px-6 mx-4 text-[9px] font-bold text-emerald-500 tracking-wider">
          <Globe className="h-3.5 w-3.5 text-cyan-500 animate-spin" style={{ animationDuration: '8s' }} />
          <div className="flex space-x-3">
            <span>TARGET LAT: <span className="text-cyan-400 font-mono">{coordinates.lat}</span></span>
            <span>TARGET LON: <span className="text-cyan-400 font-mono">{coordinates.lon}</span></span>
          </div>
        </div>
        
        <div className="flex items-center space-x-5">
          <button onClick={() => setIsAudioOn(!isAudioOn)} className="p-1 border border-emerald-950 hover:border-emerald-800 rounded text-emerald-600 transition" style={{ cursor: 'cell' }}>
            {isAudioOn ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5 text-red-500" />}
          </button>
          <div className="flex flex-col items-end">
            <span className="text-[7px] text-emerald-600 font-black tracking-widest uppercase">Lead Enterprise Architect</span>
            <span className="text-xs text-emerald-300 font-black tracking-widest retro-glow">MANISH RAJDOOT</span>
          </div>
          <div className="flex items-center space-x-1.5 text-[8px] text-emerald-400 bg-black/60 px-2 py-1.5 rounded border border-emerald-900">
            <ShieldCheck className="h-3 w-3 text-emerald-400 animate-pulse" />
            <span className="tracking-widest font-black uppercase">{isAdmin ? 'ROOT HIGH LEVEL' : 'SOFTWARE MATRIX SECURE'}</span>
          </div>
        </div>
      </header>

      {/* Global Tech Feed Banner Live Stream Widget Ticker */}
      <div className="bg-emerald-950/20 border-b border-emerald-900/30 px-6 py-1 flex items-center space-x-3 text-[9px] font-bold shrink-0 tracking-widest text-cyan-400 select-none">
        <Radio className="h-3 w-3 text-cyan-400 animate-pulse shrink-0" />
        <span className="text-emerald-700 shrink-0 uppercase font-black">[LIVE TECH TRANSMISSION FEED]:</span>
        <div className="truncate animate-pulse">{liveNews}</div>
      </div>

      {/* Locked Desktop Workspace Interface Layout Viewport Grid */}
      <div className="flex-1 flex overflow-hidden min-h-0 relative z-20">
        
        {/* Left Side Control Panel Rack Section */}
        <aside className="w-76 border-r border-emerald-900/40 bg-black/50 flex flex-col backdrop-blur-md shrink-0 overflow-hidden h-full">
          <div className="p-3 space-y-3 flex flex-col h-full overflow-hidden">
            
            <div className="relative select-text">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-emerald-800" />
              <input 
                type="text" placeholder="Scan repository indexes..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black border border-emerald-950 rounded py-2 pl-9 pr-3 text-xs text-emerald-400 focus:outline-none focus:border-emerald-600 transition-all font-mono select-text"
                style={{ cursor: 'text' }}
              />
            </div>

            <div className="grid grid-cols-2 gap-1 text-[8px] font-bold tracking-tight shrink-0">
              {['ALL', 'MS-DOS Era', 'Web 1.0', 'Cyberpunk Modern'].map(era => (
                <button 
                  key={era} onClick={() => { playBeep(520, 'sine', 0.02); setActiveEra(era); }}
                  className={`p-1.5 border rounded uppercase truncate transition ${activeEra === era ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-[0_0_5px_rgba(52,211,153,0.15)]' : 'border-emerald-950 text-emerald-700'}`}
                  style={{ cursor: 'cell' }}
                >
                  {era === 'ALL' ? 'Show All' : era}
                </button>
              ))}
            </div>

            {/* In-depth Dynamic Data Science Data Stream Indicator Widget */}
            <div className="border border-emerald-950 bg-black/80 p-2.5 rounded text-[8px] space-y-1.5 font-mono tracking-wide shrink-0">
              <div className="text-emerald-700 font-black flex items-center mb-0.5"><BarChart2 className="h-3 w-3 mr-1" /> CLUSTER LAYER RATIO INDICATORS</div>
              <div className="space-y-1">
                <div className="flex justify-between text-[7px]"><span>MS-DOS ROWS:</span><span>{getEraLength('MS-DOS Era')}</span></div>
                <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden border border-emerald-950/20">
                  <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${(getEraLength('MS-DOS Era')/Math.max(artifacts.length, 1))*100}%` }} />
                </div>
                <div className="flex justify-between text-[7px] mt-1"><span>WEB INTERFACE CHANNELS:</span><span>{getEraLength('Web 1.0')}</span></div>
                <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden border border-emerald-950/20">
                  <div className="bg-cyan-500 h-full transition-all duration-500" style={{ width: `${(getEraLength('Web 1.0')/Math.max(artifacts.length, 1))*100}%` }} />
                </div>
              </div>
            </div>

            <div className="text-[8px] font-black uppercase tracking-widest text-emerald-700 border-b border-emerald-950 pb-1 shrink-0">CATALOGUED NODES MAP ({filteredArtifacts.length})</div>
            <div className="space-y-1.5 flex-1 overflow-y-auto custom-scrollbar pr-1">
              {filteredArtifacts.map((item) => (
                <div 
                  key={item.id}
                  className={`w-full p-2 rounded border flex justify-between items-center transition-all duration-300 ${selectedArtifact?.id === item.id ? 'bg-emerald-950/20 border-emerald-500 text-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.1)]' : 'border-emerald-950 text-emerald-600'}`}
                >
                  <button onClick={() => handleSelectArtifact(item)} className="flex-1 text-left min-w-0 font-bold text-xs truncate tracking-wide" style={{ cursor: 'cell' }}>
                    {item.title}
                    <div className="flex space-x-2 mt-1 text-[8px] opacity-60 font-mono"><span>{item.year}</span><span>•</span><span className="uppercase text-[7px]">{item.language}</span></div>
                  </button>
                  {isAdmin && (
                    <button onClick={() => handleDeleteArtifact(item.id)} className="text-red-900 hover:text-red-400 p-1.5 transition ml-1 shrink-0" title="Purge Record Row" style={{ cursor: 'cell' }}>
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="border border-emerald-950 bg-emerald-950/5 p-2 rounded flex items-center space-x-2 mt-auto shadow-inner shrink-0">
              <div className="h-8 w-8 bg-black border border-emerald-900 rounded flex items-center justify-center"><User className="h-4 w-4 text-emerald-500" /></div>
              <div className="flex-1 min-w-0">
                <div className="text-[7px] font-black text-emerald-700 tracking-wider">CREATOR MASTER SECURITY IDENTIFIER</div>
                <div className="text-xs font-black text-emerald-300 truncate tracking-widest">M. RAJDOOT</div>
                <div className="text-[7px] text-emerald-600 font-mono mt-0.5 uppercase truncate">Data Scientist / Core Systems Pro</div>
              </div>
              <Zap className="h-3 w-3 text-emerald-400 animate-pulse shrink-0" />
            </div>

          </div>
        </aside>

        {/* Center Workspace Monitor Display Box Panel */}
        <main className="flex-1 flex flex-col bg-gray-950/10 min-w-0 border-r border-emerald-900/40 overflow-hidden h-full">
          {selectedArtifact && (
            <>
              <div className="p-4 bg-black/40 border-b border-emerald-900/40 flex justify-between items-center backdrop-blur-xs shrink-0 select-text">
                <div>
                  <h2 className="text-sm font-black text-emerald-300 tracking-wider uppercase flex items-center select-text">
                    <span>{selectedArtifact.title}</span>
                    {isEditable && <span className="text-[7px] bg-amber-950 text-amber-400 px-1.5 py-0.5 border border-amber-800 ml-2 rounded font-mono font-black tracking-widest">MUTATION_ACTIVE</span>}
                  </h2>
                  <p className="text-xs text-emerald-600 mt-1 font-medium select-text">{selectedArtifact.description}</p>
                </div>
                
                <div className="flex items-center space-x-2 shrink-0">
                  {isAdmin && (
                    <button 
                      onClick={() => { setIsEditable(!isEditable); playBeep(600, 'sine', 0.05); }}
                      className={`p-2 border rounded transition ${isEditable ? 'bg-emerald-500 text-black border-emerald-400' : 'border-emerald-950 text-emerald-600 hover:text-emerald-400'}`}
                      title="Toggle Storage Data Writer" style={{ cursor: 'cell' }}
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                  )}
                  {isEditable && isAdmin && (
                    <button onClick={handleUpdateArtifact} className="p-2 border border-cyan-900 bg-cyan-950/40 text-cyan-400 hover:bg-cyan-500 hover:text-black rounded transition" title="Inject Safe Changes" style={{ cursor: 'cell' }}>
                      <Save className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    onClick={handleRunEmulator} disabled={isRunning}
                    className={`flex items-center space-x-2 px-4 py-2 rounded font-black text-xs tracking-widest border transition-all duration-300 ${isRunning ? 'bg-black text-emerald-900 border-emerald-950' : 'bg-emerald-500 hover:bg-emerald-400 text-gray-950 border-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]'}`}
                    style={{ cursor: 'cell' }}
                  >
                    <Play className="h-3 w-3 fill-current" />
                    <span>{isRunning ? 'EXEC_SANDBOX...' : 'RUN_EMULATOR'}</span>
                  </button>
                </div>
              </div>

              {/* Secure Pre-formatted Code Panel Box (Explicitly copy-paste capable and selection unlocked) */}
              <div className="flex-1 bg-black/70 font-mono text-xs p-4 overflow-hidden relative flex flex-col shadow-inner min-h-0 select-text">
                {isEditable ? (
                  <textarea
                    value={editedCode} onChange={(e) => setEditedCode(e.target.value)}
                    className="w-full flex-1 bg-transparent text-emerald-400 border-none outline-none font-mono text-xs leading-relaxed resize-none custom-scrollbar focus:ring-0 p-0 select-text"
                    style={{ cursor: 'text' }}
                  />
                ) : (
                  <pre className="text-emerald-400/90 whitespace-pre-wrap overflow-y-auto flex-1 custom-scrollbar select-text">{editedCode}</pre>
                )}
              </div>
            </>
          )}

          {/* Core Command Shell Frame Prompt */}
          <div className="h-44 bg-black p-4 flex flex-col border-t border-emerald-900/40 shadow-2xl shrink-0 relative">
            <div className="text-[8px] text-emerald-600 font-bold tracking-widest uppercase mb-1.5 flex justify-between items-center">
              <span>[CORE_COMMAND_PROMPT_SHELL]</span>
              <span className="text-[7px] bg-emerald-950 px-1 rounded border border-emerald-900">anti-selection framework locked</span>
            </div>
            
            <div className="flex-1 overflow-y-auto text-xs text-emerald-400/90 whitespace-pre-wrap font-mono leading-5 custom-scrollbar pr-1 select-text">
              {emulatorOutput}
            </div>

            <form onSubmit={handleTerminalCommand} className="mt-2 pt-1.5 border-t border-emerald-950 flex items-center space-x-2 select-text">
              <span className="text-emerald-600 text-xs font-bold font-mono">rajdoot@core:~#</span>
              <input 
                type="text" value={terminalInput} onChange={e => setTerminalInput(e.target.value)}
                placeholder="Type 'help' or direct terminal macros allocation vectors..."
                className="flex-1 bg-transparent text-emerald-400 text-xs font-mono border-none outline-none focus:ring-0 p-0 select-text"
                style={{ cursor: 'text' }}
              />
            </form>
          </div>
        </main>

        {/* Right Section Panel Form Registry Controls Rack */}
        <section className="w-80 bg-black/40 p-4 flex flex-col space-y-4 overflow-y-auto backdrop-blur-md shrink-0 h-full">
          
          {!isAdmin ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center space-y-4 my-auto select-text">
              <div className="h-10 w-10 border border-dashed border-red-900 bg-red-950/20 rounded-full flex items-center justify-center text-red-500 animate-pulse">
                <Lock className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-black tracking-widest text-red-400 uppercase">INJECTION PORT CLOSED</h3>
                <p className="text-[9px] text-emerald-700 mt-1 uppercase font-semibold leading-4">Anti brute protection wall engage. Feed administrative bypass key.</p>
              </div>
              
              <form onSubmit={handleAuthBypass} className="w-full space-y-2 select-text">
                <input 
                  type="password" disabled={isLockedOut} placeholder={isLockedOut ? "LOCK CONTROLS INERT" : "ENTER SECRET TOKEN..."} value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  className="w-full bg-black border border-red-950 rounded p-2.5 text-center text-xs tracking-widest text-red-500 font-mono focus:outline-none focus:border-red-700 shadow-inner disabled:opacity-40 select-text"
                  style={{ cursor: 'text' }}
                />
                {authError && <div className="text-[9px] text-red-500 font-bold uppercase tracking-wide">{authError}</div>}
                <button type="submit" disabled={isLockedOut} className="w-full border border-red-900 bg-red-950/40 text-red-400 py-1.5 rounded font-black uppercase text-[9px] tracking-widest hover:bg-red-900 hover:text-black transition disabled:opacity-40" style={{ cursor: 'cell' }}>
                  BYPASS ENCRYPTION SHIELD
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className="flex flex-col shrink-0">
                <div className="text-[8px] font-black text-cyan-400 tracking-widest uppercase mb-0.5 flex items-center">
                  <Unlock className="h-3 w-3 mr-1 animate-pulse" /> Signature Pipeline Unlocked
                </div>
                <div className="text-xs font-black text-emerald-300 tracking-widest uppercase retro-glow flex items-center">
                  <PlusCircle className="h-4 w-4 mr-1.5 text-emerald-500" />
                  Deposit Vector Block
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs flex-1 flex flex-col min-h-0 select-text">
                <div>
                  <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Project Name</label>
                  <input required type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Doom Compiler Engine" className="w-full bg-black border border-emerald-950 p-2 text-emerald-400 font-mono focus:outline-none focus:border-emerald-600 rounded select-text" style={{ cursor: 'text' }} />
                </div>

                <div className="grid grid-cols-2 gap-2 select-text">
                  <div>
                    <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Language</label>
                    <input required type="text" value={newLanguage} onChange={e => setNewLanguage(e.target.value)} placeholder="Pascal" className="w-full bg-black border border-emerald-950 p-2 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded select-text" style={{ cursor: 'text' }} />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Build Year</label>
                    <input required type="number" value={newYear} onChange={e => setNewYear(e.target.value)} placeholder="1994" className="w-full bg-black border border-emerald-950 p-2 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded select-text" style={{ cursor: 'text' }} />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Timeline Era Row</label>
                  <select value={newEra} onChange={e => setNewEra(e.target.value)} className="w-full bg-black border border-emerald-950 p-2 text-emerald-400 font-mono focus:outline-none focus:border-emerald-600 rounded cursor-pointer" style={{ cursor: 'cell' }}>
                    <option value="MS-DOS Era">MS-DOS Era</option>
                    <option value="Web 1.0">Web 1.0</option>
                    <option value="Early Linux">Early Linux</option>
                    <option value="Cyberpunk Modern">Cyberpunk Modern</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Description</label>
                  <textarea rows="2" required value={newDescription} onChange={e => setNewDescription(e.target.value)} placeholder="Archival descriptions payload metrics..." className="w-full bg-black border border-emerald-950 p-2 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded resize-none select-text" style={{ cursor: 'text' }} />
                </div>

                <div className="space-y-1 flex-1 flex flex-col min-h-[110px] select-text">
                  <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Source Payload Stream</label>
                  <textarea required value={newCode} onChange={e => setNewCode(e.target.value)} placeholder={`void main() {\n  // Code vector payload streams\n}`} className="w-full flex-1 bg-black border border-emerald-950 p-2 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded resize-none text-[11px] leading-4 select-text" style={{ cursor: 'text' }} />
                </div>

                <div className="text-[9px] font-black text-emerald-400 uppercase tracking-wider animate-pulse min-h-[12px] mt-1">{formStatus}</div>

                <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-500 text-gray-950 p-2.5 font-black uppercase tracking-[0.2em] transition-all rounded text-xs shadow-md mt-auto" style={{ cursor: 'cell' }}>
                  EXECUTE RAW INSERTION
                </button>
              </form>
            </>
          )}

          <div className="p-3 border border-dashed border-emerald-950 bg-black/40 rounded flex items-start space-x-2 mt-auto shrink-0">
            <ShieldAlert className="h-3.5 w-3.5 text-emerald-900 mt-0.5 shrink-0 animate-bounce" />
            <p className="text-[9px] text-emerald-800 leading-4 font-bold uppercase tracking-wider">Firewall Lock: Full anti-screenshot metrics telemetry scanning active.</p>
          </div>
        </section>

      </div>

      {/* Structural Layout Base Fixed Software Architecture Footer */}
      <footer className="border-t border-emerald-900 bg-gray-950 px-6 py-1.5 flex justify-between items-center text-[9px] text-emerald-700 font-bold tracking-widest z-30 shrink-0 select-none">
        <div className="flex space-x-4 items-center">
          <span className="flex items-center text-emerald-600"><Info className="h-3 w-3 mr-1" /> ACTIVE SOFTWARE FRAMEWORK MATRIX: RAJDOOT-SYS-0x70</span>
          <span>COMPILER INSTANCE: VITE 8.1</span>
        </div>
        <div>
          <span>© 2026 CORE ARCHIVE NETWORKS. CONTEXT DEVELOPED BY MANISH RAJDOOT. ALL SECTORS PROTECTED.</span>
        </div>
      </footer>

      {/* FIXED SOFTWARE STYLE INLINE DIALOG EMBED (No target='_blank' / No extra tabs) */}
      {showHiddenSocials && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-2 border-cyan-500 p-6 rounded max-w-lg w-full h-[450px] space-y-4 text-center relative shadow-[0_0_30px_rgba(34,211,238,0.3)] flex flex-col">
            <div className="text-cyan-400 text-xs font-black tracking-[0.3em] uppercase border-b border-cyan-950 pb-2 shrink-0">
              🔗 DECRYPTED MASTER INTEL TERMINALS (INLINE STREAM)
            </div>
            
            {/* Safe Software Environment: Render contents directly inside an app-frame context instead of launching a blank page tab */}
            <div className="flex-1 bg-black/80 rounded border border-cyan-950 p-3 overflow-y-auto text-left space-y-3 font-mono text-xs select-text">
              <p className="text-emerald-500 text-[10px] uppercase font-bold tracking-wider">[CONNECTION STATUS: ONLINE & SECURE WITHIN APP WRAPPER]</p>
              
              <div className="p-2 border border-emerald-950/60 rounded bg-black/40">
                <div className="text-emerald-600 text-[9px] font-black">CHANNEL DEPLOYMENT: GITHUB VECTOR</div>
                <div className="text-cyan-400 font-bold mt-0.5 select-text">https://github.com/manishrajdoot</div>
                <div className="text-gray-600 text-[8px] mt-1 uppercase">Contains real-time Web dev components and database matrices repositories.</div>
              </div>

              <div className="p-2 border border-emerald-950/60 rounded bg-black/40">
                <div className="text-emerald-600 text-[9px] font-black">CHANNEL DEPLOYMENT: LINKEDIN DATA MATRIX</div>
                <div className="text-cyan-400 font-bold mt-0.5 select-text">https://linkedin.com/in/manishrajdoot</div>
                <div className="text-gray-600 text-[8px] mt-1 uppercase">Professional networks sync data node.</div>
              </div>

              <div className="p-2 border border-emerald-950/60 rounded bg-black/40">
                <div className="text-emerald-600 text-[9px] font-black">CHANNEL DEPLOYMENT: PERSONAL ANALYTICS CORE VAULT</div>
                <div className="text-cyan-400 font-bold mt-0.5 select-text">https://manishrajdoot.com</div>
                <div className="text-gray-600 text-[8px] mt-1 uppercase">Primary server hub storing multi-model AI projects telemetry.</div>
              </div>
            </div>

            <button 
              onClick={() => { setShowHiddenSocials(false); playBeep(400, 'sine', 0.1); }}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-gray-950 text-[10px] font-black py-2.5 rounded uppercase tracking-widest transition shrink-0"
              style={{ cursor: 'cell' }}
            >
              DISCONNECT ROUTE TERMINAL
            </button>
          </div>
        </div>
      )}

    </div>
  );
}