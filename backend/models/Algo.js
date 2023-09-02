const mongoose = require("mongoose");
require("dotenv").config();

// connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
// console.log("uri:", MONGO_URI);

mongoose
  .connect(MONGO_URI, {
    // options for connect method to parse URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbname: "algoGenerator",
  })
  .then(() => console.log("Connected to Mongo DB"))
  .catch((err) => console.log(err));

// create a schema for each algo
// should contain:
// _id (an automatically generated mongoDB ObjectID)
// name: String
// description: String
// args: an array of String
// funcBody: a function
const Schema = mongoose.Schema;

const algoSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  args: [{ type: String }],
});

const Algo = mongoose.model("algo", algoSchema);

module.exports = Algo;
