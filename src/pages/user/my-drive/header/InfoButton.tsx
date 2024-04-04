import { classNames } from '@/components/core/drop-down/Dropdown';
import { useDrawer } from '@/store/my-drive/myDrive.store';
import { Icon } from '@iconify/react/dist/iconify.js';

const InfoButton: React.FC = () => {
  const { drawerOpen, openDrawer, closeDrawer } = useDrawer();

  return (
    <div
      className={classNames(
        'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all',
        drawerOpen ? 'bg-[#c2e7ff] hover:brightness-95' : 'hover:bg-[#ededed]',
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
  );
};

export default InfoButton;
