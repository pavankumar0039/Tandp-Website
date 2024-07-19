const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cord = require("../Models/Cord");

const CordModel = mongoose.model("Coordinaterdetails", Cord.schema);
try {
    router.post("/checklogincord", async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        var verified = await CordModel.findOne({ email })
        let temp = 0
        if (verified.email === email & verified.password === password) {
            temp = 1;
        }
        if (temp === 1) {
            return res.status(200).json({
                message: "successfull logged in",
                success: true
            })
        }
        else
        {
            return res.status(400).json({
                message: "enter valid credentials",
                success: false
            })

        }

    })
}
catch (err) {
    return res.status(500).json({
        message:err.message || err,
        error:true
    })
}
module.exports = router