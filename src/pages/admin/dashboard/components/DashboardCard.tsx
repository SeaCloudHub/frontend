import IconifyIcon from '@/components/core/Icon/IConCore';
import Show from '@/components/core/condition/Show';
import { Paper } from '@mui/material';
import { HTMLAttributes } from 'react';
import DashBoardRate from './DashBoardRate';

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
          '.dark &': {
            color: 'white',
            background: '#071A2B',
          },
        }}
        elevation={3}
        className='flex h-fit w-full justify-center rounded-lg border border-gray-50 px-6 py-5  shadow-lg'>
        <IconifyIcon icon='mi:users' className='h-10 w-11 min-w-max rounded-full bg-[#fdd7be] p-2 ' />
        <div className='w-full pl-5'>
          <div className='flex min-w-max items-center justify-between text-xl font-bold  '>
            <div>{data.value}</div>
            <DashBoardRate pecentage={data.percentage} />
          </div>
          <div className='test-sm '>{data.name}</div>
        </div>
      </Paper>
    </Show>
  );
}
