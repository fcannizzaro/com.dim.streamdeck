import { AES, enc } from 'crypto-js';
import { randomBytes } from 'crypto';

export const DIM_SECURE = 'dim://';
export const DIM_VERIFICATION = 'dim://auth:';
export const DIM_RESET = 'dim://reset:';

export const randomToken = () => randomBytes(32).toString('hex');

export const encrypt = (text: string, sharedKey: string) => {
  const encrypted = AES.encrypt(text, sharedKey).toString();
  return DIM_SECURE + encrypted;
};

export const decrypt = (text: string, sharedKey: string) => {
  const sliced = text.slice(DIM_SECURE.length);
  const decrypted = AES.decrypt(sliced, sharedKey);
  return decrypted.toString(enc.Utf8);
};
