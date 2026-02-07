"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const nodes = [
  { id: 1, x: 100, y: 100, label: "NY_HUB" },
  { id: 2, x: 300, y: 50, label: "LDN_NODE" },
  { id: 3, x: 450, y: 180, label: "TKY_CORE" },
  { id: 4, x: 200, y: 250, label: "SYD_GATE" },
  { id: 5, x: 50, y: 220, label: "SFP_BRCH" },
  { id: 6, x: 280, y: 150, label: "CENTRAL_IX" },
];

const connections = [
  { from: 1, to: 6 },
  { from: 2, to: 6 },
  { from: 3, to: 6 },
  { from: 4, to: 6 },
  { from: 5, to: 1 },
  { from: 1, to: 2 },
  { from: 3, to: 4 },
];

export default function NetMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full relative overflow-hidden bg-black/20">
      <svg viewBox="0 0 500 300" className="w-full h-full preserve-3d">
        <defs>
          <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 242, 255, 0.03)" strokeWidth="0.5"/>
          </pattern>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00f2ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00f2ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#mapGrid)" />

        {/* LINEAS DE CONEXIÓN */}
        {connections.map((conn, i) => {
          const fromNode = nodes.find(n => n.id === conn.from)!;
          const toNode = nodes.find(n => n.id === conn.to)!;
          return (
            <g key={`conn-${i}`}>
              <line 
                x1={fromNode.x} y1={fromNode.y} 
                x2={toNode.x} y2={toNode.y} 
                stroke="rgba(0, 242, 255, 0.1)" 
                strokeWidth="0.5" 
              />
              <motion.circle
                r="1"
                fill="#00f2ff"
                animate={{ 
                  cx: [fromNode.x, toNode.x],
                  cy: [fromNode.y, toNode.y],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: Math.random() * 2
                }}
              />
            </g>
          );
        })}

        {/* NODOS */}
        {nodes.map((node) => (
          <g key={`node-${node.id}`}>
            <circle cx={node.x} cy={node.y} r="8" fill="url(#nodeGlow)" />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="2"
              fill={node.id === 6 ? "#f43f5e" : "#00f2ff"}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <text 
              x={node.x + 6} 
              y={node.y + 10} 
              fill="rgba(0, 242, 255, 0.3)" 
              className="text-[5px] font-mono tracking-tighter uppercase pointer-events-none"
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* EFECTO DE ESCANEO DE MAPA */}
        <motion.rect
          x="0" y="0" width="500" height="2"
          fill="rgba(0, 242, 255, 0.05)"
          animate={{ y: [0, 300, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}
