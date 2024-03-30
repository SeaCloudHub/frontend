import ModalAddUser from '@/components/core/modal/ModalAddUser';
import { useEffect, useRef, useState } from 'react';
import IconifyIcon from '../../../components/core/Icon/IConCore';
import ButtonContainer from '../../../components/core/button/ButtonContainer';
import LinearChartBar from '../../../components/core/linear-chart-bar/linearChartBar';
import MenuCore from '../../../components/core/menu/MenuCore';
import PaginationCore from '../../../components/core/pagination/PaginationCore';
import TablePagination from '../../../components/core/table/TablePagination';
import { useScreenMode } from '../../../store/responsive/screenMode';
import { userInfoColumns } from '../../../utils/constants/userInfo-column.constant';
import { userInfo } from '../../../utils/dumps/userInfo.dump';
import { ScreenMode } from '../../../utils/enums/screen-mode.enum';
import { PagingState, initialPagingState } from '../../../utils/types/paging-stage.type';
import { UserInfo } from '../../../utils/types/user-Info.type';
import './UserManagement.css';
import UserManagementFilter from './UserManagementFilter';
import UserInfoPhoneMode from './user-management-phone/UserInfoPhoneMode';

const UserManagement = () => {
  const [openModal, setOpenModal] = useState(false);
  const [paging, setPaging] = useState<PagingState>(initialPagingState);
  const screenMode = useScreenMode((state) => state.screenMode);
  const shrinkMode = useScreenMode((state) => state.shrinkMode);
  const [scrollable, setScrollable] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (screenMode == ScreenMode.MOBILE) {
      setScrollable(true);
    }
  }, [screenMode]);

  const renderCell: Record<string, (rowData: UserInfo) => React.ReactNode> = {
    usedMemory: (rowData: UserInfo) => <LinearChartBar value={rowData['usedMemory'] as number} total={100} width='100%' />,
    name: (rowData: UserInfo) => (
      <div className='flex items-center space-x-5'>
        <img className='max-w-[60px] rounded-full object-contain' src={rowData['avatar'] as string} />
        <p className='statement-medium'>{rowData['name'] as string}</p>
      </div>
    ),
  };

  useEffect(() => {
    const handleScroll = () => {
      if (filterRef.current && window.scrollY > filterRef.current.offsetHeight && filterRef.current.offsetHeight != 0) {
        setScrollable(true);
      } else if (!(screenMode == ScreenMode.MOBILE) && filterRef.current && window.scrollY == filterRef.current.offsetHeight) {
        setScrollable(false);
      }
    };
    if (!(screenMode == ScreenMode.MOBILE)) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onFilterClick = () => {
    if (screenMode == ScreenMode.MOBILE) {
      //pop-up dialog for choose filter
    } else {
      setScrollable(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const onCloseModalClick = (data: boolean) => {
    if (data) {
      console.log(data);
    }
    setOpenModal(false);
  };
  return (
    <div className='flex w-full flex-col items-end space-y-5'>
      <div
        ref={filterRef}
        className={`z-10 w-full space-y-2 ${screenMode == ScreenMode.MOBILE ? 'fixed bottom-2 left-1/4  ' : ''}`}>
        {!scrollable && <UserManagementFilter />}

        <div
          className={`${shrinkMode ? 'shrink-mode' : 'none-shrink-mode'} ${scrollable ? ' fixed  top-[80px] mx-auto w-full space-x-2 bg-white py-1' : ''}`}>
          {scrollable && (
            <ButtonContainer
              color='063768'
              onClick={onFilterClick}
              tooltip={'Filter'}
              title='Filter'
              background='#063768'
              icon={<IconifyIcon icon={'ant-design:filter-twotone'} />}
            />
          )}
          <ButtonContainer
            color='063768'
            tooltip={'Add user'}
            title='Add user'
            background='#063768'
            onClick={() => {
              setOpenModal(true);
            }}
            icon={<IconifyIcon icon={'gg:add'} />}
          />
          <ModalAddUser title='Add User' isOpen={openModal} handleConfirm={onCloseModalClick} />
        </div>
      </div>
      {screenMode == ScreenMode.MOBILE && (
        <div className='flex w-full flex-col items-center space-y-3'>
          {userInfo.map((item, index) => (
            <UserInfoPhoneMode
              avatar={item.avatar}
              key={index}
              lastAccess={item.lastAccess}
              usedMemory={item.usedMemory}
              userId={item.userId}
              name={item.name}
            />
          ))}
          <PaginationCore currentPage={paging.page} onPageChange={() => {}} totalPage={paging.totalPage} size='small' />
        </div>
      )}
      {!(screenMode == ScreenMode.MOBILE) && (
        <>
          <div className='w-full'>
            <TablePagination
              paging={paging}
              renderCell={renderCell}
              action
              Element={
                <MenuCore
                  menuItems={[
                    { onClick: () => {}, title: 'Detail', icon: 'ep:view' },
                    { onClick: () => {}, title: 'Edit', icon: 'tabler:edit' },
                    {
                      onClick: () => {},
                      title: 'Delete',
                      icon: 'ion:trash-sharp',
                    },
                    {
                      onClick: () => {},
                      title: 'Block',
                      icon: 'ic:round-block',
                    },
                  ]}
                />
              }
              columns={userInfoColumns}
              onPageChange={() => {}}
              data={userInfo}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;
