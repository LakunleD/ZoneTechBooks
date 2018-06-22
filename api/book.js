"use strict";
const express = require('express');

const queries = require('../db/queries');

const router = express.Router();

function isValidId(req, res, next) {
    if (isNaN(req.params.id)) return next();
    next(new Error('Invalid Id'));
}

router.get('/', (req, res) => {
    queries.getAllBooks()
        .then(books => {
            res.json({books});
        });
});

router.post('/', (req, res, next) => {
    queries.createBook(req.body)
        .then(stickers => {
            res.json(stickers[0]);
        });
});

router.get('/:id', isValidId, (req, res, next) => {
    let id = req.params.id;
    queries.getOneBook(id)
        .then(book => {
            if (book) {
                res.json(book);
            }
            else {
                next();
            }
        });
});

router.put('/:id', isValidId, (req, res, next) => {
    let id = req.params.id;

    const {userID, name} = req.body;

    queries.getOneUser(userID)
        .then(User => {
            if (User) {
                if (User.admin) {
                    queries.updateBook(id, {name})
                        .then(Book => {
                            res.json(Book[0]);
                        });
                }
                else {
                    next(new Error('Unauthorised User'));
                }
            }
            else {
                next();
            }
        });
});

router.put('/rating/:id', isValidId, (req, res, next) => {
    let id = req.params.id;

    const {userID, score} = req.body;

    queries.getOneUser(userID)
        .then(User => {
            if (User) {
                if (User.admin) {
                    queries.getOneBook(id)
                        .then(book => {
                            if (book) {
                                let totalScore = book.totalScore + score; //change the total score of the books
                                let noOfUsers = book.noOfUsers + 1; //increment the number of users to have rated the book

                                //use the totalScore and noOfUsers to calculate the new rating
                                let rating = totalScore / noOfUsers;

                                queries.updateBook(id, {rating, totalScore, noOfUsers})
                                    .then(sticker => {
                                        res.json(sticker[0]);
                                    })
                            }
                            else {
                                next();
                            }
                        });
                }
                else {
                    next(new Error('Unauthorised User'));
                }
            }
            else {
                next();
            }
        });
});


router.delete("/:id", isValidId, (req, res, next) => {
    let id = req.params.id;
    queries.deleteBook(id)
        .then(() => {
            res.json({
                deleted: true
            })
        });
});


module.exports = router;
