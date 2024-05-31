import { useStorageStore } from '@/store/storage/storage.store';
import { numToSize } from '@/utils/function/numbertToSize';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScreenMode } from '../../../store/responsive/screenMode';
import { adminSidebar, userSidebar } from '../../../utils/constants/sidebar.constant';
import { Role } from '../../../utils/enums/role.enum';
import { SidebarItemType } from '../../../utils/types/sidebar-item.type';
import ButtonIcon from '../../core/button/ButtonIcon';
import LinearChartBar from '../../core/linear-chart-bar/linearChartBar';
import SidebarItem from '../../core/sidebar-item/SidebarItem';
import AddFileMenu from './AddFileMenu';
import { ADMIN_HOME, DRIVE_HOME } from '@/utils/constants/router.constant';
import { useSelected } from '@/store/my-drive/myDrive.store';

type SidebarProps = {
  shrinkMode: boolean;
  role: Role;
};
const Sidebar = ({ role, shrinkMode }: SidebarProps) => {
  const updateShrinkMode = useScreenMode((state) => state.updateShrinkMode);
  const navigate = useNavigate();
  const { storageCapacity, storageUsage } = useStorageStore();
  const { setArrSelected } = useSelected();
  const [tabs, setTabs] = useState<SidebarItemType[]>([]);

  useEffect(() => {
    if (role === Role.ADMIN) {
      setTabs(adminSidebar);
    } else {
      setTabs(userSidebar);
    }
  }, [role]);
  // const [dropdown, setDropdown] = useState(false);

  return (
    <>
      <div className={`sidebar z-20 ${shrinkMode ? '' : 'sidebar-lg'} select-none dark:bg-content-bg-dark`}>
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
              <div className='flex h-16 w-full cursor-pointer items-center justify-around gap-2 p-3 pl-6'>
                <div
                  className='flex items-center gap-2'
                  onClick={() => {
                    setArrSelected([]);
                    navigate(role === Role.ADMIN ? ADMIN_HOME : DRIVE_HOME);
                  }}>
                  <img src={(import.meta.env.BASE_URL + 'logo.png') as string} alt='placeholder' className='h-9  rounded-full' />
                  <p className='h4'>SEACLOUD</p>
                </div>
                <ButtonIcon onClick={() => updateShrinkMode(true)} icon='ion:caret-back' size={'25px'} />
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
              <LinearChartBar width='100%' value={storageUsage} total={storageCapacity} />
              <p className={`mt-2 text-center ${shrinkMode ? 'hidden' : ''} `}>
                {' '}
                {`${numToSize(storageUsage)} of ${numToSize(storageCapacity)} of memory`}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
