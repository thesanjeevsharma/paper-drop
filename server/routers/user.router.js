const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

router.post('/google-login', async (req, res, next) => {
   try {
      const { email, firstName, lastName, googleId } = req.body;

      let user;
      user = await User.findOne({ email, googleId, isDeleted: false });

      if (!user) {
         const newUser = new User({
            firstName,
            lastName,
            email,
            googleId,
         });
         user = await newUser.save();
      }

      const token = await jwt.sign({ id: user._id }, process.env.SECRET, {
         expiresIn: '7d',
      });

      res.status(200).json({
         success: true,
         message: 'User logged in!',
         data: {
            user: {
               firstName: user.firstName,
               lastName: user.lastName,
            },
            token,
         },
      });
   } catch (error) {
      next(error);
   }
});

module.exports = router;
