import { Injectable, BadRequestException } from '@nestjs/common';
import sharp from 'sharp';
import COS from 'cos-nodejs-sdk-v5';
import { v4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';

@Injectable()
export class UploaderService {
  private client: COS;
  private objectKey: string;
  private cosBucket: string;
  private cosRegion: string;
  constructor(private configService: ConfigService) {
    this.objectKey = this.configService.get('cosObjectKey');
    this.cosBucket = this.configService.get('cosBucket');
    this.cosRegion = this.configService.get('cosRegion');
    this.client = new COS({
      SecretId: this.configService.get('cosSecretId'),
      SecretKey: this.configService.get('cosSecretKey'),
    });
  }

  // 图片转换成webp格式
  async imgToWebp(img: Buffer) {
    const buffer = await sharp(img).webp({ lossless: true }).toBuffer();
    return buffer;
  }

  // 腾迅云对象存储
  putObject(name: string, file: Buffer) {
    try {
      return new Promise((resolve, reject) => {
        this.client.putObject(
          {
            Bucket: this.cosBucket,
            Region: this.cosRegion,
            Key: this.objectKey + '/' + name,
            Body: file,
          },
          function (err, data) {
            if (err) {
              reject(err);
              throw new BadRequestException('上传失败');
            }
            resolve(data);
          },
        );
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      const { originalname, buffer } = file;
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      let ext = extname(originalname).split('.')[1];
      const uuid = v4();
      const filename = `${uuid}.webp`;
      if (imageExtensions.includes(ext)) {
        ext = 'webp';
        const webpBuffer = await this.imgToWebp(buffer);
        await this.putObject(filename, webpBuffer);
      }
      await this.putObject(filename, buffer);
      const url = `https://${this.cosBucket}.cos.${this.cosRegion}.myqcloud.com/${this.objectKey}/${uuid}.${ext}`;
      console.log(url);
      const res = {
        name: originalname,
        url,
      };
      return res;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
