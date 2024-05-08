import { paginationRESPToDto } from '@/apis/shared/shared.service';
import { BlockOutlined, DeleteOutline, EditOutlined, SettingsApplications, ViewDayOutlined } from '@mui/icons-material';
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
import IconifyIcon from '../../../components/core/Icon/IConCore';
import ButtonContainer from '../../../components/core/button/ButtonContainer';
import LinearChartBar from '../../../components/core/linear-chart-bar/linearChartBar';
import MenuCore from '../../../components/core/menu/MenuCore';
import { MenuItemCoreProps } from '../../../components/core/menu/MenuItem';
import ModalAddUser from '../../../components/core/modal/ModalAddUser';
import ModalChooseFile from '../../../components/core/modal/ModalChooseFile';
import { useScreenMode } from '../../../store/responsive/screenMode';
import { ScreenMode } from '../../../utils/enums/screen-mode.enum';
import { getFirstCharacters } from '../../../utils/function/getFirstCharacter';
import { getRandomColor } from '../../../utils/function/getRandomColor';
import { toastError, toastSuccess } from '../../../utils/toast-options/toast-options';
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
  const [scrollable, setScrollable] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, error } = useQuery({
    queryKey: ['get-identities', paging.size, paging.page],
    queryFn: () => getIdentititesApi({ limit: paging.size, page: paging.page }),
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
      console.log(`Set paging:: ${JSON.stringify(data.paging)}`);
      setPaging(data.paging);
    }
  }, [error, data]);
  useEffect(() => {
    const handleScroll = () => {
      if (
        containerRef.current &&
        containerRef.current.scrollTop > filterRef.current.offsetHeight &&
        filterRef.current.offsetHeight !== 0
      ) {
        setScrollable(true);
      } else if (
        !(screenMode === ScreenMode.MOBILE) &&
        containerRef.current &&
        containerRef.current.scrollTop === filterRef.current.offsetHeight
      ) {
        setScrollable(false);
      }
    };
    if (!(screenMode == ScreenMode.MOBILE)) {
      containerRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      containerRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    if (screenMode == ScreenMode.MOBILE) {
      setScrollable(true);
    }
  }, [screenMode]);
  const onFilterClick = () => {
    if (screenMode == ScreenMode.MOBILE) {
      //pop-up dialog for choose filter
    } else {
      setScrollable(false);
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
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
      toast.success('Create user successfully', toastSuccess());
    },
  });
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
      title: 'Memory Detail',
      dataIndex: 'usedMemory',
      key: 'usedMemory',
      render: (usedMemory: number, record: UserManagementInfoDto) => (
        <LinearChartBar value={usedMemory} total={record['totalMemory'] as number} width='100%' />
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
      render: (userId: string) => {
        return (
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu>
                <Menu.Item icon={<ViewDayOutlined />} onClick={() => navigate(userId)}>
                  View
                </Menu.Item>
                <Menu.Item icon={<EditOutlined />} onClick={() => {}}>
                  Edit
                </Menu.Item>
                <Menu.Item icon={<DeleteOutline />} onClick={() => {}}>
                  Delete
                </Menu.Item>
                <Menu.Item icon={<BlockOutlined />} onClick={() => {}}>
                  Block
                </Menu.Item>
              </Menu>
            }
            placement='bottomLeft'>
            <Button type='dashed' icon={<SettingsApplications />}>
              Actions
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div ref={containerRef} className='flex h-full w-full flex-col space-y-5 overflow-y-auto'>
      <div
        ref={filterRef}
        className={`z-10 mt-2 w-full space-y-2 ${screenMode == ScreenMode.MOBILE ? 'fixed bottom-2 left-1/4  ' : ''}`}>
        {!scrollable && (
          <div className='mx-5'>
            <UserManagementFilter />
          </div>
        )}
        <div
          className={`${shrinkMode ? 'shrink-mode' : 'none-shrink-mode'} ${scrollable ? ' fixed  top-[4.3rem] mx-auto flex w-full  bg-white dark:bg-transparent ' : ''} mx-5`}>
          {scrollable && (
            <div className='mx-5'>
              <ButtonContainer
                color='063768'
                onClick={onFilterClick}
                tooltip={'Filter'}
                title='Filter'
                background='#063768'
                icon={<IconifyIcon icon={'ant-design:filter-twotone'} />}
              />
            </div>
          )}
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
              className='bg-white '
            />
          </>
        )}
      </Card>
    </div>
  );
};

export default UserManagement;
