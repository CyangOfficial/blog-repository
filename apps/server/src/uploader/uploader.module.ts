import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { UploaderController } from './uploader.controller';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  // imports: [MulterModule.registerAsync({
  //   useFactory: () => ({
  //     dest: '/upload',
  //   }),
  // })],
  providers: [UploaderService],
  controllers: [UploaderController],
})
export class UploaderModule {}
