const express = require('express');
const router = express.Router();

let books = {
      1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {} , "ISBN":"100"},
      2: {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {}, "ISBN":"101"},
      3: {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {},"ISBN":"102" },
      4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {},"ISBN":"103" },
      5: {"author": "Unknown","title": "The Book Of Job", "reviews": {} ,"ISBN":"104"},
      6: {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {},"ISBN":"105" },
      7: {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} ,"ISBN":"106"},
      8: {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {},"ISBN":"107" },
      9: {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {},"ISBN":"108" },
      10: {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {},"ISBN":"109" }
}

module.exports = books;


