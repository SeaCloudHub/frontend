import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSession } from '../../store/auth/session';
import { AUTH_LOGIN_EMAIL, PAGE_NOT_FOUND } from '../../utils/constants/router.constant';
import { Role } from '../../utils/enums/role.enum';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

type RequireAuthProps = {
  allowedRole: Role[];
};

const RequireAuth = ({ allowedRole }: RequireAuthProps) => {
  const [cookies] = useCookies(['token']);
  const role = useSession((state) => state.role);
  const location = useLocation();

  console.log('cookies', cookies);
  console.log('role', role);

  return cookies?.token ? (
    allowedRole.find((allow) => allow == role) ? (
      <Outlet />
    ) : (
      <Navigate to={PAGE_NOT_FOUND} replace />
    )
  ) : (
    <Navigate to={AUTH_LOGIN_EMAIL} state={{ from: location }} replace />
  );
};

export default RequireAuth;
