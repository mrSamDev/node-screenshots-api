const { celebrate, Joi, Segments } = require("celebrate");

const options = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

const screenShot = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      url: Joi.string().required(),
      name: Joi.string().required(),
      format: Joi.string().required(),
      extension: Joi.string().required(),
      dimensions: Joi.object()
        .keys({
          pdfFormat:Joi.string(),
          width: Joi.number(),
          height: Joi.number(),
        })
        .optional(),
    }),
  },
  options
);

module.exports = { screenShot };
