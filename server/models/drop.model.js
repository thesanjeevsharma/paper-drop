const mongoose = require('mongoose');

const DropSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.SchemaTypes.ObjectId,
         ref: 'User',
         required: [true, 'User ID is required'],
      },
      message: {
         type: String,
         maxLength: 280,
         required: [true, 'Message is required'],
      },
      location: {
         latitude: {
            type: Number,
            required: [true, 'Latitude is required'],
         },
         longitude: {
            type: Number,
            required: [true, 'Longitude is required'],
         },
      },
      readBy: [
         {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
         },
      ],
      isAnonymous: {
         type: Boolean,
         default: false,
      },
      isExpired: {
         type: Boolean,
         default: false,
      },
      isDeleted: {
         type: Boolean,
         default: false,
      },
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model('Drop', DropSchema);
