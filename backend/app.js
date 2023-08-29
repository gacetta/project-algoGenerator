const express = require("express");
const path = require("path");
const { algoController } = require("./controllers/algoController");

const app = express();
app.use(express.json());

// Handle requests for static files
const publicDir = path.resolve(__dirname, "../frontend/public");
app.use(express.static(publicDir));

// route for getting all algorithms
app.get("/algos", algoController.getAlgos, (req, res) => {
  return res.send(res.locals.algos);
});

// route for getting a specific algorithm
app.get("/algos/:id", algoController.getAlgo, (req, res) => {
  return res.send(res.locals.algo);
});

app.post(
  "/algos/:id/run",
  algoController.getAlgo,
  algoController.runAlgo,
  (req, res) => res.json(res.locals.result)
);

// catch all route for requests to unknown route
app.use((req, res) =>
  res.status(404).send("No page, no algorithm, no problem")
);

// express error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;
