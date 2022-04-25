import express from "express";
import User from "../services/mongodb/models/User";
import bcrypt from "bcryptjs";
import { validationResult, body } from "express-validator";

const router = express.Router();

router.post(
  "/signup",
  body("firstName").isLength({ min: 1 }),
  body("lastName").isLength({ min: 1 }),
  body("password").isLength({ min: 3 }),
  body("email").isEmail(),
  async (req, res) => {
    try {
      const { errors } = validationResult(req);
      console.log(errors)
      if(errors.length>0) 
      return res.json({
        data: {
          user:null,
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

export default router;
