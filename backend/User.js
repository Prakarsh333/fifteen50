const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, 
    problemsolved: { type: Number}, 
    solvedEasy: { type: Number}, 
    solvedMedium: { type: Number}, 
    solvedHard: { type: Number},
    problemsolved_latest: { type: Number}, 
    solvedEasy_latest: { type: Number}, 
    solvedMedium_latest: { type: Number}, 
    solvedHard_latest: { type: Number}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;