import { useEffect, useState } from 'react';
import IconifyIcon from '../../..//components/core/Icon/IConCore';
import ButtonContainer from '../../../components/core/button/ButtonContainer';
import LinearChartBar from '../../../components/core/linear-chart-bar/linearChartBar';
import MenuCore from '../../../components/core/menu/MenuCore';
import PaginationCore from '../../../components/core/pagination/PaginationCore';
import TablePagination from '../../../components/core/table/TablePagination';
import { userInfoColumns } from '../../../utils/constants/userInfo-column.constant';
import { userInfo } from '../../../utils/dumps/userInfo.dump';
import { PagingState, initialPagingState } from '../../../utils/types/paging-stage.type';
import { UserInfo } from '../../../utils/types/user-Info.type';
import UserInfoPhoneMode from './user-management-phone/UserInfoPhoneMode';

const UserManagement = () => {
  const [paging, setPaging] = useState<PagingState>(initialPagingState);
  const [phoneMode, setPhoneMode] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => {
      setPhoneMode(window.innerWidth <= 500);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const renderCell: Record<string, (rowData: UserInfo) => React.ReactNode> = {
    usedMemory: (rowData: UserInfo) => <LinearChartBar value={rowData['usedMemory'] as number} total={100} width='100%' />,
  };

  return (
    <div className='flex w-full flex-col items-end space-y-5'>
      <div className={`${phoneMode ? 'fixed bottom-2 left-2 z-10 w-full' : ''}`}>
        <ButtonContainer tooltip={'Add user'} title='Add user' background='#063768' icon={<IconifyIcon icon={'gg:add'} />} />
      </div>
      {phoneMode && (
        <div className='flex w-full flex-col items-center space-y-3'>
          {userInfo.map((item, index) => (
            <UserInfoPhoneMode
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
      {!phoneMode && (
        <div className='w-full'>
          <TablePagination
            paging={paging}
            renderCell={renderCell}
            action
            Element={
              <MenuCore
                menuItems={[
                  { onClick: () => {}, title: 'Detail', icon: 'ep:view' },
                  { onClick: () => {}, title: 'Delete', icon: 'ion:trash-sharp' },
                  { onClick: () => {}, title: 'Block', icon: 'ic:round-block' },
                ]}
              />
            }
            columns={userInfoColumns}
            onPageChange={() => {}}
            data={userInfo}
          />
        </div>
      )}
    </div>
  );
};

export default UserManagement;
