const express = require("express");
const router = express.Router();

const {
    createDailySale,
} = require("../controllers/dailysaleController");

router.post("/crt", createDailySale);


module.exports = router;
