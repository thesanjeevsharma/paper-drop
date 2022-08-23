const mongoose = require('mongoose');

const DropSchema = new mongoose.Schema(
   {
      user: {
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
         type: {
            type: String,
            enum: ['Point'],
            required: true,
         },
         coordinates: {
            type: [Number],
            required: true,
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

DropSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Drop', DropSchema);
