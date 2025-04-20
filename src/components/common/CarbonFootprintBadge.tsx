import React from 'react';

interface CarbonFootprintBadgeProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const CarbonFootprintBadge: React.FC<CarbonFootprintBadgeProps> = ({
  value,
  size = 'md',
  showText = true
}) => {
  const getImpactLevel = (value: number) => {
    if (value < 10) return { className: 'eco-badge-low', text: 'Low Impact' };
    if (value < 30) return { className: 'eco-badge-medium', text: 'Medium Impact' };
    return { className: 'eco-badge-high', text: 'High Impact' };
  };
  
  const { className, text } = getImpactLevel(value);
  
  const sizeClasses = {
    sm: 'text-xs py-0.5 px-1.5',
    md: 'text-xs py-1 px-2',
    lg: 'text-sm py-1 px-2.5',
  };
  
  return (
    <span className={`eco-badge ${className} ${sizeClasses[size]} flex items-center`}>
      <span className="w-2 h-2 rounded-full bg-current mr-1.5"></span>
      {showText ? (
        <span>
          {text}: {value.toFixed(1)} kg CO₂
        </span>
      ) : (
        <span>{value.toFixed(1)} kg CO₂</span>
      )}
    </span>
  );
};

export default CarbonFootprintBadge;