export const CopyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Copied to clipboard');
  }).catch((error) => {
    console.error('Copy failed', error);
  });
};
