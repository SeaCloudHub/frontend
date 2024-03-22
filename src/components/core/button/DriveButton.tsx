import { Icon } from '@iconify/react/dist/iconify.js';

type DriveButtonProps = {
  label: string;
  icon: 'folder' | 'drive';
};

export const DriveButton: React.FC<DriveButtonProps> = ({ label, icon }) => {
  return (
    <button className='border-1 flex h-8 cursor-pointer items-center space-x-2 rounded-lg border border-outline pl-2 pr-3 text-sm font-medium hover:bg-surfaceContainer active:bg-surfaceDim active:brightness-90'>
      {icon === 'folder' ? <Icon icon='mdi:folder' /> : <Icon icon='mdi:google-drive' />}
      <span>{label}</span>
    </button>
  );
};
