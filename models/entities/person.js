var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    EntitySchema = require('../entity').schema;

var schema = EntitySchema.extend({
  email: String,
  birthDate: Date,
  deathDate: Date,
  nationality: String,
  jobTitle: String

});

module.exports = mongoose.model('Person', schema);
