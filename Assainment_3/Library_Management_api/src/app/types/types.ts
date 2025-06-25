import { Request } from 'express';

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export interface BookCreateRequest {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}

export interface BookUpdateRequest {
  title?: string;
  author?: string;
  genre?: string;
  isbn?: string;
  description?: string;
  copies?: number;
  available?: boolean;
}

export interface BorrowCreateRequest {
  book: string;
  quantity: number;
  dueDate: string;
}