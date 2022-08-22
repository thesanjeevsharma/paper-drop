const router = require('express').Router();

const jwt = require('../middlewares/jwt');
const Drop = require('../models/drop.model');

router.post('/', jwt.authenticate, async (req, res, next) => {
   try {
      const totalDrops = await Drop.find({
         userId: req.decoded.id,
         isDeleted: false,
         isExpired: false,
      }).count();

      if (totalDrops > 10) {
         return res.json({
            success: false,
            message:
               'Max drop limit reached! Wait for some drops to expire or delete some drops.',
            data: null,
         });
      }

      const { message, isAnonymous, location } = req.body;

      const drop = new Drop({
         message,
         isAnonymous,
         location,
         userId: req.decoded.id,
      });
      await drop.save();

      return res.json({
         success: true,
         message: 'Message dropped!',
         data: {
            drop: {
               _id: drop._id,
               location,
            },
         },
      });
   } catch (error) {
      next(error);
   }
});

module.exports = router;
