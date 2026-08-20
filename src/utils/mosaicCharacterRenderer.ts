import * as THREE from 'three';

export type MosaicCharacterType =
  | 'HERO_MECH_FRONT'
  | 'HERO_MECH_BACK'
  | 'GOLIATH_TITAN'
  | 'CYBER_DRONE'
  | 'SENTINEL_DROID'
  | 'STARFIGHTER_INTERCEPTOR';

export interface MosaicTextureOptions {
  width?: number;
  height?: number;
  tileStyle?: 'ROMAN_STONE' | 'QUANTUM_TRANSISTOR' | 'GLYPH_CIPHER' | 'NEON_CIRCUIT';
  primaryGlow?: string;
  secondaryGlow?: string;
  groutIntensity?: number;
  tileSize?: number;
}

/**
 * Procedural Vector Drawing for Cyber / Roman Character Silhouettes
 */
function drawCharacterVectorToCanvas(
  ctx: CanvasRenderingContext2D,
  type: MosaicCharacterType,
  w: number,
  h: number
) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2;
  const cy = h / 2;

  if (type === 'HERO_MECH_FRONT' || type === 'HERO_MECH_BACK') {
    const isBack = type === 'HERO_MECH_BACK';

    // Outer Shoulder Pauldrons
    ctx.fillStyle = '#1e3a5f';
    ctx.beginPath();
    ctx.moveTo(cx - 160, cy - 80);
    ctx.lineTo(cx - 80, cy - 140);
    ctx.lineTo(cx - 50, cy - 70);
    ctx.lineTo(cx - 130, cy - 20);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx + 160, cy - 80);
    ctx.lineTo(cx + 80, cy - 140);
    ctx.lineTo(cx + 50, cy - 70);
    ctx.lineTo(cx + 130, cy - 20);
    ctx.closePath();
    ctx.fill();

    // Heavy Torso Chassis
    ctx.fillStyle = '#0f2238';
    ctx.beginPath();
    ctx.moveTo(cx - 80, cy - 120);
    ctx.lineTo(cx + 80, cy - 120);
    ctx.lineTo(cx + 95, cy + 40);
    ctx.lineTo(cx + 55, cy + 100);
    ctx.lineTo(cx - 55, cy + 100);
    ctx.lineTo(cx - 95, cy + 40);
    ctx.closePath();
    ctx.fill();

    // Chest Plating / Reactor Core
    ctx.fillStyle = '#00f0ff';
    if (!isBack) {
      // Front: Hexagonal Plasma Core & Visor
      ctx.beginPath();
      ctx.arc(cx, cy - 20, 36, 0, Math.PI * 2);
      ctx.fill();

      // Cyber Visor
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 35, cy - 95, 70, 14);
    } else {
      // Back: Dual Reactor Core Vents & Plasma Thrusters
      ctx.fillStyle = '#00f0ff';
      ctx.fillRect(cx - 50, cy - 50, 32, 65);
      ctx.fillRect(cx + 18, cy - 50, 32, 65);

      // Supercharger exhaust nozzles
      ctx.fillStyle = '#ffaa00';
      ctx.beginPath();
      ctx.arc(cx - 34, cy + 25, 14, 0, Math.PI * 2);
      ctx.arc(cx + 34, cy + 25, 14, 0, Math.PI * 2);
      ctx.fill();
    }

    // Heavy Bipedal Legs
    ctx.fillStyle = '#0b1626';
    ctx.fillRect(cx - 75, cy + 100, 48, 120);
    ctx.fillRect(cx + 27, cy + 100, 48, 120);

    // Hydraulic Knee & Foot Clamps
    ctx.fillStyle = '#00a3cc';
    ctx.fillRect(cx - 82, cy + 205, 62, 22);
    ctx.fillRect(cx + 20, cy + 205, 62, 22);

    // Shoulder Cannon Weapon Pod
    ctx.fillStyle = '#223344';
    ctx.fillRect(cx + 85, cy - 145, 26, 90);
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(cx + 90, cy - 155, 16, 20);

  } else if (type === 'GOLIATH_TITAN') {
    // Heavy Crimson Rogue Goliath Titan Mech
    ctx.fillStyle = '#4a0815';
    // Colossal Armor Plates
    ctx.beginPath();
    ctx.moveTo(cx - 200, cy - 120);
    ctx.lineTo(cx - 100, cy - 190);
    ctx.lineTo(cx + 100, cy - 190);
    ctx.lineTo(cx + 200, cy - 120);
    ctx.lineTo(cx + 130, cy + 60);
    ctx.lineTo(cx - 130, cy + 60);
    ctx.closePath();
    ctx.fill();

    // Crimson Eye Visor & Aggressive Horns
    ctx.fillStyle = '#ff0033';
    ctx.beginPath();
    ctx.moveTo(cx - 60, cy - 110);
    ctx.lineTo(cx + 60, cy - 110);
    ctx.lineTo(cx, cy - 70);
    ctx.closePath();
    ctx.fill();

    // Central Dark Matter Energy Core
    ctx.fillStyle = '#ff3366';
    ctx.beginPath();
    ctx.arc(cx, cy - 10, 45, 0, Math.PI * 2);
    ctx.fill();

    // Massive Quad-Piston Legs
    ctx.fillStyle = '#26040b';
    ctx.fillRect(cx - 120, cy + 60, 70, 150);
    ctx.fillRect(cx + 50, cy + 60, 70, 150);

    ctx.fillStyle = '#ff0055';
    ctx.fillRect(cx - 135, cy + 190, 100, 30);
    ctx.fillRect(cx + 35, cy + 190, 100, 30);

    // Heavy Missile Battery Pods
    ctx.fillStyle = '#800c22';
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        ctx.fillRect(cx - 180 + c * 16, cy - 160 + r * 16, 10, 10);
        ctx.fillRect(cx + 140 + c * 16, cy - 160 + r * 16, 10, 10);
      }
    }

  } else if (type === 'CYBER_DRONE') {
    // Sleek Tri-Rotor Recon Drone
    ctx.fillStyle = '#0a2233';
    ctx.beginPath();
    ctx.arc(cx, cy, 55, 0, Math.PI * 2);
    ctx.fill();

    // Tri-Wing Stabilizers
    for (let i = 0; i < 3; i++) {
      const angle = (i * Math.PI * 2) / 3 - Math.PI / 2;
      const wx = cx + Math.cos(angle) * 120;
      const wy = cy + Math.sin(angle) * 120;

      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(wx, wy);
      ctx.stroke();

      // Rotor Pod
      ctx.fillStyle = '#00ffff';
      ctx.beginPath();
      ctx.arc(wx, wy, 26, 0, Math.PI * 2);
      ctx.fill();
    }

    // Central Cyan Optics Lens
    ctx.fillStyle = '#00ffff';
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx - 6, cy - 6, 8, 0, Math.PI * 2);
    ctx.fill();

  } else if (type === 'SENTINEL_DROID') {
    // Floating Hexagonal Combat Sentinel
    ctx.fillStyle = '#261233';
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      const hx = cx + Math.cos(a) * 90;
      const hy = cy + Math.sin(a) * 90;
      if (i === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();
    ctx.fill();

    // Internal Purple Emissive Shield Generator
    ctx.fillStyle = '#d946ef';
    ctx.beginPath();
    ctx.arc(cx, cy, 40, 0, Math.PI * 2);
    ctx.fill();

    // Laser Optics Bar
    ctx.fillStyle = '#ff0055';
    ctx.fillRect(cx - 45, cy - 8, 90, 16);

  } else if (type === 'STARFIGHTER_INTERCEPTOR') {
    // Aerodynamic Cyber Space Interceptor
    ctx.fillStyle = '#0f243a';
    ctx.beginPath();
    ctx.moveTo(cx, cy - 180); // Nose cone
    ctx.lineTo(cx + 40, cy - 40);
    ctx.lineTo(cx + 170, cy + 80); // Right Wingtip
    ctx.lineTo(cx + 120, cy + 120);
    ctx.lineTo(cx + 40, cy + 90);
    ctx.lineTo(cx, cy + 130); // Tail
    ctx.lineTo(cx - 40, cy + 90);
    ctx.lineTo(cx - 120, cy + 120);
    ctx.lineTo(cx - 170, cy + 80); // Left Wingtip
    ctx.lineTo(cx - 40, cy - 40);
    ctx.closePath();
    ctx.fill();

    // Twin Wingtip Ion Blasters
    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(cx - 175, cy + 20, 12, 70);
    ctx.fillRect(cx + 163, cy + 20, 12, 70);

    // Glowing Canopy Visor
    ctx.fillStyle = '#00ffff';
    ctx.beginPath();
    ctx.moveTo(cx, cy - 110);
    ctx.lineTo(cx + 22, cy - 20);
    ctx.lineTo(cx - 22, cy - 20);
    ctx.closePath();
    ctx.fill();

    // Twin Ion Plasma Afterburners
    ctx.fillStyle = '#ffaa00';
    ctx.beginPath();
    ctx.arc(cx - 28, cy + 105, 14, 0, Math.PI * 2);
    ctx.arc(cx + 28, cy + 105, 14, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * Transforms an image buffer into authentic Level 4 Roman Mosaic / Quantum Transistor Matrix
 */
export function createLevel4MosaicTexture(
  type: MosaicCharacterType,
  options: MosaicTextureOptions = {}
): THREE.CanvasTexture {
  const w = options.width || 512;
  const h = options.height || 512;
  const tileSize = options.tileSize || 3; // Level 4 fine micro-tesserae
  const tileStyle = options.tileStyle || 'ROMAN_STONE';
  const groutIntensity = options.groutIntensity ?? 65;

  // Step 1: Render high-fidelity vector source to offscreen canvas
  const srcCanvas = document.createElement('canvas');
  srcCanvas.width = w;
  srcCanvas.height = h;
  const srcCtx = srcCanvas.getContext('2d')!;
  drawCharacterVectorToCanvas(srcCtx, type, w, h);
  const srcData = srcCtx.getImageData(0, 0, w, h).data;

  // Step 2: Render Level 4 Roman Mosaic Tesserae to Output Canvas
  const outCanvas = document.createElement('canvas');
  outCanvas.width = w;
  outCanvas.height = h;
  const outCtx = outCanvas.getContext('2d')!;
  outCtx.clearRect(0, 0, w, h);

  const cols = Math.ceil(w / tileSize);
  const rows = Math.ceil(h / tileSize);
  const grout = (groutIntensity / 100) * 0.8;
  const drawW = Math.max(1, tileSize - grout);
  const drawH = Math.max(1, tileSize - grout);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * tileSize;
      const y = r * tileSize;

      const sampleX = Math.min(w - 1, Math.floor(x + tileSize / 2));
      const sampleY = Math.min(h - 1, Math.floor(y + tileSize / 2));
      const idx = (sampleY * w + sampleX) * 4;

      const alpha = srcData[idx + 3];
      if (alpha < 20) continue; // Transparent pixel cutout

      const red = srcData[idx];
      const green = srcData[idx + 1];
      const blue = srcData[idx + 2];
      const brightness = (red + green + blue) / 3;

      // Color Palette Quantization & Micro stone variation
      const noise = ((c * 17 + r * 37) % 19) - 9;
      const finalR = Math.max(0, Math.min(255, red + noise));
      const finalG = Math.max(0, Math.min(255, green + noise));
      const finalB = Math.max(0, Math.min(255, blue + noise));

      outCtx.fillStyle = `rgba(${finalR}, ${finalG}, ${finalB}, ${alpha / 255})`;

      if (tileStyle === 'ROMAN_STONE') {
        // Rounded Micro Tesserae Stone Block
        outCtx.fillRect(x, y, drawW, drawH);

        // Sub-pixel Chamfer Highlight
        if (brightness > 90) {
          outCtx.fillStyle = `rgba(255, 255, 255, ${0.22 * (brightness / 255)})`;
          outCtx.fillRect(x, y, drawW, 1);
          outCtx.fillRect(x, y, 1, drawH);
        }
      } else if (tileStyle === 'QUANTUM_TRANSISTOR') {
        // Quantum Transistor Gate Matrix with Micro-dot contact
        outCtx.fillRect(x, y, drawW, drawH);
        if (brightness > 120) {
          outCtx.fillStyle = options.primaryGlow || '#00f0ff';
          outCtx.fillRect(x + drawW / 2 - 0.5, y + drawH / 2 - 0.5, 1, 1);
        }
      } else {
        // NEON CIRCUIT
        outCtx.fillRect(x, y, drawW, drawH);
      }
    }
  }

  // Create High-Fidelity Three.js Canvas Texture
  const texture = new THREE.CanvasTexture(outCanvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  return texture;
}

/**
 * Creates a Pristine Level-4 Mosaic Character 3D Mesh without clunky box underlays
 */
export function createPristineMosaicCharacter(
  type: 'HERO_MECH' | 'GOLIATH' | 'CYBER_DRONE',
  materials: {
    heroFrontTexture: THREE.CanvasTexture;
    heroBackTexture: THREE.CanvasTexture;
    goliathTexture: THREE.CanvasTexture;
    droneTexture: THREE.CanvasTexture;
  }
): THREE.Group {
  const root = new THREE.Group();

  if (type === 'HERO_MECH') {
    const torsoGroup = new THREE.Group();
    const legsGroup = new THREE.Group();

    // Dual-Sided High-Resolution Level 4 Roman Mosaic Billboard Core
    const planeGeo = new THREE.PlaneGeometry(2.8, 3.2);

    // Front Mosaic Plaque
    const frontMat = new THREE.MeshStandardMaterial({
      map: materials.heroFrontTexture,
      transparent: true,
      alphaTest: 0.1,
      roughness: 0.35,
      metalness: 0.8,
      side: THREE.FrontSide,
    });
    const frontMesh = new THREE.Mesh(planeGeo, frontMat);
    frontMesh.position.set(0, 1.6, 0.02);
    torsoGroup.add(frontMesh);

    // Rear Mosaic Plaque with Thruster Ports
    const backMat = new THREE.MeshStandardMaterial({
      map: materials.heroBackTexture,
      transparent: true,
      alphaTest: 0.1,
      roughness: 0.35,
      metalness: 0.8,
      side: THREE.BackSide,
    });
    const backMesh = new THREE.Mesh(planeGeo, backMat);
    backMesh.position.set(0, 1.6, -0.02);
    torsoGroup.add(backMesh);

    // 3D Level-4 Mosaic Glowing Reactor Core
    const coreMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff })
    );
    coreMesh.position.set(0, 1.5, 0.05);
    torsoGroup.add(coreMesh);

    // Twin Level-4 Plasma Thruster Nozzles
    const leftThruster = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.12, 0.35, 8),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff })
    );
    leftThruster.rotation.x = Math.PI / 2;
    leftThruster.position.set(-0.32, 1.6, -0.15);
    torsoGroup.add(leftThruster);

    const rightThruster = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.12, 0.35, 8),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff })
    );
    rightThruster.rotation.x = Math.PI / 2;
    rightThruster.position.set(0.32, 1.6, -0.15);
    torsoGroup.add(rightThruster);

    // Shoulder Laser Cannon
    const cannon = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.9, 8),
      new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.9, emissive: 0x003355 })
    );
    cannon.rotation.x = Math.PI / 2;
    cannon.position.set(0.55, 1.75, 0.2);
    torsoGroup.add(cannon);

    // Laser Sight Guide
    const laserSight = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.012, 22, 4),
      new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.4 })
    );
    laserSight.rotation.x = Math.PI / 2;
    laserSight.position.set(0.55, 1.75, -11);
    torsoGroup.add(laserSight);

    // Ground Shadow Projector
    const shadowDisk = new THREE.Mesh(
      new THREE.CircleGeometry(1.1, 16),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.55 })
    );
    shadowDisk.rotation.x = -Math.PI / 2;
    shadowDisk.position.y = 0.02;
    root.add(shadowDisk);

    root.add(torsoGroup);
    root.add(legsGroup);
    return root;
  }

  if (type === 'GOLIATH') {
    // Pure Level 4 Roman Mosaic Goliath Boss Mech - Clean Cutout, No Box Collision Overlay Underneath
    const goliathMat = new THREE.MeshStandardMaterial({
      map: materials.goliathTexture,
      transparent: true,
      alphaTest: 0.1,
      roughness: 0.25,
      metalness: 0.85,
      side: THREE.DoubleSide,
    });
    const goliathMesh = new THREE.Mesh(new THREE.PlaneGeometry(5.4, 5.4), goliathMat);
    goliathMesh.position.y = 2.4;
    root.add(goliathMesh);

    // Central Pulsing Red Core
    const redCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xff0044 })
    );
    redCore.position.set(0, 2.3, 0.05);
    root.add(redCore);

    // Shadow
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(1.8, 16),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.6 })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.02;
    root.add(shadow);

    return root;
  }

  // CYBER_DRONE
  const droneMat = new THREE.MeshStandardMaterial({
    map: materials.droneTexture,
    transparent: true,
    alphaTest: 0.1,
    roughness: 0.2,
    metalness: 0.9,
    side: THREE.DoubleSide,
  });
  const droneMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 3.0), droneMat);
  droneMesh.position.y = 1.3;
  root.add(droneMesh);

  const droneCore = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0x00f0ff })
  );
  droneCore.position.set(0, 1.3, 0.02);
  root.add(droneCore);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.8, 12),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.45 })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.02;
  root.add(shadow);

  return root;
}
