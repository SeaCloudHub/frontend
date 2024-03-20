// import { useState } from 'react';

import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import DynamicLayout from './components/layout/DynamicLayout';
import RequireAuth from './helpers/routers/RequireAuth';
import { routes } from './utils/constants/router.constant';

function App() {
  return (
    <>
      <Routes>
        {/* auth routes */}
        {routes.auth.map((item, index) => (
          <Route path={item.path} Component={item.component} key={index} />
        ))}
        {<Route path={routes.notFound.path} Component={routes.notFound.component} />}
        {/* layout routes */}
        <Route element={<RequireAuth />}>
          <Route
            element={
              <DynamicLayout>
                <Outlet />
              </DynamicLayout>
            }>
            {/* route của admin và custom */}
            {routes.admin.map((item, index) => (
              <Route path={item.path} Component={item.component} key={index} />
            ))}
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
