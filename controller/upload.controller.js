module.exports.uploadListingDocumentPublic = function(req, res) {
    console.log(req.file)
    console.log(req.files)
    res.send({'file':req.files})
}