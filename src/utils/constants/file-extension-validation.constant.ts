export const fileSignatures: { [key: string]: string[] } = {
  'image/png': ['89504E47'],
  'image/jpeg': ['FFD8FF'],
  'application/pdf': ['25504446'],
  '.csv': ['504B0304', '656d61696'],
  'application/msword': ['D0CF11E0'],
};
