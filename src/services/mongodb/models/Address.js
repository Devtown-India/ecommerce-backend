import mongoose from "mongoose";
const AddressSchema = new mongoose.Schema(
  {
    housenumber: {
      type: String,
      required: true,
    },
    fulladdress: {
      type: String,
      maxlength: 100,
      minlength: 50,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Address = new mongoose.node("Address", AddressSchema);

export default Address;
