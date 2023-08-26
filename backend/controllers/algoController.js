const add5 = require("../fake_backend/add5");
const isEven = require("../fake_backend/isEven");
const isPrime = require("../fake_backend/isPrime");
const square = require("../fake_backend/square");
// const sumAll = require("../fake_backend/sumAll");

const algoController = {};

const algos = [add5, isEven, isPrime, square];

// MIDDLEWARE TO GET A SPECIFIC ALGO BY NAME
algoController.getAlgo = (req, res, next) => {
  try {
    // Find Algorithm by id
    const requestedAlgo = algos.find((algo) => {
      return algo.id === req.params.id;
    });
    if (!requestedAlgo) throw new Error("requested algorithm does not exist");
    res.locals.algo = requestedAlgo;
    return next();
  } catch (err) {
    return next({
      log: "algoController.getAlgos caught error",
      status: 500,
      message: { err: err.message },
    });
  }
};

// MIDDLEWARE TO GET ALL ALGOS
algoController.getAlgos = (req, res, next) => {
  try {
    if (algos.length < 1) throw new Error("no algorithms available");
    res.locals.algos = algos;
    return next();
  } catch (err) {
    return next({
      log: "algoController.getAlgos caught error",
      status: 500,
      message: { err: err.message },
    });
  }
};

// MIDDLEWARE TO RUN ALGO WITH ARGS
algoController.runAlgo = (req, res, next) => {
  try {
    const args = req.body.args;
    res.locals.result = res.locals.algo.funcBody(...args);
    return next();
  } catch (err) {
    return next({
      log: "algoController.getAlgos caught error",
      status: 500,
      message: { err: err.message },
    });
  }
};

module.exports = algoController;
