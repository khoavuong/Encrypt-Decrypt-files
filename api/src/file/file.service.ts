import { Injectable } from '@nestjs/common';
import { createCipher, createDecipher } from 'crypto';

@Injectable()
export class FileService {
  encrypt(buffer, algorithm, key) {
    const cipher = createCipher(algorithm, key);
    const encryptedBuffer = Buffer.concat([
      cipher.update(buffer),
      cipher.final(),
    ]);
    return encryptedBuffer;
  }

  decrypt(buffer, algorithm, key) {
    const decipher = createDecipher(algorithm, key);
    var decryptedBuffer = Buffer.concat([
      decipher.update(buffer),
      decipher.final(),
    ]);
    return decryptedBuffer;
  }
}
