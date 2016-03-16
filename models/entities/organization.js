var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    EntitySchema = require('../entity').schema;

var schema = EntitySchema.extend({
  dateFounded: Date
});

module.exports = mongoose.model('Organization', schema);