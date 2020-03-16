const express = require("express");
const controller = require("../controller/upload.controller");

const router = express.Router();


// PUBLIC API
router.post(
    "/public/upload-listing-document",
    controller.uploadListingDocumentPublic
  );


module.exports = router;