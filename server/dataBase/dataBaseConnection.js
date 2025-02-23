const express = require('express');
const mysql = require('mysql');
require('dotenv').config()

var db2;
var pool  = mysql.createPool({
  host     : process.env.host,
  user     : process.env.user,
  password : process.env.password,
  database: process.env.database,
   dialectOptions: {
    useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: function (field, next) { // for reading from database
      if (field.type === 'DATETIME') {
        return field.string()
      }
        return next()
      },
  },
  timezone: '+01:00'


});

pool.getConnection(function(err, connection) {
    if(err) { 
      console.log(err); 
      // callback(true); 
      return; 
    }

   db2 = connection;

   db2.query("SELECT * from `sessions`",function (err, result) {
   })
   console.log('MySql Connected...');
  })

module.exports = pool;
