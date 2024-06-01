import MyDrive from '@/pages/user/my-drive/MyDrive';
import DashBoard from '../../pages/admin/dashboard/DashBoard';
import StorageManagement from '../../pages/admin/storage-management/StorageManagement';
import UserManagement from '../../pages/admin/user-management/UserManagement';
import UserManagementDetail from '../../pages/admin/user-management/user-management-detail/UserManagementDetail';
import LoginEmail from '../../pages/auth/LoginEmail';
import LoginPassword from '../../pages/auth/LoginPassword';
import ResetPassword from '../../pages/auth/ResetPassword';
import ErrorPage from '../../pages/error/ErrorPage';
import Memory from '../../pages/user/memory/Memory';
import Priority from '../../pages/user/priority/Priority';
import Shared from '../../pages/user/shared/Shared';
import Starred from '../../pages/user/starred/Starred';
import Trash from '../../pages/user/trash/Trash';
import SearchPage from '@/pages/user/search/SearchPage';
import { Profile } from '@/pages/user/profile/Profile';
import { AboutPage } from '@/pages/about-help/AboutPage';
import { HelpPage } from '@/pages/about-help/HelpPage';

export const HOME = '/';
export const AUTH_HOME = '/auth';
export const ADMIN_HOME = '/admin';
export const DRIVE_HOME = '/drive';
export const PAGE_NOT_FOUND = '/404';
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
export const ADMIN_USER_MANAGEMENT_USER_DETAIL = `${ADMIN_USER_MANAGEMENT}/:userId`;
export const ADMIN_DASHBOARD = `${ADMIN_HOME}/dashboard`;
export const ADMIN_STORAGE_MANAGEMENT = `${ADMIN_HOME}/storage-management`;
//customer routes
export const DRIVE_SHARED = `${DRIVE_HOME}/shared`;
export const DRIVE_SHARED_DIR = `${DRIVE_HOME}/shared/dir/:dirId`;
export const DRIVE_PRIORITY = `${DRIVE_HOME}/priority`;
export const DRIVE_MY_DRIVE = `${DRIVE_HOME}/my-drive`;
export const DRIVE_SEARCH = `${DRIVE_HOME}/search`;
export const DRIVE_MY_DRIVE_DIR = `${DRIVE_HOME}/my-drive/dir/:dirId`;
export const DRIVE_STARRED = `${DRIVE_HOME}/starred`;
export const DRIVE_TRASH = `${DRIVE_HOME}/trash`;
export const DRIVE_MEMORY = `${DRIVE_HOME}/memory`;
export const DRIVE_PROFILE = `${DRIVE_HOME}/profile`;
export const DRIVE_SHARED_VIEW_FILE = `${DRIVE_HOME}/file/:fileId`;
export const DRIVE_SHARED_VIEW_FOLDER = `${DRIVE_HOME}/folder/:dirId`;
// About & Help
export const ABOUT_US = `/about`;
export const HELP = `/help`;

export const routes = {
  auth: [
    { path: AUTH_LOGIN_EMAIL, component: LoginEmail },
    { path: AUTH_LOGIN_PASSWORD, component: LoginPassword },
    // { path: AUTH_CHANGE_PASSWORD, component: ChangePassword },
    { path: AUTH_RESET_PASSWORD, component: ResetPassword },
  ],
  admin: [
    // { path: ADMIN_HOME, component: DashBoard },
    { path: ADMIN_USER_MANAGEMENT, component: UserManagement },
    {
      path: ADMIN_USER_MANAGEMENT_USER_DETAIL,
      component: UserManagementDetail,
    },
    { path: ADMIN_HOME, component: DashBoard },
    { path: ADMIN_STORAGE_MANAGEMENT, component: StorageManagement },
  ],
  customer: [
    { path: DRIVE_HOME, component: Priority },
    { path: DRIVE_SHARED, component: Shared },
    // { path: DRIVE_SHARED_DIR, component: Shared },
    { path: DRIVE_MY_DRIVE, component: MyDrive },
    { path: DRIVE_SEARCH, component: SearchPage },
    { path: DRIVE_MY_DRIVE_DIR, component: MyDrive },
    { path: DRIVE_STARRED, component: Starred },
    { path: DRIVE_TRASH, component: Trash },
    { path: DRIVE_MEMORY, component: Memory },
    { path: DRIVE_PROFILE, component: Profile },
  ],
  notFound: { path: PAGE_NOT_FOUND, component: ErrorPage },
  about: { path: ABOUT_US, component: AboutPage },
  help: { path: HELP, component: HelpPage },
};
