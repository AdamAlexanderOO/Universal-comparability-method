import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gamepad2,
  Zap,
  Radio,
  Cpu,
  RefreshCw,
  Play,
  Pause,
  Trophy,
  Activity,
  Crosshair,
  Shield,
  Clock,
  Sparkles,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

type GameMode = 'PHOTON_RUNNER' | 'GEAR_SYNC' | 'RADAR_DEFENSE' | 'HEX_DECRYPT';

export const MiniGamesSuite: React.FC<{
  powerOn: boolean;
  fluxFrequency: number;
}> = ({ powerOn, fluxFrequency }) => {
  const [activeGame, setActiveGame] = useState<GameMode>('PHOTON_RUNNER');

  return (
    <div id="arcade-games-suite" className="border border-white/10 bg-[#0A0A0A] p-5 sm:p-7 text-neutral-200 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-red-500" />
            <h2 className="text-base sm:text-lg font-black tracking-widest text-white uppercase">
              HOLOGRAPHIC CYBER SUITE // SIMULATION GAMES
            </h2>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Interactive tactical simulations, circuit routing puzzles, and mechanical gear calibrations.
          </p>
        </div>

        {/* Game Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1 bg-white/5 p-1 border border-white/10">
          <button
            onClick={() => {
              sounds.playClick(600);
              setActiveGame('PHOTON_RUNNER');
            }}
            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
              activeGame === 'PHOTON_RUNNER'
                ? 'bg-white text-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Photon Runner
          </button>
          <button
            onClick={() => {
              sounds.playClick(650);
              setActiveGame('GEAR_SYNC');
            }}
            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
              activeGame === 'GEAR_SYNC'
                ? 'bg-white text-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Gear Sync
          </button>
          <button
            onClick={() => {
              sounds.playClick(700);
              setActiveGame('RADAR_DEFENSE');
            }}
            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
              activeGame === 'RADAR_DEFENSE'
                ? 'bg-white text-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Radar Interceptor
          </button>
          <button
            onClick={() => {
              sounds.playClick(750);
              setActiveGame('HEX_DECRYPT');
            }}
            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
              activeGame === 'HEX_DECRYPT'
                ? 'bg-white text-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Hex Decryptor
          </button>
        </div>
      </div>

      {!powerOn ? (
        <div className="py-16 text-center text-neutral-500 flex flex-col items-center justify-center">
          <Activity className="w-8 h-8 mb-2 animate-pulse text-neutral-600" />
          <div className="font-bold text-sm tracking-widest">CONSOLE POWER OFFLINE</div>
          <span className="text-xs text-neutral-600 mt-1">Activate Hardware Deck Power to boot simulation engines</span>
        </div>
      ) : (
        <div>
          {activeGame === 'PHOTON_RUNNER' && <PhotonRunnerGame flux={fluxFrequency} />}
          {activeGame === 'GEAR_SYNC' && <GearSyncGame flux={fluxFrequency} />}
          {activeGame === 'RADAR_DEFENSE' && <RadarDefenseGame />}
          {activeGame === 'HEX_DECRYPT' && <HexDecryptGame />}
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   GAME 1: PHOTON FLUX RUNNER (PCB Grid Circuit Navigation)
   ========================================================================= */
const PhotonRunnerGame: React.FC<{ flux: number }> = ({ flux }) => {
  const [playerLane, setPlayerLane] = useState<number>(1); // 0, 1, 2
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [obstacles, setObstacles] = useState<Array<{ id: number; lane: number; y: number; type: 'GATE' | 'ORB' }>>([]);
  const nextId = useRef(0);

  const startGame = () => {
    sounds.playSimulatePulse();
    setScore(0);
    setObstacles([]);
    setPlayerLane(1);
    setGameOver(false);
    setIsPlaying(true);
  };

  // Game Loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(() => {
      setObstacles((prev) => {
        // Move down
        const moved = prev
          .map((o) => ({ ...o, y: o.y + 8 }))
          .filter((o) => o.y < 100);

        // Check collisions near bottom (y between 78 and 92)
        for (const obs of moved) {
          if (obs.y >= 78 && obs.y <= 92 && obs.lane === playerLane) {
            if (obs.type === 'GATE') {
              sounds.playClick(220, 'sawtooth');
              setGameOver(true);
              setIsPlaying(false);
              setHighScore((h) => Math.max(h, score));
              return prev;
            } else if (obs.type === 'ORB') {
              sounds.playClick(1200, 'sine');
              setScore((s) => s + 50);
              return moved.filter((o) => o.id !== obs.id);
            }
          }
        }

        // Spawn new obstacle
        if (Math.random() < 0.35) {
          const lane = Math.floor(Math.random() * 3);
          const type = Math.random() < 0.65 ? 'GATE' : 'ORB';
          moved.push({ id: nextId.current++, lane, y: 0, type });
        }

        return moved;
      });

      setScore((s) => s + 1);
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, gameOver, playerLane, score]);

  return (
    <div className="space-y-4">
      {/* HUD Bar */}
      <div className="flex items-center justify-between p-3 border border-white/10 bg-white/5 text-xs">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-neutral-400">SCORE:</span>{' '}
            <span className="font-bold text-white text-sm">{score}</span>
          </div>
          <div>
            <span className="text-neutral-400">BEST:</span>{' '}
            <span className="font-bold text-red-500">{highScore}</span>
          </div>
          <div>
            <span className="text-neutral-400">BUS FLUX:</span>{' '}
            <span className="text-white">{flux.toFixed(0)} GHz</span>
          </div>
        </div>

        {!isPlaying ? (
          <button
            onClick={startGame}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-white text-black font-bold uppercase tracking-wider text-xs hover:bg-neutral-200"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{gameOver ? 'RETRY RUN' : 'INITIATE BEAM'}</span>
          </button>
        ) : (
          <span className="text-red-500 animate-pulse font-bold tracking-widest text-[11px]">
            ● QUANTUM FLUX ACTIVE
          </span>
        )}
      </div>

      {/* Game Stage (PCB Runway) */}
      <div className="relative h-64 border border-white/20 bg-[#050505] overflow-hidden select-none">
        {/* PCB Trace Lines (3 vertical lanes) */}
        <div className="absolute inset-0 grid grid-cols-3 divide-x divide-white/10">
          <div className="relative flex justify-center">
            <div className="w-0.5 h-full bg-white/5" />
          </div>
          <div className="relative flex justify-center">
            <div className="w-0.5 h-full bg-white/5" />
          </div>
          <div className="relative flex justify-center">
            <div className="w-0.5 h-full bg-white/5" />
          </div>
        </div>

        {/* Moving obstacles */}
        {obstacles.map((obs) => (
          <div
            key={obs.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-75"
            style={{
              left: `${obs.lane * 33.33 + 16.66}%`,
              top: `${obs.y}%`,
            }}
          >
            {obs.type === 'GATE' ? (
              <div className="w-16 h-3 bg-red-600/80 border border-red-500 flex items-center justify-center shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                <span className="text-[8px] font-bold text-white tracking-widest">RESISTOR</span>
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full bg-white border-2 border-red-500 animate-spin flex items-center justify-center shadow-[0_0_8px_white]">
                <Zap className="w-3 h-3 text-black" />
              </div>
            )}
          </div>
        ))}

        {/* Player Photon Beam */}
        <motion.div
          animate={{
            left: `${playerLane * 33.33 + 16.66}%`,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="absolute bottom-6 transform -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-6 h-6 border-2 border-white bg-red-600 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.9)]">
            <div className="w-2 h-2 bg-white" />
          </div>
          <div className="w-1 h-8 bg-gradient-to-t from-transparent to-red-500 mt-1" />
        </motion.div>

        {/* Game Over Screen */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-center p-4">
            <div className="text-red-500 font-black text-xl tracking-widest mb-1">
              CIRCUIT TRACE OVERLOAD
            </div>
            <p className="text-xs text-neutral-400 mb-4">
              Photon packet ruptured against circuit gate. Final Score: {score}
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-neutral-200"
            >
              REBOOT TRACE
            </button>
          </div>
        )}
      </div>

      {/* Touch & Keyboard Controls */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => {
            sounds.playClick(700);
            setPlayerLane(0);
          }}
          className="py-3 border border-white/20 bg-white/5 hover:bg-white/10 active:scale-95 text-xs font-bold text-white transition-all"
        >
          LANE 01 [LEFT]
        </button>
        <button
          onClick={() => {
            sounds.playClick(800);
            setPlayerLane(1);
          }}
          className="py-3 border border-white/20 bg-white/5 hover:bg-white/10 active:scale-95 text-xs font-bold text-white transition-all"
        >
          LANE 02 [CENTER]
        </button>
        <button
          onClick={() => {
            sounds.playClick(900);
            setPlayerLane(2);
          }}
          className="py-3 border border-white/20 bg-white/5 hover:bg-white/10 active:scale-95 text-xs font-bold text-white transition-all"
        >
          LANE 03 [RIGHT]
        </button>
      </div>
    </div>
  );
};

/* =========================================================================
   GAME 2: CHRONO-GEAR ESCAPEMENT SYNCHRONIZER
   ========================================================================= */
const GearSyncGame: React.FC<{ flux: number }> = ({ flux }) => {
  const [targetRpm, setTargetRpm] = useState<number>(1400);
  const [currentRpm, setCurrentRpm] = useState<number>(800);
  const [gearRatio, setGearRatio] = useState<number>(2.0);
  const [syncScore, setSyncScore] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('Calibrate gear ratios to lock harmonic frequency.');

  const randomizeTarget = () => {
    sounds.playGearTick();
    const newTarget = Math.floor(600 + Math.random() * 1600);
    setTargetRpm(newTarget);
    setIsLocked(false);
    setFeedback(`Target recalibrated to ${newTarget} RPM. Adjust drive ratios!`);
  };

  const handleAdjustRatio = (delta: number) => {
    sounds.playGearTick();
    const nextRatio = Math.max(0.5, Math.min(5.0, +(gearRatio + delta).toFixed(1)));
    setGearRatio(nextRatio);
    const calculatedRpm = Math.round(flux * 18.5 * nextRatio);
    setCurrentRpm(calculatedRpm);

    if (Math.abs(calculatedRpm - targetRpm) <= 80) {
      sounds.playSimulatePulse();
      setIsLocked(true);
      setSyncScore((s) => s + 100);
      setFeedback('★ HARMONIC LOCK ACHIEVED! Escapement meshed perfectly.');
    } else {
      setIsLocked(false);
      setFeedback(
        calculatedRpm > targetRpm ? 'OVER-TORQUE: Reduce gear ratio.' : 'UNDER-TORQUE: Increase gear ratio.'
      );
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Status */}
      <div className="flex items-center justify-between p-3 border border-white/10 bg-white/5 text-xs">
        <div>
          <span className="text-neutral-400">SYNC STREAK:</span>{' '}
          <span className="font-bold text-red-500">{syncScore} PTS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-neutral-400">HARMONIC STATUS:</span>
          <span className={`font-bold ${isLocked ? 'text-emerald-400' : 'text-amber-400'}`}>
            {isLocked ? 'SYNCHRONIZED' : 'MISALIGNED'}
          </span>
        </div>
        <button
          onClick={randomizeTarget}
          className="px-3 py-1 border border-white/20 bg-white/5 hover:bg-white/10 text-[10px] font-bold text-white"
        >
          NEW TARGET
        </button>
      </div>

      {/* Visual Gear Animation & Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gear Visualizer */}
        <div className="h-56 border border-white/20 bg-[#050505] p-4 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="flex items-center gap-6">
            {/* Drive Gear */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: Math.max(0.2, 4000 / (currentRpm || 100)), ease: 'linear' }}
              className="w-24 h-24 rounded-full border-4 border-dashed border-white flex items-center justify-center relative"
            >
              <div className="w-8 h-8 rounded-full border border-white/40 bg-neutral-900 flex items-center justify-center">
                <div className="w-2 h-2 bg-red-600" />
              </div>
              <span className="absolute -bottom-4 text-[9px] text-neutral-400">DRIVE 36T</span>
            </motion.div>

            {/* Meshed Pinion Gear */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                repeat: Infinity,
                duration: Math.max(0.1, 4000 / ((currentRpm * gearRatio) || 100)),
                ease: 'linear',
              }}
              className="w-16 h-16 rounded-full border-4 border-dashed border-red-600 flex items-center justify-center relative"
            >
              <div className="w-5 h-5 rounded-full border border-red-500 bg-neutral-900 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white" />
              </div>
              <span className="absolute -bottom-4 text-[9px] text-neutral-400">PINION</span>
            </motion.div>
          </div>

          <div className="absolute bottom-2 text-center text-[10px] font-mono text-neutral-300">
            {feedback}
          </div>
        </div>

        {/* RPM Dials & Ratio Slider */}
        <div className="border border-white/20 bg-[#050505] p-4 flex flex-col justify-between space-y-3">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2 border border-white/10 bg-white/5">
              <div className="text-[10px] text-neutral-400">TARGET RPM</div>
              <div className="text-base font-black text-red-500">{targetRpm}</div>
            </div>
            <div className="p-2 border border-white/10 bg-white/5">
              <div className="text-[10px] text-neutral-400">CURRENT RPM</div>
              <div className="text-base font-black text-white">{currentRpm}</div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-neutral-400">GEAR RATIO</span>
              <span className="font-bold text-white">{gearRatio.toFixed(1)} : 1.0</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleAdjustRatio(-0.2)}
                className="px-3 py-1.5 border border-white/20 bg-white/5 hover:bg-white/15 text-white font-bold"
              >
                -
              </button>
              <div className="flex-1 h-2 bg-neutral-800 relative">
                <div
                  className="h-full bg-red-600"
                  style={{ width: `${((gearRatio - 0.5) / 4.5) * 100}%` }}
                />
              </div>
              <button
                onClick={() => handleAdjustRatio(0.2)}
                className="px-3 py-1.5 border border-white/20 bg-white/5 hover:bg-white/15 text-white font-bold"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              if (isLocked) {
                randomizeTarget();
              } else {
                sounds.playClick(300);
                setFeedback('RATIO MISMATCH: Adjust ratio to match Target RPM.');
              }
            }}
            className={`w-full py-2 font-bold uppercase tracking-wider text-xs transition-all ${
              isLocked
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-white/10 text-neutral-400 hover:bg-white/20'
            }`}
          >
            {isLocked ? 'NEXT CALIBRATION CYCLE' : 'CHECK ENGAGEMENT'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   GAME 3: RADAR SECTOR INTERCEPTOR
   ========================================================================= */
const RadarDefenseGame: React.FC = () => {
  const [targets, setTargets] = useState<Array<{ id: number; angle: number; radius: number; hp: number }>>([]);
  const [score, setScore] = useState<number>(0);
  const [radarAngle, setRadarAngle] = useState<number>(0);
  const [wave, setWave] = useState<number>(1);
  const [baseHealth, setBaseHealth] = useState<number>(100);
  const targetId = useRef(0);

  // Radar sweep and target approach
  useEffect(() => {
    const sweep = setInterval(() => {
      setRadarAngle((a) => (a + 4) % 360);
    }, 40);

    const gameTick = setInterval(() => {
      setTargets((prev) => {
        // Targets move closer to center
        const updated = prev
          .map((t) => ({ ...t, radius: t.radius - 1.5 }))
          .filter((t) => {
            if (t.radius <= 10) {
              sounds.playClick(180, 'sawtooth');
              setBaseHealth((h) => Math.max(0, h - 15));
              return false;
            }
            return true;
          });

        // Spawn target
        if (updated.length < 4 + wave && Math.random() < 0.4) {
          updated.push({
            id: targetId.current++,
            angle: Math.floor(Math.random() * 360),
            radius: 90,
            hp: 1,
          });
        }
        return updated;
      });
    }, 400);

    return () => {
      clearInterval(sweep);
      clearInterval(gameTick);
    };
  }, [wave]);

  const handleIntercept = (id: number) => {
    sounds.playClick(1100, 'triangle');
    setTargets((prev) => prev.filter((t) => t.id !== id));
    setScore((s) => s + 25);
    if ((score + 25) % 150 === 0) {
      setWave((w) => w + 1);
      sounds.playSimulatePulse();
    }
  };

  return (
    <div className="space-y-4">
      {/* Radar HUD */}
      <div className="flex items-center justify-between p-3 border border-white/10 bg-white/5 text-xs">
        <div>
          <span className="text-neutral-400">SECTOR SCORE:</span>{' '}
          <span className="font-bold text-white">{score}</span>
        </div>
        <div>
          <span className="text-neutral-400">DEFENSE WAVE:</span>{' '}
          <span className="font-bold text-red-500">WAVE 0{wave}</span>
        </div>
        <div>
          <span className="text-neutral-400">CORE SHIELD:</span>{' '}
          <span className="font-bold text-white">{baseHealth}%</span>
        </div>
      </div>

      {/* Interactive 360 Radar Canvas Area */}
      <div className="relative h-72 border border-white/20 bg-[#050505] flex items-center justify-center overflow-hidden">
        {/* Concentric rings */}
        <div className="absolute w-60 h-60 rounded-full border border-white/10" />
        <div className="absolute w-44 h-44 rounded-full border border-white/10" />
        <div className="absolute w-28 h-28 rounded-full border border-white/10" />
        <div className="absolute w-12 h-12 rounded-full border border-red-500/50 bg-red-950/20" />

        {/* Crosshair grid */}
        <div className="absolute w-full h-[1px] bg-white/10" />
        <div className="absolute h-full w-[1px] bg-white/10" />

        {/* Sweeping Beam */}
        <div
          className="absolute w-36 h-36 origin-bottom-right pointer-events-none"
          style={{
            transform: `rotate(${radarAngle}deg)`,
            background: 'conic-gradient(from 0deg, rgba(220,38,38,0.3) 0deg, transparent 60deg)',
            top: 'calc(50% - 144px)',
            left: 'calc(50% - 144px)',
          }}
        />

        {/* Anomalous Targets */}
        {targets.map((t) => {
          const rad = (t.angle * Math.PI) / 180;
          const distancePx = (t.radius / 100) * 120;
          const x = Math.cos(rad) * distancePx;
          const y = Math.sin(rad) * distancePx;

          return (
            <button
              key={t.id}
              onClick={() => handleIntercept(t.id)}
              className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group cursor-crosshair z-20"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
            >
              <div className="w-3 h-3 bg-red-600 border border-white animate-ping absolute" />
              <div className="w-3.5 h-3.5 bg-red-600 border border-white flex items-center justify-center">
                <Crosshair className="w-2.5 h-2.5 text-white" />
              </div>
            </button>
          );
        })}

        {/* Base Health Warning if 0 */}
        {baseHealth <= 0 && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-center p-4 z-30">
            <div className="text-red-500 font-black text-lg tracking-widest mb-1">
              DEFENSE PERIMETER BREACHED
            </div>
            <p className="text-xs text-neutral-400 mb-3">Sector 07 overwhelmed by flux anomalies.</p>
            <button
              onClick={() => {
                setBaseHealth(100);
                setScore(0);
                setTargets([]);
              }}
              className="px-6 py-2 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-neutral-200"
            >
              RE-ENGAGE RADAR
            </button>
          </div>
        )}
      </div>

      <div className="text-center text-[10px] text-neutral-400">
        Click or tap approaching red target markers to discharge anti-anomaly quantum pulses before they reach the core.
      </div>
    </div>
  );
};

