const express = require("express");
const path = require("path");
const percelController = require("../controllers/percel");

const router = express.Router();

router.get("/all", percelController.all);
router.post("/add", percelController.add);
router.put("/status", percelController.updateStatus);

module.exports = router;