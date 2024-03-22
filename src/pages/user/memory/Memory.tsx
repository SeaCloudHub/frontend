import FileBrowser from '../../../components/layout/FileBrowser';
import { CssBaseline, CssVarsProvider } from '@mui/joy';

const Memory = () => {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />

      <FileBrowser />
    </CssVarsProvider>
  );
};

export default Memory;
