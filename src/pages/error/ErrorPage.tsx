import { Link } from 'react-router-dom';
import ButtonOutline from '../../components/core/button/ButtonOutline';
import { useSession } from '../../store/auth/session';
import { useScreenMode } from '../../store/responsive/screenMode';
import { ADMIN_HOME, AUTH_LOGIN_EMAIL, DRIVE_HOME } from '../../utils/constants/router.constant';
import { Role } from '../../utils/enums/role.enum';
import { ScreenMode } from '../../utils/enums/screen-mode.enum';
import { useCookies } from 'react-cookie';

const ErrorPage = () => {
  const [cookies, setCookie] = useCookies(['token','role']);
  const to = !cookies.token ? AUTH_LOGIN_EMAIL : cookies.role == Role.ADMIN ? ADMIN_HOME : DRIVE_HOME;
  const screenMode = useScreenMode((state) => state.screenMode);
  return (
    <div className='relative flex h-screen justify-center'>
      <div
        className={` absolute top-1/2 flex -translate-y-1/2 transform  flex-col ${screenMode == ScreenMode.DESKTOP ? 'items-start' : 'items-center'} space-y-4`}>
        <img className='w-full max-w-[150px] object-contain ' src={(import.meta.env.BASE_URL + 'logo.png') as string} />
        <p className={`${screenMode == ScreenMode.DESKTOP ? 'h2' : 'h4'}`}>404. Page not found</p>
        <p className='text-center'>Sorry, we couldn't find the page you're looking for.</p>
        <Link to={to}>
          <ButtonOutline title='Go back home' color='green' />
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
