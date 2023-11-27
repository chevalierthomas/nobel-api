const express = require('express');
var router = express.Router();
const categorieController = require('../controllers/categorie.controller');

router.get("/", categorieController.getCategorie)


module.exports = router;