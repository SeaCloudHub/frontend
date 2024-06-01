import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

type LineChartCoreProps = {
  data: { name: string; data: number[] }[];
  categories: string[];
  title: string;
};

const LineChartCore: React.FC<LineChartCoreProps> = ({ data, categories, title }) => {
  const [areaChartOptions, setAreaChartOptions] = useState<ApexOptions>({
    chart: {
      id: 'visited-user-chart',
      type: 'area',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      events: {
        mounted: (chart) => {
          chart.windowResizeHandler();
        },
      },
    },
    colors: ['#B73838', '#FDBA8C'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.8,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    stroke: {
      curve: 'smooth',
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: 'Inter',
          colors: '#9CA3AF',
        },
        offsetY: 5,
      },
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: 'Inter',
          colors: '#6B7280',
        },
        offsetX: -12,
        formatter: function (val) {
          return val >= 10000 ? (val / 1000).toFixed(0) + 'K' : val.toString();
        },
      },
    },
  });

  useEffect(() => {
    if (categories)
      setAreaChartOptions((prevChartOptions) => ({
        ...prevChartOptions,
        xaxis: { categories: categories, labels: { rotateAlways: categories?.length > 10 ? true : false } },
      }));
  }, [categories]);

  return (
    <div className='flex h-fit w-full flex-col gap-2 rounded-xl px-5 py-3 lg:p-8 '>
      <p className='text-[20px] font-bold leading-[30px] lg:text-3xl'>{title}</p>
      <div className='h-full min-h-[402px] w-full text-black'>
        {!!data && data?.length > 0 ? (
          <>
            {' '}
            <Chart options={areaChartOptions} series={data} type='area' height={'100%'} />
          </>
        ) : (
          <div className='flex h-full items-center justify-center'>No data</div>
        )}
      </div>
    </div>
  );
};

export default LineChartCore;
