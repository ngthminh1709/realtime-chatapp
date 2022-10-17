const express = require("express");
const path = require("path");
const expressEjsExtend = require('express-ejs-extend')
// You can specify which plugins you need


const configViewEngine = (app) => {
    app.use(express.static(".src/public"));
    app.engine('ejs', expressEjsExtend); 
    app.set('view engine', 'ejs');
    app.set('views', './src/views');
}

module.exports = configViewEngine;
