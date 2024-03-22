import Login from '../../pages/auth/Login';
import DashBoard from '../../pages/admin/dashboard/DashBoard';
import StorageManagement from '../../pages/admin/storage-management/StorageManagement';
import UserManagement from '../../pages/admin/user-management/UserManagement';
import Memory from '../../pages/user/memory/Memory';
import MyDrive from '@/pages/user/my-drive/MyDrive';
import Priority from '../../pages/user/priority/Priority';
import Shared from '../../pages/user/shared/Shared';
import Starred from '../../pages/user/starred/Starred';
import Trash from '../../pages/user/trash/Trash';

export const HOME = '/';
export const AUTH_HOME = '/auth';
export const ADMIN_HOME = '/admin';
export const CUSTOMER_HOME = '/customer';

/* Auth Routes */
export const AUTH_LOGIN = `${AUTH_HOME}/login`;
export const AUTH_TOS = `${AUTH_HOME}/tos`;
//Admin routes
export const ADMIN_USER_MANAGEMENT = `${ADMIN_HOME}/user-management`;
export const ADMIN_DASHBOARD = `${ADMIN_HOME}/dashboard`;
export const ADMIN_STORAGE_MANAGEMENT = `${ADMIN_HOME}/storage-management`;
//customer routes
export const CUSTOMER_SHARED = `${CUSTOMER_HOME}/shared`;
export const CUSTOMER_PRIORITY = `${CUSTOMER_HOME}/priority`;
export const CUSTOMER_MY_DRIVE = `${CUSTOMER_HOME}/my-drive`;
export const CUSTOMER_STARRED = `${CUSTOMER_HOME}/starred`;
export const CUSTOMER_TRASH = `${CUSTOMER_HOME}/trash`;
export const CUSTOMER_MEMORY = `${CUSTOMER_HOME}/memory`;

export const routes = {
  auth: [{ path: AUTH_LOGIN, component: Login }],
  admin: [
    { path: ADMIN_HOME, component: DashBoard },
    { path: ADMIN_USER_MANAGEMENT, component: UserManagement },
    { path: ADMIN_DASHBOARD, component: DashBoard },
    { path: ADMIN_STORAGE_MANAGEMENT, component: StorageManagement },
  ],
  customer: [
    { path: CUSTOMER_HOME, component: Priority },
    { path: CUSTOMER_SHARED, component: Shared },
    { path: CUSTOMER_PRIORITY, component: Priority },
    { path: CUSTOMER_MY_DRIVE, component: MyDrive },
    { path: CUSTOMER_STARRED, component: Starred },
    { path: CUSTOMER_TRASH, component: Trash },
    { path: CUSTOMER_MEMORY, component: Memory },
  ],
};
