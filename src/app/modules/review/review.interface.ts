import { Schema } from 'mongoose';

export interface IReview {
  comment: string;
  product: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  rating: number;
}
