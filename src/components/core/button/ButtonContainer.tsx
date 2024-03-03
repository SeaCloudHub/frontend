import { Button, Tooltip, styled } from '@mui/material';

type ButtonContainerProps = {
  title?: string;
  onClick?: () => void;
  color?: string;
  size?: number | string;
  background?: string;
  backgroundHover?: string;
  icon?: React.ReactNode;
  [others: string]: any;
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

const ButtonContainer = ({ title, color, background, backgroundHover, icon, size, tooltip }: ButtonContainerProps) => {
  return (
    <Tooltip title={tooltip}>
      <ButtonContainerStyle
        startIcon={icon}
        Size={size}
        backGroundHover={backgroundHover}
        variant='contained'
        Color={color}
        background={background}>
        {title}
      </ButtonContainerStyle>
    </Tooltip>
  );
};

export default ButtonContainer;
