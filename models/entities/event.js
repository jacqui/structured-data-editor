var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    EntitySchema = require('../entity').schema;

var schema = EntitySchema.extend({
  startDate: Date,
  endDate: Date,
  location: { type: mongoose.Schema.ObjectId, ref: 'Place' }
});

module.exports = mongoose.model('Event', schema);