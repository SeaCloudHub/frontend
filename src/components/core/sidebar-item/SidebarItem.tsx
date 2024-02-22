import IconifyIcon from '../Icon/IConCore';
type SidebarItemProps = {
  icon: string;
  title: string;
  link: string;
  shrink: boolean;
};
const SidebarItem = ({ icon, title, link, shrink }: SidebarItemProps) => {
  // const pathname = useLocation();
  const onClick = () => {
    // console.log(pathname);
  };

  return (
    <>
      <div
        onClick={onClick}
        className={`sidebar-item ${shrink ? '' : 'sidebar-item-lg'} ${link === '1' ? 'sidebar-item-active' : ''}`}>
        <IconifyIcon height={'30px'} icon={icon} />
        <p className={` ml-4 ${shrink ? 'hidden' : 'block'} statement-upper-medium `}>{title}</p>
      </div>
    </>
  );
};

export default SidebarItem;
