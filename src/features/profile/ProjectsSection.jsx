import React from 'react';
import GlassPanel from '../../components/common/GlassPanel';
import SaoButton from '../../components/common/SaoButton';

const ProjectsSection = () => {
  const projects = [
    {
      name: 'RiskaPS',
      description: 'Providing multiple game & version of private server.',
      links: [{ label: 'RiskaPS Guide', url: '/guide' }],
      variant: 'primary',
    },
    {
      name: 'Server Status',
      description: 'Server tracking platform.',
      links: [{ label: 'Server-Status', url: 'https://stats.ozmoon.xyz/' }],
      variant: 'primary',
    },
    {
      name: 'File Manager',
      description: 'Shared file storage and distribution server.',
      links: [
        { label: 'File', url: 'https://file.ozmoon.xyz' }
      ],
      variant: 'primary',
    },
    {
      name: 'Git',
      description: 'Source code repository for all our projects.',
      links: [
        { label: 'Git', url: 'http://git.ozmoon.xyz' },
        { label: 'GitHub', url: 'https://github.com/PutraZc' }
      ],
      variant: 'primary',
    }
  ];

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h3 className="text-3xl font-header text-zekken-skin mb-8 border-b border-sao-border pb-2 inline-flex items-center">
        <span className="w-3 h-3 bg-rosario-base rotate-45 mr-4"></span>
        Active Services
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <GlassPanel 
            key={index}
            className="flex flex-col p-6 border-l-4 border-l-rosario-base relative overflow-hidden group hover:border-l-rosario-light transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Background scanning effect on hover */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-zekken-tunic/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300 pointer-events-none"></div>

            <h4 className="text-2xl font-header text-zekken-skin mb-2 relative z-10">
              {project.name}
            </h4>
            
            <p className="text-gray-300 font-body mb-6 relative z-10 flex-grow">
              {project.description}
            </p>
            
            <div className="mt-auto relative z-10 flex flex-col sm:flex-row gap-3 flex-wrap">
              {project.links.map((link, linkIndex) => (
                <a key={linkIndex} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:flex-1">
                  <SaoButton variant={project.variant} className="w-full flex justify-center items-center shadow-lg text-sm md:text-base">
                    {link.label}
                  </SaoButton>
                </a>
              ))}
            </div>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;