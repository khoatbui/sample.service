const Spec = require("../model/spec.model");

module.exports.getAllSpec = function(req, res) {
  Spec.find().exec(function(err, payload) {
    if (err) return handleError(err);
    res.send(payload);
  });
};
module.exports.getSpecById = function(req, res) {
  console.log(req.params);
  Spec.findOne({ _id: req.params.id }, function(err, payload) {
    if (err) return handleError(err);
    console.log(payload);
    res.send(payload);
  });
};
module.exports.createNewSpec = function(req, res) {
  Spec.create(req.body, function(err, payload) {
    if (err) return handleError(err);
    // saved!
    else res.send(payload);
  });
};
module.exports.updateSpec = function(req, res) {
  Spec.updateOne(
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
