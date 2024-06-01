import { Skeleton, Tooltip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getUserDetailApi } from '@/apis/admin/user-management/user-management.api';
import { getIdentitiesRESToUserManagementInfoDto } from '@/apis/admin/user-management/user-management.service';
import ModalConfirmBlockOrUnBlock from '@/components/core/modal/ModalBlockConfirm';
import ModalConfirmDelete from '@/components/core/modal/ModalConfirmDelete';
import ModalResetPasswordConfirm from '@/components/core/modal/ModalResetPasswordConfirm';
import ModalUpdateUser from '@/components/core/modal/ModalUpdateUser';
import ModifyMemoryPopUp from '@/components/core/pop-up/ModifyMemoryPopUp';
import { ScreenMode } from '@/utils/enums/screen-mode.enum';
import { getFirstCharacters } from '@/utils/function/getFirstCharacter';
import { getRandomColor } from '@/utils/function/getRandomColor';
import IconifyIcon from '../../../../components/core/Icon/IConCore';
import { useScreenHook } from '../../../../hooks/useScreenHook';
import { useScreenMode } from '../../../../store/responsive/screenMode';
import { ADMIN_USER_MANAGEMENT } from '../../../../utils/constants/router.constant';
import StorageStatistic from '../../shared/StorageStatistic';
import UserDetailAction from './components/action/UserDetailAction';
import FileFolderFilter from './components/file-folder-detail/FileFolderFilter';

