
import express, { Request, Response } from 'express';
import { Borrow } from '../models/aggregation.model';
export const aggregationRoutes = express.Router();

aggregationRoutes.get('/borrow', async (req: Request, res: Response) => {
  try {
    const data = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' }
        }
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails'
        }
      },
      { $unwind: '$bookDetails' },
      {
        $project: {
          book: {
            title: '$bookDetails.title',
            isbn: '$bookDetails.isbn'
          },
          totalQuantity: 1
        }
      }
    ]);

    res.json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve summary',
      error
    });
  }
});