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
exports.aggregationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const aggregation_model_1 = require("../models/aggregation.model");
exports.aggregationRoutes = express_1.default.Router();
exports.aggregationRoutes.get('/borrow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield aggregation_model_1.Borrow.aggregate([
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve summary',
            error
        });
    }
}));
