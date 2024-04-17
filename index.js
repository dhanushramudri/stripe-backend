// server.js

const express = require("express");
const stripe = require("stripe")("YOUR_SECRET_KEY");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create payment intent." });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
