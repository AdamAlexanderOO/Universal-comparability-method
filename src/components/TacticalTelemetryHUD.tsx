import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Crosshair, Globe, Gauge, Activity, AlertTriangle, Terminal, Hexagon, ShieldAlert, Cpu } from 'lucide-react';
import { TelemetryState, RadarAnomaly, TerminalLog } from '../types';
import { sounds } from '../utils/soundEffects';

interface TacticalTelemetryHUDProps {
  powerOn: boolean;
  telemetry: TelemetryState;
  onSelectAnomaly: (anomaly: RadarAnomaly) => void;
  selectedAnomaly: RadarAnomaly | null;
  terminalLogs: TerminalLog[];
  fluxFrequency: number;
}

export const TacticalTelemetryHUD: React.FC<TacticalTelemetryHUDProps> = ({
  powerOn,
  telemetry,
  onSelectAnomaly,
  selectedAnomaly,
  terminalLogs,
  fluxFrequency,
}) => {
  const [radarAngle, setRadarAngle] = useState(0);
  const [selectedTube, setSelectedTube] = useState<string | null>(null);

  // Radar beam sweep animation
  useEffect(() => {
    if (!powerOn) return;
    const interval = setInterval(() => {
      setRadarAngle((prev) => (prev + 3) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [powerOn]);

  const handleAnomalyClick = (anomaly: RadarAnomaly) => {
    sounds.playRadarPing();
    onSelectAnomaly(anomaly);
  };

  return (
    <div
      id="tactical-hud-console"
      className="relative w-full h-full min-h-[480px] bg-[#0A0A0A] border border-white/10 p-4 sm:p-5 overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Background HUD Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Top Header & Tactical Coordinates */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-red-500 animate-spin" style={{ animationDuration: '12s' }} />
          <div>
            <span className="font-mono text-xs sm:text-sm font-black tracking-widest text-white">
              TACTICAL TELEMETRY // HUD COMMAND
            </span>
            <div className="text-[9px] font-mono text-neutral-400">
              SECTOR 07-GRID-ALPHA | FREQ: {(fluxFrequency * 12.4).toFixed(1)} MHz
            </div>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="px-2 py-0.5 border border-white/20 bg-white/5 text-white">
            GRID: ACTIVE
          </span>
          <span className="px-2 py-0.5 border border-red-600/40 bg-red-950/20 text-red-400">
            ANOMALIES: {telemetry.radarAnomalies.length}
          </span>
        </div>
      </div>

      {/* Main HUD Body: 3-Column Layout */}
      <div className="relative z-10 my-3 grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Left Column: Radial Gauges + Plasma Vials */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          {/* Radial Metric Gauges */}
          <div className="border border-white/10 bg-white/5 p-3">
            <div className="text-[10px] font-mono text-white font-bold mb-2 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-red-500" />
              <span>FLUX HARMONICS</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {/* Gauge 45 */}
              <div className="flex flex-col items-center">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-12 h-12 -rotate-90">
                    <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
                    <circle
                      cx="24"
                      cy="24"
                      r="18"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeDasharray="113"
                      strokeDashoffset={powerOn ? '62' : '113'}
                      strokeLinecap="square"
                    />
                  </svg>
                  <span className="absolute font-mono text-xs font-black text-white">45</span>
                </div>
                <span className="text-[8px] font-mono text-neutral-400 mt-1">PRIMARY</span>
              </div>

              {/* Gauge 38 */}
              <div className="flex flex-col items-center">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-12 h-12 -rotate-90">
                    <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
                    <circle
                      cx="24"
                      cy="24"
                      r="18"
                      fill="none"
                      stroke="#dc2626"
                      strokeWidth="2.5"
                      strokeDasharray="113"
                      strokeDashoffset={powerOn ? '70' : '113'}
                      strokeLinecap="square"
                    />
                  </svg>
                  <span className="absolute font-mono text-xs font-black text-red-500">38</span>
                </div>
                <span className="text-[8px] font-mono text-neutral-400 mt-1">ENTROPY</span>
              </div>

              {/* Gauge 33 */}
              <div className="flex flex-col items-center">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-12 h-12 -rotate-90">
                    <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
                    <circle
                      cx="24"
                      cy="24"
                      r="18"
                      fill="none"
                      stroke="#a3a3a3"
                      strokeWidth="2.5"
                      strokeDasharray="113"
                      strokeDashoffset={powerOn ? '75' : '113'}
                      strokeLinecap="square"
                    />
                  </svg>
                  <span className="absolute font-mono text-xs font-black text-neutral-300">33</span>
                </div>
                <span className="text-[8px] font-mono text-neutral-400 mt-1">CAPACITOR</span>
              </div>
            </div>
          </div>

          {/* Bio-Nutrient Plasma Test Tubes */}
          <div className="border border-white/10 bg-white/5 p-3">
            <div className="text-[10px] font-mono text-white font-bold mb-2 flex items-center justify-between">
              <span>PLASMA VIALS</span>
              <span className="text-[8px] text-neutral-400">CHAMBER 03</span>
            </div>
            <div className="flex items-center justify-around h-20">
              {telemetry.testTubes.map((tube) => (
                <div
                  key={tube.id}
                  onClick={() => {
                    sounds.playClick(1100);
                    setSelectedTube(tube.label);
                  }}
                  className="cursor-pointer flex flex-col items-center group"
                >
                  <div className="relative w-5 h-16 border border-white/20 bg-neutral-950 p-0.5 overflow-hidden flex flex-col justify-end">
                    <motion.div
                      className="w-full transition-all"
                      style={{
                        backgroundColor: tube.id === 'tube-1' ? '#dc2626' : tube.id === 'tube-2' ? '#ffffff' : '#ef4444',
                      }}
                      animate={{
                        height: powerOn ? `${tube.level}%` : '10%',
                      }}
                    />
                    <div className="absolute inset-y-1 right-0.5 flex flex-col justify-between opacity-40 pointer-events-none">
                      <div className="w-1 h-[1px] bg-white" />
                      <div className="w-1 h-[1px] bg-white" />
                      <div className="w-1 h-[1px] bg-white" />
                    </div>
                  </div>
                  <span className="text-[7px] font-mono text-neutral-400 mt-1">{tube.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column: Tactical Radar */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center border border-white/10 bg-[#070707] p-3 relative overflow-hidden">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-white/20 bg-[#050505] flex items-center justify-center">
            {/* Concentric Range Rings */}
            <div className="absolute w-48 h-48 rounded-full border border-white/10" />
            <div className="absolute w-32 h-32 rounded-full border border-white/10" />
            <div className="absolute w-16 h-16 rounded-full border border-white/15" />

            {/* Radar Crosshairs */}
            <div className="absolute w-full h-[1px] bg-white/10" />
            <div className="absolute h-full w-[1px] bg-white/10" />

            {/* Background Map Projection */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="85" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="3 3" />
              <path d="M 60 70 Q 80 50 100 65 T 140 80 T 120 120 T 70 110 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.75" />
              <path d="M 90 120 Q 110 140 130 160 T 100 170 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.75" />
            </svg>

            {/* Sweeping Radar Beam */}
            {powerOn && (
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: `conic-gradient(from ${radarAngle}deg, rgba(220, 38, 38, 0.4) 0deg, transparent 65deg)`,
                }}
              />
            )}

            {/* Radar Anomalies Blips */}
            {telemetry.radarAnomalies.map((anomaly) => {
              const rad = (anomaly.angle * Math.PI) / 180;
              const dist = anomaly.radius * 0.9;
              const x = Math.cos(rad) * dist;
              const y = Math.sin(rad) * dist;

              const isSelected = selectedAnomaly?.id === anomaly.id;

              return (
                <motion.div
                  key={anomaly.id}
                  onClick={() => handleAnomalyClick(anomaly)}
                  whileHover={{ scale: 1.4 }}
                  className="absolute cursor-pointer z-30"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                >
                  <div
                    className={`w-3 h-3 rounded-full flex items-center justify-center ${
                      anomaly.severity === 'CRITICAL'
                        ? 'bg-red-600'
                        : anomaly.severity === 'ELEVATED'
                        ? 'bg-neutral-200'
                        : 'bg-red-400'
                    } ${isSelected ? 'ring-2 ring-white animate-ping' : 'animate-pulse'}`}
                  >
                    <div className="w-1 h-1 bg-black rounded-full" />
                  </div>
                  <span className="absolute top-4 -left-4 text-[8px] font-mono font-bold text-white bg-black/90 px-1 border border-white/20 whitespace-nowrap">
                    {anomaly.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Radar Bottom Readout */}
          <div className="w-full flex items-center justify-between text-[9px] font-mono text-neutral-400 mt-2 px-2">
            <span>BEARING: {radarAngle.toFixed(0)}°</span>
            <span>ZOOM: 100X</span>
            <span className="text-red-500">TRACK: NOMINAL</span>
          </div>
        </div>

        {/* Right Column: Hex Node Matrix & Telemetry Logs */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          {/* Hexagonal Node Diagnostics Cluster */}
          <div className="border border-white/10 bg-white/5 p-3">
            <div className="text-[10px] font-mono text-white font-bold mb-2 flex items-center justify-between">
              <span>HEX NODE MATRIX</span>
              <span className="text-[8px] text-red-500">9/9 ONLINE</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 place-items-center">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((nodeNum) => (
                <div
                  key={nodeNum}
                  onClick={() => sounds.playClick(600 + nodeNum * 60)}
                  className={`w-8 h-8 flex items-center justify-center font-mono text-[9px] font-bold cursor-pointer transition-all ${
                    powerOn
                      ? 'border border-white/20 bg-white/5 text-white hover:bg-red-600 hover:border-red-600'
                      : 'border border-white/5 bg-neutral-950 text-neutral-600'
                  }`}
                >
                  N-0{nodeNum}
                </div>
              ))}
            </div>
          </div>

          {/* Live Streaming Data Log */}
          <div className="border border-white/10 bg-neutral-950 p-2.5 flex-1 flex flex-col">
            <div className="flex items-center justify-between text-[9px] font-mono text-white pb-1 border-b border-white/10 mb-1.5">
              <div className="flex items-center gap-1">
                <Terminal className="w-3 h-3 text-red-500" />
                <span>TERMINAL LOGS</span>
              </div>
              <span className="text-red-500">LIVE</span>
            </div>
            <div className="flex-1 overflow-y-auto max-h-28 space-y-1 font-mono text-[8px] text-neutral-300 scrollbar-thin">
              {terminalLogs.slice(-6).map((log) => (
                <div key={log.id} className="leading-tight">
                  <span className="text-neutral-500">[{log.timestamp}]</span>{' '}
                  <span
                    className={
                      log.type === 'CRITICAL'
                        ? 'text-red-500 font-bold'
                        : log.type === 'WARNING'
                        ? 'text-neutral-300'
                        : 'text-neutral-400'
                    }
                  >
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Anomaly Quick Diagnostic Banner */}
      {selectedAnomaly && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 border border-red-600 bg-red-950/40 p-2.5 flex items-center justify-between text-xs font-mono text-white"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500 animate-bounce" />
            <span>
              TARGET: <strong className="text-white">{selectedAnomaly.label}</strong> ({selectedAnomaly.coordinates}) — SEVERITY: {selectedAnomaly.severity}
            </span>
          </div>
          <span className="text-[10px] text-red-400">SIG: {selectedAnomaly.signature}</span>
        </motion.div>
      )}
    </div>
  );
};
