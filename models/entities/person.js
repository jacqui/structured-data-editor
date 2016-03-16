var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    EntitySchema = require('../entity').schema;

var schema = EntitySchema.extend({
  email: String,
  dateOfBirth: Date,
  dateOfDeath: Date
});

module.exports = mongoose.model('Person', schema);