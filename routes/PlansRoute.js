const express = require('express');
const router = express.Router();
const AttendancePlan = require('../models/AttendancePlan'); // Adjust the path


router.get('api/get-plans',async (req,res) => {
try{
const attendancePlans = await AttendancePlan.findAll();

res.send({success:true, message:'SuccessFully Fetch Plans', data:attendancePlans});
}
catch(e){
res.status(500).json({success:true, message: e.message || 'Internal Server Error', data:[]});

}
})
module.exports = router;
