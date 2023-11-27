const express = require('express');
var router = express.Router();
const laureatController = require('../controllers/laureat.controller');

router.get("/", laureatController.getAllLaureat)
router.get("/:id", laureatController.getLaureatById)


module.exports = router;