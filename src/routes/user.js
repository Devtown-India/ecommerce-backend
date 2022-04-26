import express from "express";
import {User} from "../services/mongodb/schema";
import bcrypt from "bcryptjs";
import { validationResult, body } from "express-validator";

import { signJWT, verifyJWT } from "../utils/index"
import { isAuthenticated } from "../services/middlewares/isAuthenticated";
import { isAdmin } from "../services/middlewares/isAdmin";

const router = express.Router();

/*
type : POST
path : /user/signup
body : {firstName,lastName,email,password}
query: none
description: Route to sign up a new user
*/

router.post(
  "/signup",
  body("firstName").isLength({ min: 1 }),
  body("lastName").isLength({ min: 1 }),
  body("password").isLength({ min: 3 }),
  body("email").isEmail(),
  async (req, res) => {
    try {
      const { errors } = validationResult(req);
      console.log(errors);
      if (errors.length > 0)
        return res.json({
          data: {
            user: null,
          },
          success: false,
          message: "validation failed",
        });

      const { firstName, lastName, email, password } = req.body;
      const salt = await bcrypt.genSalt(5);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      await user.save();

      return res.json({
        data: {
          user,
        },
        success: true,
        message: "User saved successfully",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        data: {
          user: null,
        },
        success: false,
        message: error.message,
      });
    }
  }
);

/*
type : POST
path : /user/login
body : {email,password}
query: none
description: Route to login a user
*/

router.post(
  "/login",
  body("password").isLength({ min: 3 }),
  body("email").isEmail(),
  async (req, res) => {
    try {
      const { errors } = validationResult(req);
      console.log(errors);
      if (errors.length > 0)
        return res.json({
          data: {
            user: null,
          },
          success: false,
          message: "validation failed",
        });

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user)
        return res.json({
          data: {
            token: null,
          },
          success: false,
          message: "User does not exist",
        });

      const isVerified = await bcrypt.compare(password, user.password);

      if (!isVerified)
        return res.json({
          data: {
            token: null,
          },
          success: false,
          message: "Invalid password",
        });

      //   verified user create the JWT

      const token = signJWT({
          id: user._id,
          email: user.email,
          role: user.role,
        })

      await user.save();

      return res.json({
        data: {
          token,
        },
        success: true,
        message: "User logged in successfully",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        data: {
          token: null,
        },
        success: false,
        message: error.message,
      });
    }
  }
);


/*
type : GET
path : /user/all
body : none
query: none
description: Route to get all users
*/

router.get(
  "/all",
  isAuthenticated,
  isAdmin,
  // !TODO make sure that only the admin can access this route
  async (req, res) => {
    try {
     

      const users = await User.find({ }).select("firstName lastName email orders addresses");

      return res.json({
        data: {
          users,
        },
        success: true,
        message: "Users fetched successfully",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        data: {
          users: [],
        },
        success: false,
        message: error.message,
      });
    }
  }
);

/*
type : GET
path : /user/profile/me
body : none
query: none
header: authorization = bearer token
description: Route to get all users
*/

router.get(
  "/profile/me",
  isAuthenticated,
  async (req, res) => {
    try {
      const token = req.headers["authorization"].split(' ')[1];
      const {id} = verifyJWT(token)
      const user = await User.findOne({_id:id})
      
      return res.json({
        data: {
          user,
        },
        success: true,
        message: "User profile fetched successfully",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        data: {
          user: null,
        },
        success: false,
        message: error.message,
      });
    }
  }
);

export default router;
