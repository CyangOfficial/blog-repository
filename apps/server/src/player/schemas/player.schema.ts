import * as mongoose from 'mongoose';
export const PlayerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    lrc: {
      type: String,
      required: true,
    },
    coverUrl: {
      type: String,
      required: true,
    },
    musicUrl: {
      type: String,
      required: true,
    },
    isPublic: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'player',
    timestamps: true,
  },
);
