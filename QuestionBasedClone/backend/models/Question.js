const mongoose = require('mongoose');
const { type } = require('os');
const QuestionSchema = mongoose.Schema({
    QuestionPIN: {
        type: Number,
        required: true,
        unique: true,
    },
    ServerPIN: {
        type: Number,
        required: true,
    }, 
    QuestionText: {
        type: String,
        required: true,
    },
    CorrectAnswer: {
        type: String
    },
    IncorrectAnswer1: {
        type: String
    },
    IncorrectAnswer2: {
        type: String
    },
    IncorrectAnswer3: {
        type: String
    },
    averageScore: {
        type: Number,
        default: 10
    },
    TimeLimit: {
        type: Number,
        required: false,
        default: 999,
    }
})
const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;