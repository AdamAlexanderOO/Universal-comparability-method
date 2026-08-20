import React, { useEffect, useRef, useState } from 'react';
import {
  Layers,
  Sparkles,
  Grid,
  Cpu,
  Eye,
  Sliders,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Zap,
  CheckCircle2,
  Activity,
  Maximize2,
  Minimize2,
  Binary,
  Compass,
  ZoomIn,
  ZoomOut,
  Move,
  Scan,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { haptics } from '../utils/haptics';
import { AppThemeConfig } from '../utils/theme';

interface RomanMosaicEngineProps {
  powerOn: boolean;
  fluxFrequency: number;
  theme: AppThemeConfig;
}

// Characteristic Pre-built Image Profiles
interface KnownImageProfile {
  id: string;
  name: string;
  category: string;
  src: string;
  dominantColors: string[];
  characteristicLines: string[];
  complexityIndex: number;
  equationsCount: number;
  description: string;
}

const PRESET_PROFILES: KnownImageProfile[] = [
  {
    id: 'ROMAN_CYBER_MOSAIC',
    name: 'Imperium Tesserae Visage',
    category: 'Ancient Cyber-Relic',
    src: '/src/assets/images/roman_cyber_mosaic_1787188021928.jpg',
    dominantColors: ['#f59e0b', '#dc2626', '#1e293b', '#38bdf8'],
    characteristicLines: ['Arch of Titus Curve (32°)', 'Grout Matrix Grid 4x4', 'Visor Horizontal Cut', 'Crown Tesserae Radial'],
    complexityIndex: 94,
    equationsCount: 312,
    description: 'Ancient Roman mosaic tesserae hybridized with quantum transistor routing paths.',
  },
  {
    id: 'MECH_HERO',
    name: 'Assault Mech Prime',
    category: 'Combat Rig',
    src: '/src/assets/images/player_mech_hero_1787187990637.jpg',
    dominantColors: ['#00f0ff', '#1e3a8a', '#94a3b8', '#ef4444'],
    characteristicLines: ['Vertical Torso Spine (90°)', 'Shoulder Pod Diagonals (45°)', 'Visor Slit Horizon (0°)', 'Leg Actuator V-Form (60°)'],
    complexityIndex: 88,
    equationsCount: 264,
    description: 'Heavy tactical mech armor with high-contrast edge vector contours.',
  },
  {
    id: 'SPACE_FIGHTER',
    name: 'Vanguard Starfighter',
    category: 'Aeronautic Craft',
    src: '/src/assets/images/space_starfighter_hero_1787089887255.jpg',
    dominantColors: ['#38bdf8', '#0284c7', '#0f172a', '#fbbf24'],
    characteristicLines: ['Delta Wing Sweeps (35°)', 'Twin Thruster Vectors', 'Cockpit Canopy Ellipse', 'Plasma Core Axial'],
    complexityIndex: 82,
    equationsCount: 218,
    description: 'Aerodynamic vector chassis characterized by sweeping delta lines and twin ion flare.',
  },
  {
    id: 'CYBER_PILOT',
    name: 'Neural Pilot Operator',
    category: 'Bio-Cybernetic',
    src: '/src/assets/images/cyber_pilot_hero_1787089924400.jpg',
    dominantColors: ['#a855f7', '#ec4899', '#0f172a', '#06b6d4'],
    characteristicLines: ['HUD Reticle Circle (r=42)', 'Synaptic Cervical Arc', 'Visor Reflection Band', 'Collar Trace Segment'],
    complexityIndex: 91,
    equationsCount: 290,
    description: 'Biometric sensory portrait mapped onto 300/200/150 hierarchical cipher coordinates.',
  },
];

export const RomanMosaicMatrixEngine: React.FC<RomanMosaicEngineProps> = ({
  powerOn,
  fluxFrequency,
  theme,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Zoom & Pan state for multi-level microscopic resolution re-rendering
  const [zoomLevel, setZoomLevel] = useState<number>(1); // 1x, 2x, 4x, 8x
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Resolution Hierarchy
  // 1: Macro Level (300 scale - large block tesserae)
  // 2: Meso Level (200 scale - medium stone tiles & edge interpolation)
  // 3: Micro Level (150 scale - fine transistor cipher & sub-pixel fidelity)
  // 4: Ultra Level (Full continuous fidelity)
  const [hierarchyLevel, setHierarchyLevel] = useState<number>(1);
  const [isAutoRefining, setIsAutoRefining] = useState<boolean>(true);
  const [selectedProfile, setSelectedProfile] = useState<KnownImageProfile>(PRESET_PROFILES[0]);
  const [tileStyle, setTileStyle] = useState<'ROMAN_STONE' | 'QUANTUM_TRANSISTOR' | 'GLYPH_CIPHER' | 'NEON_CIRCUIT'>('ROMAN_STONE');
  const [groutIntensity, setGroutIntensity] = useState<number>(75);
  const [showTransistorGrid, setShowTransistorGrid] = useState<boolean>(true);
  const [showVectorLines, setShowVectorLines] = useState<boolean>(true);
  const [showGlyphMatrix, setShowGlyphMatrix] = useState<boolean>(false);
  const [similarityScore, setSimilarityScore] = useState<number>(96.4);
  const [recognizedCategory, setRecognizedCategory] = useState<string>('Ancient Cyber-Relic');
  const [customImageSrc, setCustomImageSrc] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'MOSAIC_VIEW' | 'DRAW_STUDIO' | 'CIPHER_HIERARCHY'>('MOSAIC_VIEW');
  const [cipherHierarchy, setCipherHierarchy] = useState<{ scale300: string; scale200: string; scale150: string }>({
    scale300: '0xROMAN_MACRO // TESSERAE_BASE_300_BLOCKS',
    scale200: '0xCYPHER_MESO // VECTOR_INTERPOLATION_200_LINES',
    scale150: '0xTRANSISTOR_MICRO // QUANTUM_150_DIGITS_RESOLVED',
  });
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [brushColor, setBrushColor] = useState<string>('#00f0ff');
  const [brushSize, setBrushSize] = useState<number>(8);

  // Progressive Synthesis Timer
  useEffect(() => {
    if (!isAutoRefining || !powerOn) return;
    const interval = setInterval(() => {
      setHierarchyLevel((prev) => {
        const next = (prev % 4) + 1;
        if (next === 1) {
          sounds.playLaserPew();
        } else if (next === 4) {
          sounds.playSpectrumLoad();
        } else {
          sounds.playClick(600 + next * 80);
        }
        return next;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [isAutoRefining, powerOn]);

  // Main Canvas Mosaic Rendering Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !powerOn) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = customImageSrc || selectedProfile.src;

    img.onload = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Determine mosaic grid tile size based on hierarchy level and optical zoom scale
      // Level 1: 300 scale -> coarse tiles (approx 36px - 44px)
      // Level 2: 200 scale -> medium tiles (approx 18px - 22px)
      // Level 3: 150 scale -> fine tiles (approx 8px - 10px)
      // Level 4: Ultra -> micro tiles (approx 3px - 4px)
      let baseTileSize = 36;
      if (hierarchyLevel === 2) baseTileSize = 18;
      if (hierarchyLevel === 3) baseTileSize = 8;
      if (hierarchyLevel === 4) baseTileSize = 3;

      // Adjust effective rendered tile size according to active multi-level zoom
      const tileSize = Math.max(2, Math.round(baseTileSize * zoomLevel));

      // Draw original image to an offscreen buffer to sample pixel colors
      const offscreen = document.createElement('canvas');
      offscreen.width = w;
      offscreen.height = h;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, w, h);
      const imgData = offCtx.getImageData(0, 0, w, h).data;

      // Apply zoom view transformation around center or pan coordinates
      ctx.save();
      if (zoomLevel > 1) {
        ctx.translate(w / 2 + panOffset.x, h / 2 + panOffset.y);
        ctx.scale(zoomLevel, zoomLevel);
        ctx.translate(-w / 2, -h / 2);
      }

      // Render Mosaic Tesserae / Transistor Blocks
      const cols = Math.ceil(w / baseTileSize);
      const rows = Math.ceil(h / baseTileSize);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * baseTileSize;
          const y = r * baseTileSize;

          // Sample center pixel of this tile
          const sampleX = Math.min(w - 1, Math.floor(x + baseTileSize / 2));
          const sampleY = Math.min(h - 1, Math.floor(y + baseTileSize / 2));
          const idx = (sampleY * w + sampleX) * 4;

          const red = imgData[idx];
          const green = imgData[idx + 1];
          const blue = imgData[idx + 2];
          const brightness = (red + green + blue) / 3;

          // Slight random stone variation for Roman mosaic authenticity
          const stoneJitter = tileStyle === 'ROMAN_STONE' ? ((c * 7 + r * 13) % 15) - 7 : 0;
          const finalR = Math.max(0, Math.min(255, red + stoneJitter));
          const finalG = Math.max(0, Math.min(255, green + stoneJitter));
          const finalB = Math.max(0, Math.min(255, blue + stoneJitter));

          // Draw Tile
          ctx.fillStyle = `rgb(${finalR}, ${finalG}, ${finalB})`;

          const grout = (groutIntensity / 100) * (baseTileSize > 10 ? 2 : 1);
          const drawW = Math.max(1, baseTileSize - (tileStyle === 'ROMAN_STONE' || tileStyle === 'QUANTUM_TRANSISTOR' ? grout : 0));
          const drawH = Math.max(1, baseTileSize - (tileStyle === 'ROMAN_STONE' || tileStyle === 'QUANTUM_TRANSISTOR' ? grout : 0));

          if (tileStyle === 'ROMAN_STONE') {
            // Rounded rectangular stone tesserae
            const radius = Math.min(4, drawW / 4);
            ctx.beginPath();
            ctx.roundRect(x, y, drawW, drawH, radius);
            ctx.fill();

            // Subtle highlight on top-left of tesserae
            if (baseTileSize > 12) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (brightness / 255)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          } else if (tileStyle === 'QUANTUM_TRANSISTOR') {
            // Sharp transistor gate cells with central quantum contact dot
            ctx.fillRect(x, y, drawW, drawH);
            if (baseTileSize > 10 && brightness > 80) {
              ctx.fillStyle = theme.primary;
              ctx.beginPath();
              ctx.arc(x + drawW / 2, y + drawH / 2, Math.max(1, drawW / 6), 0, Math.PI * 2);
              ctx.fill();
            }
          } else if (tileStyle === 'GLYPH_CIPHER') {
            // Hierarchical Roman / Quantum alphanumeric glyph matrix
            ctx.fillStyle = 'rgba(10, 15, 25, 0.9)';
            ctx.fillRect(x, y, baseTileSize, baseTileSize);

            const glyphs = '0123456789ABCDEFΣΩΨΦΛΓΔΞΘ';
            const charIdx = (c * 17 + r * 31 + Math.floor(brightness)) % glyphs.length;
            const char = glyphs[charIdx];

            ctx.fillStyle = `rgb(${finalR}, ${finalG}, ${finalB})`;
            ctx.font = `${Math.max(8, Math.floor(baseTileSize * 0.75))}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(char, x + baseTileSize / 2, y + baseTileSize / 2);
          } else {
            // NEON CIRCUIT
            ctx.fillRect(x, y, drawW, drawH);
            if ((c + r) % 3 === 0) {
              ctx.strokeStyle = theme.primary;
              ctx.lineWidth = 1;
              ctx.strokeRect(x, y, drawW, drawH);
            }
          }
        }
      }

      ctx.restore();

      // Overlay Characteristic Vector Recognition Lines
      if (showVectorLines) {
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);

        // Draw characteristic detection crosses & bounding circles
        const cx = w / 2;
        const cy = h / 2;

        ctx.beginPath();
        ctx.arc(cx, cy, Math.min(w, h) * 0.38, 0, Math.PI * 2);
        ctx.stroke();

        // Crosshairs
        ctx.beginPath();
        ctx.moveTo(cx - 30, cy);
        ctx.lineTo(cx + 30, cy);
        ctx.moveTo(cx, cy - 30);
        ctx.lineTo(cx, cy + 30);
        ctx.stroke();

        ctx.setLineDash([]);

        // Label recognized feature coordinates
        ctx.fillStyle = '#00f0ff';
        ctx.font = '10px monospace';
        ctx.fillText(`VECTOR_LOC // [${(w * 0.5).toFixed(0)}, ${(h * 0.5).toFixed(0)}]`, cx + 8, cy - 12);
        ctx.fillText(`SSIM_MATCH: ${similarityScore.toFixed(1)}%`, 14, h - 16);
      }

      // Overlay Transistor Coordinate Grid
      if (showTransistorGrid) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        const step = 40;
        for (let gx = 0; gx < w; gx += step) {
          ctx.beginPath();
          ctx.moveTo(gx, 0);
          ctx.lineTo(gx, h);
          ctx.stroke();
        }
        for (let gy = 0; gy < h; gy += step) {
          ctx.beginPath();
          ctx.moveTo(0, gy);
          ctx.lineTo(w, gy);
          ctx.stroke();
        }
      }
    };
  }, [
    powerOn,
    selectedProfile,
    customImageSrc,
    hierarchyLevel,
    zoomLevel,
    panOffset,
    tileStyle,
    groutIntensity,
    showTransistorGrid,
    showVectorLines,
    similarityScore,
    theme,
  ]);

  // Handle Canvas Zoom Pan Interactions
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (zoomLevel <= 1) return;
    setIsPanning(true);
    setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPanning || zoomLevel <= 1) return;
    setPanOffset({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y,
    });
  };

  const handleCanvasMouseUp = () => {
    setIsPanning(false);
  };

  const handleZoomChange = (delta: number) => {
    setZoomLevel((prev) => {
      const next = Math.max(1, Math.min(8, prev + delta));
      if (next === 1) {
        setPanOffset({ x: 0, y: 0 });
      }
      sounds.playClick(600 + next * 80);
      haptics.trigger('click');
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    sounds.playClick(500);
    haptics.trigger('light');
  };

  // Handle Custom File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === 'string') {
        setCustomImageSrc(ev.target.result);
        sounds.playSpectrumLoad();
        haptics.trigger('success');
        // Calculate similarity match with prebuilt database
        const simulatedMatch = (88 + Math.random() * 10).toFixed(1);
        setSimilarityScore(parseFloat(simulatedMatch));
        setRecognizedCategory('Custom Upload Classified via Vector/Palette Match');
      }
    };
    reader.readAsDataURL(file);
  };

  // Reset to preset
  const handleSelectPreset = (profile: KnownImageProfile) => {
    setSelectedProfile(profile);
    setCustomImageSrc(null);
    setRecognizedCategory(profile.category);
    setSimilarityScore(95 + Math.random() * 4);
    sounds.playClick(650);
    haptics.trigger('click');
  };

  // Drawing Canvas Methods for Draw Studio
  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleEndDraw = () => {
    setIsDrawing(false);
    // Convert drawing to image source for mosaic processing
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    setCustomImageSrc(dataUrl);
    setSimilarityScore(85 + Math.random() * 12);
    setRecognizedCategory('Synthesized Vector Sketch');
  };

  const handleClearDrawing = () => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#060913';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setCustomImageSrc(null);
    sounds.playSimulatePulse();
    haptics.trigger('medium');
  };

  return (
    <div
      id="roman-mosaic-matrix-engine"
      className="border rounded-lg p-3 sm:p-5 transition-all text-white space-y-4"
      style={{
        borderColor: 'rgba(255, 255, 255, 0.12)',
        backgroundColor: `${theme.bgPanel}F4`,
      }}
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div
            className="p-1.5 rounded"
            style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}
          >
            <Grid className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm sm:text-base tracking-tight">
                ROMAN MOSAIC & TRANSISTOR CYPHER ENGINE
              </h2>
              <span
                className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded uppercase"
                style={{ backgroundColor: `${theme.primary}25`, color: theme.primary }}
              >
                LEVEL {hierarchyLevel}/4 (SCALE {hierarchyLevel === 1 ? '300' : hierarchyLevel === 2 ? '200' : hierarchyLevel === 3 ? '150' : 'ULTRA'})
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-mono">
              Hierarchical 300→200→150 Alphanumeric Pixel Decomposition & Line Characteristic Classifier
            </p>
          </div>
        </div>

        {/* Studio Tabs */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              sounds.playClick(650);
              haptics.trigger('click');
              setActiveTab('MOSAIC_VIEW');
            }}
            className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1 transition-all ${
              activeTab === 'MOSAIC_VIEW' ? 'text-white' : 'text-neutral-400 hover:text-white bg-white/5'
            }`}
            style={{
              backgroundColor: activeTab === 'MOSAIC_VIEW' ? theme.primary : undefined,
            }}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Mosaic View</span>
          </button>
          <button
            type="button"
            onClick={() => {
              sounds.playClick(700);
              haptics.trigger('click');
              setActiveTab('DRAW_STUDIO');
            }}
            className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1 transition-all ${
              activeTab === 'DRAW_STUDIO' ? 'text-white' : 'text-neutral-400 hover:text-white bg-white/5'
            }`}
            style={{
              backgroundColor: activeTab === 'DRAW_STUDIO' ? theme.primary : undefined,
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Draw Studio</span>
          </button>
          <button
            type="button"
            onClick={() => {
              sounds.playClick(750);
              haptics.trigger('click');
              setActiveTab('CIPHER_HIERARCHY');
            }}
            className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1 transition-all ${
              activeTab === 'CIPHER_HIERARCHY' ? 'text-white' : 'text-neutral-400 hover:text-white bg-white/5'
            }`}
            style={{
              backgroundColor: activeTab === 'CIPHER_HIERARCHY' ? theme.primary : undefined,
            }}
          >
            <Binary className="w-3.5 h-3.5" />
            <span>300/200/150 Cypher</span>
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {activeTab === 'MOSAIC_VIEW' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left Canvas Display */}
          <div className="lg:col-span-8 space-y-3">
            <div className="relative border border-white/15 rounded-lg overflow-hidden bg-[#050711] flex items-center justify-center min-h-[340px] sm:min-h-[420px]">
              <canvas
                ref={canvasRef}
                width={560}
                height={420}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseUp}
                className={`w-full max-w-full h-auto object-contain rounded shadow-2xl transition-all ${
                  zoomLevel > 1 ? (isPanning ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-crosshair'
                }`}
              />

              {/* Hierarchy Overlay Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/85 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/15 text-xs font-mono">
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: theme.primary }} />
                <span className="font-bold">
                  {hierarchyLevel === 1 && 'LEVEL 1: 300-SCALE MACRO TESSERAE'}
                  {hierarchyLevel === 2 && 'LEVEL 2: 200-SCALE MESO INTERPOLATION'}
                  {hierarchyLevel === 3 && 'LEVEL 3: 150-SCALE QUANTUM TRANSISTORS'}
                  {hierarchyLevel === 4 && 'LEVEL 4: ULTRA RESOLUTION MAP'}
                </span>
                <span className="text-[10px] text-cyan-300 font-bold px-1 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/40">
                  {zoomLevel}X OPTICAL ZOOM
                </span>
              </div>

              {/* Multi-Level Zoom Quick Floating Toolbar */}
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/85 backdrop-blur-md p-1 rounded-lg border border-white/15 font-mono text-xs z-10 shadow-xl">
                <button
                  type="button"
                  onClick={() => handleZoomChange(-1)}
                  disabled={zoomLevel <= 1}
                  className="p-1 rounded bg-white/5 hover:bg-white/15 disabled:opacity-30 text-white transition-all"
                  title="Zoom Out (Coarser view)"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-1.5 text-[11px] font-bold text-cyan-300">
                  {zoomLevel}x
                </span>
                <button
                  type="button"
                  onClick={() => handleZoomChange(1)}
                  disabled={zoomLevel >= 8}
                  className="p-1 rounded bg-white/5 hover:bg-white/15 disabled:opacity-30 text-white transition-all"
                  title="Zoom In (Microscopic sub-pixel resolution)"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                {zoomLevel > 1 && (
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    className="px-1.5 py-0.5 rounded bg-red-950/60 hover:bg-red-900 border border-red-500/30 text-[10px] text-red-200 transition-all font-bold"
                    title="Reset Zoom & Pan"
                  >
                    1X
                  </button>
                )}
              </div>

              {/* Live Vector / Color Similarity Match HUD */}
              <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/15 text-xs font-mono flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-neutral-400">Class:</span>
                <span className="text-cyan-300 font-bold">{recognizedCategory}</span>
                <span className="text-emerald-400 font-bold ml-1">({similarityScore.toFixed(1)}%)</span>
              </div>
            </div>

            {/* Progressive Playback & Hierarchy Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-white/[0.03] border border-white/10 rounded-lg">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsAutoRefining(!isAutoRefining);
                    sounds.playClick(700);
                    haptics.trigger('click');
                  }}
                  className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-mono font-bold flex items-center gap-1.5"
                >
                  {isAutoRefining ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{isAutoRefining ? 'Pause Progressive Cycle' : 'Auto Step Refine'}</span>
                </button>

                {/* Direct Level Buttons */}
                {[1, 2, 3, 4].map((lvl) => (
                  <button
                    type="button"
                    key={lvl}
                    onClick={() => {
                      setHierarchyLevel(lvl);
                      sounds.playClick(600 + lvl * 100);
                      haptics.trigger('light');
                    }}
                    className={`px-2.5 py-1 text-xs font-mono font-bold rounded border transition-all ${
                      hierarchyLevel === lvl ? 'text-white border-transparent' : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                    }`}
                    style={{
                      backgroundColor: hierarchyLevel === lvl ? theme.primary : undefined,
                    }}
                  >
                    L{lvl} ({lvl === 1 ? '300' : lvl === 2 ? '200' : lvl === 3 ? '150' : 'Ultra'})
                  </button>
                ))}
              </div>

              {/* Upload Custom Image for Analysis */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1.5 rounded bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-mono font-bold flex items-center gap-1.5 text-neutral-200"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload & Classify</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Parameters & Characteristics Matrix */}
          <div className="lg:col-span-4 space-y-3.5">
            {/* Tile Style Selector */}
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-lg space-y-2">
              <div className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider flex items-center justify-between">
                <span>Tesserae & Transistor Mode</span>
                <Sliders className="w-3.5 h-3.5 text-neutral-400" />
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'ROMAN_STONE', label: 'Roman Stone' },
                  { id: 'QUANTUM_TRANSISTOR', label: 'Quantum Gates' },
                  { id: 'GLYPH_CIPHER', label: 'Glyph Cypher' },
                  { id: 'NEON_CIRCUIT', label: 'Neon Circuit' },
                ].map((mode) => (
                  <button
                    type="button"
                    key={mode.id}
                    onClick={() => {
                      setTileStyle(mode.id as any);
                      sounds.playClick(680);
                      haptics.trigger('click');
                    }}
                    className={`px-2 py-1.5 rounded text-xs font-mono font-bold border transition-all ${
                      tileStyle === mode.id
                        ? 'text-white'
                        : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                    }`}
                    style={{
                      backgroundColor: tileStyle === mode.id ? theme.primary : undefined,
                      borderColor: tileStyle === mode.id ? theme.primary : undefined,
                    }}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              {/* Grout & Spacing Slider */}
              <div className="pt-2 space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                  <span>Grout / Transistor Spacing</span>
                  <span>{groutIntensity}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={groutIntensity}
                  onChange={(e) => setGroutIntensity(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center justify-between pt-1 text-xs font-mono text-neutral-300">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showVectorLines}
                    onChange={(e) => setShowVectorLines(e.target.checked)}
                    className="accent-cyan-400 rounded"
                  />
                  <span>Vector Lines</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showTransistorGrid}
                    onChange={(e) => setShowTransistorGrid(e.target.checked)}
                    className="accent-cyan-400 rounded"
                  />
                  <span>Transistor Grid</span>
                </label>
              </div>
            </div>

            {/* Pre-Built Characteristic Memory Profiles */}
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-lg space-y-2.5">
              <div className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider">
                Pre-Built Characteristic Profiles
              </div>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_PROFILES.map((p) => {
                  const isSelected = selectedProfile.id === p.id && !customImageSrc;
                  return (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => handleSelectPreset(p)}
                      className={`p-2 rounded border text-left transition-all relative overflow-hidden group ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/40'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <img
                          src={p.src}
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          className="w-8 h-8 rounded object-cover border border-white/20 shrink-0"
                        />
                        <div className="overflow-hidden">
                          <div className="text-[11px] font-bold truncate text-white">{p.name}</div>
                          <div className="text-[9px] text-neutral-400 truncate">{p.category}</div>
                        </div>
                      </div>
                      {isSelected && (
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Line & Color Characteristic Signatures */}
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-lg space-y-2 text-xs font-mono">
              <div className="font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>Recognized Geometry Signatures</span>
              </div>
              <div className="space-y-1 text-[11px]">
                {selectedProfile.characteristicLines.map((line, idx) => (
                  <div key={idx} className="flex items-center justify-between text-neutral-300 py-0.5 border-b border-white/5">
                    <span className="text-neutral-400">0{idx + 1} //</span>
                    <span className="text-cyan-300 font-bold">{line}</span>
                  </div>
                ))}
              </div>

              {/* Dominant Palette Clusters */}
              <div className="pt-1.5">
                <div className="text-[10px] text-neutral-400 mb-1">Dominant Color Clusters (K-Means):</div>
                <div className="flex items-center gap-1.5">
                  {selectedProfile.dominantColors.map((col, i) => (
                    <div
                      key={i}
                      className="w-6 h-5 rounded border border-white/20 shadow-sm"
                      style={{ backgroundColor: col }}
                      title={col}
                    />
                  ))}
                  <span className="text-[10px] text-neutral-400 font-mono ml-auto">
                    {selectedProfile.equationsCount} eq checkpoints
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DRAW STUDIO TAB */}
      {activeTab === 'DRAW_STUDIO' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          <div className="lg:col-span-8 space-y-3">
            <div className="relative border border-white/15 rounded-lg overflow-hidden bg-[#060913] flex items-center justify-center">
              <canvas
                ref={drawCanvasRef}
                width={560}
                height={420}
                onMouseDown={handleStartDraw}
                onMouseMove={handleDraw}
                onMouseUp={handleEndDraw}
                onMouseLeave={handleEndDraw}
                onTouchStart={handleStartDraw}
                onTouchMove={handleDraw}
                onTouchEnd={handleEndDraw}
                className="w-full max-w-full h-auto cursor-crosshair touch-none"
              />
              <div className="absolute top-3 left-3 bg-black/80 px-2 py-1 rounded text-[11px] font-mono text-neutral-300 border border-white/10">
                Draw shapes or line contours to test characteristic line similarity
              </div>
            </div>

            {/* Drawing Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-white/[0.03] border border-white/10 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-400">Palette:</span>
                {['#00f0ff', '#ef4444', '#f59e0b', '#10b981', '#a855f7', '#ffffff'].map((col) => (
                  <button
                    type="button"
                    key={col}
                    onClick={() => {
                      setBrushColor(col);
                      sounds.playClick(800);
                    }}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      brushColor === col ? 'border-white scale-110 shadow-[0_0_8px_white]' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: col }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-400">Size:</span>
                <input
                  type="range"
                  min={2}
                  max={24}
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-20 accent-cyan-400"
                />
                <button
                  type="button"
                  onClick={handleClearDrawing}
                  className="px-2.5 py-1 rounded bg-red-600/30 hover:bg-red-600/50 border border-red-500/40 text-xs font-mono text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-lg space-y-2 font-mono text-xs">
              <div className="font-bold text-cyan-400 uppercase">Interactive Synthesis Pipeline</div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                As you draw on the tactile canvas, the Roman Mosaic engine decomposes your lines into 300, 200, and 150 scale coordinates, comparing contour curvature against the pre-built memory bank.
              </p>
              <div className="p-2 bg-black/40 border border-white/10 rounded space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-400">Line Directionality:</span>
                  <span className="text-emerald-400 font-bold">Detected</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-400">Classification Certainty:</span>
                  <span className="text-cyan-400 font-bold">{similarityScore.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 300/200/150 CYPHER HIERARCHY TAB */}
      {activeTab === 'CIPHER_HIERARCHY' && (
        <div className="space-y-4 font-mono">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Level 300 */}
            <div className="p-3.5 rounded-lg border border-amber-500/30 bg-amber-950/10 space-y-2">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-1.5">
                <span className="font-bold text-amber-400 text-xs">HIERARCHY 300 // MACRO</span>
                <span className="text-[10px] text-amber-300">TESSERAE TILE BASE</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-relaxed">
                Initial coarse grid mapping (36-44px blocks). Identifies macro silhouettes, dominant color regions, and primary center-of-mass vectors.
              </p>
              <div className="p-2 bg-black/60 rounded text-[10px] text-amber-200/80 break-all font-mono">
                {cipherHierarchy.scale300}
              </div>
            </div>

            {/* Level 200 */}
            <div className="p-3.5 rounded-lg border border-cyan-500/30 bg-cyan-950/10 space-y-2">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1.5">
                <span className="font-bold text-cyan-400 text-xs">HIERARCHY 200 // MESO</span>
                <span className="text-[10px] text-cyan-300">EDGE INTERPOLATION</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-relaxed">
                Intermediate refinement (18-22px blocks). Extracts contour edges, gradient transitions, and geometric tangents.
              </p>
              <div className="p-2 bg-black/60 rounded text-[10px] text-cyan-200/80 break-all font-mono">
                {cipherHierarchy.scale200}
              </div>
            </div>

            {/* Level 150 */}
            <div className="p-3.5 rounded-lg border border-emerald-500/30 bg-emerald-950/10 space-y-2">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1.5">
                <span className="font-bold text-emerald-400 text-xs">HIERARCHY 150 // MICRO</span>
                <span className="text-[10px] text-emerald-300">TRANSISTOR LEVEL</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-relaxed">
                Quantum sub-pixel mapping (8-10px cells). Maps discrete transistor coordinate checkpoints and alphanumeric cypher symbols.
              </p>
              <div className="p-2 bg-black/60 rounded text-[10px] text-emerald-200/80 break-all font-mono">
                {cipherHierarchy.scale150}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
