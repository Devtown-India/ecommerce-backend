import express from "express";
import { body, validationResult } from "express-validator";
import { isAdmin } from "../services/middlewares/isAdmin";
import { isAuthenticated } from "../services/middlewares/isAuthenticated";
import { Order, User } from "../services/mongodb/schema";

const router = express.Router();

/*
type : GET
path : /order/all
body : none
query: none
description: Route to get all orders
*/

//! admin route

router.get(
  "/all",
  isAuthenticated,
  isAdmin,
  async (req, res) => {
    try {
   
      const orders = await Order.find({})

      return res.json({
        data: {
          orders,
        },
        success: false,
        message: "All orders fetched",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        data: {
          orders: [],
        },
        success: false,
        message: error.message,
      });
    }
  }
);

/*
type : GET
path : /order/me
body : none
query: none
description: Route to get all orders
*/
//!User route
router.get(
  "/me",
  isAuthenticated,
  async (req, res) => {
    try {
        const user = req.user
      const orders = await Order.find({_id:user})

      return res.json({
        data: {
          orders,
        },
        success: false,
        message: "user orders fetched",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        data: {
          orders: [],
        },
        success: false,
        message: error.message,
      });
    }
  }
);


export default router;
