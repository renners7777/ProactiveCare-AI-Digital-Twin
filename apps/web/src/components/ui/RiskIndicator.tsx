import React from 'react';

interface RiskIndicatorProps {
  riskLevel: 'low' | 'medium' | 'high';
  size?: 'sm' | 'md';
}

const RiskIndicator: React.FC<RiskIndicatorProps> = ({ riskLevel, size = 'sm' }) => {
  const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 font-medium';
  
  const riskClasses = {
    low: 'bg-success-100 text-success-800',
    medium: 'bg-warning-100 text-warning-800',
    high: 'bg-danger-100 text-danger-800'
  };
  
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm'
  };
  
  const dotClasses = {
    low: 'bg-success-500',
    medium: 'bg-warning-500',
    high: 'bg-danger-500'
  };
  
  return (
    <span className={`${baseClasses} ${riskClasses[riskLevel]} ${sizeClasses[size]}`}>
      <span className={`mr-1.5 h-2 w-2 rounded-full ${dotClasses[riskLevel]}`}></span>
      {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
    </span>
  );
};

export default RiskIndicator;