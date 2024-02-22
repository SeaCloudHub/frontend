import { Box } from '@mui/material';
import { PropsWithChildren, useEffect, useState } from 'react';
import { sidebarItems } from '../../utils/constants/sidebar.constant';
import IconifyIcon from '../core/Icon/IConCore';
import ButtonContainer from '../core/button/ButtonContainer';
import ButtonCore from '../core/button/ButtonCore';
import ButtonIcon from '../core/button/ButtonIcon';
import LinearChartBar from '../core/linear-chart-bar/linearChartBar';
import SidebarItem from '../core/sidebar-item/SidebarItem';
const Sidebar = ({ children }: PropsWithChildren) => {
  const onClick = () => {};
  const [shrink, setShrink] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <div className={`${shrink ? 'ml-[75px]' : 'nav-bar content'}`}>{children}</div>
      <div className={`sidebar ${shrink ? '' : 'sidebar-lg'}`}>
        <div className='w-full flex justify-center items-center'>
          {shrink ? (
            <ButtonIcon
              icon='radix-icons:hamburger-menu'
              size={'25px'}
              onClick={() => {
                setShrink(false);
              }}
            />
          ) : (
            <div className='flex flex-col  justify-between w-full'>
              <div className='flex mt-8 items-center justify-around '>
                <Box sx={{ maxWidth: 150 }} className='mx-auto'>
                  <img
                    src='https://student.hcmus.edu.vn/_next/image?url=%2Fhcmus-logo.png&w=384&q=75'
                    alt='placeholder'
                    className='w-full rounded-full h-auto'
                  />
                </Box>
                <ButtonIcon
                  onClick={() => {
                    setShrink(true);
                  }}
                  icon='fluent:ios-arrow-left-24-regular'
                  size={'25px'}
                />
              </div>
              {/* <div className='px-3'>
                <p className='text-[25px] mt-4 font-semibold truncate max-w-[250px] '>Phan Nhật Nhât Triều</p>
                <div className='flex items-center -mt-2  '>
                  <p className='text-[15px] max-w-[100px]   font-medium truncate'>UI UI Designer</p>
                  <ButtonIcon size={'10px'} icon='teenyicons:down-solid' onClick={onClick} />
                </div>
              </div> */}
            </div>
          )}
        </div>
        <div>
          {sidebarItems.map((item, index) => (
            <SidebarItem key={index} icon={item.icon} link={item.link} shrink={shrink} title={item.title} />
          ))}
          <LinearChartBar width='100%' value={70} total={100} />
          <p className={`text-center  text-gray-900 ${shrink ? 'hidden' : ''} statement-bold`}>Used 90 of 8 GB of memory</p>
        </div>
        <div className='flex flex-col items-center'>
          {shrink ? (
            <>
              <ButtonIcon size={25} icon='mdi:logout' />
              <ButtonIcon icon='tabler:book' size={25} />
            </>
          ) : (
            <>
              <ButtonContainer title='Logout' background='#063768' icon={<IconifyIcon icon={'mdi:logout'} />} />
              <div className='flex justify-center space-x-4 mt-2 items-center'>
                <ButtonCore contentColor='black' icon={<IconifyIcon icon={'ic:outline-info'} />} title={'About'} type={'text'} />
                <ButtonCore
                  contentColor='black'
                  icon={<IconifyIcon icon={'material-symbols:help-outline'} />}
                  title={'Help'}
                  type={'text'}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
