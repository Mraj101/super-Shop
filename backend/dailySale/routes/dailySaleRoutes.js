const express = require("express");
const router = express.Router();

const {
    getDailySale,
} = require("../controllers/dailysaleController");

router.post("/getSale", getDailySale);


module.exports = router;
