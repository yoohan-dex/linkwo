import crypto from 'crypto';
import jwt from 'jwt-simple';
import db from '../../database';
import config from '../../../../config/server';

export async function getUserByEmail(email) {
  if (email) {
    const user = await db.User.findOne({email});
    if (!user) {
      return null;
    }
    return user;
  }
}

export async function loginAccount(username, password) {
  const user = await db.User.findOne({
    username,
    password: sha512(password),
  });
  if (!user) {
    return null;
  }
  user.token = createAuthToken(user._id);
  await user.save();
  return user.toJSON();
}

export async function registerAccount({email, password}) {
  const user = new db.User({
    email,
    password: sha512(password),
  });
  user.token = createAuthToken(user._id);
  await user.save();
  return user;
}

export async function checkAuthorized(token) {
  if (!token) {
    return Promise.resolve(null);
  }
  const user = await db.User.findOne({token}, 'token');
  if (user) {
    const decoded = jwt.decode(user.token, config.session.secret);
    if (Date.now() < decoded.expires) {
      console.log(decoded.expires);
      return Promise.resolve(user);
    }
  }
  return Promise.reject('Invalid token');
}

function createAuthToken(userID) {
  const payload = {
    userID,
    expires: Date.now() + config.session.expires,
  };
  return jwt.encode(payload, config.session.secret);
}

function sha512(str) {
  return crypto.createHmac('sha512', config.salt).update(str).digest('hex');
}
