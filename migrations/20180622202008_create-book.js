"use strict";

exports.up = function(knex, Promise) {
    return knex.schema.createTable('book', (table) =>{
        table.increments();
        table.text('name');
        table.float('rating');
        table.integer('totalScore')
        table.integer('noOfUsers');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('book');
};
