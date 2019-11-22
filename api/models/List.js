/**
 * List.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    visibility: {
      type: 'boolean',
      defaultsTo: false
    },
    checked: {
      type: 'boolean',
      defaultsTo: false
    },
    owner:{
      model: 'user',
    }
  },

};

