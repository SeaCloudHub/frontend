import Show from '@/components/core/condition/Show';
import { Paper } from '@mui/material';
import { HTMLAttributes, useMemo } from 'react';
import DashBoardRate from './DashBoardRate';
import IconifyIcon from '@/components/core/Icon/IConCore';

type DashboardStatisticUserProps = HTMLAttributes<HTMLDivElement> & {
  data: {
    name: string;
    percentage: number;
    value: number;
  };
  isLoading?: boolean;
  isFetching?: boolean;
};

export default function DashboardCard({ data, isLoading, isFetching }: DashboardStatisticUserProps) {
  return (
    <Show when={!isLoading && !isFetching}>
      <Paper
        sx={{
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
        elevation={3}
        className='flex h-fit w-[280px] shrink-0 justify-center rounded-lg border border-gray-50 bg-white px-2 py-5 shadow-lg'>
        <IconifyIcon icon='mi:users' className='h-10 w-11 min-w-max rounded-full bg-[#fdd7be] p-2 ' />
        <div className='w-full pl-5'>
          <div className='flex min-w-max items-center justify-between text-xl font-bold text-gray-700'>
            <div>{data.value}</div>
            <DashBoardRate pecentage={data.percentage} />
          </div>
          <div className='test-sm '>{data.name}</div>
        </div>
      </Paper>
    </Show>
  );
}
