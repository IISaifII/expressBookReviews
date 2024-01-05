const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
//regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
//});
regd_users.post("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn; // Retrieve the ISBN from the request parameters
    const { review, username } = req.body; // Retrieve the review and username from the request body

    // Check if the book exists
    if (!books[isbn]) {
        return res.status(404).send({ message: "Book not found" });
    }

    // Check if a review content is provided
    if (!review) {
        return res.status(400).send({ message: "Review content required" });
    }

    // If there's no 'reviews' object for the book, create one
    if (!books[isbn].reviews) {
        books[isbn].reviews = {};
    }

    // Add or update the review for this user
    books[isbn].reviews[username] = review;

    return res.status(200).send({
        message: "Review added successfully",
        review: books[isbn].reviews[username]
    });
});

regd_users.delete('/auth/review/:isbn', (req, res) => {
    // Assume req.user contains the authenticated user's details, extracted from JWT
    const { isbn } = req.params;
    const username = req.user.username; // This should be set by your JWT authentication middleware

    if (books[isbn]) {
        // Check if the user has previously left a review
        if (books[isbn].reviews && books[isbn].reviews[username]) {
            // Delete the user's review
            delete books[isbn].reviews[username];
            res.status(200).json({ message: "Review deleted successfully" });
        } else {
            res.status(404).json({ message: "No review by this user found for this book" });
        }
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;


