const stripe = require("stripe")(
process.env.STRIPE_SECRET_KEY);
const catchAsyncError = require("../middlewares/catchAsyncError");
const Plan = require("../models/planModel");
const Subscription = require("../models/subscriptionModel");
const User = require("../models/uerModel");
const basic = "price_1PTe6P073WyBtOVsPjczPnIh";
const standard = "price_1PTlh6073WyBtOVsHRNN2SxT";
const plus = "price_1PTliT073WyBtOVsmgCCe7Jj";
const moment = require("moment");

exports.getSubscriptionController = catchAsyncError(async (req, res) => {
  const subscriptions = await Subscription.find({ userId: req.user._id })
    .populate("serviceId")
    .populate("planId")
    .populate("userId");
  const activeSubscriptions = subscriptions.filter((subscription) => {
    const currentDate = moment().format("YYYY-MM-DD");
    return moment(currentDate).isBetween(
      subscription.planStartDate,
      subscription.planEndDate,
      null,
      "[]"
    );
  });

  res.status(200).send({ success: true, subscriptions: activeSubscriptions });
});
exports.getAllSubscriptionController = catchAsyncError(async (req, res) => {
  const subscriptions2 = await Subscription.find({})
    .populate("serviceId")
    .populate("planId")
    .populate("userId");
  const activeSubscriptions2 = subscriptions2.filter((subscription) => {
    const currentDate = moment().format("YYYY-MM-DD");
    return moment(currentDate).isBetween(
      subscription.planStartDate,
      subscription.planEndDate,
      null,
      "[]"
    );
  });
  res.status(200).send({ success: true, active: activeSubscriptions2 });
});
exports.getAllExpireSubscriptionController = catchAsyncError(
  async (req, res) => {
    const subscriptions2 = await Subscription.find({})
      .populate("serviceId")
      .populate("planId")
      .populate("userId");

    const expiredSubscriptions2 = subscriptions2.filter((subscription) => {
      const currentDate = moment().format("YYYY-MM-DD");
      return moment(currentDate).isAfter(subscription.planEndDate);
    });

    res.status(200).send({ success: true, expired: expiredSubscriptions2 });
  }
);

exports.createSubscriptionCheckoutController = catchAsyncError(
  async (req, res) => {
    const { apiKey, userId, service, plan } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      metadata: {},
      line_items: [
        {
          price: apiKey,
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
    });

    let user = await User.findById(userId);

    if (user) {
      user.subscription.serviceId = service;
      user.subscription.planId = plan;
      user.subscription.sessionId = session.id;
      user.subscription.userId = userId;
      await user.save();
    } else {
      await User.create({
        userId: userId,
        subscription: {
          sessionId: session.id,
        },
      });
    }
    return res.json({ session });
  }
);

exports.paymentSuccessController = catchAsyncError(async (req, res) => {
  const { sessionId, userId } = req.body;

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (!session) {
    return;
  }
  if (session.payment_status === "paid") {
    const subscriptionId = session.subscription;
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const user = await User.findById(userId);
      if (user) {
        const planId = user.subscription.planId;
        const userId = user.subscription.userId;
        const serviceId = user.subscription.serviceId;
        const startDate = moment
          .unix(subscription.current_period_start)
          .format("YYYY-MM-DD");
        const endDate = moment
          .unix(subscription.current_period_end)
          .format("YYYY-MM-DD");
        const durationInSeconds =
          subscription.current_period_end - subscription.current_period_start;
        const durationInDays = moment
          .duration(durationInSeconds, "seconds")
          .asDays();

        user.subscription = {
          sessionId: null,
          userId: userId,
          serviceId: serviceId,
          planId: planId,
          planStartDate: startDate,
          planEndDate: endDate,
          planDuration: durationInDays,
        };
        await user.save();
        const sub = new Subscription({
          userId: userId,
          serviceId: serviceId,
          planId: planId,
          planStartDate: startDate,
          planEndDate: endDate,
          planDuration: durationInDays,
        });
        await sub.save();
      }
    } catch (error) {
      console.error("Error retrieving subscription:", error);
    }
    return res.json({ message: "Payment successful" });
  } else {
    return res.json({ message: "Payment failed" });
  }
});

exports.checkSubscriptionStatus = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const subscriptions = await stripe.subscriptions.list({
    customer: id,
    status: "all",
    expand: ["data.default_payment_method"],
  });

  const activeSubscriptions = subscriptions.data.filter(
    (subscription) => subscription.status === "active"
  );

  if (activeSubscriptions.length > 0) {
    console.log("The customer has an active subscription.");
    return true;
  } else {
    console.log("The customer does not have an active subscription.");
    return false;
  }
});
exports.createBasicController = catchAsyncError(async (req, res) => {
  const { userId, serviceId, planId } = req.body;
  const startDate = moment().format("YYYY-MM-DD");
  const endDate = moment().add(14, 'days').format("YYYY-MM-DD");
  const durationInDays = 14;
await User.findByIdAndUpdate(userId,{basicPlanEndDate:endDate})
  const sub = new Subscription({
    userId: userId,
    serviceId: serviceId,
    planId: planId,
    planStartDate: startDate,
    planEndDate: endDate,
    planDuration: durationInDays,
  });
  
  await sub.save();
  
  res.status(201).json({
    message: 'success'
  });
});