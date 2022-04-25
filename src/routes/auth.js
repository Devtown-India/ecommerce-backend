import express from 'express'
import User from '../services/mongodb/models/User'
import bcrypt from 'bcryptjs'

const router = express.Router()

router.post('/signup',async(req,res)=>{
    try {
        const {firstName,lastName,email,password} = req.body;
        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
        });

        await user.save()

         res.json({
           data: {
             user
           },
           success: true,
           message: "User saved successfully"
         });
        console.log(user)

    } catch (error) {
        console.log(error)
        res.json({
          data: {
            user: null,
          },
          success:false,
          message:error.message
        });
    }
})

export default router