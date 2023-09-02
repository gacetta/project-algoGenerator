const express = require("express");

const algoController = require("../controllers/algoController");

const router = express.Router();

// route for adding new algorithm
router.post("/", algoController.createNewAlgo, (req, res) => {
  return res.sendStatus(200);
});

// route for getting all algorithms
router.get("/", algoController.getAlgos, (req, res) => {
  // return res.send(res.locals.algos);
  return res.sendStatus(200);
});

// route for getting a specific algorithm
router.get("/:id", algoController.getAlgo, (req, res) => {
  // return res.send(res.locals.algo);
  return res.sendStatus(200);
});

// route for invoking an algorithm
router.post(
  "/:id/run",
  algoController.getAlgo,
  algoController.runAlgo,
  (req, res) => {
    // return res.json(res.locals.result)
    return res.sendStatus(200);
  }
);

module.exports = router;
