
import React, { useState } from 'react';

const osData = [
  { name: 'Ubuntu', image: 'https://i.postimg.cc/RFpZZnCC/image.png' },
  { name: 'Windows', image: 'https://i.postimg.cc/8cBDrJND/image.png' },
  { name: 'Fedora', image: 'https://i.postimg.cc/gcQLd1Bg/image.png' },
  { name: 'Debian', image: 'https://i.postimg.cc/x1S5R6MM/image.png' },
  { name: 'Kali Linux', image: 'https://i.postimg.cc/bNf1csJ9/image.png' },
  { name: 'Custom ISO', icon: 'fa-solid fa-download' },
];

const OSCard: React.FC<{ os: typeof osData[0]; selected: boolean; onClick: () => void; }> = ({ os, selected, onClick }) => {
    const containerClasses = `
        flex flex-col items-center space-y-4 text-center w-32 cursor-pointer group
    `;
    
    const iconWrapperClasses = `
        w-28 h-28 rounded-2xl flex items-center justify-center bg-card-bg-solid border-2
        transition-all duration-300 transform group-hover:-translate-y-1
        ${selected ? 'border-accent-purple shadow-lg shadow-purple-500/10' : 'border-gray-800 group-hover:border-accent-purple/50'}
    `;

    return (
        <div className={containerClasses} onClick={onClick}>
            <div className={iconWrapperClasses}>
                {os.image ? (
                    <img src={os.image} alt={os.name} className="h-16 w-16 object-contain" />
                ) : (
                    <i className={`${os.icon} text-5xl text-accent-purple`}></i>
                )}
            </div>
            <p className={`font-semibold transition-colors ${selected ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{os.name}</p>
        </div>
    );
};

const OperatingSystems: React.FC = () => {
  const [selectedOs, setSelectedOs] = useState('Debian'); // Default to Debian as in the image

  return (
    <section className="py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-badge-bg text-badge-text font-semibold px-4 py-2 rounded-full mb-6">
          <i className="fa-solid fa-desktop"></i>
          <span>Operating Systems</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
          Choose your <span className="text-accent-purple">OS</span>
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          Select from a wide range of popular operating systems. All images are pre-configured and ready to deploy instantly on your VPS.
        </p>
      </div>
      <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
        {osData.map((os) => (
          <OSCard 
            key={os.name} 
            os={os} 
            selected={selectedOs === os.name} 
            onClick={() => setSelectedOs(os.name)} 
          />
        ))}
      </div>
    </section>
  );
};

export default OperatingSystems;