const express = require("express");
const path = require("path");
const warehouseController = require("../controllers/warehouse");

const router = express.Router();

router.get("/", warehouseController.all);
router.post("/add", warehouseController.add);
router.get("/address", warehouseController.address);

module.exports = router;