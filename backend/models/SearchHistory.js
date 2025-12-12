const mongoose = require("mongoose");

const SearchHistorySchema = new mongoose.Schema({
  location: { type: String, required: true },
  searchedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SearchHistory", SearchHistorySchema);
