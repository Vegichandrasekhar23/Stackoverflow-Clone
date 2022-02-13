var mongoose = require('mongoose');
var validator = require('validator');


const answerSchema = new mongoose.Schema({
    question_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Questions"
    },
    answer:{
        type:String
    },
    created_at:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:Object
    },
    comment_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comments"
    }
},
{collection:'answers'})

const commentSchema = new mongoose.Schema({
    question_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Questions"
    },
    comment:{
        type:String
    },
    created_at:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:Object
    }
},{
collection:'comments'
})

const questionSchema  = new mongoose.Schema({
    title:{
        type:String
    },
    body:{
        type:String
    },
    tags:[],
    created_at:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:Object
    },
    comment_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comments"
    }
},{
    collection:'questions'
})


var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true, 
        required:true,
        validate: [{ validator: value => validator.isEmail(value), msg: 'Invalid email.' }]        
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number
    },
    bio:{
        type:String
    },
    age:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now
    },
    verify_value:{
        type:String
    }
})

const User  = mongoose.model('Student',userSchema);
const Answers = mongoose.model('Answers',answerSchema);
const Comments = mongoose.model('Comments',commentSchema);
const Questions = mongoose.model('Questions',questionSchema);

module.exports = {User,Answers,Comments,Questions};
