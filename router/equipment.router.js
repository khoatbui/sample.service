const express = require("express");
const controller = require("../controller/equipment.controller");

const router = express.Router();

router.get("/", controller.getAllEquipment);
router.get("/get-equipment-by-id/:id", controller.getEquipmentById);
router.post("/create-equipment", controller.createNewEquipment);
router.put("/update-equipment/:id", controller.updateEquipment);
module.exports = router;
