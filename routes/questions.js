var express = require('express');
var router = express.Router();

const {Questions } = require('../Schema')


// Get all Questions
router.get('/',async(req,res)=>{
  try{
    let questions  = await Questions.find({});
    console.log(questions)
    res.status(201).send({
      message:"All Questions Fetched Successfully",
      data:questions
    })
  }
  catch(err){
    res.send("Internal Server Error")
  }
})


// Add a question
router.post("/:id", async (req, res) => {
  try {
    await Questions
      .create({
        title_id: req.params.title_id,
        body: req.body.body,
        tags:req.body.tags,
        user: req.body.user
      })
      .then((doc) => {
        res.status(201).send({
          message: "Question added successfully",
          data:doc
        });
      })     
  } catch (err) {
    res.send({
      message: "Error while adding question",
    });
  }
});


//Get Question by id
router.get('/:id', async(req, res) => { 
  try{
    let questions  = await Questions.findById(req.params.id);
      res.status(201).send({
      message:"Question Fetched Successfully",
      data:questions
    })    
  }
  catch(err){
    res.send({
      message:"Internal server Error"
    })
  }
});


module.exports = router;
