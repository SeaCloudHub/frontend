import { classNames } from '@/components/core/drop-down/Dropdown';
import { useDrawer } from '@/store/my-drive/myDrive.store';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Tooltip } from '@mui/material';

const InfoButton: React.FC = () => {
  const { drawerOpen, openDrawer, closeDrawer } = useDrawer();

  return (
    <Tooltip title='Info'>
      <div
        className={classNames(
          'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all hover:bg-[#c2e7ff]  active:brightness-95 dark:hover:bg-slate-500',
          drawerOpen ? 'dark:bg-slate-500 ' : '',
        )}
        onClick={() => {
          if (!drawerOpen) {
            openDrawer();
          } else {
            closeDrawer();
          }
        }}>
        <Icon icon='mdi:information-outline' className='h-5 w-5' />
      </div>
    </Tooltip>
  );
};

export default InfoButton;
