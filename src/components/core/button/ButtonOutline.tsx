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
    borderradius,
    customecolor,
    backGroundHover,
    fontSize,
    customsize,
  }: {
    backGroundHover?: string;
    background?: string;
    borderradius?: string;
    customecolor?: string;
    fontSize?: number;
    customsize?: number;
  }) => ({
    fontWeight: 'bold',
    color: customecolor || 'black',
    textTransform: 'none' as const,
    backgroundColor: background,
    borderRadius: borderradius,
    height: customsize,
    width: customsize,
    fontSize: fontSize,
    borderColor: customecolor || 'black',
    '&:hover': {
      borderColor: customecolor || 'black',
      background: backGroundHover || '#f2f2f2',
    },
  }),
);
const ButtonOutline = ({ title, borderRadius, color, background, fontSize, size }: ButtonOutlineProps) => {
  return (
    <ButtonOutlineStyle
      fontSize={fontSize}
      customsize={size}
      variant='outlined'
      background={background}
      borderradius={borderRadius}
      customecolor={color}>
      {title}
    </ButtonOutlineStyle>
  );
};

export default ButtonOutline;
