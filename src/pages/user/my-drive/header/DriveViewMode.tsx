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
              className='flex h-[32px] items-center justify-center rounded-l-full border border-r-0 border-[#7e817f] py-1 pl-[20px] pr-[17px] hover:bg-surfaceContainer'>
              <Icon icon='tdesign:view-list' className='h-[18px] w-[18px]' />
            </div>
          </Tooltip>
          <Tooltip title='Grid View'>
            <div className='flex h-[32px] items-center justify-center rounded-r-full border border-outline bg-[#c2e7ff] py-1 pl-[10px] pr-[10px] hover:brightness-90'>
              <Icon icon='ic:baseline-check' className='h-[18px] w-[18px]' />
              <Icon icon='mdi:view-grid-outline' className='h-[18px] w-[18px]' />
            </div>
          </Tooltip>
        </div>
      ) : (
        <div className='flex cursor-pointer items-center'>
          <Tooltip title='List View'>
            <div className='flex h-[32px] items-center justify-center rounded-l-full border border-r-0 border-[#7e817f] bg-[#c2e7ff] py-1 pl-[10px] pr-[10px] hover:brightness-90'>
              <Icon icon='ic:baseline-check' className='h-[18px] w-[18px]' />
              <Icon icon='tdesign:view-list' className='h-[18px] w-[18px]' />
            </div>
          </Tooltip>
          <Tooltip title='Grid View'>
            <div
              className='flex h-[32px] items-center justify-center rounded-r-full border border-outline py-1 pl-[20px] pr-[17px] hover:bg-surfaceContainer'
              onClick={() => {
                setViewMode('grid');
              }}>
              <Icon icon='mdi:view-grid-outline' className='h-[18px] w-[18px]' />
            </div>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default DriveViewMode;
