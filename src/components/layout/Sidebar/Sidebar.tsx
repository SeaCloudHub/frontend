import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useScreenMode } from '../../../store/responsive/screenMode';
import { adminSidebar, userSidebar } from '../../../utils/constants/sidebar.constant';
import { Role } from '../../../utils/enums/role.enum';
import { SidebarItemType } from '../../../utils/types/sidebar-item.type';
import ButtonIcon from '../../core/button/ButtonIcon';
import LinearChartBar from '../../core/linear-chart-bar/linearChartBar';
import SidebarItem from '../../core/sidebar-item/SidebarItem';
import AddFileMenu from './AddFileMenu';

type SidebarProps = {
  shrinkMode: boolean;
  role: Role;
};
const Sidebar = ({ role, shrinkMode }: SidebarProps) => {
  const updateShrinkMode = useScreenMode((state) => state.updateShrinkMode);

  const [tabs, setTabs] = useState<SidebarItemType[]>([]);

  useEffect(() => {
    if (role === Role.ADMIN) {
      setTabs(adminSidebar);
    } else {
      setTabs(userSidebar);
    }
  }, [role]);
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      <div className={`sidebar z-20 ${shrinkMode ? '' : 'sidebar-lg'}`}>
        <div className='flex w-full items-center justify-center'>
          {shrinkMode ? (
            <ButtonIcon
              icon='radix-icons:hamburger-menu'
              size={'25px'}
              onClick={() => {
                updateShrinkMode(false);
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
                    updateShrinkMode(true);
                  }}
                  icon='ion:caret-back'
                  size={'25px'}
                />
              </div>
            </div>
          )}
        </div>
        {role == Role.USER && <AddFileMenu shrinkMode={shrinkMode} />}
        <div>
          {tabs.map((item, index) => (
            <SidebarItem
              key={index}
              tooltip={item.tooltip}
              icon={item.icon}
              link={item.link}
              shrink={shrinkMode}
              title={item.title}
            />
          ))}
          {role === Role.USER && (
            <div className='mt-2'>
              <LinearChartBar width='100%' value={70} total={100} />
              <p className={`text-center  text-gray-900 ${shrinkMode ? 'hidden' : ''} statement-bold`}>
                Used 90 of 8 GB of memory
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
