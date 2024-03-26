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
        onClose={isCloseOutside ? closeOutside : () => {}}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box
          sx={{
            maxWidth: 1000,
            outline: 'none',
            bgcolor: 'background.paper',
            borderRadius: '12px',
            boxShadow: 24,
            p: 4,
            top: '50%',
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: screenMode == ScreenMode.MOBILE ? '90vw' : width,
          }}>
          {children}
        </Box>
      </Modal>
    </>
  );
};

export default ModalCore;
