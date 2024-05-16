import { useColorScheme } from '@mui/joy/styles';
import IconButton from '@mui/joy/IconButton';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { useEffect, useState } from 'react';
import { useTheme } from '@/providers/theme-provider';
import { Tooltip } from '@mui/material';

export function ColorSchemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <IconButton size='sm' variant='outlined' color='primary' />;
  }
  return (
    <Tooltip title={theme === 'dark' ? 'To light' : 'To dark'}>
      <div
        className={`relative flex w-[4.3rem] items-center ${theme === 'dark' ? ' bg-search-bg-dark hover:brightness-105' : 'bg-search-bg hover:brightness-95'} rounded-full p-0.5`}
        onClick={() => {
          if (theme === 'light') {
            setTheme('dark');
          } else {
            setTheme('light');
          }
        }}>
        <IconButton
          size='sm'
          variant='plain'
          className={`absolute h-7 w-7 transform rounded-full transition-transform duration-300 ${theme === 'dark' ? 'translate-x-0' : 'translate-x-full'}`}
          sx={{
            borderRadius: '100%',
            border: '1px solid white',
            ':hover': {
              bgcolor: 'transparent',
            },
            '.dark &': {
              border: '1px solid #374151',
              '&:hover': {
                bgcolor: 'transparent',
              },
            },
          }}>
          {theme === 'light' ? (
            <DarkModeRoundedIcon className='text-black' />
          ) : (
            <LightModeRoundedIcon className='text-yellow-500' />
          )}
        </IconButton>
      </div>
    </Tooltip>
  );
}
