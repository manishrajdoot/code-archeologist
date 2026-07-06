import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, ShieldAlert, Cpu, Search, User, Zap, Lock, Unlock, Edit3, Trash2, Save, BarChart2, Volume2, VolumeX, ShieldCheck, Info, PlusCircle, Globe, Radio, MessageSquare, Gamepad2, X } from 'lucide-react';
import { supabase } from './supabaseClient';

export default function ArcheologistDashboard() {
  const [artifacts, setArtifacts] = useState([]);
  const [filteredArtifacts, setFilteredArtifacts] = useState([]);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [activeEra, setActiveEra] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Advanced Simulation Engines
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

  // Live Hardware Telemetry
  const [coordinates, setCoordinates] = useState({ lat: '28.5826° N', lon: '77.3320° E' });
  const [liveNews, setLiveNews] = useState('ESTABLISHING LIVE TECH SATELLITE LINK...');

  // Isolated Popups Management Layers
  const [showGamePopup, setShowGamePopup] = useState(false);
  const [showRobotChat, setShowRobotChat] = useState(false);
  const [activeGameType, setActiveGameType] = useState('SNAKE'); // SNAKE or SPACE
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);

  // Autonomous Floating Robot Core AI States
  const [robotPos, setRobotPos] = useState({ x: 'calc(100vw - 80px)', y: 'calc(100vh - 120px)' });
  const [isRobotRoaming, setIsRobotRoaming] = useState(false);

  // Direct Gemini Chatbot State
  const [aiChatInput, setAiChatInput] = useState('');
  const [aiChatLog, setAiChatLog] = useState([
    { role: 'system', text: '// [ORACLE ONLINE]: State configuration complete. Request structural syntax patches.' }
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  // Enterprise Security Gate Parameters
  const [isAdmin, setIsAdmin] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [authError, setAuthError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);

  // Input Data Fields
  const [newTitle, setNewTitle] = useState('');
  const [newEra, setNewEra] = useState('MS-DOS Era');
  const [newLanguage, setNewLanguage] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCode, setNewCode] = useState('');
  const [formStatus, setFormStatus] = useState('');

  // Native HTML5 Waveform Frequency Generator
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

  const triggerPushNotification = (title, message) => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body: message });
    }
  };

  // Hardware Interface Handshakes & Core Autonomous Loops
  useEffect(() => {
    document.documentElement.setAttribute('translate', 'no');
    document.documentElement.classList.add('notranslate');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCoordinates({ lat: pos.coords.latitude.toFixed(4) + '° N', lon: pos.coords.longitude.toFixed(4) + '° E' });
      });
    }

    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission();
    }

    const handleContextMenu = (e) => {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && !e.target.closest('.select-text')) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);

    // Live Tech News Stream (The Verge Server Client Interface)
    const fetchLiveTechNews = async () => {
      try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.theverge.com/rss/index.xml');
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const randomItem = data.items[Math.floor(Math.random() * data.items.length)];
          setLiveNews(`📡 CORE METRICS RE-TRANSMISSION: ${randomItem.title.toUpperCase()} // OVERLAY SYNCED`);
        }
      } catch (err) {
        setLiveNews('🚨 RE-ROUTING TRANS CHANNELS INTERCEPT OVERFLOW NETWORK...');
      }
    };
    fetchLiveTechNews();
    const newsInterval = setInterval(fetchLiveTechNews, 14000);

    // 🤖 REAL AUTONOMOUS ROAMING OLD ROBOT ENGINE
    const robotInterval = setInterval(() => {
      if (showRobotChat) return; // Open dialog par robot freeze ho jayega
      
      setIsRobotRoaming(true);
      playBeep(320, 'sine', 0.05);

      // Random Panel Nodes jump calculations arrays
      const panels = [
        { x: '40px', y: '160px' },   // Left Sidebar Area
        { x: '120px', y: '320px' },  // Lower Analytics Grid
        { x: '50vw', y: '25vh' },    // Central Workspace Monitor
        { x: 'calc(100vw - 320px)', y: '200px' }, // Right Registry Panel Box
      ];
      const targetPanel = panels[Math.floor(Math.random() * panels.length)];
      setRobotPos(targetPanel);

      // 8 Seconds baad automatic safely collapse block to default point layers
      setTimeout(() => {
        setRobotPos({ x: 'calc(100vw - 80px)', y: 'calc(100vh - 120px)' });
        setIsRobotRoaming(false);
        playBeep(260, 'sine', 0.04);
      }, 6000);

    }, 15000); // Har 15 seconds mein robot active jumps execute karega

    const logs = [
      "[0.00ms] OVERRIDING BROWSER CHROME TRANSLATOR PERIMETERS... INJECTED",
      "[0.03ms] SEPARATING ISOLATED GAME ARCADE CONSOLE POPUPS... OK",
      "[0.06ms] DEPLOYING AUTONOMOUS SECTOR-JUMPING OLD ROBOT FIELD SYSTEMS...",
      "[0.11ms] SYNCING LIVE DYNAMIC GEMINI CONTEXT CORE AI CHATBOT SYSTEM...",
      "[0.17ms] LOCKING ABSOLUTE GLASSMORPHISM SCREEN INTERACTIVE FLUIDITY BLUR...",
      "[0.24ms] KERNEL BOOT STABLE v10.0 COMPLETE. WELCOME COMMAND OVERLORD MANISH."
    ];
    
    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setBootLogs(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
        setTimeout(() => setIsBooting(false), 200);
      }
    }, 100);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      clearInterval(logInterval); clearInterval(newsInterval); clearInterval(robotInterval);
      cancelAnimationFrame(gameLoopRef.current);
    };
  }, [showRobotChat]);

  // ISOLATED RETRO GAME ENGINE PHYSIC RENDERING VECTOR HOOK
  useEffect(() => {
    if (!showGamePopup || !canvasRef.current) return;
    const canvas = canvasRef.current; const ctx = canvas.getContext('2d');
    
    if (activeGameType === 'SNAKE') {
      let snake = [{ x: 10, y: 10 }]; let direction = { x: 1, y: 0 };
      let apple = { x: 5, y: 5 }; let score = 0;

      const handleSnakeKeys = (e) => {
        if (e.key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -1 };
        if (e.key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: 1 };
        if (e.key === 'ArrowLeft' && direction.x === 0) direction = { x: -1, y: 0 };
        if (e.key === 'ArrowRight' && direction.x === 0) direction = { x: 1, y: 0 };
      };
      window.addEventListener('keydown', handleSnakeKeys);

      let lastTime = 0;
      const snakeLoop = (time) => {
        gameLoopRef.current = requestAnimationFrame(snakeLoop);
        if (time - lastTime < 100) return; lastTime = time;

        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        if (head.x < 0) head.x = 24; if (head.x >= 25) head.x = 0;
        if (head.y < 0) head.y = 19; if (head.y >= 20) head.y = 0;

        snake.unshift(head);
        if (head.x === apple.x && head.y === apple.y) {
          score += 10; playBeep(950, 'square', 0.04);
          apple = { x: Math.floor(Math.random() * 24), y: Math.floor(Math.random() * 19) };
        } else { snake.pop(); }

        ctx.fillStyle = '#020617'; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ef4444'; ctx.fillRect(apple.x * 16, apple.y * 16, 14, 14);
        ctx.fillStyle = '#10b981'; snake.forEach(part => ctx.fillRect(part.x * 16, part.y * 16, 14, 14));
        ctx.fillStyle = '#34d399'; ctx.font = '10px monospace';
        ctx.fillText(`ARCADE RUNNING: RETRO_SNAKE // TOTAL SCORE: ${score}`, 10, 20);
      };
      gameLoopRef.current = requestAnimationFrame(snakeLoop);
      return () => window.removeEventListener('keydown', handleSnakeKeys);

    } else if (activeGameType === 'SPACE') {
      let playerX = 185; let lasers = [];
      let invaders = [
        { x: 40, y: 40 }, { x: 90, y: 40 }, { x: 140, y: 40 }, { x: 190, y: 40 }, { x: 240, y: 40 },
        { x: 40, y: 80 }, { x: 90, y: 80 }, { x: 140, y: 80 }, { x: 190, y: 80 }, { x: 240, y: 80 }
      ];
      let score = 0; let invaderDirection = 1;

      const handleSpaceKeys = (e) => {
        if (e.key === 'ArrowLeft' && playerX > 10) playerX -= 15;
        if (e.key === 'ArrowRight' && playerX < 360) playerX += 15;
        if (e.key === ' ' || e.key === 'ArrowUp') { lasers.push({ x: playerX + 15, y: 280 }); playBeep(850, 'sine', 0.02); }
      };
      window.addEventListener('keydown', handleSpaceKeys);

      const spaceLoop = () => {
        gameLoopRef.current = requestAnimationFrame(spaceLoop);
        lasers = lasers.map(l => ({ ...l, y: l.y - 5 })).filter(l => l.y > 0);
        
        let shiftDown = false;
        invaders = invaders.map(inv => {
          let nextX = inv.x + (0.6 * invaderDirection);
          if (nextX > 370 || nextX < 10) shiftDown = true;
          return { ...inv, x: nextX };
        });

        if (shiftDown) { invaderDirection *= -1; invaders = invaders.map(inv => ({ ...inv, y: inv.y + 5 })); }

        lasers.forEach((l, lIdx) => {
          invaders.forEach((inv, iIdx) => {
            if (l.x >= inv.x && l.x <= inv.x + 20 && l.y >= inv.y && l.y <= inv.y + 15) {
              invaders.splice(iIdx, 1); lasers.splice(lIdx, 1); score += 20; playBeep(1050, 'square', 0.04);
            }
          });
        });

        ctx.fillStyle = '#020617'; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#06b6d4'; ctx.fillRect(playerX, 290, 30, 10);
        ctx.fillStyle = '#ef4444'; invaders.forEach(inv => ctx.fillRect(inv.x, inv.y, 20, 10));
        ctx.fillStyle = '#eab308'; lasers.forEach(l => ctx.fillRect(l.x, l.y, 2, 8));

        ctx.fillStyle = '#22d3ee'; ctx.font = '10px monospace';
        ctx.fillText(`ARCADE RUNNING: SPACE_INVADERS // SCORE: ${score}`, 10, 20);
        if (invaders.length === 0) { ctx.fillText("⚡ ARCADE CLEARED: DESTROY ACTION MATCH COMPLIANT", 50, 160); }
      };
      gameLoopRef.current = requestAnimationFrame(spaceLoop);
      return () => window.removeEventListener('keydown', handleSpaceKeys);
    }
  }, [showGamePopup, activeGameType]);

  const fetchArtifacts = async () => {
    try {
      const { data, error } = await supabase.from('artifacts').select('*').order('year', { ascending: true });
      if (error) throw error;
      if (data) {
        setArtifacts(data); setFilteredArtifacts(data);
        if (data.length > 0) { setSelectedArtifact(data[0]); setEditedCode(data[0].code); }
      }
    } catch (error) { setEmulatorOutput(`[CONNECTION TERMINATED] Database Row stream broken: ${error.message}`); }
  };

  useEffect(() => {
    if (!isBooting) {
      fetchArtifacts();
      setEmulatorOutput(`System Architecture Core Operating Software Active (v10.0 Release).\n\n[ROBOT DIRECTIVE ENGINE]:\n- Click on the hovering system robot '🤖' to evoke the floating Gemini AI Oracle dialogue screen.\n- Click on the '🎮 ACTIVE SIMULATORS' header terminal tab to open isolated popup arcade panel rows.\n\nAll browser translation scripts and copy operations completely neutralized layout-wide.`);
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

  // DYNAMIC LIVE GEMINI API MULTI MODAL ENGINE CLIENT
  const callGeminiLiveAPI = async (userMessage) => {
    setAiLoading(true);
    setAiChatLog(prev => [...prev, { role: 'user', text: userMessage }]);
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyA` + `YOUR_API_KEY_REST_FIELDS_INJECT_HERE`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are the core system backend oracle chatbot engine for 'The Code Archeologist' software workspace owned and developed by Manish Rajdoot. The current year is 2026. Respond strictly like an automated compiler terminal parser. Your output must be shudh programming syntax block structures variables (e.g., wrap explanations inside pseudo arrays maps or lines functions metrics) without conversational prose text sentences. Query to parse: ${userMessage}` }] }]
        })
      });

      const data = await response.json();
      const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || `// [EXCEPTION]: Empty content payload buffer stream returned from Google AI.`;
      setAiChatLog(prev => [...prev, { role: 'oracle', text: aiReply }]);
      playBeep(1200, 'sine', 0.05);

    } catch (err) {
      setAiChatLog(prev => [...prev, { role: 'oracle', text: `// [OFFLINE ERROR FILTER]:\nvoid fallback() {\n  error_status: "NETWORK_TIMEOUT";\n  systems_engineer: "MANISH RAJDOOT";\n}` }]);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSelectArtifact = (item) => {
    if (isRunning) return;
    playBeep(650, 'sine', 0.04);
    setSelectedArtifact(item); setEditedCode(item.code); setIsEditable(false);
    setEmulatorOutput(`[MOUNTED INTERFACE NODE] Sector Reference Index: ${item.title}`);
  };

  const handleTerminalCommand = (e) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    playBeep(980, 'sine', 0.04);
    
    if (command === 'sys.social') {
      setShowHiddenSocials(true);
      setEmulatorOutput(prev => prev + '\n\n[DECRYPT] Overlord signatures validated. Mounted profile configurations dialog overlay.');
    } else if (command === 'clear') {
      setEmulatorOutput('[CONSOLE PURGED] Clear display storage matrices command completed.');
    } else if (command === 'help') {
      setEmulatorOutput(prev => prev + '\n\nAvailable Directives:\n- sys.social : Load safe identity connections wrapper dialog\n- clear       : Wipe shell display buffer lines\n- help        : Map current system architecture blueprints');
    } else {
      setEmulatorOutput(prev => prev + `\n\n[SHELL FAULT ERROR] Macro "${command}" unmapped in architecture layers.`);
    }
    setTerminalInput('');
  };

  const handleUpdateArtifact = async () => {
    if (!isAdmin) return;
    playBeep(880, 'triangle', 0.1);
    try {
      const { error } = await supabase.from('artifacts').update({ code: editedCode }).eq('id', selectedArtifact.id);
      if (error) throw error;
      setEmulatorOutput(`[PATCH SUCCESS] Core rewrite committed successfully for: ${selectedArtifact.title}`);
      setIsEditable(false); await fetchArtifacts();
    } catch (error) { setEmulatorOutput(`[MUTATION REFUSED] Firewall Shield Error: ${error.message}`); }
  };

  const handleDeleteArtifact = async (id) => {
    if (!isAdmin) return;
    if (!window.confirm("[CRITICAL SECURITY] Drop this target catalog data row completely?")) return;
    playBeep(110, 'sawtooth', 0.5);
    try {
      const { error } = await supabase.from('artifacts').delete().eq('id', id);
      if (error) throw error;
      setEmulatorOutput('[PURGE COMPLETED] Sector row dropped from server rows dataset.');
      setSelectedArtifact(null); await fetchArtifacts();
    } catch (error) { setEmulatorOutput(`[WIPE DROPPED REJECTION]: ${error.message}`); }
  };

  const handleAuthBypass = (e) => {
    e.preventDefault(); if (isLockedOut) return;
    if (passphrase === 'manish99') {
      setIsAdmin(true); setAuthError(''); playBeep(1120, 'sine', 0.15);
      setEmulatorOutput('[ACCESS APEX GRANTED] Full write permission vectors unlocked for Executive MANISH RAJDOOT.');
    } else {
      const newAttempts = failedAttempts + 1; setFailedAttempts(newAttempts); playBeep(85, 'sawtooth', 0.55);
      if (newAttempts >= 3) {
        setIsLockedOut(true); setAuthError('IP CLUSTER BANNED');
        setEmulatorOutput('[LOCKOUT ENGAGED] Security perimeter firewall breach tracked. Form cells frozen.');
      } else { setAuthError(`REJECTED (${newAttempts}/3)`); }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); if (!isAdmin) return;
    setFormStatus('[SANITIZING OVERLAY METRICS DATA LAYERS...]');
    try {
      const { error } = await supabase.from('artifacts').insert([{
        title: newTitle, era: newEra, language: newLanguage, year: parseInt(newYear) || 2026, description: newDescription, code: newCode
      }]);
      if (error) throw error;
      setFormStatus('[SUCCESS] Catalog entry saved to postgres rows!');
      setNewTitle(''); setNewLanguage(''); setNewYear(''); setNewDescription(''); setNewCode('');
      await fetchArtifacts(); setTimeout(() => setFormStatus(''), 2000);
    } catch (error) { setFormStatus(`[WRITE FAIL]: ${error.message}`); }
  };

  const handleRunEmulator = () => {
    if (!selectedArtifact || isRunning) return;
    setIsRunning(true);
    const lines = [
      `[OS_VIRTUAL_CORE] Spinning sandbox macro process stacks...`,
      `[INTEGRITY Check] Validating structural 256-bit secure cryptographic hashes... COMPLIANT`,
      `\n======================================================`,
      `              NATIVE WORKSPACE CONSOLE EXEC ACTIVE    `,
      `======================================================`
    ];
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setEmulatorOutput(prev => prev + '\n' + lines[currentLine]);
        playBeep(700 + (currentLine * 45), 'square', 0.02); currentLine++;
      } else {
        clearInterval(interval);
        setEmulatorOutput(prev => prev + '\n' + editedCode.substring(0, 500) + '\n\n>>> Sandbox execution completed with exit code (0). Flashing heap maps.');
        setIsRunning(false);
      }
    }, 80);
  };

  const getEraLength = (era) => artifacts.filter(item => item.era === era).length;

  if (isBooting) {
    return (
      <div className="w-screen h-screen bg-gray-950 text-emerald-500 font-mono flex flex-col items-start justify-center p-8 crt-effect select-none" style={{ cursor: 'crosshair' }}>
        <div className="max-w-2xl space-y-2 text-xs tracking-wider leading-6">
          <div className="text-emerald-400 font-bold text-sm mb-4 animate-pulse">[SYSTEM COMPILING v10.0 OMNIPRESENT ROBOTIC CORE RELEASE]</div>
          {bootLogs.map((log, index) => <div key={index} className="whitespace-pre-wrap">{log}</div>)}
          <div className="h-4 w-2 bg-emerald-500 animate-ping mt-2 inline-block" />
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`w-screen h-screen bg-gray-950 text-emerald-400 font-mono flex flex-col crt-effect overflow-hidden select-none relative notranslate ${showRobotChat || showGamePopup ? 'backdrop-filter-active' : ''}`} 
      translate="no" 
      style={{ cursor: 'crosshair' }}
    >
      
      {/* Dynamic Background Blur Shader Layer wrapping everything under condition overlays */}
      <div className={`flex flex-col h-full w-full transition-all duration-500 ${showRobotChat || showGamePopup ? 'blur-md opacity-35 scale-[0.99] pointer-events-none' : 'blur-0'}`}>
        
        {/* Upper Fixed Hardware Frame Navigation Header Bar */}
        <header className="border-b border-emerald-900 bg-gray-900/90 px-6 py-2.5 flex justify-between items-center backdrop-blur-md z-30 shadow-md shrink-0">
          <div className="flex items-center space-x-3">
            <Terminal className="h-5 w-5 text-emerald-500 animate-pulse" />
            <h1 className="text-sm font-black tracking-widest text-emerald-300 retro-glow uppercase">
              THE CODE ARCHEOLOGIST <span className="text-[7px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-800 ml-1 font-bold">OS_v10.0_ROBOTIC</span>
            </h1>
          </div>

          {/* Real GPS Live Hardware Telemetry Section Ticker */}
          <div className="hidden lg:flex items-center space-x-4 border-l border-r border-emerald-900/40 px-6 mx-4 text-[9px] font-bold text-emerald-500 tracking-wider">
            <Globe className="h-3.5 w-3.5 text-cyan-500 animate-spin" style={{ animationDuration: '6s' }} />
            <div className="flex space-x-3">
              <span>LIVE SYSTEM LAT: <span className="text-cyan-400 font-mono font-black">{coordinates.lat}</span></span>
              <span>LIVE SYSTEM LON: <span className="text-cyan-400 font-mono font-black">{coordinates.lon}</span></span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* ISOLATED FLOATING GAMES PANEL TRIGGER LINK BUTTON */}
            <button 
              onClick={() => { playBeep(700, 'sine', 0.1); setShowGamePopup(true); }}
              className="flex items-center space-x-1.5 bg-emerald-950 text-emerald-400 px-2.5 py-1.5 rounded border border-emerald-800 hover:bg-emerald-500 hover:text-black hover:shadow-[0_0_10px_rgba(16,185,129,0.3)] transition font-black text-[9px] tracking-widest uppercase"
              style={{ cursor: 'cell' }}
            >
              <Gamepad2 className="h-3.5 w-3.5" />
              <span>🎮 ACTIVE SIMULATORS</span>
            </button>
            <button onClick={() => setIsAudioOn(!isAudioOn)} className="p-1 border border-emerald-950 hover:border-emerald-800 rounded text-emerald-600 transition" style={{ cursor: 'cell' }}>
              {isAudioOn ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5 text-red-500" />}
            </button>
            <div className="flex flex-col items-end">
              <span className="text-[7px] text-emerald-600 font-black tracking-widest uppercase">Chief Enterprise Engineer</span>
              <span className="text-xs text-emerald-300 font-black tracking-widest retro-glow">MANISH RAJDOOT</span>
            </div>
            <div className="flex items-center space-x-1.5 text-[8px] text-emerald-400 bg-black/60 px-2 py-1.5 rounded border border-emerald-900">
              <ShieldCheck className="h-3 w-3 text-emerald-400 animate-pulse" />
              <span className="tracking-widest font-black uppercase">{isAdmin ? 'ROOT FULL POWER' : 'ROBOTIC MATRIX LOCKED'}</span>
            </div>
          </div>
        </header>

        {/* Live Tech Server RSS Feed Broadcaster Ticker Bar */}
        <div className="bg-emerald-950/20 border-b border-emerald-900/30 px-6 py-1.5 flex items-center space-x-3 text-[9px] font-bold shrink-0 tracking-widest text-cyan-400 select-none">
          <Radio className="h-3.5 w-3.5 text-cyan-400 animate-pulse shrink-0" />
          <span className="text-emerald-700 shrink-0 uppercase font-black">[LIVE SATELLITE BROADCAST FEED]:</span>
          <div className="truncate font-black font-mono select-none animate-pulse">{liveNews}</div>
        </div>

        {/* Closed Desktop Frame Window Area Grid split sectors */}
        <div className="flex-1 flex overflow-hidden min-h-0 relative z-20">
          
          {/* Left Side Navigation Panel rack */}
          <aside className="w-76 border-r border-emerald-900/40 bg-black/50 flex flex-col backdrop-blur-md shrink-0 overflow-hidden h-full">
            <div className="p-3 space-y-3 flex flex-col h-full overflow-hidden">
              
              <div className="relative select-text">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-emerald-800" />
                <input 
                  type="text" placeholder="Scan repository parameters..." value={searchTerm}
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

              {/* Data science system telemetry charts ratios indication widgets */}
              <div className="border border-emerald-950 bg-black/80 p-2.5 rounded text-[8px] space-y-1.5 font-mono tracking-wide shrink-0">
                <div className="text-emerald-700 font-black flex items-center mb-0.5"><BarChart2 className="h-3 w-3 mr-1" /> CLUSTER TIMELINE LOAD DISTRIBUTIONS</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[7px]"><span>DOS CORE RECORDS:</span><span>{getEraLength('MS-DOS Era')}</span></div>
                  <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden border border-emerald-950/20">
                    <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${(getEraLength('MS-DOS Era')/Math.max(artifacts.length, 1))*100}%` }} />
                  </div>
                  <div className="flex justify-between text-[7px] mt-1"><span>WEB INTERFACE VECTORS:</span><span>{getEraLength('Web 1.0')}</span></div>
                  <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden border border-emerald-950/20">
                    <div className="bg-cyan-500 h-full transition-all duration-500" style={{ width: `${(getEraLength('Web 1.0')/Math.max(artifacts.length, 1))*100}%` }} />
                  </div>
                </div>
              </div>

              <div className="text-[8px] font-black uppercase tracking-widest text-emerald-700 border-b border-emerald-900 pb-1 shrink-0">REPOSITORY STORAGE BLOCKS ({filteredArtifacts.length})</div>
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
                  <div className="text-[7px] font-black text-emerald-700 tracking-wider">CREATOR KEYID VECTOR</div>
                  <div className="text-xs font-black text-emerald-300 truncate tracking-widest">M. RAJDOOT</div>
                  <div className="text-[7px] text-emerald-600 font-mono mt-0.5 uppercase truncate">Data Scientist / Core Systems Pro</div>
                </div>
                <Zap className="h-3 w-3 text-emerald-400 animate-pulse shrink-0" />
              </div>

            </div>
          </aside>

          {/* Central Workspace Content monitor box panel */}
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
                      <span>{isRunning ? 'COMPILE_EXEC...' : 'RUN_EMULATOR'}</span>
                    </button>
                  </div>
                </div>

                {/* Preformatted Code Payload Block Area Container (Text select active) */}
                <div className="flex-1 bg-black/70 font-mono text-xs p-4 overflow-hidden relative flex flex-col shadow-inner min-h-0 select-text">
                  {isEditable ? (
                    <textarea
                      value={editedCode} onChange={(e) => setEditedCode(e.target.value)}
                      className="w-full flex-1 bg-transparent text-emerald-400 border-none outline-none font-mono text-xs leading-relaxed resize-none custom-scrollbar focus:ring-0 p-0 select-text"
                      style={{ cursor: 'text' }}
                    />
                  ) : (
                    <pre className="text-emerald-400/90 whitespace-pre-wrap overflow-y-auto w-full h-full custom-scrollbar select-text">{editedCode}</pre>
                  )}
                </div>
              </>
            )}

            {/* Bottom System Terminal Console Shell prompter */}
            <div className="h-44 bg-black p-4 flex flex-col border-t border-emerald-900/40 shadow-2xl shrink-0 relative">
              <div className="text-[8px] text-emerald-600 font-bold tracking-widest uppercase mb-1.5 flex justify-between items-center">
                <span>[CORE_COMMAND_PROMPT_SHELL] // SECURITY PERIMETER LOCKED</span>
                <span className="text-[7px] bg-emerald-950 px-1 rounded border border-emerald-900">ANTI-COPY FILTERS ACTIVE</span>
              </div>
              
              <div className="flex-1 overflow-y-auto text-xs text-emerald-400/90 whitespace-pre-wrap font-mono leading-5 custom-scrollbar pr-1 select-text">
                {emulatorOutput}
              </div>

              <form onSubmit={handleTerminalCommand} className="mt-2 pt-1.5 border-t border-emerald-950 flex items-center space-x-2 select-text">
                <span className="text-emerald-600 text-xs font-bold font-mono">rajdoot@core:~#</span>
                <input 
                  type="text" value={terminalInput} onChange={e => setTerminalInput(e.target.value)}
                  placeholder="Type 'help' or native software target core allocation directives..."
                  className="flex-1 bg-transparent text-emerald-400 text-xs font-mono border-none outline-none focus:ring-0 p-0 select-text"
                  style={{ cursor: 'text' }}
                />
              </form>
            </div>
          </main>

          {/* Right Section Management Forms Panel Rack Control elements */}
          <section className="w-80 bg-black/40 p-4 flex flex-col space-y-4 overflow-y-auto backdrop-blur-md shrink-0 h-full relative">
            
            {!isAdmin ? (
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center space-y-4 my-auto select-text">
                <div className="h-10 w-10 border border-dashed border-red-900 bg-red-950/20 rounded-full flex items-center justify-center text-red-500 animate-pulse">
                  <Lock className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black tracking-widest text-red-400 uppercase">INJECTION PIPELINE CLOSED</h3>
                  <p className="text-[9px] text-emerald-700 mt-1 uppercase font-semibold leading-4">Anti-brute block active. Feed administrative passphrase verification signature key.</p>
                </div>
                
                <form onSubmit={handleAuthBypass} className="w-full space-y-2 select-text">
                  <input 
                    type="password" disabled={isLockedOut} placeholder={isLockedOut ? "LOCK REJECTION" : "ENTER SECRET TOKEN..."} value={passphrase}
                    onChange={(e) => setPassphrase(e.target.value)}
                    className="w-full bg-black border border-red-950 rounded p-2.5 text-center text-xs tracking-widest text-red-500 font-mono focus:outline-none focus:border-red-700 shadow-inner disabled:opacity-40 select-text"
                    style={{ cursor: 'text' }}
                  />
                  {authError && <div className="text-[9px] text-red-500 font-bold uppercase tracking-wide">{authError}</div>}
                  <button type="submit" disabled={isLockedOut} className="w-full border border-red-900 bg-red-950/40 text-red-400 py-1.5 rounded font-black uppercase text-[9px] tracking-widest hover:bg-red-900 hover:text-black transition disabled:opacity-40" style={{ cursor: 'cell' }}>
                    BYPASS KERNEL ENCRYPTION GATE
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div className="flex flex-col shrink-0">
                  <div className="text-[8px] font-black text-cyan-400 tracking-widest uppercase mb-0.5 flex items-center">
                    <Unlock className="h-3 w-3 mr-1 animate-pulse" /> Root Telemetry Token Validated
                  </div>
                  <div className="text-xs font-black text-emerald-300 tracking-widest uppercase retro-glow flex items-center">
                    <PlusCircle className="h-4 w-4 mr-1.5 text-emerald-500" />
                    Deposit Block Row
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 text-xs flex-1 flex flex-col min-h-0 select-text">
                  <div>
                    <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Project Identifier Name</label>
                    <input required type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Doom Core Machine" className="w-full bg-black border border-emerald-950 p-2 text-emerald-400 font-mono focus:outline-none focus:border-emerald-600 rounded select-text" style={{ cursor: 'text' }} />
                  </div>

                  <div className="grid grid-cols-2 gap-2 select-text">
                    <div>
                      <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Language</label>
                      <input required type="text" value={newLanguage} onChange={e => setNewLanguage(e.target.value)} placeholder="Pascal" className="w-full bg-black border border-emerald-950 p-2 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded select-text" style={{ cursor: 'text' }} />
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Build Year</label>
                      <input required type="number" value={newYear} onChange={e => setNewYear(newYear => setNewYear)} placeholder="1994" className="w-full bg-black border border-emerald-950 p-2 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded select-text" style={{ cursor: 'text' }} />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Target Timeline Era Select</label>
                    <select value={newEra} onChange={e => setNewEra(e.target.value)} className="w-full bg-black border border-emerald-950 p-2 text-emerald-400 font-mono focus:outline-none focus:border-emerald-600 rounded cursor-pointer" style={{ cursor: 'cell' }}>
                      <option value="MS-DOS Era">MS-DOS Era</option>
                      <option value="Web 1.0">Web 1.0</option>
                      <option value="Early Linux">Early Linux</option>
                      <option value="Cyberpunk Modern">Cyberpunk Modern</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Historical Context Meta</label>
                    <textarea rows="2" required value={newDescription} onChange={e => setNewDescription(e.target.value)} placeholder="Archival descriptors metadata streams..." className="w-full bg-black border border-emerald-950 p-2 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded resize-none select-text" style={{ cursor: 'text' }} />
                  </div>

                  <div className="space-y-1 flex-1 flex flex-col min-h-[110px] select-text">
                    <label className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block mb-1">Source Payload Stream Script</label>
                    <textarea required value={newCode} onChange={e => setNewCode(e.target.value)} placeholder={`void main() {\n  // Code vector scripts array\n}`} className="w-full flex-1 bg-black border border-emerald-950 p-2 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 rounded resize-none text-[11px] leading-4 select-text" style={{ cursor: 'text' }} />
                  </div>

                  <div className="text-[9px] font-black text-emerald-400 uppercase tracking-wider animate-pulse min-h-[12px] mt-1">{formStatus}</div>

                  <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-500 text-gray-950 p-2.5 font-black uppercase tracking-[0.2em] transition-all rounded text-xs shadow-md mt-auto" style={{ cursor: 'cell' }}>
                    EXECUTE HARDWARE REPOSIT
                  </button>
                </form>
              </>
            )}

            <div className="p-3 border border-dashed border-emerald-950 bg-black/40 rounded flex items-start space-x-2 mt-auto shrink-0 select-none">
              <ShieldAlert className="h-3.5 w-3.5 text-red-900 mt-0.5 shrink-0 animate-bounce" />
              <p className="text-[9px] text-emerald-800 leading-4 font-bold uppercase tracking-wider">Firewall Lock: Structural anti-intrusion checks engaged.</p>
            </div>
          </section>

        </div>

        {/* Structural Fixed Software Hardware Architecture Base Footer Manifest */}
        <footer className="border-t border-emerald-900 bg-gray-950 px-6 py-1.5 flex justify-between items-center text-[9px] text-emerald-700 font-bold tracking-widest z-30 shrink-0 select-none">
          <div className="flex space-x-4 items-center">
            <span className="flex items-center text-emerald-600"><Info className="h-3 w-3 mr-1" /> CORE MATRIX INSTANCE CHANNEL: RAJDOOT-SYS-0x100</span>
            <span>COMPILER RACK NODE: VITE 8.1 / CLOUD POSTGRES</span>
          </div>
          <div>
            <span>© 2026 ARCHIVE NETWORKS. CONTEXT POWERED BY ENGINEER MANISH RAJDOOT. ALL CHANNELS ENCRYPTED.</span>
          </div>
        </footer>
      </div>

      {/* 🤖 THE FLOATING AUTONOMOUS SECTOR-JUMPING ROBOT CONTROLLER */}
      <div 
        onClick={() => { playBeep(1100, 'sine', 0.1); setShowRobotChat(true); }}
        className={`fixed z-50 p-2 rounded border transition-all duration-[800ms] flex flex-col items-center justify-center shadow-2xl cursor-pointer ${isRobotRoaming ? 'bg-cyan-950/90 border-cyan-400 text-cyan-400 scale-110 shadow-[0_0_15px_rgba(34,211,238,0.4)] animate-bounce' : 'bg-emerald-950/80 border-emerald-600 text-emerald-400 hover:border-emerald-400'}`}
        style={{ left: robotPos.x, top: robotPos.y, transform: 'translate(-50%, -50%)', width: '60px', height: '60px' }}
        title="Invoke Live Gemini AI Oracle Bot Dialogue Screen"
      >
        <span className="text-2xl animate-pulse select-none">🤖</span>
        <span className="text-[6px] font-black uppercase tracking-tighter mt-1 select-none">{isRobotRoaming ? 'ROAMING...' : 'AI_ORACLE'}</span>
      </div>

      {/* 🤖 pop-up 1: LIVE GLASSMORPHISM INTERACTIVE GEMINI AI CHATBOT MODAL OVERLAY */}
      {showRobotChat && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="bg-gray-900 border-2 border-emerald-500 rounded-lg max-w-xl w-full h-[500px] flex flex-col shadow-[0_0_40px_rgba(16,185,129,0.3)] animate-scaleUp">
            
            {/* Modal Header */}
            <div className="p-3.5 bg-gray-950 border-b border-emerald-900 flex justify-between items-center text-xs font-black uppercase tracking-widest text-emerald-300">
              <div className="flex items-center space-x-2">
                <span className="text-base animate-bounce">🤖</span>
                <span>Gemini Core AI System Oracle Terminal Terminal</span>
              </div>
              <button 
                onClick={() => { playBeep(400, 'sine', 0.05); setShowRobotChat(false); }}
                className="text-emerald-700 hover:text-red-400 transition" style={{ cursor: 'cell' }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Live Chat Stream Display Pane Block (Explicitly copy selection active) */}
            <div className="flex-1 p-4 bg-black/60 overflow-y-auto space-y-3 font-mono text-xs custom-scrollbar select-text">
              {aiChatLog.map((log, idx) => (
                <div key={idx} className={`p-2 rounded border leading-5 whitespace-pre-wrap select-text ${log.role === 'user' ? 'bg-cyan-950/40 border-cyan-900 text-cyan-300 text-right' : 'bg-emerald-950/30 border-emerald-950 text-emerald-400'}`}>
                  <div className="text-[7px] font-black opacity-40 uppercase tracking-tighter mb-1">{log.role === 'user' ? 'SENDER: OVERLORD_HOST' : 'RESPONSE: GEMINI_CORE_NODE'}</div>
                  <span className="select-text">{log.text}</span>
                </div>
              ))}
              {aiLoading && <div className="text-cyan-400 font-bold text-[10px] animate-pulse uppercase tracking-wider font-mono">// GEMINI PROCESSING PAYLOAD INJECTION MODULE...</div>}
            </div>

            {/* Input Prompt Box Messaging Area */}
            <form 
              onSubmit={(e) => { e.preventDefault(); if (aiChatInput.trim()) { callGeminiLiveAPI(aiChatInput.trim()); setAiChatInput(''); } }}
              className="p-3 bg-gray-950 border-t border-emerald-900 flex items-center space-x-2 select-text"
            >
              <input 
                type="text" value={aiChatInput} onChange={e => setAiChatInput(e.target.value)} disabled={aiLoading}
                placeholder="Feed technical algorithm or coding script parameter inquiries..."
                className="flex-1 bg-black border border-emerald-950 rounded p-2 text-xs text-emerald-400 font-mono focus:outline-none focus:border-emerald-600 select-text"
                style={{ cursor: 'text' }}
              />
              <button 
                type="submit" disabled={aiLoading}
                className="bg-emerald-700 hover:bg-emerald-500 text-gray-950 px-4 py-2 text-xs font-black uppercase tracking-widest rounded transition"
                style={{ cursor: 'cell' }}
              >
                EXEC
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 🎮 POP-UP 2: ISOLATED ARCADE COMPILING EMULATOR PANEL MODAL OVERLAY */}
      {showGamePopup && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-2 border-cyan-500 rounded-lg p-5 max-w-md w-full flex flex-col shadow-[0_0_40px_rgba(6,182,212,0.3)] text-center relative space-y-4">
            
            <div className="flex justify-between items-center border-b border-cyan-950 pb-2.5">
              <div className="text-cyan-400 text-xs font-black tracking-[0.2em] uppercase flex items-center">
                <Gamepad2 className="h-4 w-4 mr-2 text-cyan-400 animate-pulse" />
                <span>ISOLATED ARCADE CONSOLE EMULATOR</span>
              </div>
              <button 
                onClick={() => { playBeep(400, 'sine', 0.05); setShowGamePopup(false); }}
                className="text-cyan-800 hover:text-red-400 transition" style={{ cursor: 'cell' }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Game Selector Tab Controllers Grid */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-black uppercase tracking-widest">
              <button 
                onClick={() => { playBeep(600, 'sine', 0.03); setActiveGameType('SNAKE'); }}
                className={`p-2 border rounded transition ${activeGameType === 'SNAKE' ? 'bg-cyan-950 border-cyan-400 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 'border-cyan-950 text-cyan-800 hover:text-cyan-500'}`}
                style={{ cursor: 'cell' }}
              >
                🐍 RETRO SNAKE
              </button>
              <button 
                onClick={() => { playBeep(600, 'sine', 0.03); setActiveGameType('SPACE'); }}
                className={`p-2 border rounded transition ${activeGameType === 'SPACE' ? 'bg-cyan-950 border-cyan-400 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 'border-cyan-950 text-cyan-800 hover:text-cyan-500'}`}
                style={{ cursor: 'cell' }}
              >
                🚀 SPACE INVADERS
              </button>
            </div>

            {/* Primary Render Screen Canvas Object */}
            <div className="bg-black border border-cyan-950/60 p-4 rounded flex items-center justify-center relative min-h-[330px]">
              <canvas 
                ref={canvasRef} width={400} height={320} 
                className="border border-cyan-500/30 rounded bg-gray-950 shadow-inner"
              />
            </div>

            <div className="text-[8px] text-cyan-700 font-bold uppercase tracking-wider leading-4">
              [HARDWARE COMMANDS]: Utilize Keyboard Arrow Keys to move vectors. Press SPACE BAR to dispatch continuous laser payloads inside Space Invaders engine matrix.
            </div>
          </div>
        </div>
      )}

      {/* FIXED SOFTWARE STYLE INLINE DIALOG EMBED FOR REGISTER CONNECTS */}
      {showHiddenSocials && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-2 border-cyan-500 p-6 rounded max-w-lg w-full h-[450px] space-y-4 text-center relative shadow-[0_0_30px_rgba(34,211,238,0.3)] flex flex-col">
            <div className="text-cyan-400 text-xs font-black tracking-[0.3em] uppercase border-b border-cyan-950 pb-2 shrink-0">
              🔗 DECRYPTED CORE CONNECTIONS TERMINAL ARRAY
            </div>
            
            <div className="flex-1 bg-black/80 rounded border border-cyan-950 p-3 overflow-y-auto text-left space-y-3 font-mono text-xs select-text">
              <p className="text-emerald-500 text-[10px] uppercase font-bold tracking-wider">[HARDWARE ROUTE STATUS: LIVE ONLINE DIRECT LINK]</p>
              <div className="p-2 border border-emerald-950/60 rounded bg-black/40">
                <div className="text-emerald-600 text-[9px] font-black">CHANNEL TARGET: GITHUB CODEBASE EXPORTS</div>
                <div className="text-cyan-400 font-bold mt-0.5 select-text">https://github.com/manishrajdoot</div>
              </div>
              <div className="p-2 border border-emerald-950/60 rounded bg-black/40">
                <div className="text-emerald-600 text-[9px] font-black">CHANNEL TARGET: LINKEDIN SYNC NETWORKS</div>
                <div className="text-cyan-400 font-bold mt-0.5 select-text">https://linkedin.com/in/manishrajdoot</div>
              </div>
              <div className="p-2 border border-emerald-950/60 rounded bg-black/40">
                <div className="text-emerald-600 text-[9px] font-black">CHANNEL TARGET: PRIMARY ARCHITECT DATA VAULT VAULT</div>
                <div className="text-cyan-400 font-bold mt-0.5 select-text">https://manishrajdoot.com</div>
              </div>
            </div>

            <button 
              onClick={() => { setShowHiddenSocials(false); playBeep(400, 'sine', 0.1); }}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-gray-950 text-[10px] font-black py-2.5 rounded uppercase tracking-widest transition shrink-0"
              style={{ cursor: 'cell' }}
            >
              DISCONNECT ROUTE PAYLOAD
            </button>
          </div>
        </div>
      )}

    </div>
  );
}