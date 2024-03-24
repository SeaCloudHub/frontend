import { Button, Tooltip, styled } from '@mui/material';

type ButtonContainerProps = {
  title?: string;
  onClick?: (data?: any) => void;
  color?: string;
  size?: number | string;
  background?: string;
  backgroundhover?: string;
  icon?: React.ReactNode;
  [others: string]: any;
};

const ButtonContainerStyle = styled(Button)(
  ({
    background,
    borderRadius,
    customecolor,
    customesize,
    backgroundhover,
  }: {
    background?: string;
    borderRadius?: string;
    customecolor?: string;
    customesize?: number | string;
    backgroundhover?: string;
  }) => ({
    fontWeight: 'bold',
    color: customecolor,
    width: customesize,
    height: customesize,
    justifyContent: 'flex-end',
    backgroundColor: background,
    borderRadius: borderRadius,
    textTransform: 'none',
    '&:hover': {
      background: backgroundhover,
    },
  }),
);

const ButtonContainer = ({ title, color, background, backgroundHover, icon, size, tooltip, ...others }: ButtonContainerProps) => {
  return (
    <Tooltip title={tooltip} style={{ zIndex: 3001 }}>
      <ButtonContainerStyle
        {...others}
        startIcon={icon}
        customesize={size}
        backgroundhover={backgroundHover}
        variant='contained'
        customecolor={color}
        background={background}>
        {title}
      </ButtonContainerStyle>
    </Tooltip>
  );
};

export default ButtonContainer;
