import React, { useState, useEffect } from 'react';
import { Terminal, Play, ShieldAlert, Cpu, Search, User, Zap, Lock, Unlock, Edit3, Trash2, Save, BarChart2, Volume2, VolumeX, ShieldCheck, Info } from 'lucide-react';
import { supabase } from './supabaseClient';

export default function ArcheologistDashboard() {
  const [artifacts, setArtifacts] = useState([]);
  const [filteredArtifacts, setFilteredArtifacts] = useState([]);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [activeEra, setActiveEra] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Advanced Simulation States
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

  // Security Gate parameters
  const [isAdmin, setIsAdmin] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [authError, setAuthError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);

  // Input Fields States
  const [newTitle, setNewTitle] = useState('');
  const [newEra, setNewEra] = useState('MS-DOS Era');
  const [newLanguage, setNewLanguage] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCode, setNewCode] = useState('');
  const [formStatus, setFormStatus] = useState('');

  // Auto-Rotating High Focus Short Quotes
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

  // Cyber Defense Sanitization Engine (Preventing XSS/SQL Injection)
  const sanitizeInput = (str) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  };

  // BIOS Preloader Execution Matrix
  useEffect(() => {
    const logs = [
      "[0.00ms] INITIALIZING REGISTER MEMORY CLUSTERS... OK",
      "[0.03ms] VERIFYING ROOT OVERLORD IDENT: MANISH RAJDOOT ENGINE v5.1",
      "[0.07ms] SHIELD FIREWALL RE-ENCRYPTING PORT CHANNELS... SUCCESS",
      "[0.12ms] MOUSE CURSOR CROSSHAIR SHADERS ACTIVE... DONE",
      "[0.18ms] CORE MOUNTED SUCCESSFULLY. ENTERING SYSTEM GRAPHICS MATRIX..."
    ];
    
    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setBootLogs(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
        setTimeout(() => {
          setIsBooting(false);
        }, 800);
      }
    }, 400);

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
      setEmulatorOutput(`[CRITICAL ERROR] Vault Offline: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isBooting) {
      fetchArtifacts();
      setEmulatorOutput(`System Vault Online. Awaiting core queries...\n\n[DAILY MATRIX FOCUS]: "${getDailyQuote()}"`);
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

  // Web Audio Frequency Oscillator Engine (Dynamic 8-Bit Audio)
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

  const handleTerminalCommand = (e) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    playBeep(900, 'sine', 0.04);
    
    if (command === 'sys.social') {
      setShowHiddenSocials(true);
      setEmulatorOutput(prev => prev + '\n\n[DECRYPT] Decrypted Manish Rajdoot Hidden Social Matrix portals.');
    } else if (command === 'clear') {
      setEmulatorOutput('[CONSOLE STREAM PURGED] Awaiting execution.');
    } else if (command === 'help') {
      setEmulatorOutput(prev => prev + '\n\nAvailable Protocols:\n- sys.social : Decrypt developer connection matrix\n- clear : Flush console storage logs\n- help : Fetch system directives');
    } else {
      setEmulatorOutput(prev => prev + `\n\n[CMD ERROR] Protocol "${command}" unrecognized by system core kernel.`);
    }
    setTerminalInput('');
  };

  const handleUpdateArtifact = async () => {
    if (!isAdmin) return;
    playBeep(800, 'triangle', 0.1);
    try {
      const securePayload = sanitizeInput(editedCode);
      const { error } = await supabase
        .from('artifacts')
        .update({ code: securePayload })
        .eq('id', selectedArtifact.id);

      if (error) throw error;
      setEmulatorOutput(`[PATCH SUCCESS] Code structure integrity verified. Block updated successfully.`);
      setIsEditable(false);
      await fetchArtifacts();
    } catch (error) {
      setEmulatorOutput(`[WRITE ERROR] Firewall rejected modifications: ${error.message}`);
    }
  };

  const handleDeleteArtifact = async (id) => {
    if (!isAdmin) return;
    if (!window.confirm("[CRITICAL SECURITY] Drop this database record permanently?")) return;
    playBeep(180, 'sawtooth', 0.4);
    try {
      const { error } = await supabase.from('artifacts').delete().eq('id', id);
      if (error) throw error;
      setEmulatorOutput('[SYSTEM PURGE] Record dropped cleanly from server bank.');
      setSelectedArtifact(null);
      await fetchArtifacts();
    } catch (error) {
      setEmulatorOutput(`[DENIED] Block wipe sequence failed: ${error.message}`);
    }
  };

  const handleAuthBypass = (e) => {
    e.preventDefault();
    if (isLockedOut) return;

    if (passphrase === 'manish99') {
      setIsAdmin(true); setAuthError('');
      playBeep(1000, 'sine', 0.15);
      setEmulatorOutput('[ACCESS APEX] Admin signature matched. Security lock overridden for MANISH RAJDOOT.');
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      playBeep(100, 'sawtooth', 0.5);
      
      if (newAttempts >= 3) {
        setIsLockedOut(true);
        setAuthError('IP TERMINAL LOCKED');
        setEmulatorOutput('[SECURITY WARNING] Brute-force threshold exceeded. Injection module temporarily frozen.');
      } else {
        setAuthError(`DENIED (Attempt ${newAttempts}/3)`);
        setEmulatorOutput('[ALERT] Invalid token signature injection caught by kernel firewall.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    setFormStatus('[SANITIZING] Running structural intrusion scanners...');

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
      setFormStatus('[SUCCESS] Encryption block recorded!');
      setNewTitle(''); setNewLanguage(''); setNewYear(''); setNewDescription(''); setNewCode('');
      await fetchArtifacts();
      setTimeout(() => setFormStatus(''), 2000);
    } catch (error) { setFormStatus(`[BLOCKED]: ${error.message}`); }
  };

  const handleRunEmulator = () => {
    if (!selectedArtifact || isRunning) return;
    setIsRunning(true);
    const lines = [
      `[SECURE MONITOR] Allocating sandbox compiling environment...`,
      `[INTEGRITY] Security Check: 256-bit hash validation OK.`,
      `[ANALYSIS] Cyclomatic Code Complexity Tracking Status: OPTIMAL`,
      `\n======================================================`,
      `               CYBER GRID EMULATION ACTIVE            `,
      `======================================================`
    ];
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setEmulatorOutput(prev => prev + '\n' + lines[currentLine]);
        playBeep(750 + (currentLine * 40), 'square', 0.03);
        currentLine++;
      } else {
        clearInterval(interval);
        setEmulatorOutput(prev => prev + '\n' + editedCode.substring(0, 350) + '\n\n>>> Sandbox execution completed successfully.');
        setIsRunning(false);
      }
    }, 120);
  };

  // BIOS Boot Screen Rendering Vector
  if (isBooting) {
    return (
      <div 
        className="min-h-screen bg-gray-950 text-emerald-500 font-mono flex flex-col items-start justify-center p-8 crt-effect scanline"
        style={{ cursor: 'crosshair' }}
      >
        <div className="max-w-2xl space-y-2 text-xs tracking-wider leading-6">
          <div className="text-emerald-400 font-bold text-sm mb-4 animate-pulse">[SYSTEM BOOT PROTOCOL RE-CONFIGURING]</div>
          {bootLogs.map((log, index) => (
            <div key={index} className="whitespace-pre-wrap">{log}</div>
          ))}
          <div className="h-4 w-2 bg-emerald-500 animate-ping mt-2 inline-block" />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gray-950 text-emerald-400 font-mono flex flex-col crt-effect scanline h-screen overflow-hidden select-text"
      style={{ cursor: 'crosshair' }}
    >
      
      {/* Upper Navigation Bar */}
      <header className="border-b border-emerald-900 bg-gray-900/90 px-6 py-2.5 flex justify-between items-center backdrop-blur-md z-20 shadow-md">
        <div className="flex items-center space-x-3">
          <Terminal className="h-5 w-5 text-emerald-500 animate-pulse" style={{ cursor: 'crosshair' }} />
          <h1 className="text-lg font-black tracking-widest text-emerald-300 retro-glow uppercase">
            THE CODE ARCHEOLOGIST <span className="text-[8px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-800 ml-1 font-bold">STABLE_v5.1_PRO</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-5">
          <button 
            onClick={() => setIsAudioOn(!isAudioOn)} 
            className="p-1.5 border border-emerald-950 hover:border-emerald-800 rounded text-emerald-600 transition"
            style={{ cursor: 'cell' }}
          >
            {isAudioOn ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5 text-red-500" />}
          </button>
          <div className="flex flex-col items-end border-r border-emerald-900/40 pr-5">
            <span className="text-[8px] text-emerald-600 font-black tracking-widest uppercase">Chief System Architect</span>
            <span className="text-xs text-emerald-300 font-black tracking-widest retro-glow">MANISH RAJDOOT</span>
          </div>
          <div className="flex items-center space-x-1.5 text-[9px] text-emerald-400 bg-black/60 px-2.5 py-1.5 rounded border border-emerald-900">
            <Cpu className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            <span className="tracking-widest font-black uppercase">{isAdmin ? 'ROOT FULL ACCESS' : 'FIREWALL LOCKED'}</span>
          </div>
        </div>
      </header>

      {/* Main Framework Divider */}
      <div className="flex-1 flex overflow-hidden z-10">
        
        {/* Left Control Panel: Filters, Analytics, List mapping */}
        <aside className="w-76 border-r border-emerald-900/40 bg-black/50 flex flex-col backdrop-blur-md">
          <div className="p-4 space-y-3 flex flex-col h-full overflow-hidden">
            
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-emerald-800" />
              <input 
                type="text" placeholder="Scan cryptographic sector entries..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black border border-emerald-950 rounded py-2 pl-9 pr-3 text-xs text-emerald-400 font-mono focus:outline-none focus:border-emerald-600 transition-all shadow-inner"
                style={{ cursor: 'cell' }}
              />
            </div>

            <div className="grid grid-cols-2 gap-1 text-[8px] font-black tracking-tight">
              {['ALL', 'MS-DOS Era', 'Web 1.0', 'Cyberpunk Modern'].map(era => (
                <button 
                  key={era} onClick={() => { playBeep(500, 'sine', 0.02); setActiveEra(era); }}
                  className={`p-1.5 border rounded uppercase truncate transition ${activeEra === era ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-[0_0_5px_rgba(52,211,153,0.2)]' : 'border-emerald-950 text-emerald-700'}`}
                  style={{ cursor: 'cell' }}
                >
                  {era === 'ALL' ? 'All Channels' : era}
                </button>
              ))}
            </div>

            {/* REAL-TIME METRICS MATRIX */}
            <div className="border border-emerald-950 bg-black/80 p-2.5 rounded text-[9px] space-y-1 font-mono tracking-wide">
              <div className="text-[8px] text-emerald-700 font-black flex items-center mb-0.5"><BarChart2 className="h-3 w-3 mr-1" /> CORE VECTOR ANALYTICS</div>
              <div className="flex justify-between"><span>INDEXED CLUSTERS:</span><span className="text-emerald-400 font-bold">{artifacts.length}</span></div>
              <div className="flex justify-between"><span>FIREWALL INTEGRITY:</span><span className="text-cyan-400 font-bold">100.00%</span></div>
              <div className="flex justify-between"><span>COMPLEXITY METRIC:</span><span className="text-emerald-500">O(1) CONSTANT</span></div>
            </div>

            <div className="text-[8px] font-black uppercase tracking-widest text-emerald-700 border-b border-emerald-950 pb-1 mt-1">SECURE DATA MAPS ({filteredArtifacts.length})</div>
            <div className="space-y-1.5 flex-1 overflow-y-auto custom-scrollbar pr-1">
              {filteredArtifacts.map((item) => (
                <div 
                  key={item.id}
                  className={`w-full p-2.5 rounded border flex justify-between items-center transition-all duration-300 ${selectedArtifact?.id === item.id ? 'bg-emerald-950/20 border-emerald-500 text-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.1)]' : 'border-emerald-950 text-emerald-600'}`}
                >
                  <button 
                    onClick={() => handleSelectArtifact(item)} 
                    className="flex-1 text-left min-w-0 font-bold text-xs truncate tracking-wide"
                    style={{ cursor: 'cell' }}
                  >
                    {item.title}
                    <div className="flex space-x-2 mt-1 text-[8px] opacity-60 font-mono font-normal"><span>{item.year}</span><span>•</span><span className="uppercase">{item.language}</span></div>
                  </button>
                  {isAdmin && (
                    <button 
                      onClick={() => handleDeleteArtifact(item.id)} 
                      className="text-red-900 hover:text-red-400 p-1 transition ml-1" 
                      title="Drop Matrix Sector"
                      style={{ cursor: 'cell' }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* EXPERT BADGE NODAL SIGNATURE */}
            <div className="border border-emerald-950 bg-emerald-950/5 p-2.5 rounded flex items-center space-x-2.5 mt-auto shadow-inner">
              <div className="h-8 w-8 bg-black border border-emerald-900 rounded flex items-center justify-center"><User className="h-4 w-4 text-emerald-500" /></div>
              <div className="flex-1 min-w-0">
                <div className="text-[7px] font-black text-emerald-700 tracking-wider">IDENTITY VECTOR</div>
                <div className="text-xs font-black text-emerald-300 truncate tracking-widest">M. RAJDOOT</div>
                <div className="text-[8px] text-emerald-600 font-mono tracking-tighter mt-0.5 uppercase">Data Science / Systems Engineer</div>
              </div>
              <Zap className="h-3 w-3 text-emerald-400 animate-pulse shrink-0" />
            </div>

          </div>
        </aside>

        {/* Center Panel: Code Workspace Viewer Module */}
        <main className="flex-1 flex flex-col bg-gray-950/10 overflow-hidden border-r border-emerald-900/40">
          {selectedArtifact && (
            <>
              <div className="p-4 bg-black/40 border-b border-emerald-900/40 flex justify-between items-center backdrop-blur-xs">
                <div>
                  <h2 className="text-sm font-black text-emerald-300 tracking-wider uppercase flex items-center">
                    <span>{selectedArtifact.title}</span>
                    {isEditable && <span className="text-[8px] bg-amber-950 text-amber-400 px-1.5 py-0.5 border border-amber-800 ml-2 rounded font-mono tracking-widest font-black">EDITING_MODE</span>}
                  </h2>
                  <p className="text-xs text-emerald-600 mt-1 font-medium">{selectedArtifact.description}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {isAdmin && (
                    <button 
                      onClick={() => { setIsEditable(!isEditable); playBeep(600, 'sine', 0.05); }}
                      className={`p-2 border rounded transition ${isEditable ? 'bg-emerald-500 text-black border-emerald-400' : 'border-emerald-950 text-emerald-600 hover:text-emerald-400'}`}
                      title="Toggle Local System Editor"
                      style={{ cursor: 'cell' }}
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                  )}
                  {isEditable && isAdmin && (
                    <button 
                      onClick={handleUpdateArtifact} 
                      className="p-2 border border-cyan-900 bg-cyan-950/40 text-cyan-400 hover:bg-cyan-500 hover:text-black rounded transition" 
                      title="Save Encrypted Mod"
                      style={{ cursor: 'cell' }}
                    >
                      <Save className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    onClick={handleRunEmulator} disabled={isRunning}
                    className={`flex items-center space-x-2.5 px-4 py-2 rounded font-black text-xs tracking-widest border transition-all duration-300 ${isRunning ? 'bg-black text-emerald-900 border-emerald-950' : 'bg-emerald-500 hover:bg-emerald-400 text-gray-950 border-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]'}`}
                    style={{ cursor: 'cell' }}
                  >
                    <Play className="h-3 w-3 fill-current" />
                    <span>{isRunning ? 'COMPILE_RUN...' : 'RUN_EMULATOR'}</span>
                  </button>
                </div>
              </div>

              {/* Secure Pre-formatted Code Block */}
              <div className="flex-1 bg-black/70 font-mono text-xs leading-relaxed p-4 overflow-hidden relative flex flex-col shadow-inner">
                {isEditable ? (
                  <textarea
                    value={editedCode} onChange={(e) => setEditedCode(e.target.value)}
                    className="w-full flex-1 bg-transparent text-emerald-400 border-none outline-none font-mono text-xs leading-relaxed resize-none custom-scrollbar"
                    style={{ cursor: 'text' }}
                  />
                ) : (
                  <pre className="text-emerald-400/90 whitespace-pre-wrap overflow-y-auto flex-1 custom-scrollbar">{editedCode}</pre>
                )}
              </div>
            </>
          )}

          {/* Shell Command Console Prompter */}
          <div className="h-44 bg-black p-4 flex flex-col border-t border-emerald-900/40 shadow-2xl relative">
            <div className="text-[8px] text-emerald-600 font-bold tracking-widest uppercase mb-2 flex justify-between items-center">
              <span>[CORE_COMMAND_PROMPT_SHELL]</span>
              <span className="text-[7px] bg-emerald-950 px-1 rounded border border-emerald-900">FIREWALL_SECURE</span>
            </div>
            
            <div className="flex-1 overflow-y-auto text-xs text-emerald-400/90 whitespace-pre-wrap font-mono leading-5 custom-scrollbar pr-1">
              {emulatorOutput}
            </div>

            <form onSubmit={handleTerminalCommand} className="mt-2 pt-1 border-t border-emerald-950 flex items-center space-x-2">
              <span className="text-emerald-600 text-xs font-bold font-mono">rajdoot@core:~#</span>
              <input 
                type="text" value={terminalInput} onChange={e => setTerminalInput(e.target.value)}
                placeholder="Type 'help' or native system directives..."
                className="flex-1 bg-transparent text-emerald-400 text-xs font-mono border-none outline-none focus:ring-0 p-0"
                style={{ cursor: 'text' }}
              />
            </form>
          </div>
        </main>

        {/* Right Section: Core Encryption Upload Channel Container */}
        <section className="w-80 bg-black/40 p-4 flex flex-col space-y-4 overflow-y-auto backdrop-blur-md">
          
          {!isAdmin ? (
            /* SECURITY INPUT LOCKED BRUTE FORCE SHIELD */
            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center space-y-4 my-auto">
              <div className="h-10 w-10 border border-dashed border-red-900 bg-red-950/20 rounded-full flex items-center justify-center text-red-500 animate-pulse">
                <Lock className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-black tracking-widest text-red-400 uppercase">INJECTION GATE LOCKED</h3>
                <p className="text-[9px] text-emerald-700 mt-1 uppercase font-semibold leading-4">Kernel mitigation protocols active. Verify root token validation string.</p>
              </div>
              
              <form onSubmit={handleAuthBypass} className="w-full space-y-2">
                <input 
                  type="password" disabled={isLockedOut} placeholder={isLockedOut ? "MODULE FROZEN" : "ENTER SECRET TOKEN..."} value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  className="w-full bg-black border border-red-950 rounded p-2.5 text-center text-xs tracking-widest text-red-500 font-mono focus:outline-none focus:border-red-700 shadow-inner disabled:opacity-40"
                  style={{ cursor: 'cell' }}
                />
                {authError && <div className="text-[9px] text-red-500 font-bold uppercase tracking-wide">{authError}</div>}
                <button 
                  type="submit" disabled={isLockedOut} 
                  className="w-full border border-red-900 bg-red-950/40 text-red-400 py-1.5 rounded font-black uppercase text-[9px] tracking-widest hover:bg-red-900 hover:text-black transition disabled:opacity-40"
                  style={{ cursor: 'cell' }}
                >
                  BYPASS SECURE FIREWALL
                </button>
              </form>
            </div>
          ) : (
            /* SECURE IMMUTABLE INJECTION PAYLOAD CONTAINER */
            <>
              <div className="flex flex-col">
                <div className="text-[8px] font-black text-cyan-400 tracking-widest uppercase mb-0.5 flex items-center">
                  <Unlock className="h-3 w-3 mr-1 animate-pulse" /> Root Signature Validated
                </div>
                <div className="text-xs font-black text-emerald-300 tracking-widest uppercase retro-glow flex items-center">
                  <PlusCircle className="h-4 w-4 mr-1.5 text-emerald-500" />
                  Deposit Record
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Project Title</label>
                  <input required type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Doom Vector Graphics" className="w-full bg-black border border-emerald-950 p-2.5 text-emerald-400 font-mono focus:outline-none focus:border-emerald-600 rounded" style={{ cursor: 'cell' }} />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Language</label>
                    <input required type="text" value={newLanguage} onChange={e => setNewLanguage(e.target.value)} placeholder="Pascal" className="w-full bg-black border border-emerald-950 p-2.5 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded" style={{ cursor: 'cell' }} />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Build Year</label>
                    <input required type="number" value={newYear} onChange={e => setNewYear(newYear => setNewYear)} placeholder="1995" className="w-full bg-black border border-emerald-950 p-2.5 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded" style={{ cursor: 'cell' }} />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Target Timeline Era</label>
                  <select value={newEra} onChange={e => setNewEra(e.target.value)} className="w-full bg-black border border-emerald-950 p-2.5 text-emerald-400 font-mono focus:outline-none focus:border-emerald-600 rounded cursor-pointer" style={{ cursor: 'cell' }}>
                    <option value="MS-DOS Era">MS-DOS Era</option>
                    <option value="Web 1.0">Web 1.0</option>
                    <option value="Early Linux">Early Linux</option>
                    <option value="Cyberpunk Modern">Cyberpunk Modern</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Historical Context Meta</label>
                  <textarea rows="2" required value={newDescription} onChange={e => setNewDescription(e.target.value)} placeholder="Archival description parameters..." className="w-full bg-black border border-emerald-950 p-2.5 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded resize-none" style={{ cursor: 'cell' }} />
                </div>

                <div className="space-y-1 flex-1 flex flex-col min-h-[110px]">
                  <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Source Payload Stream</label>
                  <textarea required value={newCode} onChange={e => setNewCode(e.target.value)} placeholder={`void main() {\n}`} className="w-full flex-1 bg-black border border-emerald-950 p-2.5 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded resize-none text-[11px]" style={{ cursor: 'cell' }} />
                </div>

                <div className="text-[9px] font-black text-emerald-400 uppercase tracking-wider animate-pulse min-h-[12px]">{formStatus}</div>

                <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-500 text-gray-950 p-3 font-black uppercase tracking-[0.2em] transition-all rounded text-xs shadow-md" style={{ cursor: 'cell' }}>
                  EXECUTE SECURE UPLOAD
                </button>
              </form>
            </>
          )}

          <div className="p-3 border border-dashed border-emerald-950 bg-black/40 rounded flex items-start space-x-2 mt-auto">
            <ShieldAlert className="h-3.5 w-3.5 text-emerald-900 mt-0.5 shrink-0 animate-bounce" />
            <p className="text-[9px] text-emerald-800 leading-4 font-bold uppercase tracking-wider">Firewall Status: Anti-Brute Force encryption filter fully engaged.</p>
          </div>
        </section>

      </div>

      {/* Structural Hardware Manifest Footer */}
      <footer className="border-t border-emerald-900 bg-gray-950 px-6 py-1.5 flex justify-between items-center text-[9px] text-emerald-700 font-bold tracking-widest z-20">
        <div className="flex space-x-4 items-center">
          <span className="flex items-center text-emerald-600"><Info className="h-3 w-3 mr-1" /> CORE BUILD: RAJDOOT-SYS-0x51</span>
          <span>COMPILER: VITE 8.1 / CLOUD POSTGRES</span>
        </div>
        <div>
          <span>© 2026 ARCHIVE NETWORKS. ENGINEERED BY MANISH RAJDOOT. ALL SECTORS SECURED.</span>
        </div>
      </footer>

      {/* EASTER EGG: HIDDEN DECRYPTED PORTS FOR CONTROL LINK CHANNELS */}
      {showHiddenSocials && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4 crt-effect">
          <div className="bg-gray-900 border-2 border-cyan-500 p-6 rounded max-w-sm w-full space-y-4 text-center relative shadow-[0_0_30px_rgba(34,211,238,0.3)]">
            <div className="text-cyan-400 text-xs font-black tracking-[0.3em] uppercase border-b border-cyan-950 pb-2">
              🔗 DECRYPTED PORTALS FOUND
            </div>
            <p className="text-[10px] text-emerald-600 font-mono uppercase">Direct core networks channels verified for Admin Manish Rajdoot:</p>
            
            <div className="space-y-2 text-xs font-bold uppercase">
              <a href="https://github.com/manishrajdoot" target="_blank" rel="noreferrer" className="block p-2.5 bg-black border border-cyan-950 hover:border-cyan-400 text-cyan-400 rounded hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] transition" style={{ cursor: 'cell' }}>
                🌐 GITHUB PIPELINE
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="block p-2.5 bg-black border border-cyan-950 hover:border-cyan-400 text-cyan-400 rounded hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] transition" style={{ cursor: 'cell' }}>
                💼 LINKEDIN ACCESS TERMINAL
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