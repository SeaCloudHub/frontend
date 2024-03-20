import LoginEmail from '../../pages/auth/LoginEmail';
import DashBoard from '../../pages/admin/dashboard/DashBoard';
import StorageManagement from '../../pages/admin/storage-management/StorageManagement';
import UserManagement from '../../pages/admin/user-management/UserManagement';
import Register from '../../pages/auth/Signup';
import Memory from '../../pages/user/memory/Memory';
import MyDrive from '../../pages/user/my-drive/MyDrive';
import Priority from '../../pages/user/priority/Priority';
import Shared from '../../pages/user/shared/Shared';
import Starred from '../../pages/user/starred/Starred';
import Trash from '../../pages/user/trash/Trash';
import LoginPassword from '../../pages/auth/LoginPassword';
import ChangePassword from '../../pages/auth/ChangePassword';
import ResetPassword from '../../pages/auth/ResetPassword';

export const HOME = '/';
export const AUTH_HOME = '/auth';
export const ADMIN_HOME = '/admin';
export const CUSTOMER_HOME = '/customer';

/* Auth Routes */
export const AUTH_LOGIN_EMAIL = `${AUTH_HOME}/login/identifier`;
export const AUTH_LOGIN_PASSWORD = `${AUTH_HOME}/login/challenge`;
export const AUTH_FORGOT_PASSWORD = `${AUTH_HOME}/forgot-password`;
export const AUTH_RESET_PASSWORD = `${AUTH_HOME}/reset-password`;
export const AUTH_CHANGE_PASSWORD = `${AUTH_HOME}/change-password`;

export const AUTH_LOGIN = `${AUTH_HOME}/login`;
export const SIGN_UP = `${AUTH_HOME}/signup`;
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
  auth: [
    { path: AUTH_LOGIN_EMAIL, component: LoginEmail },
    { path: AUTH_LOGIN_PASSWORD, component: LoginPassword },
    { path: SIGN_UP, component: Register },
    // { path: AUTH_FORGOT_PASSWORD, component: Register },
    // { path: AUTH_RESET_PASSWORD, component: Register },
    { path: AUTH_CHANGE_PASSWORD, component: ChangePassword },
    { path: AUTH_RESET_PASSWORD, component: ResetPassword },
  ],
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
