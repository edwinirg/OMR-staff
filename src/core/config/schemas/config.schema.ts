import * as Joi from 'joi';

export const validationSchema = Joi.object({
  //DB
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_DIALECT: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  //APP CONFIG
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().required(),
});