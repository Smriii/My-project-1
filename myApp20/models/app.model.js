const mongoose = require('mongoose');

const AppSchema=mongoose.Schema({
    name: {
        type:String,
        required:[true, "A tour must have a name"],
        unique:[true, "name already exists"],
    },
    price:{
        type: Number,
        required:[true, "A tour must have a price"],
    },
    rating:{
        type: Number,
        default:4.5,
    },
    difficulty:{
        type:String,
        required:[true, "A tour must have a difficulty"]
    }
});


module.exports = mongoose.model("tours", AppSchema);