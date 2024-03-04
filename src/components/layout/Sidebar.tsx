import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { adminSidebar, userSidebar } from '../../utils/constants/sidebar.constant';
import { Role } from '../../utils/enums/role.enum';
import { SidebarItemType } from '../../utils/types/sidebar-item.type';
import IconifyIcon from '../core/Icon/IConCore';
import ButtonContainer from '../core/button/ButtonContainer';
import ButtonCore from '../core/button/ButtonCore';
import ButtonIcon from '../core/button/ButtonIcon';
import LinearChartBar from '../core/linear-chart-bar/linearChartBar';
import SidebarItem from '../core/sidebar-item/SidebarItem';

type SidebarProps = {
  onShrinkChange: (mode: boolean) => void;
  role: Role;
};
const Sidebar = ({ onShrinkChange, role }: SidebarProps) => {
  const [shrink, setShrink] = useState<boolean>(false);
  const onShrinkModeChange = (mode: boolean) => {
    setShrink(mode);
    onShrinkChange(mode);
  };
  const [tabs, setTabs] = useState<SidebarItemType[]>([]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        onShrinkModeChange(true);
      } else {
        onShrinkModeChange(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (role === Role.ADMIN) {
      setTabs(adminSidebar);
    } else {
      setTabs(userSidebar);
    }
  }, [role]);

  return (
    <>
      <div className={`sidebar ${shrink ? '' : 'sidebar-lg'} z-sidebar`}>
        <div className='w-full flex justify-center items-center'>
          {shrink ? (
            <ButtonIcon
              icon='radix-icons:hamburger-menu'
              size={'25px'}
              onClick={() => {
                onShrinkModeChange(false);
              }}
            />
          ) : (
            <div className='flex w-full  flex-col justify-between'>
              <div className='mt-8 flex items-center justify-around '>
                <Box sx={{ maxWidth: 150 }} className='mx-auto'>
                  <img
                    src='https://student.hcmus.edu.vn/_next/image?url=%2Fhcmus-logo.png&w=384&q=75'
                    alt='placeholder'
                    className='h-auto w-full rounded-full'
                  />
                </Box>
                <ButtonIcon
                  onClick={() => {
                    onShrinkModeChange(true);
                  }}
                  icon='fluent:ios-arrow-left-24-regular'
                  size={'25px'}
                />
              </div>
            </div>
          )}
        </div>
        <div>
          {tabs.map((item, index) => (
            <SidebarItem
              key={index}
              tooltip={item.tooltip}
              icon={item.icon}
              link={item.link}
              shrink={shrink}
              title={item.title}
            />
          ))}
          {role === Role.User && (
            <>
              <LinearChartBar width='100%' value={70} total={100} />
              <p className={`text-center  text-gray-900 ${shrink ? 'hidden' : ''} statement-bold`}>Used 90 of 8 GB of memory</p>
            </>
          )}
        </div>
        <div className='flex flex-col items-center'>
          {shrink ? (
            <>
              <ButtonIcon tooltip='Logout' size={25} icon='mdi:logout' />
              <ButtonIcon tooltip='About' icon='ic:outline-info' size={25} />
              <ButtonIcon tooltip='Help' icon='material-symbols:help-outline' size={25} />
            </>
          ) : (
            <>
              <ButtonContainer
                tooltip={'Logout'}
                title='Logout'
                background='#063768'
                icon={<IconifyIcon icon={'mdi:logout'} />}
              />
              <div className='mt-2 flex items-center justify-center space-x-4'>
                <ButtonCore
                  tooltip='About'
                  contentColor='black'
                  icon={<IconifyIcon icon={'ic:outline-info'} />}
                  title={'About'}
                  type={'text'}
                />
                <ButtonCore
                  tooltip='Help'
                  contentColor='black'
                  icon={<IconifyIcon icon={'material-symbols:help-outline'} />}
                  title={'Help'}
                  type={'text'}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
