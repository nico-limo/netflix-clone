import React, { useEffect, useState } from "react";
//Redux y selector
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/features/userSlice";
import { subs } from "../../store/features/userSlice";
//Firebase
import { db } from "../../firebase";
// STRIPE
import { loadStripe } from "@stripe/stripe-js";
//CSS
import "./Plans.css";

const Plans = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        db.collection("customers")
            .doc(user.uid)
            .collection("subscriptions")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(async (subscription) => {
                    setSubscription({
                        role: subscription.data().role,
                        current_period_end: subscription.data()
                            .current_period_end.seconds,
                        current_period_start: subscription.data()
                            .current_period_start.seconds,
                    });
                    dispatch(subs({
                        ...user,
                        role: subscription.data().role
                    }))
                });
            });
    }, [user.uid]);

    // Traigo los planes de firestore que esta conectado en stripe
    useEffect(() => {
        db.collection("products")
            .where("active", "==", true)
            .get()
            .then((querySnapshot) => {
                const products = {};
                querySnapshot.forEach(async (productDoc) => {
                    products[productDoc.id] = productDoc.data();
                    const priceSnap = await productDoc.ref
                        .collection("prices")
                        .get();
                    priceSnap.docs.forEach((price) => {
                        products[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data(),
                        };
                    });
                });
                setProducts(products);
            });
    }, []);

    const loadCheckout = async (priceId) => {
        const docRef = await db
            .collection("customers")
            .doc(user.uid)
            .collection("checkout_sessions")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            });

        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();
            if (error) {
                //Show an error to your customer and inspect your Cloud Functions logs in the firebase Console
                alert(`An error ocurred: ${error.message}`);
            }
            if (sessionId) {
                // Init Stripe because we have a session
                const stripe = await loadStripe(
                    process.env.REACT_APP_STRIPE_API_KEY
                );
                stripe.redirectToCheckout({ sessionId });
            }
        });
    };

    return (
        <div className="plans">
            <br/>
            {subscription && (<p>Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>)}
            {Object.entries(products).map(([productId, productData]) => {
                const isCurrentPackage = productData.name?.includes(
                    subscription?.role
                );

                return (
                    <div key={productId} className={`${isCurrentPackage && "plans__plan--disabled"} plans__plan`}>
                        <div className="plans__info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button
                            onClick={() =>
                                !isCurrentPackage &&
                                loadCheckout(productData.prices.priceId)
                            }
                        >
                            {isCurrentPackage ? "Current Package" : "Subscribe"}
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default Plans;
