const Joi = require('joi');

const attributeSchema = Joi.object({
    attributeID: Joi.number().integer().positive(),
    attributename: Joi.string().trim().required(),
    color: Joi.string().trim(),
    description: Joi.string().trim().required(),
    AddedBy: Joi.string().trim().max(50),
    AddedOn: Joi.date().iso(),
    LastModifiedBy: Joi.string().trim().max(50),
    LastModifiedOn: Joi.date().iso(),
});


const updateAttributeSchema = Joi.object({
    attributename: Joi.string().optional(),
    color: Joi.string().optional(),
    description: Joi.string().optional(),
});

module.exports = { attributeSchema, updateAttributeSchema };
