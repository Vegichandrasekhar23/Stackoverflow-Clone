var express = require('express');
var router = express.Router();
const { Comments } = require('../Schema')


// Add Comment
router.post("/:id", async (req, res) => {
  try {
    await Comments
      .create({
        question_id: req.params.id,
        comment: req.body.comment,
        user: req.body.user,
      })
      .then((doc) => {
        res.status(201).send({
          message: "Comment added successfully",
          data:doc
        });
      })     
  } catch (err) {
    res.send({
      message: "Error while adding comments",
    });
  }
});


module.exports = router;
