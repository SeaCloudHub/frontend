import { IdentityRESP } from '@/apis/auth/response/auth.sign-in.response';
import { useSession } from '@/store/auth/session';
import { getLocalStorage } from '@/utils/function/auth.function';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AUTH_LOGIN_EMAIL, PAGE_NOT_FOUND } from '../../utils/constants/router.constant';
import { Role } from '../../utils/enums/role.enum';

type RequireAuthProps = {
  allowedRole: Role[];
};

type Identity = Pick<
  IdentityRESP,
  'id' | 'email' | 'password_changed_at' | 'first_name' | 'last_name' | 'avatar_url' | 'is_admin' | 'last_sign_in_at'
>;

const RequireAuth = ({ allowedRole }: RequireAuthProps) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'role']);
  const signOut = useSession((state) => state.signOut);
  const identity = JSON.parse(getLocalStorage('sessionStore'));
  const token = cookies?.token;
  const role = cookies?.role;
  const userRole = cookies.role as Role;
  const location = useLocation();
  useEffect(() => {
    if (!(token && role) || !identity?.state.identity.id) {
      setTimeout(() => {
        removeCookie('role', { path: '/' });
        removeCookie('token', { path: '/' });
        signOut();
      }, 0);
    }
  }, [identity?.state.identity.id, location.pathname, removeCookie, role, signOut, token, userRole]);

  return token ? (
    allowedRole.includes(userRole) ? (
      <Outlet />
    ) : (
      <Navigate to={PAGE_NOT_FOUND} replace />
    )
  ) : (
    <Navigate to={AUTH_LOGIN_EMAIL} state={{ from: location }} replace />
  );
};

export default RequireAuth;
