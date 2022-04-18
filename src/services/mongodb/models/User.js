import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    addresses: [
      {
        type: mongoose.Types.ObjectId,
        required: "Address",
      },
    ],
    orders: [
      {
        type: mongoose.Types.ObjectId,
        required: "Order",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const User = new mongoose.node("User", UserSchema);

export default User;
