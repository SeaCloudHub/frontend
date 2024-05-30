import { Box, Modal } from '@mui/material';
import { useScreenMode } from '../../../store/responsive/screenMode';
import { ScreenMode } from '../../../utils/enums/screen-mode.enum';

type ModalCoreProps = {
  width?: string | number;
  children?: React.ReactNode;
  isCloseOutside?: boolean;
  closeOutside?: (data?: any) => void;
  open: boolean;
};
const ModalCore = ({ width, children, open, isCloseOutside = true, closeOutside }: ModalCoreProps) => {
  const screenMode = useScreenMode((state) => state.screenMode);

  return (
    <>
      <Modal
        open={open}
        onClose={
          isCloseOutside
            ? () => {
                closeOutside(false);
              }
            : () => {}
        }
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box
          sx={{
            padding: '20px',
            maxWidth: 1000,
            outline: 'none',
            '.dark &': {
              backgroundColor: '#031525',
              color: 'white',
            },
            bgcolor: 'background.paper',
            borderRadius: screenMode == ScreenMode.MOBILE ? '0px' : '12px',
            boxShadow: 24,
            top: '50%',
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: screenMode == ScreenMode.MOBILE ? '100vw' : { md: width, sx: '90vw' },
          }}>
          {children}
        </Box>
      </Modal>
    </>
  );
};

export default ModalCore;
