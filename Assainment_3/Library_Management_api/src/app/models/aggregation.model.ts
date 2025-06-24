import { model, Schema } from "mongoose";

const BorrowSchema = new Schema({
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, 
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true } 
}, { timestamps: true });

export const Borrow = model('Borrow', BorrowSchema);