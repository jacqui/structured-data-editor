/**
 * A base schema for properties common to all entities
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema
    serialize = require('../lib/serialize');

module.exports = new function() {
  
  // Define properties common to all Entities
  this.schema = new Schema({
    name: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String,
      trim: true
    },
    disambiguationHint: {
      type: String,
      trim: true
    },
    sameAs: [String],
    primaryTopicOf: [String],
    createdOn: Date,
    updatedOn: Date
  }, {
    collection       : 'entities',
    discriminatorKey : '_type'
  });

  // Properties we don't want people to modify directly via the API
  this.immutable = ['_id', '__v', '_shortCode', '_type', 'createdOn', 'updatedOn'];

  // Define behaviour for serialising entities to JSON
  this.schema.methods.toJSON = function() {
    return serialize.toJSON(this.toObject());
  }

  // Define behaviour for serialising entities to JSON-LD
  this.schema.methods.toJSONLD = function() {
    return serialize.toJSONLD(this.toObject());
  };

  this.schema.pre('save', function(next) {
    // Insert hook to push updates to other platforms (e.g. Triplestore) here…
    next();
  });

  this.schema.pre('remove', function(next) {
    // Insert hook to remove entires from other platforms (e.g. Triplestore)…
    next();
  });
  
  /**
   * Load an entity using a specific Entity model based on the type supplied.
   *
   * @param {string} type    - A valid type. e.g. 'Person', 'Place', 'Event'…
   * @param {Object} entity  - An entity object
   * @param {Boolean} update - Set to true if this is an existing model in the
   *                           database that you want to update.
   */
  this.getEntityByType = function(type, entity, update) {
    
    // Load all the entity types we know about
    // Note: This happens inside the function as it can't be done until 
    // after this library has loaded as these libraries depend on this one!
    var Person = require('../models/entities/person'),
        Place = require('../models/entities/place'),
        Organization = require('../models/entities/organization'),
        Event = require('../models/entities/event'),
        Quote = require('../models/entities/quote');

    switch(type) {
      case 'Person':
        return (update) ? new Person(undefined, undefined, true).init(entity) : new Person(entity);
        break;
      case 'Organization':
        return (update) ? new Organization(undefined, undefined, true).init(entity) : new Organization(entity);
        break;
      case 'Place':
        return (update) ? new Place(undefined, undefined, true).init(entity) : new Place(entity);
        break;
      case 'Event':
        return (update) ? new Event(undefined, undefined, true).init(entity) : new Event(entity);
        break;
      case 'Quote':
        return (update) ? new Quote(undefined, undefined, true).init(entity) : new Quote(entity);
        break;
      default:
        return null;
    }
  };
  
  return this;
};