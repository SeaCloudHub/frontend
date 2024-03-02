import { Button, styled } from '@mui/material';

type ButtonContainerProps = {
  title?: string;
  onClick?: () => void;
  color?: string;
  size?: number | string;
  background?: string;
  backgroundHover?: string;
  icon?: React.ReactNode;
};

const ButtonContainerStyle = styled(Button)(
  ({
    background,
    borderRadius,
    Color,
    Size,
    backGroundHover,
  }: {
    background?: string;
    borderRadius?: string;
    Color?: string;
    Size?: number | string;
    backGroundHover?: string;
  }) => ({
    fontWeight: 'bold',
    color: Color,
    width: Size,
    height: Size,
    justifyContent: 'flex-end',
    backgroundColor: background,
    borderRadius: borderRadius,
    textTransform: 'none',
    '&:hover': {
      background: backGroundHover,
    },
  }),
);

const ButtonContainer = ({ title, color, background, backgroundHover, icon, size }: ButtonContainerProps) => {
  return (
    <ButtonContainerStyle
      startIcon={icon}
      Size={size}
      backGroundHover={backgroundHover}
      variant='contained'
      Color={color}
      background={background}>
      {title}
    </ButtonContainerStyle>
  );
};

export default ButtonContainer;
