import { model, Schema } from "mongoose";
import { Book } from "../interface/book.interface";

const BookSchema = new Schema<Book>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true, enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'] },
    isbn: { type: String, required: true, unique: true },
    description: String,
    copies: { type: Number, required: true, min: [0, 'Copies must be a positive number'] },
    available: { type: Boolean, default: true }
}, { timestamps: true })

export const Books = model("Book", BookSchema);
