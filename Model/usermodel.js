const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String }, //for now not mandatory
    lastname: { type: String }, //for now not mandatory
    email: { type: String, required: true, unique: true }, // Email Address
    age: { type: Number }, // For Phone Number (not unique for now)
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserSchema", UserSchema);
