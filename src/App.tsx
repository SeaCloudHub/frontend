import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import DynamicLayout from './components/layout/DynamicLayout';
import RequireAuth from './helpers/routers/RequireAuth';
import ChangePassword from './pages/auth/ChangePassword';
import {
  AUTH_CHANGE_PASSWORD,
  AUTH_LOGIN_EMAIL,
  DRIVE_SHARED_VIEW_FILE,
  DRIVE_SHARED_VIEW_FOLDER,
  routes,
} from './utils/constants/router.constant';
import { Role } from './utils/enums/role.enum';
import ShareCheck from './helpers/routers/ShareCheck';
import ShareFile from './pages/user/share/ShareFile';
import ShareFolder from './pages/user/share/ShareFolder';
import { AboutPage } from './pages/about-help/AboutPage';
import { HelpPage } from './pages/about-help/HelpPage';

function App() {
  return (
    <>
      <Routes>
        {/* auth routes */}
        <Route path='/' element={<Navigate to={AUTH_LOGIN_EMAIL} />} />
        <Route element={<RequireAuth allowedRole={[Role.ADMIN, Role.USER]} />}>
          <Route path={AUTH_CHANGE_PASSWORD} element={<ChangePassword />} />
        </Route>
        <Route path={routes.about.path} element={<AboutPage />} />
        <Route path={routes.help.path} element={<HelpPage />} />
        {routes.auth.map((item, index) => (
          <Route path={item.path} Component={item.component} key={index} />
        ))}

        <Route path={routes.notFound.path} Component={routes.notFound.component} />
        {/* layout routes */}

        <Route
          element={
            <DynamicLayout>
              <Outlet />
            </DynamicLayout>
          }>
          {/* route của admin và custom */}
          <Route element={<RequireAuth allowedRole={[Role.ADMIN]} />}>
            {routes.admin.map((item, index) => (
              <Route path={item.path} Component={item.component} key={index} />
            ))}
          </Route>
          <Route element={<RequireAuth allowedRole={[Role.USER]} />}>
            {routes.customer.map((item, index) => (
              <Route path={item.path} Component={item.component} key={index} />
            ))}
            <Route element={<ShareCheck />}>
              <Route path={DRIVE_SHARED_VIEW_FILE} element={<ShareFile />} />
              <Route path={DRIVE_SHARED_VIEW_FOLDER} element={<ShareFolder />} />
            </Route>
          </Route>
        </Route>

        <Route path='*' element={<Navigate to='/404' />} />
      </Routes>
    </>
  );
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    directory?: string;
    webkitdirectory?: string;
  }
}

export default App;
