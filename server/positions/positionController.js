const Q = require('q');
const Position = require('./positionModel.js');
// this file is not used -- im not sure what that means??

const findPosition = Q.nbind(Position.findOne, Position);
const createPosition = Q.nbind(Position.create, Position);
const findAllPositions = Q.nbind(Position.find, Position);

module.exports = {
	allPositions: (req, res) => {
		findAllPositions({})
			.then((positions) => {
				res.json(positions);
			})
			.fail((err) => {
				console.log("ERROR in retreiving all positions, server/positions/positionController : ", err);
			});
	},

	newPosition: (req, res) => {
		createPosition(req.body.data)
		  .then((createdPosition) => {
		  	if (createdPosition) {
		  		console.log("CREATE position request: ", req.body.data);
		  		res.json(createdPosition);
		  	}
		  })
		  .fail((err) => {
		  	console.log("ERROR in creating position, server/positions/positionController : ", err);
		  });
	}

}
