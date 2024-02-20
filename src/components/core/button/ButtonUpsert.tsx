//Upsert stand for insert or update
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

type ButtonUpsertProps = {
  title?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  background?: string;
};
//75aaff
//#0061fa
const CustomButton = styled(Button)(({ background, backgroundHover }: { background?: string; backgroundHover?: string }) => ({
  color: 'black',
  borderColor: 'black',
  flexDirection: 'column',
  alignItems: 'baseline',
  paddingRight: '70px',
  fontWeight: 'bold',
  paddingBottom: '15px',
  paddingTop: '15px',
  backgroundColor: background,
  '&:hover': {
    backgroundColor: backgroundHover || '#f2f2f2',
    borderColor: 'black',
  },
}));

const ButtonUpsert = ({ title, icon, background, onClick }: ButtonUpsertProps) => {
  return (
    <CustomButton variant='outlined' onClick={onClick} background={background}>
      <div className='mb-2'>{icon}</div>
      {title}
    </CustomButton>
  );
};

export default ButtonUpsert;
