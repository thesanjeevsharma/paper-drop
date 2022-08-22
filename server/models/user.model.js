const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
   {
      firstName: {
         type: String,
         required: [true, 'First name is required'],
      },
      lastName: {
         type: String,
      },
      email: {
         type: String,
         required: [true, 'Email is required'],
         unique: true,
      },
      googleId: {
         type: String,
      },
      isDeleted: {
         type: Boolean,
         default: false,
      },
      drops: [
         {
            ref: 'Drop',
            type: mongoose.SchemaTypes.ObjectId,
         },
      ],
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model('User', UserSchema);
