import React from 'react';

interface AdBannerProps {
  className?: string;
  format?: 'horizontal' | 'rectangle' | 'vertical';
}

const AdBanner: React.FC<AdBannerProps> = ({ className = '', format = 'horizontal' }) => {
  let sizeClass = 'h-24 w-full';
  if (format === 'rectangle') sizeClass = 'h-64 w-full md:w-80';
  if (format === 'vertical') sizeClass = 'h-full w-40';

  return (
    <div className={`bg-gray-100 border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 text-sm overflow-hidden relative group ${sizeClass} ${className}`}>
      <span className="z-10 font-medium">Advertisement Space</span>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </div>
  );
};

export default AdBanner;
