const mongoose = require("mongoose");

const book = new mongoose.Schema({
    text : {
        type : String,
        required : true,
        unique : true,
    },
    language : {
        type : String,
        required : true,
    },
    translatedText : {
        type : String,
        required : true,
        
    },
},{timestamps : true});

const Book = mongoose.model('Book',book)
module.exports = Book;