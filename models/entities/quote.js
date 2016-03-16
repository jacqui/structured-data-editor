var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    EntitySchema = require('../entity').schema;

var schema = EntitySchema.extend({
    //@TODO Support quotes attributable to multuple sources?
  attributedTo: { type: mongoose.Schema.ObjectId, ref: 'EntitySchema' },
  quotation: String
});

module.exports = mongoose.model('Quote', schema);