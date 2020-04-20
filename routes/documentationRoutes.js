//import express
const express = require("express");

//set the router
const router = express.Router();

//import the documentation object
const doc = require("./../util/documentationObject");


router.get('/', (req, res, next) => {res.json(doc)});


module.exports = router;