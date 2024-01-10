const express = require('express');
const { getDb, connectToDb } = require('./db');
const { ObjectId } = require('mongodb');

// Initialize Express app and use JSON middleware
const app = express();
app.use(express.json());

let db; // Variable to hold the database connection

// Connect to the database and start the server
connectToDb((err) => {
  if (!err) {
    app.listen('3000', () => {
      console.log('app listening on port 3000');
    });
    db = getDb(); // Get the database instance
  }
});

// GET route to fetch a paginated list of books
app.get('/books', (req, res) => {
  // Pagination parameters
  const page = req.query.p || 0;
  const booksPerPage = 3;

  let books = [];

  // Query the 'books' collection, sort by author, paginate, and send the response
  db.collection('books')
    .find()
    .sort({ author: 1 })
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: 'Could not fetch the documents' });
    });
});

// GET route to fetch a single book by ID
app.get('/books/:id', (req, res) => {
  // Check if the provided ID is valid
  if (ObjectId.isValid(req.params.id)) {
    // Find the book by ID and send the response
    db.collection('books')
      .findOne({ _id: new ObjectId(req.params.id) })
      .then(doc => {
        res.status(200).json(doc);
      })
      .catch(err => {
        res.status(500).json({ error: 'Could not fetch the document' });
      });
  } else {
    res.status(500).json({ error: 'Could not fetch the document' });
  }
});

// POST route to create a new book
app.post('/books', (req, res) => {
  const book = req.body;

  // Insert the new book into the 'books' collection and send the response
  db.collection('books')
    .insertOne(book)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({ err: 'Could not create new document' });
    });
});

// DELETE route to delete a book by ID
app.delete('/books/:id', (req, res) => {
  // Check if the provided ID is valid
  if (ObjectId.isValid(req.params.id)) {
    // Delete the book by ID and send the response
    db.collection('books')
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({ error: 'Could not delete document' });
      });
  } else {
    res.status(500).json({ error: 'Could not delete document' });
  }
});

// PATCH route to update a book by ID
app.patch('/books/:id', (req, res) => {
  const updates = req.body;

  // Check if the provided ID is valid
  if (ObjectId.isValid(req.params.id)) {
    // Update the book by ID and send the response
    db.collection('books')
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({ error: 'Could not update document' });
      });
  } else {
    res.status(500).json({ error: 'Could not update document' });
  }
});
