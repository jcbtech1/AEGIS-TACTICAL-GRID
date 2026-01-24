"use client";

import { useRef, useEffect, useLayoutEffect, type Dispatch, type SetStateAction } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import TWEEN from '@tweenjs/tween.js';
import { generateGalaxyData, generateUniverseData, createAlphaMap } from '@/lib/three-utils';
import { galaxyVertexShader, galaxyFragmentShader, universeVertexShader, universeFragmentShader } from '@/lib/shaders';
import type { GalaxyConfig } from '@/lib/types';

type CelestialWeaverCanvasProps = {
  config: GalaxyConfig;
  galaxyData: { seed: number; particles: number };
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export default function CelestialWeaverCanvas({ config, galaxyData, setLoading }: CelestialWeaverCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const galaxyMaterialRef = useRef<THREE.RawShaderMaterial | null>(null);
  const universeMaterialRef = useRef<THREE.RawShaderMaterial | null>(null);
  const galaxyRef = useRef<THREE.Points | null>(null);
  const universeRef = useRef<THREE.Points | null>(null);

  // Update uniforms when config changes
  useLayoutEffect(() => {
    if (galaxyMaterialRef.current && universeMaterialRef.current) {
      const { uInnColor, uOutColor, ...rest } = galaxyMaterialRef.current.uniforms;
      const newUniforms = {
        uBranches: { value: config.branches },
        uRadius: { value: config.radius },
        uSpin: { value: config.spin },
        uRandomness: { value: config.randomness },
        uPulse: { value: config.pulse },
        uTimeScale: { value: config.timeScale },
      };

      for (const [key, uniform] of Object.entries(newUniforms)) {
        if (rest[key]) {
          (rest[key] as THREE.IUniform).value = uniform.value;
        }
      }
      
      uInnColor.value.set(config.innColor);
      uOutColor.value.set(config.outColor);

      universeMaterialRef.current.uniforms.uRadius.value = config.radius;
      universeMaterialRef.current.uniforms.uPulse.value = config.pulse;
      universeMaterialRef.current.uniforms.uTimeScale.value = config.timeScale;
    }
  }, [config]);

  // Regenerate particles when seed or count changes
  useEffect(() => {
    if (galaxyRef.current && universeRef.current) {
        const { particles, seed } = galaxyData;
        const newGalaxyData = generateGalaxyData(particles, seed);
        const galaxyGeometry = galaxyRef.current.geometry as THREE.BufferGeometry;
        galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(newGalaxyData.positions, 3));
        galaxyGeometry.setAttribute('seed', new THREE.BufferAttribute(newGalaxyData.seeds, 3));
        galaxyGeometry.setAttribute('size', new THREE.BufferAttribute(newGalaxyData.sizes, 1));
        galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(newGalaxyData.colors, 3));
        galaxyGeometry.attributes.position.needsUpdate = true;
        galaxyGeometry.attributes.seed.needsUpdate = true;
        galaxyGeometry.attributes.size.needsUpdate = true;
        galaxyGeometry.attributes.color.needsUpdate = true;

        const universeCount = Math.floor(particles / 3);
        const newUniverseData = generateUniverseData(universeCount, seed);
        const universeGeometry = universeRef.current.geometry as THREE.BufferGeometry;
        universeGeometry.setAttribute('seed', new THREE.BufferAttribute(newUniverseData.seeds, 3));
        universeGeometry.setAttribute('size', new THREE.BufferAttribute(newUniverseData.sizes, 1));
        universeGeometry.setAttribute('color', new THREE.BufferAttribute(newUniverseData.colors, 3));
        universeGeometry.attributes.seed.needsUpdate = true;
        universeGeometry.attributes.size.needsUpdate = true;
        universeGeometry.attributes.color.needsUpdate = true;
    }
  }, [galaxyData.seed, galaxyData.particles]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enableDamping = true;
    orbit.dampingFactor = 0.05;
    orbit.autoRotate = false;

    // Particle Texture
    const alphaMap = createAlphaMap();

    // Galaxy
    const galaxyGeometry = new THREE.BufferGeometry();
    const { positions, seeds, sizes, colors } = generateGalaxyData(config.particles, config.seed);
    galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    galaxyGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    galaxyGeometry.setAttribute('seed', new THREE.BufferAttribute(seeds, 3));
    galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const galaxyMaterial = new THREE.RawShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: renderer.getPixelRatio() * 0.5 },
        uBranches: { value: config.branches },
        uRadius: { value: config.radius },
        uSpin: { value: config.spin },
        uRandomness: { value: config.randomness },
        uPulse: { value: config.pulse },
        uTimeScale: { value: config.timeScale },
        uAlphaMap: { value: alphaMap },
        uInnColor: { value: new THREE.Color(config.innColor) },
        uOutColor: { value: new THREE.Color(config.outColor) },
      },
      vertexShader: galaxyVertexShader,
      fragmentShader: galaxyFragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    galaxyMaterialRef.current = galaxyMaterial;

    const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
    scene.add(galaxy);
    galaxyRef.current = galaxy;

    // Universe
    const universeCount = Math.floor(config.particles / 3);
    const universeGeometry = new THREE.BufferGeometry();
    const universeData = generateUniverseData(universeCount, config.seed);
    universeGeometry.setAttribute('seed', new THREE.BufferAttribute(universeData.seeds, 3));
    universeGeometry.setAttribute('size', new THREE.BufferAttribute(universeData.sizes, 1));
    universeGeometry.setAttribute('color', new THREE.BufferAttribute(universeData.colors, 3));

    const universeMaterial = new THREE.RawShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uSize: galaxyMaterial.uniforms.uSize,
            uRadius: galaxyMaterial.uniforms.uRadius,
            uPulse: galaxyMaterial.uniforms.uPulse,
            uTimeScale: galaxyMaterial.uniforms.uTimeScale,
            uAlphaMap: { value: alphaMap },
        },
        vertexShader: universeVertexShader,
        fragmentShader: universeFragmentShader,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });
    universeMaterialRef.current = universeMaterial;

    const universe = new THREE.Points(universeGeometry, universeMaterial);
    scene.add(universe);
    universeRef.current = universe;

    // Initial Animation
    new TWEEN.Tween({ radius: 0, spin: 0, randomness: 0, pulse: 0, rotate: 0, cameraZ: 5 })
      .to({ radius: 3.0, spin: Math.PI * 3, randomness: 0.7, pulse: 0.5, rotate: Math.PI * 6, cameraZ: 10 }, 8000)
      .easing(TWEEN.Easing.Exponential.Out)
      .onUpdate(({ radius, spin, randomness, pulse, rotate, cameraZ }) => {
        galaxyMaterial.uniforms.uRadius.value = radius;
        galaxyMaterial.uniforms.uSpin.value = spin;
        galaxyMaterial.uniforms.uRandomness.value = randomness;
        galaxyMaterial.uniforms.uPulse.value = pulse;
        camera.position.z = cameraZ;
        galaxy.rotation.y = rotate;
        universe.rotation.y = rotate / 2;
      })
      .onComplete(() => {
        orbit.autoRotate = true;
        setLoading(false);
      })
      .start();

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      TWEEN.update();
      orbit.update();

      const elapsedTime = clock.getElapsedTime();
      galaxyMaterial.uniforms.uTime.value = elapsedTime;
      universeMaterial.uniforms.uTime.value = elapsedTime;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      galaxyMaterial.uniforms.uSize.value = renderer.getPixelRatio() * 0.5;
    };
    window.addEventListener('resize', handleResize);

    const handleDblClick = () => orbit.reset();
    mount.addEventListener('dblclick', handleDblClick);


    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeEventListener('dblclick', handleDblClick);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      galaxyGeometry.dispose();
      galaxyMaterial.dispose();
      universeGeometry.dispose();
      universeMaterial.dispose();
      alphaMap.dispose();
      TWEEN.removeAll();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}
