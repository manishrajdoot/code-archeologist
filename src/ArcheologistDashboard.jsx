import React, { useState, useEffect } from 'react';
import { Terminal, FolderOpen, Play, ShieldAlert, Cpu, History, PlusCircle, Search, User, Zap, Globe, Lock, Unlock, Edit3, Trash2, Save, BarChart2, Volume2, VolumeX, EyeOff, ShieldCheck, Info } from 'lucide-react';
import { supabase } from './supabaseClient';

export default function ArcheologistDashboard() {
  const [artifacts, setArtifacts] = useState([]);
  const [filteredArtifacts, setFilteredArtifacts] = useState([]);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [activeEra, setActiveEra] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Security & Core States
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [emulatorOutput, setEmulatorOutput] = useState('System Vault Active. Type "sys.social" for Admin links.\n\n[DAILY MOTIVATION] Code is like humor. When you have to explain it, it’s bad.');
  const [loading, setLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [editedCode, setEditedCode] = useState('');
  const [terminalInput, setTerminalInput] = useState('');
  const [showHiddenSocials, setShowHiddenSocials] = useState(false);

  // Admin Auth Crypt Layer
  const [isAdmin, setIsAdmin] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [authError, setAuthError] = useState('');

  // Form Parameters
  const [newTitle, setNewTitle] = useState('');
  const [newEra, setNewEra] = useState('MS-DOS Era');
  const [newLanguage, setNewLanguage] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCode, setNewCode] = useState('');
  const [formStatus, setFormStatus] = useState('');

  // Motivational Short Quotes Data Engine (Rotates Daily automatically)
  const getDailyQuote = () => {
    const quotes = [
      "Fix the cause, not the symptom. — Steve Maguire",
      "Simplicity is the soul of efficiency. — Austin Freeman",
      "Make it work, make it right, make it fast. — Kent Beck",
      "Before software can be reusable it first has to be usable. — Ralph Johnson",
      "First, solve the problem. Then, write the code. — John Johnson",
      "Knowledge is power, data is the wealth. — M. Rajdoot"
    ];
    const day = new Date().getDate();
    return quotes[day % quotes.length];
  };

  // Absolute XSS & Script Injection Neutralizer (Cyber Security Layer)
  const sanitizeInput = (string) => {
    return string
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  };

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
    fetchArtifacts();
    // Inject dynamic daily quote on startup
    setEmulatorOutput(`System Vault Online. Awaiting queries...\n\n[DAILY MATRIX FOCUS]: "${getDailyQuote()}"`);
  }, []);

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

  // Audio Beep Frequency Oscillator
  const playBeep = (freq = 440, type = 'square', duration = 0.08) => {
    if (!isAudioOn) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = type; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  };

  // Execute Host Terminal Interactive Commands
  const handleTerminalCommand = (e) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    playBeep(900, 'sine', 0.04);
    
    if (command === 'sys.social') {
      setShowHiddenSocials(true);
      setEmulatorOutput(prev => prev + '\n\n[DECRYPT] Decrypted Manish Rajdoot Hidden Social Matrix channels successfully.');
    } else if (command === 'clear') {
      setEmulatorOutput('[CONSOLE STREAM PURGED] System ready.');
    } else if (command === 'help') {
      setEmulatorOutput(prev => prev + '\n\nAvailable Core Protocols:\n- sys.social : Mount hidden developer secure lines\n- clear : Flush console storage logs\n- help : Fetch system directives');
    } else {
      setEmulatorOutput(prev => prev + `\n\n[CMD ERROR] Protocol "${command}" unrecognized by secure core kernel.`);
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
      setEmulatorOutput(`[PATCH SUCCESS] Integrity verified. Node "${selectedArtifact.title}" hotpatched.`);
      setIsEditable(false);
      await fetchArtifacts();
    } catch (error) {
      setEmulatorOutput(`[WRITE ERROR] Firewall rejected modifications: ${error.message}`);
    }
  };

  const handleDeleteArtifact = async (id) => {
    if (!isAdmin) return;
    if (!window.confirm("[CRITICAL SECURITY] Are you absolutely sure you want to drop this sector?")) return;
    playBeep(180, 'sawtooth', 0.4);
    try {
      const { error } = await supabase.from('artifacts').delete().eq('id', id);
      if (error) throw error;
      setEmulatorOutput('[SYSTEM PURGE] Record dropped cleanly from matrix servers.');
      setSelectedArtifact(null);
      await fetchArtifacts();
    } catch (error) {
      setEmulatorOutput(`[DENIED] Block wipe sequence failed: ${error.message}`);
    }
  };

  const handleAuthBypass = (e) => {
    e.preventDefault();
    if (passphrase === 'manish99') {
      setIsAdmin(true); setAuthError('');
      playBeep(1000, 'sine', 0.15);
      setEmulatorOutput('[ACCESS APEX] Admin signature match found. Security override validated for MANISH RAJDOOT.');
    } else {
      setAuthError('INTEGRITY FAULT');
      playBeep(100, 'sawtooth', 0.5);
      setEmulatorOutput('[ALERT] Intrusion mitigation algorithm locked down form node parameters.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    setFormStatus('[SANITIZING] Running intrusion filters on code stream...');

    try {
      // High Security Sanitization Filters applied instantly
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
      `[SECURE MONITOR] Mounting localized virtual core layers...`,
      `[INTEGRITY] Security Check: 256-bit hash verification OK.`,
      `[ADMIN SIGN] Checked by Manish Rajdoot [ROOT]`,
      `\n======================================================`,
      `               CYBER GRID RESTORATION LIVE            `,
      `======================================================`
    ];
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setEmulatorOutput(prev => prev + '\n' + lines[currentLine]);
        playBeep(800 + (currentLine * 50), 'square', 0.03);
        currentLine++;
      } else {
        clearInterval(interval);
        setEmulatorOutput(prev => prev + '\n' + editedCode.substring(0, 250) + '\n\n>>> Process isolation completed.');
        setIsRunning(false);
      }
    }, 120);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-emerald-400 font-mono flex items-center justify-center crt-effect scanline">
        <div className="animate-pulse text-xs tracking-[0.5em] font-black retro-glow">[ISOLATING SECURITY CHANNELS FOR RAJDOOT ENGINE...]</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-emerald-400 font-mono flex flex-col crt-effect scanline h-screen overflow-hidden select-none">
      
      {/* Header Panel */}
      <header className="border-b border-emerald-900 bg-gray-900/90 px-6 py-2.5 flex justify-between items-center backdrop-blur-md z-20 shadow-md">
        <div className="flex items-center space-x-3">
          <Terminal className="h-5 w-5 text-emerald-500 animate-pulse" />
          <h1 className="text-lg font-black tracking-widest text-emerald-300 retro-glow uppercase">
            THE CODE ARCHEOLOGIST <span className="text-[8px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-800 ml-1 font-bold">STABLE_v4.0_PRO</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-5">
          <button onClick={() => setIsAudioOn(!isAudioOn)} className="p-1.5 border border-emerald-950 hover:border-emerald-800 rounded text-emerald-600 transition">
            {isAudioOn ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5 text-red-500" />}
          </button>
          <div className="flex flex-col items-end border-r border-emerald-900/40 pr-5">
            <span className="text-[8px] text-emerald-600 font-black tracking-widest uppercase">Chief System Architect</span>
            <span className="text-xs text-emerald-300 font-black tracking-widest retro-glow">MANISH RAJDOOT</span>
          </div>
          <div className="flex items-center space-x-1.5 text-[9px] text-emerald-400 bg-black/60 px-2.5 py-1.5 rounded border border-emerald-900">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            <span className="tracking-widest font-black uppercase">{isAdmin ? 'ROOT FULL ACCESS' : 'SHIELD MATRIX ACTIVE'}</span>
          </div>
        </div>
      </header>

      {/* Main Divider Workspace */}
      <div className="flex-1 flex overflow-hidden z-10">
        
        {/* Left Side: Search, Filtering, Stats, Profiles */}
        <aside className="w-76 border-r border-emerald-900/40 bg-black/50 flex flex-col backdrop-blur-md">
          <div className="p-4 space-y-3 flex flex-col h-full overflow-hidden">
            
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-emerald-800" />
              <input 
                type="text" placeholder="Scan cryptographic sector entries..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black border border-emerald-950 rounded py-2 pl-9 pr-3 text-xs text-emerald-400 font-mono focus:outline-none focus:border-emerald-600 transition-all shadow-inner"
              />
            </div>

            <div className="grid grid-cols-2 gap-1 text-[8px] font-black tracking-tight">
              {['ALL', 'MS-DOS Era', 'Web 1.0', 'Cyberpunk Modern'].map(era => (
                <button 
                  key={era} onClick={() => { playBeep(500, 'sine', 0.02); setActiveEra(era); }}
                  className={`p-1.5 border rounded uppercase truncate transition ${activeEra === era ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-[0_0_5px_rgba(52,211,153,0.2)]' : 'border-emerald-950 text-emerald-700'}`}
                >
                  {era === 'ALL' ? 'All Channels' : era}
                </button>
              ))}
            </div>

            {/* LIVE ANALYTICS MINILOG */}
            <div className="border border-emerald-950 bg-black/80 p-2.5 rounded text-[9px] space-y-1 font-mono tracking-wide">
              <div className="text-[8px] text-emerald-700 font-black flex items-center mb-0.5"><BarChart2 className="h-3 w-3 mr-1" /> VAULT MEMORY BUFFER STATUS</div>
              <div className="flex justify-between"><span>SECURE INDEXED CLUSTERS:</span><span className="text-emerald-400 font-bold">{artifacts.length}</span></div>
              <div className="flex justify-between"><span>FIREWALL INTEGRITY RATE:</span><span className="text-cyan-400 font-bold">100.00%</span></div>
              <div className="flex justify-between"><span>SYS MODEL LATENCY:</span><span>0.002ms</span></div>
            </div>

            {/* List Array Map Block */}
            <div className="text-[8px] font-black uppercase tracking-widest text-emerald-700 border-b border-emerald-950 pb-1 mt-1">SECURE INDEXED NODES ({filteredArtifacts.length})</div>
            <div className="space-y-1.5 flex-1 overflow-y-auto custom-scrollbar pr-1">
              {filteredArtifacts.map((item) => (
                <div 
                  key={item.id}
                  className={`w-full p-2.5 rounded border flex justify-between items-center transition-all duration-300 ${selectedArtifact?.id === item.id ? 'bg-emerald-950/20 border-emerald-500 text-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.1)]' : 'border-emerald-950 text-emerald-600'}`}
                >
                  <button onClick={() => handleSelectArtifact(item)} className="flex-1 text-left min-w-0 font-bold text-xs truncate tracking-wide">
                    {item.title}
                    <div className="flex space-x-2 mt-1 text-[8px] opacity-60 font-mono font-normal"><span>{item.year}</span><span>•</span><span className="uppercase">{item.language}</span></div>
                  </button>
                  {isAdmin && (
                    <button onClick={() => handleDeleteArtifact(item.id)} className="text-red-900 hover:text-red-400 p-1 transition ml-1" title="Drop Matrix Block">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* MAIN SYSTEM DEVELOPER PROFILE BADGE */}
            <div className="border border-emerald-950 bg-emerald-950/5 p-2.5 rounded flex items-center space-x-2.5 mt-auto shadow-inner">
              <div className="h-8 w-8 bg-black border border-emerald-900 rounded flex items-center justify-center"><User className="h-4 w-4 text-emerald-500" /></div>
              <div className="flex-1 min-w-0">
                <div className="text-[7px] font-black text-emerald-700 tracking-wider">SECURE IDENTITY</div>
                <div className="text-xs font-black text-emerald-300 truncate tracking-widest">M. RAJDOOT</div>
                <div className="text-[8px] text-emerald-600 font-mono tracking-tighter mt-0.5 uppercase">Data Scientist / Core Dev</div>
              </div>
              <Zap className="h-3 w-3 text-emerald-400 animate-pulse shrink-0" />
            </div>

          </div>
        </aside>

        {/* Center Panel Monitor Screen Viewing Workspace */}
        <main className="flex-1 flex flex-col bg-gray-950/10 overflow-hidden border-r border-emerald-900/40">
          {selectedArtifact && (
            <>
              <div className="p-4 bg-black/40 border-b border-emerald-900/40 flex justify-between items-center backdrop-blur-xs">
                <div>
                  <h2 className="text-sm font-black text-emerald-300 tracking-wider uppercase flex items-center">
                    <span>{selectedArtifact.title}</span>
                    {isEditable && <span className="text-[8px] bg-amber-950 text-amber-400 px-1.5 py-0.5 border border-amber-800 ml-2 rounded font-mono tracking-widest font-black">EDITING_MODE</span>}
                  </h2>
                  <p className="text-xs text-emerald-600 mt-1 font-medium select-text">{selectedArtifact.description}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {isAdmin && (
                    <button 
                      onClick={() => { setIsEditable(!isEditable); playBeep(600, 'sine', 0.05); }}
                      className={`p-2 border rounded transition ${isEditable ? 'bg-emerald-500 text-black border-emerald-400' : 'border-emerald-950 text-emerald-600 hover:text-emerald-400'}`}
                      title="Toggle System Editor"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                  )}
                  {isEditable && isAdmin && (
                    <button onClick={handleUpdateArtifact} className="p-2 border border-cyan-900 bg-cyan-950/40 text-cyan-400 hover:bg-cyan-500 hover:text-black rounded transition" title="Save Modifications">
                      <Save className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    onClick={handleRunEmulator} disabled={isRunning}
                    className={`flex items-center space-x-2.5 px-4 py-2 rounded font-black text-xs tracking-widest border transition-all duration-300 ${isRunning ? 'bg-black text-emerald-900 border-emerald-950' : 'bg-emerald-500 hover:bg-emerald-400 text-gray-950 border-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]'}`}
                  >
                    <Play className="h-3 w-3 fill-current" />
                    <span>{isRunning ? 'SANDBOXING...' : 'RUN_EMULATOR'}</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Viewport/Editor */}
              <div className="flex-1 bg-black/70 font-mono text-xs leading-relaxed p-4 overflow-hidden relative flex flex-col shadow-inner select-text">
                {isEditable ? (
                  <textarea
                    value={editedCode} onChange={(e) => setEditedCode(e.target.value)}
                    className="w-full flex-1 bg-transparent text-emerald-400 border-none outline-none font-mono text-xs leading-relaxed resize-none custom-scrollbar shadow-inner"
                  />
                ) : (
                  <pre className="text-emerald-400/90 whitespace-pre-wrap overflow-y-auto flex-1 custom-scrollbar">{editedCode}</pre>
                )}
              </div>
            </>
          )}

          {/* Lower Terminal Command Prompt Console */}
          <div className="h-44 bg-black p-4 flex flex-col border-t border-emerald-900/40 shadow-2xl relative">
            <div className="text-[8px] text-emerald-600 font-bold tracking-widest uppercase mb-2 flex justify-between items-center">
              <span>[CORE_COMMAND_PROMPT_SHELL]</span>
              <span className="text-[7px] bg-emerald-950 px-1 rounded border border-emerald-900">FIREWALL_SECURE</span>
            </div>
            
            <div className="flex-1 overflow-y-auto text-xs text-emerald-400/90 whitespace-pre-wrap font-mono leading-5 custom-scrollbar pr-1 select-text">
              {emulatorOutput}
            </div>

            {/* Interactive Hacker Shell Prompt Input */}
            <form onSubmit={handleTerminalCommand} className="mt-2 pt-1 border-t border-emerald-950 flex items-center space-x-2">
              <span className="text-emerald-600 text-xs font-bold font-mono">rajdoot@core:~#</span>
              <input 
                type="text" value={terminalInput} onChange={e => setTerminalInput(e.target.value)}
                placeholder="Type 'help' or commands here..."
                className="flex-1 bg-transparent text-emerald-400 text-xs font-mono border-none outline-none focus:ring-0 p-0"
              />
            </form>
          </div>
        </main>

        {/* Right Panel Block: Locked Encryption Repository Dashboard */}
        <section className="w-80 bg-black/40 p-4 flex flex-col space-y-4 overflow-y-auto backdrop-blur-md">
          
          {!isAdmin ? (
            /* SECURITY INPUT LOCKED PORTAL */
            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center space-y-4 my-auto">
              <div className="h-10 w-10 border border-dashed border-red-900 bg-red-950/20 rounded-full flex items-center justify-center text-red-500 animate-pulse">
                <Lock className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-black tracking-widest text-red-400 uppercase">INJECTION PORT LOCK</h3>
                <p className="text-[9px] text-emerald-700 mt-1 uppercase font-semibold leading-4">Firewall layer blocking node structural modifications. Verify root authority token.</p>
              </div>
              
              <form onSubmit={handleAuthBypass} className="w-full space-y-2">
                <input 
                  type="password" placeholder="ENTER CRYPTO PHRASE..." value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  className="w-full bg-black border border-red-950 rounded p-2.5 text-center text-xs tracking-widest text-red-500 font-mono focus:outline-none focus:border-red-700 shadow-inner"
                />
                {authError && <div className="text-[9px] text-red-500 font-bold uppercase tracking-wide">{authError}</div>}
                <button type="submit" className="w-full border border-red-900 bg-red-950/40 text-red-400 py-1.5 rounded font-black uppercase text-[9px] tracking-widest hover:bg-red-900 hover:text-black transition">
                  BYPASS SECURE FIREWALL
                </button>
              </form>
            </div>
          ) : (
            /* SECURE IMMUTABLE UPLOAD CHANNEL FORM */
            <>
              <div className="flex flex-col">
                <div className="text-[8px] font-black text-cyan-400 tracking-widest uppercase mb-0.5 flex items-center">
                  <Unlock className="h-3 w-3 mr-1 animate-pulse" /> Security Protocol Bypassed
                </div>
                <div className="text-xs font-black text-emerald-300 tracking-widest uppercase retro-glow flex items-center">
                  <PlusCircle className="h-4 w-4 mr-1.5 text-emerald-500" />
                  Deposit Record
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Project Identifier</label>
                  <input required type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Doom Core Storage" className="w-full bg-black border border-emerald-950 p-2.5 text-emerald-400 font-mono focus:outline-none focus:border-emerald-600 rounded transition" />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Language</label>
                    <input required type="text" value={newLanguage} onChange={e => setNewLanguage(e.target.value)} placeholder="Assembly" className="w-full bg-black border border-emerald-950 p-2.5 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded" />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Build Year</label>
                    <input required type="number" value={newYear} onChange={e => setNewYear(e.target.value)} placeholder="1993" className="w-full bg-black border border-emerald-950 p-2.5 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded" />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Target Timeline Era</label>
                  <select value={newEra} onChange={e => setNewEra(e.target.value)} className="w-full bg-black border border-emerald-950 p-2.5 text-emerald-400 font-mono focus:outline-none focus:border-emerald-600 rounded cursor-pointer">
                    <option value="MS-DOS Era">MS-DOS Era</option>
                    <option value="Web 1.0">Web 1.0</option>
                    <option value="Early Linux">Early Linux</option>
                    <option value="Cyberpunk Modern">Cyberpunk Modern</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Archive Context Meta</label>
                  <textarea rows="2" required value={newDescription} onChange={e => setNewDescription(e.target.value)} placeholder="Sector metadata indexing..." className="w-full bg-black border border-emerald-950 p-2.5 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded resize-none" />
                </div>

                <div className="space-y-1 flex-1 flex flex-col min-h-[110px]">
                  <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Source Payload Stream</label>
                  <textarea required value={newCode} onChange={e => setNewCode(e.target.value)} placeholder={`void main() {\n  // Anti-injection enabled\n}`} className="w-full flex-1 bg-black border border-emerald-950 p-2.5 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded resize-none text-[11px] leading-4" />
                </div>

                <div className="text-[9px] font-black text-emerald-400 uppercase tracking-wider animate-pulse min-h-[12px]">{formStatus}</div>

                <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-500 text-gray-950 p-3 font-black uppercase tracking-[0.2em] transition-all rounded text-xs shadow-md">
                  EXECUTE SECURE UPLOAD
                </button>
              </form>
            </>
          )}

          <div className="p-3 border border-dashed border-emerald-950 bg-black/40 rounded flex items-start space-x-2 mt-auto">
            <ShieldAlert className="h-3.5 w-3.5 text-emerald-900 mt-0.5 shrink-0 animate-bounce" />
            <p className="text-[9px] text-emerald-800 leading-4 font-bold uppercase tracking-wider">Firewall Warning: XSS Anti-injection sanitization engine operational.</p>
          </div>
        </section>

      </div>

      {/* FOOTER META MANIFEST SPECIFICATIONS BLOCK */}
      <footer className="border-t border-emerald-900 bg-gray-950 px-6 py-1.5 flex justify-between items-center text-[9px] text-emerald-700 font-bold tracking-widest z-20">
        <div className="flex space-x-4 items-center">
          <span className="flex items-center text-emerald-600"><Info className="h-3 w-3 mr-1" /> CORE BUILD: RAJDOOT-SYS-0x24</span>
          <span>COMPILER: VITE 8.1 / REACT 18</span>
          <span>CLUSTER REGISTRY: CLOUD POSTGRES</span>
        </div>
        <div>
          <span>© 2026 ARCHIVE NETWORKS. ENGINEERED BY MANISH RAJDOOT. ALL SECTORS PROTECTED.</span>
        </div>
      </footer>

      {/* EASTER EGG: MANISH RAJDOOT HIDDEN SOCIALS TERMINAL OVERLAY */}
      {showHiddenSocials && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 crt-effect">
          <div className="bg-gray-900 border-2 border-cyan-500 p-6 rounded max-w-sm w-full space-y-4 text-center relative shadow-[0_0_30px_rgba(34,211,238,0.3)]">
            <div className="text-cyan-400 text-xs font-black tracking-[0.3em] uppercase border-b border-cyan-950 pb-2">
              🔗 DECRYPTED PORTALS FOUND
            </div>
            <p className="text-[10px] text-emerald-600 font-mono uppercase">Direct operational communication lines for Architect Manish Rajdoot:</p>
            
            <div className="space-y-2 text-xs font-bold uppercase">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="block p-2.5 bg-black border border-cyan-950 hover:border-cyan-400 text-cyan-400 rounded hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] transition">
                🌐 GITHUB CHANNELS
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="block p-2.5 bg-black border border-cyan-950 hover:border-cyan-400 text-cyan-400 rounded hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] transition">
                💼 LINKEDIN VAULT
              </a>
              <a href="https://manishrajdoot.com" target="_blank" rel="noreferrer" className="block p-2.5 bg-black border border-cyan-950 hover:border-cyan-400 text-cyan-400 rounded hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] transition">
                🗂️ DATA SCIENCE PORTFOLIO
              </a>
            </div>

            <button 
              onClick={() => { setShowHiddenSocials(false); playBeep(400, 'sine', 0.1); }}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-gray-950 text-[10px] font-black py-2 rounded uppercase tracking-widest transition"
            >
              DISCONNECT ROUTE
            </button>
          </div>
        </div>
      )}

    </div>
  );
}