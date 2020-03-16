require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
// ↧↧↧↧↧↧↧ ****************CONFIG****************
const jsonParser = bodyParser.json({ limit: "50mb", extended: true });
const urlencodedParser = bodyParser.urlencoded({
  limit: "50mb",
  extended: true
});
const port = process.env.PORT || 4400;
const MAX_SIZE =process.env.MAX_SIZE || 200000

// ↥↥↥↥↥↥↥ ****************CONFIG****************


// ↧↧↧↧↧↧↧ ****************MONGODB****************
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// ↥↥↥↥↥↥↥ ****************MONGODB****************

// ↧↧↧↧↧↧↧ ****************UPLOAD****************
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + "_"+ file.originalname)
  }
})
const fileFilter=function(req,file,cb){
  const allowedTypes=["application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","text/csv","image/*","application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation","application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('Wrong file type');
    error.code="LIMIT_FILE_TYPES"
    return cb(error,false)
  }
  cb(null,true)
}
const upload = multer({ storage: storage,fileFilter,limits:{fileSize:MAX_SIZE} });
// ↥↥↥↥↥↥↥ ****************UPLOAD****************

const app = express();
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(cors());
app.use(morgan("dev"));
app.use(jsonParser);
app.use(urlencodedParser);


// ↧↧↧↧↧↧↧ ****************ROUTER****************
const equipmentRouter = require("./router/equipment.router");
const specRouter = require("./router/spec.router");
const uploadRouter=require("./router/upload.router");
const homeRouter = require("./router/home.router");


app.use("/equipment", equipmentRouter);
app.use("/spec", specRouter);
app.use("/", homeRouter);

// UPLOAD
app.use("/upload",upload.any(), uploadRouter);
// ↥↥↥↥↥↥↥ ****************ROUTER****************

// ↧↧↧↧↧↧↧ ****************CORS****************
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// ↥↥↥↥↥↥↥ ****************CORS****************

app.use(function(err,req,res,next){
  if (err.code="LIMIT_FILE_TYPES") {
    res.status(422).json({error:"Only images or document are allow"})
    return
  }
  if (err.code="LIMIT)FILE_SIZE") {
    res.status(422).json({error:`Too large, Maxsize is ${MAX_SIZE}kb`})
    return
  }
})


// ↧↧↧↧↧↧↧ ****************RUN****************
app.set("view engine", "pug");
app.set("views", "./views");
app.listen(port, () => console.log(`Server run ${port}`));
// ↥↥↥↥↥↥↥ ****************RUN****************