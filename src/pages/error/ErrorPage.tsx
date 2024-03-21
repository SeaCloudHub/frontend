import { Link } from 'react-router-dom';
import ButtonOutline from '../../components/core/button/ButtonOutline';
import { useScreenMode } from '../../store/responsive/screenMode';
import { ScreenMode } from '../../utils/enums/screen-mode.enum';

const ErrorPage = () => {
  const screenMode = useScreenMode((state) => state.screenMode);
  return (
    <div className='relative flex h-screen justify-center'>
      <div
        className={` absolute top-1/2 flex -translate-y-1/2 transform  flex-col ${screenMode == ScreenMode.DESKTOP ? 'items-start' : 'items-center'} space-y-4`}>
        <img
          className='w-full max-w-[150px] object-contain '
          src='https://student.hcmus.edu.vn/_next/image?url=%2Fhcmus-logo.png&w=384&q=75'
        />
        <p className={`${screenMode == ScreenMode.DESKTOP ? 'h2' : 'h4'}`}>404. Page not found</p>
        <p className='text-center'>Sorry, we couldn't find the page you're looking for.</p>
        <Link to={'/admin/user-management'}>
          <ButtonOutline title='Go back home' color='green' />
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
