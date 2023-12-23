import stripe from "stripe";
const stripeInstance = new stripe(process.env.STRIPE_API_SECRET_KEY, {
  apiVersion: '2023-08-16',
});

exports.StripePrice = stripe.Price; 
exports.  StripeProduct = stripe.Product; 
exports. StripePaymentIntent= stripe.PaymentIntent;
exports. StripeCheckoutSession = stripe.Checkout.Session ;


export default stripeInstance;