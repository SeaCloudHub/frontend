import { UserManagementInfoDto } from '../../apis/admin/user-management/dto/user-management-info.dto';
import { Column } from '../types/table-column.type';

export const userInfoColumns: Column<UserManagementInfoDto>[] = [
  {
    id: 'userId',
    label: 'User ID',
    align: 'center',
    minWidth: 100,
  },
  { id: 'name', label: 'Name', align: 'center', minWidth: 100 },
  { id: 'usedMemory', label: 'Memory Detail', align: 'center', minWidth: 50 },
  { id: 'lastAccess', label: 'Last Access', align: 'center', minWidth: 150 },
];
