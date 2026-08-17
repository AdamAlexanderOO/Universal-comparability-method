import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sliders, Volume2, VolumeX, Eye, Zap, Shield, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  scanlines: boolean;
  onToggleScanlines: () => void;
  glowIntensity: number;
  onGlowChange: (val: number) => void;
  overclockEnabled: boolean;
  onToggleOverclock: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  soundEnabled,
  onToggleSound,
  scanlines,
  onToggleScanlines,
  glowIntensity,
  onGlowChange,
  overclockEnabled,
  onToggleOverclock,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-mono">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-md border border-white/20 bg-[#0A0A0A] p-5 sm:p-6 text-neutral-200 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-red-500" />
              <h3 className="text-sm sm:text-base font-black tracking-wider text-white">
                AURORA MACHINE // SETTINGS
              </h3>
            </div>
            <button
              onClick={() => {
                sounds.playClick(600);
                onClose();
              }}
              className="p-1.5 border border-white/20 bg-white/5 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Settings Options */}
          <div className="my-4 space-y-4 text-xs">
            {/* Sound FX Toggle */}
            <div className="flex items-center justify-between p-3 border border-white/10 bg-white/5">
              <div className="flex items-center gap-2.5">
                {soundEnabled ? <Volume2 className="w-4 h-4 text-white" /> : <VolumeX className="w-4 h-4 text-neutral-500" />}
                <div>
                  <div className="font-bold text-white">TACTILE AUDIO SYNTH</div>
                  <div className="text-[10px] text-neutral-400">Mechanical clicks, laser pulses, servo whines</div>
                </div>
              </div>
              <button
                onClick={() => {
                  sounds.playClick(800);
                  onToggleSound();
                }}
                className={`px-3 py-1 border font-bold text-xs transition-all ${
                  soundEnabled ? 'border-white bg-white/15 text-white' : 'border-white/10 bg-neutral-900 text-neutral-500'
                }`}
              >
                {soundEnabled ? 'ACTIVE' : 'MUTED'}
              </button>
            </div>

            {/* CRT Scanline Overlay Toggle */}
            <div className="flex items-center justify-between p-3 border border-white/10 bg-white/5">
              <div className="flex items-center gap-2.5">
                <Eye className="w-4 h-4 text-red-500" />
                <div>
                  <div className="font-bold text-white">CRT SCANLINES & PHOSPHOR</div>
                  <div className="text-[10px] text-neutral-400">Retro-futuristic monitor texture</div>
                </div>
              </div>
              <button
                onClick={() => {
                  sounds.playClick(800);
                  onToggleScanlines();
                }}
                className={`px-3 py-1 border font-bold text-xs transition-all ${
                  scanlines ? 'border-red-600 bg-red-950/40 text-red-400' : 'border-white/10 bg-neutral-900 text-neutral-500'
                }`}
              >
                {scanlines ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Overclock Toggle */}
            <div className="flex items-center justify-between p-3 border border-white/10 bg-white/5">
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-red-500" />
                <div>
                  <div className="font-bold text-white">OVERCLOCK GEAR TRAIN</div>
                  <div className="text-[10px] text-neutral-400">Boost RPM and AI Core synaptic throughput</div>
                </div>
              </div>
              <button
                onClick={() => {
                  sounds.playSimulatePulse();
                  onToggleOverclock();
                }}
                className={`px-3 py-1 border font-bold text-xs transition-all ${
                  overclockEnabled ? 'border-red-600 bg-red-950/40 text-red-400' : 'border-white/10 bg-neutral-900 text-neutral-500'
                }`}
              >
                {overclockEnabled ? 'OVERCLOCKED' : 'NORMAL'}
              </button>
            </div>

            {/* Neon Glow Slider */}
            <div className="p-3 border border-white/10 bg-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">TRACE GLOW INTENSITY</span>
                <span className="text-red-500 font-bold">{Math.round(glowIntensity)}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={glowIntensity}
                onChange={(e) => onGlowChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-neutral-800 appearance-none cursor-pointer accent-red-600"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-white/10 flex justify-end">
            <button
              onClick={() => {
                sounds.playClick(640);
                onClose();
              }}
              className="px-4 py-1.5 border border-white/20 bg-white/5 text-white hover:bg-white/15 text-xs font-bold transition-all"
            >
              DONE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
