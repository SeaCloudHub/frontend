import { DRIVE_MY_DRIVE, DRIVE_SHARED } from '@/utils/constants/router.constant';
import { useLocation, useNavigate } from 'react-router-dom';
import IconifyIcon from '../Icon/IConCore';
import { useCursor, useEntries, useFilter, useSelected } from '@/store/my-drive/myDrive.store';
type SidebarItemProps = {
  icon: string;
  title: string;
  link: string;
  shrink: boolean;
  tooltip?: string;
};
const SidebarItem = ({ icon, title, link, shrink, tooltip }: SidebarItemProps) => {
  const pathName = useLocation();
  const navigate = useNavigate();
  const { setArrSelected } = useSelected();
  // const { resetLimit } = useLimit();
  const { resetFilter } = useFilter();
  const { resetEntries } = useEntries();
  const { resetCursor } = useCursor();
  const onClick = () => {
    if (link !== pathName.pathname && !isMyDriveActive()) {
      resetEntries();
      resetCursor();
      setArrSelected([]);
      resetFilter();
      setTimeout(() => {
        navigate(link);
      }, 0);
    }
  };

  const isMyDriveActive = () => {
    return link.startsWith(DRIVE_MY_DRIVE) && pathName.pathname.startsWith(DRIVE_MY_DRIVE);
  };

  const isSharedActive = () => {
    return link.startsWith(DRIVE_SHARED) && pathName.pathname.startsWith('/drive/folder');
  };

  return (
    <>
      <div
        onClick={onClick}
        className={` sidebar-item ${shrink ? '' : 'sidebar-item-lg'} ${link === pathName.pathname || isSharedActive() || isMyDriveActive() ? 'sidebar-item-active' : ''} my-5`}>
        <IconifyIcon fontSize={shrink ? '1.4rem' : '1.5rem'} icon={icon} />
        <p className={` ${shrink ? 'hidden' : 'block'} `}>{title}</p>
      </div>
    </>
  );
};

export default SidebarItem;
