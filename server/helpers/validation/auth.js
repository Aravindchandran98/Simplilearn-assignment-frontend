const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi
            .string()
            .email()
            .required(),
    password: Joi
                .string()
                .required()
});

const registerSchema = Joi.object({
    first_name: Joi
                .string()
                .required()
                .regex(/^[A-Za-z][A-Za-z .]*$/)
                .max(30),
    last_name: Joi
                .string()
                .required()
                .regex(/^[A-Za-z][A-Za-z .]*$/)
                .max(30),
    email: Joi
            .string()
            .required()
            .email()
            // .regex(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            .max(150),
    mobile_number: Joi
            .number()
            .integer()
            .greater(0)
            .min(1000000000)
            .max(9999999999)
            .required(),
    password: Joi
            .string()
            .required()
            .regex(/^(?=.*?[0-9])(?=.[a-z])(?=.*[A-Z]).{8,20}$/)
});


module.exports = {
  loginSchema,
  registerSchema
}