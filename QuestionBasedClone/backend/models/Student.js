const mongoose = require('mongoose');
const StudentSchema = mongoose.Schema({
    StudentPIN: {
        type: Number,
        required: true,
        unique: true,
    },
    ServerPIN: {
        type: Number,
        required: true,
    },
    UserID: {
        type: Number,
        required: false
    },
    Name: {
        type: String,
        required: true
    },
    Avatar: {
        type: String,
        required: false,
    },
    DateofTest: {
        type: Date,
        required: true,
        default: Date.now,
    },
    QuestionsList:{
        type: Array,
        required: false
    },
    TotalTime: {
        type: String,
        required: false,
        default: '00:00',
    },
    TotalScore: {
        type: String,
        required: false,
        default: '0',
    }
})
Student = mongoose.model('Students', StudentSchema);
module.exports = Student;