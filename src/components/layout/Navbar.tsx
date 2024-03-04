import IconifyIcon from '../core/Icon/IConCore';
import ButtonContainer from '../core/button/ButtonContainer';
import ButtonIcon from '../core/button/ButtonIcon';

type NavbarProps = {
  isShrink: boolean;
  phoneMode: boolean;
};
const Navbar = ({ isShrink, phoneMode }: NavbarProps) => {
  return (
    <div className={`${phoneMode ? '!important pl-0' : ''} nav-bar ${isShrink ? 'nav-bar-shrink' : ''}`}>
      <div className='flex h-full w-full items-center justify-between px-3'>
        <div className={`${phoneMode ? 'w-full' : 'w-6/12'} flex h-[50px] items-center justify-center`}>
          <div className={`${phoneMode ? 'mr-2 block' : 'hidden'}`}>
            <ButtonIcon icon='ic:outline-menu' size={25} />
          </div>
          <input className={`${phoneMode ? 'h-3/4' : ' h-full'} w-full `} placeholder='Search file' />
          <ButtonContainer
            size={phoneMode ? 35 : 50}
            background='#063768'
            color='white'
            icon={<IconifyIcon icon={'ion:search-sharp'} />}
          />
        </div>
        <div className={`${phoneMode ? 'hidden' : 'flex w-3/12 items-center '}`}>
          <div className='h-full rounded-full '>
            <img
              src='https://student.hcmus.edu.vn/_next/image?url=%2Fhcmus-logo.png&w=384&q=75'
              className='max-h-[50px] object-contain'
            />
          </div>
          <div className='flex flex-col items-start justify-center leading-7'>
            <h6 className='statement-bold'>Phan Nhật Triều</h6>
            <div className='flex items-center justify-center'>
              <p className='statement-upper-medium'>Role: User</p>
              <ButtonIcon icon='teenyicons:down-solid' size={15} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
