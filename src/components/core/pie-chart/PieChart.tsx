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
  outerRadius?: number | undefined;
};

const PieChartCore: React.FC<PieChartProps> = ({ data, sizing, outerRadius }) => {
  const TotalValue = data.reduce((acc, curr) => acc + curr.value, 0);
  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percentage = ((params.value / TotalValue) * 100).toFixed(2);
    return `${percentage}%`;
  };

  return (
    <PieChart
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
          fontWeight: 'bold',
        },
      }}
      {...sizing}
      slotProps={{
        legend: {
          direction: 'row',
          position: {
            vertical: 'bottom',
            horizontal: 'middle',
          },
        },
      }}
      series={[
        {
          data,
          arcLabel: getArcLabel,
          outerRadius: outerRadius ?? 80,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { color: 'gray', outerRadius: (outerRadius ?? 80) - 5 },
          cy: '45%',
        },
      ]}
    />
  );
};

export default PieChartCore;
