"use strict";
const knex = require('./knex');

module.exports = {
    getAllUsers(){
        return knex('user');
    },
    getOneUser(id){
        return knex('user').where('id', id).first();
    },
    createUser(user){
        return knex('user').insert(user, "*");
    },
    updateUser(id, user){
        return knex('user').where('id', id).update(user, "*");
    },
    deleteUser(id){
        return knex('user').where('id', id).del();
    },
    getAllBooks(){
        return knex('book').select("name, rating");
    },
    getOneBook(id){
        return knex('book').where('id', id).first();
    },
    createBook(book){
        return knex('book').insert(book, "*");
    },
    updateBook(id, book){
        return knex('book').where('id', id).update(book, "*");
    },
    deleteBook(id){
        return knex('book').where('id', id).del();
    }
}
