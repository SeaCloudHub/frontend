import { Spin } from 'antd';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Show from '../condition/Show';

type PieChartLabelData = {
  value: number;
  label: string;
};

type PieChartProps = {
  data: PieChartLabelData[];
  isLoading?: boolean;
  isFetching?: boolean;
  mapperFunction?: (data: any) => string;
};

const DEFAULT_NUMBER_DATA_DISPLAY = 5;

const LIST_COLOR_CHART = [
  '#C44444',
  '#FDBA8C',
  '#16BDCA',
  '#3C36DC',
  '#E371F2',
  '#0E9F6E',
  '#FF8C00',
  '#FF69B4',
  '#257d0f',
  '#db2a16',
];

const PieChartCore: React.FC<PieChartProps> = ({ data, isLoading, isFetching, mapperFunction }) => {
  const [totalList, setTotalList] = useState<number>(DEFAULT_NUMBER_DATA_DISPLAY);
  const [chartData, setChartData] = useState<PieChartLabelData[]>([]);

  const options: ApexOptions = {
    chart: {
      id: 'dashboard-storage-chart',
      type: 'pie',
      toolbar: {
        show: false,
      },
      events: {
        mounted: (chart) => {
          chart.windowResizeHandler();
        },
      },
    },
    legend: {
      show: false,
    },
    colors: LIST_COLOR_CHART,
    labels: chartData?.map((item) => item.label),
    dataLabels: {
      style: {
        fontSize: '14px',
        fontWeight: 600,
        fontFamily: 'Inter',
        colors: ['#FFFFFF'],
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 310,
            height: 190,
          },
        },
      },
    ],
  };

  useEffect(() => {
    setChartData(data);
  }, [data]);

  return (
    <div id='chart' className='m-2'>
      <Show when={(chartData?.length === 0 || !chartData) && !isLoading && !isFetching}>
        <div className='flex h-full  items-center justify-center'>
          <p className=''>No Data</p>
        </div>
      </Show>

      <Show when={isLoading || isFetching}>
        <div className='flex h-full  w-full items-center justify-center'>
          <Spin size='default' />
        </div>
      </Show>

      <Show when={!isLoading && !isFetching && !!chartData && chartData?.length > 0}>
        <div className=' flex w-full justify-center'>
          <ReactApexChart
            options={options}
            series={chartData?.map((item) => item.value)}
            type={options?.chart?.type}
            height={250}
            width={300}
          />
        </div>
        <div className='max-xlg:mt-4 flex h-fit w-full flex-col'>
          <table className='w-full px-4 shadow-md'>
            <tbody>
              {chartData.slice(0, totalList).map((item, index) => (
                <tr key={index} className='w-full dark:bg-black dark:text-white '>
                  <td className='w-2/5 text-base font-medium  max-sm:max-w-[50px] max-sm:break-words sm:px-4 sm:py-[15px]'>
                    {item.label}
                  </td>

                  <td className='w-1/5 text-sm font-semibold  max-sm:text-center sm:px-4 sm:py-[15px]'>
                    {mapperFunction ? mapperFunction(item.value) : item.value}
                  </td>
                  <td className='w-2/5 py-[15px] text-right sm:px-4'>
                    <div className='flex w-full items-center justify-start gap-1'>
                      <p className='w-[50%] text-start text-xs font-medium text-gray-500'>
                        {((item.value / chartData.map((item) => item.value).reduce((acc, curr) => acc + curr, 0)) * 100).toFixed(
                          1,
                        )}
                        %
                      </p>
                      <div className='h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700'>
                        <div
                          className={`h-2 rounded-sm`}
                          style={{
                            width: `${
                              (item.value / chartData.map((item) => item.value).reduce((acc, curr) => acc + curr, 0)) * 100
                            }%`,
                            backgroundColor: `${LIST_COLOR_CHART[index % LIST_COLOR_CHART.length]}`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Show>
    </div>
  );
};

export default PieChartCore;
