const mongoose = require('mongoose');
const mongouri = 'mongodb+srv://thumatipavanchowdary:pavan12345@cluster0.1djzuh4.mongodb.net/Tandp';
const connectToMongodb=async()=>{
    try{
        await mongoose.connect(mongouri);
        console.log("Connected To Mongodb");
    }
    catch(err)
    {
        console.log(err)
    }

}
module.exports=connectToMongodb;