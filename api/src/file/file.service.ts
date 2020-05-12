import { Injectable } from '@nestjs/common';
import {
  createCipheriv,
  createDecipheriv,
  scryptSync,
  getCiphers,
} from 'crypto';

@Injectable()
export class FileService {
  encrypt(buffer, algorithm, key) {
    const iv = Buffer.alloc(16, 0); // Initialization vector.
    const password = scryptSync(key, 'salt', 32);

    const cipher = createCipheriv(algorithm, password, iv);
    const encryptedBuffer = Buffer.concat([
      cipher.update(buffer),
      cipher.final(),
    ]);

    return encryptedBuffer;
  }

  decrypt(buffer, algorithm, key) {
    const iv = Buffer.alloc(16, 0); // Initialization vector.
    const password = scryptSync(key, 'salt', 32);

    const decipher = createDecipheriv(algorithm, password, iv);
    var decryptedBuffer = Buffer.concat([
      decipher.update(buffer),
      decipher.final(),
    ]);
    return decryptedBuffer;
  }
}
