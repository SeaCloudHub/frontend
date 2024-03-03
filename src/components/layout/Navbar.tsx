import IconifyIcon from '../core/Icon/IConCore';
import ButtonContainer from '../core/button/ButtonContainer';
import ButtonIcon from '../core/button/ButtonIcon';

type NavbarProps = {
  isShrink: boolean;
  phoneMode: boolean;
};
const Navbar = ({ isShrink, phoneMode }: NavbarProps) => {
  return (
    <div className={`${phoneMode ? 'pl-0 !important' : ''} nav-bar ${isShrink ? 'nav-bar-shrink' : ''}`}>
      <div className='px-3 flex items-center justify-between w-full h-full'>
        <div className={`${phoneMode ? 'w-full' : 'w-6/12'} flex h-[50px] items-center justify-center`}>
          <div className={`${phoneMode ? 'block mr-2' : 'hidden'}`}>
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
        <div className={`${phoneMode ? 'hidden' : 'flex items-center w-3/12 '}`}>
          <div className='rounded-full h-full '>
            <img
              src='https://student.hcmus.edu.vn/_next/image?url=%2Fhcmus-logo.png&w=384&q=75'
              className='max-h-[50px] object-contain'
            />
          </div>
          <div className='flex flex-col items-start leading-7 justify-center'>
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
