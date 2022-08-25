const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

router.post('/', async (req, res, next) => {
   try {
      const { name, password } = req.body;
      const email = req.body.email.toLowerCase();

      const user = await User.findOne({ email, isDeleted: false });

      if (user) {
         return res.json({
            success: false,
            message: 'Email already in use!',
            data: null,
         });
      }

      const newUser = new User({
         email,
         name,
         password,
      });
      await newUser.save();

      const token = await jwt.sign({ id: newUser._id }, process.env.SECRET, {
         expiresIn: '7d',
      });

      res.status(200).json({
         success: true,
         message: 'Account created!',
         data: {
            user: {
               name,
               email,
            },
            token,
         },
      });
   } catch (error) {
      next(error);
   }
});

router.post('/login', async (req, res, next) => {
   try {
      const { password } = req.body;
      const email = req.body.email.toLowerCase();

      const user = await User.findOne({ email, isDeleted: false });

      if (!user) {
         return res.json({
            success: false,
            message: 'Email or Password is incorrect!',
            data: null,
         });
      }

      const isMatch = bcrypt.compareSync(password, user.password);

      if (isMatch) {
         const payload = {
            id: user._id,
         };
         const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '7d',
         });

         return res.json({
            success: true,
            message: 'Authentication successful!',
            data: {
               token: token,
               user: {
                  email,
                  name: user.name,
               },
            },
         });
      }

      return res.json({
         success: false,
         message: 'Email or Password is incorrect!',
         data: null,
      });
   } catch (error) {
      next(error);
   }
});

module.exports = router;
