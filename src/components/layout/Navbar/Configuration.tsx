import ButtonIcon from '@/components/core/button/ButtonIcon';
import CustomDropdown from '@/components/core/drop-down/CustomDropdown';
import { MenuItem } from '@/components/core/drop-down/Dropdown';
import MenuCore from '@/components/core/menu/MenuCore';
import { MenuItemCoreProps } from '@/components/core/menu/MenuItem';
import { useTheme } from '@/providers/theme-provider';

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
const useSettingProviders = () => {
  const { setTheme } = useTheme();
  const settingMenu: MenuItem[][] = [
    [{ label: 'Keyboard', icon: null, action: () => {} }],
    [
      {
        label: 'Dark ',
        icon: null,
        action: () => {
          setTheme('dark');
        },
      },
      {
        label: 'Light ',
        icon: null,
        action: () => {
          setTheme('light');
        },
      },
    ],
  ];
  return { settingMenu };
};
const Configuration = () => {
  const { settingMenu } = useSettingProviders();
  return (
    <div className='ml-7 mr-5 flex items-center '>
      <MenuCore mix={false} menuItems={helpOptions}>
        <ButtonIcon tooltip='Help' size={'1.6rem'} icon='material-symbols:help-outline' />
      </MenuCore>
      {/* <MenuCore mix={false} menuItems={settingMenu}></MenuCore> */}
      <CustomDropdown
        minWidth={false}
        button={<ButtonIcon tooltip='Setting' size={'1.6rem'} icon='uil:setting' />}
        items={settingMenu}
      />
    </div>
  );
};

export default Configuration;
