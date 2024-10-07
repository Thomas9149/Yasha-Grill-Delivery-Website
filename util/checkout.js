import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
    const [clientSecret, setClientSecret] = useState("");
    const [total, setTotal] = useState(0);
    const [order, setOrder] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            const storedClientSecret = sessionStorage.getItem(`${id}_clientSecret`);
            const storedTotal = sessionStorage.getItem(`${id}_formattedTotal`);
            const storedOrder = sessionStorage.getItem(`${id}_newOrder`);

            if (storedClientSecret) {
                setClientSecret(storedClientSecret);
                //console.log("SECRET: ", clientSecret);
            }

            if (storedTotal) {
                setTotal(parseInt(storedTotal, 10));
            }

            if (storedOrder) {
                const parsedOrder = JSON.parse(storedOrder);
                setOrder(parsedOrder);
            }

            if (!storedClientSecret && !storedTotal && !storedOrder) {
                console.error("Total amount or order not found. Please try again.");
            }
        }
    }, [id]);

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="App">
            {clientSecret ? (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm total={total} order={order} clientSecret={clientSecret} /> {/* Pass clientSecret here */}
                </Elements>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
