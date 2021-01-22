const Complaint = require('../models/complaint')
const {errorHandler} = require("../helpers/dbErrorHandler");

exports.create =  (req,res) => {
    //console.log(req.body)
    const complaint = new Complaint(req.body)
    complaint.save((err, data) => {
        if(err) {
            console.log(err)
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    }
    )
}