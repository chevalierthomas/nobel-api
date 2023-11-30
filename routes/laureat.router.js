const express = require('express');
var router = express.Router();
const laureatController = require('../controllers/laureat.controller');

router.get("/", laureatController.getAllLaureat)
router.get("/get-by-id/:id", laureatController.getLaureatById)
router.get("/multi/:count", laureatController.getMultiLaureat)
router.get("/nb-by-year/:year", laureatController.getLaureatByYear)
router.get("/yearWithoutLaureat", laureatController.getYearWithoutLaureat)



module.exports = router;