import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Res,
  NotFoundException,
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
    fs.unlink(file.path, err => {
      if (err) throw err;
    });

    const decrypted = this.fileService.decrypt(dataBuffer, algorithm, key);
    fs.writeFile(`upload/${decryptedFilename}`, decrypted, function(err) {
      if (err) throw err;
    });

    return { filename: decryptedFilename, originalname };
  }

  @Post('/hash')
  @UseInterceptors(FileInterceptor('file'))
  hashtFile(@UploadedFile() file, @Req() req) {
    const { originalname } = file;
    const dataBuffer = fs.readFileSync(file.path);
    fs.unlink(file.path, err => {
      if (err) throw err;
    });

    const hashBuffered = this.fileService.hash(dataBuffer);
    return { hash: hashBuffered };
  }

  @Get('/:filepath')
  async seeUploadedFile(@Param('filepath') file, @Res() res) {
    if (fs.existsSync(`upload/${file}`)) {
      //res.sendFile(file, { root: 'upload' });
      await res.download(`upload/${file}`);

      setTimeout(function() {
        fs.unlink(`upload/${file}`, err => {
          if (err) throw err;
        });
      }, 100);
    } else {
      throw new NotFoundException('File not found');
    }
  }
}
