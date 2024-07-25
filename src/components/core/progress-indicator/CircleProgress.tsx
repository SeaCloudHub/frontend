import { Box, CircularProgress, CircularProgressProps, Typography } from '@mui/material';

type CircleProgressProps = {
  value: number;
} & CircularProgressProps;
const CircleProgress = (props: CircleProgressProps) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant='determinate' size={25} {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Typography
          fontWeight={'bold'}
          fontSize={8}
          variant='caption'
          component='div'
          color='text.secondary'>{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default CircleProgress;
