import { Module, UnsupportedMediaTypeException } from '@nestjs/common';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileService } from './file.service';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, callback) => {
          //const { fieldname, originalname, encoding, mimetype } = file;
          /* const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join(''); */
          callback(null, file.originalname);
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
