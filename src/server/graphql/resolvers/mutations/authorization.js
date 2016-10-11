import Joi from 'joi';
import {registerAccount} from '../../controllers/authorization';
import {users} from '../../../../universal/utils/validate';

export const postAuthor = (r, {name}) => `fuck you ${name}`;
export const registerUser = (r, token) =>
Joi.validate(token, users, (err, token) => {
  if (err) {
    return err;
  }
  return registerAccount(token);
});


