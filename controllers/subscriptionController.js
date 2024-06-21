const stripe = require('stripe')("sk_test_51PTcRn073WyBtOVsMDA5jQ6gdu4hZmmeLjUPLy1WTcYlscJS3hqtVCZRUt3yz0uOY9XDZ3203L7OWa4Cs2ssJOH300HrCNogwI");
const catchAsyncError = require('../middlewares/catchAsyncError');
const Plan = require('../models/planModel');
const User = require('../models/uerModel');
const basic = "price_1PTe6P073WyBtOVsPjczPnIh"
const standard = "price_1PTlh6073WyBtOVsHRNN2SxT"
const plus = "price_1PTliT073WyBtOVsmgCCe7Jj"


exports.createSubscriptionCheckoutController = catchAsyncError(async (req, res) => {
    const { planId, userId } = req.body;
    console.log(planId, userId);
    let plan ;
    if(planId === 0){
        plan = basic
    }else if(planId === 4999){
        plan = standard
    }else if(planId === 3999){
        plan = plus
    }
    const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
            {
                price: plan,
                quantity: 1
            },
        ],
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/cancel`
    });
   
    console.log(session);
   
    let user = await User.findById(userId);

    if (user) {
        user.subscription.sessionId = session.id;
        await user.save();
    } else {
        await User.create({
            userId: userId,
            subscription: {
                sessionId: session.id
            }
        });
    }
    console.log(session);
    return res.json({ session });
})

exports.paymentSuccessController = catchAsyncError(async (req, res) => {
    const { sessionId, userId } = req.body;

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            const subscriptionId = session.subscription;
            try {
                const subscription = await stripe.subscriptions.retrieve(subscriptionId);
                const user = await User.findOne({ userId: userId });

                if (user) {
                    const planId = subscription.plan.id;
                    const planType = subscription.plan.amount === 50000 ? "basic" : (subscription.plan.amount === 49900 ? "pro" : "business");
                    const startDate = moment.unix(subscription.current_period_start).format('YYYY-MM-DD');
                    const endDate = moment.unix(subscription.current_period_end).format('YYYY-MM-DD');
                    const durationInSeconds = subscription.current_period_end - subscription.current_period_start;
                    const durationInDays = moment.duration(durationInSeconds, 'seconds').asDays();

                    user.subscription = {
                        sessionId: null,
                        planId: planId,
                        planType: planType,
                        planStartDate: startDate,
                        planEndDate: endDate,
                        planDuration: durationInDays
                    };
                    await user.save();
                }
            } catch (error) {
                console.error('Error retrieving subscription:', error);
            }
            return res.json({ message: "Payment successful" });
        } else {
            return res.json({ message: "Payment failed" });
        }
    
})
