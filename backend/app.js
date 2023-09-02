const express = require("express");
const path = require("path");
// const { algoController } = require("./controllers/algoController");
const algoRouter = require("./routers/algoRouter");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle requests for static files
const publicDir = path.resolve(__dirname, "../frontend/public");
app.use(express.static(publicDir));

// router for algos
app.use("/algos", algoRouter);

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
