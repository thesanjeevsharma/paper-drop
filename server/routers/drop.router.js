const router = require('express').Router();
const mongoose = require('mongoose');

const jwt = require('../middlewares/jwt');
const Drop = require('../models/drop.model');
const utils = require('../utils');
const redisClient = require('../redis');

router.get('/my', jwt.authenticate, async (req, res, next) => {
   try {
      const drops = await Drop.find({
         user: req.decoded.id,
         isDeleted: false,
         isExpired: false,
      }).lean();

      const sanitizedDrops = utils.sanitizeDrops(drops, { withMessage: true });

      return res.json({
         success: true,
         message: 'Drops fetched!',
         data: {
            drops: sanitizedDrops,
         },
      });
   } catch (error) {
      next(error);
   }
});

router.get('/', jwt.authenticate, async (req, res, next) => {
   try {
      const { lon: longitude, lat: latitude } = req.query;

      const redisKey = `nearby-drops:${req.decoded.id}`;

      const cachedDrops = await redisClient.get(redisKey);

      if (cachedDrops) {
         console.log('sent from cache!');
         return res.json({
            success: true,
            message: 'Drops fetched!',
            data: {
               drops: JSON.parse(cachedDrops),
            },
         });
      }

      const dropIds = await redisClient.geoRadius(
         'drops',
         { latitude, longitude },
         2,
         'km'
      );

      const drops = await Drop.find({
         _id: { $in: dropIds },
         isDeleted: false,
         isExpired: false,
         user: { $not: { $eq: req.decoded.id } },
      })
         .populate('user')
         .lean();

      const sanitizedDrops = utils.sanitizeDrops(drops);

      await redisClient.set(redisKey, JSON.stringify(sanitizedDrops), {
         EX: 15,
      });
      console.log('fetched from db');

      return res.json({
         success: true,
         message: 'Drops fetched!',
         data: {
            drops: sanitizedDrops,
         },
      });
   } catch (error) {
      next(error);
   }
});

router.get('/:dropId', jwt.authenticate, async (req, res, next) => {
   try {
      const { dropId } = req.params;

      const drop = await Drop.findOneAndUpdate(
         {
            _id: dropId,
            isDeleted: false,
            isExpired: false,
         },
         { $addToSet: { readBy: mongoose.Types.ObjectId(req.decoded.id) } },
         { new: true }
      ).populate('user');

      if (!drop) {
         return res.json({
            success: false,
            message: 'Drop expired or does not exist!',
            data: null,
         });
      }

      if (drop.readBy.length >= 5) {
         drop.isExpired = true;
         await drop.save();
      }

      const [sanitizedDrop] = utils.sanitizeDrops([drop], {
         withMessage: true,
      });

      return res.json({
         success: true,
         message: 'Drop fetched!',
         data: {
            drop: sanitizedDrop,
         },
      });
   } catch (error) {
      next(error);
   }
});

router.delete('/:dropId', jwt.authenticate, async (req, res, next) => {
   try {
      const { dropId } = req.params;

      const drop = await Drop.findOneAndUpdate(
         {
            _id: dropId,
            user: req.decoded.id,
            isDeleted: false,
         },
         { isDeleted: true }
      ).populate('user');

      if (!drop) {
         return res.json({
            success: false,
            message: 'Drop expired or does not exist!',
            data: null,
         });
      }

      const [sanitizedDrop] = utils.sanitizeDrops([drop], {
         withMessage: true,
      });

      return res.json({
         success: true,
         message: 'Drop deleted!',
         data: {
            drop: sanitizedDrop,
         },
      });
   } catch (error) {
      next(error);
   }
});

router.post('/', jwt.authenticate, async (req, res, next) => {
   try {
      const totalDrops = await Drop.find({
         userId: req.decoded.id,
         isDeleted: false,
         isExpired: false,
      }).count();

      if (totalDrops >= 10) {
         return res.json({
            success: false,
            message:
               'Max drop limit reached! Wait for some drops to expire or delete some drops.',
            data: null,
         });
      }

      const {
         message,
         isAnonymous,
         location: { longitude, latitude },
      } = req.body;

      const drop = new Drop({
         message,
         isAnonymous,
         location: {
            type: 'Point',
            coordinates: [longitude, latitude],
         },
         user: req.decoded.id,
      });
      await drop.save();

      await redisClient.geoAdd('drops', {
         longitude,
         latitude,
         member: drop.id,
      });

      const [sanitizedDrop] = utils.sanitizeDrops([drop]);

      return res.json({
         success: true,
         message: 'Message dropped!',
         data: {
            drop: sanitizedDrop,
         },
      });
   } catch (error) {
      next(error);
   }
});

module.exports = router;
