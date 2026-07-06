import React, { useState, useEffect } from 'react';
import { Terminal, Play, ShieldAlert, Cpu, Search, User, Zap, Lock, Unlock, Edit3, Trash2, Save, BarChart2, Volume2, VolumeX, ShieldCheck, Info, PlusCircle, Globe, Radio } from 'lucide-react';
import { supabase } from './supabaseClient';

export default function ArcheologistDashboard() {
  const [artifacts, setArtifacts] = useState([]);
  const [filteredArtifacts, setFilteredArtifacts] = useState([]);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [activeEra, setActiveEra] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Advanced v7.5 Real OS Architecture Engines
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

  // Real Hardware Telemetry Signals
  const [coordinates, setCoordinates] = useState({ lat: 'INITIALIZING...', lon: 'INITIALIZING...' });
  const [liveNews, setLiveNews] = useState('ESTABLISHING LIVE TECH SATELLITE LINK...');

  // Deep Security Lockdowns
  const [isAdmin, setIsAdmin] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [authError, setAuthError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);

  // Form Input Buffers
  const [newTitle, setNewTitle] = useState('');
  const [newEra, setNewEra] = useState('MS-DOS Era');
  const [newLanguage, setNewLanguage] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCode, setNewCode] = useState('');
  const [formStatus, setFormStatus] = useState('');

  // Native HTML5 Audio Synthesis Core Generator
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

  // Live Native OS Push Notification Broadcast Trigger
  const triggerPushNotification = (title, message) => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body: message,
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%23030712"/><text y="70" x="15" fill="%2310b981" font-family="monospace" font-weight="bold" font-size="65">&gt;_</text></svg>'
      });
    }
  };

  // Hardware Interface Lifecycles (API Fetch, Geolocation, Notification, Selection Protection)
  useEffect(() => {
    // 1. Dynamic Favicon Core Injection
    try {
      const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%23030712"/><text y="70" x="15" fill="%2310b981" font-family="monospace" font-weight="bold" font-size="65">&gt;_</text></svg>`;
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/svg+xml'; link.rel = 'shortcut icon';
      link.href = `data:image/svg+xml,${svgIcon}`;
      document.getElementsByTagName('head')[0].appendChild(link);
    } catch (e) {}

    // 2. Real Live GPS Tracking Core Fetch
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
    }

    // 3. Request Live Hardware Native Notification Permissions
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission().then(perm => {
        if (perm === 'granted') {
          triggerPushNotification("SECURITY PROTOCOL MAPPED", "Manish Rajdoot Core Telemetry Pipeline Active.");
        }
      });
    }

    // 4. Bulletproof Core Anti-Selection & Anti-Right Click Core Rules
    const handleContextMenu = (e) => {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && !e.target.closest('.select-text')) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);

    // 5. REAL TECH NEWS RSS API LINK (The Verge Live Stream Integration)
    const fetchLiveTechNews = async () => {
      try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.theverge.com/rss/index.xml');
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          // Shuffle or select hot global news updates randomly from arrays
          const randomItem = data.items[Math.floor(Math.random() * data.items.length)];
          setLiveNews(`📡 GLOBAL TECH NEWS OVERLAY: ${randomItem.title.toUpperCase()} // SOURCE: ${randomItem.author.toUpperCase()}`);
        }
      } catch (err) {
        setLiveNews('🚨 RE-ROUTING TECH SATELLITE FAILOVER SIGNAL MATRICES...');
      }
    };
    
    fetchLiveTechNews();
    const newsInterval = setInterval(fetchLiveTechNews, 10000); // Auto refresh news loops every 10 seconds live

    // 6. BIOS Boot Sequence Arrays
    const logs = [
      "[0.00ms] LAYER ORDERING WRAPPERS COMPILING IN FIXED HEIGHT ENGINE... OK",
      "[0.02ms] HIT GEOLOCATION ENDPOINTS... LIVE COORDINATES MAP READY",
      "[0.05ms] EXECUTING REAL-TIME RSS NEWS API DATA FLOW STREAM... LOCKED",
      "[0.09ms] FIREWALL INTERCEPT CAPABILITIES ACTIVE... ZERO ERRORS",
      "[0.15ms] ATTACHED DYNAMIC HARDWARE NOTIFICATION CHANNELS... GRANTED",
      "[0.22ms] ANTI-COPY/SELECTION SHIELD ENFORCED ACROSS SUB-DOMS MAPS",
      "[0.30ms] ALL UPGRADES ENGAGED PER ARCHITECT SPECIFICATION. MATRIX ONLINE."
    ];
    
    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setBootLogs(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
        setTimeout(() => setIsBooting(false), 300);
      }
    }, 180);

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
      setEmulatorOutput(`[CONNECTION REJECTED] Server Grid Fail: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isBooting) {
      fetchArtifacts();
      setEmulatorOutput(`Architecture System v7.5 Live. Real API Integration Channels Fully Active.\n\n[OS CONDITION]: Mainframe locked. Software window environment operational. Text parsing security parameters active.`);
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
    playBeep(620, 'sine', 0.04);
    setSelectedArtifact(item);
    setEditedCode(item.code);
    setIsEditable(false);
    setEmulatorOutput(`[MOUNTED] Active Crypt Block: ${item.title}`);
  };

  const handleTerminalCommand = (e) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    playBeep(980, 'sine', 0.04);
    
    if (command === 'sys.social') {
      setShowHiddenSocials(true);
      setEmulatorOutput(prev => prev + '\n\n[DECRYPT] Signature verified. Injected internal network block dialog container.');
      triggerPushNotification("IDENTITY HUB ACTIVE", "Manish Rajdoot credentials decrypted inline.");
    } else if (command === 'clear') {
      setEmulatorOutput('[CLEARED] Local registers storage purged.');
    } else if (command === 'help') {
      setEmulatorOutput(prev => prev + '\n\nAvailable Directives:\n- sys.social : Load secure portfolio overlay\n- clear : Wipe shell storage buffer lines\n- help : Fetch system map parameters');
    } else {
      setEmulatorOutput(prev => prev + `\n\n[SHELL ALIAS FAIL] Parameter "${command}" unregistered in core.`);
    }
    setTerminalInput('');
  };

  const handleUpdateArtifact = async () => {
    if (!isAdmin) return;
    playBeep(880, 'triangle', 0.1);
    setEmulatorOutput('[MUTATION VECTOR] Transferring script streams to cloud postgres table...');
    try {
      const { error } = await supabase
        .from('artifacts')
        .update({ code: editedCode })
        .eq('id', selectedArtifact.id);

      if (error) throw error;
      setEmulatorOutput(`[PATCH EXEC MATCH] Rewrite committed perfectly for: ${selectedArtifact.title}`);
      triggerPushNotification("DATABASE NODE MUTATED", `Artifact '${selectedArtifact.title}' updated successfully.`);
      setIsEditable(false);
      await fetchArtifacts();
    } catch (error) {
      setEmulatorOutput(`[MUTATION FAILURE] Core Rejected Edit: ${error.message}`);
    }
  };

  const handleDeleteArtifact = async (id) => {
    if (!isAdmin) return;
    if (!window.confirm("[WARNING] Drop this row from remote server tables permanently?")) return;
    playBeep(110, 'sawtooth', 0.5);
    try {
      const { error } = await supabase.from('artifacts').delete().eq('id', id);
      if (error) throw error;
      setEmulatorOutput('[WIPE DONE] Cell data vaporized cleanly from server database rows.');
      triggerPushNotification("RECORD WIPE SEQUENCED", "A node block has been completely purged from the repository.");
      setSelectedArtifact(null);
      await fetchArtifacts();
    } catch (error) {
      setEmulatorOutput(`[FIREWALL REJECTION] Wipe action broken: ${error.message}`);
    }
  };

  const handleAuthBypass = (e) => {
    e.preventDefault();
    if (isLockedOut) return;

    if (passphrase === 'manish99') {
      setIsAdmin(true); setAuthError('');
      playBeep(1120, 'sine', 0.15);
      setEmulatorOutput('[ACCESS APEX MATCHED] Full CRUD execution channels opened for Admin MANISH RAJDOOT.');
      triggerPushNotification("PRIVILEGE ELEVATION", "Root credentials verified. Full write access granted.");
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      playBeep(85, 'sawtooth', 0.55);
      
      if (newAttempts >= 3) {
        setIsLockedOut(true); setAuthError('IP CLUSTER FROZEN');
        setEmulatorOutput('[CRITICAL RESPONSE INTERCEPT] Host machine lock active. Injection form blocked.');
        triggerPushNotification("SECURITY ALERT", "Brute force detected on admin port gate. Terminal locked down.");
      } else {
        setAuthError(`REJECTED (${newAttempts}/3)`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    setFormStatus('[SANITIZING OVERLAY METRICS CHANNEL...]');
    try {
      const { error } = await supabase.from('artifacts').insert([{
        title: newTitle, era: newEra, language: newLanguage,
        year: parseInt(newYear) || 2026, description: newDescription, code: newCode
      }]);
      
      if (error) throw error;
      setFormStatus('[SUCCESS] Core catalog entry saved!');
      triggerPushNotification("NEW NODE COMMITTED", `Project block '${newTitle}' recorded securely.`);
      setNewTitle(''); setNewLanguage(''); setNewYear(''); setNewDescription(''); setNewCode('');
      await fetchArtifacts();
      setTimeout(() => setFormStatus(''), 2000);
    } catch (error) { setFormStatus(`[WRITE FAIL]: ${error.message}`); }
  };

  const handleRunEmulator = () => {
    if (!selectedArtifact || isRunning) return;
    setIsRunning(true);
    const lines = [
      `[OS_CONTAINER] Spinning sandbox micro-kernel nodes...`,
      `[INTEGRITY] Cross-matching secure 256-bit hashes... SUCCESS`,
      `\n======================================================`,
      `              NATIVE WORKSPACE CONSOLE EXEC ACTIVE    `,
      `======================================================`
    ];
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setEmulatorOutput(prev => prev + '\n' + lines[currentLine]);
        playBeep(700 + (currentLine * 45), 'square', 0.02);
        currentLine++;
      } else {
        clearInterval(interval);
        setEmulatorOutput(prev => prev + '\n' + editedCode.substring(0, 550) + '\n\n>>> Process executed with exit code (0). Core sandbox registers cleared.');
        triggerPushNotification("SANDBOX EMULATION FINISHED", `Successfully executed compiler scripts for '${selectedArtifact.title}'.`);
        setIsRunning(false);
      }
    }, 80);
  };

  const getEraLength = (era) => artifacts.filter(item => item.era === era).length;

  if (isBooting) {
    return (
      <div className="w-screen h-screen bg-gray-950 text-emerald-500 font-mono flex flex-col items-start justify-center p-8 crt-effect select-none" style={{ cursor: 'crosshair' }}>
        <div className="max-w-2xl space-y-2 text-xs tracking-wider leading-6">
          <div className="text-emerald-400 font-bold text-sm mb-4 animate-pulse">[SYSTEM UPGRADE COMPLETE // INITIALIZING REAL v7.5 INTERFACES]</div>
          {bootLogs.map((log, index) => <div key={index} className="whitespace-pre-wrap">{log}</div>)}
          <div className="h-4 w-2 bg-emerald-500 animate-ping mt-2 inline-block" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-gray-950 text-emerald-400 font-mono flex flex-col crt-effect overflow-hidden select-none relative" style={{ cursor: 'crosshair' }}>
      
      {/* Upper Main Menu Hardware Controller */}
      <header className="border-b border-emerald-900 bg-gray-900/90 px-6 py-2.5 flex justify-between items-center backdrop-blur-md z-30 shadow-md shrink-0">
        <div className="flex items-center space-x-3">
          <Terminal className="h-5 w-5 text-emerald-500 animate-pulse" />
          <h1 className="text-sm font-black tracking-widest text-emerald-300 retro-glow uppercase">
            THE CODE ARCHEOLOGIST <span className="text-[7px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-800 ml-1 font-bold">OS_v7.5_LIVE_API</span>
          </h1>
        </div>

        {/* Real GPS Hardware Telemetry Coordinated Matrices Row */}
        <div className="hidden lg:flex items-center space-x-4 border-l border-r border-emerald-900/40 px-6 mx-4 text-[9px] font-bold text-emerald-500 tracking-wider">
          <Globe className="h-3.5 w-3.5 text-cyan-500 animate-spin" style={{ animationDuration: '6s' }} />
          <div className="flex space-x-3">
            <span>LIVE HARDWARE LAT: <span className="text-cyan-400 font-mono font-black">{coordinates.lat}</span></span>
            <span>LIVE HARDWARE LON: <span className="text-cyan-400 font-mono font-black">{coordinates.lon}</span></span>
          </div>
        </div>
        
        <div className="flex items-center space-x-5">
          <button onClick={() => setIsAudioOn(!isAudioOn)} className="p-1 border border-emerald-950 hover:border-emerald-800 rounded text-emerald-600 transition" style={{ cursor: 'cell' }}>
            {isAudioOn ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5 text-red-500" />}
          </button>
          <div className="flex flex-col items-end">
            <span className="text-[7px] text-emerald-600 font-black tracking-widest uppercase">Lead Systems Executive</span>
            <span className="text-xs text-emerald-300 font-black tracking-widest retro-glow">MANISH RAJDOOT</span>
          </div>
          <div className="flex items-center space-x-1.5 text-[8px] text-emerald-400 bg-black/60 px-2 py-1.5 rounded border border-emerald-900">
            <ShieldCheck className="h-3 w-3 text-emerald-400 animate-pulse" />
            <span className="tracking-widest font-black uppercase">{isAdmin ? 'ROOT POWER CONNECTED' : 'HARDWARE SECURED'}</span>
          </div>
        </div>
      </header>

      {/* REAL-TIME DYNAMIC TECH NEWS STREAM BANNER BAR TICKER */}
      <div className="bg-emerald-950/20 border-b border-emerald-900/30 px-6 py-1.5 flex items-center space-x-3 text-[9px] font-bold shrink-0 tracking-widest text-cyan-400 select-none">
        <Radio className="h-3.5 w-3.5 text-cyan-400 animate-pulse shrink-0" />
        <span className="text-emerald-700 shrink-0 uppercase font-black">[LIVE TECH SERVER BROADCAST]:</span>
        <div className="truncate font-black tracking-wide font-mono select-none animate-pulse">{liveNews}</div>
      </div>

      {/* Software Closed Window Frame Layout Container Grid */}
      <div className="flex-1 flex overflow-hidden min-h-0 relative z-20">
        
        {/* Left Hand Filter Controls & Vector Analytics Stack Panel */}
        <aside className="w-76 border-r border-emerald-900/40 bg-black/50 flex flex-col backdrop-blur-md shrink-0 overflow-hidden h-full">
          <div className="p-3 space-y-3 flex flex-col h-full overflow-hidden">
            
            <div className="relative select-text">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-emerald-800" />
              <input 
                type="text" placeholder="Scan cryptographic entries..." value={searchTerm}
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

            {/* Live Vector Language Metrics Indicator Grid */}
            <div className="border border-emerald-950 bg-black/80 p-2.5 rounded text-[8px] space-y-1.5 font-mono tracking-wide shrink-0">
              <div className="text-emerald-700 font-black flex items-center mb-0.5"><BarChart2 className="h-3 w-3 mr-1" /> CLUSTER TIMELINE LOAD DISTRIBUTIONS</div>
              <div className="space-y-1">
                <div className="flex justify-between text-[7px]"><span>DOS REGISTER NODES:</span><span>{getEraLength('MS-DOS Era')}</span></div>
                <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden border border-emerald-950/20">
                  <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${(getEraLength('MS-DOS Era')/Math.max(artifacts.length, 1))*100}%` }} />
                </div>
                <div className="flex justify-between text-[7px] mt-1"><span>WEB INTERFACE VECTORS:</span><span>{getEraLength('Web 1.0')}</span></div>
                <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden border border-emerald-950/20">
                  <div className="bg-cyan-500 h-full transition-all duration-500" style={{ width: `${(getEraLength('Web 1.0')/Math.max(artifacts.length, 1))*100}%` }} />
                </div>
              </div>
            </div>

            <div className="text-[8px] font-black uppercase tracking-widest text-emerald-700 border-b border-emerald-950 pb-1 shrink-0">DATA REPOSITORY BLOCKS ({filteredArtifacts.length})</div>
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
                <div className="text-[7px] font-black text-emerald-700 tracking-wider">CREATOR MASTER CODEKEY</div>
                <div className="text-xs font-black text-emerald-300 truncate tracking-widest">M. RAJDOOT</div>
                <div className="text-[7px] text-emerald-600 font-mono mt-0.5 uppercase truncate">Data Scientist / Core Systems Pro</div>
              </div>
              <Zap className="h-3 w-3 text-emerald-400 animate-pulse shrink-0" />
            </div>

          </div>
        </aside>

        {/* Center Panel Workspace: Sandbox Editor Workspace */}
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

              {/* Secure Pre-formatted Sandbox Code Panel Block (Unlocked Selection Copy-Paste Area) */}
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

          {/* Console Command Prompt Prompt Input Stream Block */}
          <div className="h-44 bg-black p-4 flex flex-col border-t border-emerald-900/40 shadow-2xl shrink-0 relative">
            <div className="text-[8px] text-emerald-600 font-bold tracking-widest uppercase mb-1.5 flex justify-between items-center">
              <span>[CORE_COMMAND_PROMPT_SHELL]</span>
              <span className="text-[7px] bg-emerald-950 px-1 rounded border border-emerald-900">anti-copy protection locked</span>
            </div>
            
            <div className="flex-1 overflow-y-auto text-xs text-emerald-400/90 whitespace-pre-wrap font-mono leading-5 custom-scrollbar pr-1 select-text">
              {emulatorOutput}
            </div>

            <form onSubmit={handleTerminalCommand} className="mt-2 pt-1.5 border-t border-emerald-950 flex items-center space-x-2 select-text">
              <span className="text-emerald-600 text-xs font-bold font-mono">rajdoot@core:~#</span>
              <input 
                type="text" value={terminalInput} onChange={e => setTerminalInput(e.target.value)}
                placeholder="Type 'help' or target structural matrix configuration directives..."
                className="flex-1 bg-transparent text-emerald-400 text-xs font-mono border-none outline-none focus:ring-0 p-0 select-text"
                style={{ cursor: 'text' }}
              />
            </form>
          </div>
        </main>

        /* Right Section Input Dashboard Row Injection Module Forms Controls Box */
        <section className="w-80 bg-black/40 p-4 flex flex-col space-y-4 overflow-y-auto backdrop-blur-md shrink-0 h-full">
          
          {!isAdmin ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center space-y-4 my-auto select-text">
              <div className="h-10 w-10 border border-dashed border-red-900 bg-red-950/20 rounded-full flex items-center justify-center text-red-500 animate-pulse">
                <Lock className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-black tracking-widest text-red-400 uppercase">INJECTION ENVIROMENT CLOSED</h3>
                <p className="text-[9px] text-emerald-700 mt-1 uppercase font-semibold leading-4">Anti-brute hardware protection wall active. Feed administrative signature bypass token.</p>
              </div>
              
              <form onSubmit={handleAuthBypass} className="w-full space-y-2 select-text">
                <input 
                  type="password" disabled={isLockedOut} placeholder={isLockedOut ? "MODULE INERT" : "ENTER SECRET TOKEN..."} value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  className="w-full bg-black border border-red-950 rounded p-2.5 text-center text-xs tracking-widest text-red-500 font-mono focus:outline-none focus:border-red-700 shadow-inner disabled:opacity-40 select-text"
                  style={{ cursor: 'text' }}
                />
                {authError && <div className="text-[9px] text-red-500 font-bold uppercase tracking-wide">{authError}</div>}
                <button type="submit" disabled={isLockedOut} className="w-full border border-red-900 bg-red-950/40 text-red-400 py-1.5 rounded font-black uppercase text-[9px] tracking-widest hover:bg-red-900 hover:text-black transition disabled:opacity-40" style={{ cursor: 'cell' }}>
                  BYPASS ENCRYPTION CONTROL
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className="flex flex-col shrink-0">
                <div className="text-[8px] font-black text-cyan-400 tracking-widest uppercase mb-0.5 flex items-center">
                  <Unlock className="h-3 w-3 mr-1 animate-pulse" /> Root Telemetry Access Granted
                </div>
                <div className="text-xs font-black text-emerald-300 tracking-widest uppercase retro-glow flex items-center">
                  <PlusCircle className="h-4 w-4 mr-1.5 text-emerald-500" />
                  Deposit Block
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs flex-1 flex flex-col min-h-0 select-text">
                <div>
                  <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Project Identifier Name</label>
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
                  <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Timeline Target Era</label>
                  <select value={newEra} onChange={e => setNewEra(e.target.value)} className="w-full bg-black border border-emerald-950 p-2 text-emerald-400 font-mono focus:outline-none focus:border-emerald-600 rounded cursor-pointer" style={{ cursor: 'cell' }}>
                    <option value="MS-DOS Era">MS-DOS Era</option>
                    <option value="Web 1.0">Web 1.0</option>
                    <option value="Early Linux">Early Linux</option>
                    <option value="Cyberpunk Modern">Cyberpunk Modern</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Description</label>
                  <textarea rows="2" required value={newDescription} onChange={e => setNewDescription(e.target.value)} placeholder="Archival context parameters meta..." className="w-full bg-black border border-emerald-950 p-2 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded resize-none select-text" style={{ cursor: 'text' }} />
                </div>

                <div className="space-y-1 flex-1 flex flex-col min-h-[110px] select-text">
                  <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Source Payload Stream</label>
                  <textarea required value={newCode} onChange={e => setNewCode(e.target.value)} placeholder={`void main() {\n  // Source data streams blocks\n}`} className="w-full flex-1 bg-black border border-emerald-950 p-2 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded resize-none text-[11px] leading-4 select-text" style={{ cursor: 'text' }} />
                </div>

                <div className="text-[9px] font-black text-emerald-400 uppercase tracking-wider animate-pulse min-h-[12px] mt-1">{formStatus}</div>

                <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-500 text-gray-950 p-2.5 font-black uppercase tracking-[0.2em] transition-all rounded text-xs shadow-md mt-auto" style={{ cursor: 'cell' }}>
                  EXECUTE SECURE UPLOAD
                </button>
              </form>
            </>
          )}

          <div className="p-3 border border-dashed border-emerald-950 bg-black/40 rounded flex items-start space-x-2 mt-auto shrink-0">
            <ShieldAlert className="h-3.5 w-3.5 text-emerald-900 mt-0.5 shrink-0 animate-bounce" />
            <p className="text-[9px] text-emerald-800 leading-4 font-bold uppercase tracking-wider">Firewall Lock: Structural validation matrix fully engaged.</p>
          </div>
        </section>

      </div>

      {/* Structural Fixed Base Manifest Footer Environment Layout */}
      <footer className="border-t border-emerald-900 bg-gray-950 px-6 py-1.5 flex justify-between items-center text-[9px] text-emerald-700 font-bold tracking-widest z-30 shrink-0 select-none">
        <div className="flex space-x-4 items-center">
          <span className="flex items-center text-emerald-600"><Info className="h-3 w-3 mr-1" /> CORE MASTER ENGINE INSTANCE: RAJDOOT-SYS-0x75</span>
          <span>COMPILER: VITE 8.1 / CLOUD POSTGRES</span>
        </div>
        <div>
          <span>© 2026 CORE ARCHIVE NETWORKS. PLATFORM POWERED BY MANISH RAJDOOT. ALL SECTORS PROTECTED.</span>
        </div>
      </footer>

      {/* INLINE CORE DIALOG WINDOW CONTAINER PORTAL (No blank tags / No extra browser tabs) */}
      {showHiddenSocials && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-2 border-cyan-500 p-6 rounded max-w-lg w-full h-[450px] space-y-4 text-center relative shadow-[0_0_30px_rgba(34,211,238,0.3)] flex flex-col">
            <div className="text-cyan-400 text-xs font-black tracking-[0.3em] uppercase border-b border-cyan-950 pb-2 shrink-0">
              🔗 DECRYPTED CORE CHANNELS OVERLAY OVERLAY
            </div>
            
            <div className="flex-1 bg-black/80 rounded border border-cyan-950 p-3 overflow-y-auto text-left space-y-3 font-mono text-xs select-text">
              <p className="text-emerald-500 text-[10px] uppercase font-bold tracking-wider">[HARDWARE ROUTE STATUS: LIVE DATA DISPLAY INLINE]</p>
              
              <div className="p-2 border border-emerald-950/60 rounded bg-black/40">
                <div className="text-emerald-600 text-[9px] font-black">CHANNEL TARGET: GITHUB ENVIRONMENT ENGINE</div>
                <div className="text-cyan-400 font-bold mt-0.5 select-text">https://github.com/manishrajdoot</div>
                <div className="text-gray-600 text-[8px] mt-1 uppercase">Source deployment repositories data blocks layout tracker.</div>
              </div>

              <div className="p-2 border border-emerald-950/60 rounded bg-black/40">
                <div className="text-emerald-600 text-[9px] font-black">CHANNEL TARGET: LINKEDIN NETWORKS LAYER</div>
                <div className="text-cyan-400 font-bold mt-0.5 select-text">https://linkedin.com/in/manishrajdoot</div>
                <div className="text-gray-600 text-[8px] mt-1 uppercase">Professional telemetry records synchronization channel.</div>
              </div>

              <div className="p-2 border border-emerald-950/60 rounded bg-black/40">
                <div className="text-emerald-600 text-[9px] font-black">CHANNEL TARGET: PORTFOLIO MAIN DATA VAULT</div>
                <div className="text-cyan-400 font-bold mt-0.5 select-text">https://manishrajdoot.com</div>
                <div className="text-gray-600 text-[8px] mt-1 uppercase">Primary data scientist dashboard hosting AI algorithm configurations.</div>
              </div>
            </div>

            <button 
              onClick={() => { setShowHiddenSocials(false); playBeep(400, 'sine', 0.1); }}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-gray-950 text-[10px] font-black py-2.5 rounded uppercase tracking-widest transition shrink-0"
              style={{ cursor: 'cell' }}
            >
              DISCONNECT DATAFEED TERMINAL
            </button>
          </div>
        </div>
      )}

    </div>
  );
}