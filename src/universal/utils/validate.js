import Joi from 'joi';

export const users = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().regex(/[a-zA-Z0-9]{8,30}$/).required(),
});


