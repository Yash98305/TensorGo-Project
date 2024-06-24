const catchAsyncError = require("../middlewares/catchAsyncError");
const Service = require("../models/serviceModel");
const Plan = require("../models/planModel");

exports.createServiceController = catchAsyncError(async (req, res) => {
  const { name, plans } = req.body;
  const newService = new Service({ name, plans});
  await newService.save();

  res.status(200).send({
    success: true,
    message: 'Service created',
    service: newService,
  });
});

exports.deleteServiceController = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  await Service.findByIdAndDelete(id);
  res.status(200).send({
    success: true,
    message: "Service deleted",
  });
});

exports.getSingleServiceController = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const service = await Service.findById(id).populate('plans', 'name');
  if (!service) return res.status(404).send({ msg: 'Service not found' });
  res.status(200).send({
    success: true,
    service,
  });
});

exports.getServiceController = catchAsyncError(async (req, res) => {
  const services = await Service.find({}).populate('plans', 'name');
  if (!services) return res.status(404).send({ msg: 'No services found' });
  res.status(200).send({
    success: true,
    services,
  });
});

exports.updateServiceController = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const { name, plans } = req.body;

  const uniquePlans = [...new Map(plans.map(plan => [plan._id.toString(), plan])).values()];

  const updatedService = await Service.findByIdAndUpdate(
    id,
    { name, plans: uniquePlans },
    { new: true }
  );


  if (!updatedService) {
    return res.status(404).send({
      success: false,
      message: 'Service not found',
    });
  }

  res.status(200).send({
    success: true,
    message: 'Service updated',
    service: updatedService,
  });
});
