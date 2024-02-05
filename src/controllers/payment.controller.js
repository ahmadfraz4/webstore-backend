require('dotenv').config()
let stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

let paymentProcess = async (req,res) =>{
    try {
        // await stripe.paymentIntents
        const myPayment = await stripe.paymentIntents.create({
            amount : req.body.amount,currency : 'usd', metadata : {company : 'Webstore'}
        })
        res.json({
            success : true,  client_secret : myPayment.client_secret
        })
    } catch (error) {
        console.log(error)
        res.json({success:false, error})
    }
}
let SecretStripe = async (req,res) =>{
    res.json({
        stripeApiKey : process.env.STRIPE_API_KEY
    })
}

module.exports = {paymentProcess,SecretStripe}