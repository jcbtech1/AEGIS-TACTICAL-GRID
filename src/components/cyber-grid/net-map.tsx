
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const nodes = [
  { id: 1, x: 200, y: 150, type: 'hub' },
  { id: 2, x: 500, y: 100, type: 'node' },
  { id: 3, x: 650, y: 250, type: 'node' },
  { id: 4, x: 350, y: 300, type: 'hub' },
  { id: 5, x: 100, y: 250, type: 'node' },
  { id: 6, x: 450, y: 220, type: 'core' },
];

const connections = [
  { from: 1, to: 6 },
  { from: 2, to: 6 },
  { from: 3, to: 6 },
  { from: 4, to: 6 },
  { from: 5, to: 6 },
  { from: 1, to: 2 },
  { from: 4, to: 3 },
];

export default function NetMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full relative overflow-hidden bg-black/20">
      <svg viewBox="0 0 800 400" className="w-full h-full">
        {/* Connection Lines */}
        {connections.map((conn, i) => {
          const from = nodes.find(n => n.id === conn.from)!;
          const to = nodes.find(n => n.id === conn.to)!;
          return (
            <g key={`conn-${i}`}>
              <line 
                x1={from.x} y1={from.y} x2={to.x} y2={to.y} 
                stroke="rgba(0, 242, 255, 0.15)" 
                strokeWidth="1" 
              />
              <motion.circle
                r="1.5"
                fill="#00f2ff"
                initial={{ offsetDistance: "0%" }}
                animate={{ 
                  cx: [from.x, to.x],
                  cy: [from.y, to.y]
                }}
                transition={{ 
                  duration: 2 + (i % 3), // Usamos 'i' en lugar de random para evitar hidratación
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={`node-${node.id}`}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.type === 'core' ? 6 : node.type === 'hub' ? 4 : 2}
              fill={node.type === 'core' ? '#00f2ff' : 'transparent'}
              stroke="#00f2ff"
              strokeWidth="1"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.3, 1, 0.3], r: node.type === 'core' ? [6, 8, 6] : undefined }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {node.type === 'hub' && (
              <circle
                cx={node.x}
                cy={node.y}
                r="8"
                fill="none"
                stroke="#00f2ff"
                strokeWidth="0.5"
                strokeDasharray="2,2"
                className="animate-spin"
                style={{ transformOrigin: `${node.x}px ${node.y}px`, animationDuration: '10s' }}
              />
            )}
            <text 
              x={node.x + 10} 
              y={node.y + 15} 
              fill="rgba(0, 242, 255, 0.4)" 
              className="text-[7px] font-mono tracking-tighter pointer-events-none uppercase"
            >
              {node.type}_{node.id.toString().padStart(2, '0')}
            </text>
          </g>
        ))}

        {/* Dynamic Grid Background in SVG */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 242, 255, 0.05)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
