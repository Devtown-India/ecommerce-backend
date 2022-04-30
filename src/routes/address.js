import express from "express";
import { body, validationResult } from "express-validator";
import { isAuthenticated } from "../services/middlewares/isAuthenticated";
import { Address, User } from "../services/mongodb/schema";

const router = express.Router();

/*
type : POST
path : /address/add
body : {housenumber,fulladress,landmark}
query: none
description: Route to add an address
*/

router.post(
  "/add",
  isAuthenticated,
  body("housenumber").isLength({ min: 1 }),
  body("fulladdress").isLength({ min: 5 }),
  body("landmark").isLength({ min: 1 }),
  body("pincode").isPostalCode("IN"),
  async (req, res) => {
    try {
      const { errors } = validationResult(req);
      if (errors.length > 0)
        return res.json({
          data: {
            address: null,
          },
          success: false,
          message: "validation failed",
        });
      const user = req.user;
      // create the address doc
      const { housenumber, fulladdress, landmark, pincode } = req.body;

      const address = new Address({
        housenumber,
        fulladdress,
        landmark,
        user,
        pincode,
      });
      await address.save();
      //   now that address is saved, modify it inside the user doc
      // ! bad approach
      // const previousAddresses = await User.find({_id:user}).addresses
      // previousAddresses.push(address._id);

      await User.findOneAndUpdate(
        { _id: user },
        {
          $addToSet: { addresses: address._id },
        }
      );

      return res.json({
        data: {
          address,
        },
        success: false,
        message: "Address added",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        data: {
          address: null,
        },
        success: false,
        message: error.message,
      });
    }
  }
);

/*
! TODO create a route to delete an address from the DB
-> use the isAuthenticated middleware
-> find the user and use $Pull to modify the address array by removing the address
-> then findONeandDelete on Address
 */

export default router;
