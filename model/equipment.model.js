var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var EquipmentSchema = new Schema({
  equipmentCode: String,
  equipmentName: String,
  createBy: String,
  createDate: Date,
  modifyBy: String,
  modifyDate: Date,
  isUsed: Boolean,
  isDelete: Boolean
});
module.exports = mongoose.model("Equipment", EquipmentSchema, "equipment");
