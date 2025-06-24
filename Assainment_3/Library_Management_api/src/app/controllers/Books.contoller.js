"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const book_model_1 = require("../models/book.model");
const express_1 = __importDefault(require("express"));
exports.booksRoutes = express_1.default.Router();
exports.booksRoutes.post('/create-book', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    const books = yield book_model_1.Books.create(body);
    res.status(201).json({
        success: true,
        massage: "Book created successfully",
        data: books
    });
}));
exports.booksRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const sortOrder = sort === 'desc' ? -1 : 1;
        const books = yield book_model_1.Books.find(query)
            .sort({ [sortBy]: sortOrder })
            .limit(Number(limit));
        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve books',
            error
        });
    }
}));
exports.booksRoutes.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.Books.findById(bookId);
        if (!book) {
            res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.json({
            success: true,
            message: 'Book retrieved successfully',
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving book', error });
    }
}));
exports.booksRoutes.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const updates = req.body;
        const book = yield book_model_1.Books.findByIdAndUpdate(bookId, updates, { new: true, runValidators: true });
        if (!book) {
            res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.json({
            success: true,
            message: 'Book updated successfully',
            data: book,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Validation failed', error });
    }
}));
exports.booksRoutes.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.Books.findByIdAndDelete(bookId);
        if (!book) {
            res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.json({
            success: true,
            message: 'Book deleted successfully',
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting book', error });
    }
}));
