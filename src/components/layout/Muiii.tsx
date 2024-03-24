import * as React from 'react';
import Box from '@mui/joy/Box';

interface WrapperProps {
  children: React.ReactNode;
}

// function Root(props: BoxProps) {
//   return (
//     <Box
//       {...props}
//       sx={[
//         {
//           display: 'grid',
//           gridTemplateColumns: {
//             xs: '1fr',
//             sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
//             md: 'minmax(160px, 300px) minmax(300px, 500px) minmax(500px, 1fr)',
//           },
//           gridTemplateRows: '64px 1fr',
//           minHeight: '100vh',
//         },
//         ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
//       ]}
//     />
//   );
// }

const Root: React.FC<WrapperProps> = ({ children }) => {
  return (
    // <Box
    //   sx={[
    //     {
    //       display: 'grid',
    //       gridTemplateColumns: {
    //         xs: '1fr',
    //         sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
    //         md: 'minmax(160px, 300px) minmax(300px, 500px) minmax(500px, 1fr)',
    //       },
    //       gridTemplateRows: '64px 1fr',
    //       minHeight: '100vh',
    //     },
    //   ]}>
    <div className='grid min-h-screen'>{children}</div>
    // </Box>
  );
};

const Header: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Box
      sx={[
        {
          bgcolor: 'background.surface',
          borderBottom: '1px solid',
          borderColor: 'divider',
        },
      ]}>
      {children}
    </Box>
  );
};

const SideNav: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Box
      sx={[
        {
          p: 1,
          bgcolor: 'background.surface',
          borderRight: '1px solid',
          borderColor: 'divider',
          height: 1,
          zIndex: 1400,
        },
      ]}>
      {children}
    </Box>
  );
};

const SidePane: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Box
      component='aside'
      className='SidePane'
      sx={[
        {
          bgcolor: 'background.surface',
          borderRight: '1px solid',
          borderColor: 'divider',
          display: {
            xs: 'none',
            md: 'initial',
          },
        },
      ]}>
      {children}
    </Box>
  );
};

const Main: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Box
      component='main'
      className='Main'
      sx={[
        {
          p: 2,
        },
      ]}>
      {children}
    </Box>
  );
};

interface SideDrawerProps extends WrapperProps {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ children, onClose }) => {
  return (
    <div className='relative'>
      <button className='absolute right-0 top-0' onClick={onClose}>
        close
      </button>
      {/* <Sheet
        sx={{
          minWidth: 256,
          width: 'max-content',
          height: '100%',
          p: 2,
          boxShadow: 'lg',
          bgcolor: 'background.surface',
        }}> */}
      {children}
      {/* </Sheet> */}
    </div>
  );
};

export default {
  Root,
  Header,
  SideNav,
  SidePane,
  SideDrawer,
  Main,
};
