var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SpecSchema = new Schema({
  specCode: String,
  specName: String,
  usl:Number,
  lsl:Number,
  ucl:Number,
  lcl:Number,
  createBy: String,
  createDate: Date,
  modifyBy: String,
  modifyDate: Date,
  isUsed: Boolean,
  isDelete: Boolean
});
module.exports = mongoose.model("Spec", SpecSchema, "spec");
