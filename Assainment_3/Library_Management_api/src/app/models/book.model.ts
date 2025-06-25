import mongoose, { Document, Model, Schema } from 'mongoose';

export enum Genre {
  FICTION = 'FICTION',
  NON_FICTION = 'NON_FICTION',
  SCIENCE = 'SCIENCE',
  HISTORY = 'HISTORY',
  BIOGRAPHY = 'BIOGRAPHY',
  FANTASY = 'FANTASY',
}

export interface IBook extends Document {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBookModel extends Model<IBook> {
  updateAvailability(bookId: string): Promise<IBook | null>;
}

const bookSchema = new Schema<IBook, IBookModel>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, 'Genre is required'],
      enum: Object.values(Genre),
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    copies: {
      type: Number,
      required: [true, 'Copies is required'],
      min: [0, 'Copies must be a positive number'],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Static method to update availability
bookSchema.statics.updateAvailability = async function (bookId: string) {
  const book = await this.findById(bookId);
  if (!book) return null;

  if (book.copies === 0) {
    book.available = false;
    await book.save();
  } else if (!book.available) {
    book.available = true;
    await book.save();
  }

  return book;
};

// Middleware to update availability before saving
bookSchema.pre('save', function (next) {
  if (this.copies === 0) {
    this.available = false;
  } else if (!this.available) {
    this.available = true;
  }
  next();
});

export const Book = mongoose.model<IBook, IBookModel>('Book', bookSchema);