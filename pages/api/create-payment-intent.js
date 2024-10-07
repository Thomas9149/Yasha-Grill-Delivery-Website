const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { amount } = req.body;
            console.log("Server amount: ", amount);

            if (!amount || amount <= 0) {
                return res.status(400).json({
                    message: 'Invalid amount provided'
                });
            }
            // Create a PaymentIntent with the order amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: "gbp",
                automatic_payment_methods: {
                    enabled: true,
                },
            });
            res.status(200).json({
                clientSecret: paymentIntent.client_secret,
            });
        } catch (error) {
            console.error("Error creating PaymentIntent:", error);
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
