const laureatService = require("../services/laureat.service");
const {query} = require("express");


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

exports.getLaureatById = (req, res) => {
    const id = req.params.id;
    laureatService.getLaureatById(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}
exports.getMultiLaureat = (req, res) => {
    const count = req.params.count;
    laureatService.getMultiLaureat(count, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

