import { Box, Modal, useMediaQuery, useTheme } from '@mui/material';

type ModalCoreProps = {
  width?: string | number;
  children?: React.ReactNode;
  isCloseOutside?: boolean;
  closeOutside?: (data?: any) => void;
  open: boolean;
};
const ModalCore = ({ width, children, open, isCloseOutside = true, closeOutside }: ModalCoreProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const modalWidth = isSmallScreen ? '90vw' : width;
  return (
    <>
      <Modal
        open={open}
        onClose={isCloseOutside ? closeOutside : () => {}}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: '12px',
            boxShadow: 24,
            p: 4,
            top: '50%',
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { modalWidth },
          }}>
          {children}
        </Box>
      </Modal>
    </>
  );
};

export default ModalCore;
