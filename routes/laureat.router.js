const express = require('express');
var router = express.Router();
const laureatController = require('../controllers/laureat.controller');

router.get("/get-by-id/:id", laureatController.getLaureatById)
router.get("/multi", laureatController.getMultiLaureat)
router.get("/nb-by-year", laureatController.getLaureatByYear)
router.get("/year-without-laureat", laureatController.getYearWithoutLaureat)
router.get("/sort-number-laureat-by-year", laureatController.getNumberOfLaureatByYear)
router.delete("/delete/:id", laureatController.deleteLaureatById)
router.patch("/update", laureatController.updateLaureatMotivation);
router.get("/search-by-name/:name", laureatController.getNameBySearch);
router.get("/pagination", laureatController.getPagination);
router.get("/", laureatController.getAllLaureat)

module.exports = router;