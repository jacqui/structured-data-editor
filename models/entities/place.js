var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    EntitySchema = require('../entity').schema;

var schema = EntitySchema.extend({
  point: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.model('Place', schema);