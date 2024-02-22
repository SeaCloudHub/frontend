import { Box, LinearProgress } from '@mui/material';

type LinearChartBarProps = {
  width: string;
  total: number;
  value: number;
  color?: string;
};
const LinearChartBar = ({ value, total, width, ...others }: LinearChartBarProps) => {
  const progress = (value / total) * 100;
  return (
    <Box width={width} sx={{ ...others }}>
      <LinearProgress variant='determinate' value={progress} />
    </Box>
  );
};

export default LinearChartBar;
