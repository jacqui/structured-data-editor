var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    EntitySchema = require('../entity').schema;

var schema = EntitySchema.extend({
  isoCode: String
  }
});

module.exports = mongoose.model('Country', schema);
