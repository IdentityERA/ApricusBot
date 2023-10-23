const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const paymentMethod = async(req, res) => {
    try {
        const { amount, currency } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency,
        });
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating Payment Intent' });
      }
}

exports.paymentMethod = paymentMethod;