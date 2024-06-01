import { paginationRESPToDto } from '@/apis/shared/shared.service';
import IconifyIcon from '@/components/core/Icon/IConCore';
import ButtonContainer from '@/components/core/button/ButtonContainer';
import MenuCore from '@/components/core/menu/MenuCore';
import ModalAddUserSuccess, { AuthInfo } from '@/components/core/modal/ModalAddUserSuccess';
import ModalConfirmBlockOrUnBlock from '@/components/core/modal/ModalBlockConfirm';
import ModalConfirmDelete from '@/components/core/modal/ModalConfirmDelete';
import { numToSize } from '@/utils/function/numbertToSize';
import { BlockOutlined, DeleteOutline, SettingsApplications, ViewDayOutlined } from '@mui/icons-material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Card, Dropdown, Menu, Pagination, Table } from 'antd';
import { isAxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserManagementInfoDto } from '../../../apis/admin/user-management/dto/user-management-info.dto';
import { ImportExcelREQ } from '../../../apis/admin/user-management/request/add-user-excel.request';
import { downloadTemplateCSV, getIdentititesApi, importExcelApi } from '../../../apis/admin/user-management/user-management.api';
import { getIdentitiesRESToUserManagementInfoDto } from '../../../apis/admin/user-management/user-management.service';
import LinearChartBar from '../../../components/core/linear-chart-bar/linearChartBar';
import { MenuItemCoreProps } from '../../../components/core/menu/MenuItem';
import ModalAddUser from '../../../components/core/modal/ModalAddUser';
import ModalChooseFile from '../../../components/core/modal/ModalChooseFile';
import { useScreenMode } from '../../../store/responsive/screenMode';
import { ScreenMode } from '../../../utils/enums/screen-mode.enum';
import { getFirstCharacters } from '../../../utils/function/getFirstCharacter';
import { getRandomColor } from '../../../utils/function/getRandomColor';
import { toastError } from '../../../utils/toast-options/toast-options';
import { ApiGenericError } from '../../../utils/types/api-generic-error.type';
import { PagingState, initialPagingState } from '../../../utils/types/paging-stage.type';
import './UserManagement.css';
import UserManagementFilter from './UserManagementFilter';

type ModalState = {
  isOpen: boolean;
  name: string;
};
const initModalsState: ModalState[] = [
  { isOpen: false, name: 'MANUAL' },
  { isOpen: false, name: 'IMPORT' },
];

