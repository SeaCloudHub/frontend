import { useMutation, useQuery } from '@tanstack/react-query';
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
import PaginationCore from '../../../components/core/pagination/PaginationCore';
import TablePagination from '../../../components/core/table/TablePagination';
import { useScreenMode } from '../../../store/responsive/screenMode';
import { userInfoColumns } from '../../../utils/constants/userInfo-column.constant';
import { ScreenMode } from '../../../utils/enums/screen-mode.enum';
import { getFirstCharacters } from '../../../utils/function/getFirstCharacter';
import { getRandomColor } from '../../../utils/function/getRandomColor';
import { toastError, toastSuccess } from '../../../utils/toast-options/toast-options';
import { ApiGenericError } from '../../../utils/types/api-generic-error.type';
import { PagingState, initialPagingState } from '../../../utils/types/paging-stage.type';
import './UserManagement.css';
import UserManagementFilter from './UserManagementFilter';
import UserInfoPhoneMode from './user-management-phone/UserInfoPhoneMode';

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
  const [pageToken, setPageToken] = useState<null | string>(null);
  const screenMode = useScreenMode((state) => state.screenMode);
  const shrinkMode = useScreenMode((state) => state.shrinkMode);
  const [scrollable, setScrollable] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (screenMode == ScreenMode.MOBILE) {
      setScrollable(true);
    }
  }, [screenMode]);
  const navigate = useNavigate();
  const renderCell: Record<string, (rowData: UserManagementInfoDto) => React.ReactNode> = {
    usedMemory: (rowData: UserManagementInfoDto) => (
      <LinearChartBar value={rowData['usedMemory'] as number} total={100} width='100%' />
    ),
    name: (rowData: UserManagementInfoDto) => (
      <div className='flex items-center space-x-5'>
        {rowData.avatar && <img className='h-[50px] w-[50px] rounded-full object-contain' src={rowData['avatar'] as string} />}
        {!rowData.avatar && (
          <div
            className='round flex h-[50px] w-[50px] items-center justify-center rounded-full'
            style={{ backgroundColor: getRandomColor() }}>
            <p className='statement-bold truncate'>{getFirstCharacters(rowData.name || '')}</p>
          </div>
        )}
        <p className='statement-medium'>{rowData['name'] as string}</p>
      </div>
    ),
  };
  const { data, error } = useQuery({
    queryKey: ['get-identities'],
    queryFn: () => getIdentititesApi({ page_size: 20, page_token: pageToken }),
    select: (data) => {
      if (data) {
        return data.identities.map((user) => getIdentitiesRESToUserManagementInfoDto(user) as UserManagementInfoDto);
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
  }, [error]);

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
      console.log(data.data);
      toast.success('Create user successfully', toastSuccess());
    },
  });
  return (
    <div className='flex w-full flex-col items-end space-y-5'>
      <div
        ref={filterRef}
        className={`z-10 w-full space-y-2 ${screenMode == ScreenMode.MOBILE ? 'fixed bottom-2 left-1/4  ' : ''}`}>
        {!scrollable && <UserManagementFilter />}

        <div
          className={`${shrinkMode ? 'shrink-mode' : 'none-shrink-mode'} ${scrollable ? ' fixed  top-[80px] mx-auto flex w-full space-x-2 bg-white py-1' : ''}`}>
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
            handleConfirm={() => onCloseModalClick('MANUAL')}
          />
        </div>
      </div>
      {screenMode == ScreenMode.MOBILE && data && (
        <div className='flex w-full flex-col items-center space-y-3'>
          {data &&
            data.map((item, index) => (
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
      {!(screenMode == ScreenMode.MOBILE) && data && (
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
              data={data}
              onClick={(user: UserManagementInfoDto) => {
                navigate(user.userId!);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;
