
import express, { Request, Response } from 'express';
import { Book, Genre } from '../models/book.model';
export const booksRoutes = express.Router();


booksRoutes.post('/create-book', async (req: Request, res: Response) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book,
        });
    } catch (error: any) {
        res.status(400).json({
            message: 'Validation failed',
            success: false,
            error: error.errors || error.message,
        });
    }
})


booksRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const { filter, sort, sortBy, limit } = req.query;

        const query: any = {};
        if (filter && Object.values(Genre).includes(filter as Genre)) {
            query.genre = filter;
        }

        const sortOptions: any = {};
        if (sortBy) {
            sortOptions[sortBy as string] = sort === 'desc' ? -1 : 1;
        }

        const books = await Book.find(query)
            .sort(sortOptions)
            .limit(Number(limit) || 10);

        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Error retrieving books',
            success: false,
            error: error.message,
        });
    }
})

booksRoutes.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findById(bookId);
        if (!book) {
            res.status(404).json({ success: false, message: 'Book not found' });
        }

        res.json({
            success: true,
            message: 'Book retrieved successfully',
            data: book,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving book', error });
    }
});
booksRoutes.put('/:bookId', async (req: Request, res: Response) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.bookId,
            req.body,
            { new: true, runValidators: true }
        );
        if (!book) {
            res.status(404).json({
                message: 'Book not found',
                success: false,
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: book,
        });
    } catch (error: any) {
        res.status(400).json({
            message: 'Validation failed',
            success: false,
            error: error.errors || error.message,
        });
    }
});
booksRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.bookId);
        if (!book) {
            res.status(404).json({
                message: 'Book not found',
                success: false,
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: null,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Error deleting book',
            success: false,
            error: error.message,
        });
    }
});


