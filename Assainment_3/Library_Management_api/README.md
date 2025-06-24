# Library Management API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green)

A robust Library Management System API built with Express, TypeScript, and MongoDB (via Mongoose).

## Features

- **Book Management**: CRUD operations for books with validation
- **Borrowing System**: Track book borrows with quantity control
- **Advanced Queries**: Filtering, sorting, and pagination
- **Aggregation Pipeline**: Generate borrowed books reports
- **Type Safety**: Full TypeScript support
- **Validation**: Comprehensive schema validation

## Technologies

- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose ODM)
- **Language**: TypeScript
- **Tools**: ESLint, Nodemon

## API Endpoints

### Books

| Method | Endpoint           | Description                          |
|--------|--------------------|--------------------------------------|
| POST   | `/books/create-book`       | Create a new book                    |
| GET    | `/books`       | Get all books (filtering available)  |
| GET    | `/books/:bookId`   | Get a single book                    |
| PUT    | `/books/:bookId`   | Update a book                        |
| DELETE | `/books/:bookId`   | Delete a book                        |

### Borrow

| Method | Endpoint           | Description                          |
|--------|--------------------|--------------------------------------|
|                       
| GET    | `/books/borrow`      | Get borrowed books summary           |

## 🌐 Live Deployment
Deployed on Vercel : 

```
🔗 https://library-management-api-pink.vercel.app
```

## Installation
1.Git clone
```
https://github.com/S8374/Web_lvl_2_assainment.git
```


2. Install dependencies:
```
npm install
```