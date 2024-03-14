import { Tooltip } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import IconifyIcon from '../Icon/IConCore';
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
  const onClick = () => {
    navigate(link);
  };

  return (
    <>
      <Tooltip arrow title={tooltip}>
        <div
          onClick={onClick}
          className={` sidebar-item ${shrink ? '' : 'sidebar-item-lg'} ${link === pathName.pathname ? 'sidebar-item-active' : ''}`}>
          <IconifyIcon height={'30px'} icon={icon} />
          <p className={` ml-4 ${shrink ? 'hidden' : 'block'} statement-upper-medium `}>{title}</p>
        </div>
      </Tooltip>
    </>
  );
};

export default SidebarItem;
