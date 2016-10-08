import logger from 'debug';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import config from '../../../config/server';

// Use bluebird
mongoose.Promise = Promise;

// Initialize our database
mongoose.connect(config.databases.mongo);

const db = mongoose.connection;
db.on('error', err => logger('server:mongoError')(err));
db.once('open', () => logger('server:mongo')(config.databases.mongo));

// Initialize our models
export default {
  conn: db,
  User: db.model('User', require('./models/User')),
};
