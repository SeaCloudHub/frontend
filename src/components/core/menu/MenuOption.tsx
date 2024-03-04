import { Link } from '@/helpers/router-events';

export type MeneOptionType = {
  id: number | string;
  value: string;
};

type MenuOptionProps = {
  options?: MeneOptionType[];
  path?: string;
};

const MenuOption = ({ options, path }: MenuOptionProps) => {
  return (
    <div
      className={`option-container absolute left-0 top-full w-full border-t
        border-[#4006B2] bg-white`}>
      {options &&
        options.map((item) => (
          <Link key={item.id} href={`${item.id}`}>
            <div
              className={`h-full py-[12px] pl-3 text-base transition-all 
              duration-200 ease-in-out hover:bg-[#F0F0F7] xl:pl-[24px]
              ${path === item.id ? 'font-medium text-[#4006B2]' : 'font-normal text-black'}`}>
              {item.value}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default MenuOption;
