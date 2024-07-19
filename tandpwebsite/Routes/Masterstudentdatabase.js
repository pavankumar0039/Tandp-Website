const express=require('express');
const MasterstudentModel = require('../Models/Masterstudent');
const router=express.Router();


router.post('/insertingmasterstudentdetails',async (req,res)=>{
    const data=req.body;
   
    try {
        await MasterstudentModel.insertMany(data);

        res.status(200).json({
            message:"sucessfully inserted masterstudents",
            success:true
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message || error,
            error:true

        })
        
    }
})
router.get('/gettingmasterstudentdetails',async (req,res)=>{
  
   
    try {
      const masterstudentdetails=await MasterstudentModel.find({})

        res.status(200).json({
            message:"sucessfully inserted masterstudents",
            success:true,
            data:masterstudentdetails
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message || error,
            error:true

        })
        
    }
})
router.post('/updatingmasterstudentdetails', async (req, res) => {
    const data = req.body;
    try {
        const updatePromises = data.map(item => {
            return MasterstudentModel.updateOne(
                { Scholarid: item.Scholarid }, 
                {
                    $set: {
                        FTE: item.FTE,
                        FTESalary: item.FTESalary
                    }
                }
            );
        });

        const masterstudentdetails = await Promise.all(updatePromises);

        res.status(200).json({
            message: "Successfully updated master students",
            success: true,
            data: masterstudentdetails
        });

    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
});

module.exports=router