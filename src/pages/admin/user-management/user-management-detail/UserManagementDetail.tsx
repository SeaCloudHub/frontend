import { ScreenMode } from '@/utils/enums/screen-mode.enum';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconifyIcon from '../../../../components/core/Icon/IConCore';
import ButtonContainer from '../../../../components/core/button/ButtonContainer';
import SectionBorder from '../../../../components/core/section-boder/SectionBoder';
import { useScreenHook } from '../../../../hooks/useScreenHook';
import { useScreenMode } from '../../../../store/responsive/screenMode';
import { ADMIN_USER_MANAGEMENT } from '../../../../utils/constants/router.constant';
import StorageStatistic from '../../shared/StorageStatistic';
import UserDetailAction from './components/action/UserDetailAction';
import FileFolderFilter from './components/file-folder-detail/FileFolderFilter';
import FileSection from './components/file-folder-detail/FileSection';
import FolderSection from './components/file-folder-detail/FolderSection';

const UserManagementDetail = () => {
  const navigate = useNavigate();
  const { screenMode, shrinkMode } = useScreenMode();
  const flex = !useScreenHook(1024);
  const divRef = useRef<HTMLDivElement>(null);
  const [divHeight, setDivHeight] = useState<number | null>(null);
  useEffect(() => {
    if (divRef.current) {
      const height = divRef.current.clientHeight;
      setDivHeight(height);
    }
  }, []);
  console.log(divHeight);
  return (
    <>
      <div
        ref={divRef}
        className={`fixed ${screenMode != ScreenMode.DESKTOP ? 'left-0' : shrinkMode ? 'left-[77px]' : 'left-[302px]'}  top-[4rem] z-20  flex w-full items-center space-x-1 border-b-2 bg-white px-3 py-1`}>
        <p
          onClick={() => {
            navigate(ADMIN_USER_MANAGEMENT);
          }}
          className='statement-upper-medium cursor-pointer text-gray-700'>
          Users
        </p>
        <IconifyIcon fontSize={15} icon={'material-symbols:arrow-forward-ios-rounded'} />
        <p className='statement-upper-medium'>Hung Phi Vo</p>
      </div>
      <div
        style={{ maxHeight: flex ? `calc(100vh - 4rem - 28px)` : 'none' }}
        className={`${flex ? 'flex w-full items-start space-x-2 overflow-hidden' : ''} pt-[28px]`}>
        {/* <!--section --> */}
        <div className={`${flex ? 'w-1/4' : ''} border-2`}>
          <div className='flex  flex-col space-y-2 border-b-2 p-4'>
            <p className='flex bg-[#eee] p-1'>ADMIN</p>
            <div className='flex items-start  space-x-3'>
              <img
                className='w-[70px] rounded-full object-contain'
                src='https://student.hcmus.edu.vn/_next/image?url=%2Fhcmus-logo.png&w=384&q=75'
              />
              <div className='space-y-2 '>
                <p className='statement-upper-medium h3'> Hung Vo Phi</p>
                <p className='statement-medium'>admin@phihungtf.me</p>
                <ul>
                  <li className='text-green-500'>Active</li>
                  <li>Last sign in 27 minutes ago</li>
                  <li>Created: Mar 7,2024</li>
                </ul>
              </div>
            </div>
          </div>
          <div className='flex flex-col space-y-2 border-b-2 p-3'>
            <p>Organizational unit</p>
            <p className='statement-bold'>SeaCloud</p>
          </div>
          <div className='flex flex-col border-b-2 p-3'>
            <UserDetailAction title='RESET PASSWORD' />
            <UserDetailAction title='UPDATE USER' />
            <UserDetailAction title='UPLOAD PROFILE PHOTO' />
            <UserDetailAction title='SUSPEND USER' />
            <UserDetailAction title='DELETE PASSWORD' />
            <UserDetailAction title='CHANGE ORGANIZATIONAL UNIT' />
          </div>
        </div>
        {/* <!--section --> */}
        <div
          style={{ maxHeight: flex ? `calc(100vh - 4rem - 28px)` : 'none' }}
          className={`flex  flex-col space-y-4 overflow-y-auto ${flex ? 'w-3/4 ' : ''}`}>
          <div className='w-full space-y-2 p-3  shadow-md'>
            <p className='statement-medium h4 '>Personal Dropbox space of Hung Vo Phi</p>
            <StorageStatistic />
          </div>
          <div className='z-0 w-full space-y-2 p-3 shadow-md'>
            <ButtonContainer title='Modify memory' icon={<IconifyIcon icon={'tabler:edit'} />} />
          </div>
          <SectionBorder title='Memory details'>
            <FileFolderFilter />
            <FileSection />
            <FolderSection />
          </SectionBorder>
        </div>
      </div>
    </>
  );
};

export default UserManagementDetail;
