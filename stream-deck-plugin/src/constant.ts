import { join } from 'path';

export const IMAGE_PATH = __dirname ? join(__dirname, '../images') : './images';

export const SSL_PATH = __dirname ? join(__dirname, '../ssl') : './ssl';

export const CENTER_BY_TYPE = [
  [1, 2],
  [0, 1],
  [1, 3],
  [1, 2],
];
