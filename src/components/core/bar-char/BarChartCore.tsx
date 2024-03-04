import { BarChart } from '@mui/x-charts';
import React from 'react';

type BarChartCoreProps = {
  data: { name: any; value: number }[];
  color?: string | undefined;
  sizing: {
    width?: number | undefined;
    height: number;
  };
};

const BarChartCore: React.FC<BarChartCoreProps> = ({ data, sizing, color }) => {
  return (
    <BarChart
      series={[
        {
          data: data.map((d) => d.value),
          color: color,
        },
      ]}
      {...sizing}
      xAxis={[{ data: data.map((d) => d.name), scaleType: 'band' }]}
    />
  );
};

export default BarChartCore;
