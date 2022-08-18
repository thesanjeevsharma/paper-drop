const router = require('express').Router();

const Drop = require('../models/drop.model');

router.post('/', async (req, res, next) => {
   try {
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
