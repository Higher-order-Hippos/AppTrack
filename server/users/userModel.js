var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
// this file describes the userSchema for how mongoose writes to the database
// this is only used in the sign up endpoint

var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});

var User = mongoose.model('User', UserSchema);

User.comparePassword = function(candidatePassword, savedPassword, cb) {
  bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
};

UserSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

module.exports = User;
