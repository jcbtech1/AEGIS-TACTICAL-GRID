import * as THREE from 'three';

export function createAlphaMap(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = 128;
  canvas.height = 128;

  ctx.clearRect(0, 0, 128, 128);

  let grd = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, "rgba(255, 255, 255, 1)");
  grd.addColorStop(0.2, "rgba(255, 255, 255, 0.8)");
  grd.addColorStop(0.4, "rgba(200, 200, 255, 0.3)");
  grd.addColorStop(1, "rgba(150, 150, 255, 0)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 128, 128);

  grd = ctx.createRadialGradient(64, 64, 0, 64, 64, 32);
  grd.addColorStop(0, "rgba(255, 255, 255, 1)");
  grd.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(64, 64, 32, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

export function generateGalaxyData(count: number, seed: number) {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const colors = new Float32Array(count * 3);

  const seededRandom = (s: number) => {
    let mask = 0xffffffff;
    let m_w = (123456789 + s) & mask;
    let m_z = (987654321 - s) & mask;
    return () => {
      m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
      m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
      let result = ((m_z << 16) + (m_w & 65535)) & mask;
      result /= 4294967296;
      return result + 0.5;
    }
  }

  const random = seededRandom(seed);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = random();
    seeds[i * 3 + 0] = random();
    seeds[i * 3 + 1] = random();
    seeds[i * 3 + 2] = random();

    // Make some stars bigger and brighter
    if (random() > 0.99) {
      sizes[i] = random() * 1.5 + 1.0; // Very large stars (1% chance)
    } else if (random() > 0.9) {
      sizes[i] = random() * 0.8 + 0.7; // Large stars (9% chance)
    } else {
      sizes[i] = random() * 0.4 + 0.3; // Normal stars
    }

    // Add more color variation
    if (random() > 0.8) {
        // 20% of stars will be colored (blueish or reddish)
        const isBlue = random() > 0.5;
        if (isBlue) {
            colors[i * 3 + 0] = 0.6 + random() * 0.2; // R
            colors[i * 3 + 1] = 0.8 + random() * 0.2; // G
            colors[i * 3 + 2] = 1.0;                  // B
        } else {
            colors[i * 3 + 0] = 1.0;                  // R
            colors[i * 3 + 1] = 0.7 + random() * 0.2; // G
            colors[i * 3 + 2] = 0.4 + random() * 0.2; // B
        }
    } else {
        // 80% are whitish/pale yellow
        const tone = 0.8 + random() * 0.2;
        colors[i * 3 + 0] = tone;
        colors[i * 3 + 1] = tone;
        colors[i * 3 + 2] = tone * 0.9;
    }
  }

  return { positions, seeds, sizes, colors };
}


export function generateUniverseData(count: number, seed: number) {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const seededRandom = (s: number) => {
        let mask = 0xffffffff;
        let m_w = (123456789 + s) & mask;
        let m_z = (987654321 - s) & mask;
        return () => {
            m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
            m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
            let result = ((m_z << 16) + (m_w & 65535)) & mask;
            result /= 4294967296;
            return result + 0.5;
        }
    }
    const random = seededRandom(seed);
  
    for (let i = 0; i < count; i++) {
        seeds[i * 3 + 0] = random();
        seeds[i * 3 + 1] = random();
        seeds[i * 3 + 2] = random();
        sizes[i] = random() * 0.4 + 1.0;

        colors[i * 3 + 0] = random() * 0.3 + 0.1;
        colors[i * 3 + 1] = random() * 0.2 + 0.1;
        colors[i * 3 + 2] = random() * 0.5 + 0.3;
    }
  
    return { positions, seeds, sizes, colors };
}
