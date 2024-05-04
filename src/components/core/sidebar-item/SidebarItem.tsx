import { CUSTOMER_MY_DRIVE } from '@/utils/constants/router.constant';
import { useLocation, useNavigate } from 'react-router-dom';
import IconifyIcon from '../Icon/IConCore';
import { useSelected } from '@/store/my-drive/myDrive.store';
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
  const {setArrSelected} = useSelected();
  const onClick = () => {
    navigate(link);
    setArrSelected([]);
  };

  const isMyDriveActive = () => {
    return link.startsWith(CUSTOMER_MY_DRIVE) && pathName.pathname.startsWith(CUSTOMER_MY_DRIVE);
  };

  return (
    <>
      <div
        onClick={onClick}
        className={` sidebar-item ${shrink ? '' : 'sidebar-item-lg'} ${link === pathName.pathname || isMyDriveActive() ? 'sidebar-item-active' : ''} my-5`}>
        <IconifyIcon fontSize={shrink ? '1.4rem' : '1.5rem'} icon={icon} />
        <p className={` ${shrink ? 'hidden' : 'block'} `}>{title}</p>
      </div>
    </>
  );
};

export default SidebarItem;
