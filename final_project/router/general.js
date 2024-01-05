const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const router = express.Router();

//public_users.post("/register", (req,res) => {
  //Write your code here
 // return res.status(300).json({message: "Yet to be implemented"});
//});
//let users = {}; // Assuming users are stored in an object

public_users.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check if both username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if the username already exists
    if (users[username]) {
        return res.status(409).json({ message: "Username already exists" });
    }

    // Register the new user
    users[username] = { password }; // In a real application, you would hash the password before storing it
    return res.status(201).json({ message: "User registered successfully" });
});

// Get the book list available in the shop
//public_users.get('/',function (req, res) {
  //Write your code here
  //res.send(JSON.stringify({books},null,11));
//});
// Get the book list available in the shop using async-await
public_users.get('/', async (req, res) => {
    try {
      // Simulate fetching data asynchronously with a Promise
      const booksList = await new Promise((resolve) => {
        setTimeout(() => resolve(books), 100); // simulate async with timeout
      });
      res.json(booksList);
    } catch (error) {
      // Handle any errors that may occur
      res.status(500).json({ message: "Error fetching books", error });
    }
  });

// Get book details based on ISBN

 //public_users.get('/isbn/:isbn', function (req, res) {
   // const isbn = req.params.isbn; // Retrieve the ISBN from the request parameters
   // let bookDetails = null;

    // Iterate over the books to find the one with the matching ISBN
   // for (let key in books) {
     //   if (books.hasOwnProperty(key) && books[key].ISBN === isbn) {
       //     bookDetails = books[key];
         //   break;
       // }
    //}

    //if (bookDetails) {
      //  res.json(bookDetails); // Send book details as a JSON response
    //} else {
      //  res.status(404).send('Book not found'); // Send a 404 response if no book is found
    //}
//});
public_users.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn; // Retrieve the ISBN from the request parameters
    
    try {
        // Find the book by iterating over the object and matching the ISBN
        let bookDetails = null;
        for (let key in books) {
            if (books.hasOwnProperty(key) && books[key].ISBN === isbn) {
                bookDetails = books[key];
                break;
            }
        }

        if (bookDetails) {
            res.json(bookDetails); // Send book details as a JSON response
        } else {
            throw new Error('Book not found');
        }
    } catch (error) {
        res.status(404).send(error.message); // Send a 404 response if no book is found
    }
});

  
  
// Get book details based on author
//public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
//});
//public_users.get('/author/:author', function (req, res) {
  //  const author = req.params.author; // Retrieve the author from the request parameters
    //let booksByAuthor = [];

    // Iterate over the books to find those with the matching author
    //for (let key in books) {
      //  if (books.hasOwnProperty(key) && books[key].author === author) {
        //    booksByAuthor.push(books[key]);
        //}
    //}

    //if (booksByAuthor.length > 0) {
      //  res.json(booksByAuthor); // Send book details as a JSON response
    //} else {
      //  res.status(404).send('No books found by that author'); // Send a 404 response if no books are found
   // }
//});
public_users.get('/author/:author', async (req, res) => {
    const requestedAuthor = req.params.author; // Retrieve the author from the request parameters
    
    try {
        // Filter the books by author asynchronously
        const booksByAuthor = await new Promise((resolve, reject) => {
            const matchedBooks = Object.values(books).filter(book => book.author === requestedAuthor);
            
            if (matchedBooks.length > 0) {
                setTimeout(() => resolve(matchedBooks), 100); // simulate async operation with timeout
            } else {
                reject(new Error('No books found by that author'));
            }
        });

        res.json(booksByAuthor); // Send book details as a JSON response
    } catch (error) {
        res.status(404).send(error.message); // Send a 404 response if no books are found
    }
});


// Get all books based on title
//public_users.get('/title/:title', function (req, res) {
  //  const title = req.params.title; // Retrieve the title from the request parameters
    //let booksByTitle = [];

    // Iterate over the books to find those with the matching title
    //for (let key in books) {
      //  if (books.hasOwnProperty(key) && books[key].title === title) {
        //    booksByTitle.push(books[key]);
        //}
    //}

    //if (booksByTitle.length > 0) {
      //  res.json(booksByTitle); // Send book details as a JSON response
    //} else {
    //    res.status(404).send('No books found with that title'); // Send a 404 response if no books are found
    //}
