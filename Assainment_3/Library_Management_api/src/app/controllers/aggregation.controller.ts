import { Request, Response, Router } from 'express';
import { Book } from '../models/book.model';
import { Borrow } from '../models/aggregation.model';

export const borrowRouter = Router();

// Borrow a Book
borrowRouter.post('/post', async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;

    // Check if book exists and has enough copies
    const bookToBorrow = await Book.findById(book);
    
    if (!bookToBorrow) {
       res.status(404).json({
        message: 'Book not found',
        success: false,
      });
    }

    if (bookToBorrow.copies < quantity) {
     
       res.status(400).json({
        message: 'Not enough copies available',
        success: false,
      });
    }

    const borrow = await Borrow.create({
      book,
      quantity,
      dueDate: new Date(dueDate),
    });

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow,
    });
  } catch (error: any) {
    res.status(400).json({
      message: 'Error borrowing book',
      success: false,
      error: error.message,
    });
  }
});

// Borrowed Books Summary
borrowRouter.get('/get', async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'book',
        },
      },
      {
        $unwind: '$book',
      },
      {
        $project: {
          _id: 0,
          book: {
            title: '$book.title',
            isbn: '$book.isbn',
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: summary,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error retrieving borrowed books summary',
      success: false,
      error: error.message,
    });
  }
});