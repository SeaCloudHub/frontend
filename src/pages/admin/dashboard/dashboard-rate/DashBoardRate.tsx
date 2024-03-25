import IconifyIcon from '../../../../components/core/Icon/IConCore';
import React from 'react';

type DashboardRateProps = {
  type: 'Increase' | 'Decrease' | 'Neutral';
  pecentage: number;
};

const DashBoardRate: React.FC<DashboardRateProps> = ({ type, pecentage }) => {
  return (
    <div
      className={`flex text-sm ${
        type === 'Neutral' ? 'text-yellow-500' : type === 'Increase' ? 'text-green-500' : 'text-red-500'
      }`}>
      {type !== 'Neutral' && (
        <IconifyIcon icon={`vaadin:caret-${type === 'Increase' ? 'up' : 'down'}`} className='h-3 w-3 translate-y-2 text-sm' />
      )}
      <span>
        {type === 'Increase' ? '+' : type === 'Decrease' ? '-' : ''} {pecentage}%
      </span>
    </div>
  );
};

export default DashBoardRate;
