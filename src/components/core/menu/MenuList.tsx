'use client';
import { Link } from '@/helpers/router-events';
import { ICONS } from '@/utils/theme';
import { TabsType } from '@/utils/types/tab.type';
import { useMemo } from 'react';
import './MenuList.css';
import MenuOption from './MenuOption';

type MenuListProps = {
  tab: TabsType;
  path?: string;
};

const MenuList = ({ tab, path }: MenuListProps) => {
  const { id, title, options, isDropDown } = tab;

  const selectedPath = useMemo(() => {
    if (isDropDown) {
      const tab = options?.find((item) => item.id === path);
      if (tab) return true;
      return false;
    } else {
      if (id === path) {
        return true;
      }
      return false;
    }
  }, [path, isDropDown]);

  return (
    <>
      {!isDropDown ? (
        <Link href={`${id}`}>
          <div
            className={`header-dropdown-container select-container
            ${selectedPath ? 'text-[#4006B2]' : ''}`}>
            {title}
          </div>
        </Link>
      ) : (
        <div
          className={`header-dropdown-container select-container
          ${selectedPath ? 'text-[#4006B2]' : ''}`}>
          {title}
          <div className='dropdown-icon transition-all duration-200 ease-in'>
            <ICONS.DOWN />
          </div>
          <MenuOption options={options} path={path} />
        </div>
      )}
    </>
  );
};

export default MenuList;