const UserManagementDetail = () => {
  const navigate = useNavigate();
  const { screenMode, shrinkMode } = useScreenMode();
  const flex = !useScreenHook(1024);
  const divRef = useRef<HTMLDivElement>(null);
  const [divHeight, setDivHeight] = useState<number | null>(null);
  const location = useLocation();
  const userId = useMemo(() => {
    const lastSlashIndex = location.pathname.lastIndexOf('/');
    return location.pathname.substring(lastSlashIndex + 1);
  }, [location]);

  useEffect(() => {
    if (divRef.current) {
      const height = divRef.current.clientHeight;
      setDivHeight(height);
    }
  }, []);

  const [deleteModal, setDeleteModal] = useState(false);
  const [blockModal, setBlockModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const [isBlocked, setBlocked] = useState(false);

  const [modify, setModify] = useState(false);
  const {
    data: identityData,
    error: identityError,
    isFetching: identityFetching,
  } = useQuery({
    queryKey: ['user-details', userId],
    queryFn: () => getUserDetailApi({ identity_id: userId }),
    staleTime: 0,
  });

  const userDto = useMemo(() => {
    if (identityData) {
      setBlocked(identityData.blocked_at == null);
      return getIdentitiesRESToUserManagementInfoDto(identityData);
    }
    return null;
  }, [identityData]);

  return (
    <div className='h-full w-full overflow-y-auto overflow-x-hidden'>
      <div
        ref={divRef}
        className={`fixed ${screenMode != ScreenMode.DESKTOP ? 'left-0' : shrinkMode ? 'left-[76px]' : ' left-[16rem]'} top-[4rem] z-20 flex w-full items-center space-x-1 bg-white px-3 py-1 dark:bg-content-bg-dark`}>
        <p onClick={() => navigate(ADMIN_USER_MANAGEMENT)} className='statement-upper-medium cursor-pointer'>
          Users
        </p>
        <IconifyIcon fontSize={15} icon={'material-symbols:arrow-forward-ios-rounded'} />
        <p className='statement-upper-medium'>{userDto && userDto.name}</p>
      </div>
      <div className={`${flex ? 'flex h-full w-full items-start space-x-2' : 'overflow-y-auto'} pt-[28px]`}>
        {/* Sidebar Section */}
        <div className={`${flex ? 'w-1/4' : ''} border-2`}>
          <div className='flex flex-col space-y-2 border-b-2 p-4'>
            <p className='flex bg-[#eee] p-1 font-semibold dark:bg-blue-200 dark:text-black'>
              {identityFetching ? <Skeleton width={40} /> : identityData && identityData.is_admin ? 'ADMIN' : 'USER'}
            </p>
            <div className='flex items-start space-x-3'>
              {identityFetching ? (
                <Skeleton variant='circular' width={70} height={70} />
              ) : identityData && identityData.avatar_url ? (
                <img
                  className='h-[70px] w-[70px] rounded-full object-contain'
                  src={import.meta.env.VITE_BACKEND_API + identityData.avatar_url}
                />
              ) : (
                identityData &&
                !identityData.avatar_url && (
                  <div
                    className='flex h-[70px] w-[70px] items-center justify-center rounded-full border-2 border-red-300'
                    style={{ backgroundColor: getRandomColor() }}>
                    <p className='statement-bold truncate'>{getFirstCharacters(userDto.name)}</p>
                  </div>
                )
              )}
              <div className='space-y-2 overflow-hidden'>
                <Tooltip title={userDto?.name}>
                  <p className='statement-upper-medium h3 truncate'>
                    {identityFetching ? <Skeleton width='80%' /> : identityData && userDto.name}
                  </p>
                </Tooltip>
                <Tooltip title={identityData?.email}>
                  <p className='statement-medium truncate'>
                    {identityFetching ? <Skeleton width='80%' /> : identityData && identityData.email}
                  </p>
                </Tooltip>
                <ul>
                  <li className={`${identityData && !isBlocked ? 'text-red-600' : 'text-green-500'}`}>
                    {identityFetching ? <Skeleton width={50} /> : identityData && !isBlocked ? 'Blocked' : 'Active'}
                  </li>
                  <li>
                    Last signed at:{' '}
                    {identityFetching ? (
                      <Skeleton width={100} />
                    ) : (
                      identityData && identityData.last_sign_in_at && dayjs(identityData.last_sign_in_at).format('YYYY-MM-DD')
                    )}
                  </li>
                  <li>
                    Created at:{' '}
                    {identityFetching ? (
                      <Skeleton width={150} />
                    ) : (
                      identityData && identityData.created_at && dayjs(identityData.created_at).format('YYYY-MM-DD HH:mm:ss')
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='flex flex-col border-b-2 p-3'>
            <UserDetailAction
              title='RESET PASSWORD'
              onClick={() => {
                setResetModal(true);
              }}
              icon={<IconifyIcon icon='tabler:password' />}
            />
            {resetModal && (
              <ModalResetPasswordConfirm
                user_id={identityData.id}
                message={`Do you want to reset password for this user?`}
                title={'Reset password'}
                isOpen={true}
                handleConfirm={() => setResetModal(false)}
              />
            )}
            <UserDetailAction
              title='UPDATE USER'
              onClick={() => {
                setUpdateModal(true);
              }}
              icon={<IconifyIcon icon='tabler:user-edit' />}
            />
            {updateModal && (
              <ModalUpdateUser
                user={identityData}
                title={'Update User'}
                isOpen={true}
                handleConfirm={() => setUpdateModal(false)}
              />
            )}
            <UserDetailAction
              title={isBlocked ? 'BLOCK USER' : 'UN-BLOCK USER'}
              onClick={() => {
                setBlockModal(true);
              }}
              icon={<IconifyIcon icon='tabler:user-cancel' />}
            />
            {blockModal && (
              <ModalConfirmBlockOrUnBlock
                isBlock={isBlocked}
                user={userDto}
                message={isBlocked ? 'Do you want to block this user ?' : 'Do you want to un-block this user ?'}
                title={isBlocked ? 'Block ' + userDto.name : 'Un-block ' + userDto.name}
                isOpen={true}
                handleConfirm={(data?: boolean) => {
                  if (data) {
                    setBlocked((prev) => !prev);
                  }
                  setBlockModal(false);
                }}
              />
            )}
            <UserDetailAction
              title='DELETE USER'
              onClick={() => {
                setDeleteModal(true);
              }}
              icon={<IconifyIcon icon='tabler:user-x' />}
            />
            {deleteModal && (
              <ModalConfirmDelete
                user={userDto}
                message={'Do you want to delete this User ?'}
                title={'Delete ' + userDto.name}
                isOpen={true}
                handleConfirm={(data?: boolean) => {
                  setDeleteModal(false);
                  if (data) {
                    navigate(ADMIN_USER_MANAGEMENT);
                  }
                }}
              />
            )}
            <UserDetailAction
              icon={<IconifyIcon icon='tabler:edit' />}
              title='MODIFY MEMORY'
              onClick={() => {
                setModify(true);
              }}
            />
            {modify && <ModifyMemoryPopUp open={modify} onClose={() => setModify(false)} identity_id={userId} />}
          </div>
        </div>

        <div className={`flex h-full flex-col space-y-4 overflow-y-auto pb-2 ${flex ? 'w-3/4' : ''}`}>
          <div className='w-full space-y-2 border p-3 shadow-md'>
            <p className='statement-medium h4'>{`Personal storage space of ${identityFetching ? <Skeleton width='60%' /> : identityData && userDto.name}`}</p>
            {identityFetching ? (
              <Skeleton variant='rectangular' width='100%' height={118} />
            ) : (
              <StorageStatistic
                totalMemory={identityData ? identityData.storage_capacity : 0}
                usedMemory={identityData ? identityData.storage_usage : 0}
              />
            )}
          </div>
          {/* <div className='z-0 w-full space-y-2 p-3 shadow-md'>
            <ButtonContainer title='Modify memory' icon={<IconifyIcon icon={'tabler:edit'} />} />
          </div> */}
          <div className='mr-2 rounded-xl border pl-3 shadow-xl dark:bg-[#031525] dark:text-white'>
            <FileFolderFilter userDTO={userDto} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementDetail;
