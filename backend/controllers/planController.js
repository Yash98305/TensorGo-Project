const catchAsyncError = require('../middlewares/catchAsyncError.js');
const Plan = require('../models/planModel.js');

exports.createPlanController =catchAsyncError(async (req, res) => {
    const { name, price, description, features,userLimit,apiKey} = req.body;
   
        const newPlan = new Plan({name, price, description, features,userLimit,apiKey});
        await newPlan.save();
        res.status(200).send(
           { success : true,
            message : "Plan Created"}
        );
    
}) 

exports.getPlanController =catchAsyncError( async (req, res) => {
  
        const plans = await Plan.find({});
        res.status(200).send(
            { plans}
         );
   
})

exports.getSinglePlanController =catchAsyncError( async (req, res) => {
    const { id } = req.params;
        const plans = await Plan.findById(id);
        res.status(200).send(
            { plans}
         );
   
})

exports.updatePlanController =catchAsyncError( async (req, res) => {
    const { id } = req.params;
    const { name, price, description, features,userLimit,apiKey } = req.body;
   
        const plan = await Plan.findById(id);
        if (!plan) return res.status(404).send({ msg: 'Plan not found' });
        plan.name = name;
        plan.price = price;
        plan.description = description;
        plan.features = features;
        plan.userLimit = userLimit;
        plan.apiKey = apiKey;
        await plan.save();

        res.status(200).send(
            { success : true,
             message : "Plan Updated"}
         );
    
})

exports.deletePlanController =catchAsyncError( async (req, res) => {
    const { id } = req.params;
  
        await Plan.findByIdAndDelete(id);
        res.status(200).send(
            { success : true,
             message : "Plan Deleted"}
         );
    
})