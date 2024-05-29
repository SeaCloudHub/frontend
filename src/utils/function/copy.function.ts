import { toast } from 'react-toastify';

export const CopyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success('Link copied to clipboard');
    })
    .catch((error) => {
      toast.error('Failed to copy link to clipboard');
    });
};
