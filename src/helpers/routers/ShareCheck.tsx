import ShareError from '@/pages/user/share/ShareError';
import { useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const ShareCheck = () => {
  const location = useLocation();
  const fileId = useMemo(() => {
    const lastSlashIndex = location.pathname.lastIndexOf('/');
    return location.pathname.substring(lastSlashIndex + 1);
  }, [location]);
  const [valid, setValid] = useState(true);
  return <>{valid ? <Outlet /> : <ShareError />}</>;
};

export default ShareCheck;
