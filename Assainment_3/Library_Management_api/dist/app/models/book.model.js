"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true, enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'] },
    isbn: { type: String, required: true, unique: true },
    description: String,
    copies: { type: Number, required: true, min: [0, 'Copies must be a positive number'] },
    available: { type: Boolean, default: true }
}, { timestamps: true });
exports.Books = (0, mongoose_1.model)("Book", BookSchema);
