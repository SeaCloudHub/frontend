import { PropsWithChildren } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DynamicLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Sidebar>
        <Navbar />
        {children}
      </Sidebar>
    </>
  );
};

export default DynamicLayout;
