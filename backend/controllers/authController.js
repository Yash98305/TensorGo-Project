const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncError.js");
const User = require("../models/uerModel.js");
const Subscription = require("../models/subscriptionModel.js");
const sendToken = require("../jwtToken/jwtToken.js");
const fs = require("fs");
 

exports.userRegisterController = catchAsyncErrors(async (req, res, next) => { 
    const {name,phone, email, password } = req.body;
    if (!name|| !phone || !email || !password) {
      return next(new ErrorHandler("Please Enter Required Field", 400));
    }
    const user= await User.findOne({ email }).select("+password");
    if (user) {
      return next(new ErrorHandler("User already exists", 401));
    }
      const newUser = new User({
        name,phone, email, password
      });
     await newUser.save();
     
      sendToken(newUser, 201, res);
  });
  

  exports.userCreateController = catchAsyncErrors(async (req, res, next) => {
  const { name, phone, email, password, userRole,activePlanId} = req.body;
  if (!name || !phone || !email || !password) {
    return next(new ErrorHandler("Please Enter Required Field", 400));
  }

  const existingUser = await User.findOne({ email }).select("+password");
  if (existingUser) {
    return next(new ErrorHandler("User already exists", 401));
  }

  const newUser = new User({
    name,
    phone,
    email,
    password,
    userRole,
    activePlanId
  });

  await newUser.save();


  sendToken(newUser, 201, res);
});


exports.userLoginController = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid credentials", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid credentials", 401));
    }
    sendToken(user, 200, res);
  });
  exports.getUserDetailsController = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      user,
    });
  });
  
  
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  
  const { photo } = req.files;
 
  if(photo && photo.size > 1000000){
    return res
      .status(500)
      .send({ error: "photo is Required and should be less then 1mb" });
}

const user = await User.findByIdAndUpdate(
  req.params.id,
  { ...req.fields},
  { new: true,
    runValidators: true,
    useFindAndModify: false, }
);

if (photo) {
  user.photo.data = fs.readFileSync(photo.path);
  user.photo.contentType = photo.type;
}

await user.save();
  res.status(200).json({
    success: true,
    user
  });
});


exports.getAllUsersPhotoController = catchAsyncErrors(async (req, res,next) => {
  const users = await User.findById(req.params.pid).select("photo");

    if (users.photo.data) {
      res.set("Content-type", users.photo.contentType);
      return res.status(200).send(users.photo.data);
    }
  
})
exports.getAllUserController = catchAsyncErrors(async (req, res,next) => {
  const users = await User.find({})
      return res.status(200).send({users: users});
    
  
})
exports.userGetController = catchAsyncErrors(async (req, res,next) => {
  const activePlanId = req.params.id;
  const users = await User.find({activePlanId:activePlanId}).populate('activePlanId')
      const plan = await Subscription.findById(activePlanId).populate('planId')
  return res.status(200).send({users: users,userLimit:plan.planId.userLimit}); 
})

exports.deleteUserController = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(200).send({
    success: true,
    message: "User deleted",
  });
})
  