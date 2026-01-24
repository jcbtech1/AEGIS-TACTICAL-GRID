const shaderUtils = `
  float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  vec3 scatter (vec3 seed) {
    float u = random(seed.xy);
    float v = random(seed.yz);
    float theta = u * 6.28318530718;
    float phi = acos(2.0 * v - 1.0);

    float sinTheta = sin(theta);
    float cosTheta = cos(theta);
    float sinPhi = sin(phi);
    float cosPhi = cos(phi);

    float x = sinPhi * cosTheta;
    float y = sinPhi * sinTheta;
    float z = cosPhi;

    return vec3(x, y, z);
  }
`;

export const galaxyVertexShader = `
  precision highp float;

  attribute vec3 position;
  attribute float size;
  attribute vec3 seed;
  attribute vec3 color;

  uniform mat4 projectionMatrix;
  uniform mat4 modelViewMatrix;

  uniform float uTime;
  uniform float uSize;
  uniform float uBranches;
  uniform float uRadius;
  uniform float uSpin;
  uniform float uRandomness;
  uniform float uPulse;
  uniform float uTimeScale;

  varying float vDistance;
  varying vec3 vColor;

  #define PI 3.14159265359
  #define PI2 6.28318530718

  ${shaderUtils}

  void main() {
    vec3 p = vec3(position);
    float st = sqrt(p.x);
    float qt = p.x * p.x;
    float mt = mix(st, qt, p.x);

    float angle = qt * uSpin * (2.0 - sqrt(1.0 - qt));
    float branchOffset = (PI2 / uBranches) * floor(seed.x * uBranches);
    p.x = position.x * cos(angle + branchOffset) * uRadius;
    p.z = position.x * sin(angle + branchOffset) * uRadius;

    p += scatter(seed) * random(seed.zx) * uRandomness * mt;
    p.y *= 0.5 + qt * 0.5;

    float pulse = sin(uTime * uTimeScale * 2.0 + position.x * 10.0) * 0.1 * uPulse;
    p *= 1.0 + pulse;

    vec3 temp = p;
    float ac = cos(-uTime * uTimeScale * (2.0 - st) * 0.3);
    float as = sin(-uTime * uTimeScale * (2.0 - st) * 0.3);
    p.x = temp.x * ac - temp.z * as;
    p.z = temp.x * as + temp.z * ac;

    vDistance = mt;
    vColor = color;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = (15.0 * size * uSize * (1.0 + pulse)) / -mvPosition.z;
  }
`;

export const galaxyFragmentShader = `
  precision highp float;

  uniform vec3 uInnColor;
  uniform vec3 uOutColor;
  uniform sampler2D uAlphaMap;
  uniform float uTime;
  uniform float uTimeScale;

  varying float vDistance;
  varying vec3 vColor;

  #define PI 3.14159265359

  void main() {
    vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
    float a = texture2D(uAlphaMap, uv).r;
    if (a < 0.1) discard;

    float flicker = 0.8 + 0.2 * sin(uTime * uTimeScale * 10.0 + gl_PointCoord.x * 100.0);
    a *= flicker;

    vec3 baseColor = mix(uInnColor, uOutColor, vDistance);
    vec3 finalColor = mix(baseColor, vColor, 0.3);

    float glow = 1.0 - vDistance * 0.5;
    finalColor += vec3(0.2, 0.1, 0.3) * glow;

    float flash = sin(uTime * uTimeScale * 0.5 + gl_PointCoord.y * 20.0) * 0.2 + 0.8;
    finalColor *= flash;

    gl_FragColor = vec4(finalColor, a * 0.9);
  }
`;

export const universeVertexShader = `
  precision highp float;

  attribute vec3 seed;
  attribute float size;
  attribute vec3 color;

  uniform mat4 projectionMatrix;
  uniform mat4 modelViewMatrix;

  uniform float uTime;
  uniform float uSize;
  uniform float uRadius;
  uniform float uPulse;
  uniform float uTimeScale;

  #define PI 3.14159265359
  #define PI2 6.28318530718

  ${shaderUtils}

  const float r = 5.0;
  const vec3 s = vec3(2.5, 1.8, 2.5);

  varying vec3 vColor;

  void main() {
    vec3 p = scatter(seed) * r * s;

    float q = random(seed.zx);
    for (int i = 0; i < 3; i++) q *= q;
    p *= q;

    float l = length(p) / (s.x * r);
    p = l < 1.001 ? (p / l) : p;

    float pulse = sin(uTime * uTimeScale * 1.5 + seed.x * 20.0) * 0.15 * uPulse;
    p *= (1.0 + pulse);

    vec3 temp = p;
    float ql = 1.0 - l;
    for (int i = 0; i < 3; i++) ql *= ql;
    float ac = cos(-uTime * uTimeScale * ql * 0.2);
    float as = sin(-uTime * uTimeScale * ql * 0.2);
    p.x = temp.x * ac - temp.z * as;
    p.z = temp.x * as + temp.z * ac;

    vColor = color * (1.0 + pulse * 2.0); 

    vec4 mvPosition = modelViewMatrix * vec4(p * uRadius * 1.5, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    l = (2.0 - l) * (2.0 - l);

    gl_PointSize = (r * size * uSize * l * (1.0 + pulse)) / -mvPosition.z;
  }
`;

export const universeFragmentShader = `
  precision highp float;

  uniform sampler2D uAlphaMap;
  uniform float uTime;
  uniform float uTimeScale;

  varying vec3 vColor;

  #define PI 3.14159265359

  void main() {
    vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
    float a = texture2D(uAlphaMap, uv).r;
    if (a < 0.05) discard;

    float flicker = 0.7 + 0.3 * sin(uTime * uTimeScale * 8.0 + gl_PointCoord.x * 50.0);

    float dist = length(gl_PointCoord - vec2(0.5));
    float glow = 1.0 - dist * 2.0;
    glow = max(0.0, glow);

    vec3 finalColor = vColor * flicker + vec3(0.1, 0.05, 0.2) * glow;

    gl_FragColor = vec4(finalColor, a * 0.7);
  }
`;
`]];</content>
  </change>
  <change>
    <file>src/lib/three-utils.ts</file>
    <description>Create a new file for Three.js utility functions, including creating the particle alpha map texture and generating particle data for the galaxy and universe systems.</description>
    <content><![CDATA[import * as THREE from 'three';

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
    sizes[i] = random() * 0.3 + 0.5;

    if (random() > 0.9) {
      colors[i * 3 + 0] = random() * 0.5 + 0.5;
      colors[i * 3 + 1] = random() * 0.3 + 0.2;
      colors[i * 3 + 2] = random() * 0.5 + 0.5;
    } else {
      colors[i * 3 + 0] = 1.0;
      colors[i * 3 + 1] = 1.0;
      colors[i * 3 + 2] = 1.0;
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