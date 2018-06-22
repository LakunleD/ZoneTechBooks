"use strict";

exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', (table) =>{
        table.increments();
        table.text('name');
        table.text('admin');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('user');
};
