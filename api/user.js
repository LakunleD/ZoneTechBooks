"use strict";
const express = require('express');

const queries = require('../db/queries');

const router = express.Router();

function isValidId(req, res, next) {
    if (isNaN(req.params.id)) return next();
    next(new Error('Invalid User Id'));
}

router.get('/', (req, res) => {
    queries.getAllUsers()
        .then(user => {
            res.json({user});
        });
});

router.post('/', (req, res, next) => {
    queries.createUser(req.body)
        .then(user => {
            res.json(user[0]);
        });
});

router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    queries.getOneUser(id)
        .then(User => {
            if (User) {
                res.json(User);
            }
            else {
                next();
            }
        });
});

router.put('/:id', isValidId, (req, res, next) => {
    let id = req.params.id;
    queries.updateUser(id, req.body)
        .then(User => {
            res.json(User[0]);
        });
});

router.delete("/:id", isValidId, (req, res, next) => {
    let id = req.params.id;
    queries.deleteUser(id)
        .then(() => {
            res.json({
                deleted: true
            })
        });
});


module.exports = router;
