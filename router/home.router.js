require("dotenv").config();
const express = require("express");
const router = express.Router();
const port = process.env.PORT || 4400;
router.get("/", (req, res) => {
  res.send(`<h1 style="
      position: relative;
      top: 50%;
      left: 50%;
      width: 200px;
      height: 200px;
      font-size: 1rem;
      color: #FFF;
      background-color: #00AF66;
      border-radius: 50%;
      display: flex;
      flex-direction:column;
      justify-content: center;
      align-items: center;
      border: 2px dashed;
      transform: translate(-50%, -50%);
  "><p style="margin:0px;padding:0px;">Equipment SPEC system</p><p style="margin:0px;padding:0px;">Online port(${port})</p></h1>`);
});
module.exports = router;
