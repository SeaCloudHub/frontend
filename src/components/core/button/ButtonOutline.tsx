import styled from '@emotion/styled';
import { Button } from '@mui/material';

type ButtonOutlineProps = {
  title: string;
  borderRadius?: string;
  onClick?: () => void;
  color?: string;
  background?: string;
  backGroundHover?: string;
};
const ButtonOutlineStyle = styled(Button)(
  ({
    background,
    borderRadius,
    Color,
    backGroundHover,
  }: {
    backGroundHover?: string;
    background?: string;
    borderRadius?: string;
    Color?: string;
  }) => ({
    fontWeight: 'bold',
    color: Color || 'black',
    backgroundColor: background,
    borderRadius: borderRadius,
    borderColor: Color || 'black',
    '&:hover': {
      borderColor: Color || 'black',
      background: backGroundHover || '#f2f2f2',
    },
  }),
);
const ButtonOutline = ({ title, borderRadius, color, background }: ButtonOutlineProps) => {
  return (
    <ButtonOutlineStyle variant='outlined' background={background} borderRadius={borderRadius} Color={color}>
      {title}
    </ButtonOutlineStyle>
  );
};

export default ButtonOutline;
