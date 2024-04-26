import { useViewMode } from '@/store/my-drive/myDrive.store';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Tooltip } from '@mui/material';

const DriveViewMode: React.FC = () => {
  const { viewMode, setViewMode } = useViewMode();

  return (
    <div>
      {viewMode === 'grid' ? (
        <div className='flex cursor-pointer items-center'>
          <Tooltip title='List View'>
            <div
              onClick={() => {
                setViewMode('list');
              }}
              className='flex h-[32px] items-center justify-center rounded-l-full border border-r-0 border-[#7e817f] py-1 pl-[20px] pr-[17px]  hover:bg-surfaceContainer dark:hover:bg-slate-100'>
              <Icon icon='tdesign:view-list' className='h-5 w-5' />
            </div>
          </Tooltip>
          <Tooltip title='Grid View'>
            <div className='flex h-[32px] items-center justify-center rounded-r-full border border-outline bg-black py-1 pl-[10px] pr-[10px] text-white hover:brightness-90 dark:bg-white dark:text-black'>
              <Icon icon='ic:baseline-check' className='h-5 w-5' />
              <Icon icon='mdi:view-grid-outline' className='h-5 w-5' />
            </div>
          </Tooltip>
        </div>
      ) : (
        <div className='flex cursor-pointer items-center'>
          <Tooltip title='List View'>
            <div className='flex h-[32px] items-center justify-center rounded-l-full border border-r-0 border-[#7e817f] bg-black py-1 pl-[10px] pr-[10px] text-white hover:brightness-90 dark:bg-white dark:text-black'>
              <Icon icon='ic:baseline-check' className='h-5 w-5' />
              <Icon icon='tdesign:view-list' className='h-5 w-5' />
            </div>
          </Tooltip>
          <Tooltip title='Grid View'>
            <div
              className='flex h-[32px] items-center justify-center rounded-r-full border border-outline pl-[20px] pr-[17px] hover:bg-surfaceContainer'
              onClick={() => {
                setViewMode('grid');
              }}>
              <Icon icon='mdi:view-grid-outline' className='h-5 w-5' />
            </div>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default DriveViewMode;
