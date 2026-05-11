import React from 'react';
import '../../styles/sao-animations.css';

const GlassPanel = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div 
      className={`
        bg-sao-glass backdrop-blur-md rounded-lg p-6
        ${hoverEffect ? 'sao-glass-panel' : 'border border-sao-border shadow-lg shadow-zekken-obsidian/50'}
        text-zekken-skin font-body
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassPanel;