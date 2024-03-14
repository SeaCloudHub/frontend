import { useNavigate } from 'react-router-dom';
import IconifyIcon from '../../../../components/core/Icon/IConCore';
import { ADMIN_USER_MANAGEMENT } from '../../../../utils/constants/router.constant';
import UserDetailAction from './components/action/UserDetailAction';

const UserManagementDetail = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='fixed left-[310px] top-[80px] z-10  flex w-full items-center space-x-1 border-b-2 bg-white p-2'>
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
      <div className={`flex items-start space-x-2 pt-[35px]`}>
        {/* <!--section --> */}
        <div className='border-2'>
          <div className='flex  flex-col space-y-2 border-b-2 p-3'>
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
        <div className='flexc-col flex space-y-1'>
          <div className='w-full p-3 shadow-md'>
            <p className='statement-upper-medium '>Personal Dropbox space of Hung Vo Phi</p>
            <div className='flex border-b-2    border-black'>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagementDetail;
