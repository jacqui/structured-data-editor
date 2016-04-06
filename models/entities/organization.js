var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    EntitySchema = require('../entity').schema;

var schema = EntitySchema.extend({
  foundingDate: Date,
  dissolutionDate: Date,
  legalName: String
});

module.exports = mongoose.model('Organization', schema);
