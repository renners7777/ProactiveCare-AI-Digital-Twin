import React, { ReactNode } from 'react';
import { TrendingUp, TrendingDown, MinusIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  baseline: number;
  current: number;
  isRating?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon, 
  baseline, 
  current,
  isRating = false
}) => {
  // Calculate percentage change from baseline
  const percentChange = ((current - baseline) / baseline) * 100;
  
  // Determine if the change is positive or negative (for ratings, higher is better)
  let changeDirection: 'up' | 'down' | 'stable' = 'stable';
  if (Math.abs(percentChange) >= 5) {
    changeDirection = isRating 
      ? (percentChange > 0 ? 'up' : 'down') 
      : (percentChange > 0 ? 'up' : 'down');
  }
  
  // Determine status color based on change direction and metric type
  const getStatusColor = () => {
    if (changeDirection === 'stable') return 'text-neutral-500';
    
    if (isRating) {
      return changeDirection === 'up' ? 'text-success-600' : 'text-danger-600';
    } else {
      // For movement metrics, decreasing is generally bad (unless it's extremely high)
      return changeDirection === 'up' ? 'text-success-600' : 'text-danger-600';
    }
  };
  
  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-3 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-medium text-neutral-500">{title}</h3>
        <div className="text-primary-500">
          {icon}
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div className="text-lg font-semibold">{value}</div>
        
        <div className={`flex items-center text-xs font-medium ${getStatusColor()}`}>
          {changeDirection === 'up' && <TrendingUp size={14} className="mr-1" />}
          {changeDirection === 'down' && <TrendingDown size={14} className="mr-1" />}
          {changeDirection === 'stable' && <MinusIcon size={14} className="mr-1" />}
          
          <span>
            {Math.abs(percentChange) < 5 
              ? 'Stable' 
              : `${percentChange > 0 ? '+' : ''}${percentChange.toFixed(1)}%`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;