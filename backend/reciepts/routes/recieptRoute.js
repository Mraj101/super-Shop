const express = require("express");

const router = express.Router();

//destructuring the controllers
const {
  getAllReciepts,
  createReciepts,
  getSingleReciept,
  deleteRecieptById,
  updateReciept,
} = require("../controllers/recieptController");

//get all workouts

router.get("/getAll", getAllReciepts);
router.get("/:id", getSingleReciept);
router.post("/crt", createReciepts);
router.delete("/:id", deleteRecieptById);
router.put("/:id", updateReciept);
module.exports = router;
