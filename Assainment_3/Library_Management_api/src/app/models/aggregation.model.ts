import mongoose, { Document, Model, Schema } from 'mongoose';
import { IBook } from './book.model';

export interface IBorrow extends Document {
  book: mongoose.Types.ObjectId | IBook;
  quantity: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, 'Book reference is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to validate book availability before saving
borrowSchema.pre('save', async function (next) {
  const book = await mongoose.model('Book').findById(this.book);
  if (!book) {
    throw new Error('Book not found');
  }

  if (book.copies < this.quantity) {
    throw new Error('Not enough copies available');
  }

  // Deduct copies from the book
  book.copies -= this.quantity;
  await book.save();

  next();
});

export const Borrow = mongoose.model<IBorrow>('Borrow', borrowSchema);