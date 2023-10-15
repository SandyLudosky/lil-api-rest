const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const genAPIKey = () => {
  //create a base-36 string that contains 30 chars in a-z,0-9
  return [...Array(30)]
    .map((e) => ((Math.random() * 36) | 0).toString(36))
    .join("");
};

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
    match: [/\S+@\S+\.\S+/, "is invalid"], // Simple email validation
  },
  hashedPassword: {
    type: String,
  },
  apiKey: {
    type: String,
    unique: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
}); // Create a virtual attribute `fullName` that's computed from `firstName` and `lastName`.s

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hashedPassword);
}; // Create an instance method `comparePassword` that compares a password to a hashed password.

UserSchema.methods.setAPIKey = function () {
  this.apiKey = bcrypt.hashSync(this.email, 10); // You might want to adjust the salt rounds (10 in this case) to suit your security needs
}; // Create an instance method `setAPIKey` that sets the `apiKey` attribute of the user to a hashed version of the user's email address.

UserSchema.methods.toLocalString = function () {
  return this.created_at.toLocalString();
}; // Create an instance method `toLocalString` that returns a localized date string.

module.exports = mongoose.model("User", UserSchema);
