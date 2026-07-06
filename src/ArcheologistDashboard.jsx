import React, { useState, useEffect } from 'react';
import { Terminal, Play, ShieldAlert, Cpu, Search, User, Zap, Lock, Unlock, Edit3, Trash2, Save, BarChart2, Volume2, VolumeX, ShieldCheck, Info, PlusCircle } from 'lucide-react';
import { supabase } from './supabaseClient';

export default function ArcheologistDashboard() {
  const [artifacts, setArtifacts] = useState([]);
  const [filteredArtifacts, setFilteredArtifacts] = useState([]);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [activeEra, setActiveEra] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Advanced Simulation & Logic Modules
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

  // Deep Security Lockdowns
  const [isAdmin, setIsAdmin] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [authError, setAuthError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);

  // Safe Input States
  const [newTitle, setNewTitle] = useState('');
  const [newEra, setNewEra] = useState('MS-DOS Era');
  const [newLanguage, setNewLanguage] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCode, setNewCode] = useState('');
  const [formStatus, setFormStatus] = useState('');

  // Auto-Rotating Coding Motivation Engine
  const getDailyQuote = () => {
    const quotes = [
      "First, solve the problem. Then, write the code. — John Johnson",
      "Simplicity is the soul of efficiency. — Austin Freeman",
      "Make it work, make it right, make it fast. — Kent Beck",
      "Knowledge is power, data is the wealth. — M. Rajdoot",
      "Fix the cause, not the symptom. — Steve Maguire",
      "Before software can be reusable it first has to be usable. — Ralph Johnson"
    ];
    const day = new Date().getDate();
    return quotes[day % quotes.length];
  };

  // Anti-Intrusion XSS Script Neutralizer
  const sanitizeInput = (str) => {
    if (!str) return '';
    return str
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
  };

  // Dynamic Audio FX Synthesis Engine (HTML5 Waves FM Oscillators)
  const playBeep = (freq = 440, type = 'square', duration = 0.08) => {
    if (!isAudioOn) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = type; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  };

  // BIOS Loading Matrix & Favicon Injection Hook
  useEffect(() => {
    // Automatic Dynamic SVG Favicon Generation
    try {
      const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%23030712"/><text y="70" x="15" fill="%2310b981" font-family="monospace" font-weight="bold" font-size="65">&gt;_</text></svg>`;
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/svg+xml'; link.rel = 'shortcut icon';
      link.href = `data:image/svg+xml,${svgIcon}`;
      document.getElementsByTagName('head')[0].appendChild(link);
    } catch (e) {
      console.log("Favicon vector stream buffer deferred");
    }

    const logs = [
      "[0.00ms] LAYER ORDERING POINTER VECTORS RE-CONFIGURED... OK",
      "[0.03ms] RE-CHECKING INTEGRITY DEPLOYMENT: STABLE_v6.0_ULTIMATE",
      "[0.06ms] SYNTAX LOGIC SCANNER PASS 1 & 2... ZERO ERRORS FOUND",
      "[0.10ms] RESOLVED CORE z-INDEX CONTEXT INTERACTIVE WRAPPERS... CLEAN",
      "[0.14ms] ATTACHING INBUILT GLOWING TERMINAL DIALOG SECTORS... ACTIVE",
      "[0.19ms] SECURING DATA SCIENCE DATA MAPS ANALYTICS GRAPH... ACTIVE",
      "[0.25ms] CORE FRAMEWORK PIPELINE UNLOCKED. READY FOR ARTIFACT MOUNTING."
    ];
    
    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setBootLogs(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
        setTimeout(() => setIsBooting(false), 500);
      }
    }, 250);

    return () => clearInterval(logInterval);
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
      setEmulatorOutput(`[CRITICAL HARDWARE FAIL] Cloud Connection Timed Out: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isBooting) {
      fetchArtifacts();
      setEmulatorOutput(`System Kernel Operational (v6.0 Ultimate Build).\n\n[MATRIX FOCUS]: "${getDailyQuote()}"\n\nAll click channels and form modules synchronized successfully.`);
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
    setEmulatorOutput(`[MOUNT SUCCESS] Indexed Sector Grid Block: ${item.title}`);
  };

  const handleTerminalCommand = (e) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    playBeep(980, 'sine', 0.04);
    
    if (command === 'sys.social') {
      setShowHiddenSocials(true);
      setEmulatorOutput(prev => prev + '\n\n[DECRYPT SUCCESS] Unlocked identity connection pipelines.');
    } else if (command === 'clear') {
      setEmulatorOutput('[CONSOLE RESET] Buffered streaming lines wiped.');
    } else if (command === 'help') {
      setEmulatorOutput(prev => prev + '\n\nActive Protocols:\n- sys.social : Launch connection identity hub\n- clear : Wipe terminal console buffer\n- help : Fetch system command maps');
    } else {
      setEmulatorOutput(prev => prev + `\n\n[COMMAND REJECTED] "${command}" not recognized by core shell layer.`);
    }
    setTerminalInput('');
  };

  // CRUD MODULE: UPDATE LIVE BLOCK
  const handleUpdateArtifact = async () => {
    if (!isAdmin) return;
    playBeep(880, 'triangle', 0.1);
    setEmulatorOutput('[MUTATION START] Injecting patch vectors to server...');
    try {
      const securePayload = sanitizeInput(editedCode);
      const { error } = await supabase
        .from('artifacts')
        .update({ code: securePayload })
        .eq('id', selectedArtifact.id);

      if (error) throw error;
      setEmulatorOutput(`[SUCCESS] Block update committed for entry: ${selectedArtifact.title}`);
      setIsEditable(false);
      await fetchArtifacts();
    } catch (error) {
      setEmulatorOutput(`[PATCH ERROR] Remote validation failed: ${error.message}`);
    }
  };

  // CRUD MODULE: DELETE LIVE RECORD
  const handleDeleteArtifact = async (id) => {
    if (!isAdmin) return;
    if (!window.confirm("[CRITICAL CONFIRMATION] Wipe this block permanently from cloud columns?")) return;
    playBeep(130, 'sawtooth', 0.5);
    try {
      const { error } = await supabase.from('artifacts').delete().eq('id', id);
      if (error) throw error;
      setEmulatorOutput('[WIPE SUCCESS] Record row purged cleanly from Supabase server storage.');
      setSelectedArtifact(null);
      await fetchArtifacts();
    } catch (error) {
      setEmulatorOutput(`[DELETE REFUSED] Server protection firewall active: ${error.message}`);
    }
  };

  const handleAuthBypass = (e) => {
    e.preventDefault();
    if (isLockedOut) return;

    if (passphrase === 'manish99') {
      setIsAdmin(true); setAuthError('');
      playBeep(1150, 'sine', 0.15);
      setEmulatorOutput('[ACCESS APEX GRANTED] Security clearance LEVEL-ROOT mapped for Architect MANISH RAJDOOT.');
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      playBeep(85, 'sawtooth', 0.65);
      
      if (newAttempts >= 3) {
        setIsLockedOut(true); setAuthError('TERMINAL BAN ACTIVE');
        setEmulatorOutput('[SECURITY CRISIS LOCKDOWN] Brute force detected. Safe state modules frozen.');
      } else {
        setAuthError(`DENIED (${newAttempts}/3)`);
        setEmulatorOutput('[ALERT] Injection passphrase vector mismatched.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    setFormStatus('[SANITIZING STREAM] Injecting schema metrics...');
    try {
      const cleanTitle = sanitizeInput(newTitle);
      const cleanLanguage = sanitizeInput(newLanguage);
      const cleanDescription = sanitizeInput(newDescription);
      const cleanCodePayload = sanitizeInput(newCode);

      const { error } = await supabase.from('artifacts').insert([{
        title: cleanTitle, era: newEra, language: cleanLanguage,
        year: parseInt(newYear) || 2026, description: cleanDescription, code: cleanCodePayload
      }]);
      
      if (error) throw error;
      setFormStatus('[SUCCESS] Encryption Block Committed!');
      setNewTitle(''); setNewLanguage(''); setNewYear(''); setNewDescription(''); setNewCode('');
      await fetchArtifacts();
      setTimeout(() => setFormStatus(''), 2000);
    } catch (error) { setFormStatus(`[BLOCKED]: ${error.message}`); }
  };

  const handleRunEmulator = () => {
    if (!selectedArtifact || isRunning) return;
    setIsRunning(true);
    const lines = [
      `[SANDBOX] Initializing isolated process threads...`,
      `[SECURITY] Shield Firewall Hash validation: COMPLIANT`,
      `[PARSER] Generating internal execution trees...`,
      `\n======================================================`,
      `              VIRTUAL COMPILER MACHINE READY          `,
      `======================================================`
    ];
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setEmulatorOutput(prev => prev + '\n' + lines[currentLine]);
        playBeep(720 + (currentLine * 45), 'square', 0.03);
        currentLine++;
      } else {
        clearInterval(interval);
        setEmulatorOutput(prev => prev + '\n' + editedCode.substring(0, 450) + '\n\n>>> Process terminated with code (0). Sandbox environment flushed.');
        setIsRunning(false);
      }
    }, 90);
  };

  const getEraLength = (era) => artifacts.filter(item => item.era === era).length;

  if (isBooting) {
    return (
      <div className="min-h-screen bg-gray-950 text-emerald-500 font-mono flex flex-col items-start justify-center p-8 crt-effect scanline" style={{ cursor: 'crosshair' }}>
        <div className="max-w-2xl space-y-2 text-xs tracking-wider leading-6">
          <div className="text-emerald-400 font-bold text-sm mb-4 animate-pulse">[SYSTEM CORE FINALIZING STABLE_v6.0 RELEASE]</div>
          {bootLogs.map((log, index) => <div key={index} className="whitespace-pre-wrap">{log}</div>)}
          <div className="h-4 w-2 bg-emerald-500 animate-ping mt-2 inline-block" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-emerald-400 font-mono flex flex-col crt-effect scanline select-text" style={{ cursor: 'crosshair' }}>
      
      {/* Upper Master Navigation Dashboard */}
      <header className="border-b border-emerald-900 bg-gray-900/90 px-6 py-3 flex justify-between items-center backdrop-blur-md z-30 shadow-md shrink-0">
        <div className="flex items-center space-x-3">
          <Terminal className="h-5 w-5 text-emerald-500 animate-pulse" />
          <h1 className="text-sm md:text-base font-black tracking-widest text-emerald-300 retro-glow uppercase">
            THE CODE ARCHEOLOGIST <span className="text-[7px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-800 ml-1 font-bold">RELEASE_v6.0_GOLD</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-5">
          <button onClick={() => setIsAudioOn(!isAudioOn)} className="p-1 border border-emerald-950 hover:border-emerald-800 rounded text-emerald-600 transition" style={{ cursor: 'cell' }}>
            {isAudioOn ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5 text-red-500" />}
          </button>
          <div className="flex flex-col items-end border-r border-emerald-900/40 pr-5">
            <span className="text-[7px] text-emerald-600 font-black tracking-widest uppercase">Chief Architect Core</span>
            <span className="text-xs text-emerald-300 font-black tracking-widest retro-glow">MANISH RAJDOOT</span>
          </div>
          <div className="flex items-center space-x-1.5 text-[8px] text-emerald-400 bg-black/60 px-2 py-1.5 rounded border border-emerald-900">
            <ShieldCheck className="h-3 w-3 text-emerald-400 animate-pulse" />
            <span className="tracking-widest font-black uppercase">{isAdmin ? 'ROOT POWER MAXIMUM' : 'ENCRYPTED LAYERS'}</span>
          </div>
        </div>
      </header>

      {/* Main Grid Vector Divider Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-visible md:overflow-hidden min-h-0 relative z-20">
        
        {/* Left Control Panel: Filters, Indexes & Data Science Graphs */}
        <aside className="w-full md:w-76 border-b md:border-b-0 md:border-r border-emerald-900/40 bg-black/50 flex flex-col backdrop-blur-md shrink-0">
          <div className="p-3 space-y-3 flex flex-col h-full overflow-hidden">
            
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-emerald-800" />
              <input 
                type="text" placeholder="Scan repository indexes..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black border border-emerald-950 rounded py-2 pl-9 pr-3 text-xs text-emerald-400 focus:outline-none focus:border-emerald-600 transition-all font-mono"
                style={{ cursor: 'cell' }}
              />
            </div>

            <div className="grid grid-cols-2 gap-1 text-[8px] font-bold tracking-tight">
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

            {/* LIVE ADVANCED SYSTEM ANALYTICS DATA SCIENCE ENGINE */}
            <div className="border border-emerald-950 bg-black/80 p-2.5 rounded text-[8px] space-y-1.5 font-mono tracking-wide shrink-0">
              <div className="text-emerald-700 font-black flex items-center mb-0.5"><BarChart2 className="h-3 w-3 mr-1" /> CORE REPOSITORY VECTOR STATS</div>
              <div className="space-y-1">
                <div className="flex justify-between text-[7px]"><span>MS-DOS LAYERS:</span><span>{getEraLength('MS-DOS Era')}</span></div>
                <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden border border-emerald-950/20">
                  <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${(getEraLength('MS-DOS Era')/Math.max(artifacts.length, 1))*100}%` }} />
                </div>
                <div className="flex justify-between text-[7px] mt-1"><span>WEB INTERCONNECTS:</span><span>{getEraLength('Web 1.0')}</span></div>
                <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden border border-emerald-950/20">
                  <div className="bg-cyan-500 h-full transition-all duration-500" style={{ width: `${(getEraLength('Web 1.0')/Math.max(artifacts.length, 1))*100}%` }} />
                </div>
              </div>
            </div>

            <div className="text-[8px] font-black uppercase tracking-widest text-emerald-700 border-b border-emerald-950 pb-1 shrink-0">AVAILABLE STORAGE GRID SECTORS ({filteredArtifacts.length})</div>
            <div className="space-y-1.5 flex-1 overflow-y-auto custom-scrollbar pr-1 min-h-[150px] md:min-h-0">
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

            {/* IDENTITY METRICS PROFILE FOOTER LINK */}
            <div className="border border-emerald-950 bg-emerald-950/5 p-2 rounded flex items-center space-x-2 mt-auto shadow-inner shrink-0">
              <div className="h-8 w-8 bg-black border border-emerald-900 rounded flex items-center justify-center"><User className="h-4 w-4 text-emerald-500" /></div>
              <div className="flex-1 min-w-0">
                <div className="text-[7px] font-black text-emerald-700 tracking-wider">CREATOR MASTER SIGNATURE</div>
                <div className="text-xs font-black text-emerald-300 truncate tracking-widest">M. RAJDOOT</div>
                <div className="text-[7px] text-emerald-600 font-mono mt-0.5 uppercase truncate">Data Scientist / Systems Expert</div>
              </div>
              <Zap className="h-3 w-3 text-emerald-400 animate-pulse shrink-0" />
            </div>

          </div>
        </aside>

        {/* Center Workspace Console Interface Monitor */}
        <main className="flex-1 flex flex-col bg-gray-950/10 min-w-0 border-b md:border-b-0 md:border-r border-emerald-900/40 overflow-hidden">
          {selectedArtifact && (
            <>
              <div className="p-4 bg-black/40 border-b border-emerald-900/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 backdrop-blur-xs shrink-0">
                <div>
                  <h2 className="text-sm font-black text-emerald-300 tracking-wider uppercase flex items-center">
                    <span>{selectedArtifact.title}</span>
                    {isEditable && <span className="text-[7px] bg-amber-950 text-amber-400 px-1.5 py-0.5 border border-amber-800 ml-2 rounded font-mono font-black tracking-widest">MUTATION_ACTIVE</span>}
                  </h2>
                  <p className="text-xs text-emerald-600 mt-1 font-medium select-text">{selectedArtifact.description}</p>
                </div>
                
                <div className="flex items-center space-x-2 self-end sm:self-center">
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

              {/* Secure Pre-formatted Sandbox Code Panel Block */}
              <div className="flex-1 bg-black/70 font-mono text-xs p-4 overflow-hidden relative flex flex-col shadow-inner min-h-[200px]">
                {isEditable ? (
                  <textarea
                    value={editedCode} onChange={(e) => setEditedCode(e.target.value)}
                    className="w-full flex-1 bg-transparent text-emerald-400 border-none outline-none font-mono text-xs leading-relaxed resize-none custom-scrollbar focus:ring-0 p-0"
                    style={{ cursor: 'text' }}
                  />
                ) : (
                  <pre className="text-emerald-400/90 whitespace-pre-wrap overflow-y-auto flex-1 custom-scrollbar select-text">{editedCode}</pre>
                )}
              </div>
            </>
          )}

          {/* Lower Terminal Command Prompt Shell Segment */}
          <div className="h-44 bg-black p-4 flex flex-col border-t border-emerald-900/40 shadow-2xl shrink-0 relative">
            <div className="text-[8px] text-emerald-600 font-bold tracking-widest uppercase mb-1.5 flex justify-between items-center">
              <span>[CORE_COMMAND_PROMPT_SHELL]</span>
              <span className="text-[7px] bg-emerald-950 px-1 rounded border border-emerald-900">SYSTEM_INTEGRITY_COMPLIANT</span>
            </div>
            
            <div className="flex-1 overflow-y-auto text-xs text-emerald-400/90 whitespace-pre-wrap font-mono leading-5 custom-scrollbar pr-1 select-text">
              {emulatorOutput}
            </div>

            <form onSubmit={handleTerminalCommand} className="mt-2 pt-1.5 border-t border-emerald-950 flex items-center space-x-2">
              <span className="text-emerald-600 text-xs font-bold font-mono">rajdoot@core:~#</span>
              <input 
                type="text" value={terminalInput} onChange={e => setTerminalInput(e.target.value)}
                placeholder="Type 'help' or execute target system core macros..."
                className="flex-1 bg-transparent text-emerald-400 text-xs font-mono border-none outline-none focus:ring-0 p-0"
                style={{ cursor: 'text' }}
              />
            </form>
          </div>
        </main>

        {/* Right Section: Managed Secure Core Injection Gate Row Entry Form */}
        <section className="w-full md:w-80 bg-black/40 p-4 flex flex-col space-y-4 overflow-y-auto backdrop-blur-md shrink-0">
          
          {!isAdmin ? (
            /* ANTI BRUTE FORCE PROTECTION WALL ACCESS PANEL */
            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center space-y-4 my-auto min-h-[250px] md:min-h-0">
              <div className="h-10 w-10 border border-dashed border-red-900 bg-red-950/20 rounded-full flex items-center justify-center text-red-500 animate-pulse">
                <Lock className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-black tracking-widest text-red-400 uppercase">CORE DATABASE ENTRY LOCKED</h3>
                <p className="text-[9px] text-emerald-700 mt-1 uppercase font-semibold leading-4">Anti-intrusion shields engaged. Inject verification token signature.</p>
              </div>
              
              <form onSubmit={handleAuthBypass} className="w-full space-y-2">
                <input 
                  type="password" disabled={isLockedOut} placeholder={isLockedOut ? "MODULE FROZEN" : "ENTER SECRET TOKEN..."} value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  className="w-full bg-black border border-red-950 rounded p-2.5 text-center text-xs tracking-widest text-red-500 font-mono focus:outline-none focus:border-red-700 shadow-inner disabled:opacity-40"
                  style={{ cursor: 'cell' }}
                />
                {authError && <div className="text-[9px] text-red-500 font-bold uppercase tracking-wide">{authError}</div>}
                <button type="submit" disabled={isLockedOut} className="w-full border border-red-900 bg-red-950/40 text-red-400 py-1.5 rounded font-black uppercase text-[9px] tracking-widest hover:bg-red-900 hover:text-black transition disabled:opacity-40" style={{ cursor: 'cell' }}>
                  BYPASS ENCRYPTION GATE
                </button>
              </form>
            </div>
          ) : (
            /* SECURE IMMUTABLE INJECTION CONTAINER CHANNEL */
            <>
              <div className="flex flex-col shrink-0">
                <div className="text-[8px] font-black text-cyan-400 tracking-widest uppercase mb-0.5 flex items-center">
                  <Unlock className="h-3 w-3 mr-1 animate-pulse" /> Security Signature Validated
                </div>
                <div className="text-xs font-black text-emerald-300 tracking-widest uppercase retro-glow flex items-center">
                  <PlusCircle className="h-4 w-4 mr-1.5 text-emerald-500" />
                  Deposit Block
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs flex-1 flex flex-col min-h-0">
                <div>
                  <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Project Identifier</label>
                  <input required type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Doom Compiler Engine" className="w-full bg-black border border-emerald-950 p-2 text-emerald-400 font-mono focus:outline-none focus:border-emerald-600 rounded" style={{ cursor: 'cell' }} />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Language</label>
                    <input required type="text" value={newLanguage} onChange={e => setNewLanguage(e.target.value)} placeholder="Pascal" className="w-full bg-black border border-emerald-950 p-2 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded" style={{ cursor: 'cell' }} />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Build Year</label>
                    <input required type="number" value={newYear} onChange={e => setNewYear(e.target.value)} placeholder="1994" className="w-full bg-black border border-emerald-950 p-2 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded" style={{ cursor: 'cell' }} />
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
                  <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Historical Context Meta</label>
                  <textarea rows="2" required value={newDescription} onChange={e => setNewDescription(e.target.value)} placeholder="Archival structure descriptions..." className="w-full bg-black border border-emerald-950 p-2 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded resize-none" style={{ cursor: 'cell' }} />
                </div>

                <div className="space-y-1 flex-1 flex flex-col min-h-[120px]">
                  <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Source Payload Stream</label>
                  <textarea required value={newCode} onChange={e => setNewCode(e.target.value)} placeholder={`void main() {\n  // Code vector payload streams\n}`} className="w-full flex-1 bg-black border border-emerald-950 p-2 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded resize-none text-[11px] leading-4" style={{ cursor: 'cell' }} />
                </div>

                <div className="text-[9px] font-black text-emerald-400 uppercase tracking-wider animate-pulse min-h-[12px] mt-1">{formStatus}</div>

                <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-500 text-gray-950 p-2.5 font-black uppercase tracking-[0.2em] transition-all rounded text-xs shadow-md mt-auto" style={{ cursor: 'cell' }}>
                  EXECUTE SECTOR UPLOAD
                </button>
              </form>
            </>
          )}

          <div className="p-3 border border-dashed border-emerald-950 bg-black/40 rounded flex items-start space-x-2 mt-auto shrink-0">
            <ShieldAlert className="h-3.5 w-3.5 text-emerald-900 mt-0.5 shrink-0 animate-bounce" />
            <p className="text-[9px] text-emerald-800 leading-4 font-bold uppercase tracking-wider">Firewall Shield: Full defense parameters engaged.</p>
          </div>
        </section>

      </div>

      {/* Structural Hardware Manifest Architecture Footer */}
      <footer className="border-t border-emerald-900 bg-gray-950 px-6 py-1.5 flex flex-col sm:flex-row justify-between items-center text-[9px] text-emerald-700 font-bold tracking-widest z-30 shrink-0 gap-2">
        <div className="flex space-x-4 items-center">
          <span className="flex items-center text-emerald-600"><Info className="h-3 w-3 mr-1" /> CORE MATRIX CHANNEL: RAJDOOT-SYS-0x60</span>
          <span>COMPILER INSTANCE: VITE 8.1 / CLOUD POSTGRES</span>
        </div>
        <div className="text-center sm:text-right">
          <span>© 2026 ARCHIVE NETWORKS. PLATFORM CONCEPT BY MANISH RAJDOOT. ALL CHANNELS SECURED.</span>
        </div>
      </footer>

      {/* EASTER EGG SYSTEM CONNECTIONS PORT INTERFACES */}
      {showHiddenSocials && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4 crt-effect">
          <div className="bg-gray-900 border-2 border-cyan-500 p-6 rounded max-w-sm w-full space-y-4 text-center relative shadow-[0_0_30px_rgba(34,211,238,0.3)]">
            <div className="text-cyan-400 text-xs font-black tracking-[0.3em] uppercase border-b border-cyan-950 pb-2">
              🔗 DECRYPTED PORTALS FOUND
            </div>
            <p className="text-[10px] text-emerald-600 font-mono uppercase">Direct core networks validated vectors for Admin Manish Rajdoot:</p>
            
            <div className="space-y-2 text-xs font-bold uppercase">
              <a href="https://github.com/manishrajdoot" target="_blank" rel="noreferrer" className="block p-2.5 bg-black border border-cyan-950 hover:border-cyan-400 text-cyan-400 rounded hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] transition" style={{ cursor: 'cell' }}>
                🌐 GITHUB PIPELINE
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="block p-2.5 bg-black border border-cyan-950 hover:border-cyan-400 text-cyan-400 rounded hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] transition" style={{ cursor: 'cell' }}>
                💼 LINKEDIN PORT PORTAL
              </a>
              <a href="https://manishrajdoot.com" target="_blank" rel="noreferrer" className="block p-2.5 bg-black border border-cyan-950 hover:border-cyan-400 text-cyan-400 rounded hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] transition" style={{ cursor: 'cell' }}>
                🗂️ DATA SCIENCE ANALYTICS VAULT
              </a>
            </div>

            <button 
              onClick={() => { setShowHiddenSocials(false); playBeep(400, 'sine', 0.1); }}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-gray-950 text-[10px] font-black py-2 rounded uppercase tracking-widest transition"
              style={{ cursor: 'cell' }}
            >
              DISCONNECT ROUTE
            </button>
          </div>
        </div>
      )}

    </div>
  );
}