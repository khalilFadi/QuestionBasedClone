const mongoose = require('mongoose');
AnsweredQuestionSchema = mongoose.Schema({
    AnswerPIN:{
        type: Number, 
        required: true, 
        unique: true
    },
    QuestionPIN: { 
        type: Number,
        require: true
    }, 
    Score: {
        type: String,
        require: true
    },
    timeTaken: {
        type: String,
        require: true
    }
})