const UserManagement = () => {
  const [modals, changeModalsState] = useState<ModalState[]>(initModalsState);
  const [paging, setPaging] = useState<PagingState>(initialPagingState);
  const screenMode = useScreenMode((state) => state.screenMode);
  const shrinkMode = useScreenMode((state) => state.shrinkMode);
  const containerRef = useRef<HTMLDivElement>(null);
  const [keyword, setKeyword] = useState('');
  const addUserOptions: MenuItemCoreProps[] = [
    {
      icon: 'icon-park:add-one',
      title: 'Manual',
      onClick: () => {
        changeModalsState((prevModals) =>
          prevModals.map((modal) => (modal.name === 'MANUAL' ? { ...modal, isOpen: true } : modal)),
        );
      },
    },
    {
      icon: 'grommet-icons:document-csv',
      title: 'Import from CSV',
      onClick: () => {
        changeModalsState((prevModals) =>
          prevModals.map((modal) => (modal.name === 'IMPORT' ? { ...modal, isOpen: true } : modal)),
        );
      },
    },
    {
      icon: 'flat-color-icons:download',
      title: 'Download template excel',
      onClick: async () => {
        try {
          const res = await downloadTemplateCSV();
          const blob = new Blob([res.data], { type: res.headers['content-type'] });
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.setAttribute('download', `template.csv`);
          link.click();
          URL.revokeObjectURL(blobUrl);
        } catch (error) {
          if (isAxiosError<ApiGenericError>(error)) {
            toast.error(error.response?.data.message, toastError());
          }
        }
      },
    },
  ];
  const [authInfo, setAuthInfo] = useState<AuthInfo[]>([]);
  const [addSuccess, setAddSuccess] = useState(false);
  const [blockModal, setBlockModal] = useState(false);
  const [block, setBlock] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, error } = useQuery({
    queryKey: ['get-identities', paging.size, paging.page, keyword],
    queryFn: () => getIdentititesApi({ limit: paging.size, page: paging.page, keyword: keyword }),
    staleTime: 0,
    select: (data) => {
      if (data) {
        return {
          paging: paginationRESPToDto(data.pagination),
          identitiesDto: data.identities.map((user) => getIdentitiesRESToUserManagementInfoDto(user) as UserManagementInfoDto),
        };
      } else {
        return null;
      }
    },
  });
  useEffect(() => {
    if (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    }
    if (data) {
      setPaging(data.paging);
    }
  }, [error, data]);

  const onCloseModalClick = (modalType: string) => {
    changeModalsState((prevModals) => {
      const updatedModals = prevModals.map((modal) => {
        if (modal.name === modalType) {
          return { ...modal, isOpen: false };
        }
        return modal;
      });
      return updatedModals;
    });
  };
  const uploadCSVMutation = useMutation({
    mutationFn: (body: ImportExcelREQ) => {
      return importExcelApi(body);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: (data) => {
      setAddSuccess(true);
      setAuthInfo(data.data);
      queryClient.invalidateQueries({ queryKey: ['get-identities', paging.size, paging.page] });
    },
  });
  const [user, setUser] = useState<UserManagementInfoDto | null>(null);
  const handlePageChange = (page: number) => {
    setPaging((prev) => ({ ...prev, page: page }));
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'userId',
      key: 'userId',
      render: (userId: string, record: UserManagementInfoDto, index: number) => {
        return <p className='statement-medium'>{index + 1}</p>;
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: UserManagementInfoDto) => {
        return (
          <div className='flex items-center space-x-5'>
            {record.avatar && <img className='h-[50px] w-[50px] rounded-full object-contain' src={record.avatar} />}
            {!record.avatar && (
              <div
                className='round flex h-[50px] w-[50px] items-center justify-center rounded-full'
                style={{ backgroundColor: getRandomColor() }}>
                <p className='statement-bold truncate'>{getFirstCharacters(name)}</p>
              </div>
            )}
            <p className='statement-medium'>{name}</p>
          </div>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (name: string, record: UserManagementInfoDto) => {
        return (
          <div className='flex items-center space-x-3 '>
            <div className={`h-2 w-2  rounded-full ${record.isBlocked ? 'bg-red-600' : 'bg-green-600'} font-bold`}></div>
            <p>{record.isBlocked ? 'Blocked' : 'Active'}</p>
          </div>
        );
      },
    },
    {
      title: 'Memory Detail',
      dataIndex: 'usedMemory',
      key: 'usedMemory',
      render: (usedMemory: number, record: UserManagementInfoDto) => (
        <div className='h-full w-full cursor-pointer' title={`${numToSize(record.usedMemory)}/${numToSize(record.totalMemory)}`}>
          <LinearChartBar value={usedMemory} total={record['totalMemory'] as number} width='100%' />
        </div>
      ),
    },
    {
      title: 'Last Access',
      dataIndex: 'lastAccess',
      key: 'lastAccess',
    },

    {
      title: 'Actions',
      dataIndex: 'userId',
      key: 'actions',
      render: (userId: string, user: UserManagementInfoDto) => {
        return user.isAdmin ? (
          <></>
        ) : (
          <Dropdown
            key={userId}
            trigger={['click']}
            overlay={
              <Menu>
                <Menu.Item icon={<ViewDayOutlined />} onClick={() => navigate(userId)}>
                  View
                </Menu.Item>
                <Menu.Item
                  icon={<DeleteOutline />}
                  onClick={() => {
                    setUser(user);
                    setDeleteModal(true);
                  }}>
                  Delete
                </Menu.Item>
                {!user.isBlocked && (
                  <Menu.Item
                    icon={<BlockOutlined />}
                    onClick={() => {
                      setUser(user);
                      setBlock(true);
                      setBlockModal(true);
                    }}>
                    Block
                  </Menu.Item>
                )}
                {user.isBlocked && (
                  <Menu.Item
                    icon={<LockOpenIcon />}
                    onClick={() => {
                      setUser(user);
                      setBlock(false);
                      setBlockModal(true);
                    }}>
                    Un-Block
                  </Menu.Item>
                )}
              </Menu>
            }
            placement='bottomLeft'>
            <Button type='dashed'>
              <div className='flex h-full items-center'>
                <SettingsApplications />
                Actions
              </div>
            </Button>
          </Dropdown>
        );
      },
    },
  ];
  const onSearchClick = (keyword: string) => {
    setKeyword(keyword);
  };
  return (
    <div ref={containerRef} className='flex h-full w-full flex-col space-y-5 overflow-y-auto'>
      {addSuccess && (
        <ModalAddUserSuccess
          data={authInfo}
          single={false}
          isOpen={true}
          handleConfirm={function (data?: any): void {
            setAddSuccess(false);
          }}
        />
      )}
      <div className={`z-10 mt-2 w-full space-y-2 ${screenMode == ScreenMode.MOBILE ? 'fixed bottom-2 left-1/4  ' : ''}`}>
        <div className='mx-5'>
          <UserManagementFilter handleSearch={onSearchClick} />
        </div>
        <div className={`${shrinkMode ? 'shrink-mode' : 'none-shrink-mode'} ' '  mx-5  flex bg-white dark:bg-transparent`}>
          <MenuCore menuItems={addUserOptions}>
            <ButtonContainer
              color='063768'
              tooltip={'Add user'}
              title='Add user'
              background='#063768'
              icon={<IconifyIcon icon={'gg:add'} />}
            />
          </MenuCore>
          <ModalChooseFile
            fileIcon='grommet-icons:document-csv'
            fileType='.csv'
            isOpen={modals.find((modal) => modal.name === 'IMPORT')?.isOpen || false}
            handleConfirm={(data?: File) => {
              data && uploadCSVMutation.mutateAsync({ file: data! });
              onCloseModalClick('IMPORT');
            }}
          />
          <ModalAddUser
            title='Add User'
            isOpen={modals.find((modal) => modal.name === 'MANUAL')?.isOpen || false}
            handleConfirm={(data) => {
              if (data) {
                queryClient.invalidateQueries({ queryKey: ['get-identities', paging.size, paging.page] });
              }
              onCloseModalClick('MANUAL');
            }}
          />
        </div>
      </div>

      <Card className='mx-5 dark:border-none ' loading={data == null}>
        {data && (
          <>
            <Table
              dataSource={data.identitiesDto}
              columns={columns}
              bordered={true}
              pagination={false}
              rowKey={(record) => record.userId}
            />

            <Pagination
              current={data.paging.page}
              pageSize={data.paging.size}
              total={data.paging.count}
              onChange={handlePageChange}
              style={{ marginTop: 16, textAlign: 'right' }}
            />
          </>
        )}
      </Card>
      {deleteModal && (
        <ModalConfirmDelete
          message={'Do you want to delete this user ?'}
          title={'Delete ' + user.name}
          isOpen={true}
          user={user}
          handleConfirm={(data: boolean) => {
            if (data) {
              queryClient.invalidateQueries({ queryKey: ['get-identities', paging.size, paging.page] });
            }
            setDeleteModal(false);
          }}
        />
      )}
      {blockModal && (
        <ModalConfirmBlockOrUnBlock
          message={block ? 'Do you want to block this user ?' : 'Do you want to un-block this user ?'}
          title={block ? 'Block '+user.name : 'Un-block ' + user.name}
          isOpen={true}
          user={user}
          isBlock={block}
          handleConfirm={(data: boolean) => {
            if (data) {
              queryClient.invalidateQueries({ queryKey: ['get-identities', paging.size, paging.page] });
            }
            setBlockModal(false);
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;
