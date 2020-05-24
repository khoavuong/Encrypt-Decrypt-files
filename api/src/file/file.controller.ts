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
    const { filename } = file;
    const { password, algorithm, mode } = req.body;
    const dataBuffer = fs.readFileSync(file.path);
    fs.unlink(file.path, err => {
      if (err) throw err;
    });

    console.time('encrypt');
    const encrypted = this.fileService.encrypt(
      dataBuffer,
      algorithm,
      password,
      mode,
    );
    console.timeEnd('encrypt');

    fs.writeFile(`upload/${filename}.${algorithm}-${mode}`, encrypted, function(
      err,
    ) {
      if (err) throw err;
    });

    return { filename: `${filename}.${algorithm}-${mode}` };
  }

  @Post('/decrypt')
  @UseInterceptors(FileInterceptor('file'))
  decryptFile(@UploadedFile() file, @Req() req) {
    const { filename } = file;
    const { password, algorithm, mode } = req.body;
    const dataBuffer = fs.readFileSync(file.path);
    fs.unlink(file.path, err => {
      if (err) throw err;
    });

    const decryptedFilename = filename.slice(
      0,
      filename.length - algorithm.length - mode.length - 2,
    ); // remove .${algorithm}-${mode}

    console.time('decrypt');
    const decrypted = this.fileService.decrypt(
      dataBuffer,
      algorithm,
      password,
      mode,
    );
    console.timeEnd('decrypt');

    fs.writeFile(`upload/${decryptedFilename}`, decrypted, function(err) {
      if (err) throw err;
    });

    return { filename: decryptedFilename };
  }

  @Post('/hash')
  @UseInterceptors(FileInterceptor('file'))
  hashtFile(@UploadedFile() file, @Req() req) {
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
