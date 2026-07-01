import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: {
    name: String,
    email: String,
    country: String,
    city: String,
    address: String,
    postalCode: Number,
    phoneNumber: Number,
  },

  cart: [
    {
      _id: String,
      title: String,
      price: String,
      image: String,
      description: String,
      quantity: Number,
    },
  ],
  totalPrice: Number,
  paymentStatus: { type: String, default: "pending" },
  createAt: { type: String, default: Date.now() },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
