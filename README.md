# MongoDB Practice Code 2

This repository contains a practical implementation of MongoDB operations using Mongoose for a simple book-related application. The code covers essential concepts such as connecting to MongoDB, creating schemas, models, and performing CRUD operations. It also includes an Express.js server for handling HTTP requests.
<br> <br>


### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running
<br> <br>


### Project Structure
The project is organized into the following files:

- db.js: Manages the MongoDB connection and provides utility functions.
- index.js: Entry point for the Express.js server.
- README.md: Documentation file.
- package.json: Includes project metadata and dependencies.

### API Endpoints
##### GET /books
- Fetch a paginated list of books.
- Parameters: p (optional): Page number for pagination.


##### GET /books/:id
- Fetch details of a single book by ID.


##### POST /books
- Create a new book.


##### DELETE /books/:id
- Delete a book by ID.

##### PATCH /books/:id
- Update details of a book by ID.
<br> <br>

#### Sample Data
The server provides sample book data with information such as title, author, pages, genres, rating, and reviews.
<br> <br> 

#### Dependencies
- Express.js: Web application framework for Node.js.
- Mongoose: MongoDB object modeling tool.
