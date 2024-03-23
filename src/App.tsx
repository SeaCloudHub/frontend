// import { useState } from 'react';

import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import DynamicLayout from './components/layout/DynamicLayout';
import RequireAuth from './helpers/routers/RequireAuth';
import { routes } from './utils/constants/router.constant';
import { Role } from './utils/enums/role.enum';

function App() {
  return (
    <>
      <Routes>
        {/* auth routes */}
        {routes.auth.map((item, index) => (
          <Route path={item.path} Component={item.component} key={index} />
        ))}
        <Route path={routes.notFound.path} Component={routes.notFound.component} />

        {/* layout routes */}
        <Route
          element={
            // <TuyenLayout children={<Outlet />} />
            // <Outlet />
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
          <Route element={<RequireAuth allowedRole={[Role.USER, Role.ADMIN]} />}>
            {routes.customer.map((item, index) => (
              <Route path={item.path} Component={item.component} key={index} />
            ))}
          </Route>
        </Route>

        <Route path='*' element={<Navigate to='/404' />} />
      </Routes>
    </>
  );
}

export default App;
