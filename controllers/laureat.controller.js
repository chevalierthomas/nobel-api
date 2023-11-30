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


exports.getLaureatByYear = (req, res) => {
    const year = req.params.year;
    laureatService.getLaureatByYear(year, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getYearWithoutLaureat = (req, res) => {
    laureatService.getYearWithoutLaureat( (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getNumberOfLaureatByYear = (req, res) => {
    const sortType = req.query.sort;
    laureatService.getNumberOfLaureatByYear(sortType, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.deleteLaureatById = (req, res) => {
    const id = req.params.id;
    console.log(id)
    laureatService.deleteLaureatById(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}
