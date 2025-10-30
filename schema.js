const Joi = require('joi'); //for schema validation server side validation

const categories = [
  "Trending","Rooms","Iconic Cities","Mountains","Castles",
  "Amazing Pools","Camping","Farms","Arctic","Domes","Lakes"
];

module.exports.listingSchema =  Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null),
        category: Joi.string().valid(...categories).required(),
    }).required(),
});


module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        comment: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5),
    }).required(),
});