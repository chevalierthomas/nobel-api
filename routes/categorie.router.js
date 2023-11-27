const express = require('express');
var router = express.Router();
const categorieController = require('../controllers/categorie.controller');

router.get("/", categorieController.getCategorie)
router.get("/most-laureat", categorieController.getCategorieWithMostLeaureat)


module.exports = router;