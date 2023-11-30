const express = require('express');
var router = express.Router();
const laureatController = require('../controllers/laureat.controller');



router.get("/get-by-id/:id", laureatController.getLaureatById)
router.get("/multi/:count", laureatController.getMultiLaureat)
router.get("/nb-by-year/:year", laureatController.getLaureatByYear)
router.get("/year-without-laureat", laureatController.getYearWithoutLaureat)
router.get("/sort-number-laureat-by-year", laureatController.getNumberOfLaureatByYear)
router.delete("/delete/:id", laureatController.deleteLaureatById)
router.patch("/update", laureatController.updateLaureatMotivation);
router.get("/search-by-name/:name", laureatController.getNameBySearch);
router.get("/search-by-name/:name", laureatController.getNameBySearch);

router.get("/", laureatController.getAllLaureat)


module.exports = router;