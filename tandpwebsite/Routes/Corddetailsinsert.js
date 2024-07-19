const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cord = require("../Models/Cord");

const CordModel = mongoose.model("Coordinaterdetails", Cord.schema);

router.post("/corddetailsinsert", async (req, res) => {
    const data = req.body; 
     
    if (!data) {
        return res.status(400).send('Data is required'); 
    }

    try {
        const newData = new CordModel(data);
        await newData.save();
        return res.status(200).json({
            message:"data successfully inserted",
            success:true
        }); 
    } catch (err) {
        console.error('Error inserting data:', err.message);
        return res.status(500).json({
            message:err.message || err,
            error:true
        }) 
    }
});

module.exports = router;
