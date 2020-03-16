const Equipment = require("../model/equipment.model");

module.exports.getAllEquipment = function(req, res) {
  Equipment.find().exec(function(err, equipmentPost) {
    if (err) return handleError(err);
    res.send(equipmentPost);
  });
};
module.exports.getEquipmentById = function(req, res) {
  console.log(req.params);
  Equipment.findOne({ _id: req.params.id }, function(err, equipmentPost) {
    if (err) return handleError(err);
    console.log(equipmentPost);
    res.send(equipmentPost);
  });
};
module.exports.createNewEquipment = function(req, res) {
  Equipment.create(req.body, function(err, equipmentPost) {
    if (err) return handleError(err);
    // saved!
    else res.send(equipmentPost);
  });
};
module.exports.updateEquipment = function(req, res) {
  Equipment.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    { upsert: true },
    function(err, profile) {
      if (err) return handleError(err);
      else res.send(profile);
    }
  );
};
function handleError(err) {
  console.log(err);
}
