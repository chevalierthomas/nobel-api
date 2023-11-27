const laureatService = require("../services/laureat.service");


exports.getAllLaureat = (req, res) => {
    laureatService.getAllLaureat((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}