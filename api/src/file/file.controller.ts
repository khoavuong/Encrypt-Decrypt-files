import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Res,
  BadRequestException,
  Param,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('/encrypt')
  @UseInterceptors(FileInterceptor('file'))
  encryptFile(@UploadedFile() file, @Req() req) {
    const { filename, originalname } = file;
    const { key, algorithm } = req.body;
    const dataBuffer = fs.readFileSync(file.path);
    fs.unlink(file.path, err => {
      if (err) throw err;
    });

    const encrypted = this.fileService.encrypt(dataBuffer, algorithm, key);
    fs.writeFile(`upload/${filename}.aes`, encrypted, function(err) {
      if (err) throw err;
    });

    return { filename: `${filename}.aes`, originalname };
  }

  @Post('/decrypt')
  @UseInterceptors(FileInterceptor('file'))
  decryptFile(@UploadedFile() file, @Req() req) {
    const { filename, originalname } = file;
    const { key, algorithm } = req.body;
    const dataBuffer = fs.readFileSync(file.path);
    const decryptedFilename = filename.slice(0, filename.length - 4); // remove .aes

    const decrypted = this.fileService.decrypt(dataBuffer, algorithm, key);
    fs.writeFile(`upload/${decryptedFilename}`, decrypted, function(err) {
      if (err) throw err;
    });

    return { filename: decryptedFilename, originalname };
  }

  @Get('/:filepath')
  seeUploadedFile(@Param('filepath') file, @Res() res) {
    if (file.includes('/')) throw new BadRequestException();
    return res.sendFile(file, { root: 'upload' });
  }
}
