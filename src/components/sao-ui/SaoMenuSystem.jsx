import React, { useState, useCallback } from 'react';
import '../../styles/sao-animations.css';
import GlassPanel from '../common/GlassPanel';
import { FaUserCircle, FaChevronRight, FaProjectDiagram } from 'react-icons/fa';

const SaoMenuSystem = ({ onSectionChange }) => {
  const [activeDepth, setActiveDepth] = useState(0);
  const [selectedNode, setSelectedNode] = useState(null);

  const menuNodes = [
    { id: 'profile', label: 'Player Data', icon: <FaUserCircle className="inline mr-3" /> },
    { id: 'projects', label: 'Services', icon: <FaProjectDiagram className="inline mr-3" /> },
  ];

  const handleNodeInteraction = useCallback((node) => {
    setSelectedNode(node.id);
    setActiveDepth(1);
    
    if(onSectionChange) {
      onSectionChange(node.id);
    }
  }, [onSectionChange]);

  return (
    <div className="sao-menu-viewport flex relative z-40 p-2 md:p-8 w-full md:w-auto overflow-visible">
      <nav className="bg-sao-glass backdrop-blur-md rounded-lg text-zekken-skin font-header border border-sao-border shadow-lg sao-glass-panel w-full md:w-auto">
        <ul className="flex flex-row md:flex-col w-full md:w-72 overflow-x-auto no-scrollbar">
          <li className="hidden md:block px-6 py-4 border-b border-sao-border bg-zekken-hair/50 rounded-t-lg shrink-0">
             <span className="text-sm text-gray-300 font-mono tracking-widest uppercase">System Menu</span>
          </li>
          {menuNodes.map(node => (
            <li 
              key={node.id} 
              onClick={() => handleNodeInteraction(node)}
              className={`
                cursor-pointer transition-colors duration-200 px-3 py-3 md:px-6 md:py-4 
                border-r md:border-r-0 md:border-b border-sao-border last:border-r-0 md:last:border-b-0 text-sm sm:text-base md:text-xl tracking-wide flex justify-center md:justify-between items-center group flex-1 md:flex-none whitespace-nowrap shrink-0
                hover:bg-zekken-tunic
                ${selectedNode === node.id 
                  ? 'bg-zekken-hair border-b-4 md:border-b-0 md:border-l-4 border-b-rosario-base md:border-l-rosario-base' 
                  : 'border-b-4 border-b-transparent md:border-b-0 md:border-l-4 md:border-l-transparent'}
              `}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg md:text-xl md:mr-3 inline-flex items-center justify-center">
                  {/* Assuming node.icon contains an element like <FaUserCircle />, we strip its hardcoded mr-3 if possible, but it's hardcoded in the object. We can just target the wrapper. */}
                  {node.id === 'profile' && <FaUserCircle />}
                  {node.id === 'projects' && <FaProjectDiagram />}
                </span>
                <span className="hidden sm:inline md:inline">{node.label}</span>
              </span>
              <FaChevronRight className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity text-rosario-light text-sm" />
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Decorative floating UI elements mimicking ALO */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-zekken-tunic/20 rounded-full blur-3xl -z-10 animate-pulse hidden md:block"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-rosario-base/20 rounded-full blur-2xl -z-10 hidden md:block"></div>
    </div>
  );
};

export default SaoMenuSystem;