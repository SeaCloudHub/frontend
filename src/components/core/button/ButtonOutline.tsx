import styled from '@emotion/styled';
import { Button } from '@mui/material';

type ButtonOutlineProps = {
  title: string;
  borderRadius?: string;
  onClick?: () => void;
  color?: string;
  background?: string;
  backGroundHover?: string;
  fontSize?: number;
  size?: number;
};
const ButtonOutlineStyle = styled(Button)(
  ({
    background,
    borderRadius,
    Color,
    backGroundHover,
    fontSize,
    Size,
  }: {
    backGroundHover?: string;
    background?: string;
    borderRadius?: string;
    Color?: string;
    fontSize?: number;
    Size?: number;
  }) => ({
    fontWeight: 'bold',
    color: Color || 'black',
    textTransform: 'none',
    backgroundColor: background,
    borderRadius: borderRadius,
    height: Size,
    width: Size,
    fontSize: fontSize,
    borderColor: Color || 'black',
    '&:hover': {
      borderColor: Color || 'black',
      background: backGroundHover || '#f2f2f2',
    },
  }),
);
const ButtonOutline = ({ title, borderRadius, color, background, fontSize, size }: ButtonOutlineProps) => {
  return (
    <ButtonOutlineStyle
      fontSize={fontSize}
      Size={size}
      variant='outlined'
      background={background}
      borderRadius={borderRadius}
      Color={color}>
      {title}
    </ButtonOutlineStyle>
  );
};

export default ButtonOutline;
