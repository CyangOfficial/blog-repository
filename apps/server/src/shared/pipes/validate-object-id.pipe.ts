import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class ValidateObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const _id = typeof value === 'object' ? value._id : value;
    // console.log(_id)d
    const isObjectId = mongoose.Types.ObjectId.isValid(_id);
    if (!isObjectId) throw new BadRequestException('无效的ID');
    return value;
  }
}
