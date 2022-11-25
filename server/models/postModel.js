const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    likes:{
        type:[{type:mongoose.Types.ObjectId,ref:"person"}],
    },
    likesCount:{
        type:Number,
        default:0
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"person"
    }
})
module.exports = mongoose.model("post",postSchema)