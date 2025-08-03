const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    username:{type: String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    searchHistory: [
    {
      name: String,
      lat: Number,
      lng: Number
    }
  ]
});

module.exports=mongoose.model('User',UserSchema);