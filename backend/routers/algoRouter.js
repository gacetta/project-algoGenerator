const express = require("express");

const algoController = require("../controllers/algoController");

const router = express.Router();

// route for adding new algorithm
router.post("/", algoController.createNewAlgo, (req, res) => {
  return res.send(res.locals.newAlgo);
});

// route for getting all algorithms
router.get("/", algoController.getAlgos, (req, res) => {
  return res.send(res.locals.allAlgos);
});

// route for getting a specific algorithm
router.get("/:_id", algoController.getAlgoById, (req, res) => {
  return res.send(res.locals.requestedAlgo);
});

// route for invoking an algorithm
router.post(
  "/:_id/run",
  algoController.getAlgoById,
  algoController.runAlgo,
  (req, res) => {
    return res.send({ result: res.locals.result });
  }
);

module.exports = router;