/* =========================================================================
   GAME 4: HEX NEURAL DECRYPTOR
   ========================================================================= */
const HexDecryptGame: React.FC = () => {
  const hexCodes = ['0x4F', '0x8A', '0xC2', '0x19', '0xFF', '0x3B', '0x7E', '0x9D', '0xE4'];
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerInput, setPlayerInput] = useState<number[]>([]);
  const [level, setLevel] = useState<number>(1);
  const [isShowingSequence, setIsShowingSequence] = useState<boolean>(false);
  const [activeHighlight, setActiveHighlight] = useState<number | null>(null);
  const [gameStatus, setGameStatus] = useState<'IDLE' | 'PLAYING' | 'SUCCESS' | 'FAILED'>('IDLE');

  const startLevel = (nextLvl = 1) => {
    sounds.playSimulatePulse();
    setLevel(nextLvl);
    setPlayerInput([]);
    setGameStatus('PLAYING');
    setIsShowingSequence(true);

    // Generate sequence of length nextLvl + 2
    const newSeq = Array.from({ length: nextLvl + 2 }, () => Math.floor(Math.random() * 9));
    setSequence(newSeq);

    // Play sequence animation
    let step = 0;
    const seqInterval = setInterval(() => {
      if (step < newSeq.length) {
        const node = newSeq[step];
        setActiveHighlight(node);
        sounds.playClick(440 + node * 60);
        setTimeout(() => setActiveHighlight(null), 300);
        step++;
      } else {
        clearInterval(seqInterval);
        setIsShowingSequence(false);
      }
    }, 600);
  };

  const handleNodeClick = (index: number) => {
    if (isShowingSequence || gameStatus !== 'PLAYING') return;

    sounds.playClick(440 + index * 60);
    const nextInput = [...playerInput, index];
    setPlayerInput(nextInput);

    // Check if right so far
    const currentIndex = nextInput.length - 1;
    if (nextInput[currentIndex] !== sequence[currentIndex]) {
      sounds.playClick(200, 'sawtooth');
      setGameStatus('FAILED');
      return;
    }

    // Check if completed full sequence
    if (nextInput.length === sequence.length) {
      sounds.playSpectrumLoad();
      setGameStatus('SUCCESS');
    }
  };

  return (
    <div className="space-y-4">
      {/* Status Bar */}
      <div className="flex items-center justify-between p-3 border border-white/10 bg-white/5 text-xs">
        <div>
          <span className="text-neutral-400">CIPHER LEVEL:</span>{' '}
          <span className="font-bold text-white">LEVEL 0{level}</span>
        </div>
        <div>
          <span className="text-neutral-400">PROGRESS:</span>{' '}
          <span className="font-bold text-red-500">
            {playerInput.length} / {sequence.length || 3}
          </span>
        </div>
        <button
          onClick={() => startLevel(1)}
          className="px-3 py-1 border border-white/20 bg-white/5 hover:bg-white/10 text-[10px] font-bold text-white"
        >
          RESET CIPHER
        </button>
      </div>

      {/* 3x3 Hex Node Keypad */}
      <div className="grid grid-cols-3 gap-3 p-4 border border-white/20 bg-[#050505] max-w-sm mx-auto">
        {hexCodes.map((code, idx) => {
          const isHighlighted = activeHighlight === idx;
          return (
            <button
              key={idx}
              onClick={() => handleNodeClick(idx)}
              disabled={isShowingSequence}
              className={`h-20 border font-mono font-bold text-xs flex flex-col items-center justify-center transition-all ${
                isHighlighted
                  ? 'border-white bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.8)] scale-105'
                  : 'border-white/20 bg-white/5 text-neutral-300 hover:bg-white/15 hover:border-white/40'
              }`}
            >
              <span className="text-[9px] text-neutral-400">NODE 0{idx + 1}</span>
              <span className="text-sm font-black text-white mt-1">{code}</span>
            </button>
          );
        })}
      </div>

      {/* Status Directive */}
      <div className="text-center p-3 border border-white/10 bg-white/5 text-xs">
        {gameStatus === 'IDLE' && (
          <button
            onClick={() => startLevel(1)}
            className="px-6 py-1.5 bg-white text-black font-bold uppercase tracking-wider text-xs hover:bg-neutral-200"
          >
            START NEURAL CIPHER
          </button>
        )}
        {gameStatus === 'PLAYING' && (
          <span className="text-neutral-300">
            {isShowingSequence ? 'MEMORIZE NEURAL FLASH SEQUENCE...' : 'REPLICATE CIPHER SEQUENCE ON KEYPAD'}
          </span>
        )}
        {gameStatus === 'SUCCESS' && (
          <div className="flex items-center justify-center gap-3">
            <span className="text-emerald-400 font-bold">CIPHER CRACKED!</span>
            <button
              onClick={() => startLevel(level + 1)}
              className="px-4 py-1 bg-red-600 text-white font-bold uppercase text-[10px] hover:bg-red-700"
            >
              ADVANCE TO LEVEL {level + 1}
            </button>
          </div>
        )}
        {gameStatus === 'FAILED' && (
          <div className="flex items-center justify-center gap-3">
            <span className="text-red-500 font-bold">ACCESS DENIED</span>
            <button
              onClick={() => startLevel(level)}
              className="px-4 py-1 bg-white text-black font-bold uppercase text-[10px] hover:bg-neutral-200"
            >
              RETRY LEVEL
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
