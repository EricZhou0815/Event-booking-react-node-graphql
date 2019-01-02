const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    //createdEvents is a collection of event, stored the event id
    //This is the Many side of the One-To-Many relationship
    createdEvents:[
        {
            type:Schema.Types.ObjectId, 
            ref:'Event'
        }
    ]
});

module.exports=mongoose.model('User',userSchema);