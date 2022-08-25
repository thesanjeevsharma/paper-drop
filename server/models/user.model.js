const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, 'Name is required'],
      },
      email: {
         type: String,
         required: [true, 'Email is required'],
         unique: true,
      },
      password: {
         type: String,
         required: [true, 'Password is required'],
      },
      isVerified: {
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

UserSchema.pre('save', function (next) {
   bcrypt.hash(this.password, 10, (err, hash) => {
      if (!err) {
         this.password = hash;
         next();
      } else {
         console.log(err);
      }
   });
});

module.exports = mongoose.model('User', UserSchema);
