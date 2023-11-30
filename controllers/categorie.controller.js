const categorieService = require("../services/categorie.service");
const {query} = require("express");

exports.getCategorie = (req, res) => {
    categorieService.getCategorie((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getCategorieWithMostLeaureat = (req, res) => {
    categorieService.getCategorieWithMostLeaureat((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

