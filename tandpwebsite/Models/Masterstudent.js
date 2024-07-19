const mongoose = require('mongoose');
const { Schema } = mongoose;

const Masterstudentschema = new Schema ({
    Name:{
        type:String,
        required:'true'
    },
    Scholarid:{
        type:String,
        required:'true'
    },
    Gender:{
        type:String
        
    },
    PWD:{
        type:String,
        
    },
    Caste:{
        type:String,
        
    },
    Nationality:{
        type:String,
       
    },
    
    Class10percentage:{
        type:String
       
    },
    Class12percentage:{
        type:String
        
    },
    CGPA:{
        type:String
    },
    Activebacklogs:{
        type:String
    },
    Backloghistory:{
        type:String
    },
    Phonenumber:{
        type:String
    },
    Personalemailid:{
        type:String
    },
    Collegeemailid:{
        type:String
    },
    FTE:{
        type:String
    },
    FTESalary:{
        type:String
    },
    Branch:{
        type:String,
        required:true
    }



})

const MasterstudentModel=mongoose.model("Masterstudent",Masterstudentschema)

module.exports=MasterstudentModel