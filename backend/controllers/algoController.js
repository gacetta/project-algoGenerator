// const add5 = require("../fake_backend/add5");
// const isEven = require("../fake_backend/isEven");
// const isPrime = require("../fake_backend/isPrime");
// const square = require("../fake_backend/square");
// const fibonacciNumber = require("../fake_backend/fibonacciNumber");
// const algos = [add5, isEven, isPrime, square, fibonacciNumber];

const Algo = require("../models/Algo");

const algoController = {};

// MIDDLEWARE TO CREATE NEW ALGO
algoController.createNewAlgo = async (req, res, next) => {
  console.log("createNewAlgo");
  try {
    const newAlgo = req.body;
    res.locals.newAlgo = await Algo.create(newAlgo);
    return next();
  } catch (err) {
    return next({
      log: "algoController.createNewAlgo caught error",
      status: 500,
      message: { err: err.message },
    });
  }
};

// MIDDLEWARE TO GET ALL ALGOS
algoController.getAlgos = async (req, res, next) => {
  console.log("getAlgos");
  try {
    const allAlgos = await Algo.find({});
    res.locals.allAlgos = allAlgos;
    return next();
  } catch (err) {
    return next({
      log: "algoController.getAlgos caught error",
      status: 500,
      message: { err: err.message },
    });
  }
};

// MIDDLEWARE TO GET A SPECIFIC ALGO BY NAME
algoController.getAlgoById = async (req, res, next) => {
  console.log("getAlgo");
  try {
    const requestedAlgo = await Algo.findById(req.params._id);
    if (!requestedAlgo) throw new Error("requested algorithm not found");
    res.locals.requestedAlgo = requestedAlgo;
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
  const providedArgs = req.body.args;
  const { funcParams, funcBody } = res.locals.requestedAlgo;
  try {
    const functionToInvoke = new Function(...funcParams, funcBody);
    res.locals.result = functionToInvoke(...providedArgs);
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
