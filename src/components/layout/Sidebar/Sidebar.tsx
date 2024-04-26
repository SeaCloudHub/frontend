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
            <div className='flex h-16 items-center'>
              <ButtonIcon
                icon='radix-icons:hamburger-menu'
                size={'20px'}
                onClick={() => {
                  updateShrinkMode(false);
                }}
              />
            </div>
          ) : (
            <div className='flex w-full  flex-col '>
              <div className='flex h-16 w-full items-center justify-around gap-2 p-3 pl-6 '>
                <img src={(import.meta.env.BASE_URL + 'logo.png') as string} alt='placeholder' className='h-9  rounded-full' />
                <p className='h4'>SEAWEEDFS</p>
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
        {role == Role.USER && (
          <div className='w-full p-2'>
            <AddFileMenu shrinkMode={shrinkMode} />
          </div>
        )}
        <div className='w-full p-2'>
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
              <p className={`mt-2 text-center ${shrinkMode ? 'hidden' : ''} `}> 90 of 8 GB of memory</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
