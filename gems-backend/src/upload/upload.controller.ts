import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
  
@Controller('upload')
export class UploadController {
@Post()
@UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './assets/uploads', // Folder to store uploaded files
        filename: (req, file, callback) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
            callback(null, uniqueName);
          },
        }),
      }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
      // Return the file path to the client
      return { filePath: `/assets/uploads/${file.filename}` };
    }
  }
  