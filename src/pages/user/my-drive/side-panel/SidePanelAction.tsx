import { LinearProgress } from '@mui/material';
import ActionItem from './ActionItem';
import { useActivityLog } from '@/hooks/drive.hooks';
import { useCursorActivity } from '@/store/my-drive/myDrive.store';

const SidePanelAction = () => {
  const { data, isLoading } = useActivityLog();
  const { nextCursorActivity } = useCursorActivity();

  return (
    isLoading && !nextCursorActivity  ? (
      <LinearProgress className='translate-y-1' />
    ) :
    <div className='px-2 h-full overscroll-y-auto' >
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
