import React from 'react';
import { DefaultizedPieValueType, PieChart, pieArcLabelClasses } from '@mui/x-charts';

type PieChartLabelData = {
  value: number;
  label: string;
  color?: string;
};

type PieChartProps = {
  data: PieChartLabelData[];
  sizing: {
    width?: number | undefined;
    height: number;
  };
};

const PieChartCore: React.FC<PieChartProps> = ({ data, sizing }) => {
  const TotalValue = data.reduce((acc, curr) => acc + curr.value, 0);
  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percentage = ((params.value / TotalValue) * 100).toFixed(2);
    return `${percentage}%`;
  };

  return (
    <PieChart
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
          fontWeight: 'bold',
          right: 5,
          zIndex: -1,
        },
      }}
      {...sizing}
      series={[
        {
          data,
          arcLabel: getArcLabel,
          outerRadius: 80,
        },
      ]}
      className='relative z-10'
    />
  );
};

export default PieChartCore;
