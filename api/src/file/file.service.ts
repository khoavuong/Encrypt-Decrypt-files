import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  createCipheriv,
  createDecipheriv,
  scryptSync,
  createHash,
  randomBytes,
} from 'crypto';

@Injectable()
export class FileService {
  encrypt(buffer, algorithm, password, mode) {
    let keyLength, iv;
    if (algorithm.slice(0, 3) == 'aes') {
      keyLength = parseInt(algorithm.slice(-3)) / 8;
      iv = randomBytes(16);
    } else {
      // DES
      if (algorithm.slice(4, 8) == 'ede3') keyLength = 24;
      else if (algorithm.slice(4, 7) == 'ede') keyLength = 16;
      else keyLength = 8;
      iv = randomBytes(8);
    }

    const key = scryptSync(password, 'salt', keyLength);

    let cipher;
    try {
      cipher =
        mode == 'ecb'
          ? createCipheriv(`${algorithm}-${mode}`, key, null)
          : createCipheriv(`${algorithm}-${mode}`, key, iv);
    } catch (err) {
      throw new HttpException(
        'Please fill out all the form',
        HttpStatus.BAD_REQUEST,
      );
    }

    let encryptedBuffer = Buffer.concat([
      cipher.update(buffer),
      cipher.final(),
    ]);
    encryptedBuffer = Buffer.concat([iv, encryptedBuffer]);

    return encryptedBuffer;
  }

  decrypt(buffer, algorithm, password, mode) {
    let keyLength, iv;
    if (algorithm.slice(0, 3) == 'aes') {
      keyLength = parseInt(algorithm.slice(-3)) / 8;
      iv = buffer.slice(0, 16);
    } else {
      // DES
      if (algorithm.slice(4, 8) == 'ede3') keyLength = 24;
      else if (algorithm.slice(4, 7) == 'ede') keyLength = 16;
      else keyLength = 8;
      iv = buffer.slice(0, 8);
    }

    const key = scryptSync(password, 'salt', keyLength);

    let decipher;
    try {
      decipher =
        mode == 'ecb'
          ? createDecipheriv(`${algorithm}-${mode}`, key, null)
          : createDecipheriv(`${algorithm}-${mode}`, key, iv);
    } catch (err) {
      throw new HttpException(
        'Please fill out all the form',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const decryptedBuffer = Buffer.concat([
        decipher.update(buffer.slice(iv.length)),
        decipher.final(),
      ]);

      return decryptedBuffer;
    } catch (err) {
      throw new HttpException(
        'Wrong algorithm or password or mode',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  hash(buffer) {
    const hash = createHash('sha256');
    hash.update(buffer);
    return hash.digest('hex');
  }
}
