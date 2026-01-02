
import React from 'react';

export const BrandLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    {/* Hexagonal Shield shape matching user-provided logo */}
    <path 
      d="M50 10 L15 30 V60 C15 85 50 110 50 110 C50 110 85 85 85 60 V30 L50 10 Z" 
      stroke="url(#logoGradient)" 
      strokeWidth="8" 
      strokeLinejoin="round"
      fill="none"
    />
    {/* Stylized 'C' inside that follows shield contours */}
    <path 
      d="M65 45 C60 40 55 40 50 40 C40 40 33 48 33 60 C33 72 40 80 50 80 C55 80 60 80 65 75" 
      stroke="url(#logoGradient)" 
      strokeWidth="10" 
      strokeLinecap="round" 
      fill="none"
    />
  </svg>
);
