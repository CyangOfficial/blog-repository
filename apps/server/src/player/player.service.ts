import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from './interface/player.interface';
import { PlayerModel } from './models/player.model';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async findAllPublic(): Promise<PlayerModel[]> {
    return this.playerModel.find({ isPublic: { $ne: false } });
  }

  async findOneById(id: string): Promise<PlayerModel> {
    return this.playerModel.findById(id);
  }

  // async create(): Promise<PlayerModel> {}
}
