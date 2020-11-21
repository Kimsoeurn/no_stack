const express = require('express');
const router = express.Router();

const Author = require('../models/author');

// All Authors Route
router.get('/', async (req, res) => {
    let q = req.query.name;
    let searchOptions = {};
    if (q != null && q != '') {
        searchOptions.name = new RegExp(q, 'i');
    }
    try {
        const authors = await Author.find(searchOptions);
        res.render('authors/index', { authors: authors, q: q });
    } catch {
        res.redirect('/');
    }
});

// New Author Route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() });
});

// Create new author route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    });
    try {
        const newAuthor = await author.save();
        res.redirect('authors');
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: "Error creating author"
        });
    }
});

module.exports = router;