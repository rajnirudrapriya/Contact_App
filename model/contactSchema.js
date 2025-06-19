const {Schema,model}=require('mongoose');

const contactSchema=new Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    nmbr:{
        type:Number,
        required:true,
        minlength:10
    },
    loc:{
        type:String,
        required:true,
        enum:["mobile","sim","email"]
    }
})

module.exports=model("contact", contactSchema)