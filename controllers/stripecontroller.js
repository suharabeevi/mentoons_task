import stripe from "stripe";
import { HttpStatus } from "../config/httpStatus.js";
const YOUR_DOMAIN = 'http://localhost:8080';

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
export const stripecontroller = () => {
 const CraeteNewcustomer = async(req,res,next)=>{
    try{
        console.log(req.body)
 const customer =await stripeInstance.customers.create({
    name:req.body.name,
    email:req.body.email
 })
 res
 .status(HttpStatus.CREATED)
 .json({ message: "create customer", customer });
    }catch(error){
        console.error(error);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal server Error" });
    }
}
const addNewCard = async (req,res,next)=>{
    console.log(req.body);
    const { customer_Id,card_Number,card_ExpMonth,card_ExpYear,card_CVC,card_Name} =req.body
try{
 const card_Token = await stripeInstance.tokens.create({
    card:{
   name:card_Name,
   number:card_Number,
   exp_month:card_ExpMonth,
   exp_year:card_ExpYear,
   cvc:card_CVC
    },
 })
const card = await stripeInstance.customers.createSource(customer_Id,{
    source:`${card_Token.id}`,
});
res
 .status(HttpStatus.CREATED)
 .json({ message: "Added new Card", card:card.id });
}catch(error){
    console.error(error);
    res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: "Internal server Error" + error });
}
}
const Createcharges = async(req,res,next)=>{
    try{
        const createcharge = await stripeInstance.charges.create({
            receipt_email: 'sairasuhara12345@gmail.com',
            amount:50*100,
            currency:"inr",
            card:req.body.card_ID,
            customer:req.body.customer_Id
        })
        res
 .status(HttpStatus.CREATED)
 .json({ message: "Create charges", createcharge });

    }catch(error){
        console.error(error);
    res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: "Internal server Error" + error });
    }
}
const checkout = async(req,res,next)=>{
    try{

        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
              {
                price_data: {
                  currency: "inr",
                  product_data: {
                    name: 'shirt',
                  },
                  unit_amount: 656666,
                },
                quantity: 1,
              },
            ],
            success_url: `${YOUR_DOMAIN}/success`,
            cancel_url: `${YOUR_DOMAIN}/cancel`,
          });

          const {url} = session
          console.log(url);

          res.redirect(url)

    }catch(error){
        console.error(error);
        res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server Error" + error });
    }
}
return{
CraeteNewcustomer,
addNewCard,
Createcharges,
checkout
}
}