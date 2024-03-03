import { Tooltip } from '@mui/material';
import IconifyIcon from '../Icon/IConCore';
type SidebarItemProps = {
  icon: string;
  title: string;
  link: string;
  shrink: boolean;
  tooltip?: string;
};
const SidebarItem = ({ icon, title, link, shrink, tooltip }: SidebarItemProps) => {
  // const pathname = useLocation();
  const onClick = () => {
    // console.log(pathname);
  };

  return (
    <>
      <Tooltip arrow title={tooltip}>
        <div
          onClick={onClick}
          className={` sidebar-item ${shrink ? '' : 'sidebar-item-lg'} ${link === '1' ? 'sidebar-item-active' : ''}`}>
          <IconifyIcon height={'30px'} icon={icon} />
          <p className={` ml-4 ${shrink ? 'hidden' : 'block'} statement-upper-medium `}>{title}</p>
        </div>
      </Tooltip>
    </>
  );
};

export default SidebarItem;
