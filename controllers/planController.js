const catchAsyncError = require('../middlewares/catchAsyncError.js');
const Plan = require('../models/planModel.js');

exports.createPlan =catchAsyncError(async (req, res) => {
    const { name, price, description, features } = req.body;
   
        const newPlan = new Plan({ name, price, description, features });
        const plan = await newPlan.save();
        res.json(plan);
    
}) 

exports.getPlans =catchAsyncError( async (req, res) => {
  
        const plans = await Plan.find();
        res.json(plans);
   
})

exports.updatePlan =catchAsyncError( async (req, res) => {
    const { id } = req.params;
    const { name, price, description, features } = req.body;
   
        const plan = await Plan.findById(id);
        if (!plan) return res.status(404).json({ msg: 'Plan not found' });

        plan.name = name;
        plan.price = price;
        plan.description = description;
        plan.features = features;
        await plan.save();

        res.json(plan);
    
})

exports.deletePlan =catchAsyncError( async (req, res) => {
    const { id } = req.params;
  
        await Plan.findByIdAndDelete(id);
        res.json({ msg: 'Plan removed' });
    
})