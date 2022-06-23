import { readFileSync } from 'fs';
import { join } from 'path';
import { SSL_PATH } from '../constant';

export const certs = {
  cert: readFileSync(join(SSL_PATH, './cert.pem')),
  key: readFileSync(join(SSL_PATH, './key.pem')),
};
