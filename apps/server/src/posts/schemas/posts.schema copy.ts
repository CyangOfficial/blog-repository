import { string } from '@hapi/joi';
import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    posterUrl: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    lastModifiedDate: {
      type: Date,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    pv: {
      type: Number,
      default: 0,
    },
    like: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: 'post',
    timestamps: true,
  },
);
