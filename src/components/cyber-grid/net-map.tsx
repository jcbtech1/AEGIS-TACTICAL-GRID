"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const nodes = [
  { id: 1, x: 150, y: 120, type: 'hub' },
  { id: 2, x: 450, y: 80, type: 'node' },
  { id: 3, x: 600, y: 220, type: 'node' },
  { id: 4, x: 300, y: 280, type: 'hub' },
  { id: 5, x: 80, y: 220, type: 'node' },
  { id: 6, x: 400, y: 180, type: 'core' },
];

const connections = [
  { from: 1, to: 6, duration: 2.5 },
  { from: 2, to: 6, duration: 3.1 },
  { from: 3, to: 6, duration: 2.8 },
  { from: 4, to: 6, duration: 3.5 },
  { from: 5, to: 6, duration: 2.2 },
  { from: 1, to: 2, duration: 4.0 },
  { from: 4, to: 3, duration: 3.8 },
];

export default function NetMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full relative overflow-hidden bg-black/10">
      <svg viewBox="0 0 800 400" className="w-full h-full">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 242, 255, 0.03)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {connections.map((conn, i) => {
          const from = nodes.find(n => n.id === conn.from)!;
          const to = nodes.find(n => n.id === conn.to)!;
          return (
            <g key={`conn-${i}`}>
              <line 
                x1={from.x} y1={from.y} x2={to.x} y2={to.y} 
                stroke="rgba(0, 242, 255, 0.1)" 
                strokeWidth="1" 
              />
              <motion.circle
                r="1.2"
                fill="#00f2ff"
                animate={{ 
                  cx: [from.x, to.x],
                  cy: [from.y, to.y]
                }}
                transition={{ 
                  duration: conn.duration,
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
            </g>
          );
        })}

        {nodes.map((node) => (
          <g key={`node-${node.id}`}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.type === 'core' ? 5 : node.type === 'hub' ? 3.5 : 2}
              fill={node.type === 'core' ? '#00f2ff' : 'transparent'}
              stroke="#00f2ff"
              strokeWidth="1"
              strokeOpacity={0.6}
              animate={{ 
                opacity: [0.3, 0.8, 0.3],
                r: node.type === 'core' ? [5, 6.5, 5] : undefined 
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {node.type === 'hub' && (
              <circle
                cx={node.x}
                cy={node.y}
                r="7"
                fill="none"
                stroke="#00f2ff"
                strokeWidth="0.4"
                strokeDasharray="2,2"
                className="animate-spin"
                style={{ transformOrigin: `${node.x}px ${node.y}px`, animationDuration: '12s' }}
              />
            )}
            <text 
              x={node.x + 8} 
              y={node.y + 12} 
              fill="rgba(0, 242, 255, 0.3)" 
              className="text-[6px] font-mono tracking-tighter pointer-events-none uppercase"
            >
              {node.type.substring(0, 3)}_{node.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}