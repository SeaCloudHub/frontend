import { LinearProgress } from '@mui/material';
import ActionItem from './ActionItem';
import { useActivityLog } from '@/hooks/drive.hooks';
import { useCursorActivity } from '@/store/my-drive/myDrive.store';

const SidePanelAction = () => {
  const { data, isLoading, error } = useActivityLog();
  const { nextCursorActivity } = useCursorActivity();

  return error ? (
    <div className='flex items-center justify-center h-full text-lg font-semibold text-red-500 dark:text-red-400'>
      Error loading activity log
    </div>
  ) :
   isLoading && !nextCursorActivity ? (
    <LinearProgress className='translate-y-1' />
  ) : (
    <div className='h-full overscroll-y-auto px-2'>
      {data.map((item, index) => {
        return (
          <div key={index} className='relative flex flex-col'>
            <div className={`sticky top-0 z-10 bg-white py-3 text-sm font-semibold dark:bg-dashboard-dark`}>{item.time}</div>
            <ActionItem key={index} time={item.time} data={item.data} />
          </div>
        );
      })}
    </div>
  );
};

export default SidePanelAction;
