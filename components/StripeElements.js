"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export function StripeElements({ clientSecret, adjustedTotal, order }) {
    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <Elements options={options} stripe={stripePromise}>
            <CheckoutForm total={adjustedTotal} order={order} clientSecret={clientSecret} />
        </Elements>
    );
}
