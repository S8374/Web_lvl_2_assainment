import { Books } from '../models/book.model';
import express, { Request, Response } from 'express';
export const booksRoutes = express.Router();


booksRoutes.post('/create-book', async (req: Request, res: Response) => {
    const body = req.body;
    console.log(body)
    const books = await Books.create(body);
    res.status(201).json({
        success: true,
        massage: "Book created successfully",
        data: books
    })
})


booksRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query;

        const query: any = {};
        if (filter) {
            query.genre = filter;
        }

        const sortOrder = sort === 'desc' ? -1 : 1;

        const books = await Books.find(query)
            .sort({ [sortBy as string]: sortOrder })
            .limit(Number(limit));

        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve books',
            error
        });
    }
})

booksRoutes.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const book = await Books.findById(bookId);
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
        const { bookId } = req.params;
        const updates = req.body;

        const book = await Books.findByIdAndUpdate(bookId, updates, { new: true, runValidators: true });
        if (!book) {
             res.status(404).json({ success: false, message: 'Book not found' });
        }

        res.json({
            success: true,
            message: 'Book updated successfully',
            data: book,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Validation failed', error });
    }
});
booksRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const book = await Books.findByIdAndDelete(bookId);

        if (!book) {
             res.status(404).json({ success: false, message: 'Book not found' });
        }

        res.json({
            success: true,
            message: 'Book deleted successfully',
            data: null,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting book', error });
    }
});


