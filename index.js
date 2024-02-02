const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const Book = require('./model/book');

app.use(express.json());

const uri = 'mongodb://localhost:27017/bookstore';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Add Book
app.post('/api/books', async (req, res) => {
  const newBook = new Book(req.body);


  const book = await Book.create(newBook);

  const response = {
    id: book.id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    price: book.price,
  }
  res.status(201).json(response);
});

app.put('/api/books/:id', (req, res) => {
  res.send(`PUT request to update book with id ${req.params.id}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Fetch All Books
app.get('/api/books', async (req, res) => {
  const books = await Book.find().lean();
  books.forEach(book => {
    delete book._id;
    delete book.__v;
  });
  res.status(200).json({ "books": books });
});

// Fetch Book by ID
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findOne({ id: req.params.id }).lean();
    delete book._id;
    delete book.__v;
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ message: "Book with id: " + req.params.id + " not found" });
  }
});
