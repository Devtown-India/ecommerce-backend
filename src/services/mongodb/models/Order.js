import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema(
  {
    address: {
      type: mongoose.Types.ObjectId,
      ref: "Address",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["payment_pending", "payment_success", "payment_errored"],
    },
  },
  {
    timestamps: true,
  }
);
export const Order = new mongoose.model("Order",OrderSchema) 
