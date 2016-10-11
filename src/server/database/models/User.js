import mongoose from 'mongoose';

export default new mongoose.Schema({
  username: {
    type: String,
    default: 'NULL',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  scope: {
    type: String,
    enum: ['Customer', 'Admin'],
    default: 'Customer',
  },
  token: {
    type: String,
    select: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: String,
  },
});
