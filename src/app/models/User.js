import bcrypt from 'bcryptjs';

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password_hash')) return next();
  try {
    this.password_hash = await bcrypt.hash(this.password_hash, 8);
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model('User', UserSchema);
