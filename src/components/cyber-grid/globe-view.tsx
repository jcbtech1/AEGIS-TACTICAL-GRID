
"use client";

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function GlobeView() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Earth Sphere
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Inner Solid Sphere for occlusion
    const innerGeometry = new THREE.SphereGeometry(0.98, 64, 64);
    const innerMaterial = new THREE.MeshBasicMaterial({ color: 0x000810, transparent: true, opacity: 0.8 });
    const innerGlobe = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerGlobe);

    // Atmosphere Glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.2, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        glowColor: { value: new THREE.Color(0x00ffff) },
        viewVector: { value: camera.position }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = vec3(modelViewMatrix * vec4(position, 1.0));
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
          gl_FragColor = vec4(glowColor, intensity);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.002;
      innerGlobe.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
