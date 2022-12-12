const mongoose = require("mongoose");

const BatchSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    status: { type: String, default: "false" },
    batch: { type: String },
    history: [{ month: { type: Number }, year: { type: Number } }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("BatchSchema", BatchSchema);
