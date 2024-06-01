// import { Divider, Menu, MenuItem, Tooltip } from '@mui/material';
// import React, { useState } from 'react';
// import { MenuItem as MenuItemCustom } from './Dropdown';

// type DropdownProps = {
//   button: React.ReactNode;
//   items: MenuItemCustom[][];
//   minWidth?: boolean;
// };

// const CustomDropdown: React.FC<DropdownProps> = ({ button, items, minWidth }) => {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     event.preventDefault();
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   return (
//     <>
//       <Tooltip title='More options'>
//         <div onClick={handleClick}>{button}</div>
//       </Tooltip>
//       <Menu
//         id='simple-menu'
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//         sx={{
//           '.dark &': {
//             '.MuiPaper-root': {
//               backgroundColor: '#1E293B',
//               color: 'white',
//             },
//           },
//         }}>
//         {items.map((group, ind) => (
//           <div key={ind}>
//             {group.map(({ label, icon, action, isHidden }) => (
//               <MenuItem
//                 disabled={isHidden}
//                 key={ind + ' ' + label}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   action && action();
//                   handleClose();
//                 }}
//                 onDoubleClick={(e) => e.stopPropagation()}
//                 sx={{
//                   minWidth: minWidth ? '250px' : '0px',
//                   py: '3px',
//                   '.dark &': {
//                     '&:hover': {
//                       backgroundColor: '#334155',
//                     },
//                   },
//                 }}>
//                 <div className='flex items-center space-x-2'>
//                   {icon}
//                   <div className='select-none'>{label}</div>
//                 </div>
//               </MenuItem>
//             ))}
//             {ind !== items.length - 1 && (
//               <Divider
//                 sx={{
//                   '.dark &': {
//                     backgroundColor: '#64748B',
//                   },
//                 }}
//               />
//             )}
//           </div>
//         ))}
//       </Menu>
//     </>
//   );
// };

// export default CustomDropdown;

import { Divider, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { MenuItem as MenuItemCustom } from './Dropdown';

type DropdownProps = {
  button: React.ReactNode;
  items: MenuItemCustom[][];
  minWidth?: boolean;
  disableAll?: boolean; // Add this line
};

const CustomDropdown: React.FC<DropdownProps> = ({ button, items, minWidth, disableAll }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title='More options'>
        <div onClick={handleClick}>{button}</div>
      </Tooltip>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          '.dark &': {
            '.MuiPaper-root': {
              backgroundColor: '#1E293B',
              color: 'white',
            },
          },
        }}>
        {items.map((group, ind) => (
          <div key={ind}>
            {group.map(({ label, icon, action }, index) => (
              <MenuItem
                disabled={disableAll} // Disable all MenuItems if disableAll is true
                key={ind + ' ' + label}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!disableAll && action) action(); // Only execute action if not disabled
                  handleClose();
                }}
                onDoubleClick={(e) => e.stopPropagation()}
                sx={{
                  minWidth: minWidth ? '250px' : '0px',
                  py: '3px',
                  '.dark &': {
                    '&:hover': {
                      backgroundColor: '#334155',
                    },
                  },
                }}>
                <div className='flex items-center space-x-2'>
                  {icon}
                  <div className='select-none'>{label}</div>
                </div>
              </MenuItem>
            ))}
            {ind !== items.length - 1 && (
              <Divider
                sx={{
                  '.dark &': {
                    backgroundColor: '#64748B',
                  },
                }}
              />
            )}
          </div>
        ))}
      </Menu>
    </>
  );
};

export default CustomDropdown;
