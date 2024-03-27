import { ScreenMode } from '@/utils/enums/screen-mode.enum';
import { useNavigate } from 'react-router-dom';
import IconifyIcon from '../../../../components/core/Icon/IConCore';
import ButtonContainer from '../../../../components/core/button/ButtonContainer';
import SectionBorder from '../../../../components/core/section-boder/SectionBoder';
import { useScreenHook } from '../../../../hooks/useScreenHook';
import { useScreenMode } from '../../../../store/responsive/screenMode';
import { ADMIN_USER_MANAGEMENT } from '../../../../utils/constants/router.constant';
import UserDetailAction from './components/action/UserDetailAction';
import FileFolderFilter from './components/file-folder-detail/FileFolderFilter';
import FileSection from './components/file-folder-detail/FileSection';
import FolderSection from './components/file-folder-detail/FolderSection';

const UserManagementDetail = () => {
  const navigate = useNavigate();
  const { screenMode, shrinkMode } = useScreenMode();
  const flex = !useScreenHook(1024);
  return (
    <>
      <div
        className={`fixed ${screenMode != ScreenMode.DESKTOP ? 'left-1' : shrinkMode ? 'left-[76px]' : 'left-[310px]'}  top-[80px] z-10  flex w-full items-center space-x-1 border-b-2 bg-white p-2`}>
        <p
          onClick={() => {
            navigate(ADMIN_USER_MANAGEMENT);
          }}
          className='statement-upper-medium cursor-pointer text-gray-700'>
          Users
        </p>
        <IconifyIcon icon={'material-symbols:arrow-forward-ios-rounded'} />
        <p className='statement-upper-medium'>Hung Phi Vo</p>
      </div>
      <div className={`${flex ? 'flex w-full items-start space-x-2' : ''} pt-[35px]`}>
        {/* <!--section --> */}
        <div className={`${flex ? 'w-1/4' : ''} border-2`}>
          <div className='flex  flex-col space-y-2 border-b-2 p-4'>
            <p className='flex bg-[#eee] p-1'>ADMIN</p>
            <div className='flex items-start  space-x-3'>
              <img
                className='w-[70px] rounded-full object-contain'
                src='https://student.hcmus.edu.vn/_next/image?url=%2Fhcmus-logo.png&w=384&q=75'
              />
              <div className='spacey-2'>
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
          className={`${flex ? 'max-h-[calc(100vh-115px)] w-3/4 overflow-y-auto' : ''}
        flex flex-col  space-y-4`}>
          <div className='w-full space-y-2 p-3  shadow-md'>
            <p className='statement-medium h4 '>Personal Dropbox space of Hung Vo Phi</p>
            <div className='flex w-full space-x-4 border-b-2  border-black p-3'>
              <div className=' flex items-center border-r-2 p-4'>
                <IconifyIcon icon={'ic:twotone-cloud'} fontSize={30} />
                <div className='ml-4 flex flex-col items-center'>
                  <p className='h4 text-gray-600'>Total Memory</p>
                  <p className='h3 statement-upper-medium text-green-500'>0 bytes</p>
                </div>
              </div>
              <div className='flex flex-col items-center p-4'>
                <p className='h4 text-gray-600'> Used Memory</p>
                <p className='h3 statement-upper-medium text-red-500'>2 bytes</p>
              </div>
              <div className='spasce-x-2 flex border-r-2'></div>
            </div>
            <div className='h-8 w-full bg-gray-200'></div>
            <div className='flex flex-wrap '>
              <div className=' mx-2 flex space-x-2'>
                <div className='flex h-8 w-8 items-center bg-slate-700'></div>
                <p>Regular files (0 bytes)</p>
              </div>
              <div className='mx-2 flex items-center space-x-2'>
                <div className='h-8 w-8 bg-blue-600'></div>
                <p>Shared files(0 bytes)</p>
              </div>
              <div className='mx-2 flex  items-center space-x-2'>
                <div className='h-8 w-8 bg-purple-800'></div>
                <p>Backup files (0 bytes)</p>
              </div>
            </div>
          </div>
          <div className='w-full space-y-2 p-3  shadow-md'>
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
