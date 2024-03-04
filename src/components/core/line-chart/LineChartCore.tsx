import { LineChart } from '@mui/x-charts';
import React from 'react';

type LineChartCoreProps = {
  data: { name: any; value: number }[];
  color?: string | undefined;
  sizing: {
    width?: number | undefined;
    height: number;
  };
};

const LineChartCore: React.FC<LineChartCoreProps> = ({ data, sizing, color }) => {
  return (
    <LineChart
      xAxis={[{ data: data.map((d) => d.name), scaleType: 'point' }]}
      series={[
        {
          data: data.map((d) => d.value),
          color: color,
        },
      ]}
      {...sizing}
    />
  );
};

export default LineChartCore;
