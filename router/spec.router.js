const express = require("express");
const controller = require("../controller/spec.controller");

const router = express.Router();

router.get("/", controller.getAllSpec);
router.get("/get-spec-by-id/:id", controller.getSpecById);
router.post("/create-spec", controller.createNewSpec);
router.put("/update-spec/:id", controller.updateSpec);
module.exports = router;
