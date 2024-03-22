// import { useState } from 'react';
import DynamicLayout from './components/layout/DynamicLayout';
import { Outlet, Route, Routes } from 'react-router-dom';
import { routes } from './utils/constants/router.constant';
import TuyenLayout from './components/layout/test/TuyenLayout';

function App() {
  // const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Routes>
        {/* auth routes */}
        {routes.auth.map((item, index) => (
          <Route path={item.path} Component={item.component} key={index} />
        ))}

        {/* layout routes */}
        <Route
          element={
            // <TuyenLayout children={<Outlet />} />
            // <Outlet />
            <DynamicLayout>
              <Outlet />
            </DynamicLayout>
          }
        >
          {/* route của admin và custom */}
          {routes.admin.map((item, index) => (
            <Route path={item.path} Component={item.component} key={index} />
          ))}
          {routes.customer.map((item, index) => (
            <Route path={item.path} Component={item.component} key={index} />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
