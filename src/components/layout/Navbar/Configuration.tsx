import ButtonIcon from '@/components/core/button/ButtonIcon';
import MenuCore from '@/components/core/menu/MenuCore';
import { MenuItemCoreProps } from '@/components/core/menu/MenuItem';

const settingMenu: MenuItemCoreProps[] = [
  {
    icon: '',
    title: 'Settings',
  },
  {
    icon: '',
    title: 'Keyboard',
  },
];
const helpOptions: MenuItemCoreProps[] = [
  {
    icon: '',
    title: 'About us',
  },
  {
    icon: '',
    title: 'Help',
  },
];
const Configuration = () => {
  return (
    <div className='ml-7 mr-5 flex items-center '>
      <MenuCore menuItems={helpOptions}>
        <ButtonIcon tooltip='Help' size={'1.5rem'} icon='material-symbols:help-outline' />
      </MenuCore>
      <MenuCore menuItems={settingMenu}>
        <ButtonIcon tooltip='Setting' size={'1.5rem'} icon='uil:setting' />
      </MenuCore>
    </div>
  );
};

export default Configuration;
