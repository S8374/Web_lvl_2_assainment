# Library Management API 


A robust Library Management System API built with Express, TypeScript, and MongoDB (via Mongoose).

## Features
### Book Management


- Create, read, update, and delete books
- Filter books by genre (**FICTION, NON_FICTION, SCIENCE**, etc.)
- Sort books by **title, author, createdAt**, etc.


### Borrowing System

- Borrow books with quantity validation
- Automatic availability updates when books run out of copies
- Track due dates for returns
### Aggregation & Reporting
- Get a summary of borrowed books with total quantities
- Group borrow records by book with lookup for book details
### TypeScript & Schema Validation
- Proper HTTP status codes **(400, 404, 500)**
- Structured error responses
## Tech Stack 
- Backend: Node.js, Express, TypeScript

- Database: MongoDB (Mongoose ODM)

- API Testing: Thunder Client / Postman

## Setup & Installation ⚙️
### Prerequisites
- Node.js (v18+)

- MongoDB (local or cloud URI)

- Yarn / npm
### 1. Clone the Repository
```
git clone https://github.com/yourusername/library-management-api.git

cd library-management-api
```
### 2. Install Dependencies
```
npm install
# or
yarn install

```
### 3. Set Up Environment Variables
```
MONGODB_URI=mongodb://localhost:27017/library

PORT=3000
```
### 4. Run the Application
 #### Development Mode (with hot reload):
```
npm run dev
# or
yarn dev

```
### Production Build:
```
npm run build && npm start
# or
yarn build && yarn start

```
### API Endpoints 🌐

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
| GET    | `/borrow/get`      | Get borrowed books summary           |
| post | `/books/post`   | Borrow a book (checks availability)                      |

## 🌐 Live Deployment
Deployed on Vercel : 

```
🔗 https://library-management-api-pink.vercel.app
```

## Example Requests 📤
#### Create a Book 
```
POST /api/books
Content-Type: application/json

{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "copies": 5
}

```
#### Borrow a Book
```
POST /api/borrow
Content-Type: application/json

{
  "book": "64f123abc4567890def12345",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}

```



