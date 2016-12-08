const router = require('express').Router();
const Position = require('./positions/positionModel.js');
const User = require('./users/userModel.js');

//post request endpoint that is initialized in our $http post request in our Angular formController.
// This saves all form inputs to our database which can be viewed via https://mlab.com/
router.post('/form', function(req, res) {
  new Position({
    startDate: req.body.data.startDate,
    companyName: req.body.data.companyName,
    role: req.body.data.role,
    jobDescription: req.body.data.jobDescription,
    appliedThrough: req.body.data.appliedThrough,
    contactName: req.body.data.contactName,
    contactPhone: req.body.data.contactPhone,
    contactEmail: req.body.data.contactEmail,
    contactType: req.body.data.contactType,
    dateApplied: req.body.data.dateApplied,
    dateOfLastContact: req.body.data.dateOfLastContact,
    replyReceived: req.body.data.replyReceived,
    stages: req.body.data.stages,
    contractTime: req.body.data.contractTime,
    initialComp: req.body.data.initialComp,
    negotiated: req.body.data.negotiated,
    finalComp: req.body.data.finalComp,
    acceptReject: req.body.data.acceptReject
  })
  .save(); //mongoose function that saves inputs into the database.
});

// get request endpoint for $http get request made in the getData factory function.
router.get('/form', function(req, res) {
  //.find is a MongoDb method that will retrieve all data corresponding data that matches given conditions. Here there are no conditions set, so all postitions in the db will be sent back.
  Position.find(function(err, positions) {
    res.send(positions);
  });
});

router.put('/form/:id', function(req, res) {
  Position.findByIdAndUpdate(req.params.id, {
    $push: {
      "stages": req.body
    }
  },
  function(err, stage) {
    res.send(stage)
  });
});

router.put('/edit/:id', function(req, res) {
  console.log('THIS IS REQ.BODY EDIT INFO: ', req.body)
  Position.findByIdAndUpdate(req.params.id, req.body, function(err, stage) {
    res.send(stage)
  });
});

module.exports = router;