//}); 
public_users.get('/title/:title', async (req, res) => {
    const requestedTitle = req.params.title; // Retrieve the title from the request parameters
    
    try {
        // Find the books by title asynchronously
        const booksByTitle = await new Promise((resolve, reject) => {
            const matchedBooks = Object.values(books).filter(book => book.title === requestedTitle);
            
            if (matchedBooks.length > 0) {
                setTimeout(() => resolve(matchedBooks), 100); // simulate async operation with timeout
            } else {
                reject(new Error('No books found with that title'));
            }
        });

        res.json(booksByTitle); // Send book details as a JSON response
    } catch (error) {
        res.status(404).send(error.message); // Send a 404 response if no books are found
    }
});


//  Get book review
//public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
//});
//public_users.get('/review/:isbn', function (req, res) {
  //  const isbn = req.params.isbn; // Retrieve the ISBN from the request parameters
    //let bookReviews = null;

    // Iterate over the books to find the one with the matching ISBN
    //for (let key in books) {
      //  if (books.hasOwnProperty(key) && books[key].ISBN === isbn) {
        //    bookReviews = books[key].reviews;
          //  break;
        //}
    //}

    //if (bookReviews) {
      //  res.json(bookReviews); // Send book reviews as a JSON response
    //} else {
      //  res.status(404).send('Book reviews not found'); // Send a 404 response if no reviews are found
   // }
//});
//const jwt = require('jsonwebtoken');
//const secretKey = 'yourSecretKey'; // Replace with a real secret key in your environment

// Mock users object for demonstration; replace with your database or user management service
//let users = {
  //  'john_doe': {
    //    password: 'hashed_password' // In a real application, this should be a hashed password
    //}
    // Add other users similarly
//};

public_users.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if both username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if the user exists and the password is correct
    // In a real application, you would compare the provided password after hashing it
    if (users[username] && users[username].password === password) {
        // User is valid, create a JWT
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour

        // Send the JWT to the client
       
        return res.status(200).send("User successfully logged in");
        
    } else {
        // Invalid username/password combination
        return res.status(401).json({ message: "Invalid username or password" });
    }
});

//public_users.post('/review/:isbn', (req, res) => {
  //  const isbn = req.params.isbn; // Get the ISBN from the URL
    //const reviewContent = req.query.review; // Assume the review is sent as a query parameter
    //const username = req.user.username; // Assume the username is stored in req.user.username (extracted from JWT)

    // Check if the book exists
    //if (!books[isbn]) {
      //  return res.status(404).json({ message: "Book not found" });
   // }

    // Check if a review is provided
    //if (!reviewContent) {
      //  return res.status(400).json({ message: "Review content required" });
    //}

    // If there's no 'reviews' object for the book, create one
    //if (!books[isbn].reviews) {
      //  books[isbn].reviews = {};
    //}

    // Add or update the review for the user
    //books[isbn].reviews[username] = review;

    // Respond with a success message
    //return res.status(200).json({
      //  message: "Review added/updated successfully",
       // reviews: books[isbn].reviews
    //});
//});

//public_users.get('/review/:isbn', function (req, res) {
  //  const isbn = req.params.isbn; // Retrieve the ISBN from the request parameters
    //const book = books[isbn];

   // if (book && book.reviews) {
     //   res.json(book.reviews); // Send book reviews as a JSON response
    //} else {
      //  res.status(404).send('No reviews found for this book'); // No book or no reviews for the book
    //}
//});
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn; // Retrieve the ISBN from the request parameters
    let bookReview = null;

    // Iterate over the books to find the one with the matching ISBN and its review
    for (let key in books) {
        if (books.hasOwnProperty(key) && books[key].ISBN === isbn) {
            bookReview = books[key].reviews; // Might be a string or an object
            break;
        }
    }

    if (bookReview) {
        res.json({ review: bookReview }); // Send book reviews as a JSON response
    } else {
        res.status(404).send('No reviews found for this book'); // No book or no reviews for the book
    }
});


module.exports.general = public_users;
