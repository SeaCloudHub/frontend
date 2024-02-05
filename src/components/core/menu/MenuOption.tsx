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
      className={`option-container absolute w-full bg-white left-0 top-full
        border-t border-[#4006B2]`}>
      {options &&
        options.map((item) => (
          <Link key={item.id} href={`${item.id}`}>
            <div
              className={`h-full pl-3 xl:pl-[24px] py-[12px] text-base 
              hover:bg-[#F0F0F7] transition-all duration-200 ease-in-out
              ${path === item.id ? 'text-[#4006B2] font-medium' : 'text-black font-normal'}`}>
              {item.value}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default MenuOption;
