
const mongoose=require('mongoose');

const {Schema} =mongoose
const Companyschema=Schema({
    CompanyName:{
        type:String,
        required:'true'

    },
    CTC:{
        type:String,
        required:'true'

    },
    Base:{
        type:String,
        
    },
    Jobrole:{
        type:String,
        required:'true'
    },
    EligibleBranches:{
        type:String,
        required:'true'
    },
    EligibleBatches:{
        type:String,
       
    },
    CGPA:{
        type:String,
       
    },
    PWD:{
         type:String
    },
    ActiveBacklogs:{
        type:String
    },
    PreviousBacklogs:{
        type:String
    },
    NoofIntakes:{
        type:String
    },
    NoofInterviewRounds:{
        type:String
    },
    Discription:{
        type:String
    },
    DriveStartDate:{
        type:String
    },
    DriveEndDate:{
        type:String
    },
    Status:{
        type:String
    }


})
const CompanyModel=mongoose.model('Company',Companyschema)
module.exports=CompanyModel