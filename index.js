const express = require('express');
const app = express();
app.use(express.json());

// Serve static index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// JSON array of books
let books = [];



// Add book to collection
app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;
  const id = Date.now().toString();
  const book = { id, title, author, publishedDate };
  books.push(book);
  res.json(book);
});

// Get all books in collection
app.get('/books', (req, res) => {
  res.json(books);
});

// Delete book from collection
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    res.json({ message: 'Book successfully deleted.' });
  } else {
    res.json({ message: 'Book not found.' });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
