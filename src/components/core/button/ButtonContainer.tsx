import { Button, styled } from '@mui/material';

type ButtonContainerProps = {
  title: string;
  onClick?: () => void;
  color?: string;
  background?: string;
  backgroundHover?: string;
  icon?: React.ReactNode;
};

const ButtonContainerStyle = styled(Button)(
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
    color: Color,
    backgroundColor: background,
    borderRadius: borderRadius,
    textTransform: 'none',
    '&:hover': {
      background: backGroundHover,
    },
  }),
);

const ButtonContainer = ({ title, color, background, backgroundHover, icon }: ButtonContainerProps) => {
  return (
    <ButtonContainerStyle
      startIcon={icon}
      backGroundHover={backgroundHover}
      variant='contained'
      Color={color}
      background={background}>
      {title}
    </ButtonContainerStyle>
  );
};

export default ButtonContainer;
