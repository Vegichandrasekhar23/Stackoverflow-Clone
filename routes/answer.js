var express = require('express');
var router = express.Router();
var { Answers } = require('../Schema')



// Add a Answer
router.post("/:id", async (req, res) => {
  try {
    await Answers
      .create({
        question_id: req.params.question_id,
        answer: req.body.answer,
        user: req.body.user
      })
      .then((doc) => {
        res.status(201).send({
          message: "Answer added successfully",
          data:doc
        });
      })     
  } catch (err) {
    res.send({
      message: "Error while adding question",
    });
  }
});


module.exports = router